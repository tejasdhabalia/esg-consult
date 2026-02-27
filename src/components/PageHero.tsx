import Image from "next/image";
import Link from "next/link";
import TaglineBadge from "@/components/TaglineBadge";
import HeroOrnament from "@/components/HeroOrnament";

type HeroAction = { label: string; href: string };

export default function PageHero({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  note,
  imageSrc,
  imageAlt,
}: {
  title: string;
  subtitle: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  note?: string;
  imageSrc: string; // example: "/hero/home.jpg"
  imageAlt: string;
}) {
  return (
    <section className="relative bg-slate-900 text-white py-28">
      <HeroOrnament />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          {/* Left */}
          <div className="md:col-span-7">
            <TaglineBadge />

            <h1 className="mt-8 text-5xl font-bold leading-tight max-w-4xl">
              {title}
            </h1>

            <p className="mt-6 text-lg text-slate-300 max-w-4xl">
              {subtitle}
            </p>

            {(primaryAction || secondaryAction) && (
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                {primaryAction && (
                  <Link
                    href={primaryAction.href}
                    className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium text-center"
                  >
                    {primaryAction.label}
                  </Link>
                )}
                {secondaryAction && (
                  <Link
                    href={secondaryAction.href}
                    className="border border-white hover:bg-white/10 px-6 py-3 rounded-lg text-center"
                  >
                    {secondaryAction.label}
                  </Link>
                )}
              </div>
            )}

            {note && <div className="mt-8 text-sm text-slate-400">{note}</div>}
          </div>

          {/* Right: image */}
          <div className="md:col-span-5">
            <div className="relative w-full h-[260px] sm:h-[320px] md:h-[360px] rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-800/30">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                className="object-cover object-right"
              />
              {/* Overlay to keep brand look consistent */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/65 via-slate-900/25 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}