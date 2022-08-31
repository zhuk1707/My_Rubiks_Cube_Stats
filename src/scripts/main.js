const recordTime = document.querySelector('.record-time')
const averageTime = document.querySelector('.average-time')
const form = document.querySelector('.results__form');
const enteredMin = document.querySelector('.results__input_mm')
const enteredSec = document.querySelector('.results__input_ss')
const enteredMil = document.querySelector('.results__input_ms')
const allResults = document.querySelector('.results__body')
const resultsCounter = document.querySelector('.results__counter')
let results = []

//main code==============================================================
form.addEventListener('submit',addResult)

allResults.addEventListener('click', deleteResult)

//functions===============================================================
function strToMs(str) {
  const values = []
  const arr = str.split(':')

  const oneMin = 60 * 1000
  const oneSec = 1000

  arr.forEach(e => values.push(Number(e)))

  return values[0] * oneMin + values[1] * oneSec
}

function msToStr(n) {
  if (n < 0) {n = -n}

  const oneMin = 60 * 1000
  const oneSec = 1000

  const mm = Math.floor(n / oneMin)
  const ss = ((n % oneMin) / oneSec).toFixed(2)

  return `${(mm < 10)? '0' + mm : mm}:${(ss < 10)? '0' + ss : ss}`
}

function renderResultNote(el) {
  const noteHtml = ` <li class="results__item item-result" id="${el.id}">
                            <div class="item-result__data">
                                <div class="item-result__number">${el.resultNum}</div>
                                <div class="item-result__date">${el.resultDate}</div>
                            </div>
                            <div class="item-result__time">
                                <div class="item-result__actual-time">${el.actualTime}</div>
                                <div
                                        class="item-result__record-difference">${el.recordDif}</div>
                                <div
                                        class="item-result__average-difference">${el.averageDif}</div>
                            </div>
                            <button class="item-result__delete-btn"
                                    type="button">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </li>`

  allResults.insertAdjacentHTML('beforeend', noteHtml)
}

function renderMainStats() {
  const values = results.map(e => strToMs(e.actualTime))

  const record = Math.min.apply(null, values)
  recordTime.innerHTML = msToStr(record)

  const average = Math.floor(values.reduce((total, i) => total + i ,0) / values.length)
  averageTime.innerHTML = msToStr(average)
}

function renderResultCounter() {
  resultsCounter.innerHTML = results.length
}

//main functions
function addResult(e) {
  e.preventDefault()

  const currentDate = new Date()
  const currentDateTxt = `${currentDate.getDate()}/` +
    `${currentDate.getMonth()}/` +
    `${currentDate.getFullYear()}`

  const actualTimeTxt = msToStr(strToMs(`${enteredMin.value}:` +
    `${enteredSec.value}.` +
    `${enteredMil.value}`))

  if (results.length === 0) {
    recordTime.innerHTML = actualTimeTxt
    averageTime.innerHTML = actualTimeTxt
  }

  const recordDifTxt = msToStr(strToMs(recordTime.innerHTML) - strToMs(actualTimeTxt))
  const averageDifTxt = msToStr(strToMs(averageTime.innerHTML) - strToMs(actualTimeTxt))

  const newResult = {
    id: Date.now(),
    resultNum: results.length + 1,
    resultDate: currentDateTxt,
    actualTime: actualTimeTxt,
    recordDif: recordDifTxt,
    averageDif: averageDifTxt
  }

  results.push(newResult)

  enteredMin.value = ''
  enteredSec.value = ''
  enteredMil.value = ''

  renderResultNote(newResult)
  renderMainStats()
  renderResultCounter()
}

function deleteResult(e) {
  if (e.target.closest('.item-result__delete-btn')) {
    const parentNode = e.target.closest('.results__item')
    const parentId = Number(parentNode.id)
    const index = results.findIndex(task => task.id === parentId)

    results.splice(index, 1)
    parentNode.remove()
  }
}

//TODO delete
//TODO highlights
//TODO validation
//TODO localstorage
//TODO adaptive
