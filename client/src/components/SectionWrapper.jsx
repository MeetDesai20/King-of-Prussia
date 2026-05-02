export default function SectionWrapper({ children, className = "" }) {
    return (
        <section 
            className={`relative w-full px-6 md:px-16 py-12 md:py-16 mb-0 opacity-0 animate-fadeInUp ${className}`}
            style={{
                animation: "fadeInUp 0.8s ease-out forwards",
            }}
        >
            {children}
        </section>
    );
}