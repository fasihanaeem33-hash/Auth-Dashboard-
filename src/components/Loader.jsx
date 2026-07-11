import { ClipLoader } from "react-spinners";

const Loader = ({ loading, text = "Please Wait..." }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 backdrop-blur-md">

      <div
        className="
        w-80
        rounded-3xl
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        shadow-2xl
        px-8
        py-10
        flex
        flex-col
        items-center
        "
      >

        {/* Spinner */}

        <ClipLoader
          color="#22d3ee"
          size={65}
          speedMultiplier={1}
        />

        {/* Title */}

        <h2 className="mt-8 text-2xl font-bold text-white">
          Please Wait...
        </h2>

        {/* Message */}

        <p className="mt-2 text-gray-300 text-center">
          {text}
        </p>

        {/* Loading Bar */}

        <div className="mt-8 w-full h-2 bg-white/20 rounded-full overflow-hidden">

          <div
            className="
            h-full
            w-1/2
            bg-cyan-400
            rounded-full
            animate-pulse
            "
          ></div>

        </div>

      </div>

    </div>
  );
};

export default Loader;