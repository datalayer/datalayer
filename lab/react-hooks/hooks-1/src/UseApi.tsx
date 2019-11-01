import * as React from "react"

interface ApiHookState<T> {
  state: T
  loading: boolean
}

export function useApi(endpoint: string): ApiHookState<string> {
  const [state, setState] = React.useState<string>("")
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect((): void => {
    fetch(endpoint).then((response: Response): void => {
      if (response.status === 200) {
        response.json().then((data: { title: string }) => {
          setState(data.title)
          setLoading(false)
        })
      }
      setLoading(false)
    }).catch((err: Error) => {
      setLoading(false)
    })
  }, [endpoint])

  return {
    state,
    loading
  }

}
