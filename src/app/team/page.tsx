import Image from "next/image";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Team | ${site.legalName}`,
  description: "Leadership and principal consultants at DS Consulting.",
  alternates: { canonical: absUrl("/team") },
};

export default function TeamPage() {
  return (
    <div>
      <PageHero
        title="Team"
        subtitle="DS Consulting is led by practitioners who combine consulting rigour with operator-level execution."
        primaryAction={{ label: "About", href: "/about" }}
        secondaryAction={{ label: "Explore services", href: "/services" }}
        imageSrc="/hero/team.jpg"
        imageAlt="Team and collaboration"
      />

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Leadership</h2>

          <div className="grid md:grid-cols-2 gap-10 mt-12">
            <div className="bg-slate-50 border rounded-2xl p-8">
              <div className="flex items-start gap-5">
                <Image
                  src="/team/tejas.jpg"
                  alt="Tejas Dhabalia"
                  width={96}
                  height={96}
                  className="rounded-xl object-cover"
                />
                <div>
                  <div className="text-xl font-semibold text-slate-900">Tejas Dhabalia</div>
                  <div className="text-sm text-slate-600">Co-founder and Principal Consultant</div>
                  <div className="mt-3 text-sm text-slate-600">
                    Marketing automation, AI architecture, retail analytics and lead management across B2B and B2C environments.
                  </div>
                  <div className="mt-4">
                    <a
                      href={site.linkedin.tejas}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-700 font-medium"
                    >
                      LinkedIn profile →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border rounded-2xl p-8">
              <div className="flex items-start gap-5">
                <Image
                  src="/team/jigar.jpg"
                  alt="Jigar Dhabalia"
                  width={96}
                  height={96}
                  className="rounded-xl object-cover"
                />
                <div>
                  <div className="text-xl font-semibold text-slate-900">Jigar Dhabalia</div>
                  <div className="text-sm text-slate-600">Co-founder and Principal Consultant</div>
                  <div className="mt-3 text-sm text-slate-600">
                    ESG readiness and governance with focus on operating cadence, controls, and repeatable reporting systems.
                  </div>
                  <div className="mt-4">
                    <a
                      href={site.linkedin.jigar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-700 font-medium"
                    >
                      LinkedIn profile →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-sm text-slate-600">
            Note: We do not provide statutory audit or assurance. We prepare organisations for assurance through governance, controls and evidence trail readiness.
          </div>
        </div>
      </section>
    </div>
  );
}