import React, { useContext } from 'react';
import { Badge, IconButton, Tooltip } from "@mui/material";
import {
    ContactPageOutlined,
    FilePresentOutlined,
    QuestionAnswerOutlined, RemoveCircleOutlineOutlined, ShortcutOutlined,
    VisibilityOutlined
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publicRequest } from "../../requestMethod";
import styled from "@emotion/styled";
import { MessageContext } from "../../context/MessageContext";

const Span = styled.span`
    color: var(--color-light-text);
`;
const ButtonsMessage = ({type, message, count, page, openMessages, setOpenMessages}) => {
    const { currentUser } = useContext(AuthContext);
    const { setAnswer, setTheme } = useContext(MessageContext);
    const queryClient = useQueryClient();

    const deleteMutation = useMutation(
        (messageId) => {
            if (!message?.themeId) {
                return publicRequest.delete(`themes/${messageId}`) &&
                window.location.reload();
            } else {
                return publicRequest.delete(`messages/${messageId}`) &&
                    window.location.reload();
            }
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["messages"])
            }
        }

    );
    const handleDelete = () => {
        deleteMutation.mutate(message?.id);
    };

    const handleAnswer = () => {
        setAnswer(message?.id);
        !message?.themeId ?  setTheme(message?.id) : setTheme(message?.themeId);
    }

    return (
        <>
            {type === "main" && count !== 0 && !page ? (
                <IconButton onClick={() => setOpenMessages(!openMessages)}>
                    <Tooltip title="Read comments">
                        <Badge badgeContent={count} color="success">
                            <QuestionAnswerOutlined />
                        </Badge>
                    </Tooltip>
                </IconButton>
            ) : (
                count !== 0 && type !== "rcv" && type !== "own" && (
                    <Span>{count} messages</Span>
                )
            )
            }

            {!page && (
                <IconButton
                    component={RouterLink}
                    to={`message/${message?.id}`}
                >
                    <Tooltip title="See all theme">
                        <VisibilityOutlined />
                    </Tooltip>
                </IconButton>
            )}

            {message?.homepage && (
                <a href={message?.homepage} target="_blank">
                    <IconButton>
                        <Tooltip title="Hom page">
                            <ContactPageOutlined />
                        </Tooltip>
                    </IconButton>
                </a>
            )}

            {message?.fileTxt && (
                <a href={message?.fileTxt} target="_blank">
                    <IconButton>
                        <Tooltip title="See file">
                            <FilePresentOutlined />
                        </Tooltip>
                    </IconButton>
                </a>
            )}

            <IconButton
                component={RouterLink}
                to={currentUser === null ? "/registration" : "/write"}
                answer={message?.id}
                onClick={handleAnswer}
            >
                <Tooltip title="Answer">
                    <ShortcutOutlined />
                </Tooltip>
            </IconButton>
            {currentUser?.username === message?.username && (
                <IconButton onClick={handleDelete}>
                    <Tooltip title="Delete message">
                        <RemoveCircleOutlineOutlined sx={{ fill: "#e91e63" }}/>
                    </Tooltip>
                </IconButton>
            )}
        </>
    );
};

export default ButtonsMessage;