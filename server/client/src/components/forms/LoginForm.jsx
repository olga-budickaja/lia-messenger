import { useForm } from "react-hook-form";
import {
    ErrorContainer,
    ErrorText,
    Form, FormTitle,
    Greeting,
    Input,
    InputContainer
} from "./formsStyle";
import { useContext, useRef, useState } from "react";
import { ColorButton } from "../../ui/muiStyle";
import { Button } from "@mui/material";
import { CSSTransition } from 'react-transition-group';
import { AuthContext } from "../../context/AuthContext";

const LoginForm = ({setToken}) => {
    const { login } = useContext(AuthContext);
    const [errorAxios, setErrorAxios] = useState(null);
    const [inProp, setInProp] = useState(false);
    const successRef = useRef(null);



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

    const handleLogin = async (data) => {
        try {
            await login(data);
            setInProp(true);
            setTimeout(() => setInProp(false), 2000);
            setTimeout(() => {
                setToken(true);
            }, 2200);
        }catch (e) {
            setErrorAxios(e.response.data.message);
            setInProp(false);
        }
    };


    return (
        <Form>
            <FormTitle>Log In</FormTitle>
            {inProp && (
                <CSSTransition successRef={successRef} in={inProp} timeout={200} classNames="my-node">
                    <InputContainer ref={successRef}>
                        <Greeting>
                            Successful login :)
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
            <ColorButton
                onClick={handleSubmit(handleLogin)}
                type="submit"
                disable={!isValid.toString()}
            >
                Log in
                {/*{isFetching*/}
                {/*    ? <CircularProgress color="inherit" size="15px"/>*/}
                {/*    : "Sign up"*/}
                {/*}*/}
            </ColorButton>
            <Button>I haven`t account</Button>
            <ErrorContainer>
                {errorAxios && (
                    <ErrorText>{errorAxios}</ErrorText>
                )}
            </ErrorContainer>
        </Form>
    );
};

export default LoginForm;