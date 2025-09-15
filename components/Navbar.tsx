"use client";
import Link from "next/link";

export default function Navbar() {
    const navLinks = [
        { href: "/discover", label: "Discover" },
        { href: "/chat", label: "Messages" },
        { href: "/profile", label: "Profile" },
    ];

    return(
        <div>
            <nav className="relative z-50 mt-6">
                <div className="container w-[40%] mx-auto px-6 border border-white/[.145] rounded-4xl">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center space-x-3">
                            <span className="text-xl text-[#FFC3CC] font-bold">
                                Guava.
                            </span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link key={link.label} href={link.href} className="text-[#D2DB76] hover:text-[#FFC3CC] font-medium transition duration-300">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}