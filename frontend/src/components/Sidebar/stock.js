import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./style.css";

export default function DoctorSidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const [openSubMenu, setOpenSubMenu] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? "" : menu);
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <>
      <nav
        className={`md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl ${
          theme === "dark" ? "bg-blueGray-800 text-white" : "bg-white text-gray-800"
        } flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6`}
      >
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>

          <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            MediHealth Doctor
          </h6>

          <button onClick={() => changeTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>

          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            <hr className="my-4 md:min-w-full" />

            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {/* Patients */}
              <li className="items-center relative menu-item">
                <a className="text-xs uppercase py-3 font-bold block cursor-pointer" onClick={() => toggleSubMenu("patients")}>
                  <i className="fas fa-user-injured mr-2 text-sm"></i> Patients
                  <span className="notification-badge">3</span>
                </a>
                {openSubMenu === "patients" && (
                  <motion.ul className="ml-4" initial={{ maxHeight: 0 }} animate={{ maxHeight: 100 }} transition={{ duration: 0.3 }}>
                    <li>
                      <Link className="sub-menu-item text-xs uppercase py-2 block" to="/doctor/patients/">
                        <i className="fas fa-eye mr-2 text-sm"></i> Voir patients
                      </Link>
                    </li>
                    <li>
                      <Link className="sub-menu-item text-xs uppercase py-2 block" to="/doctor/patients/add">
                        <i className="fas fa-user-plus mr-2 text-sm"></i> Ajouter patient
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </li>

              {/* Appointments */}
              <li className="items-center relative menu-item">
                <a className="text-xs uppercase py-3 font-bold block cursor-pointer" onClick={() => toggleSubMenu("appointments")}>
                  <i className="fas fa-calendar-alt mr-2 text-sm"></i> Appointments
                </a>
                {openSubMenu === "appointments" && (
                  <motion.ul className="ml-4" initial={{ maxHeight: 0 }} animate={{ maxHeight: 100 }} transition={{ duration: 0.3 }}>
                    <li>
                      <Link className="sub-menu-item text-xs uppercase py-2 block" to="/doctor/appointments/view">
                        <i className="fas fa-eye mr-2 text-sm"></i> Voir appointments
                      </Link>
                    </li>
                    <li>
                      <Link className="sub-menu-item text-xs uppercase py-2 block" to="/doctor/appointments/add">
                        <i className="fas fa-plus mr-2 text-sm"></i> Ajouter appointment
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </li>

              {/* Prescriptions */}
              <li className="items-center relative menu-item">
                <a className="text-xs uppercase py-3 font-bold block cursor-pointer" onClick={() => toggleSubMenu("prescriptions")}>
                  <i className="fas fa-prescription mr-2 text-sm"></i> Prescriptions
                </a>
                {openSubMenu === "prescriptions" && (
                  <motion.ul className="ml-4" initial={{ maxHeight: 0 }} animate={{ maxHeight: 100 }} transition={{ duration: 0.3 }}>
                    <li>
                      <Link className="sub-menu-item text-xs uppercase py-2 block" to="/doctor/prescriptions/view">
                        <i className="fas fa-eye mr-2 text-sm"></i> Voir prescriptions
                      </Link>
                    </li>
                    <li>
                      <Link className="sub-menu-item text-xs uppercase py-2 block" to="/doctor/prescriptions/add">
                        <i className="fas fa-plus mr-2 text-sm"></i> Ajouter prescription
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </li>

              {/* Messages */}
              <li className="items-center relative menu-item">
                <a className="text-xs uppercase py-3 font-bold block cursor-pointer" onClick={() => toggleSubMenu("messages")}>
                  <i className="fas fa-envelope mr-2 text-sm"></i> Messages
                </a>
                {openSubMenu === "messages" && (
                  <motion.ul className="ml-4" initial={{ maxHeight: 0 }} animate={{ maxHeight: 100 }} transition={{ duration: 0.3 }}>
                    <li>
                      <Link className="sub-menu-item text-xs uppercase py-2 block" to="/doctor/messages/view">
                        <i className="fas fa-eye mr-2 text-sm"></i> Voir messages
                      </Link>
                    </li>
                    <li>
                      <Link className="sub-menu-item text-xs uppercase py-2 block" to="/doctor/messages/send">
                        <i className="fas fa-paper-plane mr-2 text-sm"></i> Envoyer message
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </li>

              {/* Settings */}
              <li className="items-center relative menu-item">
                <a className="text-xs uppercase py-3 font-bold block cursor-pointer" onClick={() => toggleSubMenu("settings")}>
                  <i className="fas fa-cog mr-2 text-sm"></i> Settings
                </a>
                {openSubMenu === "settings" && (
                  <motion.ul className="ml-4" initial={{ maxHeight: 0 }} animate={{ maxHeight: 100 }} transition={{ duration: 0.3 }}>
                    <li>
                      <Link className="sub-menu-item text-xs uppercase py-2 block" to="/doctor/settings/profile">
                        <i className="fas fa-user-cog mr-2 text-sm"></i> Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="sub-menu-item text-xs uppercase py-2 block" to="/doctor/settings/account">
                        <i className="fas fa-lock mr-2 text-sm"></i> Account
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}











import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./style.css";

export default function DoctorSidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const [openSubMenu, setOpenSubMenu] = useState(""); // State to track open submenu
  const [theme, setTheme] = useState("light"); // State to track theme

  useEffect(() => {
    document.documentElement.className = theme; // Apply the theme class to the document
  }, [theme]);

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? "" : menu);
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <>
      <nav className={`md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl ${theme === "dark" ? "bg-blueGray-800 text-white" : "bg-white text-gray-800"} flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6`}>
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Brand */}
          <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            MediHealth Doctor
          </h6>

          <button onClick={() => changeTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>

          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Dashboard cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-secondary text-lg font-semibold">Patients</h3>
                <p className="text-primary text-2xl"></p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-secondary text-lg font-semibold">Rendez-vous</h3>
                <p className="text-primary text-2xl"></p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-secondary text-lg font-semibold">Consultations</h3>
                <p className="text-primary text-2xl"></p>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />

            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {/* Patients */}
              <li className="items-center relative">
                <a
                  className={
                    "text-xs uppercase py-3 font-bold block cursor-pointer " +
                    (window.location.href.indexOf("/doctor/patients") !== -1
                      ? "text-primary hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  onClick={() => toggleSubMenu("patients")}
                >
                  <i
                    className={
                      "fas fa-user-injured mr-2 text-sm " +
                      (window.location.href.indexOf("/doctor/patients") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Patients
                  <span className="notification-badge">3</span>
                </a>
                {openSubMenu === "patients" && (
                  <motion.ul
                    className="ml-4"
                    initial={{ maxHeight: 0 }}
                    animate={{ maxHeight: 100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <li>
                      <Link
                        className={
                          "text-xs uppercase py-2 block " +
                          (window.location.href.indexOf("/doctor/patients/view") !== -1
                            ? "text-primary hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500")
                        }
                        to="/doctor/patients/"
                      >
                        <i className="fas fa-eye mr-2 text-sm"></i> Voir patients
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </li>

              {/* Rendez-vous */}
              <li className="items-center relative">
                <a
                  className={
                    "text-xs uppercase py-3 font-bold block cursor-pointer " +
                    (window.location.href.indexOf("/doctor/rdv") !== -1
                      ? "text-primary hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  onClick={() => toggleSubMenu("rdv")}
                >
                  <i
                    className={
                      "fas fa-calendar-alt mr-2 text-sm " +
                      (window.location.href.indexOf("/doctor/rdv") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Rendez-vous
                  <span className="notification-badge">5</span>
                </a>
                {openSubMenu === "rdv" && (
                  <motion.ul
                    className="ml-4"
                    initial={{ maxHeight: 0 }}
                    animate={{ maxHeight: 100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <li>
                      <Link
                        className={
                          "text-xs uppercase py-2 block " +
                          (window.location.href.indexOf("/doctor/rdv/view") !== -1
                            ? "text-primary hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500")
                        }
                        to="/doctor/rdv/view"
                      >
                        <i className="fas fa-eye mr-2 text-sm"></i> Voir rdv
                      </Link>
                    </li>

                    <li>
                      <Link
                        className={
                          "text-xs uppercase py-2 block " +
                          (window.location.href.indexOf("/doctor/rdv/") !== -1
                            ? "text-primary hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500")
                        }
                        to="/doctor/rdv/"
                      >
                        <i className="fas fa-plus mr-2 text-sm"></i> Nouveau rdv
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </li>

              {/* Analyses */}
              <li className="items-center">
                <a
                  className={
                    "text-xs uppercase py-3 font-bold block cursor-pointer " +
                    (window.location.href.indexOf("/doctor/analyses") !== -1
                      ? "text-primary hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  onClick={() => toggleSubMenu("analyses")}
                >
                  <i
                    className={
                      "fas fa-vials mr-2 text-sm " +
                      (window.location.href.indexOf("/doctor/analyses") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Analyses
                </a>
                {openSubMenu === "analyses" && (
                  <motion.ul
                    className="ml-4"
                    initial={{ maxHeight: 0 }}
                    animate={{ maxHeight: 100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <li>
                      <Link
                        className={
                          "text-xs uppercase py-2 block " +
                          (window.location.href.indexOf("/doctor/analyses/all") !== -1
                            ? "text-primary hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500")
                        }
                        to="/doctor/analyses/all"
                      >
                        <i className="fas fa-list-alt mr-2 text-sm"></i> Voir analyses
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </li>
              {/* Consultations */}
              <li className="items-center">
                <a
                  className={
                    "text-xs uppercase py-3 font-bold block cursor-pointer " +
                    (window.location.href.indexOf("/doctor/consultations") !== -1
                      ? "text-primary hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  onClick={() => toggleSubMenu("consultations")}
                >
                  <i
                    className={
                      "fas fa-vials mr-2 text-sm " +
                      (window.location.href.indexOf("/doctor/analyses") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Consultations
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
                        className={
                          "text-xs uppercase py-2 block " +
                          (window.location.href.indexOf("/doctor/consultations") !== -1
                            ? "text-primary hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500")
                        }
                        to="/doctor/consultations"
                      >
                        <i className="fas fa-list-alt mr-2 text-sm"></i> Consultations
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
