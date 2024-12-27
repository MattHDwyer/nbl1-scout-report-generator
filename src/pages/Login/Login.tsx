import { Box, Button, Input, Paper, Stack } from "@mui/material";
import React, { useState } from "react";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components";
import { ILoginInputs } from "../../services/auth";

export const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<ILoginInputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILoginInputs> = async (data, e) => {
    setLoading(true);
    try {
      const response = await login(data);
      console.log(data);
      if (!response) {
        setLoading(false);
        throw new Error("Login Failed! Please contact admin");
      }

      if (response.data.user.role === "player") {
        setLoading(false);

        return navigate("/player");
      }
      if (response.data.user.role === "coach") {
        setLoading(false);
        return navigate("/coach/construct-scout");
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: "340px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px",
          marginBottom: "15vh",
        }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <Form onSubmit={() => handleSubmit(onSubmit)()} control={control}>
            <Stack>
              <Input
                {...register("username")}
                type="email"
                placeholder="Email"
              />
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
              />
              <Button type="submit">Login</Button>
            </Stack>
          </Form>
        )}
      </Paper>
    </Box>
  );
};
