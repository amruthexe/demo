import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <Image src="https://raw.githubusercontent.com/amruthexe/Talent-trek/main/public/image.png" alt="Vevvion Logo" width={120} height={120} className="mb-6 rounded-full shadow-lg" />
        <h1 className="text-4xl font-bold mb-6">About Vevvion Wellness Pvt Ltd</h1>
        <p className="mb-4 text-lg text-center">
          Vevvion Wellness Pvt Ltd deals in the most effective and highest rated healthcare products, with a vision of &quot;giving back to society a joyful and luxurious life.&quot; We are committed to helping people live better lives by offering quality products and opportunities for the future, and by sharing generously with the global community.
        </p>
        <p className="mb-4 text-center text-gray-300">
          With years of experience in the industry, we strive for business excellence, care for people and their communities, and concern for the environment. Our mission is to enhance the lives of billions of people by empowering everyone to improve their financial power and well-being.
        </p>
        <p className="text-center text-gray-400">Thank you for choosing Vevvion Wellness Pvt Ltd as your trusted partner in health and happiness.</p>
      </div>
    </main>
  );
} 