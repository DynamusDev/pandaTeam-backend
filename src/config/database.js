module.exports = {
  dialect: 'postgres',
  host: process.env.HOST || 'localhost',
  port: 5432,
  username: process.env.USER || 'postgres',
  password: process.env.PASSWORD || 'Amasi@198',
  database: process.env.DATABASE || 'dbPanda',
  define: {
    timestamps: true,
    underscored: true,
  },
}