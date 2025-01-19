import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";

interface CoolSectinProps {
  icon: LucideIcon;
  topic: string;
  heading: string;
  children: React.ReactNode[];
}

const CoolSection = ({
  icon: Icon,
  topic,
  heading,
  children,
}: CoolSectinProps) => {
  return (
    <div className="mx-auto flex flex-col gap-8 py-20 lg:py-40 items-center justify-center border-b">
      <Button size="sm" variant="outline" className="rounded-full">
        <Icon className="w-4 h-4" />
        {topic}
      </Button>

      <h2 className="text-3xl md:text-6xl max-w-2xl tracking-tighter text-center font-regular">
        {heading}
      </h2>

      <div className="flex gap-4 flex-wrap justify-center flex-grow">
        {children}
      </div>
    </div>
  );
};
export default CoolSection;
