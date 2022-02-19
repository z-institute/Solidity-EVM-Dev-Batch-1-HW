import { ProgressProps } from "./types";
interface ProgressBarProps {
    primary?: boolean;
    $useDark: boolean;
    $background?: string;
}
export declare const Bar: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, ProgressBarProps, never>;
interface StyledProgressProps {
    variant: ProgressProps["variant"];
    scale: ProgressProps["scale"];
    $useDark: boolean;
}
declare const StyledProgress: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, StyledProgressProps, never>;
export default StyledProgress;
