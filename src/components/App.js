import React, { useReducer } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Header from './Header';
import BookListSorter from './OrderSelectors';
import 'normalize.css/normalize.css';
import '../styles/style.scss';

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql'
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<div>
				<Header />
				<BookListSorter />
			</div>
		</ApolloProvider>
	);
};

export default App;
