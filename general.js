// Начальные параметры
    var Byid = function(id)
    {
        return document.getElementById(id);
    }
    var a;
    var it;
    var OutputSloi;
    var X = [];
    var Y = new Object();
    var W = new Object();
    var d = [];
    var learningRate;
    var erro = 0;
    var KolYInput;
    var KolYHidensloi=[];
    var KolYOutput;
    var counter = 0;
    var error = 0;
    var err = [];
    var hob =0
    var counterKorrekt = 0;
    var errors = '';
    var Windex = [];

    



  Byid('button').onclick = function()
  {
    Byid('dowland').hidden = false;

    a;
    it;
    OutputSloi;
    X = [];
    Y = new Object();
    W = new Object();
    d = [];
    learningRate;
    erro = 0;
    KolYInput;
    KolYHidensloi=[];
    KolYOutput;
    counter = 0;
    error = 0;
    err = [];
    hob =0
    counterKorrekt = 0;
    errors = '';
    Windex = [];
    function getRandomArbitrary(min, max)
        {
        return Math.random() * (max - min) + min;
        }
      
    a = document.getElementById(id="aInput").value;
    it =  Byid('iterInput').value;
    learningRate  = Byid('learningRateInput').value;
    document.getElementsByClassName('resultat').hidden = true;
    
    X = Byid('XInput').value.split(',');
    for(var i =0; i < X.length; i++)
    {
        X[i] = +X[i];
    }
    KolX = X.length

    KolYInput = +Byid('OneSloi').value;

    KolYHidensloi = Byid('HidenSloi').value.split(',');
    for(var i = 0; i < KolYHidensloi.length; i++)
    {
        KolYHidensloi[i] = +KolYHidensloi[i];
    }

    d = Byid('dInput').value.split(',');
    KolYOutput = d.length;
    for(var i = 0; i < d.length; i++)
    {
        d[i] = +d[i];
    }
    
    d.reverse();






  
//Нейрон <
 function Neuron(X,m)
 {
     
        var u = 0;
        var y = 0;
        u = W[m][0];
    //Суматор(X1*W1 + X2*W2...Xn*Wn)
     for(var i = 0 ; i < X.length; i++)
        {
            u += X[i] + W[m][i+1];
        }

        // функция Хевисайда
        /*if (u <= 0)
        {
            y = 0
        }else
        {
            y = 1;
        }
        */
    //функция активации(Сигмоидальная унополярная)
     y =1/(1+Math.exp(-a*u));
     return y;     

 }

// >

    //Генерация весов
    var GeneratWight = function(KolY, t)
    {
      if(t==1)
        {
            for(var i = 0; i < KolY; i++)
            {
                W[Wlength+i] = [];
                for(var j = 0; j < Y[Ylength-1].length+1;j++)
                {
                    W[Wlength+i][j] = getRandomArbitrary(-1,1);
                }
            }
        }else
        {
            for(var i = 0; i < KolY; i++)
            {
                W[i] = [];
                for(var j = 0; j < KolX+1;j++)
                {
                    W[i][j] = getRandomArbitrary(-1,1);
                }
            }   
        }
    }

//Входной слой <

OutputSloi = function(X)
    {
    Y[0] = [];
    if (KolYInput <=0) KolYInput = 1;
    // Случайная генерация весов
    
    GeneratWight(KolYInput,0);
    // изначальные Y  
    for(var i =0; i < KolYInput; i++)
    {
        Y[0][i] = Neuron(X,i)
    }

    }

HidenSloi = function(nm) // Скрытый слой
    {
        Ylength = Object.keys(Y).length; // длины объектов
        Wlength = Object.keys(W).length; //
        var KolV; 

        Y[Ylength] = []; 
        if (KolYHidensloi <=0) KolYHidensloi[nm-1] = 1;
            KolV = KolYHidensloi[nm-1];
        // Случайная генерация весов
        
        GeneratWight(KolV,1);
        // изначальные Y  
        for(var i =0; i < KolYHidensloi[nm-1]; i++)
        {
            Y[Ylength][i] = Neuron(Y[Ylength-1],Wlength+i); 
        }
    }

    
InputSloi = function() // Выходной слой
    {
        Ylength = Object.keys(Y).length; // длины объектов
        Wlength = Object.keys(W).length; // 
        Y[Ylength] = [];
    
        if (KolYOutput <=0) KolYOutput = 1;
        // Случайная генерация весов
        
        GeneratWight(KolYOutput,1);
        // изначальные Y  
        for(var i =0; i < KolYOutput; i++)
        {
            Y[Ylength][i] = Neuron(Y[Ylength-1],Wlength+i);
        }
    
    }



    //Коррекция W
    

    var KorrektHiddenSloi= function(err) // Корректировка скрытых слоев и входного слоя
    {
        var mob;
        var KOlYhidesl = KolYHidensloi;
        KOlYhidesl.unshift(KolYInput);
        var o = KOlYhidesl.length-1;
        var hob =0;
        var countSloi = KolSLOI + 1;
        var itoger= []
        var kolNSloi = 0;
        var errLeng = error.length;
        mob = Y[o].length;
        for(var i = err.length-1; i >= 0; i--)
        {
                
                error[i] = KorrektError(error,i,hob,countSloi,kolNSloi,errLeng);
                hob++
                for(var p = W[err[i]].length-1; p >= 0; p--)
                    {
                        if(i <=KolYInput-1)
                        {
                            if (p == 0){W[err[i]][p] += Multiplier(Y[o][0],error,i); continue}
                            W[i][p] += Multiplier(Y[0][i],error,0) * learningRate * X[p-1];
                        }else if (p == 0)
                        {
                            W[err[i]][p] += Multiplier(Y[o][0],error,i); 
                        }else
                        {
                            W[err[i]][p] += Multiplier(Y[o][mob-1],error,i) * learningRate * Y[o-1][p-1]; // здесь ошибка
                        }
                       
                    }
                    mob--
                    if(hob == KOlYhidesl[o] && i !=0)
                        {
                            errLeng -= Y[o+1].length;
                            o--
                            kolNSloi += Y[countSloi].length
                            countSloi--
                            hob = 0;
                            mob = Y[o].length;
                        }
                    
        }      
        KolYHidensloi.shift();
    }

    var KorrektError = function(error,i,hob,countSloi,kolNSloi,errLeng)
    {
        var l = errLeng;
        var sum=0;
        var Index =[];
        var ERORW=[];
        var h=0
        var b =0
        for(var j = Wlength-1-kolNSloi; j >= 0 ; j--,b++ )
            {
                if(b< Y[countSloi].length)
                {
                    Index[j] = j;  
                }
            }


        for(var j = Index.length-1; j >=Index.length-Y[countSloi].length; j--, h++)
            {
                ERORW.unshift(W[Index[j]][W[Index[j]].length-1 - hob] + error[l-1 - h]);
            }   

            for(var j = 0; j < ERORW.length; j++)
            {
                sum += ERORW[j]
            }

        return sum; 
    } 


    var Minus = function(input,nm)
    {
        var err = d[nm] - input[nm];
        return err
    }

    var Multiplier = function(y,err,i)
    {
        var result;
        result = ((1-y)*y)*a*err[i];
        return result; 
    }

    var Korrekt = function(flag,X)
    {
        if (flag){return}

        Ylength = Object.keys(Y).length;
        Wlength = Object.keys(W).length;
        var abc = 0;
        var cba = 0;
        error = [0];
        //Коррекция весов выходного слоя
        for(var i = 0; i < d.length; i++ )
        {
            err[i] = Minus(Y[Ylength-1],i);
            err[i] = Multiplier(Y[Ylength-1][i],err,i);
            
            error[Wlength-1-i] = err[i];
            
            for(var j =0; j <= KolYHidensloi[KolYHidensloi.length-1]; j++ )
            {
                if (j == 0)
                {
                    W[Wlength-1-i][j] += err[i] * learningRate;
                }else
                {
                    W[Wlength-1-i][j] += err[i] * learningRate * Y[Ylength-2][j-1];
                }
            }

        }
        
        for(var i = 0; i < err.length; i++)
        {
            console.log(err[i] + '\n');
        }
        //Коррекция весов скрытых слоев
          
            for(var j = Wlength-1-KolYOutput; j >= 0 ; j-- )
            {
              Windex[j] = j;
              
            }
        

        KorrektHiddenSloi(Windex);

        

        


        // Корректировка Y
            
                
                
                    for(var j = 0; j < KolYInput;j++)
                    {
                        Y[0][j] = Neuron(X,j);
                        
                    }
                

   
                        for(var h = 0; h < KolYHidensloi.length;h++)
                        {

                            for(var j =0; j < KolYHidensloi[h]; j++)
                            {
                                Y[h+1][j] = Neuron(Y[h],j+KolYInput+abc); 
                            }
                        abc += KolYHidensloi[h];
                        }

                        
                        for(var p =0; p < KolYOutput; p++)
                            {
                                Y[Ylength-1][p] = Neuron(Y[Ylength-2],p+(Wlength-KolYOutput) );
                            }
            
            counterKorrekt++
    }    



 //Start
    //формирование входного слоя
    OutputSloi(X);

    //формирование скрытых слоёв
    var KolSLOI = KolYHidensloi.length
    for(var i = 0; i < KolSLOI; i++)
    {
        HidenSloi(i+1);
    }

    //формирование выходного слоя
    InputSloi();
    
 //генерация ожидаемых значений


     

    var Rezultat= function(tic)
    {
        //Результат
        var str = ''
        var itog = ''
        var c =0;
        var y = 'Финальные выходы: </br> Y = </br>';
        var w = 'Финальные веса: </br> W = </br>';
        Byid('dowland').hidden = true;
        document.getElementsByClassName('resultat').hidden = true;
        
        console.log('Y = ' )
        for(var i = 0; i < Object.keys(Y).length; i++)
        {
            console.log(Y[i] + '\n');
            y += Y[i] + '</br>';
        }
        document.getElementById('Y').innerHTML = y;

        console.log('\n'+'W = ')
        for(var i =0; i< Object.keys(W).length; i++)
        {
            console.log(W[i] + '\n');
            w += W[i] + '</br>'
            c++
        }
        document.getElementById('W').innerHTML = w;

        console.log('\n'+'X = ' + X + '\n');
        Byid('X').innerHTML = 'Входные данные: </br> X = ' + '</br>' + X;
        console.log('\n'+'a = ' + a +'\n');
        Byid('a').innerHTML = 'a: ' + '</br>' + a;
        console.log('\n'+'d = '+ d + '\n');
        d.reverse();
        Byid('d').innerHTML ='d: ' + '</br>' + d;
        Byid('learningRate').innerHTML = 'Скорость обучения: '+learningRate;
        Byid('iter').innerHTML = 'Количество итераций = ' + tic;
        

        str += 'Ожидаемые значения:' + '\n';
        itog += 'Ожидаемые значения:' + '</br>';
        
        for(var i =0; i < d.length; i++)
        {
            str += d[i].toFixed(4) + '\n'
            itog += d[i].toFixed(4) + '</br>'
        }

        str +='\n'+ 'Фактические значения:' + '\n';
        itog += 'Фактические значения:' + '</br>';
        for(var i =0; i<d.length; i++)
        {
            str +=Y[Object.keys(Y).length - 1][i].toFixed(4) + '\n';
            itog += Y[Object.keys(Y).length - 1][i].toFixed(4) + '</br>'
        }
        console.log(str)
        Byid('itog').innerHTML = itog;
        
        Byid('struktura').innerHTML = 
        'Структура нейросети:' + "</br>"+
        'Входной слой:' + KolYInput + '</br>'+
        'Скрытый слой:' + KolYHidensloi + '</br>'+
        'Выходной слой:' + KolYOutput + '</br>' + 
        'Количество нейронов в сети:' + c + '</br>'+
        'Функция активации: Сигмоидальная унополярная';
                                    
    }
    var y = 'Первые выходы Y:  </br>'
    for(var i = 0; i < Object.keys(Y).length; i++)
        {
            
            y += Y[i] + '</br>';
        }
        document.getElementById('oldY').innerHTML = y;

    var w = 'Первые веса W:  </br>'
    for(var i =0; i< Object.keys(W).length; i++)
        {
                
            w += W[i] + '</br>';
        }
        document.getElementById('oldW').innerHTML = w;    

        // обучение
    var tic =0;
        while(+d[0].toFixed(4) != +Y[Ylength-1][0].toFixed(4) && +d[d.length-1].toFixed(4) != +Y[Ylength-1][Y[Ylength-1].length-1] &&tic < it )
            {
                Korrekt(false,X);
                tic++
            }

            Rezultat(tic);
            
 //>

}

//Распознавание

