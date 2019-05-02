import React from 'react';

export class Option extends React.Component {
  constructor(props) {
    super(props);
    this.OptionRefSelected = React.createRef();
  }

  componentDidMount() {
    if (this.props.counter === this.props.index) {
      this.props.handleOptionselectedElement(this.OptionRefSelected);
    }
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.counter !== this.props.index &&
      this.props.counter === this.props.index
    ) {
      this.props.handleOptionselectedElement(this.OptionRefSelected);
    }
  }
  render() {
    return (
      <li
        ref={this.OptionRefSelected}
        className={`dropdown__item ${
          this.props.countryCode.dial_code === this.props.countryCodeSelected
            ? 'selected'
            : ''
        }`}
        onClick={event => {
          this.props.setCountrySelected(this.props.countryCode.dial_code);
          this.props.handleOpenCloseDropdown(false);
        }}
      >
        <div className="dropdown__country">
          <span className={`flag ${this.props.countryCode.code}`} />
          <p className="dropdown__country-name">
            {this.props.countryCode.name}
          </p>
        </div>
        {this.props.countryCode.dial_code}
      </li>
    );
  }
}

export default Option;
