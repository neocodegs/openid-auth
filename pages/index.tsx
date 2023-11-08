import {signIn, signOut, useSession} from "next-auth/react";
import {Button, Layout, Page, Text, Code, Link} from "@vercel/examples-ui";
import Image from "next/image";
import {getKey} from "../lib/test-eth.js"
import iconMain from "../public/icons/icon.svg"
import iconEthSvg from "../public/icons/eth.svg"
import iconUSDC from "../public/icons/usdc.svg"
import iconEthPng from "../public/icons/eth.png"
import {useEffect, useState} from "react";

function getOperationKey(setOperationKey: Function) {
    let opkObj: object | null = null
    const lsKey = "operation-key"
    const opkData = localStorage.getItem(lsKey)

    if (!opkData) {
        opkObj = getKey()
        localStorage.setItem(lsKey, JSON.stringify(opkObj))
    } else {
        try {
            opkObj = JSON.parse(opkData || "")
        } catch (e) {
        }
    }

    setOperationKey(opkObj["privateKey"])
}


export default function Home() {

    const {data, status} = useSession();

    const [operationKey, setOperationKey] = useState("")

    useEffect(() => {
        getOperationKey(setOperationKey)
    }, [operationKey])

    return (
        <Page className="lg:max-w-5xl">
            <section className="flex justify-between">
                <section className="flex gap-3 items-center">
                    <Image src={iconMain} alt="home icon"/>
                    <p className="text-xl font-semibold"> Openid3 </p>
                </section>
                <button className="font-semibold text-gray-400">
                    Sign Out
                </button>
            </section>

            <section className="my-20">
                <section className="flex justify-between">
                    <p className="text-2xl font-semibold">Tokens</p>
                    <section className="flex items-center gap-1.5">
                        <Image width={25} src={iconEthPng} alt="Ethereum Goerli"/>
                        <p className="text-lg">Ethereum Goerli</p>
                    </section>
                </section>

                <hr className="border-t border-accents-2 my-4"/>

                <section className="flex items-center justify-between my-6">
                    <section className="flex items-center gap-3">
                        <Image width={35} src={iconEthSvg} alt="Ethereum"/>
                        <p> ETH </p>
                    </section>
                    <section className="flex flex-col items-end">
                        <p className="font-semibold">$0</p>
                        <p className="text-gray-500">ETH 0</p>
                    </section>
                </section>

                <section className="flex items-center justify-between my-6">
                    <section className="flex items-center gap-3">
                        <Image width={35} src={iconUSDC} alt="home icon"/>
                        <p> USDC </p>
                    </section>
                    <section className="flex flex-col items-end">
                        <p className="font-semibold">$0</p>
                        <p className="text-gray-500">USDC 0</p>
                    </section>
                </section>
            </section>

            <section className="my-10">
                <p className="text-2xl font-semibold">AA Acount</p>
                <hr className="border-t border-accents-2 my-4"/>

                <section className="flex items-center justify-between">
                    <section>
                        <section className="my-6">
                            <p className="text-lg font-semibold">Account Address</p>
                            <p className="font-light text-gray-500">0x0576a174D229E3cFA37253523E645A78A0C91B59</p>
                        </section>

                        <section className="my-10">
                            <p className="text-lg font-semibold">Local Operation Key</p>
                            <p className="font-light text-gray-500">{operationKey}</p>
                        </section>

                        <section className="my-10">
                            <p className="text-lg font-semibold">UserID (Your Google account hash)</p>
                            <p className="font-light text-gray-500">0x0576a174D229E3cFA37253523E645A78A0C91B59</p>
                        </section>
                    </section>

                    <section>
                        <Button variant="primary" className="bg-primary">
                            Reset
                        </Button>
                    </section>
                </section>
            </section>

            <section className="hidden">
                <section className="flex flex-row gap-6">
                    <Link href="pkce">PKCE Flow</Link>
                    <Link href="implicit">Implicit Flow</Link>
                </section>

                <hr className="border-t border-accents-2 my-6"/>

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
            </section>
        </Page>
    );
}

Home.Layout = Layout;
