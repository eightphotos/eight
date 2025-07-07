import type { HTMLAttributes } from "react";

export function EightLogo(props: HTMLAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      width="85"
      height="85"
      viewBox="0 0 85 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 7C0 3.13401 3.13401 0 7 0H78C81.866 0 85 3.13401 85 7V78C85 81.866 81.866 85 78 85H7C3.13401 85 0 81.866 0 78V7Z"
        fill="black"
      />
      <path
        d="M36.3043 33.7713H48.6957V51.2287H36.3043V33.7713Z"
        fill="white"
      />
      <path d="M61.9565 33.3959H75V51.2287H61.9565V33.3959Z" fill="white" />
      <path d="M10 33.3959H23.0435V51.2287H10V33.3959Z" fill="white" />
      <path d="M36.3043 15H48.6957V24.198H36.3043V15Z" fill="white" />
      <path d="M23.0435 15H36.3043V33.7713H23.0435V15Z" fill="white" />
      <path d="M48.6957 15H61.9565V33.7713H48.6957V15Z" fill="white" />
      <path d="M48.6957 70H36.3043V60.802H48.6957V70Z" fill="white" />
      <path d="M61.9565 70H48.6957V51.2287H61.9565V70Z" fill="white" />
      <path d="M36.3043 70H23.0435L23.0435 51.2287H36.3043V70Z" fill="white" />
    </svg>
  );
}
