import { ReactElement } from "react";

type RouteItem = {
  path: string;
  name: string;
  icon: ReactElement | string;
  basePath?: string;
  hidden?: boolean;
  component: React.ComponentType;
  redirect?: string;
  children: RouteItem[];
  access?: Role[];
};
