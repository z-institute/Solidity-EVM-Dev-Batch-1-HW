import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
    return (
        <Svg viewBox="0 0 120 120" {...props}>
            <path
                d="M4.35059 81.5283H12.041V26.1572H4.35059V22.7295H50.0098V26.1572H42.3633V81.5283H56.3379L67.3682 61.5332H70.3564V85H4.35059V81.5283Z"
                fill="#1FC7D4"
            />
        </Svg>
    );
};

export default Icon;