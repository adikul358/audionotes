import { createClient } from "@supabase/supabase-js"
require('dotenv').config()

// export async function GET(request: Request) {

// 	const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, {
// 		auth: {
// 			autoRefreshToken: false,
// 			persistSession: false
// 		}
// 	})
// 	const ress = await supabase.from("users")
// 		.select()
// 		.eq('email', 'captain@plane.so')
// 	const res = await supabase.from("users")
// 		.update({ unlocked: 1 })
// 		.eq('email', 'captain@plane.so')
// 	console.log(ress)
// 	console.log(res)

// 	return new Response(null, {status: 200})
	

// }

export async function POST(request: Request) {
	const { payload } = await request.json()
	const email = payload.payment.entity.email

	const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, {
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	})

	const res = await supabase.from("users")
		.update({ unlocked: 1 })
		.eq('email', email)
	console.log(res)

	return new Response(null, {status: 200})
	

}