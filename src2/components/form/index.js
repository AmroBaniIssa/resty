import React, { useState } from "react";
import React, { useReducer } from "react";
import "./form.scss";

// class Form extends React.Component {

// handleSubmit = e => {
//   e.preventDefault();
//   const DataFromForm = {
//     method:'GET',
//     url: 'https://pokeapi.co/api/v2/pokemon',
//   };
//   this.props.handleApiCall(DataFromForm);
// }

//   render() {
//     return (
//       <>
//         <form onSubmit={this.handleSubmit}>
//           <label >
//             <span>URL: </span>
//             <input name='url' type='text' />
//             <button type="submit">GO!</button>
//           </label>
//           <label className="methods">
//             <span id="get">GET</span>
//             <span id="post">POST</span>
//             <span id="put">PUT</span>
//             <span id="delete">DELETE</span>
//           </label>
//         </form>
//       </>
//     );
//   }
// }

// export default Form;

function Form(props) {
  // const [method, setMethod] = useState('GET'); // Default method
  // const [url, setUrl] = useState('');
  // const [body, setBody] = useState('');
  const initialState = {
    method: "GET",
    url: "",
    body: "",
  };

  function Reducer(state = initialState, action) {
    const { type, payload } = action;
   
    switch (type) {
      case "GET":
        const method2 = "GET";
        const url2 = [state.url];
        const body2 = undefined;

        return {
          method: method2,
          url: url2,
          body: body2,
        };

      case "POST":
        const method3 = "POST";
        const url3 = [state.url];
        const body3 = state.body;

        return {
          method: method3,
          url: url3,
          body: body3,
        };
      case "PUT":
        const method4 = "PUT";
        const url4 = [state.url];
        const body4 = state.body;

        return {
          method: method4,
          url: url4,
          body: body4,
        };
      case "DELETE":
        const method5 = "DELETE";
        const url5 = [state.url];
        const body5 = state.body;

        return {
          method: method5,
          url: url5,
          body: body5,
        };

      case "EMPTY":
        return initialState;

      default:
        return state;
    }
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const DataFromForm = {
      method: method,
      url: url,
      body: body || null,
    };
    props.handleApiCall(DataFromForm);
  };

  const handleMethodClick = (selectedMethod) => {
    setMethod(selectedMethod);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input
            name="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">GO!</button>
        </label>
        <label className="methods">
          <span
            id="get"
            className={method === "GET" ? "active" : ""}
            onClick={() => handleMethodClick("GET")}
          >
            GET
          </span>
          <span
            id="post"
            className={method === "POST" ? "active" : ""}
            onClick={() => handleMethodClick("POST")}
          >
            POST
          </span>
          <span
            id="put"
            className={method === "PUT" ? "active" : ""}
            onClick={() => handleMethodClick("PUT")}
          >
            PUT
          </span>
          <span
            id="delete"
            className={method === "DELETE" ? "active" : ""}
            onClick={() => handleMethodClick("DELETE")}
          >
            DELETE
          </span>
        </label>
        <label>
          <span>Body: </span>
          <textarea
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
      </form>
    </>
  );
}

export default Form;
