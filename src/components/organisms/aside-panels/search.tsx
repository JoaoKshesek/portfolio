import { useState } from "react";

import { Codicon } from "@/components/atoms/codicon";

export function SearchPanel() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-3 px-3 pb-3">
      <div className="flex items-center gap-2 rounded-md border border-ide-border bg-ide-sidebar px-3 py-2">
        <Codicon name="search" size={16} className="shrink-0 text-ide-muted" />
        <input
          type="text"
          placeholder="Buscar"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="flex-1 bg-transparent text-sm text-ide-fg outline-none placeholder:text-ide-muted"
        />
      </div>

      <p className="text-[13px] text-ide-muted">
        {search
          ? `Nenhum resultado para "${search}"`
          : "Digite para buscar no portfólio."}
      </p>
    </div>
  );
}
