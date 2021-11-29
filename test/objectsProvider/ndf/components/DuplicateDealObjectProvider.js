/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
class DuplicateDealObjectProvider {  

  modalDuplicateDeal() { return '//div[contains(@class, "ant-modal-title") and text()="Confirm Submit Duplicate Deal"]@@Enabled_And_Visible||2'; }  

  btnCancel() { return '[data-testid="submit-deal-modal-cancel"]@@Enabled_And_Visible||10'}

  btnSubmitAgain() { return '[data-testid="submit-deal-modal-submit"]@@Enabled_And_Visible||10'}
}
module.exports = DuplicateDealObjectProvider;
