import {
    ContainerMessage,
    ContainerMessages,
} from "./messagesStyle";
import { useEffect, useState } from "react";
import Message from "./Message";
import { publicRequest } from "../../requestMethod";


const Messages = ({ message }) => {
    const [childrenMessages, setChildrenMessages] = useState([]);

    const messageId = message.id;

    useEffect(() => {
        try {
            const fetchChildrenMessage = async () => {
                const res = await publicRequest.get(`/messages/theme/${messageId}`);
                setChildrenMessages(res.data);
            }
            fetchChildrenMessage();
        } catch (e) {
            console.log(e);
        }
    }, [messageId]);

    return (
        <>
            <ContainerMessages>
                <Message type="rcv" message={message}/>
            </ContainerMessages>
            <ContainerMessage>
                {childrenMessages.map(child => (
                    <Message type={type} message={child} key={child.id} />
                ))}
            </ContainerMessage>
        </>
    );
};

export default Messages;