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
    QuestionAnswerOutlined,
    RemoveCircleOutlineOutlined,
    ShortcutOutlined,
    VisibilityOutlined,
    ZoomInOutlined
} from "@mui/icons-material";
import ImageZoom from "./ImageZoom";
import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { publicRequest } from "../../requestMethod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";

const Message = ({type, message, setOpenWrite}) => {
    const [open, setOpen] = useState(false);
    const [openList, setOpenList] = useState(false);
    const queryClient = useQueryClient();

    const deleteMutation = useMutation(
        (messageId) => {
            return publicRequest.delete(`themes/${messageId}`)
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(["themes"])
                console.log(data)
            }
        }
    );
    const handleDelete = () => {
        deleteMutation.mutate(message.id);
    };

    return (
        <>
            <ContainerMessage type={type}>
                    <ContainerTitle type={type} elevation={0}>
                        {type === "main"
                            ? (<Image src={avatar1} />)
                            : (<Image src={avatar2} />)
                        }

                        <h6>{message.username}</h6>
                        <Span>22.05.2023 in 10:31</Span>
                        <Box sx={{ flexGrow: 1 }} />
                        {type === "rcv" && (
                            <IconButton
                                onClick={() => setOpenList(true)}
                            >
                                <Tooltip title="Write comments">
                                    <Badge badgeContent={4} color="success">
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
                        <IconButton onClick={() => setOpenWrite(true)}>
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

                <ContainerDesc type={type}>
                    {message?.picture && (
                        <ContainerImg>
                            <ImgMessage src={message.picture}/>
                            <ContainerOpenImage>
                                <IconButton onClick={() => setOpen(true)}>
                                    <ZoomInOutlined/>
                                </IconButton>
                                <ImageZoom
                                    open={open}
                                    img={message.picture}
                                    onClick={() => setOpen(false)}
                                    setOpen={setOpen}
                                />
                            </ContainerOpenImage>
                        </ContainerImg>
                    )}
                    <ContainerText>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut autem blanditiis delectus deleniti eos ex facere ipsa laudantium molestias numquam, quia, quod quos reiciendis saepe, vel vero voluptatem voluptatibus.
                    </ContainerText>
                </ContainerDesc>
            </ContainerMessage>
        </>
    );
};

export default Message;