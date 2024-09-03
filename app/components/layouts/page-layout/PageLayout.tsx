import { PathNavigator } from "./PathNavigator";

export const PageLayout = ({
  heading,
  children,
}: {
  heading: string | null;
  children: React.ReactNode;
}) => {
  return (
    <div className="page-layout">
      <PathNavigator />
      <h1>{heading}</h1>
      {children}
    </div>
  );
};
