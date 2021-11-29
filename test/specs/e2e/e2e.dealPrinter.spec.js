const SharedStore = require('../../core/store/SharedStore.js');
const Logs = require('../../core/utility/Logs.js');

const sharedStore = new SharedStore();
const log = new Logs();

describe('E2E Downstream Deals', () => {
  it('NDF Deal Printer', () => {
    // Downstream Deals
    log.e2eLog(`C6038 deal ID is              : ${sharedStore.getValueFromStore('C6038')}`);
    log.e2eLog(`C6041 deal ID is              : ${sharedStore.getValueFromStore('C6041')}`);
    log.e2eLog(`C6043 - Leg1 deal ID is       : ${sharedStore.getValueFromStore('C6043 - Leg1')}`);
    log.e2eLog(`C6043 - Leg2 deal ID is       : ${sharedStore.getValueFromStore('C6043 - Leg2')}`);
    log.e2eLog(`C6388 deal ID is              : ${sharedStore.getValueFromStore('C6388')}`);
    log.e2eLog(`C12746 - Leg1 deal ID is      : ${sharedStore.getValueFromStore('C12746 - Leg1')}`);
    log.e2eLog(`C12746 - Leg2 deal ID is      : ${sharedStore.getValueFromStore('C12746 - Leg2')}`);
    log.e2eLog(`C10265 - Leg1 deal ID is      : ${sharedStore.getValueFromStore('C10265 - Leg1')}`);
    log.e2eLog(`C10265 - Leg2 deal ID is      : ${sharedStore.getValueFromStore('C10265 - Leg2')}`);
    log.e2eLog(`C12089 - Leg1 deal ID is      : ${sharedStore.getValueFromStore('C12089 - Leg1')}`);
    log.e2eLog(`C12089 - Leg2 deal ID is      : ${sharedStore.getValueFromStore('C12089 - Leg2')}`);
    log.e2eLog(`C13074 deal ID is             : ${sharedStore.getValueFromStore('C13074')}`);
  });

  it('FWD Deal Printer', () => {
    // Downstream Deals
    log.e2eLog(`C12496 deal ID is      : ${sharedStore.getValueFromStore('C12496')}`);
    log.e2eLog(`C12497 deal ID is      : ${sharedStore.getValueFromStore('C12497')}`);
    log.e2eLog(`C12498 deal ID is      : ${sharedStore.getValueFromStore('C12498')}`);
    log.e2eLog(`C12501 deal ID is      : ${sharedStore.getValueFromStore('C12501')}`);
    log.e2eLog(`C12505 deal ID is      : ${sharedStore.getValueFromStore('C12505')}`);
    log.e2eLog(`C13105 deal ID is      : ${sharedStore.getValueFromStore('C13105')}`);
    log.e2eLog(`C18592 deal ID is      : ${sharedStore.getValueFromStore('C18592')}`);
  });

  it('FWD FWD Deal Printer', () => {
    // Downstream Deals
    log.e2eLog(`C12506 deal ID is      : ${sharedStore.getValueFromStore('C12506')}`);
    log.e2eLog(`C12507 deal ID is      : ${sharedStore.getValueFromStore('C12507')}`);
    log.e2eLog(`C12510 deal ID is      : ${sharedStore.getValueFromStore('C12510')}`);
    log.e2eLog(`C12511 deal ID is      : ${sharedStore.getValueFromStore('C12511')}`);
    log.e2eLog(`C13106 deal ID is      : ${sharedStore.getValueFromStore('C13106')}`);
    log.e2eLog(`C18593 deal ID is      : ${sharedStore.getValueFromStore('C18593')}`);
  });

  it('FWD Outright Deal Printer', () => {
    // Downstream Deals
    log.e2eLog(`C12516 deal ID is      : ${sharedStore.getValueFromStore('C12516')}`);
    log.e2eLog(`C12519 deal ID is      : ${sharedStore.getValueFromStore('C12519')}`);
    log.e2eLog(`C13107 deal ID is      : ${sharedStore.getValueFromStore('C13107')}`);
  });

  it('SPT Deal Printer', () => {
    // Downstream Deals
    log.e2eLog(`C22528 deal ID is      : ${sharedStore.getValueFromStore('C22528')}`);
    log.e2eLog(`C22529 deal ID is      : ${sharedStore.getValueFromStore('C22529')}`);
    log.e2eLog(`C22561 deal ID is      : ${sharedStore.getValueFromStore('C22561')}`);
    log.e2eLog(`C22562 deal ID is      : ${sharedStore.getValueFromStore('C22562')}`);
    log.e2eLog(`C22563 deal ID is      : ${sharedStore.getValueFromStore('C22563')}`);
    log.e2eLog(`C22564 deal ID is      : ${sharedStore.getValueFromStore('C22564')}`);
    log.e2eLog(`C22565 deal ID is      : ${sharedStore.getValueFromStore('C22565')}`);
  });
});
