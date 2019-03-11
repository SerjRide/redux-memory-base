const update = () => ({ type: 'UPDATE' })

const setCategory = (id) => ({ type: 'SET_CATEGORY',
                               payload: id })

const setQuestion = (id) => ({ type: 'SET_QUESTION',
                              payload: id })

const hidePlayer = () => ({ type: 'HIDE_PLAYER' })

const addNewQuestion = () => ({ type: 'ADD_NEW_QUESTION' })

const editCategory = () => ({ type: 'EDIT_CATEGORY' })

const editQuestion = (id) => ({ type: 'EDIT_QUESTION',
                              payload: id})

const alert = (text, type = true) => ({ type: 'ALERT',
                                       payload: [text, type] })

const categorySearch = (text) => ({ type: 'CATEGORY_SEARCH',
                                    payload: text })

const questionSearch = (text) => ({ type: 'QUESTION_SEARCH',
                                    payload: text  })

const changeCategoryPage = (num) => ({ type: 'CHANGE_CATEGORY_PAGE',
                                        payload: num })

const categoryList = (items) => ({ type: 'CATEGORY_RENDER_LIST',
                                        payload: items })

const questionList = (items) => ({ type: 'QUESTION_RENDER_LIST',
                                        payload: items })

export {
  setCategory,
  setQuestion,
  hidePlayer,
  update,
  addNewQuestion,
  editCategory,
  editQuestion,
  alert,
  categorySearch,
  questionSearch,
  changeCategoryPage,
  categoryList,
  questionList
}
