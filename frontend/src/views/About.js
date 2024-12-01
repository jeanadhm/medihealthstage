import React from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import Carousel from "./carrousel";

export default function About() {
  return (
    <>
      <Navbar transparent />
      <main>
        <Carousel />
        <section>
          <div className="bg-white py-10 flex justify-center">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-5xl font-bold mb-8 animate-bounce">À propos de Medihealth</h2>
              <p className="text-lg text-blueGray-500 leading-relaxed max-w-2xl mx-auto animate-fade-in">
                Medihealth est une plateforme de santé en ligne dédiée à faciliter l’accès aux consultations médicales et à améliorer l’interaction entre médecins et patients. Grâce à une interface moderne et intuitive, Medihealth permet à chacun d’obtenir des avis médicaux de qualité, où qu’il soit. Dans un monde où le temps et l'accessibilité aux soins peuvent poser des obstacles, Medihealth est conçu pour simplifier le parcours de soin en offrant un espace sécurisé et pratique pour des consultations à distance.
              </p>
              <p className="text-lg text-blueGray-500 leading-relaxed max-w-2xl mx-auto mt-8 animate-fade-in delay-200">
                L’accès aux soins de santé peut être compliqué, particulièrement dans des zones éloignées ou pour ceux qui ont des emplois du temps chargés. Medihealth s'engage à réduire ces barrières en permettant aux patients de consulter un professionnel de santé en toute simplicité. En utilisant les nouvelles technologies, nous avons créé une plateforme qui n'est pas seulement un service, mais un engagement envers le bien-être de tous.
              </p>
              <p className="text-lg text-blueGray-500 leading-relaxed max-w-2xl mx-auto mt-8 animate-fade-in delay-400">
                Chez Medihealth, nous croyons en la puissance d’une connexion directe et fluide entre le patient et le médecin. Notre plateforme propose une messagerie intégrée permettant aux patients de communiquer facilement avec leur médecin et de poser des questions en temps réel. Les consultations, elles aussi, se déroulent dans cet espace, garantissant une continuité et un suivi de qualité.
              </p>
              <p className="text-lg text-blueGray-500 leading-relaxed max-w-2xl mx-auto mt-8 animate-fade-in delay-600">
                Medihealth est plus qu’une plateforme ; c’est une mission. Nous souhaitons apporter des soins de santé abordables et de qualité pour tous, tout en créant un environnement digital où chaque patient est traité avec respect et attention. Nous développons continuellement de nouvelles fonctionnalités pour répondre aux besoins spécifiques de chaque utilisateur et rendre l’expérience de soin aussi fluide que possible.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
