const Notification = ({ type, message }) => {



  if (message === null) {
    return null
  }
  else if (type === 'error') {

    const styles = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }


    return (
      <div style = {styles}>
        {message}
      </div>
    )}

  else {
    const styles = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
    return (
      <div style ={styles}>
        {message}
      </div>
    )
  }
}

export default Notification