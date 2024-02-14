import CommunityCard from "../../components/CommunityCard"
import { Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Link, SelectItem, Select } from "@nextui-org/react";
import { useAuth } from "../../context/auth";
import { useState } from "react";

export default function MainCommunity() {
    const { auth, setAuth } = useAuth();
    console.log(auth);

    const [communityRules, setCommunityRules] = useState({
        email: "",
        region: "",
        gender: ""
    });

    const communities = [
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
    ]

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleRulesInput = (e) => {
        setCommunityRules({
            ...communityRules,
            [e.target.name]: e.target.value
        });
    }

    const handleCreateCommunity = async () => {
        console.log(communityRules);
        // get domain value from email example if email is test@iiits.in get @iiits and make sure it is of length 8, if it is less than 8 then append x before the domain to get its length as 8.
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
        let domain = email.slice(indexAt + 1, indexDot);
        console.log(domain);
        if (domain.length < 8) {
            let noOfX = 8 - domain.length;
            console.log(noOfX);
            for (var j = 0; j < noOfX; j++) {
                console.log(j);
                console.log(domain);
                domain = "x"+domain;
            }
            console.log(domain)
        }

        // const community = await auth.FactoryContract.createCommunity(
        //     "xx@iiits",
        //     "xxxxxxAP",
        //     "xxxxxxxM"
        // );
        // console.log(community);
    }

    return (
        <div className="container mx-auto" >
            <Button color="danger" fullWidth variant="flat" size="lg" className="mb-3" onPress={onOpen}>
                Create your own community today!
            </Button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {communities.map((community, index) => (
                    <div key={index}>
                        <CommunityCard community={community} />
                    </div>
                ))}
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Rules for Community</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Email"
                                    placeholder="Enter your email"
                                    variant="bordered"
                                    name="email"
                                    onChange={handleRulesInput}
                                />
                                <Select
                                    label="Select region"
                                    name="region"
                                    onChange={handleRulesInput}
                                >
                                    <SelectItem value="asia-pacific" key="xxxxxxAP">
                                        Asia Pacific
                                    </SelectItem>
                                    <SelectItem value="north-america" key="xxxxxxNA">
                                        North America
                                    </SelectItem>
                                    <SelectItem value="europe" key="xxxxxxEU">
                                        Europe
                                    </SelectItem>
                                    <SelectItem value="middle-east" key="xxxxxxME">
                                        Middle East
                                    </SelectItem>
                                    <SelectItem value="all" key="xxxxxxAL">
                                        All
                                    </SelectItem>
                                </Select>
                                <Select
                                    label="Select gender"
                                    name="gender"
                                    onChange={handleRulesInput}
                                >
                                    <SelectItem value="male" key="xxxxxxxM">
                                        Male
                                    </SelectItem>
                                    <SelectItem value="female" key="xxxxxxxF">
                                        Female
                                    </SelectItem>
                                    <SelectItem value="both" key="xxxxxxMF">
                                        Both
                                    </SelectItem>
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={handleCreateCommunity}>
                                    Sign in
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div >

    );
}