import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaArrowRight } from "react-icons/fa";

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const initials = user.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="
      bg-white/10
      backdrop-blur-xl
      border
      border-white/20
      rounded-3xl
      shadow-2xl
      overflow-hidden
      hover:-translate-y-2
      hover:shadow-cyan-500/30
      transition-all
      duration-300
      "
    >
      {/* Avatar */}

      <div className="flex justify-center pt-8">

        <div
          className="
          w-28
          h-28
          rounded-full
          bg-linear-to-r
          from-cyan-500
          to-blue-600
          flex
          items-center
          justify-center
          text-white
          text-5xl
          font-bold
          border-4
          border-white/30
          shadow-lg
          "
        >
          {initials}
        </div>

      </div>

      {/* Details */}

      <div className="px-6 py-6 text-center">

        <h2 className="text-2xl font-bold text-white">
          {user.name}
        </h2>

        <p className="flex items-center justify-center gap-2 text-gray-300 mt-3">

          <FaEnvelope />

          {user.email}

        </p>

      </div>

      {/* Button */}

      <div className="px-6 pb-6">

        <button
          onClick={() =>
            navigate(`/user/${user.uid}`)
          }
          className="
          w-full
          py-3
          rounded-xl
          bg-linear-to-r
          from-cyan-500
          to-blue-600
          text-white
          font-semibold
          flex
          items-center
          justify-center
          gap-2
          hover:scale-105
          duration-300
          "
        >
          View Details

          <FaArrowRight />

        </button>

      </div>

    </div>
  );
};

export default UserCard;