import './App.scss';
import Navbar from "./components/navbar/Navbar";
import { Container } from "@mui/material";
import AppRouter from "./components/AppRouter";
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query'

function App() {

    const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
        <Navbar />
        <Container maxWidth="md" sx={{ minHeight: 'calc(100vh - 75px)' }}>
            <AppRouter />
        </Container>
    </QueryClientProvider>
  );
}

export default App;
