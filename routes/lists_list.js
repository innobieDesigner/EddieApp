let DocumentDBClient = require('documentdb').DocumentClient;
let async = require('async');

function ListsList(listsModel) {
    this.listsModel = listsModel;
}

ListsList.prototype = {
    addList: function (req, res) {
        let self = this;
        let item = req.body;

        self.listsModel.addListsItem(item, function (err) {
            if (err) {
                throw err;
            }

            res.redirect('/');
        });
    }
};

module.exports = ListsList;