const express = require('express');
const { faker } = require('@faker-js/faker');
const seedrandom = require('seedrandom');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

function generateBooks(seed, page, lang, avgLikes, avgReviews, count = 20) {
    faker.setLocale(lang); // Set locale for Faker
    const rng = seedrandom(`${seed}-${page}`); // Combine seed and page for deterministic RNG
    const books = [];

    for (let i = 0; i < count; i++) {
        const likes = Math.random() < avgLikes % 1 ? Math.ceil(avgLikes) : Math.floor(avgLikes);
        const reviews = Math.random() < avgReviews % 1 ? Math.ceil(avgReviews) : Math.floor(avgReviews);

        books.push({
            index: i + 1 + (page - 1) * count,
            isbn: faker.datatype.uuid(),
            title: faker.lorem.words(3),
            authors: faker.name.fullName(),
            publisher: faker.company.name(),
            reviews: reviews > 0 ? faker.lorem.sentences(reviews) : null,
            likes,
        });
    }

    return books;
}

app.post('/api/books', (req, res) => {
    try {
        const { seed, page, lang, avgLikes, avgReviews } = req.body;

        if (!seed || !page || !lang || avgLikes === undefined || avgReviews === undefined) {
            return res.status(400).json({ error: 'Invalid parameters' });
        }

        const books = generateBooks(seed, page, lang, parseFloat(avgLikes), parseFloat(avgReviews));
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
