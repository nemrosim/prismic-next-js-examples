import type { NextPage } from 'next'
import { client } from "./api/apollo-client";
import gql from "graphql-tag";
import { Home_PageConnectionConnection, Query } from "../src/types/generated/graphql";
import { GraphQLError } from "graphql";
import { PrismicRichText } from '@prismicio/react'

interface HomeProps {
    data?: Home_PageConnectionConnection;
    errors?: GraphQLError;
}

const Home: NextPage<HomeProps> = ({data, errors}) => {
    const edge = data?.edges?.length ? data?.edges[0] : undefined;

    if (errors) {
        return <h1>Error</h1>
    }

    if (edge?.node.header) {
        return (
            <div>
                <PrismicRichText field={edge.node.header}/>
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
    }
`

interface ResultProps {
    allHome_pages: Query['allHome_pages']
}

export async function getServerSideProps() {
    const {data, errors = null} = await client.query<ResultProps>({
        query: HomePageQuery
    });

    return {
        props: {
            data: data?.allHome_pages,
            errors: errors,
        },
    }
}

export default Home
