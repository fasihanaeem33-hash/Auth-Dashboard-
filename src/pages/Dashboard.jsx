import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { collection, getDocs } from "firebase/firestore";

import {
  FaUsers,
  FaUserCheck,
  FaCalendarAlt,
  FaSearch,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import CountUp from "react-countup";

import { db } from "../firebase/firebase";

import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";

const Dashboard = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getUsers = async () => {

    try {

      setLoading(true);

      const querySnapshot = await getDocs(
        collection(db, "users")
      );

      const usersData = querySnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));

      setUsers(usersData);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load users");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    getUsers();

  }, []);

  const filteredUsers = users.filter((user) =>

    user.name?.toLowerCase().includes(search.toLowerCase()) ||

    user.email?.toLowerCase().includes(search.toLowerCase())

  );

  const totalUsers = filteredUsers.length;

  const activeUsers = filteredUsers.length;

  const newUsers = filteredUsers.filter(
    (user) => user.createdAt
  ).length;

  const today = new Date().toLocaleDateString();

  const chartData = [

    {
      name: "Users",
      value: totalUsers,
    },

    {
      name: "Active",
      value: activeUsers,
    },

    {
      name: "New",
      value: newUsers,
    },

  ];

  const COLORS = [
    "#06b6d4",
    "#22c55e",
    "#ec4899",
  ];

  return (

    <>

      <Loader
        loading={loading}
        text="Loading Dashboard..."
      />

      <Navbar />

      <main
        className="relative min-h-screen bg-cover bg-center bg-fixed pt-28 pb-16"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80')",
        }}
      >

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}

        <div className="relative z-10 max-w-7xl mx-auto px-6">

                  {/* Welcome Section */}

          <section className="mb-14">

            <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl px-10 py-12 text-center">

              <h1 className="text-5xl font-bold text-white mb-4">
                Welcome Back 👋
              </h1>

              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Manage all registered users from one beautiful dashboard.
              </p>

            </div>

          </section>

          {/* Search */}

          <section className="mb-14 flex justify-center">

            <div className="relative w-full max-w-3xl">

              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 text-xl" />

              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                w-full
                rounded-2xl
                border
                border-white/20
                bg-white/10
                backdrop-blur-xl
                py-4
                pl-14
                pr-5
                text-white
                placeholder:text-gray-300
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-400
                "
              />

            </div>

          </section>

          {/* Statistics Cards */}

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">

            {/* Total Users */}

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-center hover:-translate-y-2 hover:shadow-cyan-500/20 duration-300">

              <FaUsers className="mx-auto text-cyan-400 text-5xl mb-5" />

              <p className="text-gray-300 text-lg">
                Total Users
              </p>

              <h2 className="text-5xl font-bold text-white mt-4">
                  {totalUsers}
              </h2>

            

            </div>

            {/* Active Users */}

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-center hover:-translate-y-2 hover:shadow-green-500/20 duration-300">

              <FaUserCheck className="mx-auto text-green-400 text-5xl mb-5" />

              <p className="text-gray-300 text-lg">
                Active Users
              </p>

              <h2 className="text-5xl font-bold text-white mt-4">

                {activeUsers}
                  

              </h2>

            </div>

            {/* New Users */}

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-center hover:-translate-y-2 hover:shadow-pink-500/20 duration-300">

              <FaUsers className="mx-auto text-pink-400 text-5xl mb-5" />

              <p className="text-gray-300 text-lg">
                New Users
              </p>

              <h2 className="text-5xl font-bold text-white mt-4">

                {newUsers}

              </h2>

            </div>

            {/* Today */}

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-center hover:-translate-y-2 hover:shadow-yellow-500/20 duration-300">

              <FaCalendarAlt className="mx-auto text-yellow-400 text-5xl mb-5" />

              <p className="text-gray-300 text-lg">
                Today
              </p>

              <h2 className="text-2xl font-bold text-white mt-4">
                {today}
              </h2>

            </div>

          </section>

          {/* Charts */} {/*

          <section className="grid lg:grid-cols-2 gap-10 mb-16">

            {/* Bar Chart */} {/*

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                Users Analytics
              </h2>

              <ResponsiveContainer width="100%" height={320}>

                <BarChart data={chartData}>

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#06b6d4"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

            {/* Pie Chart */} {/*

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                Users Distribution
              </h2>

              <ResponsiveContainer width="100%" height={320}>

                <PieChart>

                  <Pie
                    data={chartData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label
                  >

                    {chartData.map((item, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />

                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </section> */}

                    {/* Recent Users */}

          <section className="mb-16">

            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Recent Users
            </h2>

            <div className="overflow-x-auto rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">

              <table className="w-full text-white">

                <thead className="bg-white/10">

                  <tr>

                    <th className="px-6 py-5 text-left">
                      Name
                    </th>

                    <th className="px-6 py-5 text-left">
                      Email
                    </th>

                    <th className="px-6 py-5 text-center">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredUsers.slice(0, 5).map((user) => (

                    <tr
                      key={user.uid}
                      className="border-t border-white/10 hover:bg-white/10 duration-300"
                    >

                      <td className="px-6 py-5">
                        {user.name}
                      </td>

                      <td className="px-6 py-5">
                        {user.email}
                      </td>

                      <td className="px-6 py-5 text-center">

                        <span className="bg-green-500 px-4 py-1 rounded-full text-sm font-medium">
                          Active
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>

          {/* Users Heading */}

          <section className="text-center mb-10">

            <h2 className="text-4xl font-bold text-white">
              All Registered Users
            </h2>

            <p className="text-gray-300 mt-3 text-lg">
              Total Results: {filteredUsers.length}
            </p>

          </section>

          {/* User Cards */}

          {filteredUsers.length === 0 ? (

            <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl py-20 px-8 text-center">

              <h2 className="text-5xl mb-5">
                😕
              </h2>

              <h2 className="text-3xl font-bold text-white">
                No Users Found
              </h2>

              <p className="text-gray-300 mt-4">
                Please try another search keyword.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredUsers.map((user) => (

                <UserCard
                  key={user.uid}
                  user={user}
                />

              ))}

            </div>

          )}

          {/* Footer */}

          <footer className="mt-20 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-center py-8">

            <h2 className="text-2xl font-bold text-white">
              Auth Dashboard
            </h2>

            <p className="text-gray-300 mt-3">
              Manage your users with ease.
            </p>

            <p className="text-gray-400 mt-2">
              © 2026 Developed by Fasiha Naeem
            </p>

          </footer>

        </div>

      </main>

    </>

  );

};

export default Dashboard;