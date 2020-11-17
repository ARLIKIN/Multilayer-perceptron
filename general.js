// Начальные параметры
    var Byid = function(id)
    {
        return document.getElementById(id);
    }
    var a;
    var it;
    var OutputSloi;
    var X = [];
    var Y = {};
    var W = {};
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
    var AllError;
    var tic =0;
    var Bool = true;

    





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


  Byid('button').onclick = function()
  {
      tic = 0;
    Byid('dowland').textContent = 'Подождите пока нейросеть обучится';

        var colekt = document.getElementsByClassName('canvas');
        if(colekt)
        {
            var colektLength = colekt.length-1;
            for(var i = colektLength; i >= 0; i--)
            {
                colekt[i].remove();
            }
        }
    

    a;
    it;
    OutputSloi;
    X = [];
    Y = {};
    W = {};
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
    AllError = {};
    Bool = true;

    
    function getRandomArbitrary(min, max)
        {
        return Math.random() * (max - min) + min;
        }
      
    a = document.getElementById(id="aInput").value;
    it =  parseInt(Byid('iterInput').value);
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
        AllError[tic] = error;
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
        //Byid('dowland').hidden = true;
        document.getElementsByClassName('resultat').hidden = true;
        Byid('RezultatH1').hidden = false;
        
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


        
        if(Byid('checkGrafik').checked)
        { 
            var b = tic;
            if(b>=10000)
            {
                b = parseInt(tic*0.001)
            }
            for(var i =1; i <=10; i++)
            {
                if(b == i * 1000)
                {
                    b = parseInt(tic*0.001)
                }
            }
            if(b > 100000)
            {
                b = parseInt(tic*0.001)
            }

            GrafALL(b);
        }

        if(Byid('checkGrafikNeuron').checked)
        { 
            var b = tic;
            if(b>=10000)
            {
                b = parseInt(tic*0.001)
            }
            for(var i =1; i <=10; i++)
            {
                if(b == i * 1000)
                {
                    b = parseInt(tic*0.001)
                }
            }
            if(b > 100000)
            {
                b = parseInt(tic*0.001)
            }

            GrafALL(b);
        }


        console.log('\n'+ 'Первые ошибки' + '\n')
        var errstr = 'Ошибки на 1 итерации :' + '</br>'
        for(var i = 0; i < AllError[0].length; i++)
        {
            console.log(AllError[0][i] + '\n');
            errstr += AllError[0][i]+'</br>'
        }
        errstr += '</br>'+'</br>'+ 'Ошибки на последней итерации' + '</br>';
        for(var i = 0; i < AllError[Object.keys(AllError).length-1].length; i++)
        {
            errstr += AllError[Object.keys(AllError).length-1][i]+'</br>'
        }

        Byid('error').innerHTML = errstr;
        Byid('dowland').textContent = 'Нейросеть прошла обучение';
        console.log(Object.keys(AllError).length)
        Byid('Raspoznovanie_div').hidden = false;


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
    
        while(Bool)
            {
                if(tic >= it){break}
                for(var i = 0; i < d.length; i++)
                {
                    if(+Y[Ylength-1][i].toFixed(1) != +d[i].toFixed(1))
                    {
                        break;
                    }
                }

                if(i != d.length-1)
                {
                    
                    Korrekt(false,X);
                    tic++
                }else{break}
            }

            Rezultat(tic);
            
 //>

}
a = 2
//График

var GrafALL= function(b)
{

    var CanvaSTR=''
    for(var i = 0; i < AllError[0].length; i++)
    {
        CanvaSTR +='<canvas class="canvas" id="canva' + i +'">нейрон №</canvas>'; 
    }
    Byid('canvasALL').innerHTML = CanvaSTR; 
    for(var i = 0; i < AllError[0].length; i+=1)
    {
        canvas = Byid('canva'+i);
        if(Math.abs(AllError[0][i]) >100)
        {
            Osi(i,canvas,10,0)
            Grafik(i,canvas,0.01,b)
        }
        if(Math.abs(AllError[0][i]) >1 && Math.abs(AllError[0][i]) <100)
        {
            Osi(i,canvas,1,0)
            Grafik(i,canvas,0.1,b)
        }
        if(Math.abs(AllError[0][i]) >1 && Math.abs(AllError[0][i]) <10)
        {
            Osi(i,canvas,0.1,0)
            Grafik(i,canvas,1,b)
        }
        if(Math.abs(AllError[0][i]) < 1 && Math.abs(AllError[0][i]) >=0.1)
        {
            Osi(i,canvas,0.01,1)
            Grafik(i,canvas,10,b)
        }
        if(Math.abs(AllError[0][i])<0.1 && Math.abs(AllError[0][i]) > 0.01)
        {
            Osi(i,canvas,0.001,2)
            Grafik(i,canvas,100,b)
        }
        if(Math.abs(AllError[0][i]) < 0.01 && Math.abs(AllError[0][i]) >=0.001)
        {
            Osi(i,canvas,0.0001,3)
            Grafik(i,canvas,1000,b)
        }
        if(Math.abs(AllError[0][i])<0.001 && Math.abs(AllError[0][i]) >= 0.0001)
        {
            Osi(i,canvas,0.00001,4)
            Grafik(i,canvas,10000,b)
        }
        if(Math.abs(AllError[0][i])<0.0001 && Math.abs(AllError[0][i]) >=0.00001)
        {
            Osi(i,canvas,0.000001,5)
            Grafik(i,canvas,100000,b)
        }
        if(Math.abs(AllError[0][i]) <0.00001 && Math.abs(AllError[0][i]) >=0.000001)
        {
            Osi(i,canvas,0.0000001,6)
            Grafik(i,canvas,1000000,b)
        }
        if(Math.abs(AllError[0][i]) <0.000001 && Math.abs(AllError[0][i]) >=0.0000001)
        {
            Osi(i,canvas,0.00000001,7)
            Grafik(i,canvas,10000000,b)
        }
        if(Math.abs(AllError[0][i]) <0.0000001 && Math.abs(AllError[0][i]) >=0.00000001)
        {
            Osi(i,canvas,0.00000001,8)
            Grafik(i,canvas,10000000,b)
        }


        


    }
}
//Отрисовка графика 


