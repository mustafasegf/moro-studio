import { Section } from "@prisma/client";
import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/react-splide/css";

export function HeroSection(hero: Section) {
  const image = hero.image[0];

  return (
    <div>
      <img src={image} alt="" />
    </div>
  );
}

export function CarouselSection(carousel: Section) {
  const images = carousel.image;

  return (
    <>
      <script src="path-to-the-file/splide.min.js"></script>

      <div className="snap-y snap-proximity">
        <div className="snap-center snap-always">
          <Splide
            options={{
              type: "loop",
              height: "100vh",
              padding: "5rem",
              focus: "center",
              autoWidth: true,
              drag: "free",
            }}
            aria-label="My Favorite Images"
          >
            {images.map((image) => (
              <>
                <SplideSlide>
                  <img
                    className="h-full w-full object-contain"
                    src={image}
                    alt="Image"
                  />
                </SplideSlide>
              </>
            ))}
          </Splide>
        </div>
      </div>
    </>
  );
}

export function CTA(cta: Section) {
  return (
    <div>
      <p>CTA</p>
    </div>
  );
}
