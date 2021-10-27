    var Byid = function(id)
    {
            return document.getElementById(id);
    }

    var a;
    var it;
    var learningRate;
    var XD = [];
    var MD = [];
    var MDG = [];
    var MXG = {};
    var MX = [];
    var LMX = [];
    var Xflag = false;
    var d = [];
    var X = [];
    var KolYOutput;
    var KolX;
    var SystemClass;
    var GeneralSloi;
    var KolYInput;
    var ErrorY = [];
    var err;
    var AllError;
    var WAll;
    var YAll;
    var Bool;
    var XC;
    var CSK=0;
    var GlWAll = {};
    var GlYAll = {};
    var GAllError = {};
    var Sravn;
    var dAll;
    var RD;
    var RX;
    var Koordinat;
    var SystemCount;
    var SystemCountD;
    var SW1 = {};
    var SW0 = {};
    var SWSUM = {};
    var idPoverh = 2;



    var TestInput = function(input,indikator) // true - X   false - d
{
    var MasL = [];
    var inX = [];
    var Mf = [];
    for(var i = 0; i < input.length; i++)
    {
        if(indikator)
        {
            if(input[i][input[i].length-2] !=';')
            {
                alert('Ошибка! После одного или более образцов не стоит ;'+ '\n' + 'Проверьте входные данные ');
                return false;
            }
            inX = input[i].split(';');
            inX.pop();
        }else
        {
            inX[0] = input[i];
        }

        for(var j = 0; j < inX.length; j++ )
        {

            Mf = inX[j].split(',');

            for(var h =0; h < Mf.length; h++)
            {
                if(Mf[h] != '\n' && Mf[h] != '' && Mf[h] !='\n\n')
                {
                    Mf[h] = +Mf[h];
                    if(isNaN(Mf[h])){alert('Ошибка! Проверьте входные данные'); return false}
                }else
                {
                    alert('Ошибка!'+ '\n' + 'Проверьте входные данные ');
                    return false;
                }
                
            }
            MasL.push(Mf.length);
        }
    }
    
    for(var i =1; i < MasL.length; i++)
    {
        if(MasL[0] != MasL[i])
        {
            if(indikator)
            {
                alert('Ошибка! Длинна одного или более образца не совпадает с остальными' + '\n' + 'Проверьте входные данные ');
            }else
            {
                alert('Ошибка! Длинна одного или несколькольких ожиданий не совпадает с остальными' + '\n' + 'Проверьте входные данные ');
            }
            
            return false;
        }
    }

    return true
}



    function getRandomArbitrary(min, max)
        {
        return Math.random() * (max - min) + min;
        }

    function showFile(input) 
    {
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    
    
    reader.onload = function()
        {
            try
            {
            alert('Началось чтение файла' + '\n'+ 'пожалуйста подождите');
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
            if(!TestInput(MX,true)){Xflag=false; return};
            if(!TestInput(MD,false)){Xflag=false; return};
            MDG = MD;
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
        }catch
        {
            alert('Ошибка!' + '\n' + 'Проверьте входный данные');
        }
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


    Byid('button').onclick = function()
    {
        a;
        it;
        learningRate;
       // d;
       // X;
        KolYOutput;
        KolX;
        Y = {};
        W = {};
        tic = 0;
        ErrorY = [];
        err = [];
        AllError = {};
        WAll = {};
        YAll = {};
        Bool = true
        XC = 0;
        CSK = 0;
        GlWAll[0] = [];
        GlYAll[0] = [];
        GAllError[0] = [];
        Sravn = [];
        dAll = [];
        RD = [];
        RX = [];
        SystemCount = 0;
        SystemCountD = 0;
        MDG = [];
        MXG = {};
        if(!Byid('Div_Raspoznovanie').hidden)
        {
            Byid('Div_Raspoznovanie').hidden = true;
        }

        if(Byid('btn_3DD').hidden)
        {
            Byid('btn_3DD').hidden = false;
        }
        



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

         a = parseFloat(Byid("aInput").value);
         it = parseFloat(Byid('iterInput').value);
         learningRate = parseFloat(Byid('learningRateInput').value);
         Byid('Grafiks').innerHTML = '';
         
         if(Xflag != true)
         {
             if(Byid('XInput').value.length == 0)
             {
                Byid('XInput').value = '0'+'\n'+'&'+'\n'+'1,1;'+'\n'+'&' + '\n'+ '1' + '\n'+ '&' +'\n'+ '1,0;' + '\n' + '&';
             }

             XD = Byid('XInput').value.split('&');
             XD.pop();

             MX = [];
             MD = [];
             for(var i = 0; i < XD.length; i++)
             {
                 if((i + 1)%2 !=0)
                 {
                     MD.push(XD[i]);
                 }else
                 {
                     MX.push(XD[i]);
                 }
             }
            if(!TestInput(MX,true)){Xflag=false; return};
            if(!TestInput(MD,false)){Xflag=false; return};
             MDG = MD;
             d = MD[0].split(','); // В данной версии ожидается только 1 значение
             LMX = MX[0].split(';');
             LMX.pop();

             X = LMX[0].split(',');

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
         Xflag = false;

         //
         KolYInput = 1;
         //d.reverse();


        // Генерация весов
        var GeneratWight = function(KolY ,t)
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
                        if(j == 0){W[i][j] = 0; continue;}
                        W[i][j] = getRandomArbitrary(-1,1);
                    }
                }   
            }
            console.log(W);
        }

        //Основной слой
        GeneralSloi = function(X)
        {
            Y[0] = {};
            if(KolYInput <=0) KolYInput =1;

            GeneratWight(KolYInput,0 );

            for(var i =0; i < KolYInput; i++)
            {
                Y[0][i] = Neuron(X,i)
            }
        }


       



        //Коррекция
        var KorrektGeneralSloi = function()
        {
            var Minus = function(input,nm)
            {
                var err = d[nm] - input[nm];
                //var err = input[nm]- d[nm]; неправельно
                return err;
            }
            var Multiplier = function(y,err,i)
            {
                var result;
                result = ((1-y)*y)*err[i];//Нужно ли здесь a??
                return result; 
            }
            
            var KorrektW = function(err,Num)
            {
                WAll[tic] = Object.assign({}, W[Object.keys(W).length-1]);
                
                if(tic != 0){yp = AllError[tic-1][Num]+(a*yp)};
                
                for(var i = 0; i < W[Num].length; i++)
                {
                    if(i == 0){/*W[Num][0] += err *learningRate+(a*yp);*/ continue;}
                    //if(i == 1){W[Num][i] += err *learningRate+(a*yp); continue;}
                    W[Num][i] += err * X[i-1] * learningRate +(a*yp); // именно X обеспечивает правельную работу
                }
            }

            Wlength = Object.keys(W).length;
            var yp = 0;
            AllError[tic] = [];

            for(var i =0; i < KolYInput; i++)
            {
                Y[0][i] = Neuron(X,i)
            }
            YAll[tic] = Object.assign({}, Y[Object.keys(Y).length-1]);

            for(var i = 0; i < 1; i++) // если нейронов больше 1 то знак = надо убрать
            {
                err[i] = Minus(Y[0],i);
                AllError[tic][i] = err[i];
                err[i] = Multiplier(Y[0][i],err,i);
                
                
                KorrektW(err[i],i)
            }
            
        }

    var Rezultat = function()
    {
        Byid('RezultatH1').hidden = false;
        var itog = ''; 
        //Byid('itog').textContent += Sravn;
        Byid('InfoItog').innerHTML = '';
        for(var i =0; i < Sravn.length; i++)
        {
            Byid('InfoItog').innerHTML += '<p class="InfoItogP">'+ 'X:'+ RX[i] + '</br>' +'Y:'+GlYAll[0][i][it-1][0].toFixed(4) + '</br>' + '</p>'; 
        }
        Koordinat ='';
        for(var j = 0; j < GlWAll[0].length; j++)
        {
            for(var i = 0; i < tic; i++)
            {
            Koordinat += GlWAll[0][j][i][1] + ',' + GAllError[0][j][i][0] + ',' + GlWAll[0][j][i][2] + '\n';
            }
        }    
        for(var i = 0; i < MDG.length; i++)
        {
            MDG[i] = +MDG[i];
        }

        for(var i =0; i < MX.length; i++)
        {
            MXG[i] = MX[i].split(';');
            MXG[i].pop();
        }
        for(var i =0; i < Object.keys(MXG).length; i++)
        {
            MXG[i] = MXG[i][0].split(',');
        }


        for(var i =0; i < MX.length; i++)
        {
            for(var j =0; j <MXG[i].length;  j++)
            {
                MXG[i][j] = +MXG[i][j]
            }
        }
        console.log(Koordinat);
        GrafikW();
        GrafikError();
        GrafikY();
        Poverhnost();
        Byid('Div_Raspoznovanie').hidden = false;
        alert('Обучение завершилось');
    }   
         //Start
         GeneralSloi(X);
         console.log(Y);
 
         //KorrektGeneralSloi();
         
         while(Bool)
        {
            if(tic >= it)
                {
                    break;
                }
     
                    KorrektGeneralSloi();
                    SystemClass();
                    tic+=1;
        }
        console.log('W =>>');
        console.log(WAll);
        console.log('Error =>>');
        console.log(AllError);
        console.log('Y =>>');
        console.log(YAll);
        console.log('X =>>');
        console.log(X);

        /*
        console.log('Самое интересное');
        console.log(GlWAll);
        console.log(GAllError);
        console.log(GlYAll);
        */
        Rezultat();
    }

  //Структура обработчики кликов

  var WOnClick = function(name,id)
  {
      if(id == 0)
      {
          var str = "Нулевой вес изначально умнажается на еденицу"
          alert(name +' '+id + '\n' + str);
          return;
      }
      else
      {
          var str = "Этот вес умножается на X"+ id;
          alert(name +' '+id + '\n' + str);
          return;
      }
  }

  var SumatorOnClick = function(Index)
  {
      if(Index == 2)
      {
          alert('Суматор в котором складываются входы умноженные на веса' + '\n'
          + 'u = W0 + X1*W1 + X2*W2');
          return;
      }if(Index == 3)
      {
          alert('Формирование ошибки' + '\n' + 
          'Из ожидаемого результата вычетается фактический'+'\n'+ 'd-Y');
          return;
      }
      else
      {
          alert('Суматор');
          return;
      }
  }

  var learningRateOnClick = function()
  {
      alert('Скороть обучения' + '\n' + 'n = ' + parseFloat(Byid('learningRateInput').value))
  }

  var aOnClick = function()
  {
      alert('Коэфицент a = ' + parseFloat(Byid("aInput").value));
  }

  var YPOnClick = function()
  {
      alert('Фильтр' + '\n' + 'Он равен ошибке на предыдущей иттерации.' + '\n' + 
      'На первой иттерации ЯП равен нулю');
  }

  var FunOnClick = function(Index)
  {
      if(Index == 1)
      {
          alert('Функция активации'+ '\n'+ 'y =1/(1+exp(-a*u))');
          return;
      }
      if(Index == 2)
      {
          alert('Производная от функции активации' + '\n' + '(1-y)*y');
          return;
      }
  }

  var UmnOnClick = function(Index)
  {
      if(Index == 3)
      {
          alert('Перемножитель' + '\n' + 
          'Производная от функции активации умножается на разницу ожидаемого результата и фактического');
          return;
      }else
      {
        alert('Перемножитель' + '\n' + 
        'Ошибка умножается на вход'+ '\n'+
        'Error * X' + Index)
      }

  }

  var XOnClick = function(Index)
  {
      alert('Вход №' + Index);
  }
