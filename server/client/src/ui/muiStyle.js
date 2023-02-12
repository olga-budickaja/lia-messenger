import { Button, styled } from "@mui/material";
import { pink } from "@mui/material/colors";

export const ColorRoundButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: pink[500],
    borderRadius: '100%',
    minWidth: 50,
    minHeight: 50,
    padding: 0,
    '&:hover': {
        backgroundColor: pink[600],
    },
}));
export const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: pink[500],
    '&:hover': {
        backgroundColor: pink[600],
    },
}));

export const style = {
    position: 'absolute',
    bgcolor: 'white',
    top: '50%',
    left: '50%',
    height: 'auto',
    minHeight: 262,
    borderRadius: '8px',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
};