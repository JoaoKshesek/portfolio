import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const SESSION_KEY = "portfolio:booted";
const TYPE_DELAY = 22;
const FADE_MS = 350;

export type BootLineKind = "prompt" | "output" | "ready";

export interface BootLine {
  kind: BootLineKind;
  text: string;
  cwd?: string;
}

interface BootStep extends BootLine {
  /** pausa antes desta linha, em ms */
  delay: number;
}

export interface UseBootScreenProps {
  visible: boolean;
  fading: boolean;
  lines: BootLine[];
  /** trecho já digitado da linha de prompt em andamento */
  typing: BootLine | null;
  skip: () => void;
}

function alreadyBooted(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markBooted() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // sem storage (modo privado, etc.): só não lembra entre páginas
  }
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const useBootScreen = (): UseBootScreenProps => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(() => !alreadyBooted());
  const [fading, setFading] = useState(false);
  const [lines, setLines] = useState<BootLine[]>([]);
  const [typing, setTyping] = useState<BootLine | null>(null);
  const timers = useRef<number[]>([]);
  const done = useRef(false);

  const steps = useMemo<BootStep[]>(
    () => [
      { kind: "prompt", cwd: "~", text: "git clone joaokshesek/portfolio", delay: 200 },
      { kind: "output", text: t("boot.clone"), delay: 150 },
      { kind: "prompt", cwd: "~/portfolio", text: "pnpm install", delay: 200 },
      { kind: "output", text: t("boot.install"), delay: 200 },
      { kind: "prompt", cwd: "~/portfolio", text: "pnpm dev", delay: 200 },
      { kind: "ready", text: t("boot.ready"), delay: 250 },
    ],
    [t],
  );

  const finish = () => {
    if (done.current) return;
    done.current = true;
    timers.current.forEach((id) => window.clearTimeout(id));
    markBooted();
    setFading(true);
    window.setTimeout(() => setVisible(false), FADE_MS);
  };

  useEffect(() => {
    if (!visible) return;

    const ids: number[] = [];
    timers.current = ids;

    const schedule = (delay: number, fn: () => void) => {
      ids.push(window.setTimeout(fn, delay));
    };

    const clear = () => ids.forEach((id) => window.clearTimeout(id));

    // sem animação: mostra o estado final por um instante e entra
    if (prefersReducedMotion()) {
      schedule(0, () =>
        setLines(steps.map(({ kind, text, cwd }) => ({ kind, text, cwd }))),
      );
      schedule(600, finish);
      return clear;
    }

    let at = 0;
    for (const { delay, ...line } of steps) {
      at += delay;

      if (line.kind !== "prompt") {
        schedule(at, () => setLines((prev) => [...prev, line]));
        continue;
      }

      // digita a linha de prompt caractere a caractere
      for (let i = 1; i <= line.text.length; i++) {
        schedule(at + i * TYPE_DELAY, () =>
          setTyping({ ...line, text: line.text.slice(0, i) }),
        );
      }
      at += line.text.length * TYPE_DELAY;
      schedule(at, () => {
        setTyping(null);
        setLines((prev) => [...prev, line]);
      });
    }

    schedule(at + 500, finish);

    return clear;
    // steps só muda com o idioma; reiniciar a animação nesse caso seria pior
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return { visible, fading, lines, typing, skip: finish };
};
