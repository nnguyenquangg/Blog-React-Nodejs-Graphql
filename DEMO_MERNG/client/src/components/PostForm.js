import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useForm } from '../untils/hooks'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { FETCH_POSTS_QUERY } from '../Queries/queries'
// impor/t { from } from 'zen-observable'
function PostForm() {
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    })
    const [createPost, { error }] = useMutation(CREATE_POST, {
        variables: values,
        update(proxy, result) {
            console.log(result);
            const data = proxy.readQuery({

                query: FETCH_POSTS_QUERY
            })
            data.getPosts = [result.data.createPost, ...data.getPosts]
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data })
            values.body = ''
        }
    })
    function createPostCallback() {
        createPost();
    }
    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create a Post :</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Hi World!"
                        name="body"
                        onChange={(e) => onChange(e)}
                        value={values.body}
                        error = {error ? true : false}
                    />
                    <Button type=
                        "submit" color="teal">Submit</Button>
                </Form.Field>

            </Form>
            {error && (
                <div className = "ui error message" style={{marginBottom : 20}}>
                    <ul className="list">
                        <li>
                            {error.graphQLErrors[0].message}
                        </li>

                    </ul>

                </div>

            )}
        </>
    )

}
const CREATE_POST = gql`
    mutation createPost($body : String!){
        createPost(body : $body){
            id 
            body
            createAt
            username
            likeCount
            likes{
                username
            }
            commentCount
            comments{
                id
                username
                createAt
                body
            }
        }
    }
`
export default PostForm