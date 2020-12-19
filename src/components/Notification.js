import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/notification.css'


const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.message === null) {
    return null
  }

  return (
    <div className={notification.className}>
      {notification.message}
    </div>
  )
}

export default Notification