import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Book from './Book';
import orderBooksBy from '../selectors/orderBy';

const BOOKS_QUERY = gql`
	query BooksQuery {
		books {
			title
			author
			editionYear
		}
	}
`;

const Books = ({ order }) => {
	return (
		<div className="book-list">
			<div className="book-list__content">
				<h2 className="book-list__title">Books</h2>
				<Query query={BOOKS_QUERY}>
					{({ data, loading, error }) => {
						if (loading) return <h4>Loading...</h4>;
						if (error) return <p>Error</p>;

						const isUndefined = order.some((obj) => Object.values(obj).some((v) => v === undefined));

						if (isUndefined) {
							return data.books.map((book, index) => <Book key={index} {...book} />);
						} else {
							return orderBooksBy(data.books, order).map((book, index) => <Book key={index} {...book} />);
						}
					}}
				</Query>
			</div>
		</div>
	);
};

export default Books;
