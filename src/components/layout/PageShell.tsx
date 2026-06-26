import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { getSolutionById } from "../../data/solutionCatalog";
import { useRouter } from "../../router";
import { PageBackdrop } from "./PageBackdrop";

interface PageShellProps {
  children: ReactNode;
  withBackdrop?: boolean;
}

function useSolutionBackdropImage() {
  const { path } = useRouter();
  const [hash, setHash] = useState(() => window.location.hash.replace("#", ""));

  useEffect(() => {
    const onHash = () => setHash(window.location.hash.replace("#", ""));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [path]);

  if (path === "/about") return "/images/solutions/smart-ticket.svg";
  if (path === "/solutions" && hash) {
    return getSolutionById(hash)?.image;
  }
  if (path === "/solutions") return "/images/solutions/ocr.svg";
  if (path === "/technology") return "/images/solutions/nanum-ax.svg";
  if (path === "/cases") return "/images/solutions/geo.svg";
  if (path === "/contact") return "/images/solutions/local.svg";
  return undefined;
}

export function PageShell({ children, withBackdrop = true }: PageShellProps) {
  const { path } = useRouter();
  const backdropImage = useSolutionBackdropImage();

  return (
    <div className="relative min-h-[calc(100vh-72px)]">
      {withBackdrop && <PageBackdrop key={`${path}-${backdropImage}`} imageSrc={backdropImage} />}
      <div className="relative z-0">{children}</div>
    </div>
  );
}
