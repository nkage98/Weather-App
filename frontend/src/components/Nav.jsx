function Nav() {

    return (
        <nav className="px-20 py-0.4">
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-6">
                    <a href="" className="text-lg font-bold">☀️ Weather App 🌧️</a>
                <div className="h-6 border-l border-gray-600"></div>
                    <a href="" className="hover:text-gray-300 font-semibold">Favorites</a>
                </div>
                <div>
                    <a href="" className="pr-10 hover:text-gray-300 font-semibold">Sign in</a>
                </div>
            </div>
        </nav>
    )

}

export default Nav;