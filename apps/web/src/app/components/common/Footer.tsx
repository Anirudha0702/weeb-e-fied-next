function Footer() {
  return (
    <footer className="w-full bg-neutral-900 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left content */}
        <div className="text-sm text-neutral-400">
          <p className="text-neutral-200 font-medium">
            Copyright © weeb. All Rights Reserved
          </p>
          <p className="mt-1 text-xs">
            This site does not store any files on its server. All contents are
            provided by non-affiliated third parties.
          </p>
        </div>

        {/* Right button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="self-start sm:self-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-200 backdrop-blur transition hover:bg-white/10"
        >
          Up to top
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}

export default Footer;
