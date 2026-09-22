import {
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  WhatsappLogoIcon,
  type IconProps,
} from "@phosphor-icons/react";

import { profileData } from "@/lib/profile";

export interface SocialLink {
  id: string;
  label: string;
  icon: string;
  url: string;
  /** cor da marca, usada no hover do ícone */
  color: string;
  iconComponent?: React.ComponentType<IconProps>;
}

export interface UseSocialMenuProps {
  socialLinks: SocialLink[];
  itemClass: string;
  labelClass: string;
}

const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "link",
    url: profileData.linkedin.href,
    color: "#0a66c2",
    iconComponent: LinkedinLogoIcon,
  },
  {
    id: "github",
    label: "GitHub",
    icon: "github",
    url: profileData.github.href,
    // preto no tema claro, branco no escuro
    color: "var(--ide-heading)",
    iconComponent: GithubLogoIcon,
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: "link",
    url: profileData.instagram.href,
    color: "#e1306c",
    iconComponent: InstagramLogoIcon,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: "link",
    url: `https://wa.me/${profileData.phone.replace(/\D/g, "")}`,
    color: "#25d366",
    iconComponent: WhatsappLogoIcon,
  },
];

const itemClass =
  "group flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 outline-none select-none transition-colors hover:bg-ide-hover hover:text-ide-heading focus-visible:bg-ide-hover focus-visible:text-ide-heading";

const labelClass =
  "px-2 py-1 text-[11px] tracking-wider text-ide-muted uppercase";

export const useSocialMenu = (): UseSocialMenuProps => {
  return {
    socialLinks,
    itemClass,
    labelClass,
  };
};
