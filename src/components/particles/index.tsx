import ParticlesComponent from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useMemo } from "react";

interface ParticlesComponentProps {
  id: string;
}

export function Particles({ id }: ParticlesComponentProps) {
  const options = useMemo(() => {
    return {
      fpsLimit: 120,
      background: {
        color: "transparent",
      },
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "rgb(109, 18, 184)",
          opacity: 0.5,
        },
        links: {
          color: "rgb(109, 18, 184)",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 2,
          quantity: 80,
        },
        collisions: {
          enable: true,
        },
        move: {
          direction: "top",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: true,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: 1,
        },
      },
      detectRetina: true,
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
    };
  }, []);

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);
  //@ts-ignore
  return <ParticlesComponent id={id} init={particlesInit} options={options} />;
}
