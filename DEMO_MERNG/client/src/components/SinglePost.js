import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import {
    Button,
    Card,
    Form,
    Grid,
    Image,
    Icon,
    Label
} from 'semantic-ui-react';

import { AuthContext } from '../untils/auth';
import LikeButton from './LikeButton';
// import DeleteButton from '../components/DeleteButton';
// import MyPopup from '../util/MyPopup';

function SinglePost(props) {
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const commentInputRef = useRef(null);

    const [comment, setComment] = useState('');

    const {
        data: { getPost }
    } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('');
            commentInputRef.current.blur();
        },
        variables: {
            postId,
            body: comment
        }
    });

    function deletePostCallback() {
        props.history.push('/');
    }

    let postMarkup;
    if (!getPost) {
        postMarkup = <p>Loading post..</p>;
    } else {
        const {
            id,
            body,
            createAt,
            username,
            comments,
            likes,
            likeCount,
            commentCount
        } = getPost;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            size="small"
                            float="right">
                        </Image>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>
                                    {username}
                                </Card.Header>
                                <Card.Meta>{createAt}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr></hr>
                            <Card.Content extra>
                                <LikeButton user={user} post ={{id,likeCount,likes}} ></LikeButton>
                                <Button></Button>
                            </Card.Content>
                            <Button
                                basic
                                as="div"
                                labelPosition="right"
                                onClick={()=>console.log('aaa')}
                            >
                                <Button basic="blue">
                                    <Icon name="comments"></Icon>
                                    <Label basic color = "blue" pointing="left">

                                        {commentCount}

                                    </Label>
                                </Button>


                            </Button>

                            
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        )
    }
    return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createAt
        body
      }
    }
  }
`;

export default SinglePost;