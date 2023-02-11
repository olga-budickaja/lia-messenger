import './App.scss';
import Navbar from "./components/navbar/Navbar";
import { Container } from "@mui/material";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <div>
        <Navbar />
        <Container maxWidth="xl" sx={{ minHeight: 'calc(100vh - 65px)' }}>
            <AppRouter/>
        </Container>
    </div>
  );
}

export default App;
