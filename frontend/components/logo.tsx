import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  size?: number;
};

export default function Logo({ className, size = 28 }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className ?? ""}`}>
      <Image
        src="/logo.svg"
        alt="Be4Breach logo"
        width={size}
        height={size}
        priority
      />
      <span className="text-base font-semibold tracking-tight text-white">
        Be4Breach
      </span>
    </Link>
  );
}
