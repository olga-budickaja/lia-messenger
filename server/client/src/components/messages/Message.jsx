import {
    ButtonDrop,
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
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { SaveAltOutlined, ShortcutOutlined, ZoomInOutlined } from "@mui/icons-material";
import img from "../../assets/some.png";
import ImageZoom from "./ImageZoom";
import { useState } from "react";

const Message = ({type}) => {
    const [open, setOpen] = useState(false);
    const [openList, setOpenList] = useState(false);
    return (
        <>
            <ContainerMessage type={type}>
                <ContainerTitle type={type} elevation={0}>
                    {type === "main"
                        ? (<Image src={avatar1} />)
                        : (<Image src={avatar2} />)
                    }

                    <h6>Nataly</h6>
                    <Span>22.05.2023 in 10:31</Span>
                    <Box sx={{ flexGrow: 1 }} />
                    <Tooltip title="Download file">
                        <IconButton>
                            <SaveAltOutlined sx={{ width: "18px", height: 'auto' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Answer">
                        <IconButton>
                            <ShortcutOutlined sx={{ width: "18px", height: 'auto' }} />
                        </IconButton>
                    </Tooltip>
                </ContainerTitle>
                <ContainerDesc type={type}>
                    <ContainerImg>
                        <ImgMessage src={img}/>
                        <ContainerOpenImage>
                            <IconButton onClick={() => setOpen(true)}>
                                <ZoomInOutlined/>
                            </IconButton>
                            <ImageZoom
                                open={open}
                                img={img}
                                setOpen={setOpen}
                            />
                        </ContainerOpenImage>
                    </ContainerImg>
                    <ContainerText>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut autem blanditiis delectus deleniti eos ex facere ipsa laudantium molestias numquam, quia, quod quos reiciendis saepe, vel vero voluptatem voluptatibus.
                    </ContainerText>
                </ContainerDesc>
                {type === "rcv" && (
                    <ButtonDrop>
                        <Button onClick={() => setOpenList(true)}>See all...</Button>
                    </ButtonDrop>
                )}
            </ContainerMessage>
        </>
    );
};

export default Message;