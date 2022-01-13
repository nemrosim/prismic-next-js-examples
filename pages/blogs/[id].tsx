import type { GetStaticPropsContext, NextPage } from 'next'
import { client } from "../api/apollo-client";
import { PrismicRichText } from '@prismicio/react'
import { QueryAllBlog_PagesArgs } from '../../src/types/generated/graphql';
import { GetBlogPageByIDQuery } from "./query";
import { BlogProps, ResultProps } from "./types";

const Blog: NextPage<BlogProps> = ({data, errors}) => {
    const edge = data?.edges?.length ? data?.edges[0] : undefined;

    if (errors) {
        return <h1>Error</h1>
    }

    if (edge?.node) {

        const {title, title_image, content} = edge.node

        return (
            <div>
                <PrismicRichText field={title}/>
                <img src={title_image.url}
                     alt={title_image.url}
                     style={{width: '100%'}}/>
                <PrismicRichText field={content}/>
            </div>
        )
    }

    return null

}

export async function getServerSideProps(context: GetStaticPropsContext) {
    const {data, errors = null} = await client.query<ResultProps, QueryAllBlog_PagesArgs>({
        query: GetBlogPageByIDQuery,
        fetchPolicy: 'network-only',
        variables: {
            uid: context.params?.id as string,
        }
    });

    return {
        props: {
            data: data?.allBlog_pages,
            errors,
        },
    }
}

export default Blog
