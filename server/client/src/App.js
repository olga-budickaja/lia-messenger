import './App.scss';
import Navbar from "./components/navbar/Navbar";
import { Container } from "@mui/material";
import AppRouter from "./components/AppRouter";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser)
  return (
    <div>
        <Navbar />
        <Container maxWidth="md" sx={{ minHeight: 'calc(100vh - 75px)' }}>
            <AppRouter />
        </Container>
    </div>
  );
}

export default App;
