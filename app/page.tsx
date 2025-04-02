export default async function Index() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-home-gradient px-12">
      <img src="/home-logo.svg" alt="" className="h-64 max-md:h-48 mb-12 -ml-6" />

      <a href="/signin">
        <button className="bg-white text-blue-800 hover:text-white hover:bg-blue-800 rounded-xl font-semibold px-6 py-2 text-lg hover:shadow-white/50 shadow-black/30 shadow-xl ease-out duration-300 transition-all">Get Started</button>
      </a>

    </div>
  );
}
