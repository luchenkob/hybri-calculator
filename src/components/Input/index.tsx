import React, { useState, useRef } from "react";

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
  const [isInvalid, setIsInvalid] = useState(false);

  const onChangeHandler = (e: any) => {
    const re = /^-?(\d+)?\.?(\d+)?$/;
    console.log(re.test(e.target.value), e.target.value);
    if (e.target.value === '' || re.test(e.target.value)) {
      setValue(e.target.value);
      onChange(e.target.value);
    }
  };

  const onKeyDownHandler = (e: any) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const onBlur = (e: any) => {
    let isValid = inputValidation(e.target.value);
    if (isValid) {
      setIsEditting(false);
    }
    setIsInvalid(!isValid);
  };

  const formatNumber = (num: number) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  const currencyFormat = (num: any) =>
    parseFloat(num)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  const editHandler = (e: any) => {
    setIsEditting(true);
  };

  const inputValidation = (number: number) => {
    return number > 0;
  };

  return (
    <span>
      <span
        className={"inputContainer " + (isInvalid ? "error" : "")}
        onClick={editHandler}
      >
        {currency && <span className="currency">$</span>}
        <input
          className={isEditting ? "active" : ""}
          ref={inputEl}
          type="text"
          value={inputValue}
          onChange={onChangeHandler}
          onBlur={onBlur}
          onKeyDown={onKeyDownHandler}
        />
        {!isEditting && (
          <span className="inputValue">
            {currency ? currencyFormat(inputValue) : formatNumber(inputValue)}
            <sup>{suffix}</sup>
          </span>
        )}
      </span>
      {isInvalid && <span className="error-text">Not a valid number</span>}
    </span>
  );
}

Input.defaultProps = {
  currency: false
};
