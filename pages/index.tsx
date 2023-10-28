import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Layout, Page, Text, Code, Link } from "@vercel/examples-ui";

export default function Home() {
  const { data, status } = useSession();

  return (
    <Page>
      <section className="flex flex-row gap-6">
        <Link href="pkce">PKCE Flow</Link>
        <Link href="implicit">Implicit Flow</Link>
      </section>

      <hr className="border-t border-accents-2 my-6" />

      <section className="flex flex-col gap-3">
        {status === "authenticated" ? (
          <section className="flex flex-col gap-3">
            Welcome {data?.user?.name}!{" "}
            <Button onClick={() => signOut()}>Sign out</Button>
          </section>
        ) : status === "loading" ? (
          <section className="text-center">
            <Text>Loading...</Text>
          </section>
        ) : (
          <>
            <section className="m-auto w-fit">
              <Button size="lg" onClick={() => signIn("github")}>
                Sign in with GitHub
              </Button>
            </section>
            <section className="m-auto w-fit">
              <Button size="lg" onClick={() => signIn("google")}>
                Sign in with Google
              </Button>
            </section>
          </>
        )}
      </section>
    </Page>
  );
}

Home.Layout = Layout;
