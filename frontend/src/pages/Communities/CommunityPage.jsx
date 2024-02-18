import { useLocation } from "react-router-dom";
import FactoryABI from "../../../ABI/Factory.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { ChatView, ChatUIProvider, darkChatTheme } from "@pushprotocol/uiweb";
import 'react-toastify/dist/ReactToastify.css'
import axios from '../../api/axiosConfig.js'
import { Card, CardBody, ScrollShadow } from "@nextui-org/react";
import PollCard from "../Polls/PollCard";

export default function CommunityPage() {
    const [allCommunityPolls, setAllCommunityPolls] = useState([]);
    const PushChatTheme = {
        borderRadius: {
            ChatView: "32px",
            chatProfile: "29px",
            messageInput: "29px",
            searchInput: "99px",
            modal: "16px",
            modalInnerComponents: "12px",
        },

        backgroundColor: {
            ChatViewBackground: "rgba(18, 18, 24, 0.65)",
            chatProfileBackground: "#2A2A39",
            messageInputBackground: "transparent",
            chatSentBubbleBackground: "#AF3FB1",
            chatReceivedBubbleBackground: "#424258",
            encryptionMessageBackground: "#2A2A39",
            buttonBackground: "rgb(202, 89, 155)",
            modalBackground: "#2F3137",
            criteriaLabelBackground: "rgb(47, 49, 55)",
            modalInputBackground: "transparent",
            modalHoverBackground: "rgb(64, 70, 80)",
            buttonDisableBackground: "#787E99",
            toastSuccessBackground:
                "linear-gradient(90.15deg, #30CC8B -125.65%, #30CC8B -125.63%, #2F3137 42.81%)",
            toastErrorBackground:
                "linear-gradient(89.96deg, #FF2070 -101.85%, #2F3137 51.33%)",
            toastShadowBackground: "#00000010",
        },

        fontSize: {
            chatProfileText: "17px",
            messageInputText: "16px",
            chatSentBubbleText: "14px",
            chatReceivedBubbleText: "14px",
            timestamp: "15px",
            // chatBubblesSenderAddressText: '16px',
            encryptionMessageText: "13px",
            chatReceivedBubbleAddressText: "12px",
            chatReceivedBubbleTimestampText: "12px",
            chatSentBubbleTimestampText: "12px",
            searchInputText: "16px",
            searchPlaceholderText: "16px",
        },

        fontWeight: {
            chatProfileText: "500",
            messageInputText: "400",
            chatSentBubbleText: "400",
            chatReceivedBubbleText: "400",
            timestamp: "300",
            // chatBubblesSenderAddressText: '300',
            encryptionMessageText: "400",
            chatReceivedBubbleAddressText: "300",
            chatReceivedBubbleTimestampText: "400",
            chatSentBubbleTimestampText: "400",
            searchInputText: "400",
            searchPlaceholderText: "400",
        },

        fontFamily: "inherit",

        border: {
            ChatView: "1px solid #3A3A4A",
            chatProfile: "1px solid #3A3A4A",
            messageInput: "1px solid #3A3A4A",
            searchInput: "1px solid transparent",
            modal: "none",
            modalInnerComponents: "1px solid rgb(74, 79, 103)",
        },

        iconColor: {
            emoji: "rgba(120, 126, 153, 1)",
            attachment: "rgba(120, 126, 153, 1)",
            sendButton: "rgba(120, 126, 153, 1)",
            groupSettings: "rgba(120, 126, 153, 1)",
        },
        textColor: {
            chatProfileText: "#fff",
            messageInputText: "rgb(182, 188, 214)",
            chatSentBubbleText: "#fff",
            chatReceivedBubbleText: "#fff",
            timestamp: "#87879A",
            // chatBubblesSenderAddressText: 'rgb(182, 188, 214)',
            encryptionMessageText: "rgb(182, 188, 214)",
            buttonText: "#fff",
            chatReceivedBubbleAddressText: "#87879A",
            chatReceivedBubbleTimestampText: "red",
            chatSentBubbleTimestampText: "red",
            searchInputText: "#fff",
            searchPlaceholderText: "rgb(101, 119, 149)",
            modalHeadingText: "#fff",
            modalSubHeadingText: "rgb(182, 188, 214)",
            buttonDisableText: "#B6BCD6",
        },
        backdropFilter: "blur(6.5px)",
        spinnerColor: "rgb(202, 89, 155)",
        scrollbarColor: "rgb(202, 89, 155)",
        // backdropFilter: 'blur(6.5px)',
        // modalBackgroundColor:'rgba(47, 49, 55, 1)',
        // spinnerColor:'rgb(202, 89, 155)',
        // scrollbarColor:'rgb(202, 89, 155)',
        // //the rest param needs to be included in categories
        // modalPrimaryTextColor: '#B6BCD6',
        // modalSearchBarBorderColor: '#4A4F67',
        // modalSearchBarBackground: '#282A2E',
        // snapFocusBg: '#404650',
        // groupButtonBackgroundColor: '#2F3137',
        // groupButtonTextColor: '#787E99',
        // modalConfirmButtonBorder: '1px solid #787E99',
        // groupSearchProfilBackground: '#404650',
        // modalInputBorderColor: '#4A4F67',
        // snackbarBorderText: '#B6BCD6',
        // snackbarBorderIcon:
        //     'brightness(0) saturate(100%) invert(89%) sepia(8%) saturate(1567%) hue-rotate(191deg) brightness(86%) contrast(93%)',
        // modalContentBackground: '#2F3137',
        // modalProfileTextColor: '#B6BCD6',
        // toastSuccessBackground:
        //     'linear-gradient(90.15deg, #30CC8B -125.65%, #30CC8B -125.63%, #2F3137 42.81%)',
        // toastErrorBackground:
        //     'linear-gradient(89.96deg, #FF2070 -101.85%, #2F3137 51.33%)',
        // toastShadowColor: '#00000010',
        // toastBorderColor: '#4A4F67',
        // mainBg: '#000',
        // modalBorderColor: '#4A4F67',
        // modalDescriptionTextColor: '#787E99',
        // modalIconColor: '#787E99',
        // pendingCardBackground: 'rgba(173, 176, 190, 0.08)',
        // modalHeadingColor: '#B6BCD6',
        // defaultBorder: '#4A4F67',
    };

    useEffect(() => {
        const fetchDataForPrivatePolls = async () => {
            try {
                const community = {
                    communityID: route.charAt(route.lastIndexOf('/') + 1)
                }
                const response = await axios.post('/poll/getAllPollsOfCommunity', community);
                if (response.data.data != null) {
                    console.log(response.data.data)
                    setAllCommunityPolls(response.data.data)
                }

            } catch (error) {
                console.log("Error occured at frontend to fetch polls")
            }
        };

        fetchDataForPrivatePolls();
    }, []);

    const location = useLocation();
    const route = location.pathname;
    console.log(route);
    const [communityRules, setCommunityRules] = useState([]);
    useEffect(() => {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        const getRules = async () => {
            if (_provider) {
                const signer = _provider.getSigner();
                const FactoryContract = new ethers.Contract(
                    FactoryABI.address,
                    FactoryABI.abi,
                    signer
                );
                const id = route.split("/")[2];
                console.log(id);
                const communityAddress = await FactoryContract.getCommunity(id);
                console.log(communityAddress);
                const communityRules = await FactoryContract.getCommunityDetails(communityAddress);
                console.log(communityRules);
                setCommunityRules(communityRules);
            }
        }
        getRules();
    }, [])
    return (
        <div className="flex justify-between mx-20">
            <Card style={{backgroundColor: "transparent"}}>
                <CardBody style={{ width: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: "800px" }}>
                    <div className="text-xl pb-2 font-bold">
                        <span style={{color: "#cfc6e2"}}>Community Polls</span>
                    </div>
                    <ScrollShadow hideScrollBar className="w-[480px] h-[750px] flex-col items-center justify-center px-10">
                        {allCommunityPolls.map((poll) => (
                            poll.belongsToCommunity && <PollCard key={poll?.pollID} pollContent={poll} />
                        ))}
                    </ScrollShadow>
                </CardBody>
            </Card>
            <div
                style={{
                    height: "85vh",
                    margin: "",
                    background: "black",
                    borderRadius: "40px",
                    width: "120vh"
                }}
            >
                <ChatUIProvider theme={darkChatTheme}>
                    <ChatView
                        chatId="49f0ff3635e99467bb9b4a71d57bfadd0a2314646e8833ff3c93f3b6078d93f7"
                        limit={10}
                        isConnected={true}
                        onVerificationFail={() => setShowFaucet(true)}
                    />
                </ChatUIProvider>
            </div>
        </div>
    )
}