const Section = ({
  heading,
  children,
  disable_heading = false,
}: {
  heading: string;
  children: React.ReactNode;
  disable_heading: boolean;
}) => {
  return (
    <section className="section">
      <h2>{heading}</h2>
      {children}
    </section>
  );
};
export default Section;
