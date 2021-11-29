/* eslint-disable class-methods-use-this */
class InterestObjectProvider {
  chkInterest() { return '//label[text()="Interest:"]/following-sibling::label//input@@Enabled_And_Visible||10'; }

  statusChkInterest() { return '//label[text()="Interest:"]/following-sibling::label@@Enabled_And_Visible||10'; }

  txtInterest() { return '#interest@@Enabled_And_Visible||10'; }

  txtInterestEnable() { return '//input[@id="interest"]//../..@@Enabled_And_Visible||10'; }
}
module.exports = InterestObjectProvider;
