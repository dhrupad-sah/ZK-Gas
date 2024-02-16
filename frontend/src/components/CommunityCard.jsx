import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Avatar, Button, Chip } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { FaHashtag } from "react-icons/fa";
import FactoryABI from "../../ABI/Factory.json";
import { ethers } from "ethers";

export default function CommunityCard({ community }) {
    const communitySplits = community.communityName.split(" ");
    const location = useLocation();
    const route = location.pathname;

    const handleJoinCommunity = async () => {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        if (_provider) {
            const signer = _provider.getSigner();
            const factoryContract = new ethers.Contract(FactoryABI.address, FactoryABI.abi, signer);
            console.log(factoryContract);

        }
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
                    <Button color="secondary" variant="flat" size="md" as={Link} href={`/communities/${community.communityId}`}>
                        View
                    </Button>
                    <Button onClick={handleJoinCommunity} color="success" variant="flat" size="md">
                        Join
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}