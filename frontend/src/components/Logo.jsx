// Logo is
// GTM4Health logo and In Private Beta Image
//
import React from "react";
import imgP from "../images/newlogo.png";
import Beta from "../images/beta.png";

const Logo = () => {
  return (
    <div className="image">
      <img src={imgP} alt="logoH" className="logo" />
      <img src={Beta} alt="betaV" className="beta" />
    </div>
  );
};

export default Logo;
