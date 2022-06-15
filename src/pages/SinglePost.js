import gql from "graphql-tag"
import { useParams } from "react-router"
import { useMutation, useQuery } from "@apollo/react-hooks"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { useContext, useRef, useState } from 'react'

import classes from './SinglePost.module.css'
import PostCard from "../components/PostCard"
import Comment from "../components/Comment"
import { AuthContext } from '../context/auth'

const SinglePost = () => {
    const { postId } = useParams()
    const { user } = useContext(AuthContext)
    const [comment, setComment] = useState('')
    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: { postId }
    })
    const commentInputRef = useRef()

    const [submitComment] = useMutation(SUBMIT_COMMENT, {
        update() {
            setComment('')
            commentInputRef.current.blur()
        },
        variables: {
            postId,
            body: comment
        }
    })

    const submitHandler = (e) => {
        e.preventDefault();
        submitComment()
    }

    let postMarkup

    if (!data?.getPost?.id) {
        postMarkup = <p>Loading Post..</p>
    } else {
        const post = data.getPost

        postMarkup = <> <Container className="d-flex justify-content-center mt-5">
            <PostCard post={post} />
        </Container >
            {user && (
                <Form onSubmit={submitHandler} className="mt-2">
                    <Form.Label htmlFor="commentInput">Submit comment</Form.Label>
                    <Form.Control
                        className={classes["comment-text"]}
                        as="textarea"
                        onChange={(e) => setComment(e.target.value)}
                        id="commentInput"
                        value={comment}
                        aria-describedby="passwordHelpBlock"
                        ref={commentInputRef}
                    />
                    <Button disabled={comment.trim() === ''} className="mt-2" type="submit">Submit</Button>
                </Form>

            )}
            {!!post.comments.length && <Container className="mt-5 d-flex flex-wrap gap-3">
                {post.comments.map(comment => {
                    return <Comment key={comment.id} comment={comment} postId={postId} />
                })}
            </Container>}
        </>
    }

    return (
        <div>
            {postMarkup}
        </div>
    )
}

const FETCH_POST_QUERY = gql`
    query getPost($postId: ID!){
        getPost(postId: $postId){
            id
            body
            createdAt
            username
            likeCount
            likes{
                username
            }
            commentCount
            comments{
                id username createdAt body
            }
        }
    }
`

const SUBMIT_COMMENT = gql`
    mutation($postId: String!, $body: String!){
        createComment(postId: $postId, body: $body){
            id
            comments{
                id username body createdAt
            }
            commentCount
        }
    }
`


export default SinglePost