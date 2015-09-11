export default class extends Relay.Route {
    static queries = {
        book: () => Relay.QL`
            query {
                book: node(id: $bookID)
            }
        `,
    };

    static paramDefinitions = {
        bookID: { required: true },
    };

    static routeName = "BookRoute";
}
