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


export {
  QuestionData,
  createCategory,
  removeCategory,
  createQuestion,
  removeQuestion,
  rename,
  changeQuestion,
  findId,
  findCountById
}
