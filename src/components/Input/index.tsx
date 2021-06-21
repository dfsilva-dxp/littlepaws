import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, type, ...props },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <ChakraInput
        type={type}
        name={name}
        id={name}
        placeholder={label}
        {...props}
        background="gray.900"
        variant="filled"
        focusBorderColor="pink.500"
        _hover={{ bgColor: "gray.900" }}
        ref={ref}
        minWidth="350px"
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
