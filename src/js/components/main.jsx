import React from 'react';
import AppTile from './app-tile';
import request from 'request';

class Main extends React.Component {

  static defaultProps = {
    apps: [],
    hardware: 'basalt'
  }

  static propTypes = {
    apps: React.PropTypes.array
  }

  componentDidMount() {
    console.debug('KEEGAN: componenetDidMount');
    request.get(
      {
        url: 'https://api2.getpebble.com/v2/home/faces',
        json: true,
        qs: {
          image_ratio: 1,
          platform: 'all',
          hardware: 'basalt',
          filter_hardware: true
        }
      },
      (error, response, body) => {
        if (error) {
          console.error('Failed to get apps', response);
          return false;
        }
        this.setApps(body.applications);
      }
    );
  }

  constructor(props) {
    super();
    this.state = {
      apps: props.apps
    };
  }

  setApps = (apps) => {
    this.setState({
      apps: apps
    });
  }

  render() {
    return <div className="main">
      <header>
        <h1>Watchface Tachycardia</h1>
      </header>
      <ul className="apps-list">
        {this.state.apps.map((app, i) =>
          <li key={i}><AppTile app={app} /></li>
        )}
      </ul>
    </div>;
  }
}

export default Main;
