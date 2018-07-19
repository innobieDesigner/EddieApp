let config = {}

config.host = process.env.HOST || "https://eddie-platform-db.documents.azure.com/";
config.authKey = process.env.AUTH_KEY || "Uye4jC2lwk7ON7NozxxEYyyLev08IZioGrUnCEwfTBKLL7WtjHKkpHlF4RwjxkqXdoeXcjIAPuE9PZE6fPiDzA==";
config.databaseId = "eddieplatform";
config.user_collectionId = "users";
config.model_collectionId = "models";
config.model_list_collectionId = "model_lists";

module.exports = config;