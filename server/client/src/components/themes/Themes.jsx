import { Container } from "./themesStyle";
import Messages from "../messages/Messages";
import { useQuery } from "@tanstack/react-query";
import { publicRequest } from "../../requestMethod";

const Themes = () => {
    const { isLoading, error, data } = useQuery(["themes"], () =>
        publicRequest.get('/themes').then((res) => {
            return res.data
        })
    );
    return (
        <Container>
            {error
                ? "Something went wrong!"
                : isLoading
                    ? "Loading..."
                    : data.map((message) =>
                        <Messages message={message} key={message.id} type="rcv" />
                    )
            }
        </Container>
    );
};

export default Themes;