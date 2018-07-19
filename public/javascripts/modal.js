const modal_school = document.getElementById('edit_school');
const modal_pw = document.getElementById('edit_pw');
const modal_btn_school = document.getElementById('close_school');
const modal_btn_pw = document.getElementById('close_pw');

function school_edit () {
    modal_school.style.display = "block";
}
modal_btn_school.onclick = function () {
    modal_school.style.display = "none";
};

function pw_edit () {
    modal_pw.style.display = "block";
}
modal_btn_pw.onclick = function () {
    modal_pw.style.display = "none";
};