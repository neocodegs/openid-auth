import { Button, Layout, Page, Text, Code, Link } from "@vercel/examples-ui";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";

const redirectUri =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_REDIRECTURI + "/auth0";
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button onClick={() => loginWithRedirect()}>Log In with Auth0 </Button>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();
  const login = () =>
    logout({
      logoutParams: {
        returnTo: redirectUri,
      },
    });
  return <Button onClick={login}>Log Out</Button>;
};

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (!user) {
    return <LoginButton />;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        <Image src={user.picture || ""} alt={user.name || ""} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div>
          <LogoutButton />
        </div>
      </div>
    );
  }

  return null;
};
export default function Auth0() {
  return (
    <Auth0Provider
      domain="dev-wqp23qso0v6als3x.us.auth0.com"
      clientId="QvaabNusg55Ey7ipH6WOF84j67gN0DJp"
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
    >
      <Page>
        <section className="flex flex-row gap-6">
          <Link href="/">Home</Link>
        </section>

        <hr className="border-t border-accents-2 my-6" />
        <section className="flex flex-col gap-3">
          <Profile />
        </section>
      </Page>
    </Auth0Provider>
  );
}

Auth0.Layout = Layout;
