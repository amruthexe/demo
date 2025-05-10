import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative flex flex-col lg:flex-row items-center justify-between">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
            Transform Your Life with{" "}
            <span className="text-green-600">Vevvion Wellness</span>
          </h1>
          <p className="text-xl text-base-content/70 mb-8 animate-fade-in-up animation-delay-200">
            Discover our premium healthcare products designed to enhance your well-being and bring joy to your life.
          </p>
          <div className="flex gap-4 animate-fade-in-up animation-delay-400">
            <Link
              href="/products"
              className="btn text-white bg-green-600 btn-lg hover:scale-105 transition-transform"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="btn btn-outline btn-lg hover:scale-105 transition-transform"
            >
              Learn More
            </Link>
          </div>
        </div>
        {/* Logo removed from Hero section as per user request */}
      </div>
    </section>
  );
} 