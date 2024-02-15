import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";

export default function Comments() {

    const [allComments, setAllComments] = useState([]);

    const comment1 = {
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolores ducimus, recusandae magni veniam vitae"
    }

    const comment2 = {
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolores ducimus, recusandae magni veniam vitae"
    }

    const comment3 = {
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolores ducimus, recusandae magni veniam vitae"
    }

    const comment4 = {
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolores ducimus, recusandae magni veniam vitae"
    }

    useEffect(() => {
        if (allComments.length === 0) {
            setAllComments([comment1, comment2, comment3, comment4]);
        }
    }, []);

    return (
        <div style={{ maxWidth: '500px', margin: 'auto' }}>
            {allComments.map((comment, index) => (
                <Card key={index} style={{ marginBottom: '10px' }}>
                    <CardBody>
                        <p style={{ color: 'black' }}>{comment.content}</p>
                    </CardBody>
                </Card>
            ))}
        </div>


    )
}
