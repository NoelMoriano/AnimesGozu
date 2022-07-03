import React from 'react';
import {useHistory} from "react-router";

export const Page404 = () => {

    const history = useHistory();

    return <div className="center" style={{width: '100vw', height: '100vh'}}>
        <div>
            <div className="center">
                <img width="90%"
                     src="https://www.seekpng.com/png/detail/212-2123432_404-error-error-404-in-png.png"
                     alt="asd"/>
            </div>
            <div className="center">
                <button onClick={() => history.push('/')}>Ir a inicio</button>
            </div>
        </div>
    </div>
}