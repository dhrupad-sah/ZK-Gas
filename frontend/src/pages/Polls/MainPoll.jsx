import { useState, useEffect } from "react";
import PollCard from "./PollCard";
import { Tabs, Tab, Card, CardBody, ScrollShadow } from "@nextui-org/react";
import { MdOutlinePublic } from "react-icons/md";
import axios from "../../api/axiosConfig.js"
import { RiChatPrivateLine, RiGitRepositoryPrivateLine } from "react-icons/ri";

export default function MainPoll() {
    const [allPolls, setAllPolls] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/poll/getAllPublicPolls');
                console.log("Following are all Polls")
                console.log(response.data.data)
                setAllPolls(response.data.data);
            } catch (error) {
                console.log("Error occured at frontend to fetch polls")
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex w-full flex-col items-center justify-center">
            <Tabs aria-label="Options" color="primary" size="lg" variant="underlined">
                <Tab key="Public" title={<span className="flex align-center"><MdOutlinePublic className="mt-1" />&nbsp;<span>Public</span></span>
                } className="p-2">
                    <Card >
                        <CardBody style={{ width: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <ScrollShadow hideScrollBar className="w-[400px] h-[750px] flex-col items-center justify-center">
                                {allPolls.map((poll) => (
                                    !poll.belongsToCommunity && <PollCard key={poll?.pollID} pollContent={poll} />
                                ))}
                            </ScrollShadow>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="Community" title={<span className="flex align-center"><RiGitRepositoryPrivateLine className="mt-1" />&nbsp;<span>Private</span></span>
                } className="p-2">
                    <Card >
                        <CardBody style={{ width: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {allPolls.map((poll, index) => (
                                    poll.belongsToCommunity && <PollCard key={index} pollContent={poll} />
                                ))}
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>

    );
}
