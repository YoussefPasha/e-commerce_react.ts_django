import React from "react";

type AppProps = {
  value: number | undefined;
  text: string | undefined;
  color: string | undefined;
};

const Rating = ({ value, text, color }: AppProps) => {
  return (
    <div className="rating">
      <span>
        <i
          style={{ color }}
          className={
            value !== undefined && value >= 1
              ? "fas fa-star"
              : value !== undefined && value >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value !== undefined && value >= 2
              ? "fas fa-star"
              : value !== undefined && value >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value !== undefined && value >= 3
              ? "fas fa-star"
              : value !== undefined && value >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value !== undefined && value >= 4
              ? "fas fa-star"
              : value !== undefined && value >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value !== undefined && value >= 5
              ? "fas fa-star"
              : value !== undefined && value >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>{" "}
      <span>{text && text}</span>
    </div>
  );
};

export default Rating;
