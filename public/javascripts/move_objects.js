function add_model(e){
    const move_element_selected = document.getElementById(e.id);
    document.getElementById('selected-models').appendChild(move_element_selected);

    move_element_selected.setAttribute('onclick', 'remove_model(this)');
}
function remove_model(e){
    const move_element_back = document.getElementById(e.id);
    document.getElementById('col-mod').appendChild(move_element_back);

    move_element_back.setAttribute('onclick', 'add_model(this)');
}


function add_image(e){
    const move_element_selected = document.getElementById(e.id);
    document.getElementById('selected-images').appendChild(move_element_selected);

    move_element_selected.setAttribute('onclick', 'remove_image(this)');
}
function remove_image(e){
    const move_element_back = document.getElementById(e.id);
    document.getElementById('col-img').appendChild(move_element_back);

    move_element_back.setAttribute('onclick', 'add_image(this)');
}