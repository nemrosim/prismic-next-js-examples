// @ts-ignore
import { PrismicLink } from "apollo-link-prismic";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";

export const client = new ApolloClient({
    link: PrismicLink({
        uri: "https://medium-examples.prismic.io/graphql",
        accessToken: process.env.PRISMIC_API_KEY,
    }),
    cache: new InMemoryCache()
});
