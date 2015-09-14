export default class extends Relay.Route {
    static queries = {
        viewer: (Component, {cursor}) => Relay.QL`
            query {
                viewer {
                    ${Component.getFragment("viewer", {cursor: cursor})}
                }
            }
        `,
    };

    static paramDefinitions = {
        cursor: { required: false },
    };

    static routeName = 'BookListRoute';
}
