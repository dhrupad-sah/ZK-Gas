import CommunityCard from "../../components/CommunityCard"
import { Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Link, SelectItem, Select } from "@nextui-org/react";

export default function MainCommunity() {
    const { auth, setAuth } = useAuth();
    console.log(auth);
    console.log(auth.FactoryContract);
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

    return (
        <div className="container mx-auto">
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
                                />
                                <Select
                                    label="Select region"
                                >
                                    <SelectItem key="asia-acific" value="AP">
                                        Asia Pacific
                                    </SelectItem>
                                    <SelectItem key="north-america" value="NA">
                                        North America
                                    </SelectItem>
                                    <SelectItem key="europe" value="EU">
                                        Europe
                                    </SelectItem>
                                    <SelectItem key="middle-east" value="ME">
                                        Middle East
                                    </SelectItem>
                                    <SelectItem key="all" value="AL ">
                                        All
                                    </SelectItem>
                                </Select>
                                <Select
                                    label="Select gender"
                                >
                                    <SelectItem key="male" value="M">
                                        Male
                                    </SelectItem>
                                    <SelectItem key="female" value="F">
                                        Female
                                    </SelectItem>
                                    <SelectItem key="both" value="MF">
                                        Both
                                    </SelectItem>
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Sign in
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>

    );
}