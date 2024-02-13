import { useState } from "react"
import { LeafPoll} from 'react-leaf-polls'
import 'react-leaf-polls/dist/index.css'

const customTheme = {
    textColor: 'black',
    mainColor: '#00B87B',
    backgroundColor: 'rgb(255,255,255)',
    alignment: 'center'
}

export default function PollCard({ pollContent }) {

    const [poll, setPoll] = useState({
        pollID: pollContent.ID,
        pollTitle: pollContent.title,
        belongsToCommunity: pollContent.belongsToCommunity,
        communityID: pollContent.communityID,
        option1: {
            optionName: pollContent.option1.optionName,
            optionconsensus: pollContent.option1.optionconsensus
        },
        option2: {
            optionName: pollContent.option2.optionName,
            optionconsensus: pollContent.option2.optionconsensus
        },
        option3: {
            optionName: pollContent.option3.optionName,
            optionconsensus: pollContent.option3.optionconsensus
        }
    })

    const resData = [
        { id: 0, text: poll.option1.optionName, votes: poll.option1.optionconsensus },
        { id: 1, text: poll.option2.optionName, votes: poll.option2.optionconsensus },
        { id: 2, text: poll.option3.optionName, votes: poll.option3.optionconsensus }
    ]

    function vote() {
        console.log("Clicked a Poll")
    }

    return (
        <div className="cardContainer" style={{margin : "10px", padding : "5px", border : "1px solid black"}}>
            <LeafPoll
                type='multiple'
                question={poll.pollTitle}
                results={resData}
                theme={customTheme}
                onVote={vote}
                isVoted={false}
            />
        </div>

    )
}