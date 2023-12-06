import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";

export default function usePagePath() {
  const { t } = useTranslation();
  const location = useLocation();
  const paths = useMemo(
    () => location.pathname.replace(/^\/|\/$/g, "").split("/"),
    [location.pathname]
  );

  const result: { name: string; url?: string }[] = paths.reduce(
    (prev, item) => {
      return [
        ...prev,
        {
          name: t(item as any),
          url: `${prev.at(-1)?.url ?? ""}/${item}`
        }
      ];
    },
    [{ name: "", url: window.location.origin }]
  );

  delete result.at(-1)?.url;

  return result.slice(1);
}
