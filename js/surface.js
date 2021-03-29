    var Byid = function(id)
    {
            return document.getElementById(id);
    }

    var a;
    var it;
    var learningRate;
    var XD = [];
    var MD = [];
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
        if(!Byid('DivKoordinat').hidden)
        {
            Byid('DivKoordinat').hidden = true;
        }
        if(!Byid('Div_Raspoznovanie').hidden)
        {
            Byid('Div_Raspoznovanie').hidden = true;
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
                Byid('XInput').value = '1'+'\n'+'&'+'\n'+'0,1;'+'\n'+'&' + '\n'+ '0' + '\n'+ '&' +'\n'+ '1,0;' + '\n' + '&';
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
                
                err[i] = Multiplier(Y[0][i],err,i);
                AllError[tic][i] = err[i];
                
                KorrektW(err[i],i)
            }
            
        }

    var Rezultat = function()
    {
        Byid('RezultatH1').hidden = false;
        var itog = ''; 
            Byid('itog').textContent = "Нейрон прошел обучение"
            Byid('itog').style.color = 'green';
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
        Byid('DivKoordinat').hidden = false;
        console.log(Koordinat);
        GrafikW();
        GrafikError();
        GrafikY();
        Poverhnost();
        Byid('Div_Raspoznovanie').hidden = false;
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
  Byid('AKoordinat').onclick = function()
        {
            var text = Koordinat;
            var csvData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(text);
            this.href = csvData;
            this.target = '_blank';
            this.download = 'Координаты.txt';
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

var Circle = function(r,x,y,color,i,j)
{
    return ' <circle class="C3D" onclick="CC3D('+i+','+j+')"  r="'+r+'" cx="'+x+'" cy="'+y+'" fill="'+color+'" />';
}
var Circle2 = function(r,x,y,color,i,j)
{
    return ' <circle r="'+r+'" cx="'+x+'" cy="'+y+'" fill="'+color+'" />';
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
    
    var k = 0;
    var h = 0;
    for(var i = 2; i >= -2; i -= 0.2, k +=1)
    {
        SW1[k] = [];
        SW0[k] = [];
        for(var j = 2; j >= -2; j -= 0.2,h +=1)
        {
            SW1[k][h] = (1/(1 + Math.exp(-a * (i+j))));
            SW0[k][h] = 1-(1/(1 + Math.exp(-a * (i))));
            SW1[k][h] = SW1[k][h] + SW0[k][h];
        }
    }

    console.log('1-Y');
    console.log(SW1);
    console.log('0-Y');
    console.log(SW0)

    Byid('DPov').innerHTML = '<svg class="Graf3D" id="3DPoverhnost" width = "1000" height = "1000"></svg>';
    var Holst = Byid('3DPoverhnost');

    //Оси
    Holst.innerHTML += Line(0,100,0,900,'black','3px');//Error
    Holst.innerHTML += Line(0,900,500,1000,'black','2px');//W1
    Holst.innerHTML += Line(1000,100,1000,900,'black','1px');
    Holst.innerHTML += Line(500,1000,1000,900,'black','2px');//W2
    Holst.innerHTML += Line(0,100,500,0,'black','1px');
    Holst.innerHTML += Line(500,0,1000,100,'black','1px');
    
    Holst.innerHTML += LinePunkt(500,0,500,800,'gray','1px'); // средняя линия
    Holst.innerHTML += Text2('W1',150,970,'blue','24px');//подпись к оси W1
    Holst.innerHTML += Text2('W2',800,970,'green','24px'); // подпись к оси W2
    Holst.innerHTML += Text2('Error',10,70,'red','24px');

    h = 15;
    k =0;
    for(var i =0; i <= 20; i++, h-=1, k+=40) //деления на оси Y
    {
        Holst.innerHTML += LinePunkt(0,100+k,500,k,'gray','1px');
        Holst.innerHTML += Text1(h/10,5,100+k-7);
        Holst.innerHTML += LinePunkt(500,k,1000,100+k,'gray','1px');//**
    }
    var y = 4.76;
    var x = 23.8;
    var s = 2
    for(var i = 0; i < 20; i++, s-=0.2,y+=4.76,x+=23.8) // деления на оси W1 и W2
    {
       Holst.innerHTML += LinePunkt(x,y+900,500+x,800+y,'gray','1px');
       Holst.innerHTML += LinePunkt(500+x,800+y,x+500,y,'gray','1px');

       Holst.innerHTML += LinePunkt(1000 - x,900+y,500-x,800+y,'gray','1px');
       Holst.innerHTML += LinePunkt(500-x,800+y,500-x,y,'gray','1px');

       if(i %2 == 0)
       { 
       Holst.innerHTML += Text1(s.toFixed(1),x,y+900);
       Holst.innerHTML += Text1(s.toFixed(1),1000-x-15,y+900-2);
       }
    }

    

    //Линия ошибки
    var IzmerOX = function(WO)
    {

        var y = 4.76;
        var x = 23.8;
        var WO1 = WO[1];
        var WO2 = WO[2];

        var Sk = 0;
        var ii;
        for(var i =2; i > parseFloat(WO1.toFixed(1)); i -=0.2)
        {
            Sk +=1;
            ii = i
        }
        //console.log(Sk);
        //console.log(ii)

        if(parseFloat((ii-0.1).toFixed(1)) == parseFloat(WO1.toFixed(1)))
        {
            x = x*Sk + (x/2);
            y = y * Sk + (y/2);
        }else
        {
            if(parseFloat(WO1.toFixed(1)) < 1.6)
            {
                x = x*Sk;
                y = y * Sk;
            }else
            {
                x =x+ x*Sk;
                y =y+ y*Sk;
            }    
        }

        Sk = 0;
        ii = 0;
        for(var i = -2; i < parseFloat(WO2.toFixed(1)); i +=0.2)
        {
            Sk +=1;
            ii = i
        }

        //console.log(Sk + '\n' + ii);
        Sk-=1;

        //x = x + (Sk * 23.8);
        //y = y - (Sk * 4.76)

        if(parseFloat((ii+0.1).toFixed(1)) == parseFloat(WO2.toFixed(1)))
        {
            x = x + (Sk * 23.8) + (23.8/2);
            y = y - (Sk * 4.76) - (4.76/2);
        }else
        {
            if(parseFloat(WO2.toFixed(1)) <= -1.6)
            {
                Sk +=1
                x = x + (Sk * 23.8);
                y = y - (Sk * 4.76);
            }else
            {
                x = x + (Sk * 23.8);
                y = y - (Sk * 4.76);
            }    
        }

        Holst.innerHTML += Circle2(3,x,y+900,'black');
        var KOR = [];
        KOR[0] = x;
        KOR[1] = y+900;
        return KOR;
        
        
    }
    //линия ошибки
    var xY = [];
    var mnoz = 400;
    var sm;
    var color;
    var aC =0
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    function rgb2hex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    var SettingColor = 1//255 / Object.keys(WAll).length

    /*for(var i = 0; i < Object.keys(WAll).length; i++ ,aC+=10)
    {
        if(aC > 255){aC = 150}
        xY = IzmerOX(WAll[i]);
        color = rgb2hex(aC,0,0);
        //if(i < 0){color = 'blak'}

        if(xY <= 500)
        {
            sm = (xY/40)*4.76*1.68;
            Holst.innerHTML += Circle2(3,xY,(500-sm)-YAll[i][0]*mnoz,color);
            continue;
        }else
        {
            sm = (xY/40)*4.76*1.68;
           Holst.innerHTML += Circle2(3,xY,(300+sm)-YAll[i][0]*mnoz,color);
            continue;
        }
    }*/

   

    //Основная поверхность
    x = 23.8;
    y = 4.76*21;
    y1 = 4.76*21;
    var wo = [];
    var w1 = 2;
    var w2 = 2;
    var y2 =-4.76*21
    var circl = 0;
    for(var i =0; i <21; i++ , w1-=0.2, y1+=4.76)//0.1
    {
        
        for(var j = 0; j<21; j++, circl++, w2-=0.2, y-=4.76)//0.1
        {
            /*wo[1] = w1;
            wo[2] = w2; 
            xY =  IzmerOX(wo);
            if(i == 0)
            {
                Holst.innerHTML += Circle(3,xY,(800-y - y1)-SW1[i][circl]*400,'green');
                continue;
            }
            
            if(i>j)
                {
                    Holst.innerHTML += Circle(3,xY,(400 + y+y1)-SW1[i][circl]*400,'green');//правая часть графика
                    continue;
                }
            else
                {
                    Holst.innerHTML += Circle(3,xY,(800-y - y1)-SW1[i][circl]*400,'green'); //левая часть графика
                }

                if(i == 20 && j == 20)
                {
                    //Holst.innerHTML += Circle(3,xY,(600-y - y1)-SW1[i][circl]*400+7,'green');//Кост ыль
                }*/
               

        }
        w2 = 2;
        y = 4.76*21;
    }

    x = 23.8;
    y = 4.76*21;
    y1 = 4.76*21;
    wo = [];
    w1 = 2;
    w2 = 2;
    var oy;
    var circl = 0;
    for(var i =0; i <21; i++ , w1-=0.2, y1-=-4.76)
    {
       
        for(var j = 0; j<21; j++, circl++, w2-=0.2, y-=4.76)
        { 
            wo[1] = w1;
            wo[2] = w2; 
            xY =  IzmerOX(wo);
            oy = ((SW1[i][circl] + 0.5)/0.1)*40;
            //oy = (SW1[i][circl]*(40/0.5))*10;

            Holst.innerHTML += Circle(3,xY[0],xY[1] - oy,'blue',i,circl);



            /*if(i == 0)
                {
                    Holst.innerHTML += Circle(3,xY,(1008-y - y1)-SW1[i][circl]*400,'blue',i,circl);
                    continue;
                }
            if(i>j)
                {
                    Holst.innerHTML += Circle(3,xY,(1008 - y-y1)-SW1[i][circl]*400,'blue',i,circl);//правая часть графика
                    continue;
                }
            else
                {
                Holst.innerHTML += Circle(3,xY,(1008-y - y1)-SW1[i][circl]*400,'blue',i,circl);//левая часть графика
                continue;
             }*/
        }
        w2 = 2;
        y = 4.76*21;
    }

    Holst.innerHTML += Line(0,660,1000,460,'black','1px');

    


}

//Клик для 3D графика
   var CC3D = function(ix,jy)
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

        alert('Y = ' + SW1[ix][jy].toFixed(3) + '\n' + 'W1 = ' + a.toFixed(1) +'\n'+'W2 = '+ j2y.toFixed(1));
    }





