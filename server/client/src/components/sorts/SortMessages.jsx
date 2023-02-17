import { Container, ItemSort } from "./SortMessageStyle";

const SortMessages = ({items, name, onClick}) => {
    return (
        <Container>
            {items.map(item => (
                <ItemSort
                    name={name}
                    key={item.name}
                    onClick={() => onClick(item.name)}
                >
                    <h6>
                        {item.title}
                    </h6>
                    {item.icon}
                </ItemSort>
            ))}

        </Container>
    );
};

export default SortMessages;