import Index from "./pages";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default async function Page() {
  return (
    <div>
      <SpeedInsights/>
      <Index/>
    </div>
  );
}
