var Byid = function(id)
{
 return document.getElementById(id);
}

var Byclass = function(clas)
{
    return document.getElementsByClassName(clas);
}


var canvas;
var ctx

var idCanva = 0;
Byid('button').onclick = function()
{
    idCanva +=1 
    
    Byid('allcanvas').innerHTML += '<canvas class="canvasALL" width="100" height="100" background-color="black" id="' + idCanva +'"></canvas>' 
}

Byid('button2').onclick = function()
{
    for(var i = 1; i <=idCanva; i++)
    {
        canvas = Byid(i);
        ctx = canvas.getContext("2d");
        canvas.width = 1000;
        canvas.height = 1000;
        ctx.lineWidth = 0,5;
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0, 1, 1000);//вертикальная ось
        ctx.fillRect(0,500,1000,1);// горизонтальная ось
        ctx.font = '10px Verdana';
        ctx.strokeText('_90',0,50)
        ctx.strokeText('_80',0,100);
        ctx.strokeText('_70',0,150)
        ctx.strokeText('_60',0,200)
        ctx.strokeText('_50',0,250)
        ctx.strokeText('_40',0,300)
        ctx.strokeText('_30',0,350)
        ctx.strokeText('_20',0,400)
        ctx.strokeText('_10',0,450)

        ctx.strokeText('_-10',0,550)
        ctx.strokeText('_-20',0,600)
        ctx.strokeText('_-30',0,650)
        ctx.strokeText('_-40',0,700)
        ctx.strokeText('_-50',0,750)
        ctx.strokeText('_-60',0,800)
        ctx.strokeText('_-70',0,850)
        ctx.strokeText('_-80',0,900)
        ctx.strokeText('_-90',0,950)


        //Горизонтальные линии
        var p = 10;
        for(var j = 50; j <= 1000; j+=50,p+=10)
        {
            ctx.strokeText('|',j,504);
            if(p !=200)
            {
                ctx.strokeText(p,j-8,495)
            }
        }

    }
}

Byid('delete').onclick = function()
{
    var colekt = Byclass('canvasALL');
    if(colekt)
    {
        var colektLength = colekt.length-1;
        for(var i = colektLength; i >= 0; i--)
        {
            colekt[i].remove();
        }
    }
    idCanva=0;
}





Byid('button3').onclick = function()
{

}


var VhodnoiSLOI =2;
var HidenSLOI = [6,6];
var VihodnoiSLOI = 2;

var canvas  = Byid('StrukturaCanvas');
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;


var SLOI = [VhodnoiSLOI];

for(var i = 0; i < HidenSLOI.length; i++)
{
    SLOI[i+1] = HidenSLOI[i];
}
SLOI.push(VihodnoiSLOI);


ctx.fillStyle = 'black'






for(var i = 0; i < SLOI.length; i++)
{
    for(var j = 0; j < SLOI[i]; j++)
    {
        ctx.fillRect(i*(800/SLOI.length-1)+10,j*(500/SLOI[i])+((500/SLOI[i])/3),80,50);
    }
}


for(var i = 0; i < SLOI.length; i++)
{
    for(var j = 0; j < SLOI[i]; j++)
    {
        for(var h = 1; h <= SLOI[i+1]; h++)
        {
            ctx.moveTo(85+(i*(800/SLOI.length-1)),30+j*(500/SLOI[i])+((500/SLOI[i])/3));
            ctx.lineTo
                (
                (i+1)*(800/SLOI.length-1)+10,//x
                25+h*(500/SLOI[i+1])+((500/SLOI[i+1])/3)-(500/SLOI[i+1])//y
                );
            ctx.stroke();
        }
    }
}




//Структура SVG



var Rect = function(x,y,W,H)
{
    return '<rect x="'+x+'" y="'+y+'" width="'+W+'" height="'+H+'"/>'
}

var Line = function(x1,y1,x2,y2,color)
{
    return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" />';
}

var Circle= function(x,y,r,color)
{
    return '<circle fill = "'+color+'" cx="'+x+'" cy="'+y+'" r="'+r+'"/>'
}



var VhodnoiSLOI =3;
var HidenSLOI = [11,10];
var VihodnoiSLOI = 4;

var SLOI = [VhodnoiSLOI];

for(var i = 0; i < HidenSLOI.length; i++)
{
    SLOI[i+1] = HidenSLOI[i];
}
SLOI.push(VihodnoiSLOI);


Byid('DIV_StrukturaSVG').innerHTML = '<svg class="svg" id="StrukturaSVG" width = "800" height = "500" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"></svg>';

var Holst = Byid('StrukturaSVG');

var color;
for(var i = 0; i < SLOI.length; i++)
{
    color = 'green'
    if(i == 0)
    {
        color = 'blue'
    }
    if(i == SLOI.length-1)
    {
        color = 'red'
    }
    for(var j = 0; j < SLOI[i]; j++)
    {
        Holst.innerHTML +=Circle(i*(800/SLOI.length-1)+30,j*(500/SLOI[i])+((500/SLOI[i])/3)+20,25,color)
        //Holst.innerHTML +=Rect(i*(800/SLOI.length-1)+10,j*(500/SLOI[i])+((500/SLOI[i])/3),80,50);
    }
}

for(var i = 0; i < SLOI.length; i++)
{
    for(var j = 0; j < SLOI[i]; j++)
    {
        for(var h = 1; h <= SLOI[i+1]; h++)
        {
            Holst.innerHTML += Line(55+(i*(800/SLOI.length-1)),j*(500/SLOI[i])+((500/SLOI[i])/3)+20,(i+1)*(800/SLOI.length-1)+5,h*(500/SLOI[i+1])+((500/SLOI[i+1])/3)-(500/SLOI[i+1])+20,'black')
        }
    }
}





var colekt = Byclass('li');


for(var i = 0; i < colekt.length-1; i++)
{
    colekt[i].onclick = function()
    {
        colekt[i].innerHTML = 'a'
    }
}






























