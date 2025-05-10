import Image from "next/image";

export default function ManagementTeam() {
  return (
    <section className="bg-black text-white py-16 px-6 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Management Team</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Lazarus Yabes */}
        <div className="flex flex-col items-center">
          <div className=" overflow-hidden w-48 h-48 mb-4">
            <Image
              src="https://raw.githubusercontent.com/amruthexe/Talent-trek/main/public/h2.jpg" // Replace with actual image path
              alt="Lazarus Yabes"
              width={192}
              height={192}
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-bold">LAZARUS YABES</h3>
          <p className="text-sm">Founder & CEO</p>
          <p className="mt-4 text-sm max-w-lg text-center">
            Mr. N. Lazarus Yabes is the Chief Executive Officer (CEO) of Vevvion. As CEO, he is dedicated to fulfilling the Company's purpose, with his passions grounded in innovation, education and training, he sets the strategy for Vevvion, overseeing all aspects of the company's growth strategies, and ensuring in building the Company as the best in the Industry. He started his career in Nutrition & Network Industry in the year 1997 and has made several achievements. During the past 27+ years, he has created & supported many thousands of people to be successful in this Direct Selling Industry. Also, he has a good experience in areas like Service, Logistics & Warehousing, etc., by serving in top positions in companies like BPL.
          </p>
        </div>

        {/* Sam Vijay Praveen */}
        <div className="flex flex-col items-center">
          <div className=" overflow-hidden w-40 h-40 mb-8">
            <Image
              src="https://raw.githubusercontent.com/amruthexe/Talent-trek/main/public/h1.jpg" // Replace with actual image path
              alt="Sam Vijay Praveen"
              width={192}
              height={192}
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-bold">SAM VIJAY PRAVEEN</h3>
          <p className="text-sm">Co-founder & Vice President</p>
          <p className="mt-4 text-sm max-w-lg text-center">
            Mr. B. Sam Vijay Praveen is the Vice-President of Vevvion. As Vice-President, he is responsible for all business, strategic, sales and marketing functions, ethics & compliance by implementation and enforcement of Member rules and guidelines. He is a renowned Advocate with 18+ Years of Experience in practice. He has an equal experience with the Nutrition Industry and Network Marketing. He entered into Network Marketing in the year 1999. All these years, he has been successful in helping many top companies open and develop in new markets.
          </p>
        </div>
      </div>
    </section>
  );
}
