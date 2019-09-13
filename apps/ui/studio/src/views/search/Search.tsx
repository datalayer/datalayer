import * as React from 'react'
import { connect } from 'react-redux'
import StackGrid from "react-stack-grid"
import { mapStateToPropsAuth, mapDispatchToPropsAuth } from '../../actions/AuthActions'
import { DatalayerStore } from '../../store/DatalayerStore'
import { IConfig } from '../../api/config/ConfigApi'
import LibraryApi from '../../api/library/LibraryApi'
import CardDla from '../../widget/CardDla'
import noresult from './no-result.svg'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from '../../actions/ConfigActions'
import './../../styles/Styles.scss'

@connect(mapStateToPropsAuth, mapDispatchToPropsAuth)
@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
export default class Search extends React.Component<any, any> {
  private config: IConfig = DatalayerStore.state().config
  private readonly libraryApi: LibraryApi

  state = {
    cards: [],
    refreshed: false,
    q: ''
  }

  public constructor(props) {
    super(props)
    this.libraryApi = window["LibraryApi"]
    this.state.q = this.props.match.params.q
    this.refreshCards(this.state.q)
  }

  public render() {
    const { q, refreshed, cards } = this.state
    return (
      <div id='dla-search-results'>
{/*
        <div className={ "hero" } style={{ margin: 0 }}>
          <SearchBoxDla 
            q={q}
            onSearch={this.refreshCards}
            />
        </div>
*/}

        <div style={{ paddingLeft: 20, paddingRight: 20}}>
          <div>
              <h1>{q} notebooks</h1>
{/*
              <p>0 free asdf pictures</p>
*/}
              </div>
{/*
          <div>
            <a href="/search/photos/asdf">
              <span>0</span><span>Photos</span>
            </a>
            <a href="/search/collections/asdf">
              <span>11</span><span>Collections</span>
            </a>
            <a href="/search/users/asdf">
              <span>73</span><span>Users</span>
            </a>
          </div>
*/}
        </div>
        <div className="cards">
        {
          (cards.length > 0) ?
          <StackGrid
            columnWidth={300}
            gutterWidth={10}
            gutterHeight={20}
          >
            {
              cards.map((card: any, index: number) => {
                return <div key={index}>
                  <CardDla 
                    card={card}
                    />
                </div>
              })
            }
          </StackGrid>
          :
          (refreshed) && <div className="text-center">
            <div className="ms-font-su">No story found...</div>
            <img src={ noresult } style={{width: 200}} />
          </div>
        }
        </div>
      </div>
    )
  }

  public componentWillReceiveProps(nextProps) {
    const q = nextProps.match.params.q
    if (q != this.state.q) {
      this.refreshCards(q)
      this.setState({
        q: q
      })
    }
  }

  private refreshCards = (q): void => {
    if (q == '') {
      q = '*'
    }
    this.libraryApi.search('tweet_text:' + q).then(r => {
      if (r.success && r.result.success) {          
        this.setState({
          refreshed: true,
          cards: r.result.results
        })
      }
    })
  }

}
