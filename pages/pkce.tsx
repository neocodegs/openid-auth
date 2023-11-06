import axios from "axios";
import * as oauth2 from "oauth4webapi";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { Button, Layout, Page, Text, Link } from "@vercel/examples-ui";

let config = {
  issuer: `https://accounts.google.com/o/oauth2/v2/auth`,
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  scopes: "email profile",
  redirectUri: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_REDIRECTURI + "/pkce",
  storage: "sessionStorage",
  state: Date.now() + Math.round(Math.random() * 1000).toString(),
};

export default function PKCE() {
  const [token, setToken] = useState("");
  const handleClick = async () => {
    const codeVerifier = oauth2.generateRandomCodeVerifier();
    const codeChallenge = await oauth2.calculatePKCECodeChallenge(codeVerifier);
    window.localStorage.setItem("codeVerifier", codeVerifier);

    const query = queryString.stringify({
      scope: config.scopes,
      response_type: "code",
      redirect_uri: config.redirectUri,
      client_id: config.clientId,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${query}`;
  };

  useEffect(() => {
    if (!window.location.search) {
      return;
    }
    const parsed = queryString.parse(location.search);
    getToken(parsed);

    async function getToken(parsed: any) {
      if (!parsed.code) {
        return;
      }
      const query = {
        code: parsed.code,
        redirect_uri: config.redirectUri,
        client_id: config.clientId,
        client_secret: "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",
        grant_type: "authorization_code",
        code_verifier: window.localStorage.getItem("codeVerifier"),
      };

      const res = await axios.post(
        "https://oauth2.googleapis.com/token",
        null,
        { params: query }
      );
      if (res.data) {
        const data = JSON.stringify(res.data, null, 4);
        setToken(data);
      }
      console.log(res);
    }
  }, []);

  return (
    <Page>
      <section className="flex flex-col gap-6">
        <Link href="/">Home</Link>
        <Text variant="description">OAuth 2.0 PKCE Flow</Text>
        <Button size="lg" onClick={handleClick}>
          Login with google
        </Button>
        <pre>{token}</pre>
      </section>
    </Page>
  );
}

PKCE.Layout = Layout;
