import React, { useState, useRef } from "react";

export function Input({
  value,
  currency,
  suffix,
  onChange,
  customValidation,
  errorMessage
}: {
  value: any;
  currency?: boolean;
  suffix?: string;
  onChange: (value: string) => void;
  customValidation?: (value: string) => boolean;
  errorMessage: string;
}) {
  const inputEl = useRef<HTMLInputElement>(null);
  const [inputValue, setValue] = useState(value);
  const [isEditting, setIsEditting] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const onChangeHandler = (e: any) => {
    const re = /^-?(\d+)?\.?(\d+)?$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setValue(e.target.value);
    }
  };

  const onKeyDownHandler = (e: any) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const onBlur = (e: any) => {
    let isValid = inputValidation(e.target.value);

    if (customValidation) {
      isValid = customValidation(e.target.value) && isValid;
    }

    if (isValid) {
      setIsEditting(false);
    }
    setIsInvalid(!isValid);
    onChange(inputValue);
  };

  const onFocus = (e: any) => {
    setIsEditting(true);
  };

  const formatNumber = (num: number) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  const currencyFormat = (num: any) =>
    parseFloat(num)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  const inputValidation = (number: number) => {
    return number > 0;
  };

  return (
    <span>
      <span className={"inputContainer " + (isInvalid ? "error" : "")}>
        {currency && <span className="currency">$</span>}
        <input
          className={isEditting ? "active" : ""}
          ref={inputEl}
          type="number"
          value={inputValue}
          onChange={onChangeHandler}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDownHandler}
          aria-selected="true"
        />
        <span className={"inputValue " + (isEditting ? "editing" : "")}>
          {currency ? currencyFormat(inputValue) : formatNumber(inputValue)}
          <sup>{suffix}</sup>
        </span>
      </span>
      {isInvalid && <span className="error-text">{errorMessage}</span>}
    </span>
  );
}

Input.defaultProps = {
  currency: false
};
