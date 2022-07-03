import React from 'react';
import {useParams} from "react-router";
import {Avatar} from "../components/Avatar";

export const User = () => {

    const {userEmail}  = useParams();

    return <div className="user">
        <div className="avatar-items">
            <div className="avatar">
                <h1>Page user profile</h1>
                <Avatar avatarName={userEmail}/>
            </div>
        </div>
    </div>
}