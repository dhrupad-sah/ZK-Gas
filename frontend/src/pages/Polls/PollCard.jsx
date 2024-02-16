import { useState } from "react";
import './poll.css';

export default function PollCard({ pollContent }) {
    const [poll, setPoll] = useState({
        itemId: pollContent?._id,
        question: pollContent.pollTitle,
        answers: [
            pollContent.option1?.optionName,
            pollContent.option2?.optionName,
            pollContent.option3?.optionName,
        ],
        pollCount: pollContent.totalOptionConsensus,
        answerWeight: [
            pollContent.option1?.optionConsensus,
            pollContent.option2?.optionConsensus,
            pollContent.option3?.optionConsensus,
        ],
        selectedAnswer: -1
    });

    const markAnswer = (index) => {
        setPoll(prevPoll => {
            const newPoll = { ...prevPoll, selectedAnswer: index };
            return newPoll;
        });

        try {
            document.querySelector(".poll .answers .answer.selected").classList.remove("selected");
        } catch (error) {

        }

        document.querySelector(`#answer-${poll.itemId}-${index}`).classList.add("selected");

        showResults(index);
    }

    const showResults = (index) => {
        for (let i = 0; i < poll.answers.length; i++) {
            let percentage = 0;
            if (i === index) {
                percentage = Math.round((poll.answerWeight[i] + 1) * 100 / (poll.pollCount + 1));
            } else {
                percentage = Math.round(poll.answerWeight[i] * 100 / (poll.pollCount + 1));
            }

            document.querySelector(`#answer-${poll.itemId}-${i} .percentage-bar`).style.width = percentage + "%";
            document.querySelector(`#answer-${poll.itemId}-${i} .percentage-value`).innerText = percentage + "%";
        }
    }

    return (
        <div className="poll">
            <div className="question">{poll.question}</div>
            <div className="answers">
                {poll.answers.map((answer, i) => (
                    <div key={i} id={`answer-${poll.itemId}-${i}`} className={`answer ${poll.itemId} ${i === poll.selectedAnswer ? 'selected' : ''}`} onClick={() => markAnswer(i)}>
                        <span className="text-answers">{answer}</span>
                        <span className="percentage-bar"></span>
                        <span className="percentage-value"></span>
                    </div>
                ))}
            </div>
        </div>
    );
}
