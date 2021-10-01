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
    var XD = [];
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
    var AllYLastsloi;
    var AllYLastIter;
    var Xflag = false;
    var SystemClass;
    var CSK = 0;
    var MX = [];
    var MD = [];
    var CSK = 0;
    var LMX = [];
    var SystemCount;
    var SystemCountD;
    var NoHiden = false;
    var Lf;
    var WItALL;
    var YItAll;

    
function showFile(input) 
{
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    
    
    reader.onload = function()
        {
            alert('Началось чтение файла' + '\n'+ 'пожалуйста подождите');
            Byid('dInput').disabled = true;
            Xflag = true;

            XD = reader.result.split('&'); // получаем входные данные из файла и формируем из них массив
            XD.pop();
            Byid('XInput').value = reader.result;
            Byid('XInput').style.height = '300px';
            for(var i = 0; i < XD.length; i++)//отдедяем ожидания от образцов
            {
                if((i + 1) % 2 != 0)
                    {
                        MD.push(XD[i]);  
                    }else
                    {
                        MX.push(XD[i]);
                    }
            }

            d = MD[CSK].split(',');
            LMX = MX[CSK].split(';');
            LMX.pop();

            X = LMX[0].split(',');

            for(var i = 0; i < d.length; i++)
            {
                d[i] = +d[i]//ожидания
            }

            for(var i = 0; i < X.length; i++)
            {
                X[i] = +X[i]//вход
            }

            KolYOutput = d.length;
            KolX = X.length
            alert('Файл прочитан')
        }

    
    reader.onerror = function() 
        {
            console.log(reader.error);
        };
}



Byid('XInput').onclick = function()
  {
      this.style.height = '300px';
  }


//Нейрон <
function Neuron(X,m)
{
    
    var u = 0;
    var y = 0;
    u = W[m][0];
   //Суматор(X1*W1 + X2*W2...Xn*Wn)
    for(var i = 0 ; i < X.length; i++)
       {
           u += X[i] * W[m][i+1];
       }
   //функция активации(Сигмоидальная унополярная)
    y =1/(1+Math.exp(-a*u));
    return y;     
}