//Распознование
Byid('Raspoznv').onclick = function()
{
    var str = 'Результат распознования: ';
    X = Byid('XRaspoznovanie').value.split(',');
    for(var i =0; i < X.length; i++)
    {
        X[i] = +X[i];
    }

    //alert(Neuron(X,0));
    Byid('Raspoznovanie_Rezultat').innerHTML = str + Neuron(X,0);
    console.log(str);

}

//Графики
var Line = function(x1,y1,x2,y2,color,thick)
{
    return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" stroke-width="'+thick+'"/>';
}

var LinePunkt = function(x1,y1,x2,y2,color,thick)
{
    return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" style="stroke-dasharray: 20 5;  stroke-width="'+thick+'"/>';
}

var Text1 = function(text,x,y)
{
    return '<text x="'+x+'" y="'+y+'" font-family="Arial">'+text+'</text>';
}
var Text2 = function(text,x,y,color,size)
{
    return '<text font-size="'+size+'" fill="'+color+'" x="'+x+'" y="'+y+'" font-family="Arial">'+text+'</text>';
}

var CircleSUM = function(r,x,y,color,i,j)
{
    return ' <circle  class="C3D" onclick="CC3DSUM('+i+','+j+')"  r="'+r+'" cx="'+x+'" cy="'+y+'" fill="'+color+'" />';
}

