import RazorpayButton from "@/components/RazorpayButton";
import { createClient } from "@/utils/supabase/server";

export default async function AccountPage() {
	const supabase = createClient();
	const { data: { user } } = await supabase.auth.getUser();
	const { data } = await supabase.from("users").select();
	const unlocked = data[0].unlocked == 1

	return (
    <div className="flex flex-col flex-grow">
			<h1 className="font-semibold text-3xl">Account</h1>
			<h2 className=" text-gray-600 mb-12">{user.email}</h2>
			{unlocked ? (
				<p className="text-lg text-blue-600 font-semibold">You have unlocked all features</p>
			) : (
				<RazorpayButton />
			)}
		</div>
	)
}