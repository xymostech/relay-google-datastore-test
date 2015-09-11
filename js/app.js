import Book from "./components/Book";
import BookRoute from "./routes/BookRoute";
import BookList from "./components/BookList";
import BookListRoute from "./routes/BookListRoute";

import { Router, Route, Link } from 'react-router';

class BookThing extends React.Component {
    render() {
        return (
            <Relay.RootContainer
                Component={Book}
                route={new BookRoute({bookID: this.props.params.bookID})}
            />
        );
    }
}

class BookListThing extends React.Component {
    render() {
        return (
            <Relay.RootContainer
                Component={BookList}
                route={new BookListRoute()}
            />
        );
    }
}

class AddBook extends React.Component {
    render() {
        return <div>Wheee!</div>;
    }
}

class App extends React.Component {
    render() {
        return <div>
            <h1>My book app!</h1>
            <Link to="/">Home</Link>
            {this.props.children}
        </div>;
    }
}

ReactDOM.render((
    <Router>
        <Route component={App}>
            <Route path="/book/:bookID" component={BookThing} />
            <Route path="/add-book" component={AddBook} />
            <Route path="/" component={BookListThing} />
        </Route>
    </Router>
), document.getElementById('root'));
