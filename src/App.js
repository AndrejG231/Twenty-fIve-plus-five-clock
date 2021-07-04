import React, { Component, createRef } from "react";

import LengthInput from "./LengthInput";

import "./main.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.defaultSession = 25 * 60;
    this.defaultBreak = 5 * 60;
    this.state = {
      session: true,
      running: false,
      currentSession: this.defaultSession,
      currentBreak: this.defaultBreak,
      runningTime: this.defaultSession,
    };

    this.handleTimeProgress = this.handleTimeProgress.bind(this);
    this.setSession = this.setSession.bind(this);
    this.setBreak = this.setBreak.bind(this);
    this.audio = createRef();
    this.interval;
  }

  setSession(value) {
    const newVal = Math.max(60, Math.min(value, 3600));
    const newState = {
      currentSession: newVal,
      running: false,
      session: true,
      runningTime: newVal,
    };
    return this.setState(newState);
  }

  setBreak(value) {
    const newState = {
      currentBreak: Math.max(60, Math.min(value, 3600)),
      running: false,
      session: true,
      runningTime: this.state.currentSession,
    };
    return this.setState(newState);
  }

  componentDidMount() {
    this.interval = setInterval(this.handleTimeProgress, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleTimeProgress() {
    if (this.state.running) {
      // If time > 0, both break and session act same
      if (this.state.runningTime > 0) {
        if (this.state.runningTime === 1) {
          // Play audio in last second
          this.audio.current.play();
        }
        this.setState({ runningTime: this.state.runningTime - 1 });
      } else {
        // Reset audio on session switch
        this.audio.current.pause();
        this.audio.current.currentTime = 0;
        if (this.state.session) {
          //   Session is over
          this.setState({
            runningTime: this.state.currentBreak,
            session: false,
          });
        } else {
          // Break is over
          this.setState({
            runningTime: this.state.currentSession,
            session: true,
          });
        }
      }
    }
  }

  render() {
    const runningTime = this.state.runningTime;
    const minutes = Math.floor(runningTime / 60);
    const seconds = runningTime % 60;

    return (
      <div>
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          ref={this.audio}
        />
        <LengthInput
          type="session"
          value={this.state.currentSession}
          setValue={this.setSession}
        />
        <LengthInput
          type="break"
          value={this.state.currentBreak}
          setValue={this.setBreak}
        />
        <h1 id="timer-label">{this.state.session ? "Session" : "Break"}</h1>
        <div id="time-left">{`${minutes >= 10 ? minutes : "0" + minutes}:${
          seconds >= 10 ? seconds : "0" + seconds
        }`}</div>
        <button
          id="start_stop"
          onClick={() => this.setState({ running: !this.state.running })}
        >
          {this.state.running ? "Stop" : "Start"}
        </button>
        <button
          id="reset"
          onClick={() => {
            //   Reset audio
            this.audio.current.pause();
            this.audio.current.currentTime = 0;

            // Reset state
            this.setState({
              running: false,
              currentBreak: this.defaultBreak,
              currentSession: this.defaultSession,
              runningTime: this.defaultSession,
              session: true,
            });
          }}
        >
          Reset
        </button>
      </div>
    );
  }
}

export default App;
