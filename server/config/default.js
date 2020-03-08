module.exports = {
  host: 'http://localhost:3030',
  port: 3030,
  postgres: process.env.DATABASE_URL || 'postgres://localhost/frequencies',
  title: 'Frequencies',
  favicon: 'favicon.png',
}
