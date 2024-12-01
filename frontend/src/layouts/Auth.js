import React from "react";
import { Routes, Route, Navigate  } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Logindoctor from "views/auth/Logindoctor.js";
import Loginpatient from "views/auth/Loginpatient.js";
import Register from "views/auth/Register.js";

export default function Auth() {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png").default + ")",
            }}
          ></div>
          <Routes>
            <Route path="/auth/logindoc" exact component={Logindoctor} />
            <Route path="/auth/loginpat" exact component={Loginpatient} />
            <Route path="/auth/register" exact component={Register} />
            <Navigate  from="/auth" to="/auth/login" />
          </Routes>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
