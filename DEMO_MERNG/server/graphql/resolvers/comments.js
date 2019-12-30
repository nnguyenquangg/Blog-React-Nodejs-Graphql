const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth') 
const {UserInputError,AuthenticationError} = require('apollo-server')
module.exports = {
    Mutation  :{
        createComment : async(_,{postId,body},context) =>{
            const {username} = checkAuth(context)
            if (body.trim() === ''){
                throw  new UserInputError('Empty comment',{
                    errors :{
                        body : 'Comment body must not empty'
                    }
                })
            }
            const post = await   Post.findById(postId);
            if(post) {
                // console.log(Object.keys(post));
                // console.log(post.comments);
            
                post.comments.unshift({
                    body,
                    username,
                    createAt : new Date().toISOString()
                })
                await post.save();
                return post;
            }
            else throw new UserInputError('Post not found')
        },
        async deleteComment(_,{postId,commentId},context){
            const {username} = checkAuth(context);
            const post = await Post.findById(postId);
            if (post){
                const commentIndex = await post.comments.findIndex((c) => c.id == commentId);
                console.log(commentIndex);
                if(post.comments[commentIndex].username === username){
                    post.comments.splice(commentIndex,1);
                    await post.save()
                    return post;
                }
                else{
                    throw new ('Action not Allowed');
                }
            }
            else throw new UserInputError('Post not Found');

        },
        async likePost(_,{postId},context){
            const {username} = checkAuth(context);
            const post = await Post.findById(postId);
            if (post){
                if (post.likes.find(like => like.username === username)){
                    // Unlike
                    post.likes = post.likes.filter(like => like.username !== username);
                }
                else{
                    // Like
                    post.likes.push({
                        username,
                        createAt : new Date().toISOString()
                    })
                }
                return await post.save();
                
            }
            else throw new UserInputError('Post not Found');
        }        

    }
}