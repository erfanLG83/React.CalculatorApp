import React from 'react';
import './../css/style.css'

const ModeBtn = (props) =>{
    return(
        <button onClick={()=>{props.onUpdate(props.children)}} className="btn btn-mode">{props.children}</button>
    );
}

export default ModeBtn