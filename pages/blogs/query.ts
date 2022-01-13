import gql from "graphql-tag";

export const GetBlogPageByIDQuery = gql`
    query allBlogPages($uid:String) {
        allBlog_pages(uid: $uid) {
            edges {
                node {
                    title
                    title_image
                    content
                }
            }
        }
    }
`
