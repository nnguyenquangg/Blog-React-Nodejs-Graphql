import React, { useContext } from "react"
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid, Transition } from "semantic-ui-react";
import { AuthContext } from '../untils/auth'
import PostCard from "./PostCard"
import PostForm from "./PostForm"
import {FETCH_POSTS_QUERY} from '../Queries/queries'
function Home() {
    const { user } = useContext(AuthContext)

    const { loading
        , data
        , error
    } = useQuery(FETCH_POSTS_QUERY);
    if (data) {

        console.log(data.getPosts)
    }
    return (
        <div>
            <Grid columns={3} divided>
                <Grid.Row className="page-title">
                    <h1>Recent Post</h1>
                </Grid.Row>

                <Grid.Row>
                    {user && (
                        <Grid.Column>
                            <PostForm/>
                        </Grid.Column>

                    )}

                    {loading ? (
                        <h1>Loading posts...</h1>
                    ) : (
                            <Transition.Group>
                                {data.getPosts.map(post => (
                                <Grid.Column key={post.id}>
                                    <PostCard post={post}></PostCard>
                                </Grid.Column>
                            ))}
                            </Transition.Group>
                        )}
                </Grid.Row>
            </Grid>
        </div>
    )
}


export default Home