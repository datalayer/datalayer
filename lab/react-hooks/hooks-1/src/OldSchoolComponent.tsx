import * as React from 'react'

interface Props {}
interface State {
  apiResponse: { title: string } | null
}

class OldSchoolComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      apiResponse: null
    }
  }

  public componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos/3").then((response: Response): void => {
      if (response.status === 200) {
        response.json().then((data: { title: string }) => {
          this.setState({
            apiResponse: data
          })
        })
      }
    }).catch((err: Error) => {
      // handle error
    });
  }

  public render() {
    return (
      <div>
        {
          this.state.apiResponse != null
            ? <span>{this.state.apiResponse.title}</span>
            : <span>Loading...</span>
        }
      </div>
    )
  }
}

export default OldSchoolComponent