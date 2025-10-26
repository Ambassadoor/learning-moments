export const getAllPosts = () => {
    return fetch("http://localhost:8088/posts?_expand=user&_expand=topic&_expand=user&_embed=likedPosts").then(res => res.json())
}

export const toggleLike = (post, user) => {
    const like = post.likedPosts.find(like => like.userId === user.id)
    if (like !== undefined) {
        fetch(`http://localhost:8088/likedPosts/${like.id}`, {
            method : "DELETE"
        }).then(res => res.json())
        return like
    } else {
        return fetch(`http://localhost:8088/likedPosts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body : JSON.stringify({
                postId : post.id,
                userId : user.id
        })
    }).then(res => res.json())}
}

export const getAllTopics = () => {
    return fetch("http://localhost:8088/topics").then(res => res.json())
}

export const getPostById = (id) => {
    return fetch(`http://localhost:8088/posts/${id}?_expand=user&_expand=topic&_embed=likedPosts`).then(res => res.json())
}