import React, { useState } from "react";

export function Input({
  value,
  currency,
  suffix
}: {
  value: any;
  currency?: boolean;
  suffix?: string;
}) {
  const [inputValue, setValue] = useState(value);
  const [isEditting, setIsEditting] = useState(false);
  const onChange = (e: any) => {
    setValue(e.target.value);
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

  return (
    <span className="inputContainer">
      {isEditting ? (
        <input
          type="text"
          value={inputValue}
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : (
        <span onClick={() => setIsEditting(!isEditting)}>
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
