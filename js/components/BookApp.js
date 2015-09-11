import { Link } from "react-router";

class BookApp extends React.Component {
    render() {
        return <div>
            <ul>
                {this.props.viewer.books.map((book) => {
                    return <li><Link to={`/book/${book.id}`}>{book.title}</Link></li>;
                })}
             </ul>
         </div>;
    }
}

export default Relay.createContainer(BookApp, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on Viewer {
                books {
                    id,
                    title
                }
            }
        `,
    }
});
