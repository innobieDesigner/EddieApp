let DocumentDBClient = require('documentdb').DocumentClient;
let docdbUtils = require('./cosmosdb-manager');

function UserModel(DocumentDBClient, databaseId, collectionId){
    this.client = DocumentDBClient;
    this.databaseId = databaseId;
    this.collectionId = collectionId;

    this.database = null;
    this.collection = null;
}

UserModel.prototype = {
    init: function(callback){
        let self = this;

        docdbUtils.getOrCreateDatabase(self.client, self.databaseId, function(err, db) {
            if(err) {
                callback(err);
            } else{
                self.database = db;
                docdbUtils.getOrCreateCollection(self.client, self.database._self, self.collectionId, function(err, coll) {
                    if(err){
                        callback(err);
                    } else{
                        self.collection = coll
                    }
                });
            }
        });
    },

    find: function(querySpec, callback){
        let self = this;

        self.client.queryDocuments(self.collection._self, querySpec).toArray(function(err, result) {
            if(err){
                //console.log(err.body);
                callback(err);
            } else{
                //console.log(result);
                callback(null, result);
            }
        });
    },

    addUser: function(user, callback){
        let self = this;

        user.regDate = Date.now();

        self.client.createDocument(self.collection._self, user, function(err, doc) {
            if(err){
                callback(err);
            } else{
                callback(null, doc);
            }
        });
    },

    getUserId: function(userId, callback) {
        let self = this;
        let querySpec = {
            query: 'SELECT * FROM root r WHERE r.id = @id',
            parameters: [
                {
                    name: '@id',
                    value: userId
                }
            ]
        };

        self.client.queryDocuments(self.collection._self, querySpec).toArray(function(err, result) {
            if(err){
                callback(err);
            } else{
                callback(null, result[0]);
            }
        });
    }

};

module.exports = UserModel;