import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import styles from "./ItemsFilters.module.scss";

type SortValue = "name_asc" | "name_desc" | "price_asc" | "price_desc";

const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: "name_asc", label: "Name (A → Z)" },
  { value: "name_desc", label: "Name (Z → A)" },
  { value: "price_asc", label: "Price (low → high)" },
  { value: "price_desc", label: "Price (high → low)" },
];

type Props = {
  total: number;
};

export function ItemsFilters({ total }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const qParam = (searchParams.get("q") ?? "").trim();
  const sort = (searchParams.get("sort") as SortValue) ?? "name_asc";

  const [qInput, setQInput] = useState(qParam);
  const [qDebounced] = useDebounce(qInput, 400);

  useEffect(() => {
    setQInput(qParam);
  }, [qParam]);

  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    const value = qDebounced.trim();

    if (value) next.set("q", value);
    else next.delete("q");

    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qDebounced]);

  const onSortChange = (value: SortValue) => {
    const next = new URLSearchParams(searchParams);
    next.set("sort", value);
    setSearchParams(next, { replace: true });
  };

  const clear = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("q");
    setSearchParams(next, { replace: true });
  };

  return (
    <div className={styles.filters}>
      <div className={styles.row}>
        <div className={styles.field}>
          <span className={styles.label}>Search</span>
          <input
            className={styles.input}
            value={qInput}
            onChange={(e) => setQInput(e.target.value)}
            placeholder="Search items..."
          />
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Sort</span>
          <select
            className={styles.select}
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortValue)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className={styles.clearBtn}
          type="button"
          onClick={clear}
          disabled={!qParam}
        >
          Clear
        </button>
      </div>

      <div className={styles.meta}>{total} item(s)</div>
    </div>
  );
}
