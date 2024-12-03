import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUsers, faHandsHelping, faShieldAlt, faGlobe, faBrain } from '@fortawesome/free-solid-svg-icons';

import AOS from "aos";
import "aos/dist/aos.css";

// components
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import Carousel from "./carrousel";

export default function Landing() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <Navbar transparent />
      <main>
        <Carousel />
        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center" data-aos="fade-up">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <h6 className="text-xl font-semibold" data-aos="zoom-in">
                      Soutien Médical Personnalisé
                    </h6>
                    <p className="mt-2 mb-4 text-blueGray-500" data-aos="fade-in">
                      Offrez un soutien médical personnalisé à vos patients en utilisant MediHealth. Notre plateforme facilite les interactions entre les médecins et leurs patients, garantissant ainsi un suivi médical adapté et attentionné.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center" data-aos="fade-up">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <h6 className="text-xl font-semibold" data-aos="zoom-in">
                      Collaboration Médicale
                    </h6>
                    <p className="mt-2 mb-4 text-blueGray-500" data-aos="fade-in">
                      MediHealth favorise la collaboration entre les professionnels de la santé. Avec notre plateforme, les médecins peuvent partager des informations et des avis médicaux, ce qui améliore la qualité des soins et des diagnostics.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center" data-aos="fade-up">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <h6 className="text-xl font-semibold" data-aos="zoom-in">
                      Accessibilité aux Soins Médicaux
                    </h6>
                    <p className="mt-2 mb-4 text-blueGray-500" data-aos="fade-in">
                      Avec MediHealth, offrez des soins médicaux accessibles à tous. Notre plateforme propose des consultations en ligne et simplifie la prise de rendez-vous, ce qui permet aux patients d'obtenir rapidement l'assistance médicale dont ils ont besoin.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white py-5 flex justify-center" data-aos="fade-up">
              <div className="container mx-auto px-1 md:px-4" style={{ height: "200px", width: "400px" }}>
                <div className="text-center">
                  <h2 className="text-xl font-semibold" data-aos="zoom-in">
                    Améliorez la santé de vos patients avec MediHealth.
                  </h2>
                  <p className="text-lg text-blueGray-500" data-aos="fade-in">
                    Simplifiez la gestion médicale et offrez des soins de qualité grâce à notre plateforme intuitive.
                  </p>
                  <div className="mt-8">
                    <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full border border-black mr-4">
                      Commencer
                    </button>
                    <button className="bg-white hover:bg-gray-200 text-blueGray-500 font-bold py-2 px-4 rounded-full border border-black">
                      À propos
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto" data-aos="fade-right">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <FontAwesomeIcon icon={faUsers} className="text-xl" />
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Prise en charge Médicale de Qualité
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Offrez à vos patients des soins médicaux de qualité supérieure grâce à MediHealth. Notre plateforme met l'accent sur l'individualisation des traitements et l'écoute attentive des besoins médicaux spécifiques de chaque patient.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  Avec MediHealth, vous pouvez améliorer l'accès aux soins médicaux et garantir une meilleure qualité de vie pour vos patients.
                </p>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto" data-aos="fade-left">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                  <img
                    alt="..."
                    src={require('../assets/img/img2.jpg')}
                    className="w-full align-middle rounded-t-lg"
                    data-aos="zoom-in"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nouvelle section : Accessibilité Globale */}
        <section className="py-20 bg-blueGray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center">
              <div className="w-full md:w-5/12 ml-auto px-4" data-aos="fade-right">
                <img
                  src={require('../assets/img/acces.avif')}
                  alt="Accessibilité Globale"
                  className="max-w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full md:w-5/12 px-4 text-center md:text-left" data-aos="fade-left">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                  <FontAwesomeIcon icon={faGlobe} className="text-lightBlue-800 text-2xl" />
                </div>
                <h3 className="text-3xl font-semibold mb-4">
                  Accessibilité Globale
                </h3>
                <p className="text-lg leading-relaxed">
                  Où que vous soyez, MediHealth vous accompagne. Avec une compatibilité multi-appareils et une disponibilité 24/7, la plateforme assure une couverture mondiale pour les soins et la gestion médicale.
                </p>
                <p className="text-lg leading-relaxed">
                  Accédez aux services de santé essentiels, quel que soit votre emplacement ou votre horaire.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nouvelle section : Sécurité et confidentialité */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center">
              <div className="w-full md:w-5/12 ml-auto px-4 text-center" data-aos="fade-right">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-500">
                  <FontAwesomeIcon icon={faShieldAlt} className="text-white text-2xl" />
                </div>
                <h3 className="text-3xl font-semibold mb-4">
                  Sécurité et Confidentialité
                </h3>
                <p className="text-lg leading-relaxed text-blueGray-500">
                  Chez MediHealth, la sécurité de vos données est notre priorité absolue. Toutes les informations sont cryptées et stockées dans des environnements conformes aux normes médicales les plus strictes.
                </p>
                <p className="text-lg leading-relaxed text-blueGray-500">
                  Faites confiance à une plateforme qui respecte votre vie privée et garantit la confidentialité de chaque interaction.
                </p>
              </div>
              <div className="w-full md:w-5/12 ml-auto px-4" data-aos="fade-left">
                <img
                  src={require('../assets/img/img.avif')}
                  alt="Sécurité et Confidentialité"
                  className="max-w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
