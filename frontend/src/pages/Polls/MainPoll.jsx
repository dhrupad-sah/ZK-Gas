import { useState, useEffect } from "react";
import PollCard from "./PollCard";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";


export default function MainPoll() {
    const [allPolls, setAllPolls] = useState([]);

    const newPoll1 = {
        pollID: '123',
        pollTitle: 'Which movie will you watch?',
        belongsToCommunity: false,
        communityID: '',
        option1: {
            optionName: "Harry Potter",
            optionconsensus: 24,
        },
        option2: {
            optionName: 'Gone Girl',
            optionconsensus: 24,
        },
        option3: {
            optionName: 'Fantastic Beasts',
            optionconsensus: 52,
        },
    };

    const newPoll2 = {
        pollID: '456',
        pollTitle: 'Which Chocolate you like?',
        belongsToCommunity: true,
        communityID: '#C101',
        option1: {
            optionName: "Snickers",
            optionconsensus: 32,
        },
        option2: {
            optionName: 'Cadbury',
            optionconsensus: 28,
        },
        option3: {
            optionName: '5 Star',
            optionconsensus: 40,
        },
    };

    const newPoll3 = {
        pollID: '789',
        pollTitle: 'Which Branch do you like?',
        belongsToCommunity: false,
        communityID: '',
        option1: {
            optionName: "CSE",
            optionconsensus: 24,
        },
        option2: {
            optionName: 'ECE',
            optionconsensus: 24,
        },
        option3: {
            optionName: 'IT',
            optionconsensus: 52,
        },
    };

    useEffect(() => {
        if (allPolls.length === 0) {
            setAllPolls([newPoll1, newPoll2, newPoll3]);
        }
    }, []);

    return (
        <div className="flex w-full flex-col items-center justify-center">
            <Tabs aria-label="Options" color="primary">
                <Tab key="Public" title="Public">
                    <Card >
                        <CardBody style={{ width: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            {allPolls.map((poll) => (
                                !poll.belongsToCommunity && <PollCard key={poll?.pollID} pollContent={poll} />
                            ))}
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="Community" title="Community">
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
