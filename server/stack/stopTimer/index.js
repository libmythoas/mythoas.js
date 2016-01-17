import {keys} from "ramda"

import flows from "../../flows"

export default (state) => {

  const NANOSECOND = 1e+9
  const MILLISECOND = 1e-6
  const calculate = (second, nanosecond) => {

    return (second * NANOSECOND + nanosecond) * MILLISECOND

  }
  const mapping = keys(flows)
  const position = state.environment.stack.history.length
  const start = state.environment.stack.startTime
  const elapsed = calculate(...process.hrtime(start))

  return {
    request: state.request,
    response: state.response,
    environment: {
      ...state.environment,
      stack: {
        ...state.environment.stack,
        timespans: [
          ...state.environment.stack.timespans,
          [mapping[position], elapsed]
        ]
      }
    }
  }

}