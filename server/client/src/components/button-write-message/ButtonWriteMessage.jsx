import { useContext } from 'react';
import { Tooltip } from "@mui/material";
import { ColorRoundButton } from "../../ui/muiStyle";
import { Link as RouterLink } from "react-router-dom";
import { AddOutlined } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import styled from "@emotion/styled";

const ButtonNew = styled.div`
    position: fixed;
    right: 40px;
    bottom: 30px;
`;
const ButtonWriteMessage = () => {
    const { currentUser } = useContext(AuthContext);
    return (
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
    );
};

export default ButtonWriteMessage;