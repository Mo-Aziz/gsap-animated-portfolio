"use client";

import { useEffect, useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import Bounded from "@/components/Bounded";
import Shapes from "./Shapes";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let tl = gsap.timeline();
      tl.fromTo(
        ".name-animation",
        {
          x: -100,
          opacity: 0,
          rotate: -10,
        },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "elastic.out(0.7, 0.3)",
          duration: 1,
          transformOrigin: "left top",
          stagger: {
            each: 0.1,
            from: "random",
          },
        },
      );
      tl.fromTo(
        ".job-title",
        { y: 20, opacity: 0, scale: 1.2 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scale: 1,
          ease: "elastic.out(0.7, 0.3)",
        },
      );
      tl.fromTo(
        ".tag-1",
        { y: 20, opacity: 0, scale: 1.2 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scale: 1,
          ease: "bounce.out(1, 0.8)",
        },
      );
    }, component);
    return () => ctx.revert();
  }, []);
  // split letters into spans
  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key} inline-block opacity-0`}
      >
        {letter}
      </span>
    ));
    // end of split letters into spans function.
  };
  return (
    <Bounded ref={component}>
      <div className="grid min-h-[70vh] grid-cols-1 items-center md:grid-cols-2">
        {/* objects */}

        {/* end of objects */}
        <div className="col-start-1 md:row-start-1">
          {/* html tags */}
          <span className="tag-1 block text-[14px] text-cyan-600">
            &lt;html&gt;
          </span>

          <span className="tag-1 block pl-4 text-[14px] text-rose-500">
            &lt;body&gt;
          </span>
          <h1
            className="mb-8 text-[clamp(2rem,17vmin,15rem)] font-extrabold leading-none tracking-tighter"
            aria-label={
              slice.primary.first_name + " " + slice.primary.last_name
            }
          >
            <span className="block text-slate-300">
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span className="-mt-[.2em] block text-slate-500">
              {renderLetters(slice.primary.last_name, "last")}
            </span>
          </h1>

          <span className="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl">
            {slice.primary.tag_line}
          </span>
          {/* end of html tags */}
          <span className="tag-1 block pl-4 pt-4 text-[14px] text-rose-500">
            &lt;/body&gt;
          </span>
          <span className="tag-1 block text-[14px] text-cyan-600">
            &lt;/html&gt;
          </span>
        </div>
        <Shapes />
      </div>
    </Bounded>
  );
};

export default Hero;
