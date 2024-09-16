import { PathNavigator } from "./PathNavigator";

export const PageLayout = ({
  heading,
  children,
  disable_heading = false,
}: {
  heading: string | null;
  children: React.ReactNode;
  disable_heading?: boolean;
}) => {
  return (
    <div className="page-layout">
      <PathNavigator />
      {disable_heading ? "" : <h1>{heading}</h1>}
      {children}
    </div>
  );
};
