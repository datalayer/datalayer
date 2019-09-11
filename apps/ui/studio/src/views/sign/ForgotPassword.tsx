import * as React from 'react'
import { connect } from 'react-redux'
import IamApi from '../../api/iam/IamApi'
import { toastr } from 'react-redux-toastr'
import history from '../../history/History'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from '../../actions/ConfigActions'
import FormField from "./../../widget/form/FormField"
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { ButtonContainer, FormContainer } from "./Form.style"
import * as formSchema from './ForgotPassword.schema.json'
import { validate } from "./../../widget/form/Validator"

@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
export default class ForgotPassword extends React.Component<any, any> {
  private readonly iamApi: IamApi

  state = {
    form: {
      username: '',
      password: '',
      password_confirm: ''
    },
    formError: {},
    forgotPasswordResponse: {
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
      <div  className="ms-fadeIn500" style={{ padding: 0, height: '100%' }}>
        <div className="ms-Grid" style={{ 
            height: '100%' 
          }}>
          <div className="ms-Grid-row" style={{ height: '100%' }}>
            <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4" style={{ 
              padding: '3% 4%',
              color: 'white',
//              backgroundImage: 'url(https://images.unsplash.com/photo-1546229656-1e0cbe59e1ed?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)', 
            backgroundImage: 'url(https://images.unsplash.com/photo-1486739708862-7db2dfa3f7d6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)', 
//            backgroundImage: 'url(https://images.unsplash.com/photo-1551308075-d5f542da6386?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)', 
//            backgroundImage: 'url(https://images.unsplash.com/photo-1534263586354-330c44fa6e87?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)', 
              height: '100%',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#111111',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
//            alignItems: 'center'
          }}
            >
              <div>
                <a href="" onClick={e => {e.preventDefault(); history.push('/')}}><img src="/img/datalayer/datalayer-square_white.png" style={{ width: 36, marginTop: 0, marginBottom: 24 }} /></a>
              </div>
              <div>
                <h1 style={{fontWeight: 'bold'}}>A home for data scientists</h1>
                <h2 style={{fontWeight: 'bold'}}>Access curated notebooks you can’t find anywhere else</h2>
              </div>
              <div></div>
            </div>
            <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg8" style={{ padding: '80px 8% 20px' }}>
              <div>
              {
                  this.state.forgotPasswordResponse.errors &&
                  this.state.forgotPasswordResponse.errors.map(error => {
                    return <MessageBar
                      key={error}
                      messageBarType={ MessageBarType.severeWarning }>
                        <span>{error + '.'}</span>
                    </MessageBar>
                  })
                }
                <FormContainer>
                  <FormField
                    placeholder="e.g. jdoe"
                    schema={userFields.username}
                    error={formError}
                    formData={form}
                    onChange={this.fieldChangeHandler}
                  />
                  <FormField
                    placeholder="e.g. a$_sdfEW2w"
                    schema={userFields.password}
                    type="password"
                    error={formError}
                    formData={form}
                    onChange={this.fieldChangeHandler}
                  />
                  <FormField
                    placeholder="e.g. a$_sdfEW2w"
                    schema={userFields.password_confirm}
                    type="password"
                    error={formError}
                    formData={form}
                    onChange={this.fieldChangeHandler}
                  />
                  <ButtonContainer>
                    <PrimaryButton onClick={this.handleFormSubmit}>Request a password reset</PrimaryButton>
                  </ButtonContainer>
                  <ButtonContainer>
                    <DefaultButton
                        text="Cancel"
                        onClick={ e => { e.preventDefault(); history.push('/') } }
                      />
                  </ButtonContainer>
                </FormContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  private fieldChangeHandler = (name: string, value: string): void => {
    const { form } = this.state
    const new_form =  { ...form, [name]: value }
    const validateStatus = validate(formSchema.default, new_form);
    this.setState({
      form: new_form,
      formError: validateStatus
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

  private doSubmit = (forgotPassword: {}): void => {
    toastr.info('Forgot password', `We are checking the validity of your request.`)
    this.iamApi.forgotPassword(forgotPassword)
      .then(res => {
        let result = res.result
        this.setState({forgotPasswordResponse: result})
        if (result.success) {
          toastr.success('Forgot password', `We have sent you a mail. Please check your inbox.`)
          history.push('/forgotpassword/mail')
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