// >
  Byid('button').onclick = function()
  {
    a;
    it;
    OutputSloi;
    //X = [];
    Y = {};
    W = {};
    //d = [];
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
    AllYLastsloi = {};
    AllYLastIter = [];
    SystemCount = 0;
    SystemCountD =0;
    NoHiden = false;
    Lf = false;
    WItALL = {};
    YItAll={};
    

    var XC =0;

    SystemClass = function()
    {
        SystemCount +=1;
            if(SystemCount < LMX.length)
            {
                X = LMX[SystemCount].split(',');
            }else
            {
                if(SystemCountD >= MD.length-1)
                {
                    SystemCountD = 0;
                }else
                {
                    SystemCountD +=1;
                }
                d = MD[SystemCountD].split(',');
                SystemCount = 0;
                LMX = MX[SystemCountD].split(';');
                LMX.pop();
                X = LMX[SystemCount].split(',');//замени уже а
            }

            for(var i = 0; i < d.length; i++)
             {
                 d[i] = +d[i];
             }

             for(var i = 0; i < X.length; i++)
             {
                 X[i] = +X[i];
             }

             KolYOutput = d.length;
             KolX = X.length;

    }

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

        var colekt = document.getElementsByClassName('canvas');
        if(colekt)
        {
            var colektLength = colekt.length-1;
            for(var i = colektLength; i >= 0; i--)
            {
                colekt[i].remove();
            }
        }
    

    
    
    function getRandomArbitrary(min, max)
        {
        return Math.random() * (max - min) + min;
        }
      
    a = parseFloat(document.getElementById(id="aInput").value);
    it =  parseInt(Byid('iterInput').value);
    if(it < 5){it=5};
    learningRate  = parseFloat(Byid('learningRateInput').value);
    document.getElementsByClassName('resultat').hidden = true;
    

        if(Xflag != true)
        {
            if(Byid('XInput').value.length == 0)
            {
                Byid('XInput').value = '1,1'+'\n'+'&'+'\n'+'0,1,0,1,0;'+'\n'+'&';
            }
            MD = [];
            MX = [];

            XD = Byid('XInput').value.split('&'); // получаем входные данные из файла и формируем из них массив
            XD.pop();

            for(var i = 0; i < XD.length; i++)//отдедяем ожидания от образцов
            {
                if((i + 1) % 2 != 0)
                    {
                        MD.push(XD[i]);  
                    }else
                    {
                        MX.push(XD[i]);
                    }
            }

            d = MD[CSK].split(',');
            LMX = MX[CSK].split(';');
            LMX.pop();

            X = LMX[0].split(',');

            for(var i = 0; i < d.length; i++)
            {
                d[i] = +d[i]//ожидания
            }

            for(var i = 0; i < X.length; i++)
            {
                X[i] = +X[i]//вход
            }

            KolYOutput = d.length;
            KolX = X.length
        }

        Xflag = false;


    

    KolYInput = +Byid('OneSloi').value;

    KolYHidensloi = Byid('HidenSloi').value.split(',');
    for(var i = 0; i < KolYHidensloi.length; i++)
    {
        KolYHidensloi[i] = +KolYHidensloi[i];
    }

    d.reverse(); 

    Byid('mashtab').innerHTML = ''; 
    Byid('GrafikNeuron').innerHTML = '';






  


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

        
        if (KolYHidensloi <=0) 
        {
            //KolYHidensloi[nm-1] = 1;
            NoHiden = true;
            return;
        }
            Y[Ylength] = []; 
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
        if(NoHiden)
        {
            countSloi -=1;
            o =0;
        }
        for(var i = err.length-1; i >= 0; i--)
        {
                
                error[i] = KorrektError(error,i,hob,countSloi,kolNSloi,errLeng);
                hob++
                for(var p = W[err[i]].length-1; p >= 0; p--)
                    {
                        if(i <=KolYInput-1)
                        {
                            if (p == 0){W[err[i]][p] += Multiplier(Y[o][0],error,i); continue}
                            W[i][p] += Multiplier(Y[0][i],error,i) * learningRate * X[p-1];
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
                ERORW.unshift(W[Index[j]][W[Index[j]].length-1 - hob] * error[l-1 - h]);
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
        result = ((1-y)*y)*err[i]; //*a
        return result; 
    }

    var Korrekt = function(flag,X)
    {
        
        if (flag){return}
        Ylength = Object.keys(Y).length;
        Wlength = Object.keys(W).length; 
        var abc = 0;
        error = [0];

        for(var j = 0; j < KolYInput;j++)
                    {
                        Y[0][j] = Neuron(X,j);
                        
                    }
    if(!NoHiden)
    {            
    for(var h = 0; h < KolYHidensloi.length;h++)
        {

            for(var j =0; j < KolYHidensloi[h]; j++)
                {
                    Y[h+1][j] = Neuron(Y[h],j+KolYInput+abc); 
                }
                abc += KolYHidensloi[h];
        }
    }
                        
        for(var p =0; p < KolYOutput; p++)
            {
                Y[Ylength-1][p] = Neuron(Y[Ylength-2],p+(Wlength-KolYOutput) );
            }
            console.log(Y[Ylength-1]);
            counterKorrekt++






        //Коррекция весов выходного слоя
        for(var i = 0; i < d.length; i++ )
        {
            err[i] = Minus(Y[Ylength-1],i);
            err[i] = Multiplier(Y[Ylength-1][i],err,i);
            
            error[Wlength-1-i] = err[i];
            

            if(!NoHiden)
            {
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
            }else
            {
                for(var j =0; j <= KolYInput; j++ )
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
        }
        //Коррекция весов скрытых слоев
          
            for(var j = Wlength-1-KolYOutput; j >= 0 ; j-- )
            {
              Windex[j] = j;
              
            }
        

        KorrektHiddenSloi(Windex);            
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
        var cc = 0;
        for(var i = 0; i < Object.keys(Y).length;i++)
        {
            for(var j =0; j < Y[i].length; j++,cc++)
            {
                AllYLastIter[cc] = Y[i][j]
            }
        }

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

        Struktra(KolYInput,KolYHidensloi,KolYOutput);
        var Struktura_hiden =  Byid('Struktura_hiden');
        if(Struktura_hiden.hidden)
        {
            Struktura_hiden.hidden = false
        }




        
        if(Byid('checkGrafik').checked)
        { 
            var b = tic;
            Byid('mashtab').innerHTML = 'Графики ошибок' + '</br>'+ 'маштаб 1ед. = 5px'; 

            if(tic > 100000)
            {
                b = parseInt(tic*0.001)
            }
            if(tic>=10000)
            {
                b = parseInt(tic*0.001)
            }
            if(tic<10000 && tic>=1000)
            {
                b = parseInt(tic*0.001)
            }
            
            if(tic<1000)
            {
                b= 1000/tic;
            }
            GrafALL(b);

            
        }

        if(Byid('checkGrafikNeuron').checked)
        {
            Byid('GrafikNeuron').innerHTML = 'Графики нейронов выходного слоя'; 
            var b = tic;
              if(tic<1000)
            {
            Lf = true;   
            }
            if(tic>=10000)
            {
                b = parseInt(tic*0.001)
            }
            if(tic<10000 && tic>=1000)
            {
                b = parseInt(tic*0.001)
            }
            if(tic > 100000)
            {
                b = parseInt(tic*0.001)
            }
            if(tic<1000)
            {
                b= 1000/tic;
            }
           // b = parseInt(tic*0.01)
           GrafLastSloi(b);
            
        }

        if(Byid('check3DGrafik').checked)
        {
            var option = '';
            var n= 1
            for(var i = 0; i< Object.keys(W).length; i++,n++)
            {
                option += '<option value="'+i+'" >Нейрон '+n+'</option>';
            }
            Byid('3DGraf_conteiner_select').innerHTML = '<select id="3DGraf_select" onchange="doSomething();">'+option+'</select>';
            Byid('Graf_PG').innerHTML = '<svg class="3DGrafNeuron" id="Grafid" width = "1000" height = "1000"></svg>';
            Main3DGrafik();

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
        console.log(WItALL);
        console.log(YItAll);


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
        AllYLastsloi = {};
        while(Bool)
            {
                if(tic >= it)
                {
                    break;
                }
                    AllYLastsloi[tic] = Object.assign({}, Y[Object.keys(Y).length-1]);
                    WItALL[tic] = JSON.parse(JSON.stringify(W));
                    YItAll[tic] = JSON.parse(JSON.stringify(Y));
                    Korrekt(false,X);
                    SystemClass();
                    tic+=1;
                    console.log(X + Y + '\n');
            }

            Rezultat(tic);
            
 //>

}
a = 2
//График

var GrafALL= function(b)
{

    var CanvaSTR=''
    
    if(tic<1000)
    {
        Lf = true;   
    }
    for(var i = 0; i < AllError[0].length; i++)
    {
        CanvaSTR +='<canvas class="canvas" id="canva' + i +'">нейрон №</canvas>'; 
    }
    Byid('canvasALL').innerHTML = CanvaSTR; 
    var ABSNeuron = [];
    var an = 0;
    var am = 0;
    for(var j = 0; j < AllError[0].length; j++)
    {
        for(var i = 0; i < Object.keys(AllError).length; i++)
        {
            an = Math.abs(AllError[i][j]);
            if(i==0){am=an; continue;}
            if(an>am)
            {
                am = an;
            }
        }
        ABSNeuron[j] = am//Math.abs(an/Object.keys(AllError).length);
    }   

    for(var i = 0; i < AllError[0].length; i+=1)
    {
        //ABSNeuron[i] = ABSNeuron[i]*10;
        canvas = Byid('canva'+i);
        if(ABSNeuron[i] >100)
        {
            Grafik(i,canvas,0.01,b)
            Osi(i,canvas,10,0)
        }
        if(ABSNeuron[i] >1 && ABSNeuron[i] <100)
        {
            Grafik(i,canvas,0.1,b)
            Osi(i,canvas,1,0)
        }
        if(ABSNeuron[i] >1 && ABSNeuron[i] <10)
        {
            Grafik(i,canvas,1,b)
            Osi(i,canvas,0.1,0)
        }
        if(ABSNeuron[i] < 1 && ABSNeuron[i] >=0.1)
        {
            Grafik(i,canvas,10,b)
            Osi(i,canvas,0.01,1)
        }
        if(ABSNeuron[i]<0.1 && ABSNeuron[i] > 0.01)
        {
            Grafik(i,canvas,100,b)
            Osi(i,canvas,0.001,2)
        }
        if(ABSNeuron[i] < 0.01 && ABSNeuron[i] >=0.001)
        {
            Grafik(i,canvas,1000,b)
            Osi(i,canvas,0.0001,3)
        }
        if(ABSNeuron[i]<0.001 && ABSNeuron[i] >= 0.0001)
        {
            Grafik(i,canvas,10000,b)
            Osi(i,canvas,0.00001,4)
        }
        if(ABSNeuron[i]<0.0001 && ABSNeuron[i] >=0.00001)
        {
            Grafik(i,canvas,100000,b)
            Osi(i,canvas,0.000001,5)
        }
        if(ABSNeuron[i] <0.00001 && ABSNeuron[i] >=0.000001)
        {
            Grafik(i,canvas,1000000,b)
            Osi(i,canvas,0.0000001,6)
        }
        if(ABSNeuron[i] <0.000001 && ABSNeuron[i] >=0.0000001)
        {
            Grafik(i,canvas,10000000,b)
            Osi(i,canvas,0.00000001,7)
        }
        if(ABSNeuron[i] <0.0000001 && ABSNeuron[i] >=0.00000001)
        {
            Grafik(i,canvas,10000000,b)
            Osi(i,canvas,0.00000001,8)
        }

    }
   
}
//Отрисовка графика 


var Grafik = function(i,canvas,mn,b)
    {
        var h =1;
        var ctx = canvas.getContext("2d");
        canvas.width = 1000;
        canvas.height = 1000;
        ctx.lineWidth = 0,5;
        ctx.strokeStyle = 'red';
        if(!Lf)
        {
        for(var j =0; j < b*1000; j+=b*2)
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
        }else
        {
            var h = b;
            for(var j = 0; j < Object.keys(AllError).length; j++)
            {
                if(j == 0)
                {
                    ctx.moveTo(j,500-AllError[j][i]*mn*50);
                }else
                {
                    ctx.lineTo(h,500-(AllError[j-1][i]*mn*50));
                    //ctx.lineTo(h+b,500-(AllError[j][i]*mn*50))
                }
                h+=b;
            }
            ctx.stroke();
        }
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
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
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
                ctx.strokeText(j/10+'%',j-8,495)
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
        ctx.strokeText('Итераций',900,480)
        ctx.strokeText(tic,910,462);
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
    if(!NoHiden)
    {
    for(var i = 0; i < KolYHidensloi.length; i++)
    {
        for(var j =0; j< Y[i+1].length;j++)
        {
            Y[i+1][j] = Neuron(Y[i],count);
            count +=1;
        }
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

//Графики выходного слоя 

var GrafLastSloi = function(b)
{
    var Ylength = Object.keys(Y).length;
    var CanvaLastSloiSTR=''
    for(var i = 0; i < Y[Ylength-1].length; i++)
    {
        CanvaLastSloiSTR +='<canvas class="canvas" id="canvaLastSloi' + i +'">нейрон №</canvas>'; 
    }
    Byid('canvasNeuron').innerHTML = CanvaLastSloiSTR;
  
    
    for(var i =0; i < Y[Ylength-1].length; i++)
    {
        canvas = Byid('canvaLastSloi'+i);
        GrafikNeuron(i,canvas,b)
        OsiNeuron(i,canvas)
       
    }
}


var OsiNeuron = function(i,canvas)
{
        ctx = canvas.getContext("2d");
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0, 1, 1000);//вертикальная ось
        ctx.fillRect(0,999,1000,1);// горизонтальная ось
        ctx.font = '10px Verdana';
        ctx.strokeText('_'+(0.95).toFixed(2),0,50)
        ctx.strokeText('_'+(0.9).toFixed(1),0,100)
        ctx.strokeText('_'+(0.85).toFixed(2),0,150)
        ctx.strokeText('_'+(0.8).toFixed(1),0,200)
        ctx.strokeText('_'+(0.75).toFixed(2),0,250)
        ctx.strokeText('_'+(0.7).toFixed(1),0,300)
        ctx.strokeText('_'+(0.65).toFixed(2),0,350)
        ctx.strokeText('_'+(0.6).toFixed(1),0,400)
        ctx.strokeText('_'+(0.55).toFixed(2),0,450)
        ctx.strokeText('_'+(0.5).toFixed(1),0,500)
        ctx.strokeText('_'+(0.45).toFixed(2),0,550)
        ctx.strokeText('_'+(0.4).toFixed(1),0,600)
        ctx.strokeText('_'+(0.35).toFixed(2),0,650)
        ctx.strokeText('_'+(0.3).toFixed(1),0,700)
        ctx.strokeText('_'+(0.25).toFixed(2),0,750)
        ctx.strokeText('_'+(0.2).toFixed(1),0,800)
        ctx.strokeText('_'+(0.15).toFixed(2),0,850)
        ctx.strokeText('_'+(0.1).toFixed(1),0,900)
        ctx.strokeText('_'+(0.05).toFixed(2),0,950)


        //Горизонтальные линии
        //var p = 50;
        for(var j = 50; j <= 1000; j+=50/*,p+=10*mn*/)
        {
            ctx.strokeText('|',j,998);
            if(j !=1000)
            {
                ctx.strokeText(j/10+'%',j-4,990)
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

        ctx.strokeText('Выход',10,14);
        ctx.strokeText('Итераций',900,978)
        ctx.strokeText(tic,910,960)
}
var GrafikNeuron = function(i,canvas,b)
    {
        var h =1;
        var ctx = canvas.getContext("2d");
        canvas.width = 1000;
        canvas.height = 1000;
        ctx.lineWidth = 0,5;
        ctx.strokeStyle = 'blue';
        if(!Lf)
        {
        for(var j =0; j < b*1000; j+=b*2)
        {
            if(j == 0)
            {
                ctx.moveTo(j,1000-(AllYLastsloi[j][0]*1000));
                continue;
            }

                ctx.lineTo(h,1000-(AllYLastsloi[j-b][0]*1000));
                ctx.lineTo(h+1,1000-(AllYLastsloi[j][0]*1000));

                h+=2;
            
        }
        ctx.stroke();
        }else
        {
            var h = b;
            for(var j = 0; j < Object.keys(AllYLastsloi).length; j++)
            {
                if(j == 0)
                {
                    ctx.moveTo(j,1000-AllYLastsloi[j][i]*1000);
                }else
                {
                    ctx.lineTo(h,1000-(AllYLastsloi[j-1][i]*1000));
                    //ctx.lineTo(h-h,500-(AllError[j][i]*mn*50))
                }
                h+=b;
            }
            ctx.stroke();
        }
    }  


    //Структура сети
    Byid('Struktura_hiden').onclick = function()
    {
        var Struktura_SVG = Byid('DIV_StrukturaSVG');
        if(Struktura_SVG.hidden)
        {
            Struktura_SVG.hidden = false
        }else
        {
            Struktura_SVG.hidden = true;
        }
    }
    
    
    
    
    
    var Struktra = function(Vhod,Hide,Vihod)
    {



        var Line = function(x1,y1,x2,y2,color)
            {
                return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" />';
            }

        var Circle= function(x,y,r,color,id)
            {
                id = id+'';
                return '<circle mouseover="Circlemouseover(\''+id+'\')" onclick="CircleOnclik(\''+id+'\')" class = "Circle" id = "C'+id+'" fill = "'+color+'" cx="'+x+'" cy="'+y+'" r="'+r+'"/>'
            }
        var Text1 = function(text,x,y,clas,id)
            {
                return '<text onclick="CircleOnclik(\''+id+'\')" x="'+x+'" y="'+y+'" class="'+clas+'">'+text+'</text>'
            }    
        var Text2 = function(text,x,y,clas,id)
            {
                return '<text class="RectText" onclick="RectOnclik(\''+id+'\')" x="'+x+'" y="'+y+'" class="'+clas+'">'+text+'</text>'
            }
        var Rect = function(x,y,W,H,color,id)
            {
                return '<rect onclick="RectOnclik(\''+id+'\')" id ="R'+id+'" fill = "'+color+'" x="'+x+'" y="'+y+'" width="'+W+'" height="'+H+'"/>'
            }        




        var width = 800;
        var height = 500;
        Byid('DIV_StrukturaSVG').innerHTML = '<svg class="svg" id="StrukturaSVG" width = "'+width+'" height = "'+height+'" viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg"></svg>';
        var Holst = Byid('StrukturaSVG');

        var VhodnoiSLOI =Vhod;
        var HidenSLOI = Hide;
        var VihodnoiSLOI = Vihod;

        var SLOI = [X.length];    
             SLOI[1] = VhodnoiSLOI;

        if(!NoHiden)
        {  
        for(var i = 0; i < HidenSLOI.length; i++)
        {
            SLOI[i+2] = HidenSLOI[i];
        }
        }   
        SLOI.push(VihodnoiSLOI);

        var color;
        var c = 0
        var n = 1;
        var v = 0;

        for(var i = 0; i < SLOI.length; i++)
        {
            for(var j = 0; j < SLOI[i]; j++)
            {
                for(var h = 1; h <= SLOI[i+1]; h++)
                {
                    Holst.innerHTML += Line(55+(i*(800/SLOI.length-1))-1,j*(500/SLOI[i])+((500/SLOI[i])/3)+20,(i+1)*(800/SLOI.length-1)+25,h*(500/SLOI[i+1])+((500/SLOI[i+1])/3)-(500/SLOI[i+1])+20,'black')
                }
            }
        }

        for(var i = 0; i < SLOI.length; i++)
        {
            color = '#3ea14a'
            if(i == 1)
            {
                color = '#4377b2'
            }
            if(i == SLOI.length-1)
            {
                color = '#a33131'
                for(var j = 0; j < SLOI[i]; j++,c++)
                {
                Holst.innerHTML +=Line(i*(800/SLOI.length-1)+30,j*(500/SLOI[i])+((500/SLOI[i])/3)+20,(i*(800/SLOI.length-1)+30)+100,j*(500/SLOI[i])+((500/SLOI[i])/3)+20,color);
                Holst.innerHTML +=Circle(i*(800/SLOI.length-1)+30,j*(500/SLOI[i])+((500/SLOI[i])/3)+20,25,color,c)
                n = j+1
                Holst.innerHTML += Text1('Y'+n,(i*(800/SLOI.length-1)+30)+100,j*(500/SLOI[i])+((500/SLOI[i])/3)+25,'mal',c);
                n = c+1;
                Holst.innerHTML +=Text1(n,i*(800/SLOI.length-1)+22,j*(500/SLOI[i])+((500/SLOI[i])/3)+25,'TextNeuron',c);
                }
                continue;
            }
            if(i == 0)
            {
                color = '#424141'
                for(var j = 0; j < SLOI[i]; j++,v++)
                {
                    Holst.innerHTML +=Rect(i*(800/SLOI.length-1)+35,j*(500/SLOI[i])+((500/SLOI[i])/3)+10,20,20,color,v);
                    n = v+1
                    Holst.innerHTML +=Text2('X'+n,i*(800/SLOI.length-1)+36,j*(500/SLOI[i])+((500/SLOI[i])/3)+25,'TextX',v);
                }
                continue;
            }
            for(var j = 0; j < SLOI[i]; j++,c++)
            {
                Holst.innerHTML +=Circle(i*(800/SLOI.length-1)+30,j*(500/SLOI[i])+((500/SLOI[i])/3)+20,25,color,c);
                n = c+1;
                Holst.innerHTML +=Text1(n,i*(800/SLOI.length-1)+22,j*(500/SLOI[i])+((500/SLOI[i])/3)+25,'TextNeuron',c);
                
            }
        }
        //Связи
        
    }



    var RectOnclik =function(id)
    {
        var n = parseFloat(id)+1;
        alert(
            'Вход №: '+ n +'\n'+
            X[id]
            );
    }

    var CircleOnclik = function(id)
    {
        var n = parseFloat(id)+1;
        var str = '';
        str+='Нейрон №'+ n.toFixed(0) + '\n';
        var c = Y[0].length-1;
        if(id<=Y[0].length-1)
        {
            str += 'Вход:'+ '\n'+ X + '\n';
        }
        for(var i = 1; i < Object.keys(Y).length; i++)
        {
            for(var j = 0; j < Y[i].length; j++)
            {
                c+=1;
                if(id == c)
                {
                    str += 'Вход:'+ '\n'+ Y[i-1] + '\n';
                }
            }
        }
        str += 'Выход:'+'\n'+AllYLastIter[id]+'\n';
        str += 'Веса:' + '\n' + W[id];
        alert(str);
    }

    var Circlemouseover = function(event)
    {
        event.target.style.fill = '#ffd0004b';
    }


    //3D Графики для нейронов
    var Main3DGrafik = function(idNeuron)
    {
        var Holst = Byid('Grafid');
        Holst.innerHTML = '';
        var v11,v12,v13,
            v21,v22,v23,
            v32,v33,v43;
        var c1=4.5,c2=3.5;
        var rho = 30//  parseFloat(prompt('Расстояние до наблюдателя rho=EO','100'));
        //alert('Задайте два угла в градусах');
        var theta = 30// parseFloat(prompt('Угол theta измеряется по горизонтали от оси x:','30'));
        var phi = 70//parseFloat(prompt('Угол phi измеряется по вертикали от оси z:','70'));
        var screen_distc = 3000// parseFloat(prompt('Расстояни от точки наблюдения до экрана:','3000'));
        var Pz = 0,Px = 0,Py = 0, Pv = 0;
        var Pzt = 0, Pxt = 0, Pyt = 0, Pvt = 0;
        var tic = 0, ticP = 0;
        var PXYZ = {};
        var OldQ = {};
        var OldV = {};
        var SQ;
        var VS = [0,0,1];
        var V = VS;


        //Поворот кватернионом
        var PQ = function(q1,q2)
        {
            var a = 
            {
                x: q1[0],
                y: q1[1],
                z: q1[2],
                w: q1[3]
            }

            var b = 
            {
                x: q2[0],
                y: q2[1],
                z: q2[2],
                w: q2[3]
            }

            var res = [];

            res[0] = a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y;
            res[1] = a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x;
            res[2] = a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w;
            res[3] = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;
            return res;
        }

        var PovorotK = function(V,x,y,z,a)
        {
            var nx,ny,nz;
            var VM = [];
            var l = Math.sqrt(V[0] * V[0] + V[1]* V[1] + V[2] * V[2]); // длинна вектора
            //Нормализуем вектор 

            V[0] = V[0]/l;
            V[1] = V[1]/l;
            V[2] = V[2]/l;
            //Синус половины угла
            var hSin = Math.sin(a/2);
            //Косинус половины угла
            var hCos = Math.cos(a/2);
            SQ = 
            [
                V[0] * hSin,
                V[1]* hSin,
                V[2]* hSin,
                hCos
            ]


            if(tic >1)
            {
                VM = PQ(OldQ[tic-1],SQ)

                if(V[0] != OldV[tic-1][0] && V[1] != OldV[tic-1][1] && V[2] != OldV[tic-1][2])
                {
                SQ[0] = VM[0];
                SQ[1] = VM[1];
                SQ[2] = VM[2];
                SQ[3] = VM[3];
                }
            }

            var Q = 
            {
                x: SQ[0],
                y: SQ[1],
                z: SQ[2],
                w: SQ[3]
            }

    

            var M = 
            [
                1 - 2*Math.pow(Q.y,2) - 2*Math.pow(Q.z,2), 2*Q.x*Q.y - 2*Q.z*Q.w, 2*Q.x*Q.z + 2*Q.y*Q.w,
                2*Q.x*Q.y + 2*Q.z*Q.w, 1 - 2*Math.pow(Q.x,2) - 2* Math.pow(Q.z,2), 2*Q.y*Q.z - 2*Q.x*Q.w,
                2*Q.x*Q.z - 2*Q.y*Q.w, 2*Q.y*Q.z + 2*Q.x*Q.w, 1 - 2* Math.pow(Q.x,2) - 2* Math.pow(Q.y,2)
            ];

            nx = M[0]*x + M[1]*y + M[2]*z;
            ny = M[3]*x + M[4]*y + M[5]*z;
            nz = M[6]*x + M[7]*y + M[8]*z;
            var NM = [nx,ny,nz];
            return NM
        }

        //Основной код
        var coeff=function(rho,theta,phi)
        {
            var th,ph,costh,sinth,cosph,sinph,factor;
            factor=Math.atan(1.0)/45.0;
            //Углы в радианах
            th=theta*factor;
            ph = phi*factor;

            costh = Math.cos(th);
            cosph = Math.cos(ph);
            sinth= Math.sin(th);
            sinph= Math.sin(ph);
            //Элементы матрицы V
            v11 = -sinth;   v12 = -cosph*costh;     v13=-sinph*costh;
            v21 = costh;    v22 = -cosph*sinth;     v23=-sinph*sinth;
                    v32=sinph;                      v33=-cosph;
                                                    v43=rho;
        }

        var perspective= function(x,y,z)
        {
            /*if(tic != 0)
            {
                x = PXYZ[ticP][0];
                y = PXYZ[ticP][1];
                z = PXYZ[ticP][2];
            }*/

            var M = [];

            if(V[0] > 0 && V[1] == 0 && V[2] == 0 )
            {
                M =  PovorotK(V,x,y,z,Px);
                x = M[0];
                y = M[1];
                z = M[2];
            } else if(V[0] == 0 && V[1] > 0 && V[2] == 0)
            {
                M =  PovorotK(V,x,y,z,Py);
                x = M[0];
                y = M[1];
                z = M[2];
            } else if(V[0] == 0 && V[1] == 0 && V[2] > 0)
            {
                M =  PovorotK(V,x,y,z,Pz);
                x = M[0];
                y = M[1];
                z = M[2];
            } else
            {
            M =  PovorotK(V,x,y,z,Pv);
            x = M[0];
            y = M[1];
            z = M[2];
            }

            //PXYZ[ticP] =step

            var xe,ye,ze;
            var Mas = [];
            //координаты глаза
            xe = v11*x+v21*y;
            ye = v12*x+v22*y+v32*z;
            ze = v13*x + v23*y + v33*z+v43;
            //экранные координаты
            var pX = screen_distc*xe/ze+c1;
            var pY = screen_distc*ye/ze+c2;
            Mas[0] = pX;
            Mas[1] = pY;
            return Mas;
        } 

        var clear = function()
        {
            Masmove = [];
            Masdraw = [];
        }
        var move = function(x,y)
        {
            clear();
            Masmove[0] = x;
            Masmove[1] = y;
        }
        var draw = function(x,y,color)
        {
            var x1;
            var y2;
            var x2 = x;
            var y2 = y;
            if(Masdraw.length !=0)
            {
                x1 = Masdraw[0];
                y1 = Masdraw[1];
            }else
            {
                if(Masmove.length !=0)
                {
                    x1 = Masmove[0];
                    y1 = Masmove[1];
                }else
                {
                    console.log('Вы не указали начальные координаты move(x,y)');
                    return;
                }
            } 

            var line = '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke = "'+color+'"/>';
            Masdraw[0] = x2;
            Masdraw[1] = y2;
            return line;
        }

        var mv = function(x,y,z)
        {
            var Mas = [];
            Mas= perspective(x,y,z,);
            var X = Mas[0],Y=Mas[1];
            move(X+500,Y+550);//825,178
        }

        var dw = function(x,y,z,color)
        {
            var Mas = [];
            Mas= perspective(x,y,z,);
            var X = Mas[0],Y=Mas[1];
            Holst.innerHTML += draw(X+500,Y+550,color);
        }

        var Otrisovka = function(idNeuron)
        {
            coeff(rho,theta,phi);

            


            

        }


        Otrisovka(idNeuron);



        



    }

    

    var doSomething = function()
        {
            var idNeuron = parseInt(Byid('3DGraf_select').value);
            Main3DGrafik(idNeuron);
        }


