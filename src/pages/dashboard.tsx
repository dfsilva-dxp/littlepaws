import useAuth from "../hooks/useAuth";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { customer, signOut } = useAuth();

  return (
    <main>
      <h1>Dashboard: {customer?.email}</h1>
      <button onClick={signOut}>Sair</button>
    </main>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
