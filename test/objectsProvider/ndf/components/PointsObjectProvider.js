/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
class PointsObjectProvider {
  txtPoints() { return '[data-testid="txtPoints"]@@Enabled_And_Visible||10'; }

  lblPoints() { return '//input[@data-testid="txtPoints"]//ancestor::div[contains(@class,"ant-input-number")]@@Enabled_And_Visible||10'; }

  lblInputValidate(text) { return `${'//div[@class="ant-form-item-explain ant-form-item-explain-error"]//div[text()="TEMP"]'.replace('TEMP', text)}@@displayed||10`; }
}
module.exports = PointsObjectProvider;
