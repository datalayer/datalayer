export const CounterValueStorageKey = 'counter_value'

export const CounterApi = {
  /*
    resetCounter: (): Promise<null> => new Promise((resolve, reject) => {
        try {
          resolve( () => localStorage.setItem(CounterValueStorageKey, "0") )
        }
        catch (e) {
          return reject(e)
        }
      })
  */
  resetCounterPromise: (): Promise<{ type: string, value: number }> => flakify(() => {
    localStorage.setItem(CounterValueStorageKey, "0")
    return { type: 'RESET_COUNTER_SUCCESS', value: 0 }
  }),
  saveCounterPromise: (counter: { value: number }): Promise<{ type:string, value: number }> => flakify(() => {
      localStorage.setItem(CounterValueStorageKey, counter.value.toString())
      return { type: 'SAVE_COUNT_SUCCESS', value: counter.value  }
    }),
  loadCounterPromise: (): Promise<{ type: string, value: number }> => flakify(() => {
      let s = localStorage.getItem(CounterValueStorageKey)
      let v = 0
      if (s != null) {
        v = parseInt(s, 10)
      }
      return { type: 'LOAD_COUNT_SUCCESS', value: v }
    })
}

const flakify = <T>(f: () => T): Promise<T> =>
  new Promise((resolve, reject) =>
    // We'll always take 200 * (1d10 + 1) ms to respond
    window.setTimeout(() => {
      try {
        // And ~20% of the time we'll fail.
        if (Math.random() < 0.2) {
          throw new Error('Failed arbitrarily')
        }
        resolve(f())
      }
      catch (e) {
        return reject(e)
      }
    }, 200 + Math.random() * 2000)
  )
