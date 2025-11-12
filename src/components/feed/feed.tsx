import "./feed.styles.css";

interface Post{
    id: Number,
    comment: String
}

interface FeedProps{
    posts: Array<Post>,
}

export default function Feed({posts}: FeedProps){
    return(
        <div className="feed-container">
            <div className="feed-title">Feed</div>
        </div>
    )
}