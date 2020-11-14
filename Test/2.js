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
