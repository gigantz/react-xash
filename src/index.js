import * as React from "react";
import ReactDOM from 'react-dom';

import Xash from './xash';
const xash = new Xash();


const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
  margin: '0 auto',
  maxWidth: '1024px',
  width: '100%',
  padding: 32
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: localStorage.getItem('text') || 'Text text text  text text',
    }
  }

  _inputHandler = (e) => {
    const text = e.currentTarget.value;
    
    this.setState({ text }, () => {
      localStorage.setItem('text', this.state.text);
    });
  }

  render() {
    const { text } = this.state;

    return (
      <div style={style}>
        <h1>React-Xash</h1>
        <p>
          Utility for adding hash into your text to protect your content.
        </p>

        <br/>
      
        <textarea value={text} onChange={this._inputHandler} style={{ width: '100%', height: '15vh' }} />
        <p>
          <b>Result</b><br />
          {xash.from(text || '- - - - - - - - -')}
        </p>

        <p><b>Check result (copy here)</b></p>
        <textarea style={{ width: '100%', height: '15vh' }} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));