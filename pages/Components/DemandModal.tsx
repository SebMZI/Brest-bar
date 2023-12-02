interface DemandModalProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const DemandModal: React.FC<DemandModalProps> = ({ setShow }) => {
  return (
    <div
      className="absolute top-0 z-20 left-0 h-screen w-screen bg-transparent flex items-center justify-center overflow-y-hidden"
      onClick={() => setShow(false)}
    >
      <div className="relative z-20 rounded-xl bg-primary p-4 text-white">
        <div className="flex items-center gap-6 justify-between">
          <p className="text-2xl">Demand</p>
          <button
            className="text-2xl text-ascent"
            onClick={() => setShow(false)}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemandModal;
