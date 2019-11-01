import * as React from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import IamApi from './../../api/iam/IamApi'
import history from './../../history/History'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from './../../actions/ConfigActions'
import FormField from "./../../widget/form/FormField"
import { ButtonContainer, FormContainer } from "./Signup.style"
import * as formSchema from './Signup.schema.json'
import { validate } from "./../../widget/form/Validator"

@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
export default class SignupForm extends React.Component<any, any> {
  private readonly iamApi: IamApi

  state = {
    form: {
      first_name: '',
      family_name: '',
      username: '',
      email: '',
      password: '',
      password_confirm: ''
    },
    formError: {
      first_name: '',
      family_name: '',
      username: '',
      email: '',
      password: '',
      password_confirm: ''
    },
    signUpResponse: {
      success: true,
      errors: []
    }
  }

  public constructor(props) {
    super(props)
    this.iamApi = window["IamApi"]
  }

  public render() {
    const { form, formError } = this.state
    const userFields = formSchema.default.fields
    return (
      <div id="dla-signup-form">
{/*
      <div className='ms-fadeIn500 dla-padding20'>
        <div className='ms-fontSize-xxl'>Create a free account</div>
        <div style={{ height: '20px'}} />
*/}
        <div className="ms-Grid" style={{ padding: 0}}>
          <div className="ms-Grid-row" style={{margin: 0}}>
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
              <div>
                {
                  this.state.signUpResponse.errors &&
                  this.state.signUpResponse.errors.map(error => {
                    return <MessageBar
                      key={error}
                      messageBarType={ MessageBarType.severeWarning }>
                        <span>{error + '.'}</span>
                    </MessageBar>
                  })
                }
                <FormContainer>
                  <div className="ms-Grid" style={{padding: 0, margin:0}}>
                    <div className="ms-Grid-row" style={{padding: 0}}>
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" style={{padding: 0}}>
                        <div className="ms-fontSize-xxl" style={{paddingBottom: 20}}>Join datalayer, it's free</div>
                      </div>
                      </div>
                      <div className="ms-Grid-row" style={{padding: 0}}>
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" style={{padding: 0}}>
                          <FormField
                            placeholder=""
                            schema={userFields.username}
                            error={formError}
                            formData={form}
                            underlined
                            borderless
                            onChange={this.fieldChangeHandler}
                          />
                        </div>
                      </div>
                      <div className="ms-Grid-row" style={{padding: 0}}>
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" style={{padding: 0}}>
                          <FormField
                            placeholder=""
                            schema={userFields.first_name}
                            error={formError}
                            formData={form}
                            underlined
                            borderless
                            onChange={this.fieldChangeHandler}
                          />
                        </div>
                      </div>
                      <div className="ms-Grid-row" style={{padding: 0}}>
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" style={{padding: 0}}>
                          <FormField
                            placeholder=""
                            schema={userFields.family_name}
                            error={formError}
                            formData={form}
                            underlined
                            borderless
                            onChange={this.fieldChangeHandler}
                          />
                        </div>
                      </div>
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" style={{padding: 0}}>
                          <FormField
                            placeholder=""
                            schema={userFields.email}
                            error={formError}
                            formData={form}
                            underlined
                            borderless
                            onChange={this.fieldChangeHandler}
                          />
                        </div>
                      </div>
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" style={{padding: 0}}>
                          <FormField
                            placeholder=""
                            schema={userFields.password}
                            type="password"
                            error={formError}
                            formData={form}
                            underlined
                            borderless
                            onChange={this.fieldChangeHandler}
                          />
                        </div>
                      </div>
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" style={{padding: 0}}>
                          <FormField
                            placeholder=""
                            schema={userFields.password_confirm}
                            type="password"
                            error={formError}
                            formData={form}
                            underlined
                            borderless
                            onChange={this.fieldChangeHandler}
                          />
                        </div>
                      </div>
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" style={{padding: 0, marginTop: 10}}>
  {/*
                          <ActionButton
                            iconProps={{ 
                              iconName: 'AddFriend',
                            }}
                            disabled={false}
                            checked={true}
                            onClick={ e => { e.preventDefault(); this.handleFormSubmit() }}
                            >
                            Create a Free Account
                          </ActionButton>
  */}
                          <PrimaryButton onClick={this.handleFormSubmit}>Create a free account</PrimaryButton>
                        </div>
                      </div>
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" style={{padding: 0}}>
                          <div className="ms-font-s" style={{marginTop: 10}}>
                            By clicking “Create a free account”, you agree to our <a href="#" onClick={e => { e.preventDefault(); history.push('/tos')}}>Terms of Service</a> and <a href="#" onClick={e => { e.preventDefault(); history.push('/privacy')}}>Privacy Policy</a>. We’ll occasionally send you account-related emails.
                          </div>
                        </div>
                      </div>
  {/*
                        <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2" style={{padding: 0}}>
                        </div>
                        <div className="ms-Grid-col ms-sm5 ms-md ms-lg5" style={{padding: 0}}>
                        <ActionButton
                            iconProps={{ 
                              iconName: 'StatusCircleQuestionMark',
                            }}
                            disabled={false}
                            checked={true}
                            onClick={ e => { e.preventDefault(); history.push('/forgotpassword') }}
                            >
                            Forgot Password
                          </ActionButton>
                        </div>
  */}
                    </div>
                </FormContainer>
              </div>
            </div>
{/*
            <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg8 text-center">
              <img src="/img/explorer/explorer.svg"/>
            </div>
*/}
          </div>
        </div>
      </div>
    )
  }

  private fieldChangeHandler = (name: string, value: string): void => {
    const { form } = this.state
    const new_form =  { ...form, [name]: value }
//    const validateStatus = validate(formSchema.default, new_form);
    this.setState({
      form: new_form,
//      formError: validateStatus
    })
  }

  private handleFormSubmit = (): void => {
    const { form } = this.state
    const validateStatus = validate(formSchema.default, form);
    this.setState({
      formError: validateStatus
    })
    if (Object.keys(validateStatus).length === 0 && validateStatus.constructor === Object) {
      this.doSubmit(form)
    }
  }

  private doSubmit = (signup: {}): void => {
    toastr.info('Signup', `We are checking the validity of your request.`)
    this.iamApi.signup(signup)
      .then(res => {
        let result = res.result
        this.setState({signUpResponse: result})
        if (result.success) {
          toastr.success('Signup', `We have sent you a mail. Please check your inbox.`)
          history.push('/join/mail')
        }
        else {
          if (result.errors) {
            result.errors.map(error => {
              toastr.error('Error', error + '.')
            })
          }
        }
      }
    )
  }

}
