import LoginForm from "../../components/forms/LoginForm";
import { Container } from "../registration-page/registrationPageStyle";
import { Box, Paper } from "@mui/material";

const LoginPage = () => {
    return (
        <Container>
            <Paper sx={{ width: { xs: '100%', md: '400px' }, margin: "0 auto" }}>
                <Box sx={{ padding: "40px" }}>
                    <LoginForm />
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;