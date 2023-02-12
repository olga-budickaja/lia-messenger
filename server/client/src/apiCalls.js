import { publicRequest } from "./requestMethod";

export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await publicRequest("auth/register", userCredential);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (e) {
        dispatch({ type: "LOGIN_FAILURE", payload: e });
    }
}