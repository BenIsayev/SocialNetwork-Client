import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Toast from 'react-bootstrap/Toast'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import classes from './PostCard.module.css'
import { useForm } from '../util/hooks'
import { FETCH_POSTS_QUERY } from '../util/graphql'


const PostForm = () => {

    const { onSubmit, onChange, values } = useForm(createPostCallback, {
        body: ''
    })

    const [createPost, { error }] = useMutation(CREATE_POST, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            const postsCopy = data.getPosts.map(post => post)
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: { getPosts: [result.data.createPost, ...postsCopy] }
            });
            values.body = ''
        }
    })

    function createPostCallback() {
        createPost()
    }




    return (
        <Toast className={classes["post-container"]}>
            <Toast.Header className={classes.header}>
                <strong className='me-auto'>
                    Submit new Post
                </strong>
            </Toast.Header>
            <Toast.Body>
                <Form className="mt-1 d-flex flex-column" onSubmit={onSubmit}>
                    <Form.Control
                        type="text"
                        id="newPost"
                        name="body"
                        value={values.body}
                        aria-describedby="passwordHelpBlock"
                        placeholder="What's on your mind.."
                        onChange={onChange}
                        isInvalid={error}
                    />
                    {error && <div>
                        {error.graphQLErrors[0].message}
                    </div>}
                    <Button type="submit" className='mt-3'>Send</Button>
                </Form>
            </Toast.Body>
        </Toast>
    )
}

const CREATE_POST = gql`
    mutation createPost($body:String!){
        createPost(body: $body){
            id body createdAt username
            likes{
                id username createdAt
            }
            likeCount
            comments{
            id body username createdAt
            }
            commentCount
        }
    }
`

export default PostForm