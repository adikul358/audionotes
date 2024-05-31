import AuthButton from "@/components/AuthButton";
import SideNav from "@/components/SideNav";
import checkUnlocked from "@/utils/supabase/checkUnlocked";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
	const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const unlocked = await checkUnlocked()

  if (!user) {
    return redirect("/signin");
  }

  return (
    <>
    <nav className="sticky z-10 bg-white inset-x-0 top-0 flex flex-row items-center justify-between px-12 py-4 shadow-md">
      <Link href="/app">
      <div className="flex flex-row items-center">
        <img src="/logo.png" alt="logo" className="w-8 mr-1"/>
        <span className="text-3xl font-semibold text-blue-800">AudioNotes</span>
      </div>
      </Link>
      <AuthButton />
    </nav>

    <SideNav unlocked={unlocked} />

    <div className="flex flex-col p-12 ml-24 h-[calc(100vh-68px)] overflow-y-auto">

  		{children}
    
    </div>

    </>
  );
}
