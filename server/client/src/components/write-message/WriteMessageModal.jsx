import { Box, Modal } from "@mui/material";
import WriteMessage from "./WriteMessage";
import { style } from "../../ui/muiStyle";

const WriteMessageModal = ({ open, setOpen }) => {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <WriteMessage />
            </Box>
        </Modal>
    );
};

export default WriteMessageModal;