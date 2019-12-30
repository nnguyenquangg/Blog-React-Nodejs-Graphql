import React, { useContext } from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from '../untils/auth'
import LikeButton from './LikeButton'

function PostCard({ post: { body, createAt, id, username, likeCount, commentCount, likes } }) {
    const { user } = useContext(AuthContext)

    function likePost() {
        console.log('like');
    }

    return (
        <Card>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createAt).fromNow(true)}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{id,likes,likeCount}}/>
         
                <Button as='div' labelPosition='right' as={Link} to={`/posts/${id}`}>
                    <Button color='blue'>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username && (
                    <Button
                        as="div"
                        color="red"
                        floated="right"
                        onClick={() => console.log('Delete post')}>
                        <Icon name="trash" style = {{margin :0}}></Icon>
                    </Button>
                )}
            </Card.Content>
        </Card>
    )
}
export default PostCard