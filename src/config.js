var config = {}

config.host = process.env.HOST || "https://eddieplatform.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "d1ymY6codnL3iqMdcKhHKXQsNuGzDkYfhuGKzkQx7EwKaFBvlrly9E7xQidD4PDvqtoskP94PS9seVXgkP5DgQ==";
config.databaseId = "eddieplatform";
config.collectionId = "model_lists";

module.exports = config;
