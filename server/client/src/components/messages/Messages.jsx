import {
    Container,
} from "./messagesStyle";
import { useEffect, useRef, useState } from "react";
import Message from "../message/Message";
import { publicRequest } from "../../requestMethod";
import { ContainerScroll } from "../message/messageStyle";


const Messages = ({ message }) => {
    const [childrenMessages, setChildrenMessages] = useState([]);
    const [themeId, setThemeId] = useState(0);
    const scrollRef = useRef();

    const userId = message?.userId

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
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [childrenMessages]);

    return (
        <>
            <Container>
                <Message
                    message={message}
                    themeId={themeId}
                    count={childrenMessages?.length}
                    userId={userId}
                    type="main"
                />
            </Container>
            <Container>
                {childrenMessages?.map(child => (
                    <ContainerScroll type="rcv" ref={scrollRef} key={child?.id}>
                        <Message
                            message={child}
                            type="rcv"
                        />
                    </ContainerScroll>

                ))}
            </Container>
        </>
    );
};

export default Messages;