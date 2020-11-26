var Byid = function(id)
{
    return document.getElementById(id);
}


var str = '';

var Test = function(id)
{
    
    var thisText =  Byid(id).textContent;
    Byid('test11').textContent = thisText;
}



function showFile(input) {
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);


    reader.onload = function()
    {
        alert(reader.result);
        str = reader.result;
    }

    reader.onerror = function() {
        console.log(reader.error);
      };
  }


  Byid('budlo').onclick = function()
  {
    var a = str.split(',')
    alert(a[0]);
    console.log(a)
  }
  