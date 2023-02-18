import React, { useEffect, useState } from 'react';
import { publicRequest } from "../../requestMethod";
import Message from "../message/Message";

const ChildrenMessage = ({message, type}) => {
   const [childrenMessages, setChildrenMessages] = useState([]);

   const messageId = message.themeId

   useEffect(() => {
       const fetchChildrenMessage = async () => {
           const res = await publicRequest.get(`/messages/theme/${messageId}`);
           setChildrenMessages(res.data);
       }
       fetchChildrenMessage()
   }, [messageId])

    console.log(messageId)

    return (
        <>
            {childrenMessages.map(child => (
                <Message message={child} key={child.id} type={type} />
            ))}
        </>
    );
};

export default ChildrenMessage;