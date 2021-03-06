/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
const UserDetails = Object.create({

  CLIENT_A: { Client: 'AMERICAN PRESIDENT BANK, SIN', Location: '(SIN)', GCD: 164923, Reuters_Code: 'APBS', LEI_Code: 'NA' },
  CLIENT_B: { Client: 'BANK OF AMERICA NA (DBU), SIN', Location: '(SIN)', GCD: 143161, Reuters_Code: 'UBSL', LEI_Code: 'NA' },
  CLIENT_C: { Client: 'BARCLAYS BANK PLC, SIN', Location: '(SIN)', GCD: 104054, Reuters_Code: 'BBIS', LEI_Code: 'NA' },
  CLIENT_D: { Client: 'DEUTSCHE BANK AG, SIN', Location: '(SIN)', GCD: 104579, Reuters_Code: 'DEUS', LEI_Code: 'NA' },
  CLIENT_E: { Client: 'CITIBANK NA, HKG', Location: '(HKG)', GCD: 104286, Reuters_Code: 'CITL', LEI_Code: 'NA' },
  CLIENT_F: { Client: 'JPMORGAN CHASE BK NA, SIN', Location: '(SIN)', GCD: 110953, Reuters_Code: 'CHAE', LEI_Code: 'NA' },
  CLIENT_G: { Client: 'AMERICAN PRESIDENT BANK, HKG', Location: '(HKG)', GCD: 164922, Reuters_Code: 'APBH', LEI_Code: 'NA' },
  CLIENT_H: { Client: 'FORD BANK, NYK', Location: '(NYK)', GCD: 164940, Reuters_Code: 'FORD', LEI_Code: 'NA' },
  CLIENT_I: { Client: 'AMERICAN PRESIDENT BANK, LON', Location: '(LON)', GCD: 164920, Reuters_Code: 'APBL', LEI_Code: 'NA' },
  CLIENT_J: { Client: 'AMERICAN PRESIDENT BANK, NYK', Location: '(NYK)', GCD: 164918, Reuters_Code: 'APBN', LEI_Code: 'NA' },
  CLIENT_K: { Client: 'BNP PARIBAS SA, PAR', Location: '(SIN)', GCD: 109056, Reuters_Code: 'BNPP', LEI_Code: 'NA' },
  CLIENT_L: { Client: 'TEMPLAR SECURITIES LLC, BUG', Location: '(BUG)', GCD: 132337, Reuters_Code: 'NA', LEI_Code: 'NA' },
  CLIENT_P: { Client: 'BNP PARIBAS SA, PAR', Location: '(SIN)', GCD: 109056, Reuters_Code: 'BNPP', LEI_Code: 'NA' },
  CLIENT_Q: { Client: 'UBS AG, LON', Location: '(SAO)', GCD: 105844, Reuters_Code: 'UBSL', LEI_Code: 'NA' },

  CLIENT_A_FavName: 'APBK.SIN',
  CLIENT_B_FavName: 'BOFA.SIN',
  CLIENT_C_FavName: 'BARC.SIN',
  CLIENT_D_FavName: 'DEUT.SIN',
  CLIENT_E_FavName: 'CITI.HKG',
  CLIENT_F_FavName: 'CHAS.SIN',
  CLIENT_G_FavName: 'APBK.HKG',
  CLIENT_H_FavName: 'FORD.NYK',
  CLIENT_I_FavName: 'APBK.LON',
  CLIENT_J_FavName: 'APBK.NYK',
  CLIENT_K_FavName: 'BNPA.PAR',
  CLIENT_L_FavName: 'TEMP.BUG',
  CLIENT_P_FavName: 'BNPA.PAR',
  CLIENT_Q_FavName: 'UBSW.LON',

  CLIENT_A_BLOTTER: 'AMERICAN PRESIDENT B SIN',
  CLIENT_B_BLOTTER: 'BK OF AMER NA DBU SIN',
  CLIENT_C_BLOTTER: 'BARCLAYS BANK PLC SIN',
  CLIENT_C_BLOTTER_LONGNAME: 'BARCLAYS BANK PLC, SIN',
  CLIENT_G_BLOTTER: 'AMERICAN PRESIDENT B HKG',
  CLIENT_H_BLOTTER: 'FORD BANK NYK',
  CLIENT_J_BLOTTER: 'AMERICAN PRESIDENT B NYK',
  CLIENT_P_BLOTTER: 'BNP PARIBAS SA PAR',
  CLIENT_Q_BLOTTER: 'UBS AG LON',

  TRADER_A: 'ABRAHAM LINCOLN (SIN)',
  TRADER_B: 'DOREEN NG (SIN)',
  TRADER_C: 'YEO CHER YANG (SIN)',
  TRADER_D: 'BOON-KIT LIM (SIN)',
  TRADER_E: 'ALEX TANG (HKG)',
  TRADER_F: 'FRANK FU (SIN)',
  TRADER_G: 'DWIGHT EISENHOWER (HKG)',
  TRADER_H: 'HENRY FORD (NYK)',
  TRADER_I: 'JOHN KENNEDY (LON)',
  TRADER_J: 'BILL CLINTON (NYK)',
  TRADER_K: 'RONALD REAGAN (NYK)',
  TRADER_L: 'AJAY ABROL (SIN)',
  TRADER_M: 'BILL DUDLEY (BUG)',
  TRADER_P: 'AJAY ABROL (SIN)',
  TRADER_Q: 'FERNANDO PAIS (SAO)',
  TRADER_NULL: { Name: 'Select agent instead', DisplayName: 'Agent selected' },

  TRADER_A_BLOTTER: 'A. LINCOLN',
  TRADER_B_BLOTTER: 'D. NG',
  TRADER_B_BLOTTER_LONGNAME: 'DOREEN NG',
  TRADER_C_BLOTTER: 'Y. YANG',
  TRADER_D_BLOTTER: 'B LIM',
  TRADER_E_BLOTTER: 'A. TANG',
  TRADER_F_BLOTTER: 'F. FU',

  TRADER_A_DETAIL: { TraderName: 'ABRAHAM LINCOLN', TraderGCD: 43638, ExeCustName: 'AMERICAN PRESIDENT BANK, SIN', ExeCustGCD: 164923, ExeCustReuters_Code: 'APBS', ExeLEI_Code: 'NA' },
  TRADER_B_DETAIL: { TraderName: 'DOREEN NG', TraderGCD: 39291, ExeCustName: 'BANK OF AMERICA NA, SIN', ExeCustGCD: 103761, ExeCustReuters_Code: 'BOAS', ExeLEI_Code: 'NA' },
  TRADER_C_DETAIL: { TraderName: 'YEO CHER YANG', TraderGCD: 86522, ExeCustName: 'BARCLAYS BANK PLC, SIN', ExeCustGCD: 104054, ExeCustReuters_Code: 'BBIS', ExeLEI_Code: 'NA' },
  TRADER_D_DETAIL: { TraderName: 'BOON-KIT LIM', TraderGCD: 59813, ExeCustName: 'DEUTSCHE BANK AG, SIN', ExeCustGCD: 104579, ExeCustReuters_Code: 'DEUS', ExeLEI_Code: 'NA' },
  TRADER_E_DETAIL: { TraderName: 'ALEX TANG', TraderGCD: 58057, ExeCustName: 'CITIBANK NA, HKG', ExeCustGCD: 104284, ExeCustReuters_Code: 'CITK', ExeLEI_Code: 'NA' },
  TRADER_F_DETAIL: { TraderName: 'FRANK FU', TraderGCD: 35934, ExeCustName: 'JPMORGAN CHASE BK NA, SIN', ExeCustGCD: 110953, ExeCustReuters_Code: 'CHAE', ExeLEI_Code: 'NA' },
  TRADER_G_DETAIL: { TraderName: 'DWIGHT EISENHOWER', TraderGCD: 43637, ExeCustName: 'AMERICAN PRESIDENT BANK, HKG', ExeCustGCD: 164922, ExeCustReuters_Code: 'APBH', ExeLEI_Code: 'NA' },
  TRADER_H_DETAIL: { TraderName: 'HENRY FORD', TraderGCD: 43648, ExeCustName: 'FORD BANK, NYK', ExeCustGCD: 164940, ExeCustReuters_Code: 'FORD', ExeLEI_Code: 'NA' },
  TRADER_I_DETAIL: { TraderName: 'JOHN KENNEDY', TraderGCD: 43635, ExeCustName: 'AMERICAN PRESIDENT BANK, LON', ExeCustGCD: 164920, ExeCustReuters_Code: 'APBL', ExeLEI_Code: 'NA' },
  TRADER_J_DETAIL: { TraderName: 'BILL CLINTON', TraderGCD: 43633, ExeCustName: 'AMERICAN PRESIDENT BANK, NYK', ExeCustGCD: 164918, ExeCustReuters_Code: 'APBN', ExeLEI_Code: 'NA' },
  TRADER_K_DETAIL: { TraderName: 'RONALD REAGAN', TraderGCD: 43634, ExeCustName: 'AMERICAN PRESIDENT BANK, NYK', ExeCustGCD: 164918, ExeCustReuters_Code: 'APBN', ExeLEI_Code: 'NA' },
  TRADER_L_DETAIL: { TraderName: 'AJAY ABROL', TraderGCD: 68385, ExeCustName: 'BNP PARIBAS SA, SIN', ExeCustGCD: 109059, ExeCustReuters_Code: 'BPSS', ExeLEI_Code: 'NA' },
  TRADER_M_DETAIL: { TraderName: 'BILL DUDLEY', TraderGCD: 12781, ExeCustName: 'TEMPLAR SECURITIES LLC, BUG', ExeCustGCD: 132337, ExeCustReuters_Code: 'NA', ExeLEI_Code: 'NA' },
  TRADER_P_DETAIL: { TraderName: 'AJAY ABROL', TraderGCD: 68385, ExeCustName: 'BNP PARIBAS SINGAPORE BRANCH, SIN', ExeCustGCD: 109059, ExeCustReuters_Code: 'BPSS', ExeLEI_Code: 'NA' },
  TRADER_Q_DETAIL: { TraderName: 'FERNANDO PAIS', TraderGCD: 66088, ExeCustName: 'UBS AG SAO PAULO BRANCH, SAO', ExeCustGCD: 143863, ExeCustReuters_Code: 'NA', ExeLEI_Code: 'NA' },

  TRADER_A_FavName: 'ABRAHAM LINCOLN',
  TRADER_D_FavName: 'BOON-KIT LIM',
  TRADER_D_ReName: 'BOON-KIT RENAME',
  TRADER_J_FavName: 'BILL CLINTON',
  TRADER_I_FavName: 'JOHN KENNEDY',
  TRADER_K_FavName: 'RONALD REAGAN',
  TRADER_K_ReName: 'RONALD RENAME',
  TRADER_H_FavName: 'HENRY FORD',
  TRADER_F_FavName: 'FRANK FU',
  TRADER_L_FavName: 'AJAY ABROL',
  TRADER_M_FavName: 'BILL DUDLEY',

  DESK_A: 'LON ASIAN NDF',
  DESK_B: 'NYK ASIAN NDF',
  DESK_C: 'SIN NDF DESK',
  DESK_D: 'NYK TPSEF DESK',
  DESK_E: 'GLOBAL CURRENCIES(NYK.GLBL.CURRENC)',
  DESK_F: 'LON ASIAN NDF',
  DESK_G: 'NYK LATAM DESK',
  DESK_Z: 'LON RUSSIAN OBS',

  DESKGCD_ID: {
    DESK_A: '2039',
    DESK_B: '2044',
    DESK_C: '2040',
    DESK_D: '2063',
    DESK_E: '8046',
    DESK_Z: '2035',
  },

  BROKER_A: 'IAN GABLE',
  BROKER_B: 'CHRIS ROMANO',
  BROKER_B1: 'C. ROMANO',
  BROKER_B1_LONGNAME: 'CHRIS ROMANO',
  BROKER_C: { Name: 'JOHN CARROLL', FavName: 'John Carroll' },
  BROKER_C1: { Name: 'LAUREN FERRERI', FavName: 'Lauren Ferreri' },
  BROKER_D: { Name: 'DAVID WONG', FavName: 'David Wong' },
  // BROKER_E: 'ALAN TAN',
  BROKER_E: 'ALICE LIM',
  BROKER_F: { Name: 'RENA HO', FavName: 'Rena Ho' },
  BROKER_G: 'LEE BEST',
  BROKER_H: 'BRIAN DONNELLY',
  BROKER_I: 'ANGIE LOW',
  BROKER_J: 'DAVID THONG',
  BROKER_K: 'LEILAND STEVENS',
  BROKER_L: 'IAN GABLE',
  BROKER_M: 'DAVID FRIEL',
  BROKER_N: 'JAMES HART',
  BROKER_O: 'LUCA RAMOS',
  BROKER_P: 'BEN PROLER',

  ADDBROKER_A: { Name: 'HARRY COTTON', GCD_ID: '91828' },
  ADDBROKER_B: { Name: 'RAY PEREZ', GCD_ID: '54979' },
  ADDBROKER_C: { Name: 'JAY LEE', GCD_ID: '59595' },
  ADDBROKER_C1: { Name: 'DAVID THONG', GCD_ID: '48453' },
  ADDBROKER_D: { Name: 'HECTOR ESTRADA', GCD_ID: '65176' },
  ADDBROKER_Z: { Name: 'POLINA VOLYNTSEVA', GCD_ID: '63710' },

  AGENT_A: 'AFS MONEY BROKERS (AMS)',
  AGENT_B: 'CHRIS HONEY (LON)',
  AGENT_C: 'ICAP SYDNEY (SYD)',
  AGENT_D: 'XP SECURITIES LLC (NYK)',
  AGENT_E: 'ICAP SECS DEUT (FFT)',
  AGENT_F: 'FINACOR (BRX)',
  AGENT_G: 'TRADITION AG (ZCH)',
  AGENT_H: 'ICAP SECS HK LTD (HKG)',

  AGENT_A_FavName: 'AFS MONEY BROKERS',
  AGENT_B_FavName: 'CHRIS HONEY',
  AGENT_C_FavName: 'ICAP SYDNEY',
  AGENT_D_FavName: 'XP SECURITIES LLC',
  AGENT_E_FavName: 'ICAP SECS DEUT',
  AGENT_F_FavName: 'FINACOR',
  AGENT_G_FavName: 'TRADITION AG',
  AGENT_H_FavName: 'ICAP SECS HK LTD',

  USER_A: { UserName: 'belfasttpeur1', PassWord: 'p', FullName: 'BELFAST TPEUR TEST BROKER 1' },
  USER_B: { UserName: 'belfasttpeur2', PassWord: 'P', FullName: 'BELFAST TPEUR TEST BROKER 2' },
  USER_C: { UserName: 'belfasttpeur3', PassWord: 'P', FullName: 'BELFAST TPEUR TEST BROKER 3' },
  USER_D: { UserName: 'belfasttpeur4', PassWord: 'P', FullName: 'BELFAST TPEUR TEST BROKER 4' },

  USER_E: { UserName: 'belfasttpsin1', PassWord: 'p', FullName: 'BELFAST TPSIN TEST BROKER 1' },
  USER_F: { UserName: 'belfasttpsin2', PassWord: 'P', FullName: 'BELFAST TPSIN TEST BROKER 2' },
  USER_G: { UserName: 'belfasttpsin3', PassWord: 'P', FullName: 'BELFAST TPSIN TEST BROKER 3' },
  USER_H: { UserName: 'belfasttpsin4', PassWord: 'P', FullName: 'BELFAST TPSIN TEST BROKER 4' },

  USER_I: { UserName: 'belfasttpus1', PassWord: 'p', FullName: 'BELFAST TPUS TEST BROKER 1' },
  USER_J: { UserName: 'belfasttpus2', PassWord: 'P', FullName: 'BELFAST TPUS TEST BROKER 2' },
  USER_K: { UserName: 'belfasttpus3', PassWord: 'P', FullName: 'BELFAST TPUS TEST BROKER 3' },
  USER_L: { UserName: 'belfasttpus4', PassWord: 'P', FullName: 'BELFAST TPUS TEST BROKER 4' },

  ADMIN_A: { UserName: 'staylor', PassWord: 'P', FullName: 'STEPHEN TAYLOR' },

});
module.exports = UserDetails;
