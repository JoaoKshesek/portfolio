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
      className="flex gap-3 py-2 px-3 hover:bg-ide-hover transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between align-center gap-1 w-full">
        <div className="flex items-center gap-3 w-full">

        <img
          src={icon}
          alt={name}
          className="h-10 w-10 rounded object-contain "
          />
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <h3 className="text-xs font-medium text-white line-clamp-2">{name}</h3>
          <p className="text-xs text-ide-muted line-clamp-2">{description}</p>
        </div>
          </div>
        <span className="text-xs text-ide-muted shrink-0 text-white ">{time}</span>
      </div>
    </div>
  );
}
