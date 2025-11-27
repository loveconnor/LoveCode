export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fluxly",
    url: "https://fluxly.com/",
    logo: "https://fluxly.com/favicon.ico",
    sameAs: [
        "https://github.com/fluxly-dev/fluxly",
        "https://twitter.com/fluxlydev",
        "https://www.linkedin.com/company/fluxly-dev/",
    ],
};

export const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What kinds of things can I design with Fluxly?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "You can prototype, ideate, and create websites from scratch with Fluxly",
            },
        },
        {
            "@type": "Question",
            name: "Why would I use Fluxly?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "When you design in Fluxly you design in the real product – in other words, the source of truth. Other products are great for ideating, but Fluxly is the only one that lets you design with the existing product and the only one that translates your designs to code instantly.",
            },
        },
        {
            "@type": "Question",
            name: "Who owns the code that I write with Fluxly?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The code you make with Fluxly is all yours. You can export it on your local machine or publish it to a custom domain.",
            },
        },
    ],
};
