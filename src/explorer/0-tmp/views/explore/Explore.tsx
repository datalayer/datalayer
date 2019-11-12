import * as React from 'react'

export default class Explore extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <div style={{paddingTop: 60, paddingBottom: 72, paddingLeft: 12, maxWidth: 1320, marginLeft: 'auto', marginRight: 'auto'}}>
          <div className="ms-fontSize-su ms-fontWeight-semibold">
            Explore
          </div>
          <div style={{width: '50%'}}>
            <div className="ms-font-xl" style={{marginTop: 20}}>
              Beautiful, free notebooks.
            </div>
            <div className="ms-font-xl">
              Explore these popular picture categories on Datalayer. All notebooks are free to download and use under the Datalayer License.
            </div>
          </div>
        </div>
        <div style={{paddingLeft: 12, maxWidth: 1320, marginLeft: 'auto', marginRight: 'auto'}}>
          <div className="ms-fontSize-xxl">
            Business notebooks
          </div>
          <div style={{width: '50%'}}>
            <div className="ms-font-xl" style={{marginTop: 20}}>
              Download free notebooks produced by data scientists getting ready for work in real life. No cheesy or stocky business notebooks here. Explore more business notebooks.
            </div>
          </div>
        </div>
        <div style={{paddingTop: 20, paddingLeft: 12, maxWidth: 1320, marginLeft: 'auto', marginRight: 'auto', display: 'flex'}}>
          <div style={{width: '33.33333%'}}>
            <a title="View the photo by Samson Creative." href="/photos/ZGjbiukp_-A">
              <img style={{width: '100%', height: '250px', objectFit: 'cover'}} alt="blue and black city buildings photography" src="https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=max&amp;w=500&amp;q=60" />
            </a>
          </div>
          <div style={{width: '33.33333%'}}>
            <a title="View the photo by Carlos Muza" href="/photos/hpjSkU2UYSU">
            <img style={{width: '100%', height: '250px', objectFit: 'cover'}} alt="laptop computer on glass-top table" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=max&amp;w=500&amp;q=60" />
            </a>
          </div>
          <div style={{width: '33.33333%'}}>
            <a title="View the photo by Adeolu Eletu" href="/photos/E7RLgUjjazc">
              <img style={{width: '100%', height: '250px', objectFit: 'cover'}} alt="person wearing suit reading business newspaper" src="https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=max&amp;w=500&amp;q=60" />
            </a>
          </div>
      </div>
    </div>
    )
  }
}
