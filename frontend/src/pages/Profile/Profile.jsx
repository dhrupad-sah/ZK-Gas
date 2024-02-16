import React, { useState } from 'react';
import { useMetaMask } from "../../hooks/useMetamask";
import Comments from "./Comments";
import Avatar from "../../assets/user_example_avatar.png"
import { Image, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Tooltip, Link } from "@nextui-org/react"
import "../../hooks/useMetamask";
import { FaRegCopy } from "react-icons/fa";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    XIcon,
    EmailIcon,
    TelegramIcon,
    WhatsappIcon,
    LinkedinIcon,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon
} from "react-share";

export default function Profile() {
    const { wallet, hasProvider, isConnecting } = useMetaMask();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Address:', address);
        console.log('Message:', message);
        // You can add logic to submit the form data to a backend server or perform any other actions here
    };

    return (
        <div className="container" style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
            <div className="profiler" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="userImage" style={{ borderRadius: "50%", overflow: "hidden", marginRight: "10px" }}>
                    <Image src={Avatar} alt="User Profile" width={150} height={150} style={{ maxWidth: '100%' }} />
                </div>
                <div className="fine" style={{ flex: "1", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                        <p className="flex items-center font-bold text-left">{wallet.accounts[0]}</p>
                        <Button key="blur" onPress={onOpen} color="primary" style={{ textAlign: "right", marginBottom: "10px" }}>Share Profile</Button>
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Share your profile</ModalHeader>
                                        <ModalBody className="flex-col">
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "1rem" }}>
                                                <Input
                                                    label="Link"
                                                    value={`https://zk-gas.com/profile/${wallet.accounts[0]}`}
                                                    readOnly
                                                />
                                                <Tooltip content="Copy to clipboard">
                                                    <Button
                                                        color="primary"
                                                        isIconOnly
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(
                                                                `https://zk-gas.com/profile/${wallet.accounts[0]}`
                                                            );
                                                        }}>
                                                        <FaRegCopy />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                            <div className="text-base mt-2">
                                                <p>Share here</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <FacebookShareButton
                                                    url={"https://www.facebook.com"}
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <FacebookIcon size={32} round />
                                                </FacebookShareButton>
                                                <TwitterShareButton
                                                    url={"https://twitter.com/home"}
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <XIcon size={32} round />
                                                </TwitterShareButton>
                                                <TelegramShareButton
                                                    url={"https://web.telegram.org/"}
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <TelegramIcon size={32} round />
                                                </TelegramShareButton>
                                                <WhatsappShareButton
                                                    url={"https://web.whatsapp.com/"}
                                                    separator=":: "
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <WhatsappIcon size={32} round />
                                                </WhatsappShareButton>
                                                <LinkedinShareButton
                                                    url={"https://www.linkedin.com/"}
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <LinkedinIcon size={32} round />
                                                </LinkedinShareButton>
                                                <EmailShareButton
                                                    url={"mailto:"}
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <EmailIcon size={32} round />
                                                </EmailShareButton>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                    <Divider style={{ borderTop: "2px solid #9e9d9d", width: "100%" }} />
                </div>
            </div>

            {/* Form component */}
            <form method="POST" action='/user/addCommentForUser' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={handleMessageChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Post</button>
            </form>

            {/* Existing profile content */}
            <Comments />
        </div>
    );
}
