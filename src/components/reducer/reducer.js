const initialState = [

  null, // текущая Категория
  null, // текущий Вопрос
  0, // update
  false, // режим добавления нового вопроса
  false, // режим редактирования вопроса
  null, // режим алерта
  true, // тип алерта
  '', // Строка поиск по Категориям
  '', // Строка поиска по Вопросам
  1 //Количество страниц Category List

]

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case 'UPDATE':
      return state = [
        null,
        null,
        state[2] + 1,
        false,
        false,
        state[5],
        state[6],
        state[7],
        '',
        state[9]
      ];

    case 'SET_CATEGORY':
      return state = [
        action.payload,
        null,
        state[2],
        false,
        false,
        state[5],
        state[6],
        state[7],
        '',
        state[9]
      ];

    case 'SET_QUESTION':
      return state = [
        state[0] ,
        action.payload,
        state[2],
        false,
        false,
        state[5],
        state[6],
        state[7],
        state[8],
        state[9]
      ];

    case 'HIDE_PLAYER':
      return state = [
        state[0] ,
        null,
        state[2],
        false,
        false,
        state[5],
        state[6],
        state[7],
        state[8],
        state[9]
      ];

    case 'ADD_NEW_QUESTION':
      return state = [
        state[0] ,
        state[1],
        state[2],
        true,
        false,
        state[5],
        state[6],
        state[7],
        state[8],
        state[9]
      ];

    case 'EDIT_QUESTION':
      return state = [
        state[0] ,
        action.payload,
        state[2],
        false,
        true,
        state[5],
        state[6],
        state[7],
        state[8],
        state[9]
      ];

    case 'ALERT':
      return state = [
        state[0] ,
        state[1],
        state[2],
        state[3],
        state[4],
        action.payload[0],
        action.payload[1],
        state[7],
        state[8],
        state[9]
      ];

    case 'CATEGORY_SEARCH':
      return state = [
        state[0] ,
        state[1],
        state[2],
        state[3],
        state[4],
        state[5],
        state[6],
        action.payload,
        state[8],
        state[9]
      ];

    case 'QUESTION_SEARCH':
      return state = [
        state[0] ,
        state[1],
        state[2],
        state[3],
        state[4],
        state[5],
        state[6],
        state[7],
        action.payload,
        state[9]
      ];

    case 'CHANGE_CATEGORY_PAGE':
      return state = [
        state[0] ,
        state[1],
        state[2],
        state[3],
        state[4],
        state[5],
        state[6],
        state[7],
        state[8],
        action.payload
      ];

    default:
      return state;
  }
}

export default reducer;
