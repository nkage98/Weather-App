function Nav() {

    return (
        <nav className="px-14 py-0.4">
            <div className="px-6 flex items-center justify-between p-3">
                <div className="flex items-center gap-6">
                    <a href="" className="text-lg font-bold">☀️ Weather App 🌧️</a>
                    <div className="border-l border-stone-400 h-8"></div>
                    <form className="flex items-center" action="post">
                        <p></p>
                        <input className="bg-white border-1 border-gray-400 rounded-xl px-3 py-1 w-64 focus:outline-none focus:ring-1 focus:ring-gray-400" type="text" placeholder="Search City or Zipcode"/>
                    </form>
                    <a href="" className="hover:text-gray-300 font-semibold">Favorites</a>
                </div>
                <div>
                    <a href="" className="pr-4 hover:text-gray-300 font-semibold">Sign in</a>
                </div>
            </div>
            <div className="border-t border-stone-400 rounded-md"></div>
        </nav>
    )

}

export default Nav;