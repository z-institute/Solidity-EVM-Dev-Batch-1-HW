import React from "react";
interface BottomDrawerProps {
    content: React.ReactNode;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
declare const BottomDrawer: React.FC<BottomDrawerProps>;
export default BottomDrawer;
