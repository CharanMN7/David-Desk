import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  router.push("/admin/dashboard");
  return <></>;
};
export default Page;
