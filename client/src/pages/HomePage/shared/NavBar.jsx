import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  const handleFindACar = () => {
    navigate("/find-a-car");
  };

  
  return (
    <div className="HomePage__NavBar">
      <div className="HomePage__NavBar__Items" onClick={handleHome} >Home</div>
      <div className="HomePage__NavBar__Items" onClick={handleFindACar}>
        Find a Car
      </div>
      <div className="HomePage__NavBar__Items">How to Buy</div>
      <div className="HomePage__NavBar__Items">Sell your Car</div>
      <div className="HomePage__NavBar__Items">Finance & Insurance</div>
      <div className="HomePage__NavBar__Items">Subscription</div>
    </div>
  );
};

export default NavBar;
