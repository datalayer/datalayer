import * as React from 'react'
import SignupForm from './SignupForm'
import history from '../../history/History'

export default class SignupPage extends React.Component<any, any> {

  public constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div  style={{ padding: 0, height: '100%' }}>
        <div className="ms-Grid" style={{ 
            height: '100%' 
          }}>
          <div className="ms-Grid-row" style={{ height: '100%' }}>
            <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4" style={{ 
              padding: '3% 4%',
              color: 'white',
              backgroundImage: 'url(https://images.unsplash.com/photo-1546229656-1e0cbe59e1ed?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)', 
//            backgroundImage: 'url(https://images.unsplash.com/photo-1486739708862-7db2dfa3f7d6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)', 
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
                <SignupForm/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
