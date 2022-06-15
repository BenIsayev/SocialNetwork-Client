import { useContext } from 'react'
import Toast from 'react-bootstrap/Toast'
import moment from 'moment'
import { NavLink, useNavigate } from 'react-router-dom'

import classes from './PostCard.module.css'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import commentsIcon from '../assets/img/comments.png'


const PostCard = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) => {

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    const deleteNavigate = () => {
        navigate('/')
    }

    const commentBtnTitle = user ? 'Comment on post' : 'Login to comment on post'

    return (
        <Toast show={true} className={classes["post-container"]}>
            <Toast.Header className={classes.header}>
                <img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1815847b7fd%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1815847b7fd%22%3E%3Crect%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2210%22%20y%3D%2210%22%3E%20%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" className="rounded me-2" alt="" />
                <strong className="me-auto">
                    {username}
                </strong>
                <small>
                    <NavLink to={`/posts/${id}`}>
                        {moment(createdAt).fromNow(true)}
                    </NavLink>
                </small>
                {user?.username === username && <DeleteButton id={id} callback={deleteNavigate} />}
            </Toast.Header>
            <Toast.Body>{body}</Toast.Body>
            <Toast.Body>
                <small className='d-flex gap-2'>
                    <NavLink to={`/posts/${id}`} className={classes["comment-btn"]} title={commentBtnTitle}>
                        <img src={commentsIcon} style={{ width: '20px' }} alt="comments icon" /> <span>{commentCount}</span>
                    </NavLink>
                    <LikeButton post={{ id, likes, likeCount }} />
                </small>
            </Toast.Body>
        </Toast>
    )
}

export default PostCard