var Circle1Y = function(r,x,y,color,i,j)
{
    return ' <circle  class="C3D" onclick="CC3D1Y('+i+','+j+')"  r="'+r+'" cx="'+x+'" cy="'+y+'" fill="'+color+'" />';
}

var Circle0Y = function(r,x,y,color,i,j)
{
    return ' <circle  class="C3D" onclick="CC3D0Y('+i+','+j+')"  r="'+r+'" cx="'+x+'" cy="'+y+'" fill="'+color+'" />';
}

var Circle2 = function(r,x,y,color)
{
    return ' <circle r="'+r+'" cx="'+x+'" cy="'+y+'" fill="'+color+'" />';
}
var Circle3 = function(r,x,y,color,i)
{
    return ' <circle class="CE3D" onclick="CE3D('+i+')"  r="'+r+'" cx="'+x+'" cy="'+y+'" fill="'+color+'" />';
}
//Веса
var GrafikW = function()
{
    Byid('Grafiks').innerHTML += '<svg class="GrafALL" id="GrafW" width = "1000" height = "1000"></svg>';
    var Holst = Byid('GrafW');

    //Отрисовка
    var interval;
    if(tic < 1000)
    {
        interval = parseInt(1000 / tic+1);
    }else
    {
        interval = 1; //можно флаг сделать
    }



    for(var i = 0,j = 0; i < Object.keys(WAll).length; i++,j +=interval)
    {
        if(i == 0)
        {
            Holst.innerHTML += Line(j,500-WAll[i][1]*50,j+interval,500-WAll[i][1]*50,'blue','2px');
            Holst.innerHTML += Line(j,500-WAll[i][2]*50,j+interval,500-WAll[i][2]*50,'green','2px');
            continue;
        } 
            Holst.innerHTML += Line(j,500-WAll[i-1][1]*50,j+interval,500-WAll[i][1]*50,'blue','2px');
            Holst.innerHTML += Line(j,500-WAll[i-1][2]*50,j+interval,500-WAll[i][2]*50,'green','2px');

    }

    //Координаты
    Holst.innerHTML += Line(0,0,0,1000,'black','2px');//OY
    Holst.innerHTML += Line(0,500,1000,500,'black','1px');//OX
    //Риски на координатах
    for(var i = 0, j = 10; i <=1000; i+=50,j-=1)
    {
        if(i == 0){Holst.innerHTML += Line(0,0,10,0,'black','1px');continue;}
            if(i != 500)
            Holst.innerHTML +=  Line(0,i,15,i,'black','1px'); //OY
            Holst.innerHTML += Line(i,490,i,510,'black','1px');//OX
            if(i !=1000)
            Holst.innerHTML += Text1(j,3,i-2); //OY цифры
            if(i == 50)
            {Holst.innerHTML += Text1(i/10 + '%',i-5,488); continue}
            if(i != 1000)
            Holst.innerHTML += Text1(i/10 + '%',i-10,488);
    }
    //Подписи
    Holst.innerHTML += Text1('Графики изменения весов',400,20);
    Holst.innerHTML += Text1('W',20,20);
    Holst.innerHTML += Text1('Итераций',920,470)
    Holst.innerHTML += Text2(tic,940,455,'black','20');
    Holst.innerHTML += Text2('W1',960,20,'blue','20');
    Holst.innerHTML += Text2('W2',960,40,'green','20');
}

