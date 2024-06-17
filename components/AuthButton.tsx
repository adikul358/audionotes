import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data } = await supabase.from("users").select();
  const avatar_url = data[0].avatar_url;

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/signin");
  };

  return user ? (
    <div className="flex flex-row items-center border-2 border-blue-800 rounded-full">
			<div className="flex flex-row items-center p-1 pr-3">
        {avatar_url ? (
          <img src={avatar_url} className="w-6 h-6 rounded-full object-cover object-center" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        )}
				<Link href="/account"><span className="ml-2 hover:text-blue-600 transition-colors ease duration-300">{user.email}</span></Link>
			</div>
      <form action={signOut}>
				<button className="w-[32px] h-[32px] flex items-center justify-center text-sm text-white bg-blue-800 rounded-full ml-3" type="submit">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
					</svg>
				</button>
      </form>
		</div>
  ) : (
    <span>No User</span>
  );
}
