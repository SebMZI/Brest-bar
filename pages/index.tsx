import { Inter } from "next/font/google";
import Navbar from "./Components/Navbar";
import Map from "./Components/Map";
import Head from "next/head";
import BarTypeCard from "./Components/BarTypeCard";
import BarCard from "./Components/BarCard";
import { useState, useEffect } from "react";
import BarModal from "./Components/BarModal";
const inter = Inter({ subsets: ["latin"] });

interface Bar {
  location: {
    coordinates: [number, number];
  };
  status: string;
  name: string;
  address: string;
  user_ratings_total: number;
  rating: string;
  website: string;
  opening_hours: string;
  formatted_phone_number: string;
}

export default function Home() {
  const [data, setData] = useState<Bar[]>();
  const [barCoordinates, setBarCoordinates] = useState<[number, number]>([
    -4.486076, 48.390394,
  ]);
  const [zoom, setZoom] = useState<number>(9);
  const [slice, setSlice] = useState<number>(8);
  const [show, setShow] = useState<boolean>(false);
  const [nbStars, setNbStars] = useState<string>("1");

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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNbStars(e.target.value);
    setSlice(8);
  };

  const arrayFiltered =
    data && data.filter((it) => parseInt(it.rating) > parseInt(nbStars));

  const arrayToShow = arrayFiltered && arrayFiltered.slice(0, slice);

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
                Trouver le bar qu&apos;il vous faut{" "}
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
                <div>
                  <select
                    name="rating"
                    id="rating"
                    className="mr-6 px-4 py-2 rounded-lg text-[#000000]"
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="1">1+ &#9733;</option>
                    <option value="2">2+ &#9733;&#9733;</option>
                    <option value="3">3+ &#9733;&#9733;&#9733;</option>
                    <option value="4">4+ &#9733;&#9733;&#9733;&#9733;</option>
                    <option value="5">
                      5+ &#9733;&#9733;&#9733;&#9733;&#9733;
                    </option>
                  </select>
                  <button className="bg-gradient-to-r from-gradient to-ascent px-4  py-2 rounded-lg">
                    Filtrer ✍
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-6 items-center h-full">
                {arrayToShow && arrayToShow.length > 0 ? (
                  arrayToShow.map((bar: Bar, index: number) => (
                    <BarCard
                      key={index}
                      data={bar}
                      setBarCoordinates={setBarCoordinates}
                      setZoom={setZoom}
                      setShow={setShow}
                    />
                  ))
                ) : (
                  <p className="text-white">Pas de bar disponible...</p>
                )}
                {arrayFiltered && slice >= arrayFiltered.length - 1 ? null : (
                  <button
                    className="p-4 bg-[#2c2c2c] w-20 rounded-lg transition-colors hover:bg-ascent"
                    onClick={() => setSlice(slice + 8)}
                  >
                    Plus
                  </button>
                )}
              </div>
            </div>
          </section>
          <Map data={data} location={barCoordinates} zoom={zoom} />
          {data && (
            <BarModal
              data={data}
              setShow={setShow}
              show={show}
              barCoordinates={barCoordinates}
            />
          )}
        </main>
      </div>
    </>
  );
}