var GrafikError = function()
{
    Byid('Grafiks').innerHTML += '<svg class="GrafALL" id="GrafError" width = "1000" height = "1000"></svg>';
    var Holst = Byid('GrafError');

    //Отрисовка
    var interval;
    if(tic < 1000)
    {
        interval = parseInt(1000 / tic +1);
    }else
    {
        interval = 1; //можно флаг сделать
    }



    for(var i = 0,j = 0; i < Object.keys(WAll).length; i++,j +=interval)
    {
        if(i == 0)
        {
            Holst.innerHTML += Line(j,500-AllError[i][0]*500,j+interval,500-AllError[i][0]*500,'red','2px');
            continue;
        } 
            Holst.innerHTML += Line(j,500-AllError[i-1][0]*500,j+interval,500-AllError[i][0]*500,'red','2px');
    }

    //Координаты
    Holst.innerHTML += Line(0,0,0,1000,'black','2px');//OY
    Holst.innerHTML += Line(0,500,1000,500,'black','1px');//OX
    //Риски на координатах
    for(var i = 0, j = 10; i <=1000; i+=50,j-=1)
    {
        if(i == 0){Holst.innerHTML += Line(0,0,10,0,'black','1px');continue;}
            if(i != 500)
            Holst.innerHTML +=  Line(0,i,15,i,'black','1px'); //OY
            Holst.innerHTML += Line(i,490,i,510,'black','1px');//OX
            if(i !=1000)
            Holst.innerHTML += Text1(j/10,3,i-2); //OY цифры
            if(i == 50)
            {Holst.innerHTML += Text1(i/10 + '%',i-5,488); continue}
            if(i != 1000)
            Holst.innerHTML += Text1(i/10 + '%',i-10,488);
    }
    //Подписи
    Holst.innerHTML += Text1('График изменения ошибки',400,20);
    Holst.innerHTML += Text1('Erorr',20,20);
    Holst.innerHTML += Text1('Итераций',920,470)
    Holst.innerHTML += Text2(tic,940,455,'black','20');
}

