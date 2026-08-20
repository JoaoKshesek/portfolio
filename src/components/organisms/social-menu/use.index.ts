export interface SocialLink {
  id: string;
  label: string;
  icon: string;
  url: string;
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
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: "link",
    url: "https://instagram.com",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: "link",
    url: "https://whatsapp.com",
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
