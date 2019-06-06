import React from 'react';
import Books from './Books';

const TYPES = [
	{ slug: 'title', description: 'Title' },
	{ slug: 'author', description: 'Author' },
	{ slug: 'editionYear', description: 'Edition Year' }
];

class BookListSorter extends React.Component {
	state = {
		sortBy: [ { author: 'asc' } ]
	};

	getSortByKeyForIndex = (index) => Object.keys(this.state.sortBy[index] || {})[0];
	getSortByValueForIndex = (index) => Object.values(this.state.sortBy[index] || {})[0];

	changeSort = (key, index) => (e) => {
		const { target } = e;
		this.setState(({ sortBy }) => {
			const type = key === 'type' ? target.value : this.getSortByKeyForIndex(index);
			const direction = key === 'direction' ? target.value : this.getSortByValueForIndex(index);
			console.log(sortBy);
			return type || direction ? sortBy.splice(index, 1, { [type]: direction }) : sortBy.splice(index, 1);
		});
	};

	filterTypes = (index) => ({ slug }) => {
		const sortByKeys = this.state.sortBy
			.slice(0, index)
			.reduce((keys, sortObj) => keys.concat(Object.keys(sortObj)[0]), []);
		return !sortByKeys.includes(slug);
	};

	render() {
		const { sortBy } = this.state;

		const lastIndex = sortBy.length - 1;
		const shouldAddNewRow = this.getSortByKeyForIndex(lastIndex) && this.getSortByValueForIndex(lastIndex);
		const rowCount = shouldAddNewRow ? sortBy.length + 1 : sortBy.length;

		return (
			<div>
				<div className="order-selectors">
					<div className="order-selectors__content">
						<h2 className="order-selectors__title">Choose sort order</h2>
						{Array.from(Array(Math.min(rowCount, TYPES.length))).map((dummy, index) => (
							<div>
								<select
									className="select"
									defaultValue={this.getSortByKeyForIndex(index)}
									onChange={this.changeSort('type', index)}
								>
									<option value="">None</option>
									{TYPES.filter(this.filterTypes(index)).map(({ slug, description }) => (
										<option value={slug}>{description}</option>
									))}
								</select>
								<select
									className="select"
									defaultValue={this.getSortByValueForIndex(index)}
									onChange={this.changeSort('direction', index)}
								>
									<option value="asc">None</option>
									<option value="asc">Ascending</option>
									<option value="desc">Descending</option>
								</select>
								<br />
							</div>
						))}
						<br />
					</div>
				</div>
				<Books order={sortBy} />
			</div>
		);
	}
}

export default BookListSorter;
