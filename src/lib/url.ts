import { site } from "@/lib/site";

export function absUrl(path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${site.baseUrl}${cleanPath}`;
}