import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface CoolCardProps {
  heading: string;
  description: string;
  image: string;
}

const CoolCard = ({ heading, description, image }: CoolCardProps) => {
  return (
    <Card className="min-w-[320px] max-w-xl mx-4 w-full stretch">
      <CardHeader>
        <CardTitle className="text-xl font-regular">{heading}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={image} alt="" className="border rounded-sm" />
      </CardContent>
    </Card>
  );
};
export default CoolCard;
