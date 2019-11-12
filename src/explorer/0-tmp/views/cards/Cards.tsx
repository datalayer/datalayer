import * as React from 'react'
import { connect } from 'react-redux'
import * as isEqual from 'lodash.isequal'
import StackGrid from "react-stack-grid"
import { mapStateToPropsAuth, mapDispatchToPropsAuth } from '../../actions/AuthActions'
import { DatalayerStore } from '../../store/DatalayerStore'
import { IConfig } from '../../api/config/ConfigApi'
import LibraryApi from '../../api/library/LibraryApi'
import CardDla from '../../widget/CardDla'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from '../../actions/ConfigActions'
import './../../styles/Styles.scss'

@connect(mapStateToPropsAuth, mapDispatchToPropsAuth)
@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
export default class Cards extends React.Component<any, any> {
  private config: IConfig = DatalayerStore.state().config
  private readonly libraryApi: LibraryApi

  state = {
    cards: []
  }

  public constructor(props) {
    super(props)
    this.libraryApi = window["LibraryApi"]
    this.refreshCards()
  }

  public render() {
    const { cards } = this.state
    return (
        <div className="cards">
        {
          (cards.length > 0) &&
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
        }
        </div>
    )
  }

  public componentWillReceiveProps(nextProps) {
    const { config } = nextProps
    if (config && ! isEqual(config, this.config)) {
      this.config = config
      this.refreshCards()
    }
  }

  private refreshCards() {
    this.libraryApi.search('tweet_capture_width:[1 TO 1000]').then(r => {
      if (r.success && r.result.success) {          
        console.log('Cards', r.result.results)
        this.setState({
          cards: r.result.results
        })
      }
    })
  }

}
