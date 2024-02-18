import { useState, useEffect } from "react";
import PollCard from "./PollCard";
import { Tabs, Tab, Card, CardBody, ScrollShadow } from "@nextui-org/react";
import { MdOutlinePublic } from "react-icons/md";
import axios from "../../api/axiosConfig.js"
import { useSelector } from "react-redux";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";

export default function MainPoll() {

    const [allPolls, setAllPolls] = useState([]);
    const [allPrivatePolls, setAllPrivatePolls] = useState([]);
    const mongoID = useSelector((state) => state.user.userId);

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

        const fetchDataForPrivatePolls = async () => {
            try {
                const user = {
                    userID: mongoID
                }
                const response = await axios.post('/poll/getAllPrivatePolls', user);
                console.log("Private polls")
                if (response.data.data != null) {
                    console.log(response.data.data)
                    setAllPrivatePolls(response.data.data)
                }

            } catch (error) {
                console.log("Error occured at frontend to fetch polls")
            }
        };

        fetchData();
        fetchDataForPrivatePolls();
    }, []);

    return (
        <div className="flex w-full flex-col items-center" style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #1b1521, #47193d)' }} >
            <Tabs aria-label="Options" color="warning" size="lg" variant="underlined">
                <Tab key="Public" title={<span className="flex align-center"><MdOutlinePublic className="mt-1" />&nbsp;<span>Public</span></span>} className="p-2">
                    <Card style={{ backgroundColor: "transparent" }}>
                        {(allPolls.length <= 0) && <CardBody style={{ width: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: "150px" }}>
                            <p style={{ color: "#cfc6e2", fontFamily: "sans-serif", fontSize: "25px" }}>No polls to show!</p>
                        </CardBody>}
                        {(allPolls.length > 0) && <CardBody style={{ width: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <ScrollShadow hideScrollBar className="grid grid-cols-2 gap-8 w-[900px] h-full max-h-[1000px] px-10">
                                {allPolls.map((poll) => (
                                    !poll.belongsToCommunity && <PollCard key={poll?.pollID} pollContent={poll} />
                                ))}
                            </ScrollShadow>
                        </CardBody>}
                    </Card>
                </Tab>
                <Tab key="Community" title={<span className="flex align-center"><RiGitRepositoryPrivateLine className="mt-1" />&nbsp;<span>Private</span></span>} className="p-2">
                    <Card style={{ backgroundColor: "transparent" }}>
                        {(allPrivatePolls.length <= 0) && <CardBody style={{ width: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: "150px" }}>
                            <p style={{ color: "#cfc6e2", fontFamily: "sans-serif", fontSize: "25px" }}>No polls to show!</p>
                        </CardBody>}
                        {(allPrivatePolls.length > 0) && <CardBody style={{ width: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <ScrollShadow hideScrollBar className="grid grid-cols-2 gap-8 w-[900px] h-full max-h-[1000px] px-10">
                                {allPrivatePolls.map((poll) => (
                                    poll.belongsToCommunity && <PollCard key={poll?.pollID} pollContent={poll} />
                                ))}
                            </ScrollShadow>
                        </CardBody>}
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}
