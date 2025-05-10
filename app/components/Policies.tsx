"use client";

import { FaShieldAlt, FaExclamationTriangle, FaExchangeAlt, FaTruck } from 'react-icons/fa'; // Import Lucid-like icons
import Footer from './Footer';
export default function Policies() {
  return (
    <div className="container mx-auto px-4 pt-8 bg-black text-white">
      {/* Main Title */}
      <h1 className="text-4xl font-bold text-green-600 mb-8 text-center">
        Policies
      </h1>

      {/* Privacy Policy Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-4">
          <FaShieldAlt className="inline-block mr-2 text-green-600" />
          PRIVACY POLICY
        </h2>
        <p className="text-lg leading-relaxed">
          This privacy policy sets out how M/s Vevvion Wellness Pvt Ltd. uses and protects any information that you give when you use this website. M/s Vevvion Wellness Pvt Ltd ensures that your privacy is protected.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          M/s Vevvion Wellness Pvt Ltd. may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. Here, M/s Vevvion Wellness Private Limited declare that any other personal information through the company website and company App of our customers/Users is solely meant for company administration purpose and not for any other means.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          M/s Vevvion Wellness Pvt. Ltd., are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
        </p>
      </section>

      {/* Disclaimer Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-4">
          <FaExclamationTriangle className="inline-block mr-2 text-green-600" />
          DISCLAIMER
        </h2>
        <p className="text-lg leading-relaxed">
          The information about our products as available in our health guide / website are not intended to prevent, diagnose, treat or cure any disease. This information is intended as an introduction to value addition in life through supplements.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          Our products aim at maintaining holistic balance in body and immunity level but are no way substitute of physician's diagnosis or Treatment. You need to consult your doctor about your health conditions and use our supplements for value addition in life. Any product used in excessive amount will /may invite problems.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          M/s Vevvion Wellness Pvt. Ltd., and/or the Trade Mark owners of the products shall be responsible for the quality of the products, only, if such products are bought from authorised distributors.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          The buyer shall be solely responsible for all consequences for the purchase and use of products bought from unauthorized sources including unauthorized websites, ecommerce marketplace or unauthorised party(ies).
        </p>
      </section>

      {/* Refund Policy Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-4">
          <FaExchangeAlt className="inline-block mr-2 text-green-600" />
          REFUND POLICY
        </h2>
        <p className="text-lg leading-relaxed">
          In case of any dissatisfaction, or due to manufacturing or packaging defect, customers/Distributors have to intimate to the company about the return/exchange the product(s) within five days from the date of Invoice.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          The customers/Distributors must contact the Company from whom they had purchased the same, within 30 days from the date of purchase. They have to provide a valid reason in written and return the said products along with the original customer order receipt copy / invoice.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          Cancellation can be done within 30 days from the Order date and Refund will be made after deduction of necessary processing charges.
        </p>
      </section>

      {/* Statutory Warning Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-4">
          <FaExclamationTriangle className="inline-block mr-2 text-green-600" />
          STATUTORY WARNING
        </h2>
        <p className="text-lg leading-relaxed">
          This is to notify all concerned as well as general public that M/s Vevvion Wellness Pvt. Ltd., is in the business of Trading and marketing of Health Promotion Products and is entitled to the Trademark of M/s Vevvion Wellness Pvt. Ltd.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          M/s Vevvion Wellness Pvt Ltd has channelized its marketing and distribution of the products ONLY through its Distributors / Website (www.myvevvion.com). M/s Vevvion Wellness Pvt. Ltd., does not want to face fraudulent tampering of barcodes on the labels of its product and are selling Vevvion Wellness Products through any e-commerce channels.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          Making unlawful business gains, dishonesty in an unmetrical manner, by some unscrupulous persons may cause immense damage to the name and reputation of M/s Vevvion Wellness Pvt. Ltd. All concerned / public in general are advised and cautioned not to get carried away by the words/promises of dishonest persons who offer products with unusual discounts or monetary benefits in any manner for Vevvion Wellness products with tampered labels.
        </p>
      </section>

      {/* Shipping and Delivery Policy Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-4">
          <FaTruck className="inline-block mr-2 text-green-600" />
          SHIPPING AND DELIVERY POLICY
        </h2>
        <p className="text-lg leading-relaxed">
          Orders will be shipped within 7 working days or as per the delivery date agreed at the time of order confirmation & delivering of the shipment subject to Courier Company / post office norms. For a given place of delivery, it may be done on the next working day or may take 7 working days depending on the availability of Fresh Stocks / Distance from the Place to Central Warehouse.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          The product(s) shall be dispatched to the address provided by you at the time of placing the order. If the wrong delivery address is mentioned, and the product has been returned to the company address, the company shall charge extra for the second delivery attempt.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          Shipment charges will vary based on the bill amount as mentioned/intimated to the customers from time to time. No extra charges on delivery of product(s) are charged if the product(s) are picked up from Vevvion Wellness facilitator outlets.
        </p>
      </section>
      <Footer />
    </div>
  );
}
