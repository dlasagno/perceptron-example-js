//Perceptron class created from scratch

class Perceptron {
  
  constructor(inputNum, activationFunction, learningRate, costFunction) {
    this.inputNum = inputNum

    this.activationFunction = activationFunction

    this.learningRate = learningRate
    this.costFunction = costFunction
    
    this.weigths = []
    for(let i = 0; i < inputNum; i++) {
      this.weigths.push(Math.random())
    }

    this.bias = 0//Math.random()
  }

  train(...trainingData) {
    for(const {inputs, output} of trainingData) {
      const sum = this.weigthedSum(inputs)

      const cost = this.costFunction(this.activationFunction(sum + this.bias), output)

      this.weigths = this.weigths.map(
        (weigth, i) => weigth + cost * (inputs[i] * weigth / sum != 0 ? sum : sum + 0.001) * this.learningRate
      )
    }
  }

  guess(inputs) {
    return this.activationFunction(this.weigthedSum(inputs) + this.bias)
  }

  weigthedSum(inputs) {
    return inputs
      .map((input, i) => input * this.weigths[i])
      .reduce((sum, input, ) => sum + input)
  }

}


//Test of the perceptron

//Testing parameters
const testIterations = 1000
const testSet = 3
const testCorrectnessTolerance = 0
const testResultRoundFunction = x => Math.round(x * 100 * 10) / 10

const trainingIterations = 50
const trainingSet = [
  {inputs: [0, 0], output: 0},
  {inputs: [0, 1], output: 0},
  {inputs: [1, 0], output: 0},
  {inputs: [1, 1], output: 1}
]

const perceptronSetup = [
  //Number of inputs
  2,
  //Activation function
  (x) => x < 1 ? 0 : 1,
  //Learning rate
  0.05,
  //Cost function
  (x, y) => (y - x)**2
]


//Testing
let average = 0;
for(let i = 0; i < testIterations; i++) {
  const p = new Perceptron(...perceptronSetup)

  for(let j = 0; j < trainingIterations; j++)
    p.train(...trainingSet)

  average +=
    p.guess(trainingSet[testSet].inputs) >= trainingSet[testSet].output - testCorrectnessTolerance &&
    p.guess(trainingSet[testSet].inputs) <= trainingSet[testSet].output + testCorrectnessTolerance ?
    1 : 0
}
average /= testIterations


//Test result
console.log(`${testResultRoundFunction(average)}%`)
