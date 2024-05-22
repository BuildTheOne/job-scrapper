import { columns } from "./job/columns";
import JobTable from "./job/table";
import { Job } from "./job/types";

async function Home() {
  const jobRequest = await fetch(`${process.env.API_URL}/api/job`);
  const jobResponse = await jobRequest.json();
  const jobData: Job[] = jobResponse.data;

  return (
    <main className="flex flex-col px-12 py-8 gap-8">
      <h1 className="text-center font-bold text-2xl">Home</h1>
      <JobTable data={jobData} columns={columns} />
    </main>
  );
}

export default Home;
