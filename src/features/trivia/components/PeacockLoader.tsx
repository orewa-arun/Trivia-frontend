import peacockImg from "../../../assets/peacock-image.jpg"; // Make sure you place the SVG in this path

const PeacockLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <img
        src={peacockImg}
        alt="Peacock Mascot"
        className="w-28 h-28 animate-spin-slow"
      />
      <p className="mt-4 text-blue-600 font-medium text-lg">Loading...</p>
    </div>
  );
};

export default PeacockLoader;
