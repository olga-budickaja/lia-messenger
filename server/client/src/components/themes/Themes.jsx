import { Container } from "./themesStyle";
import Messages from "../messages/Messages";
import { useQuery } from "@tanstack/react-query";
import { publicRequest } from "../../requestMethod";
import { ButtonNew } from "../messages/messagesStyle";
import { Tooltip } from "@mui/material";
import { ColorRoundButton } from "../../ui/muiStyle";
import { AddOutlined } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Themes = () => {
    const { currentUser } = useContext(AuthContext);
    const [themes, setThemes] = useState([]);

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
    }, [data])


    return (
        <Container>
            {error
                ? "Something went wrong!"
                : isLoading
                    ? "Loading..."
                    : themes.map((message) =>
                        <Messages main="main" message={message} key={message.id} />
                    )
            }
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

export default Themes;