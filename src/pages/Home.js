import { useContext } from "react"
import { useQuery } from "@apollo/react-hooks"

import { AuthContext } from "../context/auth"
import PostCard from "../components/PostCard"
import PostForm from "../components/PostForm"
import { FETCH_POSTS_QUERY } from "../util/graphql"


const Home = () => {
    const { user } = useContext(AuthContext)
    const { loading, data } = useQuery(FETCH_POSTS_QUERY)

    return (
        <section>

            {loading ? <div>
                <h1>
                    Loading Posts...
                </h1>
            </div>
                :
                data.getPosts.length ?
                    <div className="mt-5 mb-5 d-flex flex-wrap gap-5 justify-content-center">
                        {user && <PostForm />}
                        {data.getPosts.map(post => <PostCard key={post.id} post={post} />)}
                    </div>
                    :
                    <div>
                        <h1>
                            No Posts Found
                        </h1>
                    </div>}
        </section>
    )
}


export default Home