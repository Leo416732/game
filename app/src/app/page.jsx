import { About } from "@/components/About";
import CrazygoatText from "@/components/CrazygoatText";
import Tournaments from "@/components/Tournaments";
import { getTournaments } from "@/services/getService";

export default async function Home() {
  const data = await getTournaments();

  return (
    <main className="w-full inline-grid gap-12">
      <CrazygoatText />
      <About />
      <Tournaments data={data?.data?.tournoments} />
    </main>
  );
}
