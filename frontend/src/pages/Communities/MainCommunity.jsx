import CommunityCard from "../../components/CommunityCard"
import { Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, SelectItem, Select } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import FactoryABI from "../../../ABI/Factory.json";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import axios from '../../api/axiosConfig.js'
import Atropos from 'atropos/react';

export default function MainCommunity() {
    const [, setCommunityAddress] = useState([]);
    const [communities, setCommunities] = useState([]);
    const userMongoId = useSelector((state) => state.user.userId)

    useEffect(() => {
        const fetchCommunities = async () => {
            const user = {
                userID: userMongoId
            }
            const data = await axios.post("/user/getAllCommunityOfUser", user);
            const joinedcommunities = data.data.data[0].communityID;
            const _provider = new ethers.providers.Web3Provider(window.ethereum);
            setCommunities([]);
            if (_provider) {
                const signer = _provider.getSigner();
                const factoryContract = new ethers.Contract(FactoryABI.address, FactoryABI.abi, signer);
                // console.log(factoryContract);
                const communities = await factoryContract.getAllCommunities();
                // console.log(communities);
                setCommunityAddress(communities);
                communities?.map(async (community, index) => {
                    const communityInfo = await factoryContract.getCommunityDetails(community);
                    // console.log(communityInfo[0]);
                    setCommunities((prev) => [...prev, {
                        communityName: communityInfo[0],
                        communityDescription: communityInfo[1],
                        communityId: index,
                        domainPub: communityInfo[2],
                        regionPub: communityInfo[3],
                        genderPub: communityInfo[4],
                        joined: joinedcommunities.includes(index),
                    }]);
                });
            }
        }

        fetchCommunities();
    }, [])

    // console.log("hey babe", joinedCommunities.includes(communities[0].communityId))


    return (
        <div className="container mx-auto" >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {communities.map((community, index) => (
                    <div key={index}>
                        <Atropos rotateXMax={1} rotateYInvert={1}>
                            <CommunityCard community={community} />
                        </Atropos>
                    </div>
                ))}
            </div>
        </div>
    );
}