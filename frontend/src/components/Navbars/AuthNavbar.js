/* eslint-disable */
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full flex items-center justify-between px-2 py-3 bg-blueGray-200 shadow-md">
        <div className="container px-4 mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            className="text-blueGray-800 text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            to="/"
          >
            MediHealth
          </Link>

         
          <button
            className="text-blueGray-800 text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Menu principal */}
          <div
            className={`lg:flex flex-grow items-center ${
              navbarOpen ? "block" : "hidden"
            } lg:block`}
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <Link
                  className="text-blueGray-800 px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold hover:text-blueGray-600"
                  to="/"
                >
                  Accueil
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  className="text-blueGray-800 px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold hover:text-blueGray-600"
                  to="/connexion"
                >
                  Connexion
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  className="text-blueGray-800 px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold hover:text-blueGray-600"
                  to="/contact"
                >
                  Contactez-nous
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  className="text-blueGray-800 px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold hover:text-blueGray-600"
                  to="/about"
                >
                  À propos & CGU
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}