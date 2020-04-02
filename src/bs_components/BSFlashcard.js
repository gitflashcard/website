import React from "react";
import { useState } from 'react';
import CodeBlock from "../component/CodeBlock";
import ReactMarkdown from "react-markdown";

const BSFlashcard = ({question, answer}) => {

    const [myClass, setMyClass] = useState("hide")
    const toggle = () => {
        if (myClass === "hide") {
            setMyClass("card-body show");
        } else {
            setMyClass("hide");
        }
    }

    return (
        <>
            <style type="text/css">
                {`
    .hide {
      visibility: hidden;
      position: absolute;   
      left: -1000px;
      top: -1000px; 
    }
    
    .show {
      visibility: show;
    }

    `}
            </style>

        <div className="card" style={{margin: "0px", marginTop:"15px"}}>
            <div className="card-header" onClick={()=>{toggle()}}>
                <ReactMarkdown source={question} renderers={{code:CodeBlock}} />
            </div>
            <div className={myClass}>
                <p className="card-text">
                    <ReactMarkdown source={answer} renderers={{code:CodeBlock}} />
                </p>
            </div>
        </div>
        </>
    );
}

export default BSFlashcard;
