const sequelize = require("../config/connection");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const seedBlogData = require("./blogData");
const seedCommentData = require("./commentData");
const seedUserData = require("./userData");

const sessionConfig = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 60 * 60 * 24 * 1000, // 1 day in milliseconds
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const seedAllData = async () => {
  await sequelize.sync({ force: true });

  await seedUserData();
  await seedBlogData();
  await seedCommentData();
  process.exit(0);
};

seedAllData();
