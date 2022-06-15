import Card from 'react-bootstrap/Card'
import moment from 'moment'
import { useContext } from 'react'

import DeleteButton from './DeleteButton'
import { AuthContext } from '../context/auth'

const Comment = ({ comment: { username, createdAt, id, body }, postId }) => {

    const { user } = useContext(AuthContext)

    return (
        <Card>
            <Card.Header className="d-flex justify-content-between">
                By: {username}
                {user?.username === username && <DeleteButton id={postId} commentId={id} />}
            </Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p>
                        {body}
                    </p>
                    <footer className="blockquote-footer">
                        <small>{moment(createdAt).fromNow()}</small>
                    </footer>
                </blockquote>
            </Card.Body>
        </Card>
    )
}

export default Comment