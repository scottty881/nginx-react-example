import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import {removeDuplicates, generateEmaiList} from './generateList';

const MAX_ALLOWED_NUMBER = 1000000;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {submittedNumber: ''};
  }
  handleChange(event) {
    this.setState({submittedNumber: parseInt(event.target.value)});
  }
  onSubmit() {
    const {dispatch} = this.props;
    if (!this.state.submittedNumber) {
      return;
    }
    console.log(this.state)
    if (this.state.submittedNumber >= MAX_ALLOWED_NUMBER) {
      dispatch({
        type: 'CLEAR_RESULTS'
      });
      return dispatch({
        type: 'ERROR',
        message: `${this.state.submittedNumber} is greater than allowed`
      });
    }
    const result = removeDuplicates(generateEmaiList(this.state.submittedNumber));
    dispatch({type: 'CLEAR_ERROR'});
    dispatch({
      type: 'RECEIVE_RESULTS',
      time: result.time,
      numberOfDuplicates: result.numberOfDuplicates,
      originalLength: result.originalLength
    })
  }
  renderError() {
    const {message} = this.props.error || {};
    if (message) {
      return (
        <div>
          <p>Error: {message}</p>
        </div>
      );
    }
  }
  renderResults() {
    const {time, numberOfDuplicates, originalLength} = this.props.results || {};
    if (time >= 0 && numberOfDuplicates && originalLength) {
      return (
        <div>
          <p>Time to generate duplicate free list: {time} ms</p>
          <p>Number of duplicates: {numberOfDuplicates}</p>
          <p>Original list length: {originalLength}</p>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Submit a number</h2>
        </div>
        <p className="App-intro">
          <input type="number" type={"number"} placeholder={"Enter a number"} value={this.state.submittedNumber} onChange={this.handleChange.bind(this)}/>
          <input type="submit" onClick={this.onSubmit.bind(this)} value="submit"/>
        </p>
        {this.renderError()}
        {this.renderResults()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    results: state.results,
    error: state.error
  }
}

const ConnectedApp = connect(
  mapStateToProps
)(App);

export default ConnectedApp
