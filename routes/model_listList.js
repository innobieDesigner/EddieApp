let DocumentDBClient = require('documentdb').DocumentClient;
let async = require('async');



let PubNub = require('pubnub');


let UserModel = require('../models/userModel');
let ModelList = require('./modelList');
const config = require('../config');

let docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
  });
let modelModel = new UserModel(docDbClient, config.databaseId, config.model_collectionId);
let model_List = new ModelList(modelModel);
modelModel.init();

let pubnub = new PubNub({
    publishKey: 'pub-c-4d2acaad-3aef-4fcd-9837-051e2343b799',
    subscribeKey: 'sub-c-fd342394-8aa6-11e8-bdf5-3621de398238'
});

function aListUpdated(list_id){
    pubnub.subscribe({
        channel: [list_id]
    });
    var publishConfig = {
        channel: list_id,
        message: {
            text: "Something changed"
        }
    }

    pubnub.publish(publishConfig, function(status, response){
        console.log(status, response);
    })
}



function Model_listList(userModel) {
    this.userModel = userModel;
}

Model_listList.prototype = {
    addModelList: function(req, res){
        let self = this;
        let modelList = req.body;

        model_List.getRestModels(function(err, models){
            if(err) throw err;
            let modelIds = [];
            for(let i = 0; i < models.length; i++){
                modelIds += models.id;
            };
            let id;
            do {
                id = Math.floor(100000 + Math.random() * 900000).toString();
            } while (modelIds.includes(id));
            modelList.id = id;
            self.userModel.addUser(modelList, function (err, doc) {
                if (err) {
                    console.log(err);
                    throw err;
                } 

                let pubnub = new PubNub({
                    publishKey: 'pub-c-4d2acaad-3aef-4fcd-9837-051e2343b799',
                    subscribeKey: 'sub-c-fd342394-8aa6-11e8-bdf5-3621de398238'
                });
                
                pubnub.subscribe({
                    channel: [doc.userID],
                });
                var publishConfig = {
                    channel: req.body.userID,
                    message: {
                        text: id
                    }
                };
            
                pubnub.publish(publishConfig, function(status, response){
                    console.log(status, response);
                });
                
            });

        });

    },

    showModelLists: function(user, callback){
        let self = this;
        let querySpec = {
            query: 'SELECT * FROM c WHERE c.userID = "' + user.id +'"'
        };
        //console.log(querySpec);
        self.userModel.find(querySpec, function(err, modelList){
            if(err){
                console.log(err);
                callback(err);
            }
            //console.log(modelList);
            callback(err, modelList);
        });
    },

    getModelList: function(req, res){
        let self = this;
        let querySpec = {
            query: 'SELECT * FROM c WHERE c.id = "' + req.query.lid +'"'
        }

        self.userModel.find(querySpec, function(err, modelList){
            if(err){
                throw err;
            }
            model_List.getRestModels(function(err, models){
                if(err) throw(err);

                let selected = [];
                let notSelected = [];
                let isSelected = false;
                
                for(var i = 0; i < models.length; i++){
                    isSelected = false;
                    for(var j = 0; j < modelList[0].list.length; j++){
                        if(models[i].id === modelList[0].list[j].model_id){
                            isSelected = true;
                        }
                    }
                    /* console.log(isSelected); */
                    if(isSelected === true){
                        selected.push(models[i]);
                    } else {
                        notSelected.push(models[i]);
                    }
                }
                /* console.log(selected);
                console.log('+++++++++++++++++++');
                console.log(notSelected); */
                res.render('platform_v2', {
                    listName: modelList[0].list_name,
                    selected: selected,
                    models: notSelected
                });
            });
            
        });
        req.query.lid
    },

    editModelList: function(req, res){
        let self = this;
        let updatedList = req.body;

        /* console.log('************');
        console.log(updatedList); */
        self.userModel.updateUser(updatedList.id, updatedList, function(err) {
            if(err) throw err;

            let pubnub = new PubNub({
                publishKey: 'pub-c-4d2acaad-3aef-4fcd-9837-051e2343b799',
                subscribeKey: 'sub-c-fd342394-8aa6-11e8-bdf5-3621de398238'
            });
            
            pubnub.subscribe({
                channel: [updatedList.userID],
            });
            var publishConfig = {
                channel: updatedList.userID,
                message: {
                    text: updatedList.id
                }
            };
        
            pubnub.publish(publishConfig, function(status, response){
                console.log(status, response);
            });

            aListUpdated(req.body.id);
        });

    }
}

module.exports = Model_listList;