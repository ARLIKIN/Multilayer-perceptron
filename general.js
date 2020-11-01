// Начальные параметры
var a;
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

function getRandomArbitrary(min, max)
  {
  return Math.random() * (max - min) + min;
  }
  
  a = getRandomArbitrary(0.1,0.9);



  
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
     KolYInput = 2//parseInt(prompt('Укажите сколько нейронов будет во входном слое',2));
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

            KolYHidensloi[nm-1] = 6//parseInt(prompt('Укажите сколько нейронов будет в скрытом слое №'+nm ,1));
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
    
        KolYOutput = 2//parseInt(prompt('Укажите сколько нейронов будет в выходном слое',2));
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
      var o = KolYHidensloi.length-1;
      var hob =0;
      var mob;
      var countSloi = KolSLOI + 1;
      var itoger= []

      mob = Y[o+1].length;
        for(var i = err.length-1; i >= 2; i--)
        {
                hob++
                itoger[0] = KorrektError(error,i,hob,countSloi);
                for(var p = W[err[i]].length-1; p >= 0; p--)
                    {
                        if (p == 0)
                        {
                            W[err[i]][p] += Multiplier(Y[o+1][0],error,0); 
                        }else
                        {
                            W[err[i]][p] += Multiplier(Y[o+1][mob-1],error,0) * learningRate * Y[o][p-1]; // здесь ошибка
                        }
                        //preSloi--
                    }
                    mob--
                    if(hob == KolYHidensloi[o])
                        {
                            
                            error[0] = error[1] * KolYHidensloi[o];  
                            o--
                            countSloi--
                            hob = 0;
                            mob = Y[o+1].length;

                            //preSloi = Y[o].length;
                        }
                    
        }      
    }

    var KorrektError = function(error,i,hob,countSloi)
    {
        for(var j =0 ; j < Y[countSloi].length; j++)
        {
            error.unshift(W[j][hob] + error[j])                //NevError += W[j][hob] + error//[?]
        } 
    } 

    var KorrektVhodSloi = function()
    {
        var mob = Y[0].length;
        for(var i = KolYInput-1; i >=0; i--)
        {
            for(var j = W[i].length-1; j >= 0; j--)
            {
                if (j == 0)
                    {
                        W[i][j] += Multiplier(Y[1][0],error,0);
                    }else
                        {
                            W[i][j] += Multiplier(Y[0][i],error,0) * learningRate * X[j-1]; 
                        }
            }
            mob--
        }
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
            
            error[i] = err[i];
            
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
          var Windex = [];
          
            for(var j = Wlength-1-KolYOutput; j >= 0 ; j-- )
            {
              Windex[j] = j;
              
            }
        

        KorrektHiddenSloi(Windex);

        KorrektVhodSloi();

        //console.log('\n'+'Корректировка весов прошла'+'\n');


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
//Входные данные <
    learningRate = 0.0001//parseFloat(prompt('Укажите скорость обучения(используйте точку)',0.0001));
    var KolX = 4//parseInt(prompt('Укажите количество входов', 6));
 
 /*for(var i =0; i<KolX; i++)
 {
     X[i] =  parseFloat(prompt('Введите значение ' + i+1 +' входа', 1));  // Задавать значение X в ручную
 }
*/
//генерация входный данных
    for(var i = 0; i< KolX; i++)
    {
         X[i]=getRandomArbitrary(-1,1);
    }
    

    //формирование входного слоя
    OutputSloi(X);

    //формирование скрытых слоёв
    var KolSLOI = 2//parseInt(prompt('Укажите количество скрытых слоёв',0));
    for(var i = 0; i < KolSLOI; i++)
    {
        HidenSloi(i+1);
    }

    //формирование выходного слоя
    InputSloi();
    //d = parseInt(prompt('Укажите ожидаемый результат', 0.55));
 //генерация ожидаемых значений
        for(var i = 0; i < KolYOutput; i++)
        {
            d[i] = getRandomArbitrary(-1,1);
        }


        
        

            

     //Результат

    var Rezultat= function()
    {
        var str = ''
        console.log('Y = ' )
        for(var i = 0; i < Object.keys(Y).length; i++)
        {
            console.log(Y[i] + '\n');
        }

        console.log('\n'+'W = ')
        for(var i =0; i< Object.keys(W).length; i++)
        {
            console.log(W[i] + '\n');
        }

        console.log('\n'+'X = ' + X + '\n');
        console.log('\n'+'a = ' + a +'\n');
        console.log('\n'+'d = '+ d + '\n');
        console.log('\n' + 'error входного слоя = ' + errors + '\n');

        str += 'Ожидаемые значения:' + '\n';
        for(var i =0; i < d.length; i++)
        {
            str += d[i].toFixed(4) + '\n'
        }

        str +='\n'+ 'Фактические значения:' + '\n';
        for(var i =0; i<d.length; i++)
        {
            str +=Y[Object.keys(Y).length - 1][i].toFixed(4) + '\n';
        }
        console.log(str)
    }

    var tic =0;
        while(+d[0].toFixed(4) != +Y[Ylength-1][0].toFixed(4) & tic < 20)
            {
                Korrekt(false,X);
                tic++
            }

            Rezultat();
            
 //>

