import { createLogic } from "redux-logic";

import actions from "./actions";
import types from "./types";
import EndPoints from "../../../utils/EndPoints";
import API from "../../../utils/HTTPClient";
import { NotificationManager } from "react-notifications";
import history from "../../../_helpers/history"

const signUp = createLogic({
    type: types.SIGNUP,
    latest: true,
    debounce: 1000,

    process({ MockHTTPClient, getState, action }, dispatch, done) {
        let HTTPClient;
        if (MockHTTPClient) {
            HTTPClient = MockHTTPClient;
        } else {
            HTTPClient = API;
        }
        HTTPClient.Post(EndPoints.signup, action.payload)
            .then((resp) => resp.data)
            .then((data) => {
                console.log("🚀 ~ file: service.js ~ line 25 ~ .then ~ data", data)
                NotificationManager.success(data.message || "Success full sign up..!", "Success");
                dispatch(actions.signUpSuccess(data));
                history.push("/login")
            })
            .catch((err) => {
                console.log("~ err", err)
                console.log("~ err", err.response)
                let error = err && err.response && err.response.data
                NotificationManager.error(error.message || "Something went wrong..!", error.error || "Fail");

                dispatch(
                    actions.signUpFail({
                        title: "Error!",
                        message: error,
                    })
                );
            })
            .then(() => done());
    },
});

const login = createLogic({
    type: types.LOGIN,
    latest: true,
    debounce: 1000,

    process({ MockHTTPClient, getState, action }, dispatch, done) {
        let HTTPClient;
        if (MockHTTPClient) {
            HTTPClient = MockHTTPClient;
        } else {
            HTTPClient = API;
        }
        HTTPClient.Post(EndPoints.login, action.payload)
            .then((resp) => resp.data)
            .then((data) => {
                console.log("🚀 ~ file: service.js ~ line 25 ~ .then ~ data", data)
                NotificationManager.success(data.message || "Success full sign up..!", "Success");
                dispatch(actions.loginSuccess(data));
                history.push("/dashboard")
            })
            .catch((err) => {
                console.log("~ err", err)
                console.log("~ err", err.response)
                let error = err && err.response && err.response.data
                NotificationManager.error(error.message || "Something went wrong..!", error.error || "Fail");

                dispatch(
                    actions.loginFailed({
                        title: "Error!",
                        message: error,
                    })
                );
            })
            .then(() => done());
    },
});

const confirmAccount = createLogic({
    type: types.CONFIRM_ACCOUNT,
    latest: true,
    debounce: 1000,

    process({ MockHTTPClient, getState, action }, dispatch, done) {
        let HTTPClient;
        if (MockHTTPClient) {
            HTTPClient = MockHTTPClient;
        } else {
            HTTPClient = API;
        }
        console.log("action.payload ", action.payload)

        HTTPClient.Get(EndPoints.confirmAccount + `?token=${action.payload}`)
            .then((resp) => resp.data)
            .then((data) => {
                console.log("🚀 ~ file: service.js ~ line 25 ~ .then ~ data", data)
                NotificationManager.success(data.message || "Confirm Account Success", "Success");
                dispatch(actions.confirmAccountSuccess(data));
                history.push("/dashboard")
            })
            .catch((err) => {
                console.log("~ err", err)
                console.log("~ err", err.response)
                let error = err && err.response && err.response.data
                NotificationManager.error(error || "Something went wrong..!", error.error || "Fail");

                dispatch(
                    actions.confirmAccountFail({
                        title: "Error!",
                        message: error,
                    })
                );
            })
            .then(() => done());
    },
});
export default [signUp, login, confirmAccount];
