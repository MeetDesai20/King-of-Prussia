export default function SectionWrapper({ children, className = "" }) {
    return (
        <section 
            className={`relative w-full px-6 md:px-16 py-8 md:py-10 mb-6 opacity-0 animate-fadeInUp ${className}`}
            style={{
                animation: "fadeInUp 0.8s ease-out forwards",
            }}
        >
            {children}
        </section>
    );
}