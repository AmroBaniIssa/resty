import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import "./app.scss";

import Header from "./components/header/index";
import Footer from "./components/footer/index";
import Form from "./components/form/index";
import Results from "./components/results/index";

const initialState = {
  requestParams: {},
  data: null,
  history: [],
};

function apiReducer(state, action) {
  const { type, url, pararms, payload } = action;
  switch (type) {
    case "NewRequest":
      const newParams = pararms;
      const newdata = payload;
      const newHistory = [...state.history, url];
      return {
        ...state,
        requestParams: newParams,
        data: newdata,
        history: newHistory,
      };

    case "EMPTY":
      return initialState;

    default:
      return state;
  }
}

const App = () => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(apiReducer, initialState);

  const callApi = async (newRequestParams) => {
    setLoading(true);

    let newMethod = newRequestParams.method;
    let newUrl = newRequestParams.url;
    let newBody = newRequestParams.body;
    NewRequest(newMethod, newUrl, newBody);
    setLoading(false);
  };

  async function NewRequest(newMethod, newUrl, newBody) {
    const requestOptions = {
      method: newMethod,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (newMethod !== "GET") {
      requestOptions.body = newBody ? JSON.stringify(newBody) : undefined;
    }

    let newRespons = await axios.get(newUrl);

    dispatch({
      type: "NewRequest",
      url: newUrl,
      pararms: requestOptions,
      payload: newRespons.data,
    });
    console.log("lllllllllllllllllll", state);
  }
  useEffect(() => {
    if (state.requestParams.url && state.requestParams.method) {
      callApi(state.requestParams);
    }
  }, [state.requestParams]);

  return (
    <>
      <h1>hjsdk</h1>
      <Header />

      <div>Request Method: {state.requestParams.method}</div>
      {/* <div>URL: {state.requestParams}</div> */}
      <div>
        history:{" "}
        <ul>
          {state.history.map((i) => {
            return <li>{i}</li>;
          })}
        </ul>
      </div>
      <Form handleApiCall={callApi} loading={loading} />
      <Results data={state.data} loading={loading} />
      <Footer />
    </>
  );
};

export default App;
