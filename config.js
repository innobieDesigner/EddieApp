let config = {}

config.host = process.env.HOST || "https://eddie-platform-db.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "Uye4jC2lwk7ON7NozxxEYyyLev08IZioGrUnCEwfTBKLL7WtjHKkpHlF4RwjxkqXdoeXcjIAPuE9PZE6fPiDzA==";
config.databaseId = "eddieplatform";
config.models_collectionId = "models";
config.lists_collectionId = "model_lists";
config.users_collectionId = "users";

module.exports = config;