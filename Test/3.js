var Byid = function(id)
{
    return document.getElementById(id);
}


var Test = function(id)
{
    
    var thisText =  Byid(id).textContent;
    Byid('test11').textContent = thisText;
}