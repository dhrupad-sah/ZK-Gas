import { useEffect, useState } from "react";
import './poll.css';
import { Button, useDisclosure, Modal, ModalContent, Accordion, AccordionItem, ModalHeader, ModalBody, ModalFooter, Input, Textarea, SelectItem, Select } from "@nextui-org/react";
import axios from "../../api/axiosConfig.js";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import factoryContractABI from "../../../ABI/Factory.json";
import pollContractABI from "../../../ABI/ZKPoll.json";
import { ethers } from "ethers";

export default function PollCard({ pollContent }) {
    const [pollRules, setPollRules] = useState({
        email: "",
        region: "",
        gender: ""
    });

    const [pollPublicRules, setPollPublicRules] = useState({
        domain: "",
        region: "",
        gender: ""
    });
    // console.log(pollContent);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isRulesOpen, onOpen: onRulesOpen, onOpenChange: onRulesOpenChange } = useDisclosure();

    const [poll, setPoll] = useState({
        itemId: pollContent?._id,
        belongsToCommunity: pollContent.belongsToCommunity,
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
        poll.answerWeight[index]++
        poll.pollCount++
        updateDatabase();
        setPoll(prevPoll => {
            const newPoll = { ...prevPoll, selectedAnswer: index };
            return newPoll;
        });

        try {
            document.querySelector(".poll .answers .answer.selected").classList.remove("selected");
        } catch (error) {
            console.log(error);
        }

        document.querySelector(`#answer-${poll.itemId}-${index}`).classList.add("selected");

        showResults(index);
    }

    const showResults = (index) => {
        for (let i = 0; i < poll.answers.length; i++) {
            let percentage = 0;
            percentage = Math.round(poll.answerWeight[i] * 100 / (poll.pollCount + 1));
            document.querySelector(`#answer-${poll.itemId}-${i} .percentage-bar`).style.width = percentage + "%";
            document.querySelector(`#answer-${poll.itemId}-${i} .percentage-value`).innerText = percentage + "%";
        }
    }

    function updateDatabase() {
        try {
            const updatedPoll = {
                _id: poll.itemId,
                option1: {
                    optionName: poll.answers[0],
                    optionConsensus: poll.answerWeight[0]
                },
                option2: {
                    optionName: poll.answers[1],
                    optionConsensus: poll.answerWeight[1]
                },
                option3: {
                    optionName: poll.answers[2],
                    optionConsensus: poll.answerWeight[2]
                },
                totalOptionConsensus: poll.pollCount
            }
            const result = axios.post('/poll/updateThePoll', updatedPoll)
            console.log("Poll updated Successfully!!")
        } catch (err) {
            console.log("the error in updating the database will be: ", err)
        }
    }

    const handleRulesInput = (e) => {
        setPollRules({
            ...pollRules,
            [e.target.name]: e.target.value
        });
    }

    const stringToHex = (str) => {
        let hex = '';
        for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i);
            const hexValue = charCode.toString(16);
            hex += hexValue.padStart(2, '0');
        }
        return hex;
    };

    useEffect(() => {
        const getPollRules = async () => {
            const _provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log(_provider);
            const signer = _provider.getSigner();
            console.log(signer);
            const factoryContract = new ethers.Contract(factoryContractABI.address, factoryContractABI.abi, signer);
            console.log(factoryContract);
            console.log(pollContent._id);
            const bigNumberId = await factoryContract.getIdFromMongoId(pollContent._id);
            const pollId = bigNumberId.toString();
            console.log(pollId);
            const PollContractAddress = await factoryContract.getPoll(pollId);
            console.log(PollContractAddress);
            const rules = await factoryContract.getPollDetails(PollContractAddress);
            setPollPublicRules({
                domain: rules[1],
                region: rules[2],
                gender: rules[3]
            }
            );
        }
        getPollRules();
    }, [])

    const handleJoinPoll = async () => {
        const id = toast.loading("Please wait verifying your proof");
        const email = pollRules.email;
        const indexAt = email.indexOf('@');
        console.log(indexAt);
        let indexDot = email.length;
        for (var i = indexAt; i < email.length; i++) {
            if (email[i] == '.') {
                indexDot = i;
                break;
            }
        }
        console.log(email);
        let _domain = email.slice(indexAt + 1, indexDot);
        const domain = "0x" + stringToHex(_domain);
        const region = "0x" + stringToHex(pollRules.region);
        const gender = "0x" + stringToHex(pollRules.gender);
        console.log(domain, region, gender)
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log(_provider);
        const signer = _provider.getSigner();
        console.log(signer);
        const factoryContract = new ethers.Contract(factoryContractABI.address, factoryContractABI.abi, signer);
        console.log(factoryContract);
        console.log(pollContent._id);
        const bigNumberId = await factoryContract.getIdFromMongoId(pollContent._id);
        const pollIdString = bigNumberId.toString();
        const pollId = parseInt(pollIdString)
        console.log(typeof (pollId));

        const res = await fetch("http://localhost:3000/joinPoll", {
            method: "POST",
            body: JSON.stringify({ pollId, domain, region, gender }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(res);
        res.status === 200 ?
            toast.update(id, {
                render: "Proof verified Successfully!",
                type: "success",
                isLoading: false,
                autoClose: 4000
            }) : toast.update(id, {
                render: "Proof verification failed! Please try again!",
                type: "error",
                isLoading: false,
                autoClose: 4000
            });
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
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                {!poll.belongsToCommunity && <Button onPress={onRulesOpen}  color="secondary" variant="flat" size="md" className="mb-5">
                    View
                </Button>}
                {!poll.belongsToCommunity && <Button onPress={onOpen} color="success" variant="flat" size="md" className="mb-5">
                    Verify
                </Button>}
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Poll Details</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Email"
                                    placeholder="Enter your email"
                                    name="email"
                                    onChange={handleRulesInput}
                                />
                                <Select
                                    label="Select region"
                                    name="region"
                                    onChange={handleRulesInput}
                                >
                                    <SelectItem value="asia-pacific" key="AP">
                                        Asia Pacific
                                    </SelectItem>
                                    <SelectItem value="north-america" key="NA">
                                        North America
                                    </SelectItem>
                                    <SelectItem value="europe" key="EU">
                                        Europe
                                    </SelectItem>
                                    <SelectItem value="middle-east" key="ME">
                                        Middle East
                                    </SelectItem>
                                    <SelectItem value="all" key="AL">
                                        All
                                    </SelectItem>
                                </Select>
                                <Select
                                    label="Select gender"
                                    name="gender"
                                    onChange={handleRulesInput}
                                >
                                    <SelectItem value="male" key="M">
                                        Male
                                    </SelectItem>
                                    <SelectItem value="female" key="F">
                                        Female
                                    </SelectItem>
                                    <SelectItem value="both" key="MF">
                                        Both
                                    </SelectItem>
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={handleJoinPoll} color="primary" onPress={onClose}>
                                    Join Poll
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={isRulesOpen} onOpenChange={onRulesOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-xl font-bold">Rules</ModalHeader>
                            <ModalBody>
                                <Accordion>
                                    <AccordionItem key="1" aria-label="Accordion 1" title="Domain">
                                        <p className="font-bold">{pollPublicRules.domain}</p>
                                    </AccordionItem>
                                    <AccordionItem key="2" aria-label="Accordion 1" title="Region">
                                        <p className="font-bold">{pollPublicRules.region === "NA" ? "North America" : pollPublicRules.region === "ME" ? "Middle East" : pollPublicRules.region === "AP" ? "Asia Pacific" : "Europe"}</p>
                                    </AccordionItem>
                                    <AccordionItem key="3" aria-label="Accordion 1" title="Gender">
                                        <p className="font-bold">{pollPublicRules.gender === "M" ? "Male" : pollPublicRules.gender === "F" ? "Female" : "Both"}</p>
                                    </AccordionItem>
                                </Accordion>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
