import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <p>This part is for testing purposes only</p>
      <Button asChild>
        <Link href="/admin/dashboard">Admin Dashbaord</Link>
      </Button>
    </div>
  );
};
export default Page;
