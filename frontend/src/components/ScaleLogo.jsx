// Logo is
// GTM4Health logo and In Private Beta Image
//
import React from "react";
import GLogo from "../images/gtmlogo2.png";
import Beta from "../images/beta.png";

const Scale = () => {
  return (
    <div className="image">
      <img src={GLogo} alt="logoH" className="logo" />
      <img src={Beta} alt="betaV" className="beta" />
    </div>
  );
};

export default Scale;
