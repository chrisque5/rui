/* eslint-disable radix */
/* eslint-disable no-undef */

const Logs = require('../utility/Logs.js');

class MouseMovementActions {
  constructor() {
    this.log = new Logs();
  }

  moveTo(element, xoffset, yoffset) {
    try {
      element.moveTo(xoffset, yoffset);
    } catch (e) {
      this.log.errorLog(`Error While moving the mouse to  X : ${xoffset} and Y : ${yoffset} : ${e}`);
    }
    return undefined;
  }

  mouseDown(element) {
    this.moveTo(element);
    this.buttonDown();
    this.buttonUp();
  }

  moveToObject(selector) {
    try {
      browser.moveToElement(selector);
    } catch (e) {
      this.log.errorLog(`Error While moving the mouse to  ${e}`);
    }
    return undefined;
  }

  buttonDown() {
    try {
      browser.buttonDown(0);
    } catch (e) {
      this.log.errorLog(`Error while buttonDown ${e}`);
    }
  }

  buttonUp() {
    try {
      browser.buttonUp(0);
    } catch (e) {
      this.log.errorLog(`Error while buttonDown ${e}`);
    }
  }

  hoverElement(xoffset, yoffset) {
    try {
      browser.actions([{
        type: 'pointer',
        id: 'finger1',
        actions: [{
          type: 'pointerMove', duration: 0, x: xoffset, y: yoffset,
        }],
      }]);
    } catch (e) {
      this.log.errorLog(`Error while performing the hover on the element.${e}`);
    }
  }

  mouseDownByActions(element) {
    try {
      const sourceX = parseInt(element.getLocation('x'));
      const sourceY = parseInt(element.getLocation('y'));
      browser.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'mouse' },
        actions: [
          {
            type: 'pointerMove', duration: 0, origin: 'pointer', x: sourceX, y: sourceY,
          },
          {
            type: 'pointerDown', button: 0,
          },
        ],
      }]);
    } catch (e) {
      this.log.errorLog(`Error while performing the hover on the element.${e}`);
    }
  }

  hoverElementByJScript(element) {
    try {
      const script = `var evObj = document.createEvent('MouseEvents');
    evObj.initMouseEvent("mouseover",true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    arguments[0].dispatchEvent(evObj);`;

      this.log.log(`Hover Script is : ${script}`);
      browser.execute(script, element.value);
    } catch (e) {
      this.log.errorLog(`Error while hover by javascript ${e}`);
    }
  }

  dragNDropByActions(source, target) {
    try {
      const sourceX = parseInt(source.getLocation('x'));
      const sourceY = parseInt(source.getLocation('y'));
      const targetX = parseInt(target.getLocation('x'));
      const targetY = parseInt(target.getLocation('y'));
      browser.actions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'mouse' },
        actions: [
          {
            type: 'pointerMove', duration: 1000, origin: 'pointer', x: sourceX, y: sourceY,
          },
          {
            type: 'pointerDown', button: 0,
          },
          {
            type: 'pointerMove', duration: 1000, origin: 'pointer', x: targetX, y: targetY,
          },
          {
            type: 'pointerUp', button: 0,
          },
        ],
      }]);
    } catch (e) {
      this.log.errorLog(`Error while performing the hover on the element.${e}`);
    }
  }

  dragNDrop(element, target, duration) {
    try {
      element.dragAndDrop(target, duration);
    } catch (e) {
      this.log.errorLog(`Error While performing the drag and drop : ${e}`);
    }
  }

  saveScreenshot(element, path) {
    try {
      element.saveScreenshot(path);
    } catch (e) {
      this.log.errorLog(`Error while saving the screen shot to the path : ${path}`);
    }
    return undefined;
  }
}

module.exports = MouseMovementActions;
