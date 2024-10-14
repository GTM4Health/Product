// Logo is
// GTM4Health logo and In Private Beta Image
//
import React from "react";
import SLogo from "../images/gtm.png";
import Beta from "../images/beta.png";

const Scale = () => {
  return (
    <div className="image">
      <img src={SLogo} alt="logoH" className="logo" />
      <img src={Beta} alt="betaV" className="beta" />
    </div>
  );
};

export default Scale;
