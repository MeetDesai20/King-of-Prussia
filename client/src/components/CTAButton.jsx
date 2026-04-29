export default function CTAButton({ children }) {
    return (
        <button className="rounded-full bg-white text-black px-6 py-3 font-semibold hover:scale-105 transition">
            {children}
        </button>
    );
}