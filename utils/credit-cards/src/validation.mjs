import { validate } from 'luhn'


export const creditCard = {
  cardRegex: [
    {
      type: 'americanExpress',
      regex: /^3[47][0-9]{2,13}/,
    },
    {
      type: 'discover',
      regex: /^6(?:011|5[0-9]{2})\d+/,
    },
    {
      type: 'masterCard',
      regex: /^5[1-5][0-9]{0,14}/,
    },
    {
      type: 'visa',
      regex: /^4(?:\d+)?/,
    },
    {
      // coommonly abbreviated as 'CUP'
      type: 'chinaUnionPay',
      regex: /^(?:(?:62)\d{14})$/,
    },
    {
      // commonly abbreviated as 'JCB'
      type: 'japanCreditBureau',
      regex: /^(?:(?:1800|35(2[8-9]|[3-8]\d))\d{12})$/,
    },
    {
      type: 'maestro',
      regex: /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/,
    },
  ],

  /// @name isValidCvv
  /// @author Alex Andreescu
  /// @description
  /// checks if cvv is valid
  /// @param {int, string} - card cvv
  /// @returns {boolean} - cvv validity
  isValidCvv (cvv = '') {
    return [ 3, 4 ].includes(cvv.toString().length)
  },

  /// @name isValidExpiration
  /// @author Alex Andreescu
  /// @description
  /// checks if expiration date is valid
  /// @param {int, string} month - expiration month
  /// @param {int, string} year - expiration year
  /// @returns {boolean} - expiration date validity
  isValidExpiration ({ month, year }) {
    // if either param is missing go ahead and fail validation
    if (!(month && year)) return false

    const current = new Date()
    // `getMonth` is zero based so add one to match human readable dates
    const currentMonth = current.getMonth() + 1
    const currentYear = current.getFullYear()

    if (parseInt(year, 10) > currentYear) return true
    if (parseInt(year, 10) === currentYear && parseInt(month, 10) >= currentMonth) return true
    return false
  },

  /// @name isValidCardNumber
  /// @author Alex Andreescu
  /// @description
  /// validates the card number based on the luhn algorithm
  /// @param {int, string} - card number to be validated
  /// @returns {boolean} - card validity
  isValidCardNumber (card) {
    return validate(card)
  },

  /// @name getCardType
  /// @author Alex Andreescu
  /// @description
  /// gets the card type based on card number
  /// @param {int, string} - card number to be evaluated
  /// @returns {string, null} - card type or null
  getCardType (number) {
    const card = creditCard.cardRegex.find(({ regex }) => regex.test(number.toString()))

    return card?.type
  },

  /// @name isValidCard
  /// @author Alex Andreescu
  /// @description
  /// checks if all aspects of card are valid
  /// @param {int, string} cvv - card cvv
  /// @param {int, string} month - expiration month
  /// @param {int, string} number - card number to be validated
  /// @param {int, string} year - expiration year
  /// @returns {boolean} - true if all card fields pass, false otherwise
  isValidCard ({
    cvv,
    month,
    number,
    year,
  }) {
    return creditCard.isValidCardNumber(number) && creditCard.isValidExpiration({ month, year }) &&
      creditCard.isValidCvv(cvv)
  },
}
