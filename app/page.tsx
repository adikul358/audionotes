export default async function Index() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-home-gradient px-12">
      <img src="/home-logo.svg" alt="" className="h-64 max-md:h-48 mb-12 -ml-6" />

      <a href="/signin">
        <button className=" text-white bg-[#2B5DC6] rounded-xl font-semibold px-6 py-2 text-lg shadow-white/50 hover:shadow-white/40 hover:shadow-xl shadow-md ease-out duration-300 transition-all">Get Started</button>
      </a>

    </div>
  );
}
