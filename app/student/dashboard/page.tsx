import { ContentLayout } from "@/components/admin-panel/content-layout";
import { columns, Payment } from "@/components/tables/example/ExampleColumns";
import { ExampleTable } from "@/components/tables/example/ExampleTable";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52g",
      amount: 200,
      status: "processing",
      email: "a@example.com",
    },
    {
      id: "728ed52h",
      amount: 300,
      status: "success",
      email: "ken@example.com",
    },
    {
      id: "728ed52i",
      amount: 400,
      status: "failed",
      email: "jane@example.com",
    },
  ];
}

const Page = async () => {
  const data = await getData();

  return (
    <ContentLayout title="Dashbord">
      <ExampleTable columns={columns} data={data} />
    </ContentLayout>
  );
};

export default Page;
