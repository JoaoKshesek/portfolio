import { useState } from "react";

import { SearchInput } from "@/components/molecules/search-input";

export function SearchPanel() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-3 px-3 pb-3">
      <SearchInput placeholder="Buscar" value={search} onChange={setSearch} />

      <p className="text-[13px] text-ide-muted">
        {search
          ? `Nenhum resultado para "${search}"`
          : "Digite para buscar no portfólio."}
      </p>
    </div>
  );
}
