require('dotenv').config();

module.exports = {
    "migrationDirectory": "migrations",
    "driver": "pg",
    "connectionString": (process.env.NODE_ENV === 'test')
        ? process.env.TEST_DATABASE_URL
        : "postgres://eeotnogc:jTUCY7jmw45JqVGz8IHZz2a2ndVyy7g2@mouse.db.elephantsql.com/eeotnogc",
    "ssl": !!process.env.SSL,
}   