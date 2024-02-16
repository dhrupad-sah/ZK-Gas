import CommunityCard from "../../components/CommunityCard"
import { Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, SelectItem, Select } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import FactoryABI from "../../../ABI/Factory.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MainCommunity() {
    const [, setCommunityAddress] = useState([]);
    const [communities, setCommunities] = useState([]);

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
                        communityId: index,
                        domainPub: communityInfo[2],
                        regionPub: communityInfo[3],
                        genderPub: communityInfo[4]
                    }]);
                });
            }
        }
        fetchCommunities();
    }, [])

    return (
        <div className="container mx-auto" >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {communities.map((community, index) => (
                    <div key={index}>
                        <CommunityCard community={community} />
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
}