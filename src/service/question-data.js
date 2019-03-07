const Base = [

  // Категория 1
  [
    {name:'Категория 1'},

    // Вопрос 1
    {
      question: 'Категория 1 - Вопрос 1',
      answer: 'Категория 1 - Ответ 1'
    },

    // Вопрос 2
    {
      question: 'Категория 1 - Вопрос 2',
      answer: 'Категория 1 - Ответ 2'
    },

    // Вопрос 3
    {
      question: 'Категория 1 - Вопрос 3',
      answer: 'Категория 1 - Ответ 3'
    },

  ],

  // Категория 2
  [
    {name:'Категория 2'},

    // Вопрос 1
    {
      question: 'Категория 2 - Вопрос 1',
      answer: 'Категория 2 - Ответ 1'
    },

    // Вопрос 2
    {
      question: 'Категория 2 - Вопрос 2',
      answer: 'Категория 2 - Ответ 2'
    },

    // Вопрос 3
    {
      question: 'Категория 2 - Вопрос 3',
      answer: 'Категория 2 - Ответ 3'
    },

  ],

  // Категория 3
  [
    {name:'Категория 3'},


    // Вопрос 1
    {
      question: 'Категория 3 - Вопрос 1',
      answer: 'Категория 3 - Ответ 1'
    },

    // Вопрос 2
    {
      question: 'Категория 3 - Вопрос 2',
      answer: 'Категория 3 - Ответ 2'
    },

    // Вопрос 3
    {
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

const createCategory = (name) => {
  QuestionData.push([{name: name}])
  setBase(QuestionData)
};

const removeCategory = (i) => {
  QuestionData.splice(i-1,1);
  setBase(QuestionData);
};

const createQuestion = (currentCategory, question, answer) => {
  const timeStamp = Date.now()
  QuestionData[currentCategory].push({
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
  changeQuestion
}
