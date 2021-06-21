import { Button, Flex, Stack } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
import { Input } from "../Input";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório.").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória."),
});

export function SignInForm() {
  const { signIn, loading } = useAuth();
  const { formState, handleSubmit, register } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    const { email, password } = values;
    try {
      await signIn({
        email,
        password,
      });
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Flex as="form" direction="column" onSubmit={handleSubmit(handleSignIn)}>
      <Stack spacing={4}>
        <Input
          name="email"
          type="email"
          label="E-mail"
          size="lg"
          error={errors.email}
          {...register("email")}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          size="lg"
          error={errors.password}
          {...register("password")}
        />
        <Button type="submit" colorScheme="pink" size="lg" isLoading={loading}>
          Enter
        </Button>
      </Stack>
      <ToastContainer />
    </Flex>
  );
}
