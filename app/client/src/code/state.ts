import * as API from "./api";

export function createState(inParentComponent: React.Component) {
    return {
        currentView: <string> "",
        ownPlaylists: <Object> [], 

        handleGoogleLogin: async function (): Promise<void> {
            const oAuth2 = new API.oAuth2();
            const authorizationURL = await oAuth2.requestPermission();
            window.open(authorizationURL, "_self");
        }.bind(inParentComponent),

        proceedWithoutLogin: function() {
            const message = "Not implemented";
            console.log(message);
            return message;
        }.bind(inParentComponent)

    }
}