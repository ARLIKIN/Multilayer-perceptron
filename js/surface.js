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




         SystemClass = function()
         {
            GAllError[0].push(JSON.parse(JSON.stringify(AllError)));
            GlWAll[0].push(JSON.parse(JSON.stringify(WAll)));
            GlYAll[0].push(JSON.parse(JSON.stringify(YAll)));
            if(YAll[Object.keys(YAll).length-1][0] >0.5 && d[0] == 1){Sravn.push(true)}
            else if(YAll[Object.keys(YAll).length-1][0] <0.5 && d[0] == 0){Sravn.push(true);}
            else{Sravn.push(false)};
            RD.push(d);
            var itogX= '';
            for(var i = 0; i <X.length; i++)
            {
                itogX += X[i] + ' ';
            }
            RX.push(itogX);
            dAll.push(d[0]);
            if(XC != LMX.length-1)
        {
            XC +=1; 
            
            X = LMX[XC].split(',');

            for(var i = 0; i < X.length; i++)
            {
                X[i] = +X[i]//вход
            }
            tic = 0
            return false;
        }else
        {
            CSK +=1;
            /*GAllError[0].push(JSON.parse(JSON.stringify(AllError)));
            GlWAll[0].push(JSON.parse(JSON.stringify(WAll)));
            GlYAll[0].push(JSON.parse(JSON.stringify(YAll)));
            */
            XC = 0;
            if(CSK >= MD.length)
            {
                return true
            }
            
            d = MD[CSK].split(',');
            LMX = MX[CSK].split(';');
            if(LMX.length>1)
            LMX.pop();

            X = LMX[XC].split(',');

            for(var i = 0; i < d.length; i++)
            {
                d[i] = +d[i]//ожидания
            }

            for(var i = 0; i < X.length; i++)
            {
                X[i] = +X[i]//вход
            }
            tic = 0
            return false;

        }
         }

         a = parseFloat(Byid("aInput").value);
         it = parseFloat(Byid('iterInput').value);
         learningRate = parseFloat(Byid('learningRateInput').value);
         
         if(Xflag != true)
         {
             if(Byid('XInput').value.length == 0)
             {
                Byid('XInput').value = '1'+'\n'+'&'+'\n'+'0,1;'+'\n'+'1,0;'+'\n'+'&';
             }

             XD = Byid('XInput').value.split('&');
             XD.pop();

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
                        if(j == 0){W[i][j] = 1; continue;}
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
                if(tic != 0){yp = AllError[tic-1][Num]} 
                for(var i = 0; i < W[Num].length; i++)
                {
                    if(i == 0)
                    {W[Num][i] += err *learningRate+(a*yp); continue;}
                    if(i == 1){W[Num][i] += err *learningRate+(a*yp); continue;}
                    W[Num][i] += err * learningRate*X[i-1] +(a*yp);
                }
            }

            Wlength = Object.keys(W).length;
            var yp = 0;
            AllError[tic] = [];

            for(var i = 0; i < 1; i++) // если нейронов больше 1 то знак = надо убрать
            {
                err[i] = Minus(Y[0],i);
                err[i] = Multiplier(Y[0][i],err,i);
                AllError[tic][i] = err[i];
                KorrektW(err[i],i)
            }
            YAll[tic] = Object.assign({}, Y[Object.keys(Y).length-1]);
            for(var i =0; i < KolYInput; i++)
            {
                Y[0][i] = Neuron(X,i)
            }
        }

    var Rezultat = function()
    {
        Byid('RezultatH1').hidden = false;
        var itog = '';
        var ii= 0;
        for(var i=0; i < Sravn.length; i++)
        {
            if(Sravn[i])
            {
                ii +=1; 
            } 
        }
        if (ii = Sravn.length) 
        {
            Byid('itog').textContent = "Нейрон прошел обучение"
            Byid('itog').style.color = 'green';
        }else
        {
            Byid('itog').textContent ="Нейрон не прошел обучение"
            Byid('itog').style.color = 'red';
        }
        //Byid('itog').textContent += Sravn;
        Byid('InfoItog').innerHTML = '';
        for(var i =0; i < Sravn.length; i++)
        {
            Byid('InfoItog').innerHTML += '<p class="InfoItogP">'+ ' '+ RX[i] + '</br>' + GlYAll[0][i][it-1][0].toFixed(4) + '</br>' + '</p>'; 
        }
    }    

         //Start
         GeneralSloi(X);

         console.log(Y);
 
         KorrektGeneralSloi();
         
         while(Bool)
        {
            if(tic >= it)
                {
                    if(SystemClass()){break;}
                }
                /*for(var i = 0; i < d.length; i++)
                {
                    if(+Y[Ylength-1][i].toFixed(1) != +d[i].toFixed(1))
                    {
                        break;
                    }
                }*/

               /* if(i != d.length-1)
                {*/
                    KorrektGeneralSloi() ;
                    tic+=1;
                /*}else{break}*/
        }

        console.log(WAll);
        console.log(AllError);
        console.log(YAll);
        console.log(X);

        console.log('Самое интересное');
        console.log(GlWAll);
        console.log(GAllError);
        console.log(GlYAll);
        Rezultat();
    }