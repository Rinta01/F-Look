import gql from 'graphql-tag';

export const GET_USERS = gql`
        query getUsers{
            users{
                first_name
                last_name
            }
        }
`

export const ADD_USER = gql`
        mutation ($first_name: String!, $last_name: String!, $country: String!, $tel: String!, $password: String!){
            addUser(first_name: $first_name, last_name: $last_name, country: $country, tel: $tel, password: $password){
                first_name
                last_name
                country
                tel
            }
        }
`

export const NEW_USER = gql`
        mutation ($first_name: String!, $tel: String!, $password: String!, $sex: String!){
            newUser(first_name: $first_name, tel: $tel, password: $password, sex: $sex){
                first_name
                tel
                sex
            }
        }
`

