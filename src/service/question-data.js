const Base = [

  // Категория 1
  [
    {name:'Категория 1', id: 1552153939972 },

    // Вопрос 1
    {
      id: 1552153939975,
      question: 'Категория 1 - Вопрос 1',
      answer: 'Категория 1 - Ответ 1'
    },

    // Вопрос 2
    {
      id: 15521539399726,
      question: 'Категория 1 - Вопрос 2',
      answer: 'Категория 1 - Ответ 2'
    },

    // Вопрос 3
    {
      id: 15521539399727,
      question: 'Категория 1 - Вопрос 3',
      answer: 'Категория 1 - Ответ 3'
    },

  ],

  // Категория 2
  [
    {name:'Категория 2', id: 1552153939973 },

    // Вопрос 1
    {
      id: 1552153939978,
      question: 'Категория 2 - Вопрос 1',
      answer: 'Категория 2 - Ответ 1'
    },

    // Вопрос 2
    {
      id: 1552153939979,
      question: 'Категория 2 - Вопрос 2',
      answer: 'Категория 2 - Ответ 2'
    },

    // Вопрос 3
    {
      id: 1552153939980,
      question: 'Категория 2 - Вопрос 3',
      answer: 'Категория 2 - Ответ 3'
    },

  ],

  // Категория 3
  [
    {name:'Категория 3', id: 1552153939974 },


    // Вопрос 1
    {
      id: 1552153939981,
      question: 'Категория 3 - Вопрос 1',
      answer: 'Категория 3 - Ответ 1'
    },

    // Вопрос 2
    {
      id: 1552153939982,
      question: 'Категория 3 - Вопрос 2',
      answer: 'Категория 3 - Ответ 2'
    },

    // Вопрос 3
    {
      id: 1552153939983,
      question: 'Категория 3 - Вопрос 3',
      answer: 'Категория 3 - Ответ 3'
    },

  ]

];

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

//1552155568479

// 1552156340954

// const test = findId(2,8)
// console.log('test', test)

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
