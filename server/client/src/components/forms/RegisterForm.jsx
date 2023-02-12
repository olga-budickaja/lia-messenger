import { useForm } from "react-hook-form";
import { ErrorContainer,
    ErrorText,
    Form,
    Greeting,
    Input,
    InputContainer
} from "./formsStyle";
import { useContext, useRef, useState } from "react";
import { ColorButton } from "../../ui/muiStyle";
import { Box } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { CSSTransition } from 'react-transition-group';
import { publicRequest } from "../../requestMethod";
import { AuthContext } from "../../context/AuthContext";

const RegisterForm = ({setToken}) => {
    const { currentUser, setCurrentUser, login } = useContext(AuthContext);
    const CAPTCHA_KEY = process.env.REACT_APP_CAPTCHA_KEY;
    const [captchaIsGoogle, setCaptchaIsGoogle] = useState(false);
    const [errorAxios, setErrorAxios] = useState(null);
    const [inProp, setInProp] = useState(false);
    const successRef = useRef(null);

    console.log(captchaIsGoogle)

    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
    }
        = useForm({
        mode: "onBlur"
    });

    const handleRegister = async (data) => {
        try {
            if (currentUser !== null) {
                await login(data);
                setToken(true);
            } else {
                await publicRequest.post('auth/register', data);
                setCurrentUser(data)
                setInProp(true);
                setTimeout(() => setInProp(false), 2000);
                setTimeout(() => setToken(true), 2200);
            }
        } catch (e) {
            setErrorAxios(e.response.data.message);
            setInProp(false);
        }
    }


    return (
        <Form>
            {inProp && (
                <CSSTransition successRef={successRef} in={inProp} timeout={200} classNames="my-node">
                    <InputContainer ref={successRef}>
                        <Greeting>
                            Successful registration :)
                        </Greeting>
                    </InputContainer>
                </CSSTransition>

            )}
            <Input
                placeholder="username*"
                {...register('username', {
                    required: "field is required",
                    minLength: {
                        value: 2,
                        message: "Username cannot be less than 2 letters"
                    }
                })}
            />
            <ErrorContainer>
                {errors?.username &&
                    <ErrorText>
                        {errors?.username?.message ||
                            "Error"
                        }
                    </ErrorText>
                }
            </ErrorContainer>
            <Input
                placeholder="email*"
                type="email"
                {...register('email', {
                    required: "field is required",
                    pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid email"
                    }
                })}
            />
            <ErrorContainer>
                {errors?.email &&
                    <ErrorText>
                        {errors?.email?.message ||
                            "Error"
                        }
                    </ErrorText>
                }
            </ErrorContainer>
            <Input
                placeholder="homepage"
                type="url"
                {...register('homepage', {
                    required: false,
                    pattern: {
                        value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
                        message: "Invalid url"
                    }
                })}
            />
            <ErrorContainer>
                {errors?.homepage &&
                    <ErrorText>
                        {errors?.homepage?.message ||
                            "Error"
                        }
                    </ErrorText>
                }
            </ErrorContainer>

            <Box>
                <ReCAPTCHA
                    sitekey={CAPTCHA_KEY}
                    onChange={() => setCaptchaIsGoogle(true)}
                />
            </Box>

            <ColorButton
                onClick={handleSubmit(handleRegister)}
                type="submit"
                disabled={!isValid && !captchaIsGoogle}
            >
                Log in
                {/*{isFetching*/}
                {/*    ? <CircularProgress color="inherit" size="15px"/>*/}
                {/*    : "Sign up"*/}
                {/*}*/}
            </ColorButton>
            <ErrorContainer>
                {errorAxios && (
                    <ErrorText>{errorAxios}</ErrorText>
                )}
            </ErrorContainer>
        </Form>
    );
};

export default RegisterForm;