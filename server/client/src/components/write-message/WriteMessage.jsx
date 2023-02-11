import { Container, InputMessage } from "./writteMessageStyle";
import { useState } from "react";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const WriteMessage = () => {
    const [value, setValue] = useState('');

    const quill = new Quill('#editor-container', {
        modules: {
            toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['image', 'code-block']
            ]
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'  // or 'bubble'
    });



    console.log(value)
    return (
        <Container>
            <InputMessage
                placeholder="Title"
            />
            <ReactQuill id="editor-container" theme="snow" value={value} onChange={setValue}></ReactQuill>
        </Container>
    );
};

export default WriteMessage;