import React from "react";
import { createState } from "../state";


class BaseLayout extends React.Component {
    state = createState(this);
    
    render () {
        return (
            <div>
                <button onClick = {this.state.handleGoogleLogin}>Login with Google</button>                
            </div>
        )
    }
}

export default BaseLayout;