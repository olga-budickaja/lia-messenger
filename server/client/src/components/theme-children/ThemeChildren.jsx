import { useQuery } from "@tanstack/react-query";
import { publicRequest } from "../../requestMethod";
import Messages from "../messages/Messages";

const ThemeChildren = ({themeId}) => {

    const { isLoading, error, data } = useQuery(["messages"], () =>
        publicRequest.get(`/messages/theme/${themeId}`).then((res) => {
            return res.data
        })
    );

    return (
        <>
            {error
                ? "Something went wrong!"
                : isLoading
                    ? "Loading..."
                    : data.map((message) =>
                        <Messages message={message} key={message.id} type="snd" />
                    )
            }
        </>
    );
};

export default ThemeChildren;