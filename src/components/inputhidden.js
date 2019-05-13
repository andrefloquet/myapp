import React from 'react';

function Input() {
    return <input type="hidden" />;
}
  
class InputHidden extends React.Component {
    constructor(...args) {
      super(...args);
      this._id = React.createRef();
    }
    render() {
      // This will *not* work!
      return (
        <Input ref={this._id} />
      );
    }
  }

  export default InputHidden;