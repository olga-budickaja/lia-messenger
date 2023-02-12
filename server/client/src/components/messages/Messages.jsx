import {
    ButtonNew,
    ContainerMessages,
} from "./messagesStyle";
import Message from "./Message";
import { useState } from "react";
import WriteMessageModal from "../write-message/WriteMessageModal";
import { IconButton, Tooltip } from "@mui/material";
import { ColorButton } from "../../ui/muiStyle";
import { AddOutlined } from "@mui/icons-material";

const Messages = ({type}) => {
    const [openWrite, setOpenWrite] = useState(false)
    return (
        <>
            <ContainerMessages>
                <>
                    <Message type="rcv" />
                    <Message type="snd" />
                    <Message type="main" />
                    <Message type="snd" />
                    <Message type="main" />
                </>
            </ContainerMessages>
            <ButtonNew onClick={() => setOpenWrite(true)}>
                <IconButton>
                    <Tooltip title="Add new theme">
                        <ColorButton>
                            <AddOutlined />
                        </ColorButton>
                    </Tooltip>
                </IconButton>
            </ButtonNew>
            <WriteMessageModal open={openWrite} setOpen={setOpenWrite}/>
        </>
    );
};

export default Messages;