import Head from "next/head";

interface Iseo {
    title: string;
}

export default function Seo({title} : Iseo) {
    return (
        <Head>
            <title>{title} | Next Page</title>
        </Head>
    );
}