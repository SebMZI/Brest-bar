const Navbar = () => {
  return (
    <header
      className={
        "flex flex-row justify-between items-center h-20 bg-primary p-4"
      }
    >
      <div>
        <h1 className="text-3xl  ">
          🍻{" "}
          <span className={"hover:text-ascent font-normal text-white "}>
            Brest{" "}
          </span>
          <span className="bg-gradient-to-r from-ascent to-gradient bg-clip-text text-transparent">
            bar
          </span>
        </h1>
      </div>
      <button
        className={
          "px-4 py-2 bg-ascent  rounded-md text-sm font-bold text-white transition-transform hover:scale-105"
        }
      >
        🙋‍♀️ Faire une demande
      </button>
    </header>
  );
};

export default Navbar;
