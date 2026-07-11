import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import {
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

import { auth } from "../firebase/firebase";

const Navbar = ({
  search,
  setSearch,
}) => {

  const navigate = useNavigate();

  const handleLogout = async () => {

    try {

      await signOut(auth);

      toast.success("Logout Successfully");

      navigate("/login");

    } catch (error) {

      toast.error(error.message);

    }

  };

    return (

    <nav className="
    fixed
    top-0
    left-0
    w-full
    z-50
    bg-black/40
    backdrop-blur-xl
    border-b
    border-white/10
    ">

      <div className="
      max-w-7xl
      mx-auto
      px-6
      h-20
      flex
      items-center
      justify-between
      ">

        {/* Logo */}

        <div
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer"
        >

          <h1 className="
          text-3xl
          font-bold
          text-cyan-400
          ">

            Auth Dashboard

          </h1>

        </div>

        {/* Right */}

        <div className="
        flex
        items-center
        gap-4
        ">

          <button
            onClick={() => navigate("/dashboard")}
            className="
            flex
            items-center
            gap-2
            bg-cyan-500
            hover:bg-cyan-600
            px-5
            py-2
            rounded-xl
            text-white
            duration-300
            "
          >

            <FaHome />

            Home

          </button>

          <button
            onClick={handleLogout}
            className="
            flex
            items-center
            gap-2
            bg-red-500
            hover:bg-red-600
            px-5
            py-2
            rounded-xl
            text-white
            duration-300
            "
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </div>

    </nav>

  );

};

export default Navbar;