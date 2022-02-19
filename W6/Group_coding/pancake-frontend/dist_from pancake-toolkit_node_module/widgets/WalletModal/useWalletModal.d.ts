import { Login } from "./types";
interface ReturnType {
    onPresentConnectModal: () => void;
}
declare const useWalletModal: (login: Login, logout: () => void, t: (key: string) => string) => ReturnType;
export default useWalletModal;
