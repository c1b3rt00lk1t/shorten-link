const { sql } = require("@vercel/postgres");

async function createShortenLinkTable() {
  try {
    await sql`
            CREATE TABLE IF NOT EXISTS shorten_link (
                id SERIAL PRIMARY KEY,
                url VARCHAR(512) NOT NULL,
                short_id VARCHAR(8) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
  } catch (error) {
    console.log("Error creating shorten_link table: ", error);
    throw error;
  }
}

(async () => {
  await createShortenLinkTable();
})();
