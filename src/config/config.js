const config = {
  port: process.env.PORT || 3000,
  db: {
    host: "localhost",
    user: "root",
    password: "password",
    database: "live_map_db",
  },
  userMaster: {
    username: "admin",
    password: "admin123",
  },
};
export default config;