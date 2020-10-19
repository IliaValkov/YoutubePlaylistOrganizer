import React from "react";
import { createState } from "../state";


class BaseLayout extends React.Component {
    state = createState(this);
    
    render () {
        return (
            <div className="applicationContainer">
                {/* Display Login view if the user isnt authenticated */}

                {/* Navigation controlling the different views
                            - Questions: 
                        What can the user see here?
                        What can the user do from this view?
                        What are the options in the navigation apart from the view?
                        Do I need a toolbar on top?
                            - Answers:

                */}

                {/* Playlists View 
                            - Questions: 
                        What can the user see here?
                        What can the user do from this view?
                        How does the user switch to PlaylistItem view?
                            - Answers:

                */}

                {/* Chosen playlist View 
                            - Questions: 
                        What can the user see here?
                        What can the user do from this view?
                        How are the videos shown here?
                        How does the user choose a video to work on?
                            - Answers:
                            
                */}
                        
                {/* PlaylistItem View 
                            - Questions: 
                        What can the user see here?
                        What can the user do from this view?
                        How are the videos shown here?
                        How does the user control the player?
                            - Answers:

                */}


                <button onClick = {this.state.handleGoogleLogin}>Login with Google</button>                
            </div>
        )
    }
}

export default BaseLayout;