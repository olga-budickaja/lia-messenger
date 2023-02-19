import {
    ContainerButton,
    ContainerDesc,
    ContainerImg, ContainerMessage, Container,
    ContainerOpenImage, ContainerText,
    ContainerTitle,
    Image,
    ImgMessage,
    Span, EmailButton
} from "./messageStyle";
import avatar1 from "../../assets/avatar1.png";
import avatar2 from "../../assets/avatar2.png";
import { Box, IconButton } from "@mui/material";
import { ZoomInOutlined } from "@mui/icons-material";
import ImageZoom from "../messages/ImageZoom";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import ButtonsMessage from "../buttons-message/ButtonsMessage";
import { SocketContext } from "../../context/SocketContext";

const Message = ({ type, message, count, page, userIdMessage }) => {
    const { socket } = useContext(SocketContext);
    const [open, setOpen] = useState(false);



    useEffect(() => {
        socket.current.emit("addUser", (!userIdMessage ? message?.uid : userIdMessage));
        socket.current.on("getUsers", users => {
            console.log(users)
        });
    }, [message]);

    // useEffect(() => {
    //     setMessageUid(message?.uid)
    // }, [message?.uid])

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent
    }

    const parseDate = (createDate) => {
        const date = moment(createDate).format("DD MM YYYY");
        const time = moment(createDate).format("hh:mm:ss")
        return `${date} in ${time}`
    }

    return (
        <Container type={type}>
            <ContainerMessage>
                <ContainerTitle type={type}>
                    <Image
                        type={type}
                        src={type === "own" || type === "main" ? avatar1 : avatar2}
                        alt="avatar"
                    />
                    <h6>{message?.username}</h6>
                    <Span>{parseDate(message?.createAt)}</Span>
                    <a href={ `mailto:${message?.email}` }>
                        <EmailButton>
                            <h6>{message?.email}</h6>
                        </EmailButton>
                    </a>
                    <Box sx={{ flexGrow: 1 }} />
                    <ContainerButton>
                        <ButtonsMessage
                            count={count}
                            type={type}
                            message={message}
                            page={page}
                        />
                    </ContainerButton>
                </ContainerTitle>

                <ContainerDesc>
                    {message?.fileImg && (
                        <ContainerImg>
                            <ImgMessage src={message?.fileImg}/>
                            <ContainerOpenImage>
                                <IconButton onClick={() => setOpen(true)}>
                                    <ZoomInOutlined/>
                                </IconButton>
                                <ImageZoom
                                    open={open}
                                    img={message?.fileImg}
                                    onClick={() => setOpen(false)}
                                    setOpen={setOpen}
                                />
                            </ContainerOpenImage>
                        </ContainerImg>
                    )}
                    <ContainerText>
                        {getText(message?.desc)}
                    </ContainerText>
                </ContainerDesc>
            </ContainerMessage>
        </Container>
    );
};

export default Message;