import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaIdCard,
  FaCalendarAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/firebase";
import Loader from "../components/Loader";

const UserDetail = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      setLoading(true);

      const docRef = doc(db, "users", id);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser({
          uid: docSnap.id,
          ...docSnap.data(),
        });
      } else {
        toast.error("User Not Found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  if (loading) {
    return (
      <Loader
        loading={true}
        text="Loading User..."
      />
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <h1 className="text-4xl font-bold text-red-400">
          User Not Found
        </h1>
      </div>
    );
  }

    return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Profile Card */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-10">

        {/* Avatar */}

        <div className="flex justify-center">

          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=06b6d4&color=ffffff&size=220`}
            alt={user.name}
            className="w-40 h-40 rounded-full border-4 border-white shadow-2xl"
          />

        </div>

        {/* Name */}

        <h1 className="text-4xl font-bold text-center text-white mt-6">
          {user.name}
        </h1>

        <p className="text-center text-gray-300 mt-2">
          Registered User
        </p>

        {/* Details */}

        <div className="mt-10 space-y-5">

          {/* Email */}

          <div className="flex items-center justify-between bg-white/10 rounded-2xl p-5 border border-white/20">

            <div className="flex items-center gap-3 text-cyan-300">

              <FaEnvelope size={20} />

              <span className="font-semibold text-lg">
                Email
              </span>

            </div>

            <span className="text-white break-all text-right">
              {user.email}
            </span>

          </div>

          {/* UID */}

          <div className="flex items-center justify-between bg-white/10 rounded-2xl p-5 border border-white/20">

            <div className="flex items-center gap-3 text-cyan-300">

              <FaIdCard size={20} />

              <span className="font-semibold text-lg">
                UID
              </span>

            </div>

            <span className="text-white text-sm break-all text-right">
              {user.uid}
            </span>

          </div>

          {/* Created Date */}

          {user.createdAt && (

            <div className="flex items-center justify-between bg-white/10 rounded-2xl p-5 border border-white/20">

              <div className="flex items-center gap-3 text-cyan-300">

                <FaCalendarAlt size={20} />

                <span className="font-semibold text-lg">
                  Created
                </span>

              </div>

              <span className="text-white">
                {user.createdAt.toDate().toLocaleDateString()}
              </span>

            </div>

          )}

        </div>

        {/* Back Button */}

        <Link
          to="/dashboard"
          className="mt-10 flex items-center justify-center gap-3 w-full bg-cyan-500 hover:bg-cyan-600 transition duration-300 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg"
        >
          <FaArrowLeft />

          Back to Dashboard

        </Link>

      </div>
    </div>
  );
};

export default UserDetail;