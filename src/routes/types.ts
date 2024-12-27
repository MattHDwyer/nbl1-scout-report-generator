export interface RouteType {
  private: boolean;
  path: string;
  component: React.ComponentType<any>;
  childRoutes?: RouteType[];
}
