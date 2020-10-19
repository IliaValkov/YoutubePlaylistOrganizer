import axios, { AxiosResponse } from "axios";
import { config } from "./config";

export interface IPlaylist {
    id: string,
    snippet?: {
        channelID: string,
        title: string,
        description: string
    }
}

export class oAuth2 {
	public async requestPermission(): Promise<string> {
        const response: AxiosResponse = await axios.get(`${config.serverAddress}/request_permission`);
        return response.data.authorizationURL;
    }
}
