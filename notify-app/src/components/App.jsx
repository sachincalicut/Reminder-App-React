import React, { Component } from "react";
import { connect } from "react-redux";
import { addReminder, deleteReminder, clearReminders } from "../actions";
import { Scrollbars } from "react-custom-scrollbars";
import  SimpleLineIcon  from "react-simple-line-icons";
import moment from "moment";
// import { bindActionCreators } from 'redux';
import "../App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    };
  }

  addReminder() {
    // console.log('this', this);
    console.log ('this.state.dueDate', this.state.dueDate);
    this.props.addReminder(this.state.text, this.state.dueDate);
  }
  deleteReminder(id) {
    //   console.log('deleting app listing ', id);
    //   console.log('this.props', this.props);

    this.props.deleteReminder(id);
  }

  renderReminder() {
    const { reminders } = this.props;
    return (
      <Scrollbars
        onScroll={this.handleScroll}
        onScrollFrame={this.handleScrollFrame}
        onScrollStart={this.handleScrollStart}
        onScrollStop={this.handleScrollStop}
        onUpdate={this.handleUpdate}
        renderView={this.renderView}
        renderTrackHorizontal={this.renderTrackHorizontal}
        renderTrackVertical={this.renderTrackVertical}
        renderThumbHorizontal={this.renderThumbHorizontal}
        renderThumbVertical={this.renderThumbVertical}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={400}
        autoHeight
        autoHeightMin={0}
        autoHeightMax={400}
        thumbMinSize={30}
        universal={true}
        {...this.props}
      >
        <ul className="list-group col-sm-12 m-t-sm">
          {reminders.map((reminder) => {
            return (
              <li key={reminder.id} className="list-group-item">
                <div className="list-item">{reminder.text}<div className="seperator"><SimpleLineIcon name="clock" />{moment(new Date(reminder.dueDate)).fromNow()}</div></div>
                <div
                  className="list-item delete-btn"
                  onClick={() => this.deleteReminder(reminder.id)}
                >
                  <SimpleLineIcon name="trash" />
                </div>
              </li>
            );
          })}
        </ul>
      </Scrollbars>
    );
  }

  render() {
    console.log("this.props", this.props);
    return (
      <div className="App">
        <div className="title">Reminder Events And Programs</div>

        <div className="form-inline">
          <div className="form-group">
            <input
              className="form-control lg-input"
              placeholder="Tell me Something..."
              onChange={(event) => this.setState({ text: event.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control" type="datetime-local" onChange={event => this.setState({dueDate: event.target.value})}
              />
          </div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => this.addReminder()}
          >
            Add Reminder
          </button>
          <div
            className="btn btn-danger pull-right btn-sm"
            onClick={() => this.props.clearReminders()}
          >
            Clear All
          </div>
          {this.renderReminder()}
         
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('state', state);
  return {
    reminders: state,
  };
}
// function mapDispatchToProps(dispatch){
//     return bindActionCreators({addReminder}, dispatch);
// }

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);
