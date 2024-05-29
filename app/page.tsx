import { createClient } from "@/utils/supabase/server";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";

export default async function Index() {
  const supabase = createClient();

  return (
    <a href="/signin">
      <img src="/opengraph.jpg" alt="" className="w-screen h-screen object-cover object-center" />
    </a>
  );
}
