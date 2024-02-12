import { useState } from "react"

export default function PollCard(){

    const [poll, setPoll] = useState({
        pollID : "",
        pollTitle : "",
        isCommunityPoll : false,
        communityID : "",
        option1 : {
            optionName : "",
            optionconsensus : 0
        },
        option2 : {
            optionName : "",
            optionconsensus : 0
        },
        option3 : {
            optionName : "",
            optionconsensus : 0
        },
        option4 : {
            optionName : "",
            optionconsensus : 0
        }
    })

    return(
        <div>

        </div>
    )
}