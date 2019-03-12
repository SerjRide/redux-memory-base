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

const createQuestion = (currentCategory, question, answer, id) => {
  const timeStamp = Date.now()
  QuestionData[currentCategory].push({
    id: id,
    question: question,
    answer: answer,
    date:timeStamp
  });
  setBase(QuestionData);
};

const addCategoryNEW = function () {
  if (QuestionData.length === 0) return null;
  const position = findCountById('0000')
  const actual = QuestionData[position][0].id
  const qCount = QuestionData[position].length - 1
  console.log(qCount);
  if (actual === '0000') removeCategory(position);
  if (actual === '0000'&& qCount === 0) return null;
  QuestionData.splice(0,0,[{name: 'NEW', id: '0000'}])
  setBase(QuestionData)
};

const addedInNEW = function addedInNEW () {
  if (QuestionData.length === 0) return null;
  const position = findCountById('0000')
  let data = QuestionData, insideId = []
  data[position].map((item, i) => insideId[i] = item.id )
  for (let i = 0; i < data.length; i++) {
    if (i !== position) {
      for (let j = 1; j < data[i].length; j++) {
        const { id, question, answer } = data[i][j]
        // дни
        if (getAddedTime(id) < 2) {
          if (insideId.indexOf(id) === -1) {
            console.log('Вопрос добавлен');
            createQuestion(position, question, answer, id);
          } else console.log('Вопрос не добавлен');
        }
      }
    }
  }
};

const removeQuestion = (currentCategory, i) => {
  QuestionData[currentCategory].splice(i,1);
  setBase(QuestionData);
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

addCategoryNEW();
addedInNEW();

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
  addCategoryNEW,
  addedInNEW
}
