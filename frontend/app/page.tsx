import InfoPanel from "@/components/InfoPanel";

export default function Home() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="flex flex-col gap-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-black">Be4Breach</h1>
          <p className="text-base text-black/70">
            This is the base frontend scaffold for the Be4Breach website. Core
            layout and routing are in place, with UI details to come.
          </p>
        </div>
        <InfoPanel />
      </div>
    </section>
  );
}
