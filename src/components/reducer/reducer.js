const initialState = [

  null, // 0-текущая Категория
  null, // 1-текущий Вопрос
  0, // 2-update
  false, // 3-режим добавления нового вопроса
  false, // 4-режим редактирования вопроса
  null, // 5-режим алерта
  true, // 6-тип алерта
  '', // 7-Строка поиск по Категориям
  '', // 8-Строка поиска по Вопросам
  [0,1], // 9-текущая страница списка категорий
  [], // 10-отрендеренный список категорий
  [null,0,0,1] // 11-отрендеренный список вопросов

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
        state[9],
        state[10],
        state[11]
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
        state[9],
        state[10],
        state[11]
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
        state[9],
        state[10],
        state[11]
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
        state[9],
        state[10],
        state[11]
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
        state[9],
        state[10],
        state[11]
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
        state[9],
        state[10],
        state[11]
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
        state[9],
        state[10],
        state[11]
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
        state[9],
        state[10],
        state[11]
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
        state[9],
        state[10],
        state[11]
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
        action.payload,
        state[10],
        state[11]
      ];

    case 'CATEGORY_RENDER_LIST':
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
        state[9],
        action.payload,
        state[11]
      ];

    case 'QUESTION_RENDER_LIST':
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
        state[9],
        state[10],
        action.payload
      ];

    default:
      return state;
  }
}

export default reducer;
