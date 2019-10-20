import React, { useState, useRef } from "react";
import { useOutsideClick } from "@hybrid/hooks";

export function Select({
  options,
  value,
  onChange
}: {
  options: any;
  value: any;
  onChange: (value: any) => void;
}) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [compValue, setCompValue] = useState(value);

  const label = options.filter((item: any) => item.value === compValue)[0]
    .label;

  useOutsideClick(ref, () => {
    setOpen(false);
  });

  const onChangeHandler = (item: any) => {
    setCompValue(item.value);
    setOpen(false);
    onChange(item.value);
  };

  const toggleOpen = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(!open);
  };
  return (
    <div className="selectContainer" ref={ref}>
      <div onClick={toggleOpen} className="selectContent">
        {label}
      </div>
      {open && (
        <ul className="selectBox">
          {options.map((item: any) => (
            <li
              key={item.value}
              onClick={() => onChangeHandler(item)}
              className="selectItem"
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
