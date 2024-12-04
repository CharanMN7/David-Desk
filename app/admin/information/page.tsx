import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  router.push("/admin/dashboard");
  return <div>Page</div>;
};
export default Page;
