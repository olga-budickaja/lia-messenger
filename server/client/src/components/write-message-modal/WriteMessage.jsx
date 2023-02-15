import { Container, Title, Input, ContainerButton, Label, Qualification } from "./writteMessageStyle";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import { ColorButton } from "../../ui/muiStyle";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { publicRequest } from "../../requestMethod";
import moment from "moment";
const WriteMessage = ({ setOpen }) => {
    const [value, setValue] = useState('');
    const [img, setImg] = useState(undefined);
    const [txt, setTxt] = useState(undefined);
    const [imgPrc, setImgPrc] = useState(0);
    const [txtPrc, setTxtPrc] = useState(0);
    const [inputs, setInputs] = useState({});
    const [homepage, setHomepage] = useState('');

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
        const uploadTask = uploadBytesResumable(storageRef, file);

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
                    })
                });
            }
        );
    };

    useEffect(() => {
        img && uploadFile(img, "fileImg")
    }, [img]);

    useEffect(() => {
        txt && uploadFile(txt, "fileTxt")
    }, [txt]);


    const handleUpload = async (e) => {
        e.preventDefault();

        // setInputs((prev) => {
        //     return {
        //         ...prev,
        //         desc: value,
        //         createAt: moment(Date.now()).format("DD.MM.YYYY HH:mm:ss")
        //     }
        // });
        try {
            await publicRequest.post("themes", {
                ...inputs,
                desc: value,
                homepage,
                createAt: moment(Date.now()).format("YYYY-MM-DD hh:mm:ss")
            });
            setOpen(false);
        } catch (e) {
            console.log(e)
        }
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
            <Label>Upload your homepage:</Label>
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