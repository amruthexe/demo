import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Vevvion Wellness</h3>
            <p className="text-base-content/70">
              Your trusted partner in wellness and healthcare products, dedicated to enhancing lives through quality healthcare solutions.
            </p>
            <div className="flex gap-4">
              {/* Social icons remain unchanged */}
              {/* ... */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-base-content/70 hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-base-content/70 hover:text-primary transition-colors">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-base-content/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/policies" className="text-base-content/70 hover:text-primary transition-colors">
                Terms & Policies
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-base-content/70 hover:text-primary transition-colors">
                  Team Behind
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=healthcare" className="text-base-content/70 hover:text-primary transition-colors">
                  Healthcare Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=wellness" className="text-base-content/70 hover:text-primary transition-colors">
                  Wellness Solutions
                </Link>
              </li>
              <li>
                <Link href="/products?category=nutrition" className="text-base-content/70 hover:text-primary transition-colors">
                  Nutrition Supplements
                </Link>
              </li>
              <li>
                <Link href="/products?category=beauty" className="text-base-content/70 hover:text-primary transition-colors">
                  Beauty & Personal Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info (Updated) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-base-content/70">
              <li>Vevvion Wellness Pvt Ltd</li>
              <li>Insta Office, 1st floor, SPD Plaza</li>
              <li>5th Block, Koramangala</li>
              <li>Opp. Jyoti Nivas College</li>
              <li>Bengaluru, Karnataka - 560034</li>
              <li>Email: <a href="mailto:care@vevvion.com" className="hover:text-primary">care@vevvion.com</a></li>
              <li>Client Support: <a href="tel:9994965676" className="hover:text-primary">99949 65676</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-base-300 mt-12 pt-8 text-center text-base-content/70">
          <p>&copy; {new Date().getFullYear()} Vevvion Wellness Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