var GrafikY = function()
{
    Byid('Grafiks').innerHTML += '<svg class="GrafALL" id="GrafY" width = "1000" height = "500"></svg>';
    var Holst = Byid('GrafY');

    //Отрисовка
    var interval;
    if(tic < 1000)
    {
        interval = parseInt(1000 / tic+1);
    }else
    {
        interval = 1; //можно флаг сделать
    }



    for(var i = 0,j = 0; i < Object.keys(WAll).length; i++,j +=interval)
    {
        if(i == 0)
        {
            Holst.innerHTML += Line(j,500-YAll[i][0]*500,j+interval,500-YAll[i][0]*500,'#6800a5','2px');
            continue;
        } 
            Holst.innerHTML += Line(j,500-YAll[i-1][0]*500,j+interval,500-YAll[i][0]*500,'#6800a5','2px');
    }

    //Координаты
    Holst.innerHTML += Line(0,0,0,500,'black','2px');//OY
    Holst.innerHTML += Line(0,500,1000,500,'black','1px');//OX
    //Риски на координатах
    for(var i = 0, j = 10; i <=1000; i+=50,j-=1)
    {
        if(i == 0){Holst.innerHTML += Line(0,0,10,0,'black','1px');continue;}
            if(i != 500)
            Holst.innerHTML +=  Line(0,i,15,i,'black','1px'); //OY
            Holst.innerHTML += Line(i,490,i,510,'black','1px');//OX
            if(i !=1000)
            Holst.innerHTML += Text1(j/10,3,i-2); //OY цифры
            if(i == 50)
            {Holst.innerHTML += Text1(i/10 + '%',i-5,488); continue}
            if(i != 1000)
            Holst.innerHTML += Text1(i/10 + '%',i-10,488);
    }
    //Подписи
    Holst.innerHTML += Text1('График изменения выхода с нейрона',400,20);
    Holst.innerHTML += Text1('Y',20,20);
    Holst.innerHTML += Text1('Итераций',920,470)
    Holst.innerHTML += Text2(tic,940,455,'black','20');

    
} 

