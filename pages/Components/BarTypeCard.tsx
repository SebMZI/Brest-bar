import { useEffect, useState } from "react";

// ... (other imports)

const BarTypeCard = ({ type, icon }: { type: string; icon: string }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleColorText = (
    event: React.MouseEvent<HTMLDivElement | HTMLParagraphElement>
  ) => {
    setIsSelected(!isSelected);

    event.stopPropagation();
  };

  useEffect(() => {
    const typebarText = document.querySelectorAll(".text-type");
    typebarText.forEach((text) => {
      text.classList.remove("text-ascent");
    });

    if (isSelected) {
      const currentTypebar = document.getElementById(type);
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
      <div className="flex items-center justify-center text-4xl aspect-square bg-[#2c2c2c] rounded-lg w-full">
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
