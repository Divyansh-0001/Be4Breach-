import { backendUrl } from "@/lib/config";

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
        <div className="rounded-lg border border-black/10 bg-white p-4 text-sm text-black/70">
          <p className="font-medium text-black">Backend configuration</p>
          <p>
            Configure <code>NEXT_PUBLIC_BACKEND_URL</code> in your environment
            to point at the API service.
          </p>
          <p className="mt-2 text-black">
            Current backend URL: <code>{backendUrl}</code>
          </p>
        </div>
      </div>
    </section>
  );
}
