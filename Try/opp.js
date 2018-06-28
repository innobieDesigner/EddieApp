var fs=require('fs');

console.log('Client-side code running');
const button = document.getElementById('myButton');
button.addEventListener('click', function(e) {
    var obj = {
        table: []
     };
     obj.table.push({id: 1, userID:234, model:"Bio1"});
     var data = JSON.stringify(obj);
     //fs.writeFile('MYFILE.json', data);
     console.log(data)
});