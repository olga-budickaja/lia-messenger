import {
    ButtonNew,
    ContainerMessages,
} from "./messagesStyle";
import { useState } from "react";
import WriteMessageModal from "../write-message-modal/WriteMessageModal";
import { Tooltip } from "@mui/material";
import { ColorRoundButton } from "../../ui/muiStyle";
import { AddOutlined } from "@mui/icons-material";
import Message from "./Message";


const Messages = ({type, message, messageId }) => {
    const [openWrite, setOpenWrite] = useState(false);
    // const { isLoadingMain, errorMain, dataMain } = useQuery(['main_messages'], () =>
    //     publicRequest.get("/main_messages").then(res => {
    //         return res.data;
    //     })
    // );
    //    const { isLoading, error, data } = useQuery(['messages'], () =>
    //         publicRequest.get("/messages").then(res => {
    //             return res.data;
    //         })
    //     );

    return (
        <>
            <ContainerMessages>
                <Message type={type} message={message}/>
                <>
                    {/*{error*/}
                    {/*    ? "Something went wrong!"*/}
                    {/*    : isLoading*/}
                    {/*    ? "Loading..."*/}
                    {/*        : data.map((message) =>*/}
                    {/*            <Message message={message} key={message.id} type="main" />*/}
                    {/*        )*/}
                    {/*}*/}

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