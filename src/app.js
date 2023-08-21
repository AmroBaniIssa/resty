import React, { useState ,useEffect} from "react";

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

const App = () => {
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});
  const [loading, setLoading] = useState(false);

  const callApi = async (newRequestParams) => {
    setLoading(true);

    try {
      const requestOptions = {
        method: newRequestParams.method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      if (newRequestParams.method !== 'GET') {
        requestOptions.body = newRequestParams.body ? JSON.stringify(newRequestParams.body) : undefined;
      } 
      // this because we will have an error if we use "GET" with body

      const response = await fetch(newRequestParams.url, requestOptions);
      const responseData = await response.json();
      // console.log(response)
      // console.log(responseData)

      setData({
        headers: response.headers,
        results: responseData,
      });

      setRequestParams(newRequestParams);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (requestParams.url && requestParams.method) {
      callApi(requestParams);
    }
  }, [requestParams]);
  
  return (
    <>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} loading={loading} />
      <Results data={data} loading={loading} />
      <Footer />
    </>
  );
};

export default App;
