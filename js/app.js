import Book from "./components/Book";
import BookRoute from "./routes/BookRoute";
import BookApp from './components/BookApp';
import AppHomeRoute from './routes/AppHomeRoute';

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

class BookList extends React.Component {
    render() {
        return (
            <Relay.RootContainer
                Component={BookApp}
                route={new AppHomeRoute()}
            />
        );
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
    <Route path="/" component={BookList} />
        </Route>
    </Router>
), document.getElementById('root'));
