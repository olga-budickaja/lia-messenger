import { Container, Title } from "./massagePageStyle";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { publicRequest } from "../../requestMethod";
import Message from "../../components/messages/Message";

const MessagePage = () => {
    const location = useLocation();
    const messageId = location.pathname.split("/")[2];

    const { isLoading, error, data } = useQuery(["themes"], () =>
        publicRequest.get(`/themes/${messageId}`).then((res) => {
            return res.data
        })
    );

    console.log(data)

    return (
        <Container>
            <Title>Message`s page №: {messageId}</Title>
            {error
                ? "Something went wrong!"
                : isLoading
                    ? "Loading..."
                    : <Message message={data[0]} type="rcv" />
            }
        </Container>
    );
};

export default MessagePage;