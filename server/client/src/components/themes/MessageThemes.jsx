import { Container } from "./themesStyle";
import Messages from "../messages/Messages";
import { useQuery } from "@tanstack/react-query";
import { publicRequest } from "../../requestMethod";
import { ButtonNew } from "../messages/messagesStyle";
import { Tooltip } from "@mui/material";
import { ColorRoundButton } from "../../ui/muiStyle";
import {
    AddOutlined,
    CalendarMonthOutlined,
    ImportExportOutlined,
    TextRotateVerticalOutlined
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import SortMessages from "../sorts/SortMessages";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const MessageThemes = () => {
    const { currentUser } = useContext(AuthContext);
    const [themes, setThemes] = useState([]);
    const [sortName, setSortName] = useState('');

    const { isLoading, error, data } = useQuery(["themes"], () =>
        publicRequest.get('/themes').then((res) => {
            return res.data
        })
    );

    useEffect(() => {
        const sortsData = async () => {
            if (data) {
                setThemes(data)
                themes.sort((t1, t2) => {
                    return new Date(t2.createAt) - new Date(t1.createAt)
                })
            }
        }
        sortsData()
    }, [data]);

    const items = [
        {name: 'username', title: 'Sort by username', icon: <TextRotateVerticalOutlined />},
        {name: 'email', title: 'Sort by email', icon: <ImportExportOutlined />},
        {name: 'createAt', title: 'Sort by date', icon: <CalendarMonthOutlined />},
    ];

    const sortMessageName = (sort) => {
        setSortName(sort);
        setThemes([...themes].sort((a, b) => a[sort].localeCompare(b[sort])));
    }

    return (
        <Container>
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
                        : themes.map((message) =>
                            <CSSTransition
                                timeout={500}
                                classNames="message"
                                key={message.id}
                            >
                                <Messages main="main" message={message} />
                            </CSSTransition>

                        )
                }
            </TransitionGroup>
            <ButtonNew>
                <Tooltip title="Add new theme">
                    <ColorRoundButton
                        component={RouterLink}
                        to={currentUser === null
                            ? "registration"
                            : "write"
                        }
                    >
                        <AddOutlined />
                    </ColorRoundButton>
                </Tooltip>
            </ButtonNew>
        </Container>
    );
};

export default MessageThemes;