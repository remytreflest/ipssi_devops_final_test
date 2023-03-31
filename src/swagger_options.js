const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Swagger Powered By La moutarde MAILLE aux TREFLEST d'Eure-et-Loir, produite dans les Yvelines",
            version: "0.1.0",
            description:
                "Voici le swagger de l'API",
            license: {
                name: "IPSSI DevOps",
                url: "https://ipssi/argent/dons/coco/trefle/avotreboncoeur.html",
            },
            contact: {
                name: "Corentin Maille | Rémy Treflest",
                url: "https://www.youtube.com/watch?v=dOAHI0ez33c&list=PLk-5xhVUCgm4yZLLGcZ8uEtaThOn3SAIg",
                email: "AOE2DE@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

module.exports = {
    options
}