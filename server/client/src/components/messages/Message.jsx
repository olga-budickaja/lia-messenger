import {
    ContainerDesc,
    ContainerImg, ContainerMessage,
    ContainerOpenImage, ContainerText,
    ContainerTitle,
    Image,
    ImgMessage,
    Span
} from "./messagesStyle";
import avatar1 from "../../assets/avatar1.png";
import avatar2 from "../../assets/avatar2.png";
import { Badge, Box, IconButton, Tooltip } from "@mui/material";
import {
    ContactPageOutlined,
    FilePresentOutlined,
    QuestionAnswerOutlined,
    RemoveCircleOutlineOutlined,
    ShortcutOutlined,
    VisibilityOutlined,
    ZoomInOutlined
} from "@mui/icons-material";
import ImageZoom from "./ImageZoom";
import { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { publicRequest } from "../../requestMethod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";

const Message = ({ type, message, setOpenMessage, count, openMessage }) => {
    const { currentUser } = useContext(AuthContext);
    const { setAnswer } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const [conversations, setConversations] = useState([]);

    const userId = message.uid;

    useEffect(() => {

        try {
            const fetchConversations = async () => {
                const res = await publicRequest.get(`/conversations/${userId}`);
                setConversations(res.data);
            }
            fetchConversations()
        } catch (e) {
            console.log(e)
        }

    }, [userId]);


    const deleteMutation = useMutation(
        (messageId) => {
             if (type === "rcv" ) {
                 return publicRequest.delete(`themes/${messageId}`)
             } else {
                 return publicRequest.delete(`messages/${messageId}`)
             }
        },
        {
            onSuccess: () => {
                if (type === "rcv") {

                } else {
                    queryClient.invalidateQueries(["messages"])
                }
            }
        }
    );
    const handleDelete = () => {
        deleteMutation.mutate(message.id);
    };
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
        <>
            <ContainerMessage
                type={type
                ? (conversations.find(m => m.id === message.memId && m.senderId !== message.uid && m.receiverId === message.uid)) && "rcv"
                : "snd"
            }>
                <ContainerTitle
                    type={type
                        ? (conversations.find(m => m.id === message.memId && m.senderId !== message.uid && m.receiverId === message.uid)) && "rcv"
                        : "snd"
                    }
                    elevation={0}
                >
                    {type !== "rcv"
                        ? (<Image src={avatar1} />)
                        : (<Image src={avatar2} />)
                    }

                    <h6>{message.username}</h6>
                    <Span>{parseDate(message.createAt)}</Span>
                    <h6>{message.email}</h6>
                    <Box sx={{ flexGrow: 1 }} />
                    <ContainerTitle>
                        {type === "rcv" && count !== 0 && (
                            <IconButton
                                onClick={() => setOpenMessage(!openMessage)}
                            >
                                <Tooltip title="Read comments">
                                    <Badge badgeContent={count} color="success">
                                        <QuestionAnswerOutlined />
                                    </Badge>
                                </Tooltip>
                            </IconButton>
                        )}
                        <IconButton
                            component={RouterLink}
                            to={`message/${message.id}`}
                        >
                            <Tooltip title="See all theme">
                                <VisibilityOutlined />
                            </Tooltip>
                        </IconButton>
                        {message.homepage && (
                            <a href={message.homepage} target="_blank">
                                <IconButton>
                                    <Tooltip title="Hom page">
                                        <ContactPageOutlined />
                                    </Tooltip>
                                </IconButton>
                            </a>
                        )}
                        {message.fileTxt && (
                            <a href={message.fileTxt} target="_blank">
                                <IconButton>
                                    <Tooltip title="See file">
                                        <FilePresentOutlined />
                                    </Tooltip>
                                </IconButton>
                            </a>
                        )}

                        <IconButton
                            component={RouterLink}
                            to={currentUser === null ? "/registration" : "/write"}
                            answer={message.id}
                            onClick={() => setAnswer(message.id)}
                        >
                            <Tooltip title="Answer">
                                <ShortcutOutlined />
                            </Tooltip>
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <Tooltip title="Delete message">
                                <RemoveCircleOutlineOutlined sx={{ fill: "#e91e63" }}/>
                            </Tooltip>
                        </IconButton>
                    </ContainerTitle>


                </ContainerTitle>

                <ContainerDesc>
                    {message?.fileImg && (
                        <ContainerImg>
                            <ImgMessage src={message.fileImg}/>
                            <ContainerOpenImage>
                                <IconButton onClick={() => setOpen(true)}>
                                    <ZoomInOutlined/>
                                </IconButton>
                                <ImageZoom
                                    open={open}
                                    img={message.fileImg}
                                    onClick={() => setOpen(false)}
                                    setOpen={setOpen}
                                />
                            </ContainerOpenImage>
                        </ContainerImg>
                    )}
                    <ContainerText>
                        {getText(message.desc)}
                    </ContainerText>
                </ContainerDesc>
            </ContainerMessage>
        </>
    );
};

export default Message;