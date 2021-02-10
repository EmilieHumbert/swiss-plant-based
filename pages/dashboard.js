import { useRequireAuth } from "../hooks/useRequireAuth";

import { Button, Container } from "@material-ui/core";

const DashBoardPage = () => {
  const auth = useRequireAuth();
  if (!auth.user) return null;
  return (
    <Container maxWidth={"sm"}>
      <h2>{`Welcome ${auth.user.name}!`}</h2>
      <p>{`You are logged in with ${auth.user.email}`}</p>
      <Button onClick={() => auth.signOut()} variant="outlined">
        Sign out
      </Button>
    </Container>
  );
};

export default DashBoardPage;
