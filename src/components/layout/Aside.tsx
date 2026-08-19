export function Aside() {
  return (
    <aside className="w-56 shrink-0 overflow-y-auto border-r border-ide-border bg-ide-sidebar">
      <h3 className="px-4 py-2 text-[11px] font-normal tracking-wider text-ide-muted uppercase">
        Explorer
      </h3>
      <ul className="text-[13px] text-ide-fg">
        <li className="cursor-pointer px-4 py-0.5 hover:bg-ide-hover">Skills</li>
        <li className="cursor-pointer px-4 py-0.5 hover:bg-ide-hover">Experience</li>
        <li className="cursor-pointer px-4 py-0.5 hover:bg-ide-hover">Education</li>
      </ul>
    </aside>
  );
}
