import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useMetaMask } from "../../hooks/useMetamask";
import axios from '../../api/axiosConfig.js';

const UserComments = () => {
    const [allComments, setAllComments] = useState([]);
    const id = useSelector((state) => state.user.userId);

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
        <div className="max-w-3xl ml-10 mt-20 lg:mt-10 lg:w-1/2 lg:ml-24 overflow-y-auto">
            <div className="border-2 border-blue-300 rounded-lg p-6 shadow-md" style={{backgroundColor: "#cfc6e2"}}>
                <h1 className="text-2xl font-bold text-gray-800 mb-8">What others think about you...</h1>
                {allComments.map((comment, index) => (
                    <Card key={index} className="mb-4">
                        <CardBody>
                            <p className="text-black">{comment}</p>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default UserComments;
