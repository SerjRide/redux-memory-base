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

const setBookmarks = (data) => {
  const serialObj = JSON.stringify(data)
  localStorage.setItem('Bookmarks', serialObj)
}


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
      if (getAddedTime(date) < 1) {
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
  addBookmark
}
