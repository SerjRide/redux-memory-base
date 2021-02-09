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

const confirm = (text, func = () => {}, id, type = 'del') => ({
  type: 'MODAL',
  payload: [text, func, id, type]
})

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
  confirm
}
