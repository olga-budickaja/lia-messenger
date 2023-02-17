import {
    ContainerMessage,
    ContainerMessages,
} from "./messagesStyle";
import { useEffect, useState } from "react";
import Message from "./Message";
import { publicRequest } from "../../requestMethod";


const Messages = ({ message }) => {
    const [childrenMessages, setChildrenMessages] = useState([]);
    const [openMessage, setOpenMessage] = useState(false);
    const themeId = message.id;

    useEffect(() => {
        try {
            const fetchChildrenMessage = async () => {
                const res = await publicRequest.get(`messages?themeId=${themeId}`);
                setChildrenMessages(res.data);
            }
            fetchChildrenMessage();
        } catch (e) {
            console.log(e);
        }
    }, [themeId]);

    return (
        <>
            <ContainerMessages>
                <Message
                    type="rcv"
                    message={message}
                    setOpenMessage={setOpenMessage}
                    openMessage={openMessage}
                    count={childrenMessages?.length}
                    themeId={themeId}
                />
            </ContainerMessages>
            {openMessage && (
                <ContainerMessage>
                    {childrenMessages.map(child => (
                        <Message
                            type=""
                            message={child}
                            key={child.id}
                        />
                    ))}
                </ContainerMessage>
            )}

        </>
    );
};

export default Messages;