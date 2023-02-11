import {
    ContainerMessages,
} from "./messagesStyle";
import Message from "./Message";

const Messages = ({type}) => {
    return (
        <ContainerMessages>
            <>
                <Message type="rcv" />
                <Message type="snd" />
                <Message type="main" />
                <Message type="snd" />
                <Message type="main" />
            </>
        </ContainerMessages>
    );
};

export default Messages;