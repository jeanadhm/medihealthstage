/* eslint-disable */
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false); // État pour le sous-menu

  return (
    <>
      <nav className="fixed top-0 z-50 w-full flex items-center justify-between px-2 py-3 bg-blueGray-200">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link
              className="text-blueGray-500 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/"
            >
              MediHealth
            </Link>
            <button
              className="text-blueGray-500 text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <Link
                  className="text-blueGray-500 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  to="/"
                >
                  Accueil
                </Link>
              </li>

              {/* Connexion avec sous-menu */}
              <li className="flex items-center relative">
                <button
                  className="text-blueGray-500 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  onClick={() => setSubmenuOpen(!submenuOpen)} // Toggle du sous-menu
                >
                  Connexion
                </button>
                {submenuOpen && ( // Affichage conditionnel du sous-menu
                  <div className="absolute bg-white text-blueGray-500 shadow-lg rounded mt-2 w-48 z-10">
                    <ul className="flex flex-col">
                      <li>
                        <Link
                          className="px-4 py-2 block text-xs font-bold uppercase"
                          to="/Connexionpat"
                        >
                          Patient
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="px-4 py-2 block text-xs font-bold uppercase"
                          to="/Connexiondoc"
                        >
                          Docteur
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              <li className="flex items-center">
                <Link
                  className="text-blueGray-500 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  to="/contact"
                >
                  Contactez-nous
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  className="text-blueGray-500 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  to="/About"
                >
                  A propos & CGU
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
