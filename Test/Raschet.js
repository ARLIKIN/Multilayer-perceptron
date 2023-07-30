var Error31 = 0.1175165743;

var W=[-0.1874765970225165];


var Error21=0;

for(var i = 0; i < W.length; i++)
{
    Error21 += Error31*W[i];
}

console.log(Error21)
Error21 = Error21 * ((1 - 0.58948370867)* 0.58948370867)*0.8;

console.log(Error21);