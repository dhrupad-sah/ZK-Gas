import CommunityCard from "../../components/CommunityCard"
import { Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, SelectItem, Select } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/auth";
import ZKCommunity from "../../../ABI/ZKCommunity.json";
import { ethers } from "ethers";
import { useMetaMask } from "../../hooks/useMetamask";
import FactoryABI from "../../../ABI/Factory.json";

export default function MainCommunity() {
    const { wallet } = useMetaMask();
    const { auth, setAuth } = useAuth();
    const [communityRules, setCommunityRules] = useState({
        email: "",
        region: "",
        gender: ""
    });

    const [, setCommunityAddress] = useState([]);
    const [communities, setCommunities] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        const fetchCommunities = async () => {
            const _provider = new ethers.providers.Web3Provider(window.ethereum);
            setCommunities([]);
            if (_provider) {
                const signer = _provider.getSigner();
                const factoryContract = new ethers.Contract(FactoryABI.address, FactoryABI.abi, signer);
                console.log(factoryContract);
                const communities = await factoryContract.getAllCommunities();
                console.log(communities);
                setCommunityAddress(communities);
                communities?.map(async (community, index) => {
                    const communityInfo = await factoryContract.getCommunityDetails(community);
                    console.log(communityInfo[0]);
                    setCommunities((prev) => [...prev, {
                        communityName: communityInfo[0],
                        communityDescription: communityInfo[1],
                        communityId: index
                    }]);
                });
            }
        }
        fetchCommunities();
    }, [])

    const handleRulesInput = (e) => {
        setCommunityRules({
            ...communityRules,
            [e.target.name]: e.target.value
        });
    }

    const handleCreateCommunity = async () => {
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
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        if (_provider) {

            const signer = _provider.getSigner();
            const factoryContract = new ethers.Contract(FactoryABI.address, FactoryABI.abi, signer);
            console.log(factoryContract);
            const community = await factoryContract.createCommunity(
                domain,
                communityRules.region,
                communityRules.gender,
                name,
                description
            );
            console.log(community);
        }
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