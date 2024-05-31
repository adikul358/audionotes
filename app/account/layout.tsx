import AuthButton from "@/components/AuthButton";
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

    <div className="flex flex-col p-12 h-[calc(100vh-68px)] overflow-y-auto">

  		{children}
    
    </div>

    </>
  );
}
