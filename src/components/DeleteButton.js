import { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import classes from './PostCard.module.css'
import { FETCH_POSTS_QUERY } from '../util/graphql'

const DeleteButton = ({ id, callback, commentId }) => {


    const [showModal, setShowModal] = useState(false)
    const mutation = commentId ? DELETE_COMMENT : DELETE_POST

    const [deletePostOrComment] = useMutation(mutation, {
        update(proxy, result) {
            setShowModal(false)
            if (!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                const updatedPosts = data.getPosts.filter(post => post.id !== id)
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: { getPosts: [...updatedPosts] }
                })
            } else {

            }
            if (callback) callback()
        },
        variables: { postId: id, commentId }
    })

    const verifyDelete = () => {
        setShowModal(!showModal)
    }
    const handleClose = () => {
        setShowModal(false)
    }

    return (
        <>
            <button type="button" title={commentId ? 'Delete comment' : 'Delete post'} className={`btn-close ${classes.a}`} aria-label="Close" data-dismiss="toast" onClick={verifyDelete}></button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete this {commentId ? 'comment' : 'post'}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You won't be able to undo this action
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={deletePostOrComment}>
                        Yes,I am sure!
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const DELETE_POST = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
            id
            comments{
                id username createdAt body
            }
            commentCount
        }
    }
`

export default DeleteButton