import * as actions from "./actions";
import getMockUsers from "../mocks/getMockUsers";
import fetchMock from "fetch-mock";
import {
  CHANGE_SEARCHFIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
} from "./constants";

import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";

const mockStore = configureMockStore([thunkMiddleware]);

it("should create an action to search robots", () => {
  const text = "wooo";
  const expectedAction = {
    type: CHANGE_SEARCHFIELD,
    payload: text
  };
  expect(actions.setSearchField(text)).toEqual(expectedAction);
});

describe("Robot actions", () => {
  beforeAll(() => {
    fetchMock.get("https://jsonplaceholder.typicode.com/users", getMockUsers);
  });

  it("handles requesting robots API", () => {
    const expectedActions = [
      { type: REQUEST_ROBOTS_PENDING },
      { type: REQUEST_ROBOTS_SUCCESS, payload: getMockUsers }
    ];

    const store = mockStore();
    return store.dispatch(actions.requestRobots()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
