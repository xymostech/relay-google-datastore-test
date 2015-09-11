import 'babel/polyfill';

class Book extends React.Component {
    render() {
        return <div>
            <h2>{this.props.book.title}</h2>
            <p>Written by {this.props.book.author}</p>
            <p>{this.props.book.description}</p>
        </div>;
    }
}

export default Relay.createContainer(Book, {
    fragments: {
        book: () => Relay.QL`
            fragment on Book {
                title,
                author,
                description
            }
        `,
    },
});
