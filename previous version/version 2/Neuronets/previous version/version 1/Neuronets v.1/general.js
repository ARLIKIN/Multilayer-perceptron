// Начальные параметры
var a;
var sloi;
var X = [];
var W = new Object();
var d = [];
var learningRate = 0.1;
var erro = 0;

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

    
    //функция активации(Сигмоидальная унополярная)
     y =1/(1+Math.exp(-a*u));
     return y;     

 }

// >


//Основной обЪект <

sloi = function(X)
{
    
    var Y = [];
    var KolY = prompt('Укажите сколько нейронов будет в слое',1);
    if (KolY <=0) KolY = 1;
    for(var i =0; i< KolY; i++)
    {
        d[i] = getRandomArbitrary(0,1);
    }
    // Случайная генерация весов
    for(var i = 0; i < KolY; i++)
    {
        W[i] = [];
        for(var j = 0; j < KolX+1;j++)
        {
            W[i][j] = getRandomArbitrary(-1,1);
        }
    }
    // изначальные Y  
    for(var i =0; i < KolY; i++)
    {
        Y[i] = Neuron(X,i)
    }

    console.log
    (
        'Начальные данные' + '\n'+
        'Y: ' + '\n'+ Y + '\n'+
        'W:' + '\n' + W[0]  + '\n'+
        'X' + '\n' + X + '\n'+ '\n'+ '\n'
    )

    //Коррекция весов
    var h = 0;
    var Korrekt = function(flag)
    {
        h++
        if(h>1000){return}
        if(flag == false){
            for(var i = 0; i < KolY; i++)
            {
               
                erro = d[i] - Y[i];
                    for(var j =0; j < KolX+1; j++)
                    {
                        W[i][j] += erro * learningRate;
                    }
            }

            for(var i =0; i < KolY; i++)
                {
                    Y[i] = Neuron(X,i)
                }

            for(var i = 0; i< KolY; i++)
            {
                if(Y[i] != d[i]-0.1)
                {
                    
                    Korrekt(false);
                }else
                {
                    Korrekt(true);
                }
               
            }

            
        }else{return}
    }

    Korrekt(false);
    console.log
    (
        'Ожидаемый результат:' + d + '\n'+
        'Полученый результат:' + Y + '\n' + 
        'Финальные веса: ' + W [0]+ '\n'
    );



}

//>



 //Start
//Входные данные <
 var KolX = parseInt(prompt('Укажите количество входов', 1));
 //d = parseInt(prompt('Укажите ожидаемый результат', 0.55));

 /*for(var i =0; i<KolX; i++)
 {
     X[i] =  parseFloat(prompt('Введите значение ' + i+1 +' входа', 1));  // Задавать значение X в ручную
 }
*/
 for(var i = 0; i< KolX; i++)
 {
     X[i]=getRandomArbitrary(-1,1);
 }
    

 
 sloi(X);

 

 //>

