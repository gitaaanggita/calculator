class Calculator {
  constructor(previousNumberTextElement, resultNumberTextElement) {
    this.previousNumberTextElement = previousNumberTextElement
    this.resultNumberTextElement = resultNumberTextElement
    this.clear()
  }

  clear() {
    this.resultNumber = ''
    this.prevNumber = ''
    this.operation = undefined
  }

  delete() {
    this.resultNumber = this.resultNumber.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.resultNumber.includes('.')) return
    this.resultNumber = this.resultNumber.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.resultNumber === '') return
    if (this.prevNumber !== '') {
      this.compute()
    }
    this.operation = operation
    this.prevNumber = this.resultNumber
    this.resultNumber = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.prevNumber)
    const current = parseFloat(this.resultNumber)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.resultNumber = computation
    this.operation = undefined
    this.prevNumber = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.resultNumberTextElement.innerText =
      this.getDisplayNumber(this.resultNumber)
    if (this.operation != null) {
      this.previousNumberTextElement.innerText =
        `${this.getDisplayNumber(this.prevNumber)} ${this.operation}`
    } else {
      this.previousNumberTextElement.innerText = ''
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousNumberTextElement = document.querySelector('[data-prev-number]')
const resultNumberTextElement = document.querySelector('[data-result-number]')

const calculator = new Calculator(previousNumberTextElement, resultNumberTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})