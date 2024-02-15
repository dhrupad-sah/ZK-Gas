/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    useState,
    useEffect,
    createContext,
    PropsWithChildren,
    useContext,
    useCallback,
} from "react";

import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance } from "../utils";
const disconnectedState = {
    accounts: [],
    balance: "",
    chainId: "",
};

const MetaMaskContext = createContext(
    {} 
);

export const MetaMaskContextProvider = ({ children }) => {
    const [hasProvider, setHasProvider] = useState(null);

    const [isConnecting, setIsConnecting] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const clearError = () => setErrorMessage("");

    const [wallet, setWallet] = useState(disconnectedState);
    const _updateWallet = useCallback(async (providedAccounts) => {
        const accounts =
            providedAccounts ||
            (await window.ethereum.request({ method: "eth_accounts" }));

        if (accounts.length === 0) {
            setWallet(disconnectedState);
            return;
        }

        const balance = formatBalance(
            await window.ethereum.request({
                method: "eth_getBalance",
                params: [accounts[0], "latest"],
            })
        );
        const chainId = await window.ethereum.request({
            method: "eth_chainId",
        });

        setWallet({ accounts, balance, chainId });
    }, []);

    const updateWalletAndAccounts = useCallback(
        () => _updateWallet(),
        [_updateWallet]
    );
    const updateWallet = useCallback(
        (accounts) => _updateWallet(accounts),
        [_updateWallet]
    );

    /**
     * This logic checks if MetaMask is installed. If it is, some event handlers are set up
     * to update the wallet state when MetaMask changes. The function returned by useEffect
     * is used as a "cleanup": it removes the event handlers whenever the MetaMaskProvider
     * is unmounted.
     */
    useEffect(() => {
        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true });
            setHasProvider(Boolean(provider));

            if (provider) {
                updateWalletAndAccounts();
                window.ethereum.on("accountsChanged", updateWallet);
                window.ethereum.on("chainChanged", updateWalletAndAccounts);
            }
        };

        getProvider();

        return () => {
            window.ethereum?.removeListener("accountsChanged", updateWallet);
            window.ethereum?.removeListener(
                "chainChanged",
                updateWalletAndAccounts
            );
        };
    }, [updateWallet, updateWalletAndAccounts]);

    const connectMetaMask = async () => {
        setIsConnecting(true);

        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            clearError();
            updateWallet(accounts);
        } catch (err) {
            setErrorMessage(err.message);
        }
        setIsConnecting(false);
    };

    return (
        <MetaMaskContext.Provider
            value={{
                wallet,
                hasProvider,
                error: !!errorMessage,
                errorMessage,
                isConnecting,
                connectMetaMask,
                clearError,
            }}
        >
            {children}
        </MetaMaskContext.Provider>
    );
};

export const useMetaMask = () => {
    const context = useContext(MetaMaskContext);
    if (context === undefined) {
        throw new Error(
            "useMetaMask must be used within a MetaMaskContextProvider"
        );
    }
    return context;
};