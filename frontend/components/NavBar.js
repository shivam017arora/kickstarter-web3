import { ConnectButton } from "web3uikit";

export default function NavBar() {
  return (
    <div className="w-full container mx-auto p-6">
      <div className="w-full flex items-center justify-between">
        <a
          className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          href="/"
        >
          <svg
            className="h-8 fill-current text-indigo-600 pr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-5.6-4.29a9.95 9.95 0 0 1 11.2 0 8 8 0 1 0-11.2 0zm6.12-7.64l3.02-3.02 1.41 1.41-3.02 3.02a2 2 0 1 1-1.41-1.41z" />
          </svg>{" "}
          Decentralized Fund Raising
        </a>
        <div className="flex w-1/2 justify-end content-center">
          <a
            className="inline-block text-blue-300 no-underline hover:text-underline text-center h-10 p-2 mt-2 md:h-auto md:p-4"
            href="create"
          >
            <button>Create New Project</button>
          </a>
          <a className="inline-block text-blue-300 no-underline hover:text-indigo-800 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4">
            <ConnectButton moralisAuth={false} />
          </a>
        </div>
      </div>
    </div>
  );
}
