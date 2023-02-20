import {
    Container,
} from "./messagesStyle";
import { useContext, useEffect, useRef, useState } from "react";
import Message from "../message/Message";
import { publicRequest } from "../../requestMethod";
import { ContainerScroll } from "../message/messageStyle";
import { AuthContext } from "../../context/AuthContext";


const Messages = ({ message }) => {
    const { userId } = useContext(AuthContext);
    const [childrenMessages, setChildrenMessages] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [themeId, setThemeId] = useState(0);
    const [openMessages, setOpenMessages] = useState(false);
    const scrollRef = useRef();

    const userIdMessage = message?.userId

    useEffect(() => {
        setThemeId(message?.id)
    }, [message?.id])

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
        try {
            const fetchConversations = async () => {
                const res = await publicRequest.get(`/conversations/${message?.userId}`);
                setConversations(res.data[0]);
            }
            fetchConversations()
        } catch (e) {
            console.log(e)
        }

    }, [userId]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [childrenMessages]);

    return (
        <>
            <Container>
                <Message
                    message={message}
                    themeId={themeId}
                    count={childrenMessages?.length}
                    userIdMessage={userIdMessage}
                    type="main"
                    conversations={conversations}
                    openMessages={openMessages}
                    setOpenMessages={setOpenMessages}
                />
            </Container>
            {openMessages && (
                <Container>
                    {childrenMessages?.map(child => (
                        <ContainerScroll
                            type={child?.answerId === message?.id || child?.uid === userId ? "rcv" : "own"}
                            ref={scrollRef}
                            key={child?.id}
                        >
                            <Message
                                message={child}
                                type={child?.answerId === message?.id || child?.uid === userId ? "rcv" : "own"}
                                conversations={conversations}
                            />
                        </ContainerScroll>

                    ))}
                </Container>
            )}

        </>
    );
};

export default Messages;