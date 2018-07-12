function get_json(){
    const selected_models = document.getElementById('selected-models');
    const selected_images = document.getElementById('selected-images');
    const models_lenght = selected_models.childElementCount;
    const images_lenght = selected_images.childElementCount;
    let list = [];

    if (models_lenght === 0){
        alert('Please select a model!');
        return;
    }
    else if (images_lenght === 0){
        alert('Please select an image!');
        return;
    }
    else {for (let i = 0; i < models_lenght; i++){
        let childID = selected_models.childNodes[i].id;
        // list[i] = [childID.toString()];
        let a = childID.toString();
        list.push(a);
    }}



    console.log(list);

    let obj = JSON.parse(list);
    console.log(obj);
}

function reset_elements() {
    const selected_models = document.getElementById('selected-models').getElementsByClassName('model-item');
    const selected_images = document.getElementsByClassName('image-item');

    console.log(selected_models.length);

    if (selected_models.length === 0){
        return;
    } else {
        for (let i = 0; i < selected_models.length; i++){
            document.getElementById('col-mod').appendChild(selected_models[i]);
            selected_models[i].setAttribute('onclick', 'add_model(this)');
        }
        return;
    }

    if (selected_images.length === 0){
        return;
    } else {
        for (let j = 0; j < selected_images.length; j++){
            document.getElementById('col-img').appendChild(selected_images[j]);
            selected_images[j].setAttribute('onclick', 'add_image(this)');
        }
        return;
    }
}