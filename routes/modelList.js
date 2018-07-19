let DocumentDBClient = require('documentdb').DocumentClient;
let async = require('async');
let azureStorage = require('azure-storage');
let blobService = azureStorage.createBlobService('DefaultEndpointsProtocol=https;AccountName=eddieplatformdiag768;AccountKey=CFEjZIolCV+OdGjgGm5dpqeohm1bup9Vq7qn4Qvw40PCQVxxf8br5hUzW2C2A8uVci+iE60D3SPJrnVoe9h8bw==;EndpointSuffix=core.windows.net');

let container = 'model-pics';
//let hostname = 'https://eddieplatformdiag768.blob.core.windows.net/';

function ModelList(userModel) {
    this.userModel = userModel;
}

ModelList.prototype = {

    getModels: function(req, res){
        let self = this;
        let querySpec = {
            query: 'SELECT * FROM c'
        };

        self.userModel.find(querySpec, function(err, model){
            if(err){
                throw err;
            }

            for( let i = 0; i < model.length; i++){
                var url = blobService.getUrl(container, model[i].img);
                model[i].imgLink = url;
                //console.log(url);
            }

            

            res.render('platform_v2', {
                models: model
            })
        })
    },

    getRestModels: function(callback){
        let self = this;
        let querySpec = {
            query: 'SELECT * FROM c'
        }

        self.userModel.find(querySpec, function(err, models){
            if(err){
                callback(err);
            }
            for( let i = 0; i < models.length; i++){
                var url = blobService.getUrl(container, models[i].img);
                models[i].imgLink = url;
                //console.log(url);
            }
            callback(err, models);
        });
    }


};

module.exports = ModelList;