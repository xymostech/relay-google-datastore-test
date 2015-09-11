/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql';

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    fromGlobalId,
    globalIdField,
    mutationWithClientMutationId,
    nodeDefinitions,
} from 'graphql-relay';

import {
    // Import methods that your schema can use to interact with your database
    Viewer,
    getViewer,

    Book,
    getBooks,
    bookById,
} from './database';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
var {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
        var {type, id} = fromGlobalId(globalId);
        if (type === 'Book') {
            return bookById(id);
        } else {
            return null;
        }
    },
    (obj) => {
        if (obj instanceof Book) {
            return bookType;
        } else {
            return null;
        }
    }
);

/**
 * Define your own types here
 */

var bookType = new GraphQLObjectType({
    name: 'Book',
    description: 'A book',
    fields: () => ({
        id: globalIdField('Book'),
        author: {
            type: GraphQLString,
            description: 'The author of the book',
        },
        title: {
            type: GraphQLString,
            description: 'The title of the book',
        },
        description: {
            type: GraphQLString,
            description: 'A description of the book',
        },
        publishedDate: {
            type: GraphQLString,
            description: 'The date the book was published',
        },
    }),
    interfaces: [nodeInterface],
});

var viewerType = new GraphQLObjectType({
    name: 'Viewer',
    description: 'I have no idea why this is needed',
    fields: () => ({
        books: {
            type: new GraphQLList(bookType),
            description: 'All the books!',
            resolve: getBooks
        }
    })
});

/**
 * Define your own connection types here
 */
var {connectionType: bookConnection} =
    connectionDefinitions({name: 'Book', nodeType: bookType});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeField,
        viewer: {
            type: viewerType,
            resolve: () => getViewer(),
        },
    }),
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
var mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        // Add your own mutations here
    })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
    query: queryType,
    // Uncomment the following after adding some mutation fields:
    // mutation: mutationType
});
