import React from 'react';
import {useHistory} from "react-router";

export const Users = () => {

    const history = useHistory();

    const users = ["Juan","Maria","Jose","Camila"];

    return <ul className="users">
        {
            users.map((user, index)=> <li key={index + 1} onClick={()=>history.push(`/users/${user}`)}>{user}</li>)
        }
    </ul>
}