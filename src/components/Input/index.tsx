import React, { useState, useRef, useEffect } from "react";

export function Input({
  value,
  currency,
  suffix,
  onChange
}: {
  value: any;
  currency?: boolean;
  suffix?: string;
  onChange: (value: string) => void;
}) {
  const inputEl = useRef<HTMLInputElement>(null);
  const [inputValue, setValue] = useState(value);
  const [isEditting, setIsEditting] = useState(false);

  useEffect(() => {}, [inputEl]);

  const keyPressHandler = (e: any) => {
    // if (e.charCode == 46 || (e.charCode >= 48 && e.charCode <= 57)) {
    // setValue(e.target.value);
    // onChange(e.target.value);
    // }
  };
  const onChangeHandler = (e: any) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const onBlur = (e: any) => {
    setIsEditting(false);
  };

  const formatNumber = (num: number) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  const currencyFormat = (num: any) =>
    "$" +
    parseFloat(num)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  const editHandler = (e: any) => {
    if (inputEl.current != null) {
      inputEl.current.focus();
    }
    setIsEditting(!isEditting);
  };
  return (
    <span className="inputContainer" onClick={editHandler}>
      <input
        className={isEditting ? "active" : ""}
        ref={inputEl}
        type="text"
        value={inputValue}
        onChange={onChangeHandler}
        onKeyPress={keyPressHandler}
        onBlur={onBlur}
      />
      {!isEditting && (
        <span>
          {currency ? currencyFormat(inputValue) : formatNumber(inputValue)}
          <sup>{suffix}</sup>
        </span>
      )}
    </span>
  );
}

Input.defaultProps = {
  currency: false
};
