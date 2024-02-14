import { useEffect, useState } from "react"
import './poll.css'

export default function PollCard({ pollContent }) {

    const [poll, setPoll] = useState({
        question: pollContent.pollTitle,
        answers: [
            pollContent.option1?.optionName,
            pollContent.option2?.optionName,
            pollContent.option3?.optionName,
        ],
        pollCount: 100,
        answerWeight: [
            pollContent.option1?.optionconsensus,
            pollContent.option2?.optionconsensus,
            pollContent.option3?.optionconsensus,
        ],
        selectedAnswer: -1
    });
    

    const markAnswer = (i) => {
        setPoll(prevPoll => {
            const newPoll = { ...prevPoll, selectedAnswer: +i };
            return newPoll;
        });

        try {
            document.querySelector(".poll .answers .answer.selected").classList.remove("selected");
        } catch (msg) {
            document.querySelectorAll(".poll .answers .answer")[+i].classList.add("selected");
            showResults();
        }
    }

    const showResults = () => {
        let answers = document.querySelectorAll(".poll .answers .answer");
        for (let i = 0; i < answers.length; i++) {
            let percentage = 0;
            if (i === poll.selectedAnswer) {
                percentage = Math.round(
                    (poll.answerWeight[i] + 1) * 100 / (poll.pollCount + 1)
                );
            } else {
                percentage = Math.round(
                    (poll.answerWeight[i]) * 100 / (poll.pollCount + 1)
                )
            }

            answers[i].querySelector(".percentage-bar").style.width = percentage + "%";
            answers[i].querySelector(".percentage-value").innerText = percentage + "%";
        }
    }

    return (
        <div className="poll">
            <div className="question">{poll.question}</div>
            <div className="answers">
                {poll.answers.map((answer, i) => (
                    <div key={i} className={`answer ${i === poll.selectedAnswer ? 'selected' : ''}`} onClick={() => markAnswer(i)}>
                        {answer}
                        <span className="percentage-bar"></span>
                        <span className="percentage-value"></span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/*      pollID: pollContent.ID,
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
        } */