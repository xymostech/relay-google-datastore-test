export default class extends Relay.Route {
    static queries = {
        viewer: () => Relay.QL`query { viewer }`,
    };
    static routeName = 'BookListRoute';
}
