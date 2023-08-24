import React from "react";
import { useEffect } from "react";
// class Results extends React.Component {
//   render() {
//     return (
//       <section>
//         <pre>{this.props.data ? JSON.stringify(this.props.data, undefined, 2) : null}</pre>
//       </section>
//     );
//   }
// }

// export default Results;

function Results(props) {
  // useEffect(() => {
  //   // if (props. && state.requestParams.method) {
  //   // }
  //   console.log("hiiiiiiiiiiiiiiii")
  // }, [props.data]);
  return (
    <>
      <section>
      {props.loading ? (

        <p>Loading...</p>

      ) : (
        
        <pre>
          {props.data ? JSON.stringify(props.data, undefined, 2) : null}
        </pre>
        
      )}
      </section>
    </>
  );
}
export default Results;
