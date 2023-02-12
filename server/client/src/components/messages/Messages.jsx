import {
    ButtonNew,
    ContainerMessages,
} from "./messagesStyle";
import Message from "./Message";
import { useState } from "react";
import WriteMessageModal from "../write-message-modal/WriteMessageModal";
import { Tooltip } from "@mui/material";
import { ColorRoundButton } from "../../ui/muiStyle";
import { AddOutlined } from "@mui/icons-material";

const Messages = ({type}) => {
    const [openWrite, setOpenWrite] = useState(false)
    return (
        <>
            <ContainerMessages>
                <>
                    <Message
                        type="rcv"
                        setOpenWrite={setOpenWrite}
                    />
                    <Message type="snd" />
                    <Message type="main" />
                    <Message type="snd" />
                    <Message type="main" />
                </>
            </ContainerMessages>
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