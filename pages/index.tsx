import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./Components/Navbar";
import Map from "./Components/Map";
import Head from "next/head";
import BarTypeCard from "./Components/BarTypeCard";
import BarCard from "./Components/BarCard";
import { useState, useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });

interface Bar {
  name: string;
  location: {
    coordinates: [number, number];
  };
  status: string;
  address: string;

  // Add other properties if necessary
}

export default function Home() {
  const [data, setData] = useState<Bar[] | undefined>(undefined);
  const [barCoordinates, setBarCoordinates] = useState<[number, number]>([
    -4.486076, 48.390394,
  ]);
  const [zoom, setZoom] = useState<number>(9);

  const fetchMapData = async (): Promise<Bar[]> => {
    try {
      const response = await fetch("https://api.brest.bar/items/bars");
      const result = await response.json();

      const operationalBars = result?.data.filter(
        (bar: Bar) => bar.status === "OPERATIONAL"
      );

      return result.data;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchMapData();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/maplibre-gl@%5E2.4/dist/maplibre-gl.css"
          rel="stylesheet"
        />
        <title>Brest bar!</title>
      </Head>
      <div className="flex max-h-screen min-h-screen flex-col overflow-hidden">
        <Navbar />
        <main className=" flex flex-row   custom-scrollbar overflow-y-scroll">
          <section className="basis-1/3 bg-primary custom-scrollbar overflow-y-scroll  min-h-full z-30 relative">
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
            <div className="p-4 flex flex-col gap-6 w-full text-white">
              <div className="flex justify-between items-center  font-semibold">
                <h2 className="text-2xl ">Explorer</h2>
                <button className="bg-gradient-to-r from-gradient to-ascent px-4  py-2 rounded-lg">
                  Filtrer ✍
                </button>
              </div>
              <div className="flex flex-col gap-6 items-center">
                {data ? (
                  data.map((bar: Bar, index: number) => (
                    <BarCard
                      key={index}
                      data={bar}
                      setBarCoordinates={setBarCoordinates}
                      setZoom={setZoom}
                    />
                  ))
                ) : (
                  <p className="text-white">Pas de bar disponible...</p>
                )}

                <button className="p-4 bg-[#2c2c2c] w-20 rounded-lg ">
                  Plus...
                </button>
              </div>
            </div>
          </section>
          <Map data={data} location={barCoordinates} zoom={zoom} />
        </main>
      </div>
    </>
  );
}
