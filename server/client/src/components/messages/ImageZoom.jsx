import { Box, Modal } from "@mui/material";
import { style } from "../../ui/muiStyle";
import styled from "@emotion/styled";

const ImgMessage = styled.img`
  width: 100%;
  object-fit: contain;
  height: auto;
  border-radius: 8px;
`;

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