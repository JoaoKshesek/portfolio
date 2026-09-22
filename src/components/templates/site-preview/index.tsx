interface SitePreviewProps {
  url: string;
  title: string;
}

export function SitePreview({ url, title }: SitePreviewProps) {
  return (
    <iframe
      src={url}
      title={title}
      className="min-h-0 w-full flex-1 border-0 bg-white"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      referrerPolicy="no-referrer"
    />
  );
}
