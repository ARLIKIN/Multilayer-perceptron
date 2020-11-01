//Node.js 10.14.0
//Plain Javascript and Node.js is supported
// html/css is not supported here 
//стартовые настройки
var kolvo = 25; //Количество точек на графике
console.log('Количество точек на графике:'+kolvo + '\n' + 'XYZ');
var x0 = 1;
var x1 = [];
var x2 = [];
var w = [-1,0,1];
var y = [];
var a = 0.8;
var itog ="";

//начальные параметры u
var u = x0 * w[0];

//Random size -1 1
function getRandomArbitrary(min, max)
  {
  return Math.random() * (max - min) + min;
  }
  
for(var j =0;j<=kolvo;j++)
{
  x1[j]=getRandomArbitrary(-1,1);
  x2[j]=getRandomArbitrary(-1,1);
}  
  a = getRandomArbitrary(0.1,0.9);
  console.log('Значение a: '+a.toFixed(4));
//Random end



for(var i = 0;i<=kolvo;i++)
{
  u += w[1] * x1[i];
  u += w[2] * x2[i];
  //console.log('u'+ i +'= ' + u);
  //функция
  var fun = 1/(1+Math.exp(-a*u));
  //
  y[i] = fun.toFixed(2);
  
  //обнуление u
  u = x0 * w[0]
}


//итоговые координаты
for(var h = 0; h<=kolvo;h++)
{
  itog+= x1[h].toFixed(2) +','+ y[h] + ',' + x2[h].toFixed(2) +'\n';
}

console.log(itog);



/*// Полная версия: https://github.com/Elyx0/rosenblattperceptronjs/blob/master/src/Perceptron.js 
class Perceptron {
  constructor(bias=1,learningRate=0.1,weights=[]) {
    this.bias = bias;
    this.learningRate = learningRate;
    this.weights = weights;
    this.trainingSet = [];
  }

    init(inputs,bias=this.bias) {
    // Инициализируем веса случайными значениями и добавляем сдвиговый вес
    this.weights = [...inputs.map(i => Math.random()), bias];
  }

    adjustWeights(inputs,expected) {
    const actual = this.evaluate(inputs);
    if (actual == expected) return true; // Если ошибки нет, возвращаем ничего не трогая    // В противном случае корректируем веса, добавляя error * learningRate относительно очередного
    this.weights = this.weights.map((w,i) => w += this.delta(actual, expected,inputs[i]));
  }

    // Вычисляем разницу между выводом и ожиданием для текущего ввода
  delta(actual, expected, input,learningRate=this.learningRate) {
    const error = expected - actual; // Насколько мы ошиблись
    return error * learningRate * input;
  }

    // Сумма inputs * weights
  weightedSum(inputs=this.inputs,weights=this.weights) {
    return inputs.map((inp,i) => inp * weights[i]).reduce((x,y) => x+y,0);
  }

    // Вычисляем результат с текущими весами
  evaluate(inputs) {
    return this.activate(this.weightedSum(inputs));
  }

    // Heaviside в качестве функции активации
  activate(value) {
    return value >= 0 ? 1 : 0;
  }
  
}*/ 