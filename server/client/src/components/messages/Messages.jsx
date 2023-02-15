import {
    ButtonNew, ContainerMessage,
    ContainerMessages,
} from "./messagesStyle";
import { useEffect, useState } from "react";
import WriteMessageModal from "../write-message-modal/WriteMessageModal";
import { Tooltip } from "@mui/material";
import { ColorRoundButton } from "../../ui/muiStyle";
import { AddOutlined } from "@mui/icons-material";
import Message from "./Message";
import { publicRequest } from "../../requestMethod";
import { type } from "@testing-library/user-event/dist/type";


const Messages = ({ message }) => {
    const [openWrite, setOpenWrite] = useState(false);
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
            <ButtonNew onClick={() => setOpenWrite(true)}>
                <Tooltip title="Add new theme">
                    <ColorRoundButton>
                        <AddOutlined />
                    </ColorRoundButton>
                </Tooltip>
            </ButtonNew>
            <WriteMessageModal open={openWrite} setOpen={setOpenWrite}/>
        </>
    );
};

export default Messages;