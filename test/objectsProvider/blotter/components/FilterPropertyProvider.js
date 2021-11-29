/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */

class BlotterPropertyProvider {
  txtQuickFilterSearch() { return '//input[@data-testid="txtQuickFilter"]@@Enabled_And_Visible||10'; }

  btnClearQuickFilter() { return '//input[@data-testid="txtQuickFilter"]//parent::span/span/span[@aria-label="close-circle"]@@Enabled_And_Visible||10'; }
}
module.exports = BlotterPropertyProvider;
