
function get_var(var_name){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == var_name){return pair[1];}
    }
    return(false);
};

function back_to_profile(){
    var uID = get_var("uid");

    window.location.href = "/profile?uid="+ uID;
}

function get_json(callback){
    const selected_models = document.getElementById('selected-models');
    const selected_images = document.getElementById('selected-images');
    const models_lenght = selected_models.childElementCount;
    const images_lenght = selected_images.childElementCount;
    const list_name = document.getElementById('input-list-name');

    if (models_lenght === 0){
        alert("Please select a model!");
    }
    else if (images_lenght === 0){
        alert("Please select an image!");
    }
    else if (list_name.value === ""){
        alert("Please choose a name!");
    }
    else{
        //console.log(location.search.substr(1).split("&")[1].split("=")[1] !== 'undefined');
        let createdList;
        let lid = get_var("lid")
        if(lid !== false){
            createdList = {
                id: lid,
                userID: location.search.substr(1).split("&")[0].split("=")[1],
                list_name: list_name.value,
                list: []
            };
        }else{
            createdList = {
                userID: location.search.substr(1).split("&")[0].split("=")[1],
                list_name: list_name.value,
                list: []
            };
                
        }

        

        for (let i = 0; i < models_lenght; i++) {
            let idNode = selected_models.childNodes[i].id;
            let div = document.getElementById(idNode);
            let nameNode = div.childNodes[1].innerHTML;
            let categoryNode = div.childNodes[2].innerHTML;
            let model = {
                name: nameNode.toString(),
                category: categoryNode.toString(),
                model_id: idNode.toString()
            }
            //console.log(model);
            createdList.list[i] = model;
        }
        callback(createdList, createdList.userID);
    }

}

function send(createdList, callback){
    var data = JSON.stringify(createdList);
    xhr.send(data);
    callback();
}

pubnub = new PubNub({
    publishKey : 'pub-c-4d2acaad-3aef-4fcd-9837-051e2343b799',
    subscribeKey : 'sub-c-fd342394-8aa6-11e8-bdf5-3621de398238'
});



function send_json(){
    xhr = new XMLHttpRequest();
    if(window.location.href.search('/editlist?') == -1){
        var url = "/addlist/done";
    }else {
        var url = "/editlist/done";
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
        }
    }
    get_json(function(createdList, uID){
        send(createdList, function(){
            pubnub.subscribe({
                channels:  [uID],
            });
            pubnub.addListener({
                status: function(statusEvent) {
                },
                message: function(msg) {
                    console.log(msg.message.text);
                    document.getElementById("model_id").innerHTML = msg.message.text;
                    document.getElementById("submit_pw").onclick = function(){
                        window.location.href = "/profile?uid="+ uID;
                    };
                    document.getElementById("modal_ist_id").style.display = "block";
                    pubnub.unsubscribe({
                        channels: [uID],
                    })
                },
                presence: function(presenceEvent) {
                }
            });
        });
    });
}



// function reset_elements() {
//     const selected_models = document.getElementById('selected-models').getElementsByClassName('model-item');
//     const selected_images = document.getElementsByClassName('image-item');
//
//     if (selected_models.length === 0){
//         return;
//     } else {
//         for (let i = 0; i < selected_models.length; i++){
//             document.getElementById('col-mod').appendChild(selected_models[i]);
//             selected_models[i].setAttribute('onclick', 'add_model(this)');
//         }
//         return;
//     }
//
//     if (selected_images.length === 0){
//         return;
//     } else {
//         for (let j = 0; j < selected_images.length; j++){
//             document.getElementById('col-img').appendChild(selected_images[j]);
//             selected_images[j].setAttribute('onclick', 'add_image(this)');
//         }
//         return;
//     }
// }