//3D Поверхность
var Poverhnost = function()
{
    //lib svg
var Masmove = [];
var Masdraw = [];

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

var clear = function()
{
    Masmove = [];
    Masdraw = [];
}
//
    var k = 0;
    var h = 0;
    for(var i = 2; i >= -2; i -= 0.2, k +=1)
    {
        SW1[k] = [];
        SW0[k] = [];
        SWSUM[k] = [];

        for(var j = 2; j >= -2; j -= 0.2,h +=1)
        {

            if(MDG.length >1)
            {
                if(MXG[0].length > 1)
                {

                        if(MXG[0][0] == 0 && MXG[0][1] == 0)
                        {
                            SW1[k][h] = MDG[0]-(1/(1 + Math.exp(-a * (0))));
                        }
                        if(MXG[0][0] == 0 && MXG[0][1] == 1)
                        {
                            SW1[k][h] = MDG[0]-(1/(1 + Math.exp(-a * (j))));
                        }
                        if(MXG[0][0] == 1 && MXG[0][1] == 0)
                        {
                            SW1[k][h] = MDG[0]-(1/(1 + Math.exp(-a * (i))));
                        }
                        if(MXG[0][0] == 1 && MXG[0][1] == 1)
                        {
                            SW1[k][h] = MDG[0]-(1/(1 + Math.exp(-a * (i+j))));
                        }

                        if(MXG[1][0] == 0 && MXG[1][1] == 0)
                        {
                            SW0[k][h] = MDG[1]-(1/(1 + Math.exp(-a * (0))));
                        }
                        if(MXG[1][0] == 0 && MXG[1][1] == 1)
                        {
                            SW0[k][h] = MDG[1]-(1/(1 + Math.exp(-a * (j))));
                        }
                        if(MXG[1][0] == 1 && MXG[1][1] == 0)
                        {
                            SW0[k][h] = MDG[1]-(1/(1 + Math.exp(-a * (i))));
                        }
                        if(MXG[1][0] == 1 && MXG[1][1] == 1)
                        {
                            SW0[k][h] = MDG[1]-(1/(1 + Math.exp(-a * (i+j))));
                        }
                }else
                {
                        if(MXG[0][0] == 0 )
                        {
                            SW1[k][h] = MDG[0]-(1/(1 + Math.exp(-a * (0))));
                        }
                        if(MXG[0][0] == 1 )
                        {
                            SW1[k][h] = MDG[0]-(1/(1 + Math.exp(-a * (i))));
                        }
                        if(MXG[1][0] == 0 )
                        {
                            SW0[k][h] = MDG[1]-(1/(1 + Math.exp(-a * (0))));
                        }
                        if(MXG[1][0] == 1 )
                        {
                            SW0[k][h] = MDG[1]-(1/(1 + Math.exp(-a * (i))));
                        }
                }
            }else
            {
                if(MXGp[0].length > 1)
                {
                         if(MXG[0][0] == 0 && MXG[0][1] == 0)
                        {
                            SW1[k][h] = MDG[0]-(1/(1 + Math.exp(-a * (0))));
                        }
                        if(MXG[0][0] == 0 && MXG[0][1] == 1)
                        {
                            SW1[k][h] = MDG[0]-(1/(1 + Math.exp(-a * (i))));
                        }
                        if(MXG[0][0] == 1 && MXG[0][1] == 0)
                        {
                            SW1[k][h] = MDG[0]-(1/(1 + Math.exp(-a * (j))));
                        }
                        if(MXG[0][0] == 1 && MXG[0][1] == 1)
                        {
                            SW1[k][h] = MDG[0]-(1/(1 + Math.exp(-a * (i+j))));
                        }
                }else
                {
                    SW0[k][h] = 0;
                }
            }    
            SWSUM[k][h] = SW1[k][h] + SW0[k][h];
        }
        
    }

    console.log('1-Y');
    console.log(SW1);
    console.log('0-Y');
    console.log(SW0)
    console.log('SUM 1-Y & 0-Y');
    console.log(SWSUM);

    Byid('DPov').innerHTML = '<svg class="Graf3D" id="3DPoverhnost" width = "1000" height = "650"></svg>';

    
var Holst = Byid('3DPoverhnost');

var v11,v12,v13,
    v21,v22,v23,
    v32,v33,v43;
var c1=4.5,c2=3.5;
var rho = 30//Расстояние до наблюдателя 
var theta = 30// Угол theta измеряется по горизонтали от оси x
var phi = 70//Угол phi измеряется по вертикали от оси z
var screen_distc = 3000//Расстояни от точки наблюдения до экрана
var Pz = 0,Px = 0,Py = 0, Pv = 0;
var Pzt = 0, Pxt = 0, Pyt = 0, Pvt = 0;
var tic = 0, ticP = 0;
var PXYZ = {};
var OldQ = {};
var OldV = {};
var SQ;
var VS = [0,0,1];
var V = VS;


//функции
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
                    v32=sinph;              v33=-cosph;
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

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgb2hex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

var dwPSUM = function(x,y,z,i,j)
{   
    var Mas = [];
    Mas= perspective(x,y,z,);
    var X = Mas[0],Y=Mas[1];
    Holst.innerHTML += CircleSUM(3,X+500,Y+300,'green',i,j);
}

var dwP1Y = function(x,y,z,i,j)
{
    var Mas = [];
    Mas= perspective(x,y,z,);
    var X = Mas[0],Y=Mas[1];
    Holst.innerHTML += Circle1Y(3,X+500,Y+300,'orange',i,j);
}
var dwP0Y = function(x,y,z,i,j)
{
    var Mas = [];
    Mas= perspective(x,y,z,);
    var X = Mas[0],Y=Mas[1];
    Holst.innerHTML += Circle0Y(3,X+500,Y+300,'blue',i,j);
}



var dwL = function(x,y,z,i,aC)
{
    var color = rgb2hex(aC,0,0);
    var Mas = [];
    Mas= perspective(x,y,z,);
    var X = Mas[0],Y=Mas[1];
    Holst.innerHTML += Circle3(3,X+500,Y+300,color,i);
}

var mv = function(x,y,z)
{
    var Mas = [];
    Mas= perspective(x,y,z,);
    var X = Mas[0],Y=Mas[1];
    move(X+100,Y+550);//825,178
}

var dw = function(x,y,z,color)
{
    var Mas = [];
    Mas= perspective(x,y,z,);
    var X = Mas[0],Y=Mas[1];
    Holst.innerHTML += draw(X+100,Y+550,color);
}

var dwT = function(x,y,z,text,color,size)
{
    var Mas = [];
    Mas= perspective(x,y,z,);
    var X = Mas[0],Y=Mas[1];
    Holst.innerHTML += Text2(text,X+100,Y+548,color,size);
}

var Otrisovka = function()
{
coeff(rho,theta,phi);
if(idPoverh == 0)
    {
        var k = 0, h = 0;                       
            for(var i = 2; i >=-2; i-=0.2,k+=1) //Поверхность 0-Y
            {                                   
                for(var j=2; j >=-2; j-=0.2,h+=1)
                {
                    dwP0Y(i,j,SW0[k][h],k,h);
                }
            }
    }

if(idPoverh == 1)
    {
        var k = 0, h = 0;                       
            for(var i = 2; i >=-2; i-=0.2,k+=1) //Поверхность Y-1
            {                                   
                for(var j=2; j >=-2; j-=0.2,h+=1)
                {
                    dwP1Y(i,j,SW1[k][h],k,h);
                }
            }
    }

    if(idPoverh == 2)
    {
        var k = 0, h = 0;                       
            for(var i = 2; i >=-2; i-=0.2,k+=1) //Суммарная поверхность 
            {                                   
                for(var j=2; j >=-2; j-=0.2,h+=1)
                {
                    dwPSUM(i,j,SWSUM[k][h],k,h);
                }
            }
    }
    var aC = 0;
    for(var i = 0; i<it;i++,aC+=10)
    {
        if(aC > 255){aC = 170}
        dwL(WAll[i][1],WAll[i][2],AllError[i][0],i,aC) // фактическая линия
    }

    //Оси
    mv(0,0,0);
    dw(-0.5,0,0,'red');
    mv(0,0,0);
    dw(0,-0.5,0,'blue');
    mv(0,0,0);
    dw(0,0,0.5,'green');
    dwT(-0.55,0,0,'W1','red','10');
    dwT(0,-0.55,0,'W2','blue','10');
    dwT(0,0,0.55,'Y','green','10');

    OldQ[tic] = SQ
    OldV[tic] = V

    tic+=1;
    ticP = 0;


}

var MEGAColor = function(id)
{
    switch(id)
    {
        case 2: 
        Byid('Per1YP').style.backgroundColor = 'wheat';
        Byid('Per0YP').style.backgroundColor = 'wheat';
        Byid('PerSUMP').style.backgroundColor = 'rgba(70, 143, 70, 0.61)';
        break;
        case 1:
        Byid('Per1YP').style.backgroundColor = 'rgba(165, 135, 59, 0.664)';
        Byid('Per0YP').style.backgroundColor = 'wheat';
        Byid('PerSUMP').style.backgroundColor = 'wheat';
        break;

        case 0:
        Byid('Per1YP').style.backgroundColor = 'wheat';
        Byid('Per0YP').style.backgroundColor = 'rgba(68, 68, 230, 0.664)';
        Byid('PerSUMP').style.backgroundColor = 'wheat';
        break

    }
    
}

var step = 30;
var step_user = function()
{
    
    if(parseFloat( Byid('step').value) > 0)
    {
        return parseFloat( Byid('step').value);
    }else
    {
        return 30;
    }
}
Byid('PerZ').onclick = function()
{
    Holst.innerHTML = '';
    V = [0,0,1];
    Pz +=step_user()*Math.PI/180 //- Pz;
    //Pzt += step;
    if(Pz >360*Math.PI/180){Pz=0;};
    Otrisovka();
}

Byid('PerX').onclick = function()
{
    Holst.innerHTML = ''
    V = [1,0,0];
    Px +=step_user()*Math.PI/180 //- Px
    //Pxt += step 
    if(Pxt >360*Math.PI/180){Px=0;}
    Otrisovka();
}

Byid('PerY').onclick = function()
{
    Holst.innerHTML = ''
    V = [0,1,0];
    Py +=step_user()*Math.PI/180 //- Py;
    //Pyt +=step;
    if(Pyt >360*Math.PI/180){Py=0;}
    Otrisovka();
}

Byid('PerRESET').onclick = function()
{
    Holst.innerHTML = ''
    V = VS;
    Pz = 0;
    Py = 0;
    Px = 0;
    Otrisovka();
}

Byid('PerSUMP').onclick = function()
{
    Holst.innerHTML = '';
    idPoverh = 2;
    MEGAColor(idPoverh);
    Otrisovka();
}

Byid('Per1YP').onclick = function()
{
    Holst.innerHTML = '';
    idPoverh = 1;
    MEGAColor(idPoverh);
    Otrisovka();
}

Byid('Per0YP').onclick = function()
{
    Holst.innerHTML = '';
    idPoverh = 0;
    MEGAColor(idPoverh);
    Otrisovka();
}
//

//Start

Otrisovka();


}


