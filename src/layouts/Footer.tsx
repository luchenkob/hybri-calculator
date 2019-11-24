import React, { useState } from "react";
import Arrow from "../assets/images/arrow.png";

export function Footer({ disclaimersInfo }: { disclaimersInfo: any }) {
  const [open, setOpen] = useState(true);

  const toggleOpen = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <footer>
      <div className="footerContainer">
        <h4 className={open ? "open" : ""} onClick={toggleOpen}>
          <img src={Arrow} className="arrowSign" alt="arrowSign" />
          Disclaimers
        </h4>
        {open && (
          <div className="footerDisclaimerBox">
            {disclaimersInfo &&
              disclaimersInfo.map((item: any) => (
                <p key={item} className="body2">
                  {item}
                </p>
              ))}
          </div>
        )}
      </div>
    </footer>
  );
}
