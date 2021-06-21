import Head from "next/head";

import useAuth from "../hooks/useAuth";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { customer, signOut } = useAuth();

  return (
    <>
      <Head>
        <title>Dashboard | littlepaws.</title>
      </Head>
      <main>
        <h1>Dashboard: {customer?.email}</h1>
        <button onClick={signOut}>Sair</button>
      </main>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
