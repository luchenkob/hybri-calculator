import React, { ReactNode } from "react";
import CloseImage from "../../assets/images/closeButton.png";

const IconType = {
  CloseImage: CloseImage
};

export function Button({
  iconType,
  children,
  onClick,
  className
}: {
  iconType?: string;
  children?: ReactNode;
  className?: string;
  onClick: (event: any) => void;
}) {
  return (
    <button className={className} onClick={onClick}>
      {iconType ? <img src={iconType} alt={iconType} /> : children}
    </button>
  );
}

Button.iconType = IconType;
