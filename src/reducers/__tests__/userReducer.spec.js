import { actionTypes, userPermissions } from '../../utils/constants';
import reducer from '../userReducer';

const {
  ADD_CLIENTTRADER_PREFERENCE_FAILED,
  ADD_CLIENTTRADER_PREFERENCE_SUCCESS,
  CHANGE_PREFERENCE_FAILED,
  CHANGE_PREFERENCE_SUCCESS,
  DELETE_BROKER_PREFERENCE_FAILED,
  DELETE_BROKER_PREFERENCE_SUCCESS,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILED,
  LOAD_PREFERENCES_FAILED,
  LOAD_PREFERENCES_SUCCESS,
  UPDATE_DEFAULTS,
} = actionTypes;

const actionsGroup1 = [
  ADD_CLIENTTRADER_PREFERENCE_SUCCESS,
  DELETE_BROKER_PREFERENCE_SUCCESS,
  CHANGE_PREFERENCE_SUCCESS,
  LOAD_PREFERENCES_SUCCESS,
];

const actionsGroup2 = [
  ADD_CLIENTTRADER_PREFERENCE_FAILED,
  CHANGE_PREFERENCE_FAILED,
  DELETE_BROKER_PREFERENCE_FAILED,
  LOAD_USER_FAILED, LOAD_PREFERENCES_FAILED,
  UPDATE_DEFAULTS,
];

const initialState = {
  permissions: {},
  fullName: '',
  preferences: {
    settings: {},
    defaults: { defaultEntryPage: 'NA' },
  },
};

const defaultPayload = {
  preferences: {
    preferredBrokers: [{ deskId: 1, name: 'Test 1' }, { deskId: 2, name: 'Test 2' }],
    settings: { ratesFeed: true },
    defaults: { defaultEntryPage: 'NA' },
  },
};

// ////////////////////////////////////////////////////////
//  default reducer
// ////////////////////////////////////////////////////////
test('default reducer should return the initial state', () => {
  const state = undefined;
  const action = {};
  const reducerOutput = reducer(state, action);

  expect(reducerOutput).toEqual(initialState);
});

// ////////////////////////////////////////////////////////
//  LOAD_USER_SUCCESS
// ////////////////////////////////////////////////////////
test('LOAD_USER_SUCCESS should return correct state when no existing user details exist in state', () => {
  const state = undefined;
  const user = { fullName: 'Test Name New', permissions: [] };
  const action = { type: LOAD_USER_SUCCESS, user };
  const reducerOutput = reducer(state, action);

  const expectedOutput = {
    ...initialState,
    fullName: 'Test Name New',
    permissions: {
      validForBlotterEdit: false,
      validForBlotterView: false,
      validForDeskEdit: false,
      validForFwd: false,
      validForNdf: false,
      validForSpt: false,
      validForSEFDealApprove: false,
      validForNonSEFdealApprove: false,
      validForDealEdit: false,
    },
  };

  expect(reducerOutput).toEqual(expectedOutput);
});

test('LOAD_USER_SUCCESS should return correct state when existing user details exist in state and valid for NDF passed in', () => {
  const state = {
    fullName: 'Test Name',
    permissions: {
      validForBlotterEdit: false,
      validForBlotterView: false,
      validForDeskEdit: false,
      validForFwd: false,
      validForNdf: false,
      validForSpt: false,
      validForSEFDealApprove: false,
      validForNonSEFdealApprove: false,
      validForDealEdit: false,
    },
    preferences: {
      settings: { ratesFeed: false },
      defaults: { defaultEntryPage: 'NA' },
    },
  };
  const user = { fullName: 'Test Name New', permissions: [userPermissions.TRADECAPTURE_NDF_ENTRY] };
  const action = { type: LOAD_USER_SUCCESS, user };
  const reducerOutput = reducer(state, action);

  const expectedState = {
    ...state,
    fullName: 'Test Name New',
    permissions: {
      validForBlotterEdit: false,
      validForBlotterView: false,
      validForDeskEdit: false,
      validForFwd: false,
      validForNdf: true,
      validForSpt: false,
      validForSEFDealApprove: false,
      validForNonSEFdealApprove: false,
      validForDealEdit: false,
    },
  };

  expect(reducerOutput).toEqual(expectedState);
});

