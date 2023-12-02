import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./Components/Navbar";
import Map from "./Components/Map";
import Head from "next/head";
import BarTypeCard from "./Components/BarTypeCard";
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
          <section className="basis-1/3 bg-primary">
            <div className="p-4">
              <h1 className=" text-4xl font-bold text-white">
                Trouver le bar qu'il vous faut{" "}
                <span className="bg-gradient-to-r from-gradient to-ascent bg-clip-text text-transparent ">
                  selon votre humeur
                </span>
              </h1>
            </div>
            <div className="w-full border border-[#3d3d3d]"></div>
            <div className="p-4 flex flex-col gap-4">
              <h2 className="text-white text-2xl font-semibold">
                Où boire à Brest ?
              </h2>
              <div className="flex items-center gap-8">
                <BarTypeCard type={"Cave"} icon={"🍷"} />
                <BarTypeCard type={"Brasserie"} icon={"🍺"} />
                <BarTypeCard type={"Bar"} icon={"🍹"} />
              </div>
            </div>
            <div className="w-full border border-[#3d3d3d]"></div>
            <div className="p-4">
              <div className="flex justify-between items-center text-white">
                <h2 className="text-2xl font-semibold">Explorer</h2>
                <button>Seb</button>
              </div>
            </div>
          </section>
          <Map />
        </main>
      </div>
    </>
  );
}
