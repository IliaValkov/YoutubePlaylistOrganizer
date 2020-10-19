import * as API from "./api";

export function createState(inParentComponent: React.Component) {
    return {
        ownPlaylists: <Object> [], 

        handleGoogleLogin: async function (): Promise<void> {
            const oAuth2 = new API.oAuth2();
            const authorizationURL = await oAuth2.requestPermission();
            window.open(authorizationURL, "_self");
        }.bind(inParentComponent),

    }
}