import { LinkedinLogoIcon, InstagramLogoIcon, WhatsappLogoIcon, type IconProps } from "@phosphor-icons/react";

export interface SocialLink {
  id: string;
  label: string;
  icon: string;
  url: string;
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
    url: "https://linkedin.com",
    iconComponent: LinkedinLogoIcon,
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: "link",
    url: "https://instagram.com",
    iconComponent: InstagramLogoIcon,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: "link",
    url: "https://whatsapp.com",
    iconComponent: WhatsappLogoIcon,
  },
];

const itemClass =
  "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 outline-none select-none data-highlighted:bg-ide-hover data-highlighted:text-white";

const labelClass =
  "px-2 py-1 text-[11px] tracking-wider text-ide-muted uppercase";

export const useSocialMenu = (): UseSocialMenuProps => {
  return {
    socialLinks,
    itemClass,
    labelClass,
  };
};
