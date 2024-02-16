import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useMetaMask } from "../../hooks/useMetamask";
import axios from '../../api/axiosConfig.js'

export default function Comments() {

    const [allComments, setAllComments] = useState([]);

    const id = useSelector((state) => state.user.userId)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = {
                    userID: id
                }
                const response = await axios.post('/user/getAllCommentsOfUser', user);
                setAllComments(response.data.data[0].userComments);
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);

    return (
        <div className="max-w-3xl ml-10 mt-20 lg:mt-10 lg:w-1/2 lg:ml-24">
            {allComments.map((comment, index) => (
                <Card key={index} className="mb-4">
                    <CardBody>
                        <p className="text-black">{comment}</p>
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}
