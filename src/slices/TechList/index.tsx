"use client";

import React, { use, useEffect } from "react";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { MdCircle } from "react-icons/md";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {
  const component = React.useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 11,
        },
      });
      tl.fromTo(
        ".tech-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(600, 400)
              : gsap.utils.random(-600, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-600, -400)
              : gsap.utils.random(600, 400);
          },
        }
      );
    }, component);
    return () => ctx.revert(); // cleanup
  }, []);
  // tech stack
  const techStack = [
    { index: 1, name: "REACT.JS", color: "#7cc5d9" },
    { index: 2, name: "NEXT.JS", color: "#252728" },
    { index: 3, name: "TAILWIND.CSS", color: "#1d2e68" },
    { index: 4, name: "JAVASCRIPT", color: "#f3e260" },
    { index: 5, name: "TYPESCRIPT", color: "#64b5f6" },
    { index: 6, name: "GSAP", color: "#2e712a" },
    { index: 7, name: "FIGMA", color: "#f37d6d" },
  ];
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={component}
    >
      <Bounded as="div">
        <Heading size="xl" as="h2" className="mb-8">
          {slice.primary.heading}
        </Heading>
      </Bounded>
      <div>
        {techStack.map(({ index, name, color }) => (
          <div
            key={index}
            className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
            aria-label={name || undefined}
          >
            {Array.from({ length: 15 }, (_, index) => (
              <React.Fragment key={index}>
                <span
                  className="tech-item text-6xl font-extrabold uppercase tracking-tighter"
                  style={{ color: index === 7 && color ? color : "inherit" }}
                >
                  {name}
                </span>
                <span className="text-3xl">
                  <MdCircle />
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechList;
