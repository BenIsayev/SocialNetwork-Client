import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import classes from './PostCard.module.css'
import likedIcon from '../assets/img/liked.png'
import notLikedIcon from '../assets/img/not-liked.png'
import { AuthContext } from '../context/auth'

const LikeButton = ({ post: { likeCount, id, likes } }) => {

    const { user } = useContext(AuthContext)
    const [liked, setLiked] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) setLiked(true)
        else setLiked(false)
    }, [user, likes])

    const [likePost] = useMutation(LIKE_POST, {
        variables: { postId: id }
    })

    const navigateToLogin = () => {
        navigate('/login')
    }

    const likeButtonTitle = user ? liked ? 'Unlike post' : 'Like post' : 'Login to like post'
    const likeButtonFn = user ? likePost : navigateToLogin
    const likeButtonSrc = liked ? likedIcon : notLikedIcon

    return (
        <button className={classes["like-btn"]}
            title={likeButtonTitle}
            onClick={likeButtonFn}>
            <img style={{ width: '20px' }} src={likeButtonSrc} alt="likes icon" />
            <span>{likeCount}</span>
        </button>
    )
}

const LIKE_POST = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id likes{
                id username
            }
            likeCount
        }
    }
`

export default LikeButton