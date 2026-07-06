import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>banijay Hero Animation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <iframe
        src="/hero.html"
        aria-label="banijay Hero Animation"
        title="banijay Hero Animation"
      />
      <style jsx global>{`
        html,
        body,
        #__next {
          width: 100%;
          height: 100%;
          margin: 0;
          background: #050407;
          overflow: hidden;
        }

        iframe {
          display: block;
          width: 100vw;
          height: 100svh;
          border: 0;
          background: #050407;
        }
      `}</style>
    </>
  );
}