test('LOAD_USER_SUCCESS should return correct state when existing user details exist in state and valid for FWD passed in', () => {
  const state = {
    fullName: 'Test Name',
    permissions: {
      validForBlotterEdit: false,
      validForBlotterView: false,
      validForDeskEdit: false,
      validForFwd: false,
      validForNdf: false,
      validForSpt: false,
      validForSEFDealApprove: false,
      validForNonSEFdealApprove: false,
      validForDealEdit: false,
    },
    preferences: {
      settings: { ratesFeed: false },
      defaults: { defaultEntryPage: 'NA' },
    },
  };
  const user = { fullName: 'Test Name New', permissions: [userPermissions.TRADECAPTURE_FWD_ENTRY] };
  const action = { type: LOAD_USER_SUCCESS, user };
  const reducerOutput = reducer(state, action);

  const expectedState = {
    ...state,
    fullName: 'Test Name New',
    permissions: {
      validForBlotterEdit: false,
      validForBlotterView: false,
      validForDeskEdit: false,
      validForFwd: true,
      validForNdf: false,
      validForSpt: false,
      validForSEFDealApprove: false,
      validForNonSEFdealApprove: false,
      validForDealEdit: false,
    },
  };

  expect(reducerOutput).toEqual(expectedState);
});

test('LOAD_USER_SUCCESS should return correct state when blotter view is passed in but not blotter edit', () => {
  const state = undefined;
  const user = { fullName: 'Test Name New', permissions: [userPermissions.BLOTTER_VIEW] };
  const action = { type: LOAD_USER_SUCCESS, user };
  const reducerOutput = reducer(state, action);

  const expectedOutput = {
    ...initialState,
    fullName: 'Test Name New',
    permissions: {
      validForBlotterEdit: false,
      validForBlotterView: true,
      validForDeskEdit: false,
      validForFwd: false,
      validForNdf: false,
      validForSpt: false,
      validForSEFDealApprove: false,
      validForNonSEFdealApprove: false,
      validForDealEdit: false,
    },
  };

  expect(reducerOutput).toEqual(expectedOutput);
});

test('LOAD_USER_SUCCESS should return correct state when blotter edit is passed in but not blotter view', () => {
  const state = undefined;
  const user = { fullName: 'Test Name New', permissions: [userPermissions.TRADECAPTURE_FWD_ENTRY, userPermissions.BLOTTER_EDIT] };
  const action = { type: LOAD_USER_SUCCESS, user };
  const reducerOutput = reducer(state, action);

  const expectedOutput = {
    ...initialState,
    fullName: 'Test Name New',
    permissions: {
      validForBlotterEdit: true,
      validForBlotterView: true,
      validForDeskEdit: false,
      validForFwd: true,
      validForNdf: false,
      validForSpt: false,
      validForSEFDealApprove: false,
      validForNonSEFdealApprove: false,
      validForDealEdit: false,
    },
  };

  expect(reducerOutput).toEqual(expectedOutput);
});

test('LOAD_USER_SUCCESS should return correct state when blotter edit is passed in and blotter view', () => {
  const state = undefined;
  const user = {
    fullName: 'Test Name New',
    permissions: [userPermissions.TRADECAPTURE_FWD_ENTRY, userPermissions.BLOTTER_EDIT, userPermissions.BLOTTER_VIEW],
  };
  const action = { type: LOAD_USER_SUCCESS, user };
  const reducerOutput = reducer(state, action);

  const expectedOutput = {
    ...initialState,
    fullName: 'Test Name New',
    permissions: {
      validForBlotterEdit: true,
      validForBlotterView: true,
      validForDeskEdit: false,
      validForFwd: true,
      validForNdf: false,
      validForSpt: false,
      validForSEFDealApprove: false,
      validForNonSEFdealApprove: false,
      validForDealEdit: false,
    },
  };

  expect(reducerOutput).toEqual(expectedOutput);
});

test('LOAD_USER_SUCCESS should return correct state when valid for SPT passed in', () => {
  const state = undefined;
  const user = { fullName: 'Test Name New', permissions: [userPermissions.TRADECAPTURE_SPT_ENTRY] };
  const action = { type: LOAD_USER_SUCCESS, user };
  const reducerOutput = reducer(state, action);

  const expectedOutput = {
    ...initialState,
    fullName: 'Test Name New',
    permissions: {
      validForBlotterEdit: false,
      validForBlotterView: false,
      validForDeskEdit: false,
      validForFwd: false,
      validForNdf: false,
      validForSpt: true,
      validForSEFDealApprove: false,
      validForNonSEFdealApprove: false,
      validForDealEdit: false,
    },
  };

  expect(reducerOutput).toEqual(expectedOutput);
});

test('LOAD_USER_SUCCESS should return correct state when valid for desk edit passed in', () => {
  const state = undefined;
  const user = { fullName: 'Test Name New', permissions: [userPermissions.DESK_EDIT] };
  const action = { type: LOAD_USER_SUCCESS, user };
  const reducerOutput = reducer(state, action);

  const expectedOutput = {
    ...initialState,
    fullName: 'Test Name New',
    permissions: {
      validForBlotterEdit: false,
      validForBlotterView: false,
      validForDeskEdit: true,
      validForFwd: false,
      validForNdf: false,
      validForSpt: false,
      validForSEFDealApprove: false,
      validForNonSEFdealApprove: false,
      validForDealEdit: false,
    },
  };

  expect(reducerOutput).toEqual(expectedOutput);
});

