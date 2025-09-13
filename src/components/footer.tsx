"use client";

import React from "react";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section
      aria-label="Hero banner"
      className="relative overflow-hidden rounded-t-[2rem] h-[40vh] min-h-[40vh] md:min-h-[50vh] flex items-center"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/image.png"
          alt="Decorative background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      </div>

      {/* Content container */}
      <div className="relative z-20 container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8">
        {/* Left area: on lg show ONLY LinkedIn; on small show all socials (mobile-friendly) */}
        <div className="order-2 lg:order-1 w-full lg:w-1/4 flex items-center justify-center lg:justify-center lg:pl-6">
          {/* Mobile socials: visible on small screens */}
          <nav aria-label="Mobile social links" className="flex gap-6 flex-wrap lg:hidden">
            <a
              href="https://www.linkedin.com/in/shreyash-raj/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block text-sm md:text-base font-light transition-colors duration-300 hover:text-[var(--accent)]"
            >
              <span className="relative inline-block">/linkedin
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
              </span>
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block text-sm md:text-base font-light transition-colors duration-300 hover:text-[var(--accent)]"
            >
              <span className="relative inline-block">/instagram
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
              </span>
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block text-sm md:text-base font-light transition-colors duration-300 hover:text-[var(--accent)]"
            >
              <span className="relative inline-block">/youtube
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
          </nav>

          {/* Desktop: only LinkedIn on the left, centered inside a 1/4 column so it moves closer to the middle */}
          <nav aria-label="Desktop left social" className="hidden lg:flex">
            <a
              href="https://www.linkedin.com/in/shreyash-raj/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block text-base font-light transition-colors duration-300 hover:text-[var(--accent)]"
            >
              <span className="relative inline-block">/linkedin
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
          </nav>
        </div>

        {/* Center logo */}
        <div className="order-1 lg:order-2 w-full lg:w-1/2 flex justify-center">
          <h1 className="flex items-center justify-center text-center leading-none">
            <span className="sr-only">Korzi</span>
            <Image
              src="/logo-stacked.png"
              alt="Korzi Logo"
              width={800}
              height={200}
              className="w-56 md:w-72 lg:w-[24rem] h-auto"
              priority
            />
          </h1>
        </div>

        {/* Right: instagram + youtube on large screens (unchanged) */}
        <div className="order-3 w-full lg:w-1/4 flex justify-center lg:justify-end lg:pr-6">
          <div className="hidden lg:flex gap-6">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Instagram (opens in a new tab)"
              className="group inline-block text-base font-light transition-colors duration-300 hover:text-[var(--accent)]"
            >
              <span className="relative inline-block">/instagram
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
              </span>
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open YouTube (opens in a new tab)"
              className="group inline-block text-base font-light transition-colors duration-300 hover:text-[var(--accent)]"
            >
              <span className="relative inline-block">/youtube
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
