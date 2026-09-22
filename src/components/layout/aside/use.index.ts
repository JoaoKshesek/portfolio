import { useTranslation } from "react-i18next";

import { useActivityView, type ActivityView } from "@/lib/activity-view";

export interface UseAsideProps {
  view: ActivityView;
  title: string;
}

export const useAside = (): UseAsideProps => {
  const { view } = useActivityView();
  const { t } = useTranslation();

  return { view, title: t(`navigation.${view}`) };
};
