import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, Image, Input, NavbarMenu, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, NavbarMenuItem, useDisclosure, Textarea } from "@nextui-org/react"
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
import { useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function NavbarComponent() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const location = useLocation();
    const route = location.pathname;
    const { auth, setAuth } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hasProvider, setHasProvider] = useState(null)
    const initialState = { accounts: [], balance: "", chainId: "" }
    const [wallet, setWallet] = useState(initialState)

    const [isConnecting, setIsConnecting] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");

    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");

    const QUESTION_LIMIT = 30;
    const handleQuestionChange = (event) => {
        const updateQuestion = event.target.value.slice(0, QUESTION_LIMIT);
        setQuestion(updateQuestion);
    };

    const OPTION_LIMIT = 15;
    const handleOption1Change = (event) => {
        const updateOption1 = event.target.value.slice(0, OPTION_LIMIT);
        setOption1(updateOption1);
    };

    const handleOption2Change = (event) => {
        const updateOption2 = event.target.value.slice(0, OPTION_LIMIT);
        setOption2(updateOption2);
    };

    const handleOption3Change = (event) => {
        const updateOption3 = event.target.value.slice(0, OPTION_LIMIT);
        setOption3(updateOption3);
    };

    useEffect(() => {
        const refreshAccounts = (accounts) => {
            if (accounts?.length > 0) {
                updateWallet(accounts)
            } else {
                setWallet(initialState)
            }
        }

        const refreshChain = (chainId) => {
            setWallet((wallet) => ({ ...wallet, chainId }))
        }

        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true })
            setHasProvider(provider)
            const _provider = new ethers.providers.Web3Provider(window.ethereum);

            if (_provider) {
                const accounts = await window.ethereum.request(
                    { method: 'eth_requestAccounts' }
                )
                refreshAccounts(accounts)
                window.ethereum.on('accountsChanged', refreshAccounts)
                window.ethereum.on("chainChanged", refreshChain)
                console.log("Navbar");
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

    console.log(question, option1, option2, option3);
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
                <NavbarItem className="flex gap-3" style={{ marginRight: "-30%", }}>
                    {route.indexOf("communities") >= 0 && <Button as={Link} color="secondary" variant="light" startContent={<FaPlus />}>
                        Community
                    </Button>}
                    {route.indexOf("polls") >= 0 && <Button as={Link} color="secondary" variant="light" startContent={<FaPlus />} onClick={onOpen}>
                        Public Poll
                    </Button>}
                    <Button onClick={handleConnect} as={Link} color="primary" variant="flat" >
                        <Image
                            src={Metamask}
                            alt="Metamask Logo"
                            width={25}
                        /> {wallet.accounts[0]?.length > 0 ? wallet.accounts[0].substring(0, 15) + "..." : "Connect wallet"}
                    </Button>
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
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create a Public Poll</ModalHeader>
                            <ModalBody>
                                <Textarea
                                    autoFocus
                                    label="Question"
                                    placeholder="Enter question (max 50 characters)"
                                    value={question}
                                    onChange={handleQuestionChange}
                                />
                                <Input
                                    autoFocus
                                    label="Option1"
                                    placeholder="Enter first option (max 15 characters)"
                                    value={option1}
                                    onChange={handleOption1Change}
                                />
                                <Input
                                    autoFocus
                                    label="Option2"
                                    placeholder="Enter second option (max 15 characters)"
                                    value={option2}
                                    onChange={handleOption2Change}
                                />
                                <Input
                                    autoFocus
                                    label="Option3"
                                    placeholder="Enter three option (max 15 characters)"
                                    value={option3}
                                    onChange={handleOption3Change}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={onClose}>
                                    Create
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </Navbar>
    )
}