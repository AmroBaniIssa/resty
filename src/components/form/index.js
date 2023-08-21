import React, { useState } from 'react';

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
  const [method, setMethod] = useState('GET'); // Default method
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');

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
            className={method === 'GET' ? 'active' : ''}
            onClick={() => handleMethodClick('GET')}
          >
            GET
          </span>
          <span
            id="post"
            className={method === 'POST' ? 'active' : ''}
            onClick={() => handleMethodClick('POST')}
          >
            POST
          </span>
          <span
            id="put"
            className={method === 'PUT' ? 'active' : ''}
            onClick={() => handleMethodClick('PUT')}
          >
            PUT
          </span>
          <span
            id="delete"
            className={method === 'DELETE' ? 'active' : ''}
            onClick={() => handleMethodClick('DELETE')}
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