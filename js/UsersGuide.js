var Byid = function(id)
{
    return document.getElementById(id);
}

Byid('Glava2').onclick = function()
{
    window.scrollTo(pageXOffset, 5500);
}

Byid('Glava1').onclick = function()
{
    window.scrollTo(pageXOffset, 500);
}