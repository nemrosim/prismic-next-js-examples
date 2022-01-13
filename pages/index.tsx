import type { NextPage } from 'next'
import { client } from "./api/apollo-client";
import gql from "graphql-tag";
import { Home_PageConnectionConnection, Query } from "../src/types/generated/graphql";
import { GraphQLError } from "graphql";
import { PrismicRichText } from '@prismicio/react'
import Link from 'next/link'

interface HomeProps {
    data?: Home_PageConnectionConnection;
    errors?: GraphQLError;
    links?: Array<string>;
}

const Home: NextPage<HomeProps> = ({data, errors, links}) => {
    const edge = data?.edges?.length ? data?.edges[0] : undefined;

    if (errors) {
        return <h1>Error</h1>
    }

    if (edge?.node.header) {
        return (
            <div>
                <PrismicRichText field={edge.node.header}/>
                <ul>
                    {links?.map(link => {
                        return (
                            <li key={link}>
                                <Link href={`blogs/${link}`}>
                                    <a href={`blogs/${link}`}>{link}</a>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    return null

}

const HomePageQuery = gql`
    query allHomePages {
        allHome_pages{
            edges{
                node{
                    header
                }
            }
        }
        allBlog_pages {
            edges {
                node {
                    _meta {
                        uid
                    }
                }
            }
        }
    }
`

interface ResultProps {
    allHome_pages: Query['allHome_pages']
    allBlog_pages: Query['allBlog_pages']
}

export async function getServerSideProps() {
    const {data, errors = null} = await client.query<ResultProps>({
        query: HomePageQuery,
        fetchPolicy: 'network-only',
    });

    const links = data?.allBlog_pages.edges?.map(e => {
            return e?.node._meta.uid;
        });

    return {
        props: {
            data: data?.allHome_pages,
            errors: errors,
            links,
        },
    }
}

export default Home
