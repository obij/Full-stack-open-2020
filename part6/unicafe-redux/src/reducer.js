const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const changedState= {
        ...initialState, good: + 1
      }
      return changedState
    case 'OK':
      const changedState2= {
        ...initialState, ok: + 1
      }
      return changedState2
    case 'BAD':
      const changedState3= {
        ...initialState, bad: + 1
      }
      return changedState3
    case 'ZERO':
      const changedState4= {
        good: 0,
        ok: 0,
        bad: 0
      }
      return changedState4
    case 'DO_NOTHING':
      return state  
    default: return state
  }
  
}

export default counterReducer