//Клик для 3D графика
var CC3DSUM = function(ix,jy)
{
    //alert('Y = ' + SW1[ix][jy]);
    var a;
    var ii = 0;
    var b = jy - (ix*21);
    var jj = 0;
    var j2y = 0;
    for(var i = 2; i >=-2; i -=0.2,ii++)
    {
        if(ii == ix)
        {
            a = i;
            break;
        }
    }

     for(var i = 2; i >=-2; i -=0.2,jj++)
    {
        if(jj == b)
        {
            j2y = i;
            break;
        }
    }

    alert('Y = ' + SWSUM[ix][jy].toFixed(3) + '\n' + 'W1 = ' + a.toFixed(1) +'\n'+'W2 = '+ j2y.toFixed(1) + '\n' + 'Суммарная поверхность');
}

var CC3D1Y = function(ix,jy)
{
    //alert('Y = ' + SW1[ix][jy]);
    var a;
    var ii = 0;
    var b = jy - (ix*21);
    var jj = 0;
    var j2y = 0;
    for(var i = 2; i >=-2; i -=0.2,ii++)
    {
        if(ii == ix)
        {
            a = i;
            break;
        }
    }

     for(var i = 2; i >=-2; i -=0.2,jj++)
    {
        if(jj == b)
        {
            j2y = i;
            break;
        }
    }

    alert('Y = ' + SW1[ix][jy].toFixed(3) + '\n' + 'W1 = ' + a.toFixed(1) +'\n'+'W2 = '+ j2y.toFixed(1)+'\n' + '1- Y Поверхность');
}

var CC3D0Y = function(ix,jy)
{
    //alert('Y = ' + SW1[ix][jy]);
    var a;
    var ii = 0;
    var b = jy - (ix*21);
    var jj = 0;
    var j2y = 0;
    for(var i = 2; i >=-2; i -=0.2,ii++)
    {
        if(ii == ix)
        {
            a = i;
            break;
        }
    }

     for(var i = 2; i >=-2; i -=0.2,jj++)
    {
        if(jj == b)
        {
            j2y = i;
            break;
        }
    }

    alert('Y = ' + SW0[ix][jy].toFixed(3) + '\n' + 'W1 = ' + a.toFixed(1) +'\n'+'W2 = '+ j2y.toFixed(1)+'\n' + '0- Y Поверхность');
}

//клик на фактическую линию
var CE3D = function(id)
    {
        alert('Error = ' + AllError[id][0].toFixed(3) + '\n' + 'W1 = ' + WAll[id][1].toFixed(1) + '\n' + 'W2 = ' + WAll[id][2].toFixed(1));
    }


