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
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
            {allComments.map((comment, index) => (
                <Card key={index} style={{ marginBottom: '10px' }}>
                    <CardBody>
                        <p style={{ color: 'black' }}>{comment}</p>
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}
