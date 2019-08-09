import React, { Component } from 'react';

import Layout from '../../styles/layout';

import './Home.scss';

/**
 * Renders home page.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class Home extends Component {
  static propTypes = {};

  static contextTypes = {};

  componentDidMount() {}

  render() {
    return (
      <Layout>
        <div className="Home">
          <section className="Home--main-banner">
            <div className="Home--main-banner_inner">
              <div className="Home--main-banner--content">
                <h1 className="Home--main-banner--content--title">
                  Welcome to The Wine Gallery First Prototype
                </h1>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    );
  }
}

export default Home;
