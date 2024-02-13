import { useState, useEffect } from "react";
import PollCard from "./PollCard";

export default function MainPoll() {
    const [allPolls, setAllPolls] = useState([]);

    const newPoll1 = {
        pollID: '#123',
        pollTitle: 'Which movie will you watch',
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
        pollID: '#456',
        pollTitle: 'Which Chocolate you like',
        belongsToCommunity: true,
        communityID: '#C101',
        option1: {
            optionName: "Sneakers",
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

    useEffect(() => {
        if (allPolls.length === 0) {
            setAllPolls([newPoll1, newPoll2]);
        }
    }, []);

    return (
        <div>
            {allPolls.map((poll, index) => (
                <PollCard key={index} pollContent={poll} />
            ))}
        </div>
    );
}
