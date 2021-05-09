
import React from 'react'
//import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notifications= props.notifications
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notifications}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}
const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification

//export default Notification