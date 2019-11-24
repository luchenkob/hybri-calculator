import React from "react";
import "./index.scss";

export function LoadingSpinners() {
  return (
      <div className="ty-loading-spinner-linear -size-large">
          <span className="ty-loading-spinner-linear__dot ty-loading-spinner-linear__dot--1" />
          <span className="ty-loading-spinner-linear__dot ty-loading-spinner-linear__dot--2" />
          <span className="ty-loading-spinner-linear__dot ty-loading-spinner-linear__dot--3" />
          <span className="ty-loading-spinner-linear__dot ty-loading-spinner-linear__dot--4" />
      </div>
  );
}

