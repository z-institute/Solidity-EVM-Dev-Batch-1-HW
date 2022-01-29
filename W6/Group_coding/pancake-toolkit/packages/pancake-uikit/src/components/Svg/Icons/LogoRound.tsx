import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 120 120" {...props}>
      <circle cx={52} cy={52} r={52} fill="url(#paint0_linear_10493)" />     
      <g transform="translate(13,0)">
      <path
        d="M4.35059 81.5283H12.041V26.1572H4.35059V22.7295H50.0098V26.1572H42.3633V81.5283H56.3379L67.3682 61.5332H70.3564V85H4.35059V81.5283Z"
        fill="#cefec9"
      />
      </g>
      <defs>
        <linearGradient id="paint0_linear_10493" x1={52} y1={0} x2={52} y2={104} gradientUnits="userSpaceOnUse">
          <stop stopColor="#53DEE9" />
          <stop offset={1} stopColor="#1FC7D4" />
        </linearGradient>
      </defs>
    </Svg>
  );
};

export default Icon;
