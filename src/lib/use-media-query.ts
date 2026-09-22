import { useEffect, useState } from "react";

/** true enquanto a media query casar; acompanha redimensionamento e rotação */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** abaixo do breakpoint `md` do Tailwind: barra de atividades só, painel lateral vira gaveta */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}
