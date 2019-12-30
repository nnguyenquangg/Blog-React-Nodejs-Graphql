import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Button, Icon,Label } from 'semantic-ui-react';
function LikeButton({user, post: { id, likeCount, likes } }) {
    const [liked, setLike] = useState(false);
    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLike(true)
        }
        else setLike(false)
    }, [user, likes])
    const [likePost] = useMutation(LIKE_POST,{
        variables : {postId : id}
    })
    const likeButton = user ? (
        liked ? (
            <Button
                color="teal"
            >
                <Icon name="heart" />
            </Button>
        ) : (
                <Button
                    color="teal" basic
                >
                    <Icon name="heart" />
                </Button>
            )
    ) : (
            <Button
                as={Link} 
                to="/login"
                color="teal"
                basic
            >
                <Icon name="heart" />
            </Button>
        )
    return (

        <Button as='div' labelPosition='right' onClick={() => likePost()}>
            <Button color='teal'>
                <Icon name='heart' />
            </Button>
            <Label basic color='teal' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    )
}
const LIKE_POST = gql`
    mutation likePost($postId : ID!){
        likePost(postId : $postId){
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`
export default LikeButton