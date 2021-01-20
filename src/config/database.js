module.exports = {
  dialect: 'postgres',
  host: process.env.HOST || 'localhost',
  port: 5432,
  username: process.env.USER || 'postgres',
  password: process.env.PASSWORD || 'postgres',
  database: process.env.DATABASE || 'dbPanda',
  define: {
    timestamps: true,
    underscored: true,
  },
}