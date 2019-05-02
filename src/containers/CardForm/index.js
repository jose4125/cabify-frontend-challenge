import React from 'react';

import FormField from '../../components/FormField';
import Select from '../Select';
import Option from '../Option';

class CardForm extends React.Component {
  state = {
    isOpen: false,
    codes: [],
    countryCodeSelected: '+93',
    counter: 0,
    handleCloseClickOutside: true,
    optionSelectedElement: null,
    form: {
      fullName: {
        valid: false,
        touched: false,
        focus: false,
        dirty: false,
        validation: {
          required: true,
          onlyString: true
        }
      },
      jobDescription: {
        valid: false,
        touched: false,
        focus: false,
        dirty: false,
        validation: {
          required: true
        }
      },
      phoneNumber: {
        valid: false,
        touched: false,
        focus: false,
        dirty: false,
        validation: {
          required: true,
          minLength: 10,
          maxLength: 10,
          onlyNumbers: true
        }
      },
      email: {
        valid: false,
        touched: false,
        focus: false,
        dirty: false,
        validation: {
          required: true,
          email: true
        }
      },
      website: {
        touched: false,
        focus: false,
        dirty: false
      },
      address: {
        valid: false,
        touched: false,
        focus: false,
        dirty: false,
        validation: {
          required: true
        }
      },
      formIsValid: false
    }
  };

  async componentDidMount() {
    const response = await fetch('/data/countryCodes.json');
    const { codes } = await response.json();
    //const countryCodeSelected = codes[3].dial_code;
    //this.props.context.handlePrefix(countryCodeSelected);
    this.setState({ codes });
  }

  handleCountryCodeSelected = countryCodeSelected => {
    this.setState({ countryCodeSelected });
  };

  handleOpenCloseDropdown = isOpen => {
    if (isOpen !== undefined) {
      this.setState({ isOpen: isOpen });
    } else {
      this.setState({ isOpen: !this.state.isOpen });
    }
  };

  setIndexSelected = dial_code => {
    this.state.codes.filter((country, index) => {
      if (country.dial_code === dial_code) {
        this.setState({ counter: index });
      }
      return index;
    });
  };

  setCountrySelected = dial_code => {
    this.setIndexSelected(dial_code);
    this.handleCountryCodeSelected(dial_code);
    this.props.context.handlePrefix(dial_code);
  };

  handleClickOutside = () => {
    if (this.state.handleCloseClickOutside) {
      this.handleOpenCloseDropdown(false);
    }
  };

  handleOptionselectedElement = optionSelectedElement => {
    this.setState({ optionSelectedElement });
  };

  getFieldFromState = stateName => {
    if (stateName in this.state.form) {
      const updatedForm = {
        ...this.state.form
      };

      const updatedElement = {
        ...updatedForm[stateName]
      };

      return [updatedForm, updatedElement];
    }

    return;
  };

  checkFormValid = (updatedForm, stateName) => {
    let formIsValid = true;

    for (let stateName in updatedForm) {
      const valid =
        updatedForm[stateName].valid === undefined
          ? true
          : updatedForm[stateName].valid;
      formIsValid = valid && formIsValid;
    }

    updatedForm.formIsValid = formIsValid;

    return updatedForm;
  };

  updateFieldState = (updatedForm, updatedElement, stateName) => {
    updatedForm[stateName] = updatedElement;

    const checkUpdatedForm = this.checkFormValid(updatedForm, stateName);

    this.setState({ form: checkUpdatedForm });
  };

  onHandleChange = (value, stateName) => {
    this.props.context.handleChange(value, stateName);
    let [updatedForm, updatedElement] = this.getFieldFromState(stateName);
    if ('validation' in updatedElement) {
      updatedElement.valid = this.checkValidation(
        value,
        updatedElement.validation
      );
    }

    updatedElement.dirty = this.checkDirty(value);

    this.updateFieldState(updatedForm, updatedElement, stateName);
  };

  onHandleFocus = stateName => {
    let [updatedForm, updatedElement] = this.getFieldFromState(stateName);
    updatedElement.touched = true;
    updatedElement.focus = true;

    this.updateFieldState(updatedForm, updatedElement, stateName);
  };

  onHandleBlur = stateName => {
    let [updatedForm, updatedElement] = this.getFieldFromState(stateName);
    updatedElement.focus = false;

    this.updateFieldState(updatedForm, updatedElement, stateName);
  };

  checkDirty = value => {
    if (value.length) {
      return true;
    }

    return false;
  };

