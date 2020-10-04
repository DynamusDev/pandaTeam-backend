module.exports = {
  dialect: 'postgres',
  host: process.env.HOST || 'localhost',
  port: 5432,
  username: process.env.USER || 'alexandre',
  password: process.env.PASSWORD || 'q1w2e3r4',
  database: process.env.DATABASE || 'dbPanda',
  define: {
    timestamps: true,
    underscored: true,
  },
}