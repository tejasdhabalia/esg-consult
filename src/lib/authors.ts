import { site } from "@/lib/site";

/**
 * Author records, shared by insights pages and regulatory hub pages.
 *
 * These used to live as local consts inside esg-insight-pages.ts. They moved
 * here when regulatory hub pages gained bylines, so a change to a role or a
 * bio happens once rather than in two files that quietly drift apart.
 *
 * Attribution, agreed with the SEO project 25 August 2026:
 *   Technology and AI pieces  -> tejas
 *   Sustainability pieces     -> jigar
 */
export type Author = {
  name: string;
  role: string;
  roleShort: string;
  imageSrc: string;
  linkedin: string;
  bio: string;
};

export const tejas: Author = {
  name: "Tejas Dhabalia",
  role: "Co-founder and Principal Consultant",
  roleShort: "Co-founder, DS Consulting",
  imageSrc: "/team/tejas.jpg",
  linkedin: site.linkedin.tejas,
  bio: "Former IBM mainframe engineer turned operator across Tata and Tata-Tesco. Works at the seam between systems, governance and commercial execution.",
};

export const jigar: Author = {
  name: "Jigar Dhabalia",
  role: "Co-founder",
  roleShort: "Co-founder, DS Consulting",
  imageSrc: "/team/jigard.jpg",
  linkedin: site.linkedin.jigar,
  bio: "Advises leadership teams on ESG reporting structure, operating model design, evidence trails, and execution discipline across cross-functional workstreams.",
};

/**
 * Person schema for an author. Emit alongside the page's existing schema
 * rather than instead of it: a regulatory hub page stays a DefinedTerm and
 * gains a Person, it does not stop being a DefinedTerm.
 */
export function personSchema(author: Author) {
  return {
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    url: `${site.baseUrl}/team`,
    sameAs: [author.linkedin],
  };
}
