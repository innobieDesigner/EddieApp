<?php
function get_data(){
$connect=mysqli_connect("localhost", "root", "root", "openingpage");
$query="SELECT * FROM created_list ";
$result=mysqli_query($connect, $query);
$list_data=array();
while($row=mysqli_fetch_array($result)){
    $list_data[]=array(
        'ModelID'   => $row["ModelID"],
        'ImageID'   => $row["ImageID"],
        'ListID'    => $row["ListID"]
    );
}
return json_encode($list_data);
}

$file_name=/*date('d-m-Y')*/"AFAJL".'.json';
if(file_put_contents($file_name,get_data())){
   echo $file_name.' file created';    
}
else{
    echo 'There is some error';
}
?>