var Grafik = function(i,canvas,mn,b)
    {
        var h =1;
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = 'red';
        for(var j =0; j < Object.keys(AllError).length; j+=b*2)
        {
            if(j == 0)
            {
                ctx.moveTo(j,500-(AllError[j][i]*mn*50));
                continue;
            }

                ctx.lineTo(h,500-(AllError[j-b][i]*mn*50));
                ctx.lineTo(h+1,500-(AllError[j][i]*mn*50));

                h+=2;
            
        }
        ctx.stroke();
        /* Линия из конца в начало координатной оси
        ctx.strokeStyle = 'blue';
        ctx.moveTo(h,500-(AllError[Object.keys(AllError).length-1][i]*mn*mashtab))
        ctx.lineTo(0,500-(AllError[Object.keys(AllError).length-1][i]*mn*mashtab));
        ctx.stroke();
        */
    }

var Osi = function(i,canvas,mn,fix)
{
        ctx = canvas.getContext("2d");
        canvas.width = 1000;
        canvas.height = 1000;
        ctx.lineWidth = 0,5;
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0, 1, 1000);//вертикальная ось
        ctx.fillRect(0,500,1000,1);// горизонтальная ось
        ctx.font = '10px Verdana';
        ctx.strokeText('_'+(90*mn).toFixed(fix),0,50)
        ctx.strokeText('_'+(80*mn).toFixed(fix),0,100);
        ctx.strokeText('_'+(70*mn).toFixed(fix),0,150)
        ctx.strokeText('_'+(60*mn).toFixed(fix),0,200)
        ctx.strokeText('_'+(50*mn).toFixed(fix),0,250)
        ctx.strokeText('_'+(40*mn).toFixed(fix),0,300)
        ctx.strokeText('_'+(30*mn).toFixed(fix),0,350)
        ctx.strokeText('_'+(20*mn).toFixed(fix),0,400)
        ctx.strokeText('_'+(10*mn).toFixed(fix),0,450)

        ctx.strokeText('_'+(-10*mn).toFixed(fix),0,550)
        ctx.strokeText('_'+(-20*mn).toFixed(fix),0,600)
        ctx.strokeText('_'+(-30*mn).toFixed(fix),0,650)
        ctx.strokeText('_'+(-40*mn).toFixed(fix),0,700)
        ctx.strokeText('_'+(-50*mn).toFixed(fix),0,750)
        ctx.strokeText('_'+(-60*mn).toFixed(fix),0,800)
        ctx.strokeText('_'+(-70*mn).toFixed(fix),0,850)
        ctx.strokeText('_'+(-80*mn).toFixed(fix),0,900)
        ctx.strokeText('_'+(-90*mn).toFixed(fix),0,950)


        //Горизонтальные линии
        //var p = 50;
        for(var j = 50; j <= 1000; j+=50/*,p+=10*mn*/)
        {
            ctx.strokeText('|',j,504);
            if(j !=1000)
            {
                ctx.strokeText(j,j-8,495)
            }
        }
        //Номер нейрона
        if(AllError[i].length<9)
        {
            ctx.font = '20px Times New Roman';
        }else
        {
            ctx.font = '15px Times New Roman';
        }
        var nomer = i+1
        ctx.strokeText('Нейрон №'+nomer,900,14);

        ctx.strokeText('Ошибка',10,14);
        ctx.strokeText('Итерация',900,480)
}    

//Распознование


Byid('button2').onclick= function()
{
    var count = 0;
    var str = 'Результат распознования: </br>';
    var Ylength = Object.keys(Y).length
    X = Byid('XRaspoznovanie').value.split(',');
    for(var i =0; i < X.length; i++)
    {
        X[i] = +X[i];
    }
    //Входной слой
    for(var i = 0; i < Y[0].length; i++)
    {
        Y[0][i] = Neuron(X,i);
        count +=1;
    }
    //Скрытые слои
    for(var i = 1; i <= KolYHidensloi.length-1; i++)
    {
        for(var j =0; j< Y[i].length;j++)
        {
            Y[i][j] = Neuron(Y[i-1],count);
            count +=1;
        }
    }
    //Выходной слой
    for(var i = 0;i < Y[Ylength-1].length; i++)
    {
        Y[Ylength-1][i] = Neuron(Y[Ylength-2],count);
        count +=1;
        str += (Y[Ylength-1][i]) + '</br>';
    }

    Byid('Raspoznovanie_Rezultat').innerHTML = str;
    console.log(str);



}



