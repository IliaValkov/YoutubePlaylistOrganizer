import React from "react";

export default function LoginView ({state}) {
    return(
        <div className="loginForm surface elementLevel1">
            <h2>Login</h2>
            <button onClick={state.handleGoogleLogin} >Login with Google</button>
            <button onClick={state.proceedWithoutLogin} >Proceed without login</button>
        </div>
    );
}