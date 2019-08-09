import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ErrorBoundary.scss';

/**
 * Prevents the page to crash in case one of the components in the component tree to find an error.
 * https://reactjs.org/docs/code-splitting.html#error-boundaries
 * */
class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.shape(),
  };

  static defaultProps = {
    children: null,
  };

  state = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error, errorInfo) {

    // 1. Catch errors in any components below and re-render with error message
    // 2. You can also log error messages to an error reporting service here
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { errorInfo, error } = this.state;
    const { children } = this.props;

    if (errorInfo) {
      return (
        <div className="ErrorBoundary">
          <h2>Something went wrong.</h2>
          <details>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }

    // Normally, just render children
    return children;
  }
}

export default ErrorBoundary;
