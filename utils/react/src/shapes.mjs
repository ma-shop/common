import PropTypes from 'prop-types'


const shapes = {}

const addressShape = PropTypes.shape({
  address1: PropTypes.string,
  address2: PropTypes.string,
  address3: PropTypes.string,
  address4: PropTypes.string,
  address5: PropTypes.string,
  address6: PropTypes.string,
  address7: PropTypes.string,
  area: PropTypes.string,
  city: PropTypes.string,
  company: PropTypes.string,
  country: PropTypes.string,
  defaultBilling: PropTypes.bool,
  defaultShipping: PropTypes.bool,
  district: PropTypes.string,
  firstName: PropTypes.string,
  id: PropTypes.string,
  isPoBox: PropTypes.bool,
  lastName: PropTypes.string,
  phone: PropTypes.string,
  state: PropTypes.string,
  zip: PropTypes.string,
  zone: PropTypes.number,
})

shapes.recursive = (obj) => PropTypes.oneOfType([ obj, PropTypes.arrayOf(obj) ])

shapes.address = addressShape
shapes.autoShip = PropTypes.shape({
  billingAddress: addressShape,
  bvEarned: PropTypes.number,
  creditCardExpDate: PropTypes.string,
  creditCardId: PropTypes.string,
  creditCardMask: PropTypes.string,
  frequency: PropTypes.number,
  ibvEarned: PropTypes.string,
  id: PropTypes.string,
  isActive: PropTypes.bool,
  miscTax: PropTypes.string,
  name: PropTypes.string,
  nextOrderDate: PropTypes.string,
  orderTotal: PropTypes.string,
  paymentMethodId: PropTypes.string,
  pointsEarned: PropTypes.string,
  salesTax: PropTypes.string,
  shippingAddress: addressShape,
  shippingTotal: PropTypes.string,
  stores: PropTypes.arrayOf(PropTypes.object),
  subTotal: PropTypes.string,
  totalTax: PropTypes.string,
})
shapes.client = PropTypes.object
shapes.date = PropTypes.oneOfType([ PropTypes.instanceOf(Date), PropTypes.string ])
shapes.elements = shapes.recursive(PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.arrayOf(PropTypes.element),
]))
shapes.filter = PropTypes.shape({
  count: PropTypes.number,
  name: PropTypes.string,
})
shapes.if = PropTypes.any
shapes.paymentMethod = PropTypes.shape({
  accountName: PropTypes.string,
  expMonth: PropTypes.number,
  expYear: PropTypes.number,
  id: PropTypes.string,
  isExpired: PropTypes.bool,
  number: PropTypes.string,
  preferred: PropTypes.bool,
  type: PropTypes.string,
})
shapes.text = PropTypes.node
shapes.user = PropTypes.shape({
  customerId: PropTypes.string,
  distributorId: PropTypes.string,
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  moglId: PropTypes.string,
  pcId: PropTypes.string,
  portalId: PropTypes.string,
  ppcId: PropTypes.string,
  uuId: PropTypes.string,
})
shapes.value = PropTypes.any

shapes.validate = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func,
  PropTypes.object,
  PropTypes.bool,
])
shapes.error = PropTypes.object


const baseValidationMessage = [ PropTypes.string, PropTypes.func ]
shapes.validationMessage = PropTypes.oneOfType([
  ...baseValidationMessage,
  PropTypes.shape({
    success: PropTypes.oneOfType(baseValidationMessage),
    error: PropTypes.oneOfType(baseValidationMessage),
  }),
])

export { shapes }
