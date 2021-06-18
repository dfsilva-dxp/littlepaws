import Head from "next/head";
import { Box, Flex, Text } from "@chakra-ui/react";

import styles from "../styles/pages/Home.module.scss";
import { SignInForm } from "../components/SignInForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sign in | littlepaws.</title>
      </Head>
      <Flex
        as="main"
        w="100vw"
        h="100vh"
        px="4"
        align="center"
        justify="center"
        direction="column"
      >
        <Flex flex="1" align="center" justify="center" direction="column">
          <Text as="h1" className={styles.title}>
            littlepaws
          </Text>
          <Box
            className={styles.card}
            width="100%"
            maxWidth="390px"
            background="gray.800"
          >
            <SignInForm></SignInForm>
          </Box>
        </Flex>
        <Box as="footer" className={styles.footer}>
          <a href="#" target="_blank" rel="noopener noreferrer">
            &copy; todos os direitos reservados.
          </a>
        </Box>
      </Flex>
    </>
  );
}
