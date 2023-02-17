import {
    ContainerMessage,
    ContainerMessages,
} from "./messagesStyle";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { publicRequest } from "../../requestMethod";


const Messages = ({ message }) => {
    const [childrenMessages, setChildrenMessages] = useState([]);
    const [openMessage, setOpenMessage] = useState(false);
    const themeId = message.id;
    const scrollRef = useRef();

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

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [childrenMessages])

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
                        <div ref={scrollRef}>
                            <Message
                                type=""
                                message={child}
                                key={child.id}
                            />
                        </div>

                    ))}
                </ContainerMessage>
            )}

        </>
    );
};

export default Messages;