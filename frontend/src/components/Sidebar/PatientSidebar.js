import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./style.css";

export default function PatientSidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const [openSubMenu, setOpenSubMenu] = useState("");
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    // Récupérer les données de l'utilisateur connecté depuis le localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? "" : menu);
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const handleLogout = () => {
    // Supprimer les jetons et les données de l'utilisateur du localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <>
      <nav
        className={`md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl ${
          theme === "dark"
            ? "bg-blueGray-800 text-white"
            : "bg-white text-gray-800"
        } flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6`}
      >
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggle button for mobile */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Brand */}
          <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            MediHealth Patient
          </h6>

          {/* Theme Toggle */}
          <button
            onClick={() => changeTheme(theme === "dark" ? "light" : "dark")}
            className="mb-4 text-xs uppercase py-2 px-3 font-bold rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {theme === "dark" ? "Mode Clair" : "Mode Sombre"}
          </button>

          {/* Sidebar content */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* User Profile */}
            {user && (
              <div className="mb-4 px-3 py-2 bg-gray-200 rounded-lg">
                <h6 className="text-gray-700 font-bold">{user.name}</h6>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            )}

            {/* Settings and Profile */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none mb-4">
              <li className="items-center">
                <Link
                  to="/patient/profile"
                  className="text-xs uppercase py-3 font-bold block"
                >
                  <i className="fas fa-user-cog mr-2 text-sm"></i> Profile
                </Link>
              </li>
              
            </ul>

            <hr className="my-4 md:min-w-full" />

            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {/* Hospitals */}
              <li className="items-center relative menu-item">
                <Link
                  to="/patient/hospitals"
                  className="text-xs uppercase py-3 font-bold block"
                >
                  <i className="fas fa-hospital mr-2 text-sm"></i> Hopitaux
                </Link>
              </li>
{/* Appointments */}
              <li className="items-center relative menu-item">
                <a
                  className="text-xs uppercase py-3 font-bold block cursor-pointer"
                  onClick={() => toggleSubMenu("appointments")}
                >
                  <i className="fas fa-calendar-alt mr-2 text-sm"></i> Rendez-vous
                </a>
                {openSubMenu === "appointments" && (
                  <motion.ul
                    className="ml-4"
                    initial={{ maxHeight: 0 }}
                    animate={{ maxHeight: 100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <li>
                      <Link
                        className="sub-menu-item text-xs uppercase py-2 block"
                        to="/patient/myrdvs"
                      >
                        <i className="fas fa-eye mr-2 text-sm"></i> Voir les rendez-vous
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="sub-menu-item text-xs uppercase py-2 block"
                        to="/patient/rdv/"
                      >
                        <i className="fas fa-plus mr-2 text-sm"></i> Ajouter rendez-vous
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </li>

              {/* Consultations */}
              <li className="items-center relative menu-item">
                <a
                  className="text-xs uppercase py-3 font-bold block cursor-pointer"
                  onClick={() => toggleSubMenu("consultations")}
                >
                  <i className="fas fa-envelope mr-2 text-sm"></i> Consultations
                </a>
                {openSubMenu === "consultations" && (
                  <motion.ul
                    className="ml-4"
                    initial={{ maxHeight: 0 }}
                    animate={{ maxHeight: 100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <li>
                      <Link
                        className="sub-menu-item text-xs uppercase py-2 block"
                        to="/patient/myconsultations"
                      >
                        <i className="fas fa-eye mr-2 text-sm"></i> Voir
                        consultations
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </li>

              {/* Results */}
              <li className="items-center relative menu-item">
                <a
                  className="text-xs uppercase py-3 font-bold block cursor-pointer"
                  onClick={() => toggleSubMenu("results")}
                >
                  <i className="fas fa-file-medical-alt mr-2 text-sm"></i>
                  Résultats
                </a>
                {openSubMenu === "results" && (
                  <motion.ul
                    className="ml-4"
                    initial={{ maxHeight: 0 }}
                    animate={{ maxHeight: 100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <li>
                      <Link
                        className="sub-menu-item text-xs uppercase py-2 block"
                        to="/patient/myresults"
                      >
                        <i className="fas fa-eye mr-2 text-sm"></i> Voir
                        résultats
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </li>
            </ul>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-xs uppercase py-3 font-bold block mt-4 text-red-600"
            >
              <i className="fas fa-sign-out-alt mr-2 text-sm"></i> Déconnexion
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
