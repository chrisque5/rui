const Constants = Object.create({

  // Change ENV string to 'LOCAL', 'DEV' or 'QA' depending on which environment you want to test
  // Change ISPIPELINE to true if running in pipeline. Will display only errorLogs
  // Change DISPLAYLOGS to true if full logging is desired. Default is false as console runs out of memory
  ENV: 'LOCAL',
  PIPELINE: false,
  DISPLAYLOGS: false,
  BASEURL: 'http://localhost:8080',
  BASEURLQA: 'http://ldndmstestapp:8080',
  DMSWEBURL: 'http://localhost:8080/DMSWeb/reactjs/',
  DMSWEBURLQA: 'http://ldndmstestapp:8080/DMSWeb/reactjs/',
  ADMINURL: 'http://localhost:8080/DMSWeb/reactjs/#/admin',
  ADMINURLQA: 'http://ldndmstestapp:8080/DMSWeb/reactjs/#/admin',
  NDFURL: '/DMSWeb/reactjs/#/deal/NDF',
  FWDURL: '/DMSWeb/reactjs/#/deal/FWD',
  SPTURL: '/DMSWeb/reactjs/#/deal/SPT',
  // BLOTTERURL: 'http://ldndmstestapp:8080/DMSWeb/reactjs/#/blotter',
  BLOTTERURL: 'http://localhost:8080/DMSWeb/reactjs/#/blotter',
  BLOTTERURLQA: 'http://ldndmstestapp:8080/DMSWeb/reactjs/#/blotter',
  MAXDPBEFORE: 'Maximum 11 digits allowed before decimal point',
  MAXDPBEFORECCY2: 'Maximum 12 digits allowed before decimal point',
  MAXDPAFTER: 'Maximum 3 digits allowed after decimal point',
  MAXDPRATEBEFORE: 'Maximum 5 digits allowed before decimal point',
  MAXDPRATEAFTER: 'Maximum 6 digits allowed after decimal point',
  NDF_VALUE_DATE_WARNING: 'Value Date is a non-working day or before Spot Date. Manually update all other dates and rate.',
  LOGIN_WARNING_MESSAGE: 'There was a problem logging in. Please try again.\nIf the problem continues, please contact TV Ops',
  // FWD
  MAXDPFWDRATEAFTER: 'Maximum 8 digits allowed after decimal point',
  MAXRATEEDATA: '444444444444444',

  MAXRATEFAKEEDATA: '44444444444444444444444444444444444444444444',

  // Fav Trader Colours
  DEFAULT: { Colour: '25, 155, 190', DisplayName: 'Default' },
  COLOUR_1: { Colour: '245, 34, 45', DisplayName: 'Red' },
  COLOUR_2: { Colour: '250, 84, 28', DisplayName: 'Orange' },
  COLOUR_3: { Colour: '250, 173, 20', DisplayName: 'Yellow' },
  COLOUR_4: { Colour: '56, 158, 13', DisplayName: 'Green' },
  COLOUR_5: { Colour: '24, 144, 255', DisplayName: 'Blue' },
  COLOUR_6: { Colour: '47, 84, 235', DisplayName: 'Indigo' },
  COLOUR_7: { Colour: '114, 46, 209', DisplayName: 'Purple' },
  COLOUR_8: { Colour: '235, 47, 150', DisplayName: 'Magenta' },

  FAV_ALREADY_WARNING: 'Client/Trader has been added to favourites already',
  FAV_AGENT_ALREADY_WARNING: 'Agent has been added to favourites already',

  UNAVAILABLE: '0, 0, 0', // Greyed out (technically black)

  // Execution Venue Colours
  TPSEF: { Colour: '255, 0, 0', DisplayName: 'SUBMIT TPSEF' },
  XOFF: { Colour: '24, 144, 255', DisplayName: 'SUBMIT XOFF' },
  IMMM: { Colour: '47, 84, 235', DisplayName: 'SUBMIT IMMM' },
  IOMM: { Colour: '0, 188, 212', DisplayName: 'SUBMIT IOMM' },
  TEFD: { Colour: '255, 152, 0', DisplayName: 'SUBMIT TEFD' },
  TEIR: { Colour: '128, 128, 0', DisplayName: 'SUBMIT TEIR' },
  TEMM: { Colour: '235, 47, 150', DisplayName: 'SUBMIT TEMM' },
  TIRD: { Colour: '114, 46, 209', DisplayName: 'SUBMIT TIRD' },
  TPIR: { Colour: '56, 158, 13', DisplayName: 'SUBMIT TPIR' },
  TPSD: { Colour: '0, 150, 136', DisplayName: 'SUBMIT TPSD' },
});
module.exports = Constants;
