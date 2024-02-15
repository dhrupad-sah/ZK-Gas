import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, Image, NavbarMenu, NavbarMenuItem } from "@nextui-org/react"
import { AcmeLogo } from "../assets/AcmeLogo.jsx"
import { formatBalance, formatChainAsNum } from '../utils';
import detectEthereumProvider from '@metamask/detect-provider'
import Metamask from "../assets/MetamaskLogo.svg"
import { MdOutlinePoll } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { useState, useEffect } from "react";
import FactoryABI from "../../ABI/Factory.json";
import { ethers } from "ethers";
import { useAuth } from "../context/auth.js";

export default function NavbarComponent() {
    const { auth, setAuth } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hasProvider, setHasProvider] = useState(null)
    const initialState = { accounts: [], balance: "", chainId: "" }
    const [wallet, setWallet] = useState(initialState)

    const [isConnecting, setIsConnecting] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const refreshAccounts = (accounts) => {
            if (accounts?.length > 0) {
                updateWallet(accounts)
            } else {
                // if length 0, user is disconnected
                setWallet(initialState)
            }
        }

        const refreshChain = (chainId) => {
            setWallet((wallet) => ({ ...wallet, chainId }))
        }

        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true })
            setHasProvider(provider)

            if (provider) {
                const accounts = await window.ethereum.request(
                    { method: 'eth_accounts' }
                )
                const _provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = _provider.getSigner();
                refreshAccounts(accounts)
                window.ethereum.on('accountsChanged', refreshAccounts)
                window.ethereum.on("chainChanged", refreshChain)
                const contract = new ethers.Contract(
                    FactoryABI.address,
                    FactoryABI.abi,
                    signer
                );
                setAuth({
                    FactoryContract: new ethers.Contract(FactoryABI.address, FactoryABI.abi, signer), provider: _provider,
                    accountAddress: accounts[0]
                });
            }
        }
        getProvider()

        return () => {
            window.ethereum?.removeListener('accountsChanged', refreshAccounts)
            window.ethereum?.removeListener("chainChanged", refreshChain)
        }
    }, [])

    const updateWallet = async (accounts) => {
        const balance = formatBalance(await window.ethereum.request({
            method: "eth_getBalance",
            params: [accounts[0], "latest"],
        }))
        const chainId = await window.ethereum.request({
            method: "eth_chainId",
        })
        setWallet({ accounts, balance, chainId })
    }

    const handleConnect = async () => {
        setIsConnecting(true)
        await window.ethereum.request({
            method: "eth_requestAccounts",
        })
            .then((accounts) => {
                setError(false)
                updateWallet(accounts)
            })
            .catch((err) => {
                setError(true)
                setErrorMessage(err.message)
            })
        setIsConnecting(false)
    }

    const disableConnect = wallet && isConnecting

    const menuItems = [
        "Communities",
        "Polls",
        "Profile"
    ];

    const routes = [
        '/communities',
        '/polls',
        '/profile',
    ]

    // const handleCreateCommunity = async () => {
    //     const community = await contract.createCommunity("xx@iiits", "xxxxxxAP", "xxxxxxxM");
    //     // await community.wait(1);
    //     // console.log(community);
    //     // console.log("Community created");
    //     // alert("Community Created Successfully")
    // }


    const getCommunity = async () => {
        const communityAddress = await auth.FactoryContract.getCommunity(0);
        console.log(communityAddress);
    }

    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            style={{ height: '80px' }}
            className="mb-5"
        >
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <Link color="foreground" href="/">
                        <AcmeLogo />
                        <p className="font-bold text-inherit">Zk-Gas</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-10" justify="center" style={{ marginLeft: "-30%", marginRight: "-10%" }}>
                <NavbarBrand >
                    <Link color="foreground" href="/">
                        <AcmeLogo />
                        <p className="font-bold text-inherit text-lg">Zk-Gas</p>
                    </Link>
                </NavbarBrand>

                <div className="flex gap-7">
                    <NavbarItem>
                        <Link color="foreground" href="/communities" className="text-base">
                            <BsPeople />&nbsp;&nbsp;
                            <span> Communities</span>
                        </Link>
                    </NavbarItem>

                    <NavbarItem>
                        <Link color="foreground" href="/polls" className="text-base">
                            <MdOutlinePoll />&nbsp;&nbsp;
                            <span>Polls</span>
                        </Link>
                    </NavbarItem>

                    <NavbarItem>
                        <Link color="foreground" href="/profile" className="text-base">
                            <RxAvatar />&nbsp;&nbsp;
                            <span>Profile</span>
                        </Link>
                    </NavbarItem>
                </div>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem style={{ marginRight: "-30%" }}>
                    <Button onClick={handleConnect} as={Link} color="primary" variant="flat" >
                        <Image
                            src={Metamask}
                            alt="Metamask Logo"
                            width={25}
                        /> {wallet.accounts[0]?.length > 0 ? wallet.accounts[0].substring(0, 15) + "..." : "Connect wallet"}
                    </Button>
                    {/* <Button onClick={handleCreateCommunity} as={Link} color="primary" variant="flat" >
                        Create Community
                    </Button> */}
                    {/* <Button onClick={getCommunity} as={Link} color="primary" variant="flat" >
                        Get Community
                    </Button> */}
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? "warning" : index === menuItems?.length - 1 ? "danger" : "foreground"
                            }
                            href={routes[index]}
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}