import RegisterForm from "../../components/forms/RegisterForm";
import { Container } from "./registrationPageStyle";
import { Box, Paper } from "@mui/material";

const RegistrationPage = () => {
    return (
        <Container>
            <Paper sx={{ width: { xs: '100%', md: '400px' }, margin: "0 auto" }}>
                <Box sx={{ padding: "40px" }}>
                    <RegisterForm />
                </Box>
            </Paper>
        </Container>
    );
};

export default RegistrationPage;