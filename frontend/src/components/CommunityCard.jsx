import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Avatar, Chip } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { FaHashtag } from "react-icons/fa";
import FactoryABI from "../../ABI/Factory.json";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, SelectItem, Select } from "@nextui-org/react";
import { useState } from "react";


export default function CommunityCard({ community }) {
    const communitySplits = community.communityName.split(" ");
    const location = useLocation();
    const route = location.pathname;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [description, setDescription] = useState("");

    const [communityRules, setCommunityRules] = useState({
        email: "",
        region: "",
        gender: ""
    });

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

    const handleJoinCommunity = async () => {
        const domain = "0x" + stringToHex(communityRules.email);
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
        console.log(res);
    }
    console.log(route);


    return (
        <>
            <Card className="max-w-[600px] p-2 m-4" isPressable>
                <CardHeader className="flex gap-9 ">
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
                    <Chip variant="bordered" startContent={<FaHashtag />}>
                        {community.communityId}
                    </Chip>
                </CardHeader>
                <Divider />
                <CardBody>
                    <p>{community.communityDescription}</p>
                </CardBody>
                <Divider />
                <CardFooter className="flex justify-between">
                    <Link to={`/communities/${community.communityId}`} style={{ textDecoration: 'none' }}>
                        <Button color="secondary" variant="flat" size="md">
                            View
                        </Button>
                    </Link>
                    <Button color="success" variant="flat" size="md" onPress={onOpen}>
                        Join
                    </Button>
                </CardFooter>
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
            </Card>
        </>
    )
}