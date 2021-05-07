export  const filterChange = (filterItem) => {
    return{
        type: 'FILTER_SOME',
        data: filterItem
    }
}

const filterReducer = (state= '', action) => {
    switch(action.type){
        case 'FILTER_SOME': {
            // eslint-disable-next-line array-callback-return
            return action.data
        }
        default:
            return state
    }
}

export default filterReducer