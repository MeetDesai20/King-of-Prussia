export default function Sidebar({
    search,
    setSearch,
    category,
    setCategory,
    level,
    setLevel
}) {
    return (
        <div className="absolute left-6 top-6 w-80 bg-white rounded-2xl shadow-xl p-4">

            {/* SEARCH */}
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search stores..."
                className="w-full p-3 rounded-full bg-gray-100 outline-none"
            />

            {/* CATEGORY */}
            <div className="flex flex-wrap gap-2 mt-4">
                {["all", "Food & Drink", "Luxury Fashion", "Retail & Market"].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-3 py-1 rounded-full text-sm ${category === cat
                                ? "bg-black text-white"
                                : "bg-gray-200"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* FLOOR SWITCH */}
            <div className="flex gap-2 mt-4">
                {["UL", "ML", "LL"].map(lvl => (
                    <button
                        key={lvl}
                        onClick={() => setLevel(lvl)}
                        className={`px-4 py-1 rounded-full ${level === lvl
                                ? "bg-pink-500 text-white"
                                : "bg-gray-200"
                            }`}
                    >
                        {lvl}
                    </button>
                ))}
            </div>
        </div>
    );
}