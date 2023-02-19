import { Container, NoMessages, PaginationContainer } from "./themesStyle";
import Messages from "../messages/Messages";
import { useQuery } from "@tanstack/react-query";
import { publicRequest } from "../../requestMethod";
import { Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import SortMessages from "../sorts/SortMessages";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ButtonWriteMessage from "../button-write-message/ButtonWriteMessage";
import { items } from "../../dataApp";

const MessageThemes = () => {
    const [themes, setThemes] = useState([]);
    const [sortName, setSortName] = useState('');

    const { isLoading, error, data } = useQuery(["themes"], () =>
        publicRequest.get(`/themes`).then((res) => {
            return res.data
        })
    );

    useEffect(() => {
            if (data) {
                setThemes(data?.data)
                themes?.sort((t1, t2) => {
                    return new Date(t2.createAt) - new Date(t1.createAt)
                })
            }
    }, [data]);

    const sortMessageName = (sort) => {
        setSortName(sort);
        setThemes([...themes].sort((a, b) => a[sort].localeCompare(b[sort])));
    }

    return (
        <Container>
            {!themes
                ? (<NoMessages>"Write a message`s` theme to start a chat."</NoMessages>)
                : (
                    <>
                        <SortMessages
                            items={items}
                            name={sortName}
                            onClick={sortMessageName}
                        />
                        <TransitionGroup>
                            {error
                                ? "Something went wrong!"
                                : isLoading
                                    ? "Loading..."
                                    : themes?.map((message) =>
                                        <CSSTransition
                                            timeout={500}
                                            classNames="message"
                                            key={message?.id}
                                        >
                                            <Messages main="main" message={message} />
                                        </CSSTransition>

                                    )
                            }
                        </TransitionGroup>
                    </>
                )
            }
            <ButtonWriteMessage />
            <PaginationContainer>
                <Stack spacing={2}>
                    <Pagination count={themes?.endingLink} variant="outlined" />
                </Stack>
            </PaginationContainer>
        </Container>
    );
};

export default MessageThemes;