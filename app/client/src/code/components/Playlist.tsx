import React from "react";
import {IPlaylist} from "../api"


export default function (inPlaylist: IPlaylist) {
    return(
        <div>
            {inPlaylist.id}
        </div>
    );
}