import React from "react";
import { Link } from "react-router-dom";

const keywords = [
  "Adventure",
  "Innovation",
  "Serenity",
  "Technology",
  "Diversity",
  "Sustainability",
  "Wanderlust",

  "Creativity",
  "Collaboration",
  "Wellness",
  "Celebration",
  "Abstract",
  "Harmony",
  "Inspiration",
  "Futuristic",
  "Wildlife",
  "Retro",
  "Tranquility",
  "Success",
  "Discovery",
  "Elegance",
  "Joy",
  "Imagination",
  "Urban Exploration",
  "Mystery",
  "Pioneer",
  "Radiance",
  "Vibrance",
  "Whimsy",
  "Infinity",
];

const Keywords = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-7 text-center md:mb-10">
            <h2 className="text-stroke text-3xl font-black leading-[1.2] text-transparent sm:text-5xl lg:text-6xl">
              Snap, Crackle, Pop Picks
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-gray-500 sm:mt-4 md:text-lg lg:mt-5">
              I heard our homepage whisper 'I'm lonely,' so I added this
              section. Click on these words; they're like digital popcorn—fun,
              addictive, and they won't stick to your teeth!
            </p>
          </div>
          <div className="flex flex-wrap gap-x-1.5 gap-y-2">
            {keywords.map((keyword) => (
              <Link
                className="rounded-full border-2 border-indigo-400 bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-500 duration-300 hover:bg-indigo-400 hover:text-white"
                to={`/photos?s=${keyword}`}
                key={keyword}
              >
                {keyword}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Keywords;
