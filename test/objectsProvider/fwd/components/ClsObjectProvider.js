/* eslint-disable class-methods-use-this */
class ClsObjectProvider {
  chkCls1() { return '//input[@data-testid="testCls1"]@@Enabled_And_Visible||10'; }

  chkCls2() { return '//input[@data-testid="testCls2"]@@Enabled_And_Visible||10'; }

  chkClsState1() { return '//input[@data-testid="testCls1"]/parent::span[contains(@class,"ant-checkbox")]@@Enabled_And_Visible||10'; }

  chkClsState2() { return '//input[@data-testid="testCls2"]/parent::span[contains(@class,"ant-checkbox")]@@Enabled_And_Visible||10'; }
}
module.exports = ClsObjectProvider;
