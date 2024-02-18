import React, { useState } from 'react';
import { useMetaMask } from "../../hooks/useMetamask";
import Comments from "./Comments";
import PersonalWallHeader from './PersonalWallHeader.jsx';
import Avatar from "../../assets/user_example_avatar.png"
import { Image, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Tooltip, Link, Textarea } from "@nextui-org/react"
import "../../hooks/useMetamask";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../api/axiosConfig.js'

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
    const [uniqueId, setUniqueId] = useState('');
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        userID: "",
        commentString: ""
    })

    const handleFormChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const result = axios.post('/user/addCommentForUser', formData)
            setFormData({
                userID: "",
                commentString: ""
            })
            toast.success('Comment Posted!!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (err) {
            toast.error('Invalid Unique ID', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const id = useSelector((state) => state.user.userId)

    return (
        // minHeight: '200vh', '
        <div style={{ display: "flex", flexDirection: "column", padding: "20px", minHeight: '100vh', background: 'linear-gradient(to bottom, #1b1521, #47193d)' }}>
            <PersonalWallHeader />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="userImage" style={{ borderRadius: "50%", overflow: "hidden", marginRight: "10px" }}>
                    <Image src={Avatar} alt="User Profile" width={100} height={100} style={{ maxWidth: '100%' }} />
                </div>

                <div className="fine" style={{ flex: "1", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                        <p className="flex items-center font-bold text-left text-[1.4rem] text-white">{wallet.accounts[0]}</p>
                        <Button key="blur" onPress={onOpen} color="primary" style={{ textAlign: "right", marginBottom: "10px" }}>Share Profile</Button>

                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>

                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Share your profile</ModalHeader>
                                        <ModalBody className="flex-col">
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "1rem" }}>
                                                <Input
                                                    label="Unique ID"
                                                    value={id}
                                                    readOnly
                                                />
                                                <Tooltip content="Copy to clipboard">
                                                    <Button
                                                        color="primary"
                                                        isIconOnly
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(
                                                                id
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
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: '10rem' }}>
                {/* Comments container */}
                <Comments />

                {/* Form container */}
                <form onSubmit={handleSubmit} style={{ marginTop: "40px", backgroundColor: '#cfc6e2', color: '#000', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', width: '600px', marginLeft: '20px' }}>
                    <h1
                        className="text-2xl font-bold text-gray-800 mb-8"
                    // style={{ marginBottom: '20px', textAlign: 'center', fontSize: '1rem', color: '#000', fontWeight: 'bold', letterSpacing: '0.05em' }}
                    >Share Your Thoughts...</h1>
                    <div className="form-group" style={{ marginTop: "36px" }}>
                        {/* <label htmlFor="uniqueId" style={{ fontWeight: 'bold' }}>Unique ID:</label> */}
                        {/* <input
                            type="text"
                            id="uniqueId"
                            value={formData.userID}
                            name="userID"
                            onChange={handleFormChange}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', marginBottom: '20px', color: 'black', marginTop: "5px" }}
                        /> */}
                        <Input
                            id="uniqueId"
                            value={formData.userID}
                            type="text"
                            label="Unique ID"
                            placeholder="Enter Unique ID"
                            name="userID"
                            onChange={handleFormChange}
                            required />
                    </div>
                    <div className="form-group" style={{ marginTop: "25px" }}>
                        {/* <label htmlFor="message" style={{ fontWeight: 'bold' }}>Message:</label> */}
                        {/* <textarea
                            id="message"
                            name="commentString"
                            value={formData.commentString}
                            onChange={handleFormChange}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', marginBottom: '20px', color: 'black', marginTop: "5px" }}
                        ></textarea> */}
                        <Textarea
                            label="Message"
                            placeholder="Share your thoughts here"
                            id="message"
                            name="commentString"
                            value={formData.commentString}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    {/* <button type="submit"
                        style={{
                            backgroundColor: '#fff', color: '#000', padding: '10px 20px', border: 'none',
                            borderRadius: '5px', cursor: 'pointer'
                        }}>Post</button> */}
                    <Button type="submit"
                        radius = "lg"
                        style={{
                            marginTop: "30px", backgroundColor: '#fff', color: '#000', padding: '10px 20px', border: 'none',
                            cursor: 'pointer'
                        }}

                    >
                        Post
                    </Button>
                </form>
            </div>
        </div>
    );
}
