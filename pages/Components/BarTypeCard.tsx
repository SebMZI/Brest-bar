const BarTypeCard = ({ type, icon }: { type: string; icon: string }) => {
  return (
    <button className="flex w-[30%] flex-col items-center gap-2 font-medium">
      <div className="flex items-center justify-center text-4xl aspect-square bg-[#2c2c2c] rounded-lg w-full">
        {icon}
      </div>
      <p className="text-white">{type}</p>
    </button>
  );
};

export default BarTypeCard;
