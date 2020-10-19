// node imports
import path from "path";

// library imports
import { google } from "googleapis";
import express, { Request, Response, Express, NextFunction } from "express";

// oauth client setup
const KEY_PATH = path.join(__dirname, "../../secrets/client_secret.json");
const KEY = require(KEY_PATH);
const SCOPES = ["https://www.googleapis.com/auth/youtube.readonly"];
const oAuth2Client = new google.auth.OAuth2(KEY.web.client_id, KEY.web.client_secret, KEY.web.redirect_uris[0]);

const app: Express = express();

//  handle JSON in request bodies
app.use(express.json());

// point to our static files (the Client)
app.use("/", express.static(path.join(__dirname, "../../client/dist")));

// Custom middleware funciton to enable CORS, so the API can be called from everywhere
app.use(function (inRequest: Request, inResponse: Response, inNext: NextFunction) {
	inResponse.header("Access-Control-Allow-Origin", "*");
	inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
	inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
	inNext();
});

// -----------------------------RESTful endpoint operations begin ---------------------------------

// test endpoint for server response
app.get("/hello", function (inRequest: Request, inResponse: Response) {
	console.log("Hello world has been sent!");
	inResponse.send("Hello world!");
});	

// Return redirect link to google's authorization services
app.get("/request_permission", function (inRequest: Request, inResponse: Response) {
	try {
		const authorizationURL = oAuth2Client.generateAuthUrl({
			access_type: "offline",
			scope: SCOPES,
		});
		inResponse.json({authorizationURL: authorizationURL});
	} catch (inError) {
		inResponse.send(`An error has occured trying to request access permission. \n ${inError}`);
	}
});

// Receive user permission code
app.get("/exchange_code", async function (inRequest: Request, inResponse: Response) {
	try {
		const tokenCode = new URL(inRequest.url, KEY.web.redirect_uris[0]).searchParams.get("code");
		if(tokenCode !== null) {
			const { tokens } = await oAuth2Client.getToken(<string>tokenCode);
			oAuth2Client.setCredentials(tokens);
			inResponse.redirect(301, "/hello");
		}
		inResponse.status(401).send("The user denied Youtube account access.");
	} catch (inError) {
		inResponse.status(400).send(`An error has occured trying to exchange access code \n ${inError}`);
	}
});

// Revoke the credentials token
app.get("/revoke_token", async function (inRequest: Request, inResponse: Response) {
	try {
		await oAuth2Client.revokeCredentials();
		inResponse.status(200).send("OK - Credentials revoked");
	} catch (inError) {
		inResponse.send(`An error has occured trying to revoke authorization token. \n ${inError}`);
	}
});

// Get information about the current user's created playlists. (Doesnt return saved playlists!)
app.get("/current_user_playlists", async function (inRequest: Request, inResponse: Response) {
	try {
		const youtube = google.youtube({ version: "v3", auth: oAuth2Client });
		const playlists = await youtube.playlists.list({
			part: ["id", "snippet"],
			mine: true,
			maxResults: 50,
		});
		inResponse.json(playlists.data);
	} catch (inError) {
		inResponse.send(`An error has occured trying to access the current user's playlist. \n ${inError}`);
	}
});

// Start app listening 
app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});
