// Landing Page Header 
// Used in Signup Page and Login Page as well
//
import React from "react";
import SignUpButton from "../../components/Signup";
import LoginButton from "../../components/Login";
import RequestDemoButton from "../../components/Demo";
import Scale from './../../components/ScaleLogo';

const NewHeader = () => {
    return(
        <div className="toolbar">
            <Scale /> 
            <div className="buttons">
                
                <LoginButton />
                <SignUpButton />
                {/* <RequestDemoButton /> */}
                {/* //deprecated */}
            </div>
      </div>
    );
};

export default NewHeader;
