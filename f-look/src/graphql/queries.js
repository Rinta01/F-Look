import gql from 'graphql-tag';

export const GET_USERS = gql`
        query getUsers{
            users{
                first_name
                last_name
            }
        }
`