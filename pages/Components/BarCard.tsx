import { useEffect, useState } from "react";
import BarModal from "./BarModal";

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

interface Coordinates {
  latitude: number;
  longitude: number;
}
const BarCard = ({
  data,
  setBarCoordinates,
  setZoom,
  setShow,
}: {
  data: Bar;
  setBarCoordinates: any;
  setZoom: any;
  setShow: any;
}) => {
  const [km, setKm] = useState<number | null>(null);
  const [loc, setLoc] = useState<boolean>(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  function showPosition(position: GeolocationPosition) {
    const { latitude, longitude } = position.coords;
    const R = 6371; // Rayon moyen de la Terre en kilomètres
    const dLat = (data.location.coordinates[1] - latitude) * (Math.PI / 180);
    const dLon = (data.location.coordinates[0] - longitude) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(latitude * (Math.PI / 180)) *
        Math.cos(data.location.coordinates[1] * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance en kilomètres
    return setKm(parseFloat(distance.toFixed(2)));
  }

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <article className="p-6 text-white flex flex-col bg-[#2c2c2c] rounded-lg gap-2 w-full">
      <div className="flex justify-between items-center">
        <div className="w-4/5 flex flex-col">
          <p className="font-bold text-ascent uppercase">Bar</p>
          <h3 className="text-2xl font-semibold">{data?.name}</h3>

          <p className="text-ascent truncate">
            <span className="font-bold uppercase">
              {km ? `🏃‍♂️ A ${km} km - ` : null}
            </span>
            {data?.address}
          </p>
        </div>
        <button
          className="aspect-square rounded-full bg-ascent p-4"
          onClick={() => {
            setShow(true);
            setZoom(15);
            setBarCoordinates([
              data.location.coordinates[0],
              data.location.coordinates[1],
            ]);
          }}
        >
          👁
        </button>
      </div>
      <div></div>
    </article>
  );
};

export default BarCard;
