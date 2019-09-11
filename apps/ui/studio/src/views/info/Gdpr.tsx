import * as React from 'react'
import history from './../../history/History'

export default class Gdpr extends React.Component<any, any> {

  public constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div className='ms-fadeIn500 dla-padding20-lr'>
        <h1>Safe, secure, and ready for GDPR</h1>
        <p>Nothing matters more to us than the security of your data. We have you covered for the EU’s new General Data Protection Regulation (GDPR).</p>
        <h2>1. Securing your data</h2>
        <p>Protecting customer data is a top priority at Datalayer. We understand you are trusting us with your data and we take the responsibility of securing it extremely seriously. The Security section in our <a href="#" onClick={e => { e.preventDefault(); history.push('/privacy')}}>Privacy</a> page outlines all of our practices around handing of all your data, including personal data.</p>
        <h2>2. Data correction</h2>
        <p>All our users and teams can request to modify or delete any personal information by contacting us. We can also help with setting right access control for your project and datasets.
        </p>
        <h2>3. Right to be forgotten</h2>
        <p>As a user, you can permanently delete all your personal information, your projects and data on Datalayer. As a team admin you can revoke access to your team members, delete your team data and any team information.</p>
        <h1>FAQs</h1>
        <h2>What is GDPR?</h2>
        <p>
          The General Data Protection Regulation (GDPR) is a new European privacy law that goes into effect on May 25, 2018. The GDPR will replace the EU Data Protection Directive, also known as Directive 95/46/EC, and will apply a single data protection law throughout the EU.
          Data protection laws govern the way that businesses collect, use, and share personal data about individuals. Among other things, they require businesses to process an individual’s personal data fairly and lawfully, allow individuals to exercise legal rights in respect of their personal data (for example, to access, correct or delete their personal data), and ensure appropriate security protections are put in place to protect the personal data they process.
          We have taken steps to ensure that we will be compliant with the GDPR by May 25, 2018.
        </p>
        <h2>Who does the GDPR apply to?</h2>
        <p>The GDPR applies to all entities and individuals based in the EU and to entities and individuals, whether or not based in the EU, that process the personal data of EU individuals. The GDPR defines personal data as any information relating to an identified or identifiable natural person. This is a broad definition, and includes data that is obviously personal (such as an individual’s name or contact details) as well as data that can be used to identify an individual indirectly (such as an individual’s IP address).</p>
        <h2>What personal data do we collect and store from our customers?</h2>
        <p>We store data that customers have given us voluntarily. For example, in our role as data controller, we may collect and store contact information, such as name, email address, phone number, or physical address, when customers sign up for our products and services or seek support help. We also may collect other identifying information from our customers, such as IP address, Paypal ID, SSH public keys or Oauth tokens for external services. We separately act as a data processor when customers use our products and services to process EU personal data, such as uploading personal data to a Droplet. Customers decide what personal data, if any, is uploaded to our products and services.</p>
        <h2>What is the Datalayer Data Processing Agreement ("DPA")?</h2>
        <p>GDPR Article 28, Section 3, requires that a contract be in place between a data controller and a data processor. For years, the Datalayer <a href="#" onClick={e => { e.preventDefault(); history.push('/tos')}}>Terms of Service</a> and <a href="#" onClick={e => { e.preventDefault(); history.push('/privacy')}}>Privacy Policy</a> have provided the fundamental legal requirements and obligations regarding data ownership, processing behavior, safeguarding data, and more. However, if as a Datalayer customer you desire to have a GDPR-specific contract, contact us at <a href="mailto:info@datalayer.io">info@datalayer.io</a>.</p>
        <h2>How do we handle delete instructions from customers?</h2>
        <p>Customers have the ability to remove or delete information they have uploaded to our products. Likewise, customers may deactivate their account and request that all personal data we have collected and stored is deleted. Log into your account at Datalayer.io for further instructions or contact <a href="mailto:info@datalayer.io">info@datalayer.io</a>.</p>
        <h2>How can a customer view and download content from our services and transfer it to another provider?</h2>
        <p>You can log into your account at Datalayer.com and download all your code, data and project information using the download option. You can then transfer it to a different system</p>
      </div>
    )
  }

  public componentDidMount() {
    window.scroll({top: 0, left: 0, behavior: 'smooth' })
  }

}
