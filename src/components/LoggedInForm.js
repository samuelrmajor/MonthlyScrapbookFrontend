import PropTypes from 'prop-types'
const LoggedInForm = ({
  user,
  handleLogout
}) => { return(
  <div>
    <h5>logged in as: {user.name}</h5>
    <form onSubmit={handleLogout}>
      <button type="submit">Log Out</button>
    </form>
  </div>
)}
LoggedInForm.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
export default LoggedInForm