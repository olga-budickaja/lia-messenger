import { Container } from "./writteMessageStyle";
import { useEffect, useState } from "react";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const WriteMessage = () => {
    const [value, setValue] = useState('');

    useEffect(() => {
        const quill = new Quill('#editor-container', {
            modules: {
                toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', ''],
                    ['image', 'code-block']
                ]
            },
            placeholder: 'Compose an epic...',
            theme: 'snow'  // or 'bubble'
        });
    }, [])

    console.log(value)
    return (
        <Container>
            <ReactQuill
                id="editor-container"
                value={value}
                onChange={setValue}
            >

            </ReactQuill>
        </Container>
    );
};

export default WriteMessage;