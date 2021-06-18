import { Button, Flex, Stack } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Input } from "../Input";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loading } = useAuth();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    await signIn(data);
    setEmail("");
    setPassword("");
  }

  return (
    <Flex as="form" direction="column" onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Input
          name="email"
          type="email"
          label="E-mail"
          size="lg"
          // error={errors.email}
          // {...register("email")}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          size="lg"
          // error={errors.password}
          // {...register("password")}
        />
        <Button type="submit" colorScheme="pink" size="lg" isLoading={loading}>
          Enter
        </Button>
      </Stack>
    </Flex>
  );
}
