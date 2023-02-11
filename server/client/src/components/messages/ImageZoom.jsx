import { Box, Modal } from "@mui/material";
import { ImgMessage } from "./messagesStyle";
import { style } from "./messagesStyle";

const ImageZoom = ({open, setOpen, img}) => {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <ImgMessage src={img} />
            </Box>
        </Modal>
    );
};

export default ImageZoom;