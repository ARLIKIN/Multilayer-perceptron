    var Ylength;
    var Wlength;
    
    var W = new Object();
    W[0] = [1,3,5,7];
    W[1] = [3,5,7];
    console.log(W[7].length);



    var a =  -31.6700631177829;
    var b = 0.3684378203835319;
     b += a*b*0.1;
    console.log(b);

    -5.2783438529638165
    var Y = new Object();
    Y[0] = [1,5,8,3];

    console.log(Object.keys(Y).length)






    //Скрытый слой
    HidenSloi = function(Y)
    {
        Ylength = Object.keys(Y).length; // длины объектов
        Wlength = Object.keys(W).length; // 

        Y[Ylength] = [];

        var KolY = prompt('Укажите сколько нейронов будет в скрытом слое',1);
        if (KolY <=0) KolY = 1;

        // Случайная генерация весов
        for(var i = 0; i < KolY; i++)
        {
            W[Wlength+i] = [];
            for(var j = 0; j < Y[Ylength-1].length+1;j++)
            {
                W[Wlength+i][j] = getRandomArbitrary(-1,1);
            }
        }
        // изначальные Y  
        for(var i =0; i < KolY; i++)
        {
            Y[Ylength][i] = Neuron(Y[Ylength-1],i)
        }

        console.log(Y)
   
    }


    //Выходной слой
    OutputSloi = function()
    {
        Ylength = Object.keys(Y).length; // длины объектов
        Wlength = Object.keys(W).length; // 
    
        Y[Ylength] = [];
    
        var KolYOutput = parseInt(prompt('Укажите сколько нейронов будет в выходном слое',2));
        if (KolYOutput <=0) KolYOutput = 1;
    
        // Случайная генерация весов
        for(var i = 0; i < KolYOutput; i++)
        {
            W[Wlength+i] = [];
            for(var j = 0; j < Y[Ylength-1].length+1;j++)
            {
                W[Wlength+i][j] = getRandomArbitrary(-1,1);
            }
        }
        // изначальные Y  
        for(var i =0; i < KolYOutput; i++)
        {
            Y[Ylength][i] = Neuron(Y[Ylength-1],Wlength+i);
        }
    
    }


    //Входной
    for(var i = 0; i < KolYInput; i++)
    {
        W[i] = [];
        for(var j = 0; j < KolX+1;j++)
        {
            W[i][j] = getRandomArbitrary(-1,1);
        }
    }
    //Скрытый
    for(var i = 0; i < KolYHidensloi; i++)
    {
        W[Wlength+i] = [];
        for(var j = 0; j < Y[Ylength-1].length+1;j++)
        {
            W[Wlength+i][j] = getRandomArbitrary(-1,1);
        }
    }

    // Выходной
    for(var i = 0; i < KolYOutput; i++)
        {
            W[Wlength+i] = [];
            for(var j = 0; j < Y[Ylength-1].length+1;j++)
            {
                W[Wlength+i][j] = getRandomArbitrary(-1,1);
            }
        }

