import React from "react";

export default function LoginView ({state}) {
    return(
        <div className="loginForm">
            <button onClick={state.handleGoogleLogin}>Login with Google</button>
            <button onClick={state.proceedWithoutLogin}>Proceed without login</button>
        </div>
    );
}