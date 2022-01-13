import { Query } from "../../src/types/generated/graphql";
import { GraphQLError } from "graphql";

export interface BlogProps {
    data?: Query['allBlog_pages'];
    errors?: GraphQLError;
}

export interface ResultProps {
    allBlog_pages: Query['allBlog_pages']
}
