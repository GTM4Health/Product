// Landing Page Header 
// Used in Signup Page and Login Page as well
//
import React from "react";
import Logo from "../../components/Logo";
import SignUpButton from "../../components/Signup";
import LoginButton from "../../components/Login";
import HomeButton from "../../components/Home";
import RequestDemoButton from "../../components/Demo";

const HeaderIn = () => {
    return(
        <div className="toolbar">
            <Logo /> 
            <div className="buttons">
                <SignUpButton />
                <LoginButton />
                <HomeButton />
                {/* <RequestDemoButton /> */}
                {/* //deprecated */}
            </div>
      </div>
    );
};

export default HeaderIn;
