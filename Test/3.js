var Byid = function(id)
{
    return document.getElementById(id);
}


var str = '';
var MX = [];
var MD = [];
var d = [];
var X = [];
var CSK = 0;
var LMX = [];

var Test = function(id)
{
    
    var thisText =  Byid(id).textContent;
    Byid('test11').textContent = thisText;
}

var hy = 0;



function showFile(input) {
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);


    reader.onload = function()
    {
        alert(reader.result);
        str = reader.result.split('&');
    }

    reader.onerror = function() {
        console.log(reader.error);
      };
  }


  Byid('budlo').onclick = function()
  {
    var a = str;
    a.pop();

    for(var i = 0; i < a.length; i++)
    {
        if((i + 1) % 2 != 0)
        {
            MD.push(a[i]); 
        }else
        {
            MX.push(a[i]);
        }
    }

    d = MD[CSK].split(',');
    LMX = MX[CSK].split(';');
    LMX.pop();

    X = LMX[0].split(',');


    for(var i = 0; i < d.length; i++)
    {
        d[i] = +d[i]
    }

    for(var i = 0; i < X.length; i++)
    {
        X[i] = +X[i]
    }

    
    console.log(MD + MX)
    console.log(a);
    console.log('\n'+ d + '\n' + X);
    console.log(LMX.length);
    hy +=2;
  }


  Byid('XInput').style.width = '100px';
  Byid('XInput').style.height = '15px';
  Byid('XInput').onclick = function()
  {
      this.style.height = '300px';
  }



Byid('RuchVod').onclick = function()
{
    var str = '';

    str = Byid('XInput').value;
    alert(str)
}
  