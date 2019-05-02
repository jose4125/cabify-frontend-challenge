import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';

import chevron from '../../images/arrow.svg';

import '../../../node_modules/flagkit-web/styles/flagkit.css';

export class Select extends Component {
  state = {
    countScrolled: 0,
    heights: []
  };
  constructor(props) {
    super(props);
    this.wrapperOptions = React.createRef();
    this.test = React.createRef();
  }

  componentDidMount() {
    this.props.setCountrySelected(this.props.countryCodeSelected);
  }

  handleKeyDown = event => {
    if (event.keyCode === 40) {
      const counter = this.props.counter + 1;
      this.props.setCountrySelected(this.props.codes[counter].dial_code);
      //this.test += this.props.optionSelectedElement.current.offsetHeight;
      if (this.props.optionSelectedElement) {
        const newPos =
          this.state.countScrolled +
          this.props.optionSelectedElement.current.offsetHeight;

        this.setState(
          {
            countScrolled: newPos,
            heights: [
              ...this.state.heights,
              this.props.optionSelectedElement.current.offsetHeight
            ]
          },
          () => {
            this.wrapperOptions.current.scrollTo(0, this.state.countScrolled);
          }
        );
      }
    }

    if (event.keyCode === 38) {
      const counter = this.props.counter - 1;
      this.props.setCountrySelected(this.props.codes[counter].dial_code);

      const newPos =
        this.state.countScrolled -
        this.state.heights[this.state.heights.length - 1];

      let newHeight = [...this.state.heights];
      newHeight.pop();

      this.setState(
        {
          countScrolled: newPos,
          heights: newHeight
        },
        () => {
          this.wrapperOptions.current.scrollTo(0, this.state.countScrolled);
        }
      );
    }
  };

  render() {
    return (
      <div
        className={`formField-input formField-input--select  active ${
          this.props.isOpen ? 'isOpen focus' : ''
        } col col12`}
      >
        <div className="input select">
          <p className="select__label">Prefix</p>
          <button
            type="button"
            className="select__button"
            onClick={this.props.handleOpenCloseDropdown}
            onKeyDown={this.handleKeyDown}
          >
            {this.props.countryCodeSelected}
            <img className="select__chevron" src={chevron} alt="chevron" />
          </button>
        </div>
        <div className="dropdown" ref={this.wrapperOptions}>
          <ul className="dropdown__wrapper" ref={this.test}>
            {this.props.children}
          </ul>
        </div>
      </div>
    );
  }
}

export default onClickOutside(Select);
