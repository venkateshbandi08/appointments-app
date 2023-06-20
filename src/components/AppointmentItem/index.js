import './index.css'

const AppointmentItem = props => {
  const {eachAppointmentDetails, onToggleStarredInEachAppointment} = props
  const {
    id,
    appointmentTitle,
    appointmentScheduledDate,
    isAppointmentStarred,
  } = eachAppointmentDetails
  const onClickOnStarAppointment = () => {
    onToggleStarredInEachAppointment(id)
  }
  const isClickedOnStar = isAppointmentStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-style">
      <div className="appointName-starredButton-container">
        <p className="appointment-name">{appointmentTitle}</p>
        <button
          className="star-image"
          type="button"
          onClick={onClickOnStarAppointment}
          data-testid="star"
        >
          <img src={isClickedOnStar} alt="star" />
        </button>
      </div>
      <p className="appointment-date"> Date: {appointmentScheduledDate} </p>
    </li>
  )
}

export default AppointmentItem
