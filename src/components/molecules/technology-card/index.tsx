interface TechnologyCardProps {
  icon: string;
  name: string;
  description: string;
  time: string;
  onClick?: () => void;
}

export function TechnologyCard({
  icon,
  name,
  description,
  time,
  onClick,
}: TechnologyCardProps) {
  return (
    <div
      className="flex gap-3 rounded-md p-3 hover:bg-ide-hover transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between align-start gap-3 w-full">
        <img
          src={icon}
          alt={name}
          className="h-12 w-12 rounded object-contain shrink-0"
        />
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white">{name}</h3>
          <p className="text-xs text-ide-muted line-clamp-2">{description}</p>
        </div>
        <span className="text-xs text-ide-muted shrink-0">{time}</span>
      </div>
    </div>
  );
}
