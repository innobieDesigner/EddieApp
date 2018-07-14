let DocumentDBClient = require('documentdb').DocumentClient;
let docdbUtils = require('./cosmosdb_manager.js');
let get_json = require('../public/javascripts/export_list');

function ListsModel(documentDBClient, databaseId, collectionId) {
    this.client = documentDBClient;
    this.databaseId = databaseId;
    this.lists_collectionId = collectionId;

    this.database = null;
    this.collection = null;
}

ListsModel.prototype = {
    init: function (callback) {
        let self = this;

        docdbUtils.getOrCreateDatabase(self.client, self.databaseId, function (err, db) {
            if (err) {
                callback(err);
            } else {
                self.database = db;
                docdbUtils.getOrCreateCollection(self.client, self.database._self, self.collectionId, function (err, coll) {
                    if (err) {
                        callback(err);
                    } else {
                        self.collection = coll;
                    }
                });
            }
        });
    },

    addListsItem: function (item, callback) {
        let self = this;

        item.date = Date.now();
        item = function get_json() {
            const selected_models = document.getElementById('selected-models');
            const selected_images = document.getElementById('selected-images');
            const models_lenght = selected_models.childElementCount;
            const images_lenght = selected_images.childElementCount;

            let models = {};

            console.log(models);

            let createdList = {
                id: "2",
                userID: "0",
                name: document.getElementById('input-list-name').value,
                list: {}
            };

            for (let i = 0; i < models_lenght; i++) {
                let a = selected_models.childNodes[i].id;
                let model = a.toString();
                createdList.list[i + 1] = model;
            }

            console.log(createdList);

            self.client.createDocument(self.collection._self, item, function (err, doc) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, doc);
                }
            });
        }
    }
};

module.exports = ListsModel;