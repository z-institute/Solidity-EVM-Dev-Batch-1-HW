import { ElementType, ReactNode } from "react";
import { LayoutProps, SpaceProps } from "styled-system";
import type { PolymorphicComponentProps } from "../../util/polymorphic";
export declare const scales: {
    readonly MD: "md";
    readonly SM: "sm";
    readonly XS: "xs";
};
export declare const variants: {
    readonly PRIMARY: "primary";
    readonly SECONDARY: "secondary";
    readonly TERTIARY: "tertiary";
    readonly TEXT: "text";
    readonly DANGER: "danger";
    readonly SUBTLE: "subtle";
    readonly SUCCESS: "success";
    readonly LIGHT: "light";
};
export declare type Scale = typeof scales[keyof typeof scales];
export declare type Variant = typeof variants[keyof typeof variants];
export interface BaseButtonProps extends LayoutProps, SpaceProps {
    as?: "a" | "button" | ElementType;
    external?: boolean;
    isLoading?: boolean;
    scale?: Scale;
    variant?: Variant;
    disabled?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
}
export declare type ButtonProps<P extends ElementType = "button"> = PolymorphicComponentProps<P, BaseButtonProps>;
