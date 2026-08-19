export default function Newsletter() {
  return (
    <section className="bg-gradient-to-b from-transparent to-[#f4ebec] py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Gift Icon */}
        <div className="w-12 h-12 bg-rose-brand rounded-full flex items-center justify-center text-white mx-auto mb-6">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          Join The Rose Club
        </h2>
        <p className="text-gray-600 mb-8 font-light text-sm md:text-base">
          Subscribe to receive exclusive offers, early access to new flavours,
          and notes on elegant living.
        </p>

        <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
          <input
            className="flex-1 rounded-full border-none px-6 py-3 text-sm focus:ring-2 focus:ring-rose-brand shadow-sm bg-white outline-none"
            placeholder="Enter your email address"
            required
            type="email"
          />
          <button
            className="bg-gray-900 hover:bg-black text-white rounded-full px-8 py-3 text-sm font-medium transition-colors shadow-sm"
            type="submit"
          >
            Subscribe
          </button>
        </form>

        <p className="text-[10px] text-gray-400 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
