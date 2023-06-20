// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import AppointmentItem from '../AppointmentItem/index'

const initialAppointmentsList = []

class Appointments extends Component {
  state = {
    appointmentsList: initialAppointmentsList,
    starredList: [],
    isStarredSearch: false,
    title: '',
    date: '',
  }

  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      appointmentTitle: title,
      appointmentScheduledDate: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isAppointmentStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onToggleStarredInEachAppointment = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {
            ...eachAppointment,
            isAppointmentStarred: !eachAppointment.isAppointmentStarred,
          }
        }
        return eachAppointment
      }),
    }))
  }

  onSearchedStarredAppointments = () => {
    this.setState(prevState => ({
      starredList: !prevState.isStarredSearch
        ? prevState.appointmentsList.filter(
            eachAppointment => eachAppointment.isAppointmentStarred,
          )
        : prevState.appointmentsList,
      isStarredSearch: !prevState.isStarredSearch,
    }))
  }

  render() {
    const {
      appointmentsList,
      starredList,
      title,
      date,
      isStarredSearch,
    } = this.state
    let starredButtonStyle = ''
    let listToBeExecuted = ''
    if (isStarredSearch) {
      starredButtonStyle = 'starred-button-active'
      listToBeExecuted = starredList
    } else {
      starredButtonStyle = 'starred-button-inActive'
      listToBeExecuted = appointmentsList
    }
    return (
      <div className="bg-container">
        <div className="appointment-app-container">
          <div className="app-top-section">
            <div>
              <form className="entry-details-container">
                <h1 className="appointment-heading"> Add Appointment </h1>
                <div className="input-element-container">
                  <label htmlFor="text-input" className="text-input-label">
                    TITLE
                  </label>
                  <input
                    type="text"
                    id="text-input"
                    className="input-text"
                    onChange={this.onChangeTitle}
                    value={title}
                  />
                </div>
                <div className="date-element-container">
                  <label htmlFor="date-input" className="date-input-label">
                    DATE
                  </label>
                  <input
                    type="date"
                    id="date-input"
                    className="input-date"
                    onChange={this.onChangeDate}
                    value={date}
                  />
                </div>
                <button
                  className="add-button"
                  type="submit"
                  onClick={this.onAddAppointment}
                >
                  Add
                </button>
              </form>
            </div>
            <div className="top-section-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr size="1px" color="#b5b7c4" />
          <div className="app-bottom-section">
            <div className="heading-starred-button-container">
              <h1 className="appointment-heading-bottom"> Appointments </h1>
              <button
                className={starredButtonStyle}
                type="button"
                onClick={this.onSearchedStarredAppointments}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list-container">
              {listToBeExecuted.map(eachAppointment => (
                <AppointmentItem
                  eachAppointmentDetails={eachAppointment}
                  key={eachAppointment.id}
                  onToggleStarredInEachAppointment={
                    this.onToggleStarredInEachAppointment
                  }
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
