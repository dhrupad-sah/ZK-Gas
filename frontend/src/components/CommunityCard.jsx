import { Card, CardHeader, CardBody, CardFooter, Divider, Avatar, Chip, LinkIcon, Tooltip } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { FaHashtag } from "react-icons/fa";
import { Button, useDisclosure, Link, Modal, ModalContent, Accordion, AccordionItem, ModalHeader, ModalBody, ModalFooter, Input, Textarea, SelectItem, Select } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import axios from '../api/axiosConfig.js';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { ScrollShadow } from "@nextui-org/react";

export default function CommunityCard({ community }) {
    const communitySplits = community.communityName.split(" ");
    const location = useLocation();
    const route = location.pathname;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isRulesOpen, onOpen: onRulesOpen, onOpenChange: onRulesOpenChange } = useDisclosure();
    const { isOpen: isMembersOpen, onOpen: onMemberOpen, onOpenChange: onMemberOpenChange } = useDisclosure();
    const [description, setDescription] = useState("");
    const [allUserFromCommunity, setAllUserFromCommunity] = useState([])

    const [communityRules, setCommunityRules] = useState({
        email: "",
        region: "",
        gender: ""
    });

    useEffect(() => {
        const getAllUsersUsingCommunityID = async () => {
            try{
                const body = {
                    communityID: community.communityId
                }
                const result = await axios.post('/user/getAllUserUsingCommunities', body)
                // console.log("the communitites wil be : ", result.data.data)
                setAllUserFromCommunity(result.data.data)
            } catch(err){
                console.log("error in fetching all user for a communithy")
            }
        }
        getAllUsersUsingCommunityID();
    }, [])

    const handleRulesInput = (e) => {
        setCommunityRules({
            ...communityRules,
            [e.target.name]: e.target.value
        });
    }


    const stringToHex = (str) => {
        let hex = '';
        for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i);
            const hexValue = charCode.toString(16);
            hex += hexValue.padStart(2, '0');
        }
        return hex;
    };

    const userMongoID = useSelector((state) => state.user.userId)

    const handleJoinCommunity = async () => {
        const id = toast.loading("Please wait verifying your proof");
        const email = communityRules.email;
        const indexAt = email.indexOf('@');
        console.log(indexAt);
        let indexDot = email.length;
        for (var i = indexAt; i < email.length; i++) {
            if (email[i] == '.') {
                indexDot = i;
                break;
            }
        }
        console.log(email);
        let _domain = email.slice(indexAt + 1, indexDot);
        const domain = "0x" + stringToHex(_domain);
        const region = "0x" + stringToHex(communityRules.region);
        const gender = "0x" + stringToHex(communityRules.gender);
        console.log(domain, region, gender);
        const res = await fetch("http://localhost:3000/joinCommunity", {
            method: "POST",
            body: JSON.stringify({ communityId: community.communityId, domain, region, gender }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        // console.log(res.json());
        console.log(res);
        res.status === 200 ?
            toast.update(id, {
                render: "Proof verified Successfully!",
                type: "success",
                isLoading: false,
                autoClose: 4000
            }) : toast.update(id, {
                render: "Proof verification failed! Please try again!",
                type: "error",
                isLoading: false,
                autoClose: 4000
            })
        if (res.status === 200) {
            const user = {
                userID: userMongoID,
                communityID: community.communityId
            }
            try {
                const result = await axios.post('/user/addCommunityForUser', user)
            } catch (err) {
                console.log("Error in adding community to user array");
                console.log(err)
            }
        }

    }
    console.log(community)

    // const [domain, setDomain] = useState();
    // const [region, setRegion] = useState();
    // const [gender, setGender] = useState();

    // setDomain(community.domainPub);

    // // if(community.genderPub === 'M') {
    // //     setGender('Male');
    // // } else {
    // //     if(gender === 'F') {
    // //         setGender('Female');
    // //     } else {
    // //         setGender('Male/Female');
    // //     }
    // // }
    // // if(region === 'AP') {
    // //     setRegion('Asia Pacific');
    // // } else if(region === 'ME') {
    // //     setRegion('Middle East');
    // // } else if(region === 'NA') {
    // //     setRegion('North America');
    // // } else {
    // //     setRegion('Europe');
    // // }

    return (
        <>
            <Card className="w-[350px] h-[250px] p-2 m-4">
                <CardHeader className="flex justify-between" color="foreground">
                    <div className="flex gap-9 items-center" >
                        <Avatar
                            alt="community-card"
                            height={40}
                            radius="sm"
                            name={communitySplits.reduce((a, b) => a.charAt(0) + b.charAt(0))}
                            width={40}
                            isBordered
                            color="primary"
                        />
                        <div className="flex flex-col ">
                            <p className="text-base ">{community.communityName}</p>
                            {/* <p className="text-small text-default-500">nextui.org</p> */}
                        </div>
                    </div>
                    {/* <div>
                        <IoMdInformationCircleOutline onPress={onRulesOpen} />
                    </div> */}
                    <Button color="secondary" variant="bordered" size="md" onPress={onRulesOpen}>
                        Rules
                    </Button>
                    {/* <Chip variant="bordered" startContent={<FaHashtag />}>
                        {community.communityId}
                    </Chip> */}
                </CardHeader>
                <Divider />

                <CardBody color="foreground" as={Link} href={community.joined ? `/communities/${community.communityId}` : "#"} style={{ pointerEvents: community.joined ? "all" : "none" }}>
                    <Tooltip color="foreground" content={community.joined ? "Click to enter" : "Join community before entering"} showArrow={true} placement="bottom" classNames={{
                    }}>
                        <p>{community.communityDescription}</p>
                    </Tooltip>
                </CardBody>
                <Divider />
                <CardFooter className="flex justify-between">
                    {/* <Button color="secondary" variant="flat" size="md" onPress={onRulesOpen}>
                        Rules
                    </Button> */}
                    {community.joined && <Button variant="bordered" color="secondary" onPress={onMemberOpen}>View Members</Button>}
                    <Button color={community.joined ? "danger" : "success"} variant="flat" size="md" onPress={onOpen} isDisabled={community.joined} style={{ cursor: community.joined ? "not-allowed" : "pointer", pointerEvents: community.joined ? "all" : "" }} >
                        {community.joined ? "Joined" : "Join"}
                    </Button>
                </CardFooter>
                <Modal isOpen={isRulesOpen} onOpenChange={onRulesOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 text-xl font-bold">Rules</ModalHeader>
                                <ModalBody>
                                    <Accordion>
                                        <AccordionItem key="1" aria-label="Accordion 1" title="Domain">
                                            <p className="font-bold">{community.domainPub}</p>
                                        </AccordionItem>
                                        <AccordionItem key="2" aria-label="Accordion 1" title="Region">
                                            <p className="font-bold">{community.regionPub === "NA" ? "North America" : community.regionPub === "ME" ? "Middle East" : community.regionPub === "AP" ? "Asia Pacific" : "Europe"}</p>
                                        </AccordionItem>
                                        <AccordionItem key="3" aria-label="Accordion 1" title="Gender">
                                            <p className="font-bold">{community.genderPub === "M" ? "Male" : community.genderPub === "F" ? "Female" : "Both"}</p>
                                        </AccordionItem>
                                    </Accordion>
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

                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Add Community Details</ModalHeader>
                                <ModalBody>
                                    <Input
                                        label="Email"
                                        placeholder="Enter your email"
                                        name="email"
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
                                        <SelectItem value="all" key="AL">
                                            All
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
                                        <SelectItem value="both" key="MF">
                                            Both
                                        </SelectItem>
                                    </Select>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={handleJoinCommunity} color="primary" onPress={onClose}>
                                        Join Community
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <Modal isOpen={isMembersOpen} onOpenChange={onMemberOpenChange} >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 text-xl font-bold">Members</ModalHeader>
                                <ScrollShadow hideScrollBar className="w-[300px] h-[400px]">
                                    {allUserFromCommunity.map((members) => (
                                        <p>{members._id}</p>
                                    ))}
                                </ScrollShadow>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <ToastContainer
                    position="top-center"
                />
            </Card>
        </>
    )
}