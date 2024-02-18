import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Select,
    SelectItem,
    Link,
    NavbarMenuToggle,
    Image,
    Input,
    NavbarMenu,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    NavbarMenuItem,
    useDisclosure,
    Textarea,
} from "@nextui-org/react";
import { AcmeLogo } from "../assets/AcmeLogo.jsx";
import { formatBalance, formatChainAsNum } from "../utils";
import detectEthereumProvider from "@metamask/detect-provider";
import Metamask from "../assets/MetamaskLogo.svg";
import { MdOutlinePoll } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { useState, useEffect } from "react";
import FactoryABI from "../../ABI/Factory.json";
import ZKCommunityABI from "../../ABI/ZKCommunity.json";
import { ethers } from "ethers";
import { useAuth } from "../context/auth.js";
import { useDispatch } from "react-redux";
import axios from "../api/axiosConfig.js";
import { login } from "../store/UserSlice/UserSlice.jsx";
import { useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';

export default function NavbarComponent() {
    const dispatch = useDispatch();
    const mongoID = useSelector((state) => state.user.userId);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { isOpen: isCommunityOpen, onOpen: onCommunityOpen, onOpenChange: onCommunityOpenChange } = useDisclosure();
    const { isOpen: isCommunityPollOpen, onOpen: onCommunityPollOpen, onOpenChange: onCommunityPollOpenChange, onClose: onCommunityPollClose } = useDisclosure();

    const location = useLocation();
    const route = location.pathname;
    const { auth, setAuth } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hasProvider, setHasProvider] = useState(null);
    const initialState = { accounts: [], balance: "", chainId: "" };
    const [wallet, setWallet] = useState(initialState);

    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");

    const patternCommunityCard = /^\/communities\/\d+$/;
    const patternCommunity = /^\/communities$/;

    async function handlePollSubmit() {
        const id = toast.loading("Please wait while we create your Poll");
        if (!question || !option1 || !option2 || !option3) {
            toast.error("Field's can't be empty!!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            const newPoll = {
                pollTitle: question,
                belongsToCommunity: false,
                communityID: "",
                option1: {
                    optionName: option1,
                    optionConsensus: 0,
                },
                option2: {
                    optionName: option2,
                    optionConsensus: 0,
                },
                option3: {
                    optionName: option3,
                    optionConsensus: 0,
                },
                totalOptionConsensus: 0,
            };
            const result = axios.post("/poll/postPoll", newPoll);
            const data_ID = await result;
            console.log("the result poll id would be : ", data_ID.data.data);
            const bodyPollIDToUser = {
                userID: mongoID,
                pollID: data_ID.data.data
            }
            try{
                const resultOfPushing = axios.post('/user/addPollIdToUser', bodyPollIDToUser)
            } catch(errPushingID){
                console.log("error in pusing id to user", errPushingID)
            }
            const _provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = _provider.getSigner();
            const contratFactory = new ethers.Contract(
                FactoryABI.address,
                FactoryABI.abi,
                signer
            );
            console.log(contratFactory);
            const poll = await contratFactory.createPoll(
                communityRules.domain,
                communityRules.region,
                communityRules.gender,
                data_ID.data.data
            );
            await poll.wait();
            toast.update(id, {
                render: "Poll created successfully!",
                type: "success",
                isLoading: false,
                autoClose: 4000,
            });
            onClose();
        }
    }

    async function handleCommunityPollPollSubmit() {
        onCommunityPollClose();
        const id = toast.loading("Please wait while we create your poll");
        const communityId = route.charAt(route.lastIndexOf("/") + 1);
        console.log(communityId);
        if (!question || !option1 || !option2 || !option3) {
            toast.error("Field's can't be empty!!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            const newPoll = {
                pollTitle: question,
                belongsToCommunity: true,
                communityID: communityId,
                option1: {
                    optionName: option1,
                    optionConsensus: 0,
                },
                option2: {
                    optionName: option2,
                    optionConsensus: 0,
                },
                option3: {
                    optionName: option3,
                    optionConsensus: 0,
                },
                totalOptionConsensus: 0,
            };
            const result = axios.post("/poll/postPoll", newPoll);
            const data_ID = await result;
            console.log("the result poll id would be : ", data_ID.data.data);
            const _provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = _provider.getSigner();
            const contratFactory = new ethers.Contract(
                FactoryABI.address,
                FactoryABI.abi,
                signer
            );
            console.log(contratFactory);
            const poll = await contratFactory.createPoll(
                data_ID.data.data,
                communityRules.domain,
                communityRules.region,
                communityRules.gender
            );
            await poll.wait();
            toast.update(id, {
                render: "Poll created successfully!",
                type: "success",
                isLoading: false,
                autoClose: 4000,
            });
        }
    }

    const [communityRules, setCommunityRules] = useState({
        domain: "",
        region: "",
        gender: "",
    });

    const QUESTION_LIMIT = 150;
    const handleQuestionChange = (event) => {
        const updateQuestion = event.target.value.slice(0, QUESTION_LIMIT);
        setQuestion(updateQuestion);
    };

    const OPTION_LIMIT = 50;
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
                updateWallet(accounts);
            } else {
                setWallet(initialState);
            }
        };

        const refreshChain = (chainId) => {
            setWallet((wallet) => ({ ...wallet, chainId }));
        };

        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true });
            setHasProvider(provider);
            const _provider = new ethers.providers.Web3Provider(window.ethereum);

            if (_provider) {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                refreshAccounts(accounts);
                window.ethereum.on("accountsChanged", refreshAccounts);
                window.ethereum.on("chainChanged", refreshChain);
                const user = {
                    metaMaskID: accounts[0],
                };
                const result = await axios.post(
                    "/user/getMongoDbIdUsingMetamask",
                    user
                );
                dispatch(login(result.data.data));
            }
        }

        // const handleCreateCommunity = async () => {
        //     const id = toast.loading("Please wait creating your community");
        //     const domain = communityRules.domain;
        //     const _provider = new ethers.providers.Web3Provider(window.ethereum);
        //     if (_provider) {
        //         const signer = _provider.getSigner();
        //         const factoryContract = new ethers.Contract(FactoryABI.address, FactoryABI.abi, signer);
        //         console.log(factoryContract);
        //         const community = await factoryContract.createCommunity(
        //             domain,
        //             communityRules.region,
        //             communityRules.gender,
        //             name,
        //             description
        //         );
        //         await community.wait();
        //         console.log(community);
        //         const getDeployedAddress = await factoryContract.getLastCommunityAddress();
        //         console.log(getDeployedAddress);
        //         const communityContract = new ethers.Contract(getDeployedAddress, ZKCommunityABI.abi, signer);
        //         console.log(communityContract);
        //         const communityIdBigNumber = await communityContract.getCommunityId();
        //         console.log(communityIdBigNumber);
        //         const communityId = communityIdBigNumber.toNumber();
        //         console.log(communityId);
        //         const body = {
        //             userID: mongoID,
        //             communityID: communityId
        //         }
        //         try {
        //             const result = await axios.post('/user/addCommunityForUser', body)
        //             console.log("Community id added to user instance")
        //         } catch (errPush) {
        //             console.log("error in pushing community ID to user instance")
        //         }
        //     }
        //     toast.update(id, {
        //         render: "Community created successfully!",
        //         type: "success",
        //         isLoading: false,
        //         autoClose: 4000
        //     })
        // }

        const NAME_LIMIT = 20;
        const DESCRIPTION_LIMIT = 100;

        const handleNameChange = (event) => {
            const updatedName = event.target.value.slice(0, NAME_LIMIT);
            setName(updatedName);
        };

        getProvider();

        return () => {
            window.ethereum?.removeListener("accountsChanged", refreshAccounts);
            window.ethereum?.removeListener("chainChanged", refreshChain);
        };
    }, []);

    const updateWallet = async (accounts) => {
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
    };

    const handleConnect = async () => {
        setIsConnecting(true);
        await window.ethereum
            .request({
                method: "eth_requestAccounts",
            })
            .then((accounts) => {
                setError(false);
                updateWallet(accounts);
            })
            .catch((err) => {
                setError(true);
                setErrorMessage(err.message);
            });
        setIsConnecting(false);
    };

    const handleRulesInput = (e) => {
        setCommunityRules({
            ...communityRules,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateCommunity = async () => {
        const id = toast.loading("Please wait creating your community");
        const domain = communityRules.domain;
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        if (_provider) {
            const signer = _provider.getSigner();
            const factoryContract = new ethers.Contract(
                FactoryABI.address,
                FactoryABI.abi,
                signer
            );
            console.log(factoryContract);
            const community = await factoryContract.createCommunity(
                domain,
                communityRules.region,
                communityRules.gender,
                name,
                description
            );
            await community.wait();
            console.log(community);
            const getDeployedAddress =
                await factoryContract.getLastCommunityAddress();
            console.log(getDeployedAddress);
            const communityContract = new ethers.Contract(
                getDeployedAddress,
                ZKCommunityABI.abi,
                signer
            );
            console.log(communityContract);
            const communityIdBigNumber = await communityContract.getCommunityId();
            console.log(communityIdBigNumber);
            const communityId = communityIdBigNumber.toNumber();
            console.log(communityId);
            const body = {
                userID: mongoID,
                communityID: communityId
            }
            try {
                const result = await axios.post('/user/addCommunityForUser', body)
                console.log("Community id added to user instance")
            } catch (errPush) {
                console.log("error in pushing community ID to user instance")
            }
        }
        toast.update(id, {
            render: "Community created successfully!",
            type: "success",
            isLoading: false,
            autoClose: 4000,
        });
    };

    const NAME_LIMIT = 20;
    const DESCRIPTION_LIMIT = 100;

    const handleNameChange = (event) => {
        const updatedName = event.target.value.slice(0, NAME_LIMIT);
        setName(updatedName);
    };

    const handleDescriptionChange = (event) => {
        const updatedDescription = event.target.value.slice(0, DESCRIPTION_LIMIT);
        setDescription(updatedDescription);
    };

    const menuItems = ["Communities", "Polls", "Profile"];

    const routes = ["/communities", "/polls", "/profile"];

    // const handleCreatePoll = async () => {
    //     const id = toast.loading("Please wait creating your poll");
    //     const _provider = new ethers.providers.Web3Provider(window.ethereum);
    //     if (_provider) {
    //         const signer = _provider.getSigner();
    //         const factoryContract = new ethers.Contract(FactoryABI.address, FactoryABI.abi, signer);
    //         const poll = await factoryContract.createPoll(

    //             communityRules.domain,
    //             communityRules.region,
    //         )
    //         await poll.wait();
    //     }
    //     toast.update(id, {
    //         render: "Poll created successfully!",
    //         type: "success",
    //         isLoading: false,
    //         autoClose: 4000
    //     })
    // }

    console.log(route);

    return (
        <Navbar
            position="static"
            style={{ background: "transparent", height: "80px" }}
            isBlurred={false}
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="mb-5"
        >
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <Link color="foreground" href="/">
                        <AcmeLogo />
                        <p className="font-bold text-inherit">Zk-Gas</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex gap-10"
                justify="center"
                style={{ marginLeft: "-30%", marginRight: "-10%" }}
            >
                <NavbarBrand>
                    <Link color="foreground" href="/">
                        <AcmeLogo style={{ color: "white" }} />
                        <p className="font-bold text-inherit text-3xl text-white">Zk-Gas</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end">
                <div className="flex gap-7">
                    <NavbarItem>
                        <Link color="foreground" href="/communities" className="text-xl">
                            <BsPeople className="text-white" />
                            &nbsp;&nbsp;
                            <span className="text-white"> Communities</span>
                        </Link>
                    </NavbarItem>

                    <NavbarItem>
                        <Link color="foreground" href="/polls" className="text-xl">
                            <MdOutlinePoll className="text-white" />
                            &nbsp;&nbsp;
                            <span className="text-white">Polls</span>
                        </Link>
                    </NavbarItem>

                    <NavbarItem>
                        <Link color="foreground" href="/profile" className="text-xl">
                            <RxAvatar className="text-white" />
                            &nbsp;&nbsp;
                            <span className="text-white">Profile</span>
                        </Link>
                    </NavbarItem>
                </div>
                <NavbarItem className="flex gap-3" style={{ marginRight: "-25%" }}>
                    {patternCommunity.test(route) && (
                        <Button
                            as={Link}
                            color="success"
                            variant="flat"
                            onClick={onCommunityOpen}
                            startContent={<FaPlus />}
                        >
                            Community
                        </Button>
                    )}
                    {route.indexOf("polls") >= 0 && (
                        <Button
                            as={Link}
                            color="success"
                            variant="flat"
                            startContent={<FaPlus />}
                            onClick={onOpen}
                        >
                            Public Poll
                        </Button>
                    )}
                    {patternCommunityCard.test(route) && (
                        <Button
                            as={Link}
                            color="success"
                            variant="flat"
                            startContent={<FaPlus />}
                            onClick={onCommunityPollOpen}
                        >
                            Community Poll
                        </Button>
                    )}
                    <Button
                        onClick={handleConnect}
                        as={Link}
                        color="warning"
                        variant="flat"
                    >
                        <Image src={Metamask} alt="Metamask Logo" width={25} />{" "}
                        {wallet.accounts[0]?.length > 0
                            ? wallet.accounts[0].substring(0, 5) +
                            "..." +
                            wallet.accounts[0].substring(
                                wallet.accounts[0].length - 5,
                                wallet.accounts[0].length
                            )
                            : "Connect wallet"}
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2
                                    ? "warning"
                                    : index === menuItems?.length - 1
                                        ? "danger"
                                        : "foreground"
                            }
                            href={routes[index]}
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" classNames={{
                body: "py-6",
                backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                header: "border-b-[1px] border-[#292f46]",
                footer: "border-t-[1px] border-[#292f46]",
                closeButton: "hover:bg-white/5 active:bg-white/10",
            }}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Create a Public Poll
                            </ModalHeader>
                            <ModalBody>
                                <Textarea
                                    autoFocus
                                    label="Question"
                                    placeholder="Enter question (max 50 characters)"
                                    value={question}
                                    onChange={handleQuestionChange}
                                    variant="flat"
                                />
                                {question.length >= QUESTION_LIMIT && (
                                    <div className="text-sm text-error ml-1 text-red-500">
                                        Question must be less than 150 characters.
                                    </div>
                                )}
                                <Input
                                    label="Option1"
                                    placeholder="Enter first option (max 15 characters)"
                                    value={option1}
                                    onChange={handleOption1Change}
                                />
                                {option1.length >= OPTION_LIMIT && (
                                    <div className="text-sm text-error ml-1 text-red-500">
                                        Option must be less than 50 characters.
                                    </div>
                                )}
                                <Input
                                    label="Option2"
                                    placeholder="Enter second option (max 15 characters)"
                                    value={option2}
                                    onChange={handleOption2Change}
                                />
                                {option2.length >= OPTION_LIMIT && (
                                    <div className="text-sm text-error ml-1 text-red-500">
                                        Option must be less than 50 characters.
                                    </div>
                                )}
                                <Input
                                    label="Option3"
                                    placeholder="Enter three option (max 15 characters)"
                                    value={option3}
                                    onChange={handleOption3Change}
                                />
                                {option3.length >= OPTION_LIMIT && (
                                    <div className="text-sm text-error ml-1 text-red-500">
                                        Option must be less than 50 characters.
                                    </div>
                                )}
                                <Input
                                    label="Domain"
                                    placeholder="Enter your domain"
                                    name="domain"
                                    onChange={handleRulesInput}
                                />
                                <Select
                                    label="Select region"
                                    name="region"
                                    onChange={handleRulesInput}
                                >
                                    <SelectItem value="asia-pacific" key="AP">
                                        Asia Pacific
                                    </SelectItem>
                                    <SelectItem value="north-america" key="NA">
                                        North America
                                    </SelectItem>
                                    <SelectItem value="europe" key="EU">
                                        Europe
                                    </SelectItem>
                                    <SelectItem value="middle-east" key="ME">
                                        Middle East
                                    </SelectItem>
                                </Select>
                                <Select
                                    label="Select gender"
                                    name="gender"
                                    onChange={handleRulesInput}
                                >
                                    <SelectItem value="male" key="M">
                                        Male
                                    </SelectItem>
                                    <SelectItem value="female" key="F">
                                        Female
                                    </SelectItem>
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    onPress={onClose}
                                    color="primary"
                                    onClick={handlePollSubmit}
                                >
                                    Create Poll
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                isOpen={isCommunityPollOpen}
                onOpenChange={onCommunityPollOpenChange}
                placement="top-center"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Create a Community Poll
                            </ModalHeader>
                            <ModalBody>
                                <Textarea
                                    autoFocus
                                    label="Question"
                                    placeholder="Enter question (max 50 characters)"
                                    value={question}
                                    onChange={handleQuestionChange}
                                    variant="flat"
                                />
                                {question.length >= QUESTION_LIMIT && (
                                    <div className="text-sm text-error ml-1 text-red-500">
                                        Question must be less than 150 characters.
                                    </div>
                                )}
                                <Input
                                    label="Option1"
                                    placeholder="Enter first option (max 15 characters)"
                                    value={option1}
                                    onChange={handleOption1Change}
                                />
                                {option1.length >= OPTION_LIMIT && (
                                    <div className="text-sm text-error ml-1 text-red-500">
                                        Option must be less than 50 characters.
                                    </div>
                                )}
                                <Input
                                    label="Option2"
                                    placeholder="Enter second option (max 15 characters)"
                                    value={option2}
                                    onChange={handleOption2Change}
                                />
                                {option2.length >= OPTION_LIMIT && (
                                    <div className="text-sm text-error ml-1 text-red-500">
                                        Option must be less than 50 characters.
                                    </div>
                                )}
                                <Input
                                    label="Option3"
                                    placeholder="Enter three option (max 15 characters)"
                                    value={option3}
                                    onChange={handleOption3Change}
                                />
                                {option3.length >= OPTION_LIMIT && (
                                    <div className="text-sm text-error ml-1 text-red-500">
                                        Option must be less than 50 characters.
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={handleCommunityPollPollSubmit}>
                                    Create Poll
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                isOpen={isCommunityOpen}
                onOpenChange={onCommunityOpenChange}
                placement="top-center"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                  }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Create a Community
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Community Name"
                                    placeholder="Enter name (max 20 characters)"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                                {name.length >= NAME_LIMIT && (
                                    <div className="text-sm text-error ml-1 text-red-500">
                                        Name must be less than 20 characters.
                                    </div>
                                )}
                                <Textarea
                                    label="Community Description"
                                    placeholder="Enter description (max 100 characters)"
                                    onChange={handleDescriptionChange}
                                    value={description}
                                />
                                {description.length >= DESCRIPTION_LIMIT && (
                                    <div className="text-sm text-error ml-1 text-red-500">
                                        Description must be less than 100 characters.
                                    </div>
                                )}
                                <Input
                                    label="Domain"
                                    placeholder="Enter your domain"
                                    name="domain"
                                    onChange={handleRulesInput}
                                />
                                <Select
                                    label="Select region"
                                    name="region"
                                    onChange={handleRulesInput}
                                >
                                    <SelectItem value="asia-pacific" key="AP">
                                        Asia Pacific
                                    </SelectItem>
                                    <SelectItem value="north-america" key="NA">
                                        North America
                                    </SelectItem>
                                    <SelectItem value="europe" key="EU">
                                        Europe
                                    </SelectItem>
                                    <SelectItem value="middle-east" key="ME">
                                        Middle East
                                    </SelectItem>
                                </Select>
                                <Select
                                    label="Select gender"
                                    name="gender"
                                    onChange={handleRulesInput}
                                >
                                    <SelectItem value="male" key="M">
                                        Male
                                    </SelectItem>
                                    <SelectItem value="female" key="F">
                                        Female
                                    </SelectItem>
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    onClick={handleCreateCommunity}
                                    color="primary"
                                    onPress={onClose}
                                >
                                    Create Community
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <ToastContainer position="top-center" />
        </Navbar>
    );
}
