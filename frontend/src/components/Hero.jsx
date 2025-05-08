// import React from "react";
import { assets } from "../assets/assets";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full min-h-[80vh] sm:min-h-[90vh] flex flex-col-reverse sm:flex-row items-center justify-center bg-zinc-100 dark:bg-zinc-600 overflow-hidden rounded-3xl px-6 sm:px-12 md:px-20 shadow-zinc-600 dark:shadow-zinc-100 dark:shadow-lg shadow-md mb-6">
      {/* Left: Content */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center sm:items-start gap-6 text-center sm:text-left py-10 sm:py-0">
        <div className="flex items-center gap-2">
          <span className="w-10 h-[2px] bg-black dark:bg-white"></span>
          <span className="uppercase text-sm text-zinc-700 dark:text-zinc-300 tracking-wide font-medium">
            Our Bestsellers
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight tracking-tight prata-regular">
          Explore Our Latest Arrivals
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-md">
          Discover the newest styles, carefully curated for modern living. High-quality, timeless pieces made to elevate your wardrobe.
        </p>

        <button className="inline-flex items-center gap-2 bg-orange-600  text-white dark:text-white px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg">
          Shop Now
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Image */}
      <div className="w-full sm:w-1/2 h-[300px] sm:h-[500px] flex items-center justify-center z-10">
        <img
          src={assets.home_a}
          alt="Latest Arrivals"
          className="w-full h-full object-cover bg-transparent rounded-xl"
        />
      </div>
    </section>
  );
};

export default Hero;
