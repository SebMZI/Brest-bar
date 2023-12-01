import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./Components/Navbar";
import Map from "./Components/Map";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/maplibre-gl@%5E2.4/dist/maplibre-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div className="h-screen bg-white overflow-hidden">
        <Navbar />
        <main className="h-full flex flex-row ">
          <div className="basis-1/3"></div>
          <Map />
        </main>
      </div>
    </>
  );
}
