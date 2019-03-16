const Base = require('./default.json')

if (!localStorage.Base) {
  const serialObj = JSON.stringify(Base)
  localStorage.setItem('Base', serialObj)
}

const QuestionData = JSON.parse(localStorage.getItem("Base"))

const setBase = (data) => {
  const serialObj = JSON.stringify(data)
  localStorage.removeItem(Base)
  localStorage.setItem('Base', serialObj)
};

const findId = (category, question = 0) => {
  const data = QuestionData;
  let id = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (i === category) {
        if (j === question){
          id = data[i][j].id;
        }
      }
    }
  }
  return id
};

const findCountById = (id, type = true) => {
  let data = QuestionData, num = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j].id === id) {
        num = type ? i : j
      }
    }
  }
  return num
};

const getAddedTime = (id, type = 'days') => {
  const now = Date.now();
  const seconds = (now - id) / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (type === 'days'   ) return Math.floor(days);
  if (type === 'seconds') return Math.floor(seconds);
  if (type === 'minutes') return Math.floor(minutes);
  if (type === 'hours'  ) return Math.floor(hours);
  if (type === 'seconds') return Math.floor(seconds);
}

// 1552330022551

const createCategory = (name, id) => {
  QuestionData.push([{name: name, id: id }])
  setBase(QuestionData)
};

const removeCategory = (i) => {
  const id = findCountById(i)
  QuestionData.splice(id,1);
  setBase(QuestionData);
};

const createQuestion = (currentCategory, question, answer, id, timeStamp) => {
  timeStamp = timeStamp === undefined ? Date.now() : timeStamp
  QuestionData[currentCategory].push({
    id: id,
    question: question,
    answer: answer,
    date:timeStamp
  });
  setBase(QuestionData);
};

const addedInNEW = function() {
  let data = QuestionData, insideDate = []
  data[0].map((item, i) => insideDate[i] = item.date )
  data[0].splice(1, data[0].length)
  for (let i = 2; i < data.length; i++) {
    for (let j = 1; j < data[i].length; j++) {
      const {question, answer, date } = data[i][j];
      const id = data[i][j].id - Math.pow(10,12);
      if (getAddedTime(date) < 3) {
        if (insideDate.indexOf(QuestionData[0]) === -1) {
          createQuestion(0, question, answer, id, date);
        }
      }
    }
  }
  let show = QuestionData[0].length === 1 ? false : true
  QuestionData[0][0].display = show
};

const addBookmark = function(id) {
  const category = findCountById(id);
  const question = findCountById(id, false);
  if (QuestionData[category][question].bookmark === true){
    QuestionData[category][question].bookmark = false
  } else {
    QuestionData[category][question].bookmark = true
  }
  QuestionData[1].splice(1,QuestionData[1].length - 1);
  setBase(QuestionData);
  addedInBookmarks();
}

const updateBookmarkData = function() {
  let data = QuestionData, insideDate = []
  data[1].map((item, i) => {
    if (item.date === undefined) return null
    return insideDate[i] = item.date
  })
  return insideDate
}

const removeQuestion = (currentCategory, i) => {
  QuestionData[currentCategory].splice(i,1);
  setBase(QuestionData);
}

const addedInBookmarks = function() {
  let data = QuestionData;
  updateBookmarkData();
  for (let i = 2; i < data.length; i++) {
    for (let j = 1; j < data[i].length; j++) {
      const { question, answer, bookmark, date } = data[i][j];
      const id = data[i][j].id - Math.pow(10,11);
      if (bookmark === true) {
        if (updateBookmarkData().indexOf(data[i][j].date) === -1) {
          createQuestion(1, question, answer, id, date);
        }
      }
    }
  }
  let show = QuestionData[1].length === 1 ? false : true
  QuestionData[1][0].display = show
}


const rename = (currentCategory, newName) => {
  QuestionData[currentCategory][0].name = newName;
  setBase(QuestionData);
}

const changeQuestion = (currentCategory,
 currentQuestion, newQuestion, newAnswer) => {
  QuestionData[currentCategory][currentQuestion]
    .question = newQuestion;
  QuestionData[currentCategory][currentQuestion]
    .answer = newAnswer;
  setBase(QuestionData);
}

const alignToFitScreen = (type) => {
  const scr_width = document.documentElement.clientWidth;
  const scr_height = document.documentElement.clientHeight;
  let height, width;
  if (scr_width <= 992) { width = 1 }
  else { width = height }
  if (scr_height <= 1050 && scr_height >= 1000) height = 19
  if (scr_height <= 1000 && scr_height >= 950) height = 19
  if (scr_height <= 950  && scr_height >= 900) height = 18
  if (scr_height <= 900  && scr_height >= 850) height = 17
  if (scr_height <= 850  && scr_height >= 800) height = 16
  if (scr_height <= 800  && scr_height >= 750) height = 15
  if (scr_height <= 750  && scr_height >= 700) height = 14
  if (scr_height <= 700  && scr_height >= 650) height = 13
  if (scr_height <= 650  && scr_height >= 600) height = 13
  if (scr_height <= 600  && scr_height >= 550) height = 10
  if (scr_height <= 550  && scr_height >= 500) height = 10
  if (scr_height <= 500  && scr_height >= 450) height = 9
  if (scr_height <= 450  && scr_height >= 400) height = 9
  if (scr_height <= 400  && scr_height >= 350) height = 8
  if (scr_height <= 350  && scr_height >= 300) height = 5
  if (scr_height <= 300  && scr_height >= 250) height = 5
  if (scr_height <= 250  && scr_height >= 200) height = 4
  if (scr_height <= 200  && scr_height >= 150) height = 4
  if (scr_height <= 150  && scr_height >= 100) height = 3
  if (type === 'width') return width;
  if (type === 'height') return height;
}

addedInNEW();
addBookmark();

export {
  QuestionData,
  createCategory,
  removeCategory,
  createQuestion,
  removeQuestion,
  rename,
  changeQuestion,
  findId,
  findCountById,
  addedInNEW,
  addBookmark,
  alignToFitScreen
}
