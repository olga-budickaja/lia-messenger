import { Box, Modal } from "@mui/material";
import { style } from "../../ui/muiStyle";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import ReactQuill from "react-quill";
import RegisterForm from "../forms/RegisterForm";
import LoginForm from "../forms/LoginForm";

const WriteMessageModal = ({ open, setOpen }) => {
    const [value, setValue] = useState('');
    const [registration, setRegistration] = useState(false);
    const [token, setToken] = useState(false);

    const modules = {
        toolbar: [
            ['bold', 'italic', 'link'], ['code-block'], ['image']
        ]
    }

    const formats = ['bold', 'italic', 'link', 'code-block', 'image'];

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {!token
                    ? !registration
                        ? (
                            <Box sx={{ padding: '30px' }}>
                                <RegisterForm setRegistration={setRegistration}/>
                            </Box>
                        )
                        : (
                            <Box sx={{ padding: '30px' }}>
                                <LoginForm setToken={setToken}/>
                            </Box>
                        )
                    : (
                        <Box sx={{ padding: '10px' }}>
                            <div className="text-editor">
                                <ReactQuill
                                    theme="snow"
                                    value={value}
                                    onChange={setValue}
                                    placeholder={"Write something awesome..."}
                                    modules={modules}
                                    formats={formats}
                                />
                            </div>
                        </Box>
                    )


                }

            </Box>
        </Modal>
    );
};

export default WriteMessageModal;