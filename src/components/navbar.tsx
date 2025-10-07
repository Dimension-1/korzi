"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";


export default function Navbar() {
    const [scrollDirection, setScrollDirection] = useState("up");
    const [lastScrollY, setLastScrollY] = useState(0);
    const { scrollY } = useScroll();


    // Track scroll direction
    useEffect(() => {
        const updateScrollDirection = () => {
            const scrollYValue = window.scrollY;
            const direction = scrollYValue > lastScrollY ? "down" : "up";
            if (direction !== scrollDirection && (scrollYValue - lastScrollY > 10 || scrollYValue - lastScrollY < -10)) {
                setScrollDirection(direction);
            }
            setLastScrollY(scrollYValue > 0 ? scrollYValue : 0);
        };
        window.addEventListener("scroll", updateScrollDirection);
        return () => window.removeEventListener("scroll", updateScrollDirection);
    }, [scrollDirection, lastScrollY]);

    // Calculate navbar visibility based on scroll direction
    const navbarY = useTransform(scrollY, (value) => {
        return scrollDirection === "down" && value > 200 ? -100 : 0;
    });
    
    return (
        <>
            <motion.header
                className="sticky top-0 z-50 flex justify-center items-center bg-[var(--background)]"
                style={{ y: navbarY }}
            >
                <motion.div
                    className="hidden lg:flex absolute top-0 bg-[var(--background)] left-0 w-full h-24 px-4 lg:px-8 items-center"
                    // style={{ opacity: navOpacity }}
                >
                    
                    {/* Centered name - positioned absolutely to center on screen */}
                    <motion.div className="absolute left-1/2 transform -translate-x-1/2" >
                      <Link href="/" className="text-4xl lg:text-5xl text-[var(--foreground)] whitespace-nowrap">
                        <Image src="/logo-horizontal.png" alt="Korzi Logo" width={200} height={50} className="h-auto" />
                      </Link>
                    </motion.div>

                    {/* Navigation Links */}
                    <nav className="flex items-center space-x-8 ml-auto">
                        <Link href="/" className="text-[var(--foreground)] hover:text-blue-600 transition-colors">
                            Home
                        </Link>
                        <Link href="/collections" className="text-[var(--foreground)] hover:text-blue-600 transition-colors">
                            Collections
                        </Link>
                        <Link href="/products" className="text-[var(--foreground)] hover:text-blue-600 transition-colors">
                            Products
                        </Link>
                        <Link href="/about" className="text-[var(--foreground)] hover:text-blue-600 transition-colors">
                            About
                        </Link>
                    </nav>

                </motion.div>

                {/* --- Mobile Header (Static) --- */}

                <div className="flex flex-col w-full lg:hidden ">
                    <div className="lg:hidden flex items-center justify-center bg-[var(--background)] p-2">
                        <Link href="/" className="text-2xl min-[425px]:text-3xl items-center justify-center flex text-[var(--foreground)] lg:hidden whitespace-nowrap">
                            <Image src="/logo-horizontal.png" alt="Korzi Logo" width={150} height={40} className="h-auto pr-2" />
                        </Link>
                    </div>
                    
                    {/* Mobile Navigation */}
                    <nav className="lg:hidden flex items-center justify-center space-x-6 bg-[var(--background)] py-2 border-t border-gray-200">
                        <Link href="/" className="text-sm text-[var(--foreground)] hover:text-blue-600 transition-colors">
                            Home
                        </Link>
                        <Link href="/collections" className="text-sm text-[var(--foreground)] hover:text-blue-600 transition-colors">
                            Collections
                        </Link>
                        <Link href="/products" className="text-sm text-[var(--foreground)] hover:text-blue-600 transition-colors">
                            Products
                        </Link>
                        <Link href="/about" className="text-sm text-[var(--foreground)] hover:text-blue-600 transition-colors">
                            About
                        </Link>
                    </nav>
                </div>
            </motion.header>
        </>
    );
}
