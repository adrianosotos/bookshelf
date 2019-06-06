import React from 'react';

const Book = ({ title, author, editionYear }) => (
	<div className="book">
		<div className="book__content">
			<h3>Title: {title}</h3>
			<p>Author: {author}</p>
			<p>Edition Year: {editionYear}</p>
		</div>
	</div>
);

export default Book;
