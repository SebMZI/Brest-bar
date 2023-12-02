import Image from "next/image";
import Link from "next/link";
import StarRating from "react-star-rating-component";
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
}

const BarModal: React.FC<BarModalProps> = ({
  data,
  setShow,
  barCoordinates,
}) => {
  const bar = data.find(
    (it) =>
      it.location.coordinates[0] === barCoordinates[0] &&
      it.location.coordinates[1] === barCoordinates[1]
  );
  const openingHours = bar && Object.values(JSON.parse(bar.opening_hours));
  console.log(bar, openingHours);
  return (
    <article className="bg-white absolute right-2 bottom-12 h-fit w-1/5 p-4 text-[#000000] rounded-lg">
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
          <div className="text-2xl">
            <StarRating
              name="starRating"
              starCount={5}
              value={parseFloat(bar.rating)}
            />
            <p>{}</p>
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
            <h3 className="font-semibold">Heures d'ouverture :</h3>
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
