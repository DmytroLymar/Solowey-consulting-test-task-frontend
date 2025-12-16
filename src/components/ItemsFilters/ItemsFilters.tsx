import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import styles from "./ItemsFilters.module.scss";

type SortValue = "name_asc" | "name_desc" | "price_asc" | "price_desc";

type ItemsFiltersProps = {
  total: number;
};

export function ItemsFilters({ total }: ItemsFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";
  const sort = (searchParams.get("sort") as SortValue) ?? "name_asc";

  const [queryInput, setQueryInput] = useState(initialQuery);

  const [debouncedQuery] = useDebounce(queryInput, 400);

  const sortOptions = useMemo(
    () => [
      { value: "name_asc", label: "Name (A–Z)" },
      { value: "name_desc", label: "Name (Z–A)" },
      { value: "price_asc", label: "Price (low → high)" },
      { value: "price_desc", label: "Price (high → low)" },
    ],
    []
  );

  useEffect(() => {
    setQueryInput(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const next = new URLSearchParams(searchParams);

    const value = debouncedQuery.trim();
    if (!value) next.delete("q");
    else next.set("q", value);

    next.delete("page");

    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);

    if (!value.trim()) next.delete(key);
    else next.set(key, value);

    next.delete("page");
    setSearchParams(next, { replace: true });
  };

  const clearAll = () => {
    setQueryInput("");
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  return (
    <div className={styles.filters}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Search</span>
          <input
            className={styles.input}
            type="search"
            placeholder="Search by name/description…"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Sort</span>
          <select
            className={styles.select}
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value)}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <button type="button" className={styles.clearBtn} onClick={clearAll}>
          Clear
        </button>
      </div>

      <div className={styles.meta}>
        Showing: <b>{total}</b>
      </div>
    </div>
  );
}
