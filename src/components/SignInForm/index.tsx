import { Button, Flex, Stack } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
import { Input } from "../Input";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loading } = useAuth();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
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
    } finally {
      setEmail("");
      setPassword("");
    }
  }

  return (
    <Flex as="form" direction="column" onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Input
          name="email"
          type="email"
          label="E-mail"
          size="lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // error={errors.email}
          // {...register("email")}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          size="lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // error={errors.password}
          // {...register("password")}
        />
        <Button type="submit" colorScheme="pink" size="lg" isLoading={loading}>
          Enter
        </Button>
      </Stack>
      <ToastContainer />
    </Flex>
  );
}
