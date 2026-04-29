export default function StorePopup({ store, onClose }) {
    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl p-4 w-80">

            <h2 className="text-lg font-bold">{store.name}</h2>
            <p className="text-sm text-gray-500">{store.category}</p>

            <p className="mt-2 text-sm">{store.description}</p>

            <button
                onClick={onClose}
                className="mt-3 text-sm text-red-500"
            >
                Close
            </button>
        </div>
    );
}