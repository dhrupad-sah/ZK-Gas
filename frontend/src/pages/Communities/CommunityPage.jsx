import { useLocation } from "react-router-dom";
import FactoryABI from "../../../ABI/Factory.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function CommunityPage() {
    const location = useLocation();
    const route = location.pathname;
    console.log(route);
    const [communityRules, setCommunityRules] = useState([]);
    useEffect(() => {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        const getRules = async () => {
            if (_provider) {
                const signer = _provider.getSigner();
                const FactoryContract = new ethers.Contract(
                    FactoryABI.address,
                    FactoryABI.abi,
                    signer
                );
                const id = route.split("/")[2];
                console.log(id);
                const communityAddress = await FactoryContract.getCommunity(id);
                console.log(communityAddress);
                const communityRules = await FactoryContract.getCommunityDetails(communityAddress);
                console.log(communityRules);
                setCommunityRules(communityRules);
            }
        }
        getRules();
    }, [])
    return (
        <div>
            <div>
                {communityRules.map((rule, index) => {
                    console.log(rule);
                    return (
                        <div key={index}>
                            {rule}
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}