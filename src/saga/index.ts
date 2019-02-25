import { runSaga, stdChannel } from 'redux-saga'
import {
  delay,
//   takeEvery,
//   select,
  cancelled,
  take,
  race,
  fork,
  put
} from "redux-saga/effects";
import { EventEmitter } from "events";
import { Action } from "redux";

enum ActionType {
  DoA = "DoA",
  DoB = "DoB"
}

interface SagaAction extends Action {
  payload: any
}

function* putReceipt(data: any) {
  yield put(data);
}

const state = {}

const emitter = new EventEmitter()
const channel = stdChannel()

emitter.on("action", channel.put);

const myIO = {
  // this will be used to orchestrate take and put Effects
  channel,

  // this will be used to resolve put Effects
  dispatch: (output: any) => {
    emitter.emit("action", { type: ActionType.DoA, payload: output } as SagaAction)
  },

  // this will be used to resolve select Effects
  getState: () => state
}

function* someSaga() {
  try {
    while (true) {
      const { payload } = yield take<SagaAction>(ActionType.DoA);

      yield fork(putReceipt, payload);

      const { response, timeout } = yield race({
        response: take("*"),
        timeout: delay(5000)
      });

      if (timeout) {

      }

      if (response) {
        console.log("look im here!", response);
      }
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

export default () => {
   runSaga(myIO, someSaga);
   myIO.dispatch({a : "sdf"});
}