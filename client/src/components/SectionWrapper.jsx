export default function SectionWrapper({ children, className = "" }) {
    return (
        <section className={`relative w-full min-h-screen px-6 md:px-16 py-24 ${className}`}>
            {children}
        </section>
    );
}