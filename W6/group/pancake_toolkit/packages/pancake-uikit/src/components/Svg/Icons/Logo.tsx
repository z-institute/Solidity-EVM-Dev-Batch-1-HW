import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="-300 0 700 399" {...props}>
      <path d="M0 1175 l0 -1175 1105 0 1105 0 0 1175 0 1175 -1105 0 -1105 0 0
      -1175z m187 1089 c-3 -3 -12 -4 -19 -1 -8 3 -5 6 6 6 11 1 17 -2 13 -5z m1343
      -53 c-12 -47 -34 -73 -55 -65 -17 7 -20 50 -4 60 7 4 9 0 5 -14 -8 -24 7 -37
      22 -19 5 6 16 32 23 56 16 54 24 38 9 -18z m-512 24 c256 -60 447 -296 468
      -580 l7 -83 37 5 c33 5 40 2 55 -21 57 -87 -11 -306 -95 -306 -31 0 -60 22
      -60 46 0 26 -15 14 -39 -31 -13 -25 -51 -74 -83 -110 l-59 -65 25 -32 c42 -56
      105 -199 121 -276 9 -43 15 -126 15 -201 l0 -127 30 -29 c47 -45 64 -102 58
      -193 -5 -66 -3 -81 13 -101 26 -31 24 -47 -7 -76 -25 -23 -34 -25 -130 -25
      -92 0 -106 2 -125 21 -13 13 -19 30 -17 47 3 23 0 27 -21 24 -44 -7 -72 7 -87
      44 -8 19 -12 39 -9 44 9 15 2 12 -52 -14 -60 -30 -162 -49 -217 -41 -111 18
      -210 47 -240 70 -18 14 -36 25 -39 25 -4 0 -7 -25 -7 -55 0 -42 -5 -60 -20
      -75 -24 -24 -86 -27 -118 -4 -21 15 -22 14 -22 -14 0 -36 -23 -57 -79 -72 -70
      -18 -184 4 -225 45 -9 9 -16 32 -16 50 0 27 7 39 33 59 19 15 42 26 52 26 13
      0 15 5 10 17 -25 57 -43 121 -40 138 2 11 7 37 10 58 3 20 16 46 27 57 l22 20
      -27 28 -27 29 63 59 c63 58 64 60 71 124 13 135 48 214 170 384 6 9 -6 31 -36
      68 -52 63 -88 135 -115 226 -14 48 -21 61 -33 56 -29 -13 -60 -16 -85 -10 -76
      19 -73 217 5 291 25 24 35 27 69 22 39 -5 40 -4 52 32 24 74 86 177 144 240
      154 165 367 234 573 186z"/>
      <path d="M624 1596 c-12 -31 0 -51 31 -51 27 0 30 3 30 30 0 25 -4 30 -28 33
      -17 2 -29 -2 -33 -12z"/>
      <path d="M1090 1531 c-7 -15 -6 -24 6 -36 9 -9 21 -14 27 -12 18 6 31 33 24
      51 -9 22 -44 20 -57 -3z"/>
      <path d="M221 588 l-35 -31 35 -31 34 -30 3 32 c2 18 2 45 0 61 l-3 30 -34
      -31z"/>
    </Svg>
  );
};

export default Icon;