test('LOAD_USER_SUCCESS should return correct state when valid for deal edit passed in', () => {
  const state = undefined;
  const user = { fullName: 'Test Name New', permissions: [userPermissions.TRADE_MANAGEMENT_VIEW] };
  const action = { type: LOAD_USER_SUCCESS, user };
  const reducerOutput = reducer(state, action);

  const expectedOutput = {
    ...initialState,
    fullName: 'Test Name New',
    permissions: {
      validForBlotterEdit: false,
      validForBlotterView: false,
      validForDeskEdit: false,
      validForFwd: false,
      validForNdf: false,
      validForSpt: false,
      validForSEFDealApprove: false,
      validForNonSEFdealApprove: false,
      validForDealEdit: true,
    },
  };

  expect(reducerOutput).toEqual(expectedOutput);
});

test('LOAD_USER_SUCCESS should return correct state when multiple permissions passed in', () => {
  const state = undefined;
  const user = {
    fullName: 'Test Name New',
    permissions: [
      userPermissions.DESK_EDIT,
      userPermissions.TRADECAPTURE_FWD_ENTRY,
      userPermissions.TRADECAPTURE_SPT_ENTRY,
      userPermissions.TRADECAPTURE_NDF_ENTRY,
      userPermissions.BLOTTER_EDIT,
      userPermissions.BLOTTER_VIEW,
      userPermissions.SEF_DEAL_APPROVE,
      userPermissions.NONSEF_DEAL_APPROVE,
      userPermissions.TRADE_MANAGEMENT_VIEW,
    ],
  };
  const action = { type: LOAD_USER_SUCCESS, user };
  const reducerOutput = reducer(state, action);

  const expectedOutput = {
    ...initialState,
    fullName: 'Test Name New',
    permissions: {
      validForBlotterEdit: true,
      validForBlotterView: true,
      validForDeskEdit: true,
      validForFwd: true,
      validForNdf: true,
      validForSpt: true,
      validForSEFDealApprove: true,
      validForNonSEFdealApprove: true,
      validForDealEdit: true,
    },
  };

  expect(reducerOutput).toEqual(expectedOutput);
});

// ////////////////////////////////////////////////////////
//  actionsGroup1
// ////////////////////////////////////////////////////////
describe('when no existing user details exist in state', () => {
  const state = undefined;

  actionsGroup1.forEach((action) => {
    const actionToExecute = { type: action, payload: defaultPayload };

    it(`${action} should return correct state`, () => {
      const reducerOutput = reducer(state, actionToExecute);

      const expectedOutput = {
        permissions: {},
        fullName: '',
        ...defaultPayload,
      };

      expect(reducerOutput).toEqual(expectedOutput);
    });
  });
});

describe('when existing user details exist in state', () => {
  const state = {
    fullName: 'Test Name',
    permissions: {},
    preferences: {
      settings: { ratesFeed: false },
      defaults: { defaultEntryPage: 'NA' },
    },
  };

  actionsGroup1.forEach((action) => {
    const actionToExecute = { type: action, payload: defaultPayload };

    it(`${action} should return correct state`, () => {
      const reducerOutput = reducer(state, actionToExecute);

      const expectedState = {
        fullName: 'Test Name',
        permissions: {},
        ...defaultPayload,
      };

      expect(reducerOutput).toEqual(expectedState);
    });
  });
});

// ////////////////////////////////////////////////////////
//  actionsGroup2
// ////////////////////////////////////////////////////////
describe('when no existing user details exist in state', () => {
  const state = undefined;

  actionsGroup2.forEach((action) => {
    const actionToExecute = { type: action, payload: { id: 1 } };

    it(`${action} should return correct state`, () => {
      const reducerOutput = reducer(state, actionToExecute);
      expect(reducerOutput).toEqual(initialState);
    });
  });
});

describe('when existing user details exist in state', () => {
  const state = {
    fullName: 'Test Name',
    permissions: {},
    preferences: {
      settings: { ratesFeed: false },
      defaults: { defaultEntryPage: 'NA' },
    },
  };

  actionsGroup2.forEach((action) => {
    const actionToExecute = { type: action, payload: { id: 1 } };

    it(`${action} should return correct state`, () => {
      const reducerOutput = reducer(state, actionToExecute);
      expect(reducerOutput).toEqual(state);
    });
  });
});
