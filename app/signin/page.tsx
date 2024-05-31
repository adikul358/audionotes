import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

export default function SignIn({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signInWithGoogle = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      console.log(error)
      return redirect("/signin?message=Could not authenticate user");
    }
  
    if (data.url) {
      redirect(data.url)
    }
  };

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const { data: { user } } = await supabase.auth.getUser()
    const checkInserted = await supabase.from("users").select()
    if (checkInserted.data.length == 0) {
      const dbRes = await supabase
        .from("users")
        .insert([{
          id: user.id,
          email: user.email,
        }])
      if (dbRes.error) { console.log(dbRes.error) }
    }
    if (checkInserted.error) { console.log(checkInserted.error) }

    if (error) {
      console.log(error)
      return redirect("/signin?message=Could not authenticate user");
    }

    return redirect("/app");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    let { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error)
      return redirect("/signin?message=Could not authenticate user");
    }

    return redirect("/signin?message=Check email to continue sign in process");
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-[420px] flex-shrink-0 h-screen overflow-y-auto p-8 justify-center shadow-xl z-10">
        <div className="flex flex-col animate-in">
          <img src="/logo.png" alt="logo" className="w-16 mx-auto mb-4" />
          <h1 className="mb-12 font-semibold text-center text-3xl text-blue-800">AudioNotes</h1>
          <form>
            <SubmitButton
              formAction={signInWithGoogle}
              className="flex flex-row py-2 border border-gray-400 rounded-lg w-full justify-center items-center"
              pendingText="Signing In with Google..."
            >
              <svg className="h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="-3 0 262 262" preserveAspectRatio="xMidYMid">
                <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>
              </svg>
              Sign In with Google
            </SubmitButton>
          </form>
          <p className="my-4 text-center text-sm text-gray-600 ">Or</p>
          <form>
            <input id="email" name="email" type="email" placeholder="Email" required autoFocus className="py-2 px-4 border border-gray-400 rounded-lg w-full" />
            <input id="current-password" name="password" type="password" placeholder="Password" required className="py-2 px-4 border border-gray-400 rounded-lg w-full mt-3" />
            <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
            <SubmitButton
              formAction={signIn}
              className="flex flex-row py-2 bg-blue-800 text-white/90 rounded-lg w-full justify-center align-center mt-6"
              pendingText="Signing In..."
            >
              Sign In
            </SubmitButton>
            <SubmitButton
              formAction={signUp}
              className="flex flex-row py-[6px] border-2 border-blue-800 text-blue-800 rounded-lg w-[calc(100%)] justify-center align-center mt-3"
              pendingText="Signing Up..."
            >
              Sign Up
            </SubmitButton>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-red-700 text-center">
                {searchParams.message}
              </p>
            )}
          </form>
        </div>
      </div>
      <div className="w-full h-screen bg-gradient-to-tr from-blue-800 to-sky-300 z-0"></div>
    </div>
  );
}
