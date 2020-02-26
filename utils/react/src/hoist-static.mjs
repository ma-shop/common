import hoistStatic from 'hoist-non-react-statics'

/// @name hoistStatic
/// @description this takes care of copying over none react static methods
/// @example
/// export class Layout extends Component {
///   static navigationOptions = {
///     headerTitle: 'look ma'
///   }
/// }
/// ...
/// export default class Home extends Component {
/// }
///
/// hoistStatic(Home, Layout)
export { hoistStatic }
