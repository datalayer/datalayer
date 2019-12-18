import * as React from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { DocumentCard, DocumentCardActivity, DocumentCardPreview, DocumentCardTitle, IDocumentCardPreviewProps } from 'office-ui-fabric-react/lib/DocumentCard'
import { ImageFit } from 'office-ui-fabric-react/lib/Image'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { DatalayerStore } from './../../store/DatalayerStore'
import IamApi from './../../api/iam/IamApi'
import history from './../../history/History'
import { mapStateToPropsAuth, mapDispatchToPropsAuth } from '../../actions/AuthActions'
import FormField from "./../../widget/form/FormField"
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { ButtonContainer, FormContainer } from "./Form.style"
import * as formSchema from './Profile.schema.json'
import { validate } from "./../../widget/form/Validator"

@connect(mapStateToPropsAuth, mapDispatchToPropsAuth)
export default class Profile extends React.Component<any, any> {
  private readonly iamApi: IamApi

  state = {
    form: {
      first_name: '',
      family_name: '',
      username: '',
      email: '',
    },
    formError: {},
    me: DatalayerStore.state().me,
    profileResponse: {
      success: true,
      errors: []
    }
  }
  
  public constructor(props) {
    super(props)
    this.iamApi = window["IamApi"]
    this.state = {
      form: {
        first_name: DatalayerStore.state().me.given_name,
        family_name: DatalayerStore.state().me.family_name,
        username: DatalayerStore.state().me.username,
        email: DatalayerStore.state().me.email
      },
      formError: {},
      me: DatalayerStore.state().me,
      profileResponse: {
        success: true,
        errors: []
      }
    }
  }

  public render() {
    const { form, formError, me } = this.state
    const userFields = formSchema.default.fields
    let previewProps: IDocumentCardPreviewProps = {
      previewImages: [{
        previewImageSrc: '/img/explorer/explorer.svg',
        imageFit: ImageFit.cover,
        width: 318,
        height: 196
      }]
    }
    return (
      <div className='dla-padding20'>
        <div className='ms-fadeIn500'>
          <div className='ms-fontSize-xxl'>My profile</div>
          <div style={{ height: '20px'}} />
          <div className="ms-Grid" style={{ padding: 0 }}>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
                <div>
                  {
                    this.state.profileResponse.errors &&
                    this.state.profileResponse.errors.map(error => {
                      return <MessageBar
                        key={error}
                        messageBarType={ MessageBarType.severeWarning }>
                          <span>{error + '.'}</span>
                      </MessageBar>
                    })
                  }
                <FormContainer>
                  <FormField
                    placeholder="e.g. Jane"
                    schema={userFields.first_name}
                    error={formError}
                    formData={form}
                    onChange={this.fieldChangeHandler}
                  />
                  <FormField
                    placeholder="e.g. Doe"
                    schema={userFields.family_name}
                    error={formError}
                    formData={form}
                    onChange={this.fieldChangeHandler}
                  />
                  <FormField
                    placeholder="e.g. jdoe"
                    schema={userFields.username}
                    error={formError}
                    disabled={true}
                    formData={form}
                    onChange={this.fieldChangeHandler}
                  />
                  <FormField
                    placeholder="e.g. j@doe.com"
                    schema={userFields.email}
                    disabled={true}
                    error={formError}
                    formData={form}
                    onChange={this.fieldChangeHandler}
                  />
                  <ButtonContainer>
                    <PrimaryButton onClick={this.handleFormSubmit}>Update and Logout</PrimaryButton>
                  </ButtonContainer>
                  <ButtonContainer>
                    <DefaultButton
                          text="Cancel"
                          onClick={ e => { e.preventDefault(); history.push('/home') } }
                        />
                  </ButtonContainer>
                </FormContainer>
                </div>
              </div>
              <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
              </div>
              <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg8">
                <div style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                  <DocumentCard>
                    <DocumentCardPreview { ...previewProps } />
                    <DocumentCardTitle
                      title = { DatalayerStore.state().profileDisplayName }
                      shouldTruncate = { true } />
                    <DocumentCardActivity
                      activity={'@' + this.state.me.username}
                      people={
                        [{ 
                          name: DatalayerStore.state().profileDisplayName, 
                          profileImageSrc: '/img/explorer/explorer.svg'
                        }]
                      }
                    />
                  </DocumentCard>
                </div>
              </div>
            </div>
          </div>
        </div>
     </div>
    )
  }

  public componentWillReceiveProps(nextProps) {
    const { isIamAuthenticated } = nextProps
    if (isIamAuthenticated) {
      this.setState({
        me: DatalayerStore.state().me,
        profileDisplayName: DatalayerStore.state().profileDisplayName
      })
    }
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
    const validateStatus = validate(formSchema.default, form)
    this.setState({
      formError: validateStatus
    })
    if (Object.keys(validateStatus).length === 0 && validateStatus.constructor === Object) {
      this.doSubmit(form)
    }
  }

  private doSubmit = (profile: {}): void => {
    toastr.info('Profile', `We are checking the validity of your request.`)
    this.iamApi.updateProfile(profile)
      .then(res => {
        let result = res.result
        this.setState({profileResponse: result})
        if (result.success) {
          toastr.success('Profile', `Your profile has been updated.`)
          this.iamApi.logout()
            .then(res => {
              this.props.dispatchLogoutAction()
            })
          history.push('/profile/confirm')
/*
          this.iamApi.getMe().then(res => {
            if (res.success && res.result.success) {
              history.push('/profile/confirm')
            }
          })
*/
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
