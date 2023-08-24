import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import "./app.scss";

// // Let's talk about using index.js and some other name in the component folder
// // There's pros and cons for each way of doing this ...
import Header from "./components/header/index";
import Footer from "./components/footer/index";
import Form from "./components/form/index";
import Results from "./components/results/index";
// import { response } from "express";

// // class App extends React.Component {

// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       data: null,
// //       requestParams: {},
// //     };
// //   }

// //   callApi = (requestParams) => {
// //     // mock output
// //     const data = {
// //       count: 2,
// //       results: [
// //         {name: 'fake thing 1', url: 'http://fakethings.com/1'},
// //         {name: 'fake thing 2', url: 'http://fakethings.com/2'},
// //       ],
// //     };
// //     this.setState({data, requestParams});
// //   }

// //   render() {
// //     return (
// //       <React.Fragment>
// //         <Header />
// //         <div>Request Method: {this.state.requestParams.method}</div>
// //         <div>URL: {this.state.requestParams.url}</div>
// //         <Form handleApiCall={this.callApi} />
// //         <Results data={this.state.data} />
// //         <Footer />
// //       </React.Fragment>
// //     );
// //   }
// // }

// // export default App;

const initialState = {
  requestParams: {},
  data: null,
  history: [],
};


function apiReducer(state , action) {
  console.log("hhhhhhhhhhhhhhhhhh");
  const { type, url, pararms, payload } = action;
  console.log("kkkkkkkkkkkk", action.payload);
  switch (type) {
    case "NewRequest":
      const newParams = pararms;
      const newdata = payload;
      const newHistory = [...state.history, url];
      console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",pararms)
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
      console.log("************", newRequestParams);
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
      console.log("///////////////////", requestOptions);
      // let newRespons="jj"
    
      // fetch(newUrl, requestOptions)
      // const newRespons = await response.json();
    
      let newRespons =await axios.get(newUrl);
    
      console.log("####", newRespons.data);
      // dispatch(NewRequest(newMethod, newUrl, newBody));
      
      dispatch({
    
        type: "NewRequest",
        url: newUrl,
        pararms: requestOptions,
        payload: newRespons.data,
      }
      );
      console.log("lllllllllllllllllll",state)
    
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
      <div>history:  <ul>
                {
                    state.history.map((i) => {
                        return (
                            <li>{i}</li>
                        )
                    })
                }
            </ul></div>
      <Form handleApiCall={callApi} loading={loading} />
      <Results data={state.data} loading={loading} />
      <Footer />
    </>
  );
};

export default App;
