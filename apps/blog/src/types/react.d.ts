import type { ExoticComponent, PropsWithChildren } from "react";

declare module "react" {
  export interface ViewTransitionProps {
    name?: string;
    className?: string;
    children?: React.ReactNode;
  }

  export const ViewTransition: ExoticComponent<
    PropsWithChildren<ViewTransitionProps>
  >;
}
