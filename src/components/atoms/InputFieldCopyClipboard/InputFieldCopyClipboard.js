import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CopyToClipboard from 'react-copy-to-clipboard';

import './InputFieldCopyClipboard.scss';

class InputFieldCopyClipboard extends Component {
  static propTypes = {
    text: PropTypes.string,
  };

  static defaultProps = {
    text: null,
  };

  state = {
    copied: false,
    timer: null,
  };

  componentWillUnmount() {
    const { timer } = this.state;

    // Prevents memory leaking from setTimeOut before component is un-mounted
    clearTimeout(timer);
  }

  // Changes state of copy button, to give visual feedback to user that the value was copied to clipboard
  handleCopy = () => {
    this.setState({
      copied: true,
      timer: setTimeout(() => this.setState({ copied: false }), 10000),
    });
  };

  render() {
    const { text } = this.props;
    const { copied } = this.state;

    return (
      <div className="InputFieldCopyClipboard">
        <input
          value={text || ''}
          onChange={() => this.setState({ copied: false })}
        />

        <CopyToClipboard text={text} onCopy={this.handleCopy}>
          <button type="button" disabled={text === '' || copied}>
            <span>{copied ? ' Copied' : 'Copy'}</span>
          </button>
        </CopyToClipboard>
      </div>
    );
  }
}

export default InputFieldCopyClipboard;
