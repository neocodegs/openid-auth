import axios from "axios";
import * as oauth2 from "oauth4webapi";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { Button, Layout, Page, Text, Link } from "@vercel/examples-ui";
import { jwtDecode } from "jwt-decode";

var config = {
  issuer: `https://accounts.google.com/o/oauth2/v2/auth`,
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  scopes: "email profile",
  redirectUri: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_REDIRECTURI + "/implicit",
};

export default function Implicit() {
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState("");
  const handleClick = async () => {
    const query = queryString.stringify({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scopes,
      state: oauth2.generateRandomState(),
      response_type: "token",
      include_granted_scopes: true,
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${query}`;
  };

  const handleClickID = async () => {
    const queryIdToken = queryString.stringify({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scopes,
      state: oauth2.generateRandomState(),
      response_type: "id_token",
      nonce: oauth2.generateRandomNonce(),
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${queryIdToken}`;
  };

  useEffect(() => {
    if (!window.location.hash) {
      return;
    }
    console.log(window.location.hash);
    const parsed = queryString.parse(location.hash) || "";
    const data = JSON.stringify(parsed, null, 4);
    setToken(data);
    const params = {
      access_token: parsed.access_token,
    };

    if (parsed.access_token) {
      axios
        .get("https://www.googleapis.com/oauth2/v2/userinfo", {
          params: {
            access_token: parsed.access_token,
          },
        })
        .then((res) => {
          setProfile(JSON.stringify(res.data, null, 4));
        });
    } else if (parsed.id_token) {
      const jwt = jwtDecode(parsed.id_token as string);
      const data = JSON.stringify(jwt, null, 4);
      setProfile(data);
    }
  }, []);

  return (
    <Page>
      <section className="flex flex-col gap-6">
        <Link href="/">Home</Link>
        <Text variant="description">OAuth 2.0 Implicit Flow</Text>
        <Button size="lg" onClick={handleClick}>
          Login with google
        </Button>
        <Button size="lg" onClick={handleClickID}>
          Login with google OpenID
        </Button>
        <pre>{token}</pre>
        <pre>{profile}</pre>
      </section>
    </Page>
  );
}

Implicit.Layout = Layout;
