const { GraphQLObjectType, GraphQLList, GraphQLSchema, GraphQLString, GraphQLInt } = require('graphql');
const axios = require('axios');

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLInt },
		title: { type: GraphQLString },
		author: { type: GraphQLString },
		editionYear: { type: GraphQLInt }
	})
});

//Root Query

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return axios.get('http://localhost:4000/books').then((res) => res.data);
			}
		},
		book: {
			type: BookType,
			args: {
				id: { type: GraphQLInt }
			},
			resolve(parent, args) {
				return axios.get(`http://localhost:4000/books/${args.id}`).then((res) => res.data);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
