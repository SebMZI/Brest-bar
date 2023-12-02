import Image from "next/image";
import Link from "next/link";
import StarRatings from "react-star-ratings";
import globe from "@/pages/assets/website.svg";
import phone from "@/pages/assets/phone.svg";
interface BarModal {
  name: string;
  address: string;
  user_ratings_total: number;
  rating: string;
  website: string;
  opening_hours: string;
  formatted_phone_number: string;
  location: {
    coordinates: [number, number];
  };
}
interface StarRatingProps {
  value: number;
  onStarClick: (nextValue: number, prevValue: number, name: string) => void;
}

interface BarModalProps {
  data: BarModal[]; // Change to array type
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  barCoordinates: [number, number];
  show: boolean;
}

const BarModal: React.FC<BarModalProps> = ({
  data,
  setShow,
  barCoordinates,
  show,
}) => {
  const bar = data?.find(
    (it) =>
      it.location.coordinates[0] === barCoordinates[0] &&
      it.location.coordinates[1] === barCoordinates[1]
  );
  const openingHours: string[] | undefined =
    bar && Object.values(JSON.parse(bar.opening_hours));

  return (
    <article
      className={`bg-white fixed right-2 bottom-12 h-fit w-1/5 p-4 text-[#000000] rounded-lg transition-transform transform duration-300 ${
        show
          ? "translate-x-0 visible opacity-100"
          : "translate-x-[150%] invisible opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex justify-between items-center">
        <p>Informations sur le Bar</p>
        <span
          className="cursor-pointer text-ascent font-semibold"
          onClick={() => setShow(false)}
        >
          X
        </span>
      </div>
      {bar && (
        <div className="py-4">
          <h2 className="text-2xl font-semibold">{bar.name}</h2>
          <p className="font-thin">{bar.address}</p>
          <div className="flex flex-row items-center mt-2">
            <StarRatings
              name="starRating"
              numberOfStars={5}
              rating={parseFloat(bar.rating)}
              starDimension="25"
              starSpacing="0"
              starRatedColor="#BAA2CD"
            />
            <p className="ml-2">{`(${bar.user_ratings_total})`}</p>
          </div>
          <div className="flex flex-row justify-around my-6">
            <Link href={`${bar.website}`} target="_blank">
              <Image src={globe} alt="website icon" className="w-8 h-8" />
            </Link>
            <Link href={`tel:${bar.formatted_phone_number}`} target="_blank">
              <Image src={phone} alt="tel icon" className="w-8 h-8" />
            </Link>
          </div>
          <div>
            <h3 className="font-semibold">Heures d&apos;ouverture :</h3>
            {openingHours &&
              openingHours.map((hour: string, index: number) => (
                <p key={index} className="px-2">
                  {hour}
                </p>
              ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default BarModal;
