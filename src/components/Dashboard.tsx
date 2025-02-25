import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSignOutAlt, FaUser, FaClock } from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!data?.user) {
          navigate("/");
        } else {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                  <p className="text-gray-400">{user?.email}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition duration-200"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <FaClock className="text-blue-500 text-xl" />
                <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
              </div>
              <p className="text-gray-400">No recent activity to display.</p>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <FaUser className="text-blue-500 text-xl" />
                <h2 className="text-xl font-semibold text-white">Profile Overview</h2>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400">Email: {user?.email}</p>
                <p className="text-gray-400">Last Sign In: {new Date(user?.last_sign_in_at).toLocaleDateString()}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;