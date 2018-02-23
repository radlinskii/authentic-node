import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answer: 42,
    };
    this.asyncFunction = this.asyncFunction.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  asyncFunction () {
    return Promise.resolve(37);
  }

  async componentDidMount () { //eslint-disable
    this.setState({
      answer: await this.asyncFunction(),
    });
  }

  render() {
    return (
      <div className='container app-component'>
        <h1>Opa Opa</h1>
        <div className="btn btn-info">
          <span className="fa fa-star"></span>
          {this.state.answer}
        </div>
      </div>
    );
  }
}

export default App;
