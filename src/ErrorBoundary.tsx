import { Component, ErrorInfo, ReactElement } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component<{ children: ReactElement }> {
  state = {
    hasError: false,
  };

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {}

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>
            There was an error with this listing. <Link to="/">Click here</Link>{" "}
            to go back to the home page or wait five seconds.
          </h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