  checkValidation = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.onlyString) {
      isValid = /^[a-zA-Z ]*$/.test(value) && isValid;
    }

    if (rules.onlyNumbers) {
      isValid = /^\d+$/.test(value) && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.email) {
      const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = regex.test(value.toLowerCase()) && isValid;
    }

    return isValid;
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.context.handleReset(this.state.countryCodeSelected);
  };

  renderOptions = (countryCode, index) => (
    <Option
      key={countryCode.name}
      index={index}
      counter={this.state.counter}
      countryCode={countryCode}
      countryCodeSelected={this.state.countryCodeSelected}
      handleOpenCloseDropdown={this.handleOpenCloseDropdown}
      setCountrySelected={this.setCountrySelected}
      handleOptionselectedElement={this.handleOptionselectedElement}
    />
  );

  render() {
    const { context } = this.props;
    return (
      <article className="builder col col6">
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="row">
            <FormField
              type="text"
              name="fullname"
              stateName="fullName"
              label="Full name"
              onHandleChange={this.onHandleChange}
              onHandleBlur={this.onHandleBlur}
              onHandleFocus={this.onHandleFocus}
              value={context.state['fullName']}
              isValid={this.state.form['fullName'].valid}
              touched={this.state.form['fullName'].touched}
              isDirty={this.state.form['fullName'].dirty}
              isFocus={this.state.form['fullName'].focus}
            />
          </div>
          <div className="row row-separationMedium">
            {/* you probably need to add active/focus/disabled classNames */}
            <FormField
              type="text"
              name="jobdescription"
              stateName="jobDescription"
              label="Job description"
              onHandleChange={this.onHandleChange}
              onHandleBlur={this.onHandleBlur}
              onHandleFocus={this.onHandleFocus}
              value={context.state['jobDescription']}
              isValid={this.state.form['jobDescription'].valid}
              touched={this.state.form['jobDescription'].touched}
              isDirty={this.state.form['jobDescription'].dirty}
              isFocus={this.state.form['jobDescription'].focus}
            />
          </div>
          <div className="row row-separationMedium row-gutterMedium">
            <div className="col col3">
              {/* select field will be placed here */}

              {this.state.codes.length > 0 && (
                <Select
                  isOpen={this.state.isOpen}
                  codes={this.state.codes}
                  countryCodeSelected={this.state.countryCodeSelected}
                  counter={this.state.counter}
                  setCountrySelected={this.setCountrySelected}
                  handleOpenCloseDropdown={this.handleOpenCloseDropdown}
                  handleClickOutside={this.handleClickOutside}
                  optionSelectedElement={this.state.optionSelectedElement}
                >
                  {this.state.codes.map(this.renderOptions)}
                </Select>
              )}
            </div>
            <FormField
              type="tel"
              name="phonenumber"
              stateName="phoneNumber"
              label="Phone number"
              onHandleChange={this.onHandleChange}
              onHandleBlur={this.onHandleBlur}
              onHandleFocus={this.onHandleFocus}
              value={context.state['phoneNumber']}
              isValid={this.state.form['phoneNumber'].valid}
              touched={this.state.form['phoneNumber'].touched}
              isDirty={this.state.form['phoneNumber'].dirty}
              isFocus={this.state.form['phoneNumber'].focus}
              col="9"
            />
          </div>
          <div className="row row-separationMedium">
            <FormField
              type="email"
              name="email"
              stateName="email"
              label="Email"
              onHandleChange={this.onHandleChange}
              onHandleBlur={this.onHandleBlur}
              onHandleFocus={this.onHandleFocus}
              value={context.state['email']}
              isValid={this.state.form['email'].valid}
              touched={this.state.form['email'].touched}
              isDirty={this.state.form['email'].dirty}
              isFocus={this.state.form['email'].focus}
            />
          </div>
          <div className="row row-separationMedium">
            <FormField
              type="text"
              name="website"
              stateName="website"
              label="Website"
              onHandleChange={this.onHandleChange}
              onHandleBlur={this.onHandleBlur}
              onHandleFocus={this.onHandleFocus}
              value={context.state['website']}
              touched={this.state.form['website'].touched}
              isDirty={this.state.form['website'].dirty}
              isFocus={this.state.form['website'].focus}
            />
          </div>
          <div className="row row-separationMedium">
            <FormField
              type="text"
              name="address"
              stateName="address"
              label="Address"
              onHandleChange={this.onHandleChange}
              onHandleBlur={this.onHandleBlur}
              onHandleFocus={this.onHandleFocus}
              value={context.state['address']}
              isValid={this.state.form['address'].valid}
              touched={this.state.form['address'].touched}
              isDirty={this.state.form['address'].dirty}
              isFocus={this.state.form['address'].focus}
            />
          </div>
          <div className="row row-separationHuge">
            <input
              className={`button button-full button-primary ${
                this.state.form.formIsValid === false ? 'disabled' : ''
              }`}
              type="submit"
              value="Request"
            />
          </div>
        </form>
      </article>
    );
  }
}

export default CardForm;
