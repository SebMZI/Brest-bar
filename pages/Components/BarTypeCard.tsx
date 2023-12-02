import { useEffect, useState } from "react";

const BarTypeCard = ({ type, icon }: { type: string; icon: string }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleColorText = () => {
    setIsSelected(!isSelected);
  };

  useEffect(() => {
    const typebarText = document.querySelectorAll(".text-type");
    typebarText.forEach((text) => {
      text.classList.remove("text-ascent");
    });

    if (isSelected) {
      const currentTypebar = document.getElementById(type); // Assuming type is a unique identifier
      if (currentTypebar) {
        currentTypebar.classList.add("text-ascent");
      }
    }
  }, [isSelected]);

  return (
    <div
      className={`flex w-[30%] flex-col items-center gap-2 font-medium text-white cursor-pointer ${
        isSelected ? "text-ascent" : ""
      }`}
      onClick={handleColorText}
    >
      <div
        className="flex items-center justify-center text-4xl aspect-square bg-[#2c2c2c] rounded-lg w-full"
        onClick={handleColorText}
      >
        {icon}
      </div>
      <p
        className="text-type transition-colors"
        id={type}
        onClick={handleColorText}
      >
        {type}
      </p>
    </div>
  );
};

export default BarTypeCard;
