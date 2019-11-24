import React, { useState, useRef, useEffect } from "react";
import { useOutsideClick, useTabControl } from "@hybrid/hooks";

export function Select({
  options,
  value,
  onChange,
  className
}: {
  options: any;
  value: any;
  onChange: (value: any) => void;
  className?: string;
}) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [compValue, setCompValue] = useState(value);
  const [currentFocus, setCurrentFocus] = useState(0);

  const selectedItem = options.filter(
    (item: any) => compValue && item.value === compValue
  );

  useEffect(() => {
    setCompValue(value);
    const optionValues = options.map((item: any) => item.value);
    setCurrentFocus(optionValues.indexOf(compValue));
  }, [value]);

  useTabControl(open, (e: any) => {
    if (e.keyCode === 9) {
      const newIndex = (currentFocus + 1) % options.length;
      setCurrentFocus(newIndex);
    }
    if (e.keyCode === 13) {
      setCompValue(options[currentFocus].value);
    }
  });

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
  const handleChange = (e: any) => {
    setCompValue(e.target.value);
  };

  return (
    <div
      className={className ? className + " selectContainer" : "selectContainer"}
      ref={ref}
    >
      <select
        className="select-hidden-accessible"
        value={compValue ? compValue : ""}
        onChange={handleChange}
      >
        {options.map((item: any) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <div onClick={toggleOpen} className="selectContent">
        <span>
          {selectedItem[0] ? selectedItem[0].label : "Select an item"}
        </span>
      </div>
      {open && (
        <ul className="selectBox">
          {options.map((item: any, index: number) => (
            <li
              key={item.value}
              onClick={() => onChangeHandler(item)}
              className={
                index === currentFocus ? "selectItem focus" : "selectItem"
              }
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
