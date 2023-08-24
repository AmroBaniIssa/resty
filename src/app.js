import React, { useState, useEffect, useReducer } from "react";

import "./app.scss";

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from "./components/header/index";
import Footer from "./components/footer/index";
import Form from "./components/form/index";
import Results from "./components/results/index";

// class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       data: null,
//       requestParams: {},
//     };
//   }

//   callApi = (requestParams) => {
//     // mock output
//     const data = {
//       count: 2,
//       results: [
//         {name: 'fake thing 1', url: 'http://fakethings.com/1'},
//         {name: 'fake thing 2', url: 'http://fakethings.com/2'},
//       ],
//     };
//     this.setState({data, requestParams});
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <Header />
//         <div>Request Method: {this.state.requestParams.method}</div>
//         <div>URL: {this.state.requestParams.url}</div>
//         <Form handleApiCall={this.callApi} />
//         <Results data={this.state.data} />
//         <Footer />
//       </React.Fragment>
//     );
//   }
// }

// export default App;

const initialState = {
  requestParams: {},
  data: null,
  history: [],
};

function apiReducer(state = initialState, action) {
  const { type,pararms, payload } = action;

  switch (type) {
    case "NewRequest":
      const newdata = payload
      const newParams=pararms
      const newHistory=[...state.history,payload.url]
     
      return {
        requestParams: newParams,
        data: newdata,
        history:newHistory,
      };

    case "EMPTY":
      return initialState;

    default:
      return state;
  }
}

async function NewRequest(newMethod, newUrl, newBody) {
  const requestOptions = {
    url: newUrl,
    method: newMethod,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (newMethod !== "GET") {
    requestOptions.body = newBody ? JSON.stringify(newBody) : undefined;
  }

  const response = await fetch(newUrl, requestOptions);
  const responseData = await response.json();

  return {
    type: "NewRequest",
    pararms:requestOptions,
    payload: responseData,
  };
}

const App = () => {
  // const [data, setData] = useState(null);
  // const [requestParams, setRequestParams] = useState({});
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(apiReducer, initialState);

  const callApi = async (newRequestParams) => {
    setLoading(true);

    let newMethod = newRequestParams.method;
    let newUrl = newRequestParams.url;
    let newBody = newRequestParams.body;

    dispatch(NewRequest(newMethod, newUrl, newBody));
  }
    

  useEffect(() => {
    if (state.requestParams.url && state.requestParams.method) {
      callApi(state.requestParams);
    }
  }, [state.requestParams]);

  return (
    <>
      <Header />
      <div>Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      <Form handleApiCall={callApi} loading={loading} />
      <Results data={state.data} loading={loading} />
      <Footer />
    </>
  );
};

export default App;
