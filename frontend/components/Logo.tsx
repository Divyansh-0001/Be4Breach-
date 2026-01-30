import clsx from "clsx";

type LogoProps = {
  compact?: boolean;
  className?: string;
};

export default function Logo({ compact = false, className }: LogoProps) {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-red-600 text-xs font-semibold uppercase tracking-wide text-white">
        B4
      </span>
      {!compact && (
        <span className="text-sm font-semibold tracking-[0.2em] text-white">
          Be4Breach
        </span>
      )}
    </div>
  );
}
