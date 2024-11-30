# Backend for Book Store Testing App

## Requirements
- Node.js
- NPM

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. API Endpoint:
   - **POST** `/api/books`
   - Body Parameters:
     - `seed` (string): Seed value for deterministic generation.
     - `page` (number): Page number.
     - `lang` (string): Locale for data (e.g., `en_US`, `de_DE`).
     - `avgLikes` (number): Average likes per book.
     - `avgReviews` (number): Average reviews per book.