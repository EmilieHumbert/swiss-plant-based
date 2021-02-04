import { useRequireAuth } from "../hooks/useRequireAuth";

const DashBoardPage = () => {
  const auth = useRequireAuth();
  if (!auth.user) return null;
  return (
    <div>
      <h2>{`Welcome ${auth.user.name}!`}</h2>
      <p>{`You are logged in with ${auth.user.email}`}</p>
      <button onClick={() => auth.signOut()}>Sign out</button>
    </div>
  );
};

export default DashBoardPage;
