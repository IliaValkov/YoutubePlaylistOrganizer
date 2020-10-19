import path from "path";
import { google } from "googleapis";
import express, { Request, Response, Express, NextFunction } from "express";
import cors from "cors";

const KEY_PATH = path.join(__dirname, "../../secrets/client_secret.json");
const KEY = require(KEY_PATH);
const scopes = ["https://www.googleapis.com/auth/youtube.readonly"];

// create the oauth client
const oAuth2Client = new google.auth.OAuth2(KEY.web.client_id, KEY.web.client_secret, KEY.web.redirect_uris[0]);

const app: Express = express();

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "../../client/dist")));

// app.use(cors());
// Custom middleware for handling CORS.
app.use(function (inRequest: Request, inResponse: Response, inNext: NextFunction) {
	// lists allowed domains; * allows every call to come through
	inResponse.header("Access-Control-Allow-Origin", "*");
	// lists HTTP methods to be accepted from external calls; if
	// none are specified, none will come through
	inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
	// configure additional headers;
	inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
	inNext();
});

app.get("/echo", function (inRequest: Request, inResponse: Response) {
	console.log("Echo has been sent!");
	inResponse.send("Hello from echo!");
});	

app.get("/request_permission", function (inRequest: Request, inResponse: Response) {
	try {
		const authorizationURL = oAuth2Client.generateAuthUrl({
			access_type: "offline",
			scope: scopes,
		});
		inResponse.send({authorizationURL: authorizationURL});
	} catch (inError) {
		inResponse.send(`An error has occured trying to request access permission. \n ${inError}`);
	}
});

app.get("/exchange_code", async function (inRequest: Request, inResponse: Response) {
	try {
		// The user decides whether to grant the permissions
		// Receive the users decision
		// If the user allows it, get tokens.
		// TODO: handle a case where access has not been granted
		const tokenCode = new URL(inRequest.url, KEY.web.redirect_uris[0]).searchParams.get("code");
		const { tokens } = await oAuth2Client.getToken(<string>tokenCode);
		oAuth2Client.setCredentials(tokens);
		inResponse.redirect(301, "/echo");
	} catch (inError) {
		inResponse.status(400).send(`An error has occured trying to set user credentials \n ${inError}`);
	}
});

app.get("/current_user_playlists", async function (inRequest: Request, inResponse: Response) {
	try {
		const youtube = google.youtube({ version: "v3", auth: oAuth2Client });
		const playlists = await youtube.playlists.list({
			part: ["id", "snippet"],
			mine: true,
			maxResults: 50,
		});
		inResponse.send(playlists.data);
	} catch (inError) {
		inResponse.send(`An error has occured trying to access the current user's playlist. \n ${inError}`);
	}
});

app.get("/revoke_token", async function (inRequest: Request, inResponse: Response) {
	try {
		await oAuth2Client.revokeCredentials();
		inResponse.send("Credentials revoked");
	} catch (inError) {
		inResponse.send(`An error has occured trying to revoke authorization token. \n ${inError}`);
	}
});

app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});
