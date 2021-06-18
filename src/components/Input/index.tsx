import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, type, ...props },
  ref
) => {
  return (
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
  );
};

export const Input = forwardRef(InputBase);
