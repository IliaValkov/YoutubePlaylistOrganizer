import React from "react";
import Button from "./Button"

export default function LoginView ({state}) {
    
    const googleRed = "#DB4436";
    
    return(
        <div className="loginForm surface elementLevel1">
            <h2>Login</h2>
            <Button 
                style = {{"background-color" : googleRed, "color" : "#FFFFFF"}} 
                onClick={state.handleGoogleLogin} >
                Login with Google
            </Button>
            <Button 
                disabled={false}
                onClick={state.proceedWithoutLogin} >
                Proceed without login
            </Button>
        </div>
    );
}