import DemandModal from "./DemandModal";
import { useState } from "react";

const Navbar = () => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <header
        className={
          "flex flex-row justify-between items-center h-20 bg-primary p-4 z-30 relative shadow-lg shadow-gray-300"
        }
      >
        <div>
          <p className="text-3xl  ">
            🍻{" "}
            <span className={"hover:text-ascent font-normal text-white "}>
              Brest{" "}
            </span>
            <span className="bg-gradient-to-r from-gradient to-ascent bg-clip-text text-transparent">
              bar
            </span>
          </p>
        </div>
        <button
          className={
            "px-4 py-2 bg-ascent  rounded-md text-sm font-bold text-white transition-transform hover:scale-105"
          }
          onClick={() => setShow(!show)}
        >
          🙋‍♀️ Faire une demande
        </button>
      </header>
      {show ? <DemandModal setShow={setShow} /> : null}
    </>
  );
};

export default Navbar;
