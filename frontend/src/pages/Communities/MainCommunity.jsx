import CommunityCard from "../../components/CommunityCard"
import { Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, SelectItem, Select } from "@nextui-org/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/auth";

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
            communityId: "id123"
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: "id123"
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: "id123"
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: "id123"
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: "id123"
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: "id123"
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: "id123"
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: "id123"
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: "id123"
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: "id123"
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: "id123"
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: "id123"
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: "id123"
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: "id123"
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: "id123"
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: "id123"
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: "id123"
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: "id123"
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: "id123"
        },
    ]

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [region, setRegion] = useState("");
    const [gender, setGender] = useState("");
    const [description, setDescription] = useState("");

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
                domain = "x" + domain;
            }
            console.log(domain)
        }
        // domain,
        //     communityRules.region,
        //     communityRules.gender
        const community = await auth.FactoryContract.createCommunity(
            "xx@iiits",
            "xxxxxxAP",
            "xxxxxxxM"
        );
        console.log(community);
    }

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

    console.log(email, gender, region, name, description);

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
                            <ModalHeader className="flex flex-col gap-1">Add Community Details</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Community Name"
                                    placeholder="Enter name (max 20 characters)"
                                    variant="bordered"
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
                                <Button onClick={handleCreateCommunity} color="primary" onPress={onClose}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}