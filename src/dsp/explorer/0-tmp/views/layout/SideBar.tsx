import * as React from 'react'
import { Nav } from 'office-ui-fabric-react/lib/Nav'

export default class SideBar extends React.Component<any, any> {

  state = {
    groups: [{
      links: [{
        name: 'Datalayer',
        url: 'https://datalayer.io',
        links: [{
          name: 'Activity',
          url: 'https://datalayer.io',
        }, {
          name: 'News',
          url: 'https://datalayer.io',
        }],
        isExpanded: true,
      }, {
        name: 'Documents',
        url: 'https://datalayer.io',
        isExpanded: true,
      }, {
        name: 'Pages',
        url: 'https://datalayer.io',
      }, {
        name: 'Long Name Test for elipsis. Longer than 12em!',
        url: 'https://datalayer.io',
      }, {
        name: 'Edit Link',
        url: 'https://datalayer.io',
        iconClassName: 'ms-Icon--Edit',
      }, {
        name: 'Edit',
        url: '#',
        icon: 'Edit',
        onClick: () => {},
      }]
    }],
    expanded: 'expanded',
    collapsed: 'collapsed',
  }

  public constructor(props) {
    super(props)
  }

  public render() {
    const { groups, expanded, collapsed } = this.state
    return (
      <div className='SidebarMenu'>
{/*
        <Nav 
          groups={groups}
          expandedStateText={expanded}
          collapsedStateText={collapsed}
        />
*/}
        </div>
    )
  }

}
