import { Container } from "./themesStyle";
import Messages from "../messages/Messages";
import { useQuery } from "@tanstack/react-query";
import { publicRequest } from "../../requestMethod";
import { ButtonNew } from "../messages/messagesStyle";
import { Tooltip } from "@mui/material";
import { ColorRoundButton } from "../../ui/muiStyle";
import { AddOutlined } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Themes = () => {
    const { currentUser } = useContext(AuthContext);
    const { isLoading, error, data } = useQuery(["themes"], () =>
        publicRequest.get('/themes').then((res) => {
            return res.data
        })
    );

    return (
        <Container>
            {error
                ? "Something went wrong!"
                : isLoading
                    ? "Loading..."
                    : data.map((message) =>
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