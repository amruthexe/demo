"use client";

import { FaExclamationTriangle, FaFileContract, FaInfoCircle, FaRegCopyright } from 'react-icons/fa'; // Import icons
import Footer from '../components/Footer';
export default function TermsAndConditions() {
  return (
    <div className="container mx-auto px-4 py-8 bg-black text-white">
      {/* Main Title */}
      <h1 className="text-4xl font-bold text-green-600 mb-8 text-center">
        Terms and Policies
      </h1>

      {/* Terms Intro */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-4">
          <FaFileContract className="inline-block mr-2 text-green-600" />
          Welcome to Vevvion Stores
        </h2>
        <p className="text-lg leading-relaxed">
          Welcome to Vevvion Stores. These terms and conditions outline the rules and regulations for the use of Vevvion Store’s (VEVVION WELLNESS PRIVATE LIMITED) Website (www.myvevvion.com). Vevvion Stores is located at Bangalore, India (The detailed Address is mentioned on our Website).
        </p>
        <p className="text-lg leading-relaxed mt-4">
          By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Vevvion Stores’s website if you do not accept all of the terms and conditions stated on this page.
        </p>
      </section>

      {/* Terminology Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-4">
          <FaInfoCircle className="inline-block mr-2 text-green-600" />
          Terminology
        </h2>
        <p className="text-lg leading-relaxed">
          The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and any or all Agreements: Client, You and Your refers to you, the person accessing this website and accepting the Company’s terms and conditions. The Company, Ourselves, We, Our and Us, refers to our Company. Party, Parties, or Us, refers to both the Client and ourselves, or either the Client or ourselves.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner, whether by formal meetings of a fixed duration, or any other means, for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services/products, in accordance with and subject to, prevailing law of (Address).
        </p>
      </section>

      {/* Cookies Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-4">
          <FaRegCopyright className="inline-block mr-2 text-green-600" />
          Cookies
        </h2>
        <p className="text-lg leading-relaxed">
          We employ the use of cookies. By using Vevvion Store’s website, you consent to the use of cookies in accordance with Vevvion Store’s privacy policy. Most of the modern-day interactive websites use cookies to enable us to retrieve user details for each visit.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          Cookies are used in some areas of our site to enable the functionality of this area and ease of use for those people visiting. Some of our affiliate/advertising partners may also use cookies.
        </p>
      </section>

      {/* License Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-4">
          <FaFileContract className="inline-block mr-2 text-green-600" />
          License
        </h2>
        <p className="text-lg leading-relaxed">
          Unless otherwise stated, Vevvion Store’s and/or its licensors own the intellectual property rights for all material on Vevvion Store’s.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          All intellectual property rights are reserved. You may view and/or print pages from (www.myvevvion.com) for your own personal use subject to restrictions set in these terms and conditions.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          You must not:
        </p>
        <ul className="list-disc pl-6">
          <li>Republish material from (www.myvevvion.com).</li>
          <li>Sell, rent, or sub-license material from (www.myvevvion.com).</li>
          <li>Reproduce, duplicate or copy material from (www.myvevvion.com).</li>
          <li>Redistribute content from Vevvion Store’s (unless content is specifically made for redistribution).</li>
        </ul>
      </section>

      {/* Disclaimer Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-4">
          <FaExclamationTriangle className="inline-block mr-2 text-green-600" />
          Disclaimer
        </h2>
        <p className="text-lg leading-relaxed">
          To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website (including, without limitation, any warranties implied by law in respect of satisfactory quality, fitness for purpose, and/or the use of reasonable care and skill).
        </p>
        <p className="text-lg leading-relaxed mt-4">
          Nothing in this disclaimer will:
        </p>
        <ul className="list-disc pl-6">
          <li>Limit or exclude our or your liability for death or personal injury resulting from negligence.</li>
          <li>Limit or exclude our or your liability for fraud or fraudulent misrepresentation.</li>
          <li>Limit any of our or your liabilities in any way that is not permitted under applicable law.</li>
          <li>Or exclude any of our or your liabilities that may not be excluded under applicable law.</li>
        </ul>
        <p className="text-lg leading-relaxed mt-4">
          The limitations and exclusions of liability set out in this Section and elsewhere in this disclaimer:
        </p>
        <ul className="list-disc pl-6">
          <li>Are subject to the preceding paragraph; and</li>
          <li>Govern all liabilities arising under the disclaimer or in relation to the subject matter of this disclaimer, including liabilities that arise in contract, tort (including negligence), and for breach of statutory duty.</li>
        </ul>
        <p className="text-lg leading-relaxed mt-4">
          To the extent that the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
        </p>
      </section>
      
    </div>
  );
}
