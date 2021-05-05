const notificationReducer = (state = 'Notification messages would be here', action) =>  {
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.message
        default:
            return state    
    }
}

export const setNotification = notification => {
    return {
        type: 'SET_NOTIFICATION',
        message: notification,
    }
}

export default notificationReducer