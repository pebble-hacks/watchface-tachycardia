import React from 'react';
import mappings from '../lib/mappings';

class AppTile extends React.Component {

  static defaultProps = {
    app: {},
    selected: false
  }

//  static propTypes = {
//    title: React.PropTypes.number,
//    screenshot_images: React.PropTypes.array
//  }

  constructor(props) {
    super();
    this.state = {
      app: props.app,
      selected: props.selected
    };
  }

  select = () => {
    this.setState({
      selected: !this.state.selected
    });
  }

  render() {
    let screenshotSize = mappings[this.state.app.screenshot_hardware];
    let className = 'app-tile' + (this.state.selected ? ' selected' : '');

    if (this.state.app) {
      return <div className={className} onClick={this.select}>
        <h4>{this.state.app.title}</h4>
        <div className="image">
          <img src={this.state.app.screenshot_images[0][screenshotSize]}/>
        </div>
      </div>;
    }

    return <div></div>;
  }
}

export default AppTile;
