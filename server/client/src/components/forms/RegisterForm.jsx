import { useForm } from "react-hook-form";
import { ErrorContainer, ErrorText, Form, Greeting, Input, InputContainer } from "./formsStyle";
import { useState } from "react";
import { ColorButton } from "../../ui/muiStyle";
import { Box, Button } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

const RegisterForm = () => {
    const [greeting, setGreeting] = useState(false);
    const CAPTCHA_KEY = process.env.REACT_APP_CAPTCHA_KEY;
    const [captchaIsGoogle, setCaptchaIsGoogle] = useState(false);

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

    const handleRegister= () => {
        setGreeting(true);
    }


    return (
        <Form>
            {greeting && (
                <InputContainer>
                    <Greeting>
                        The account has been created. Thank you for joining AirTube. Log in please :)
                    </Greeting>
                </InputContainer>
            )}
            <Input
                placeholder="username"
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
                placeholder="email"
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
                type="homepage"
                {...register('homepage', {
                    pattern: {
                        value: /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/,
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
                Register
                {/*{isFetching*/}
                {/*    ? <CircularProgress color="inherit" size="15px"/>*/}
                {/*    : "Sign up"*/}
                {/*}*/}
            </ColorButton>
            {/*<ErrorContainer>*/}
            {/*    {error && (*/}
            {/*        <ErrorText>{errorAxios}</ErrorText>*/}
            {/*    )}*/}

            {/*</ErrorContainer>*/}
            <Button>I have an account</Button>
        </Form>
    );
};

export default RegisterForm;