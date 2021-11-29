const expect = require('chai').expect;
const SharedStore = require('../../../core/store/SharedStore.js');
const Logs = require('../../../core/utility/Logs.js');

const sharedStore = new SharedStore();
const log = new Logs();

describe('E2E scenario for Spot', () => {
  it('C22528 SPT USD CNH 0D (Amend)', () => {
    // BML Compare/E2E Verification
    log.e2eLog(`C22528 deal ID is      : ${sharedStore.getValueFromStore('C22528')}`);
    log.e2eLog(`C22529 deal ID is      : ${sharedStore.getValueFromStore('C22529')}`);
    log.e2eLog(`C22561 deal ID is      : ${sharedStore.getValueFromStore('C22561')}`);
    log.e2eLog(`C22562 deal ID is      : ${sharedStore.getValueFromStore('C22562')}`);
    log.e2eLog(`C22563 deal ID is      : ${sharedStore.getValueFromStore('C22563')}`);
    log.e2eLog(`C22564 deal ID is      : ${sharedStore.getValueFromStore('C22564')}`);
    log.e2eLog(`C22565 deal ID is      : ${sharedStore.getValueFromStore('C22565')}`);
    // SPOT RTNS Verification
    log.e2eLog(`RTNS_C22612 deal ID is : ${sharedStore.getValueFromStore('RTNS_C22612')}`);
    log.e2eLog(`RTNS_C22613 deal ID is : ${sharedStore.getValueFromStore('RTNS_C22613')}`);
    log.e2eLog(`RTNS_C22614 deal ID is : ${sharedStore.getValueFromStore('RTNS_C22614')}`);
    log.e2eLog(`RTNS_C22615 deal ID is : ${sharedStore.getValueFromStore('RTNS_C22615')}`);
    log.e2eLog(`RTNS_C22616 deal ID is : ${sharedStore.getValueFromStore('RTNS_C22616')}`);
    log.e2eLog(`RTNS_C22617 deal ID is : ${sharedStore.getValueFromStore('RTNS_C22617')}`);
    // SPOT MBS2 Verification
    log.e2eLog(`MBS2_C22573 deal ID is : ${sharedStore.getValueFromStore('MBS2_C22573')}`);
    log.e2eLog(`MBS2_C22574 deal ID is : ${sharedStore.getValueFromStore('MBS2_C22574')}`);
    log.e2eLog(`MBS2_C22575 deal ID is : ${sharedStore.getValueFromStore('MBS2_C22575')}`);
    log.e2eLog(`MBS2_C22576 deal ID is : ${sharedStore.getValueFromStore('MBS2_C22576')}`);
    log.e2eLog(`MBS2_C22577 deal ID is : ${sharedStore.getValueFromStore('MBS2_C22577')}`);
    log.e2eLog(`MBS2_C22578 deal ID is : ${sharedStore.getValueFromStore('MBS2_C22578')}`);
  });
});
