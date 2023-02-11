import { Container, ContainerAnswer } from "./homeStyle";
import Messages from '../../components/messages/Messages'

const Home = () => {
    return (
        <Container>
            <ContainerAnswer>
                <Messages />
            </ContainerAnswer>
        </Container>
    );
};

export default Home;