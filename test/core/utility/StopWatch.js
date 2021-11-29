class StopWatch {
  constructor() {
    this.stopTime = 0;
  }

  startStopWatch(time) {
    this.stopTime = new Date().getTime() + (parseFloat(time) * 1000);
  }

  isWatchRunning() {
    if (new Date().getTime() < this.stopTime) {
      return true;
    }
    return false;
  }
}
module.exports = StopWatch;
