import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ProjectInfo`.
 */
export type ProjectInfoProps = SliceComponentProps<Content.ProjectInfoSlice>;

/**
 * Component for "ProjectInfo" Slices.
 */
const ProjectInfo = ({ slice }: ProjectInfoProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Placeholder component for project_info (variation: {slice.variation})
      Slices */}
      <div>
        <div className=" flex gap-4">
          <label htmlFor="" className=" text-blue-600 font-bold">
            {slice.primary.liveproject}
          </label>
          <PrismicNextLink
            field={slice.primary.liveprojectlink}
            className="underline-none hover:underline hover:text-yellow-400 translate-transform"
            target="_blank"
          >
            Live web Link
          </PrismicNextLink>
        </div>
        <div className=" flex gap-4">
          <label htmlFor="" className=" text-blue-600 font-bold">
            {slice.primary.githubrepo}
          </label>
          <PrismicNextLink
            field={slice.primary.githubrepolink}
            className="underline-none hover:underline hover:text-yellow-400 translate-transform"
            target="_blank"
          >
            Github Repository
          </PrismicNextLink>
        </div>
      </div>
    </section>
  );
};

export default ProjectInfo;
