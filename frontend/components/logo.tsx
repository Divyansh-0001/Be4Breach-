import Link from "next/link";

type LogoProps = {
  className?: string;
  size?: number;
};

export default function Logo({ className, size = 28 }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className ?? ""}`}>
      <span
        className="flex items-center justify-center rounded-xl bg-be4-accent/15 text-be4-accent"
        style={{ width: size + 12, height: size + 12 }}
        aria-hidden="true"
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 3.5L26.2 7.6V16.2C26.2 22 22.4 26.7 16 29C9.6 26.7 5.8 22 5.8 16.2V7.6L16 3.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M12.4 12.6H18.6C20.7 12.6 22.4 14.3 22.4 16.4C22.4 18.5 20.7 20.2 18.6 20.2H12.4V12.6Z"
            fill="currentColor"
            opacity="0.5"
          />
          <path
            d="M10.3 11.2H13.4V23.5H10.3V11.2Z"
            fill="currentColor"
          />
          <path
            d="M17.6 16H19.4C20.2 16 20.9 16.7 20.9 17.5C20.9 18.3 20.2 19 19.4 19H17.6V16Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="text-base font-semibold tracking-tight text-white">
        Be4Breach
      </span>
    </Link>
  );
}
