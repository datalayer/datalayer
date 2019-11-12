import * as React from "react"
import { PrimaryButton } from "office-ui-fabric-react/lib/Button"
import FormField from "../FormField"
import * as formSchema from './FormSpl.schema.json'
import { validate } from "../Validator"
import { ButtonContainer, FormContainer, H1, Header, Wrapper } from "./FormSpl.style"

interface Istate {
  form: {
    firstName: string;
    lastName: string;
    address: string;
    username: string;
    email: string;
    occupation: string;
    gender: string;
  };
  formError: object;
}

export default class App extends React.Component<{}, Istate> {
  public state = {
    form: {
      firstName: "",
      lastName: "",
      address: "",
      username: "",
      email: "",
      occupation: "",
      gender: ""
    },
    formError: {}
  };
  public render() {
    const { form, formError } = this.state;
    const userFields = formSchema.default.fields;
    return (
      <Wrapper>
        <FormContainer>
          <FormField
            placeholder="E.g. Patric"
            schema={userFields.firstName}
            error={formError}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            placeholder="E.g. Jane"
            schema={userFields.lastName}
            error={formError}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            placeholder="E.g. patricJ"
            schema={userFields.username}
            error={formError}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            placeholder="E.g. patric@gmail.com"
            schema={userFields.email}
            error={formError}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            schema={userFields.address}
            error={formError}
            formData={form}
            multiline={true}
            rows={4}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            placeholder="What's your Occupation?"
            schema={userFields.occupation}
            error={formError}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <FormField
            placeholder="What's your Gender?"
            schema={userFields.gender}
            error={formError}
            formData={form}
            onChange={this.fieldChangeHandler}
          />
          <ButtonContainer>
            <PrimaryButton onClick={this.handleFormSubmit}>Submit</PrimaryButton>
          </ButtonContainer>
        </FormContainer>
      </Wrapper>
    );
  }

  private handleFormSubmit = () => {
    console.log("Called handle submit.");
    const { form } = this.state;
    const validateStatus = validate(formSchema.default, form);
    this.setState({
      formError: validateStatus
    });
    if (Object.keys(validateStatus).length === 0 && validateStatus.constructor === Object) {
      console.log("passed form validation");
    }
  }

  private fieldChangeHandler = (name: string, value: string) => {
    const { formError } = this.state;
    const validateStatus = validate(formSchema.default, {
      [name]: value
    })
    const getErrorState = () => {
      if (validateStatus[name]) {
        return { ...formError, [name]: validateStatus[name] }
      } else {
//        const { [name]: _, ...restErrors } = formError
        const { ...restErrors } = formError
        return restErrors
      }
    }
    this.setState(
      {
        form: { ...this.state.form, [name]: value },
        formError: getErrorState()
      },
      () => {
        console.log(this.state);
      }
    )
  }

}
