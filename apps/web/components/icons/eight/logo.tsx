import Image from "next/image";
import type { ImgHTMLAttributes } from "react";

export function EightLogo(
  props: Omit<ImgHTMLAttributes<HTMLImageElement>, "width" | "height">
) {
  return (
    <Image
      src="/images/8photos.svg"
      alt="8photos logo"
      width={80}
      height={80}
      {...props}
    />
  );
}