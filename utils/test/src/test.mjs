import { is } from '@ma-shop/is'


const RealDate = Date

Date.mock = (mockedDate) => {
  global.Date = class extends RealDate {
    constructor (...args) {
      if (!is.empty(args)) {
        return new RealDate(...args)
      }

      return new RealDate(mockedDate)
    }

    static now () {
      return new RealDate(mockedDate).getTime()
    }
  }
}

Date.mockReset = () => {
  global.Date = RealDate
}
