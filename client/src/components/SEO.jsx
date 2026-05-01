import { useEffect } from "react";

function setOrCreateMeta(selector, attributes) {
    let element = document.head.querySelector(selector);

    if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
    }

    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
}

export default function SEO({
    title,
    description,
    image,
    url = window.location.href
}) {
    useEffect(() => {
        document.title = title;

        setOrCreateMeta('meta[name="description"]', {
            name: "description",
            content: description,
        });

        setOrCreateMeta('meta[property="og:title"]', {
            property: "og:title",
            content: title,
        });

        setOrCreateMeta('meta[property="og:description"]', {
            property: "og:description",
            content: description,
        });

        setOrCreateMeta('meta[property="og:image"]', {
            property: "og:image",
            content: image,
        });

        setOrCreateMeta('meta[property="og:url"]', {
            property: "og:url",
            content: url,
        });

        setOrCreateMeta('meta[name="twitter:card"]', {
            name: "twitter:card",
            content: "summary_large_image",
        });

        const scriptId = "seo-structured-data";
        let script = document.getElementById(scriptId);

        if (!script) {
            script = document.createElement("script");
            script.type = "application/ld+json";
            script.id = scriptId;
            document.head.appendChild(script);
        }

        script.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ShoppingCenter",
            name: title,
            description,
        });
    }, [description, image, title, url]);

    return null;
}