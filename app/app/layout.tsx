import AuthButton from "@/components/AuthButton";
import { ChatIcon, FolderIcon, PlusIcon } from "@/components/Icons";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
	const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/signin");
  }

  return (
    <>
    <nav className="sticky z-10 bg-white inset-x-0 top-0 flex flex-row items-center justify-between px-12 py-4 shadow-md">
      <div className="flex flex-row items-center">
        <img src="/logo.png" alt="logo" className="w-8 mr-1"/>
        <span className="text-3xl font-semibold text-blue-800">AudioNotes</span>
      </div>
      <AuthButton />
    </nav>

    <nav className="absolute top-0 bottom-0 left-0 flex flex-col justify-center items-center px-3 space-y-3">
			<Link href="/app">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-800 text-white">
          <PlusIcon className="size-[30px]"/>
        </div>
      </Link>
			<Link href="/app/notes">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-800 text-white">
          <FolderIcon className="size-[30px]"/>
        </div>
      </Link>
			<Link href="/app/chat">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-800 text-white">
          <ChatIcon className="size-[30px]"/>
        </div>
      </Link>
    </nav>

    <div className="flex flex-col p-12 ml-24 h-[calc(100vh-68px)] overflow-y-auto">

  		{children}
    
    </div>

    </>
  );
}
