import { KeyTextField, LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { MdArrowOutward } from "react-icons/md"; // Import the 'MdArrowOutward' component from its appropriate source

type ButtonProps = {
  linkField: LinkField;
  label: KeyTextField;
  showIcon?: true;
  className?: string;
  target?: string;
};

export default function Button({
  linkField,
  label,
  showIcon,
  className,
  target,
}: ButtonProps) {
  return (
    <PrismicNextLink
      field={linkField}
      className={clsx(
        "group relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50 px-4 py-2 font-bold text-slate-800 no-underline transition-transform ease-out hover:scale-105",
        className,
      )}
      target="_blank"
    >
      <span className="absolute inset-0 z-0 h-full translate-y-9 bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>
      <span className="relative flex items-center justify-center gap-2">
        {label} <MdArrowOutward className="inline-block" />
      </span>
    </PrismicNextLink>
  );
}
