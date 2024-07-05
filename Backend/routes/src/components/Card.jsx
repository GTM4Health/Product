// To be done more.  Just  has Title and Features.  
// To be populated.
//
import React from "react";

function Card({ title, features }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}

export default Card;
