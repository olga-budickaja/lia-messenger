import {
    Container,
    Title,
    Input,
    ContainerButton,
    Label,
    Qualification,
    ErrorContainer,
    ErrorText, ContainerPreview, ImgPreview,
} from "./writteMessageStyle";
import ReactQuill from "react-quill";
import { useContext, useEffect, useState } from "react";
import { CloseButton, ColorButton } from "../../ui/muiStyle";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import app from "../../firebase";
import { publicRequest } from "../../requestMethod";
import moment from "moment";
import { CancelOutlined } from "@mui/icons-material";
import "cropperjs/dist/cropper.css";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import { MessageContext } from "../../context/MessageContext";
import { AuthContext } from "../../context/AuthContext";

const WriteMessage = () => {
    const { userId } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const { answer, setAnswer, theme, setTheme, setArrivalMessage } = useContext(MessageContext);
    const [value, setValue] = useState('');
    const [img, setImg] = useState(undefined);
    const [imgLink, setImgLink] = useState(undefined);
    const [txt, setTxt] = useState(undefined);
    const [imgPrc, setImgPrc] = useState(0);
    const [txtPrc, setTxtPrc] = useState(0);
    const [inputs, setInputs] = useState({});
    const [homepage, setHomepage] = useState('');
    const [errorFileSize, setErrorFileSize] = useState('');
    const [errorImgSize, setErrorImgSize] = useState('');
    const navigate = useNavigate();

    const modules = {
        toolbar: [
            ['bold', 'italic', 'link'], ['code-block']
        ]
    }
    const formats = ['bold', 'italic', 'link', 'code-block'];

    const uploadFile = (file, fileType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                fileType === "fileImg" ? setImgPrc(Math.round(progress)) : setTxtPrc(Math.round(progress))
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => { },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => {
                        return { ...prev, [fileType]: downloadURL }
                    });
                });
            }
        );
    };
    const deleteImgFromStorage = (img) => {
        const storage = getStorage();
        const desertRef = ref(storage, `/${img}`);
            deleteObject(desertRef).then(() => {
                setErrorImgSize("Image size must be 4x3!");
                setTimeout(() => setErrorImgSize(""), 2000);
            }).catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        img && uploadFile(img, "fileImg");
    }, [img])


    useEffect(() => {
        txt && uploadFile(txt, "fileTxt");
        txt && txt > 100 * 1024
            ? setErrorFileSize("large file size!") && deleteImgFromStorage(imgLink)
            : setErrorFileSize("") && uploadFile(txt, "fileTxt")
    }, [txt]);


    useEffect(() => {
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                desc: data.text,
                createAt: moment(Date.now()).format("YYYY-MM-DD hh:mm:ss")
            });
        });
    }, [])

    const handleUpload = async (e) => {
        e.preventDefault();


        socket.current.emit("sendMessage", {
            senderId: userId,
            receiverId: answer ? answer : null,
            text: value
        });


        try {
            if (answer === null) {
                await publicRequest.post("themes", {
                    ...inputs,
                    desc: value,
                    homepage,
                    createAt: moment(Date.now()).format("YYYY-MM-DD hh:mm:ss")
                });
                await publicRequest.post("conversations", {
                    senderId: userId,
                });
                navigate("/");
            } else if (answer) {
                await publicRequest.post("messages", {
                    ...inputs,
                    desc: value,
                    themeId: theme,
                    answerId: answer,
                    homepage,
                    createAt: moment(Date.now()).format("YYYY-MM-DD hh:mm:ss")
                });
                await publicRequest.post("conversations", {
                    senderId: userId,
                    receiverId: answer,
                });
                navigate(`/`);
                setAnswer(null);
                setTheme(null)
            }

        } catch (e) {
            console.log(e)
        }
    }




    const handleClose = () => {
        setImg(undefined);
        deleteImgFromStorage(imgLink);
        window.location.reload();
    }

    return (
        <Container>
            <Title>Write a new message</Title>
            <Label>text*:</Label>
            <div className="text-editor">
                <ReactQuill
                    theme="snow"
                    value={value}
                    name="desc"
                    onChange={setValue}
                    placeholder={"Write something awesome..."}
                    modules={modules}
                    formats={formats}
                />
            </div>
            <Label>Upload homepage:</Label>
            <Input
                type="url"
                name="homepage"
                onChange={(e) => setHomepage(e.target.value)}
            />
            <Label>Upload image:</Label>
            <Qualification>(size 320x240px)</Qualification>
            {imgPrc > 0
                ? ("Uploading:" + imgPrc + "%"
                ) : (
                    <Input
                        type="file"
                        accept=".jpeg,.png,.gif"
                        onChange={e => setImg(e.target.files[0])}
                    />
                )}
            {(img && !errorImgSize) ? (
                <ContainerPreview>
                    <ImgPreview src={URL.createObjectURL(img)} />
                    <CloseButton onClick={handleClose}>
                        <CancelOutlined/>
                    </CloseButton>
                </ContainerPreview>
            ) : (
                <ErrorContainer>
                    <ErrorText>{errorImgSize}</ErrorText>
                </ErrorContainer>
            )}

            <Label>Upload file:</Label>
            <Qualification>(max size 100kBt, format .txt)</Qualification>
            {txtPrc > 0
                ? ("Uploading:" + txtPrc + "%"
                ) : (
                    <Input
                        type="file"
                        accept=".txt"
                        onChange={e => setTxt(e.target.files[0])}
                    />
                )}
            {errorFileSize && errorFileSize.length && (
                <ErrorContainer>
                    <ErrorText>{errorFileSize}</ErrorText>
                </ErrorContainer>
            )}
            <ContainerButton>
                <ColorButton
                    onClick={handleUpload}
                    type="submit"
                >
                    Publish
                </ColorButton>
            </ContainerButton>
        </Container>
    );
};

export default WriteMessage;