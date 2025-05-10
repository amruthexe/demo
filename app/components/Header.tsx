"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { UserCircle, ShoppingCart, User, LogOut } from "lucide-react";
import { useNotification } from "./Notification";
import { useCart } from "./CartContext";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { showNotification } = useNotification();
  const { items, clearCart } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSignOut = async () => {
    try {
      await signOut();
      clearCart(); // Clear cart when user signs out
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <header className="bg-black shadow-md">
      <div className="container mx-auto px-4">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm  dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link
                    href="/products"
                    className={pathname === "/products" ? "active" : ""}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className={pathname === "/about" ? "active" : ""}
                  >
                    About us
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="/team"
                    className={pathname === "/team" ? "active" : ""}
                  >
                    Team
                  </Link>
                </li> */}
                <li>
                  <Link
                    href="/policies"
                    className={pathname === "/policies" ? "active" : ""}
                  >
                    Terms & Policies
                  </Link>
                </li>
               
              </ul>
            </div>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://raw.githubusercontent.com/amruthexe/Talent-trek/main/public/image.png"
                alt="Vevvion Logo"
                width={120}
                height={40}
                className="rounded-md"
                priority
              />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link
                  href="/products"
                  className={pathname === "/products" ? "active" : ""}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={pathname === "/about" ? "active" : ""}
                >
                  About us
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/team"
                  className={pathname === "/team" ? "active" : ""}
                >
                  Team
                </Link>
              </li> */}
              <li>
                <Link
                  href="/policies"
                  className={pathname === "/policies" ? "active" : ""}
                >
                  Terms & Policies
                </Link>
              </li>
             
            </ul>
          </div>
          <div className="navbar-end">
            <div className="flex items-center gap-4">
              {status === "authenticated" && (
                <Link href="/cart" className="relative">
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              {session ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li className="px-4 py-2 text-sm opacity-70">
                      {session.user?.email?.split("@")[0]}
                    </li>
                    <div className="divider my-1"></div>
                    {session.user?.role === "admin" && (
                      <li>
                        <Link href="/admin" className="text-green-600">
                          Admin Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link href="/orders" className="text-green-600">
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="text-error flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link href="/login" className="btn btn-primary">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
