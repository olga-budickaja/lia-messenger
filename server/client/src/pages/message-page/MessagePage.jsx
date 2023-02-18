import { Container, Title } from "./massagePageStyle";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { publicRequest } from "../../requestMethod";
import Message from "../../components/message/Message";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const MessagePage = () => {
    const location = useLocation();
    const messageId = location.pathname.split("/")[2];
    const [themeId, setThemeId] = useState('');
    const [childrenMessages, setChildrenMessages] = useState([]);
    const scrollRef = useRef();

    const { isLoading, error, data } = useQuery(["themes"], () =>
        publicRequest.get(`/themes/${messageId}`).then((res) => {
            return res.data
        })
    );
    useEffect(() => {
        try {
            setThemeId(data[0]?.id)
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
            <Container>
                <Title>Message`s page №: {messageId}</Title>
                {error
                    ? "Something went wrong!"
                    : isLoading
                        ? "Loading..."
                        : <Message
                            message={data[0]}
                            type="main"
                            page="true"
                            count={childrenMessages?.length}
                        />
                }
            </Container>
            <Container>
                {childrenMessages.map(child => (
                    <div ref={scrollRef} key={child?.id}>
                        <Message
                            page="true"
                            message={child}
                            type="own"
                        />
                    </div>

                ))}
            </Container>
        </>

    );
};

export default MessagePage;