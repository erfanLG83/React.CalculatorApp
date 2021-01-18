import React from 'react';
import './../css/style.css';
import PropTypes from  'prop-types';

const NumberBtn = (props) =>{
    return (
        <button onClick={()=>{props.onUpdate(props.children)}} id={props.children==='0'?'zero':''} className="btn btn-number">{props.children}</button>
    );
}
NumberBtn.propTypes ={
    children : PropTypes.number.isRequired
}
export default NumberBtn