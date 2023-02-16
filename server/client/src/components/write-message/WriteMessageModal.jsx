import { Box, Modal } from "@mui/material";
import { style } from "../../ui/muiStyle";
import 'react-quill/dist/quill.snow.css';
import { useContext, useState } from "react";
import RegisterForm from "../forms/RegisterForm";
import LoginForm from "../forms/LoginForm";
import { AuthContext } from "../../context/AuthContext";
import WriteMessage from "./WriteMessage";

const WriteMessageModal = ({ open, setOpen }) => {
    const { currentUser } = useContext(AuthContext);
    const [registration, setRegistration] = useState(false);


    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {currentUser === null
                    ? !registration
                        ? (
                            <Box sx={{ padding: '30px' }}>
                                <RegisterForm setRegistration={setRegistration}/>
                            </Box>
                        )
                        : (
                            <Box sx={{ padding: '30px' }}>
                                <LoginForm />
                            </Box>
                        )
                    : (
                        <>
                            <WriteMessage setOpen={setOpen}/>
                        </>
                    )
                }

            </Box>
        </Modal>
    );
};

export default WriteMessageModal;