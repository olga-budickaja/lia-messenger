import { useForm } from "react-hook-form";
import {
    ErrorContainer,
    ErrorText,
    Form, FormTitle,
    Greeting,
    Input,
    InputContainer, InputShow
} from "./formsStyle";
import { useContext, useRef, useState } from "react";
import { ColorButton } from "../../ui/muiStyle";
import { Button } from "@mui/material";
import { CSSTransition } from 'react-transition-group';
import { AuthContext } from "../../context/AuthContext";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const [errorAxios, setErrorAxios] = useState(null);
    const [inProp, setInProp] = useState(false);
    const successRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const {
        register,
        formState: {
            errors
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
            setTimeout(() => navigate("/"), 2000);
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
            <InputContainer>
                <Input
                    placeholder="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                        required: "field is required",
                    })}
                />
                <InputShow onClick={handleClickShowPassword}>
                    {!showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                </InputShow>
            </InputContainer>

            <ErrorContainer>
                {errors?.password &&
                    <ErrorText>
                        {errors?.password?.message ||
                            "Error"
                        }
                    </ErrorText>
                }
            </ErrorContainer>
            <ColorButton
                onClick={handleSubmit(handleLogin)}
                type="submit"
            >
                Log in
            </ColorButton>
            <Button
                component={RouterLink}
                to="/register"
            >
                I haven`t account
            </Button>
            <ErrorContainer>
                {errorAxios && (
                    <ErrorText>{errorAxios}</ErrorText>
                )}
            </ErrorContainer>
        </Form>
    );
};

export default LoginForm;