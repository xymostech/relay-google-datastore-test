import { Link } from "react-router";

class BookList extends React.Component {
    render() {
        var books = this.props.viewer.books.edges.map(({node}) => node);
        console.log(books);
        return <div>
            <ul>
            {books.map((book, i) => {
                return <li key={i}><Link to={`/book/${book.id}`}>{book.title}</Link></li>;
            })}
            </ul>
            <Link to={`/?cursor=${this.props.viewer.books.pageInfo.endCursor}`}>Next page</Link>
         </div>;
    }
}

export default Relay.createContainer(BookList, {
    initialVariables: {
        cursor: null
    },

    fragments: {
        viewer: () => Relay.QL`
        fragment on Viewer {
            books(first: 1, after: $cursor) {
                edges {
                    node {
                        ... on Book {
                            id,
                            title
                        }
                    }
                },
                pageInfo {
                    endCursor
                }
            }
        }
        `,
    }
});
0
