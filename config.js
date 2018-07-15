let config = {}

config.host = process.env.HOST || "https://eddie-platform-db.documents.azure.com/";
config.authKey = process.env.AUTH_KEY || "Uye4jC2lwk7ON7NozxxEYyyLev08IZioGrUnCEwfTBKLL7WtjHKkpHlF4RwjxkqXdoeXcjIAPuE9PZE6fPiDzA==";
config.databaseId = "test";
config.collectionId = "Users";

module.exports = config;