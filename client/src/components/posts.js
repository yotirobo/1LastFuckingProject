import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/comments.css"

export const Posts = () => {
    const currentUser = JSON.parse(localStorage.getItem('userOnline'));
    const [posts, setPosts] = useState([])
    const [postsArray, setPostsArray] = useState([]);
    const [active, setActive] = useState("");
    const [display, setDisplay] = useState(false);
    const [comments, setComments] = useState([]);

    const getAllPostsOfCurrentUserById = async () => {
        let data = await fetch(`http://localhost:5000/posts?userId=${currentUser.user_id}`);
        let posts = await data.json();
        setPosts(posts);
    }

    const getCommentsOfSpecifiPost = (id) => {
        return new Promise((resolve, reject) => {
            let tempArray = [];
            fetch(`http://localhost:5000/posts/comments?userId=${currentUser.user_id}`)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    tempArray = res;
                    resolve(tempArray);
                });
        });
    }

    const makeArrayOfDivs = (user) => {
        let tempArr = [];
        for (let key in user) {
            tempArr.push(<a onClick={() => handleDivClick(Number(key) + 1)}><h3 key={key}>Post {Number(key) + 1}: </h3><h4>{user[key].title}</h4><p>{user[key].body}</p></a>)
        }
        setPostsArray(tempArr)
    }

    const handleDivClick = (id) => {
        setActive(id)
    }

    const handleCommentsClick = async (id) => {
        if (!display) {
            let tempComments = await getCommentsOfSpecifiPost(id);
            setComments(tempComments);
        }
        setDisplay((prev) => !prev)
    }

    useEffect(() => {
        getAllPostsOfCurrentUserById();
    }, [])

    useEffect(() => {
        makeArrayOfDivs(posts);
    }, [posts])

    return (
        <>
            <Link to="/todo">todo</Link>
            <Link to="/about">about</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/">LogOut</Link>
            {postsArray.map((post, index) => {
                return (
                    <>
                        <div style={active === (index + 1) ? { border: "1px solid black" } : { border: "" }} className="post" key={index}>
                            {post}
                            {active === (index + 1) ? <button key={index} onClick={() => handleCommentsClick(posts[index].id)}>comments</button> : null}
                            {active === (index + 1) && display && comments?.map((comment, index) => {
                                return (
                                    <div key={Math.random()} className='commentContainer'>
                                        <h4>Comment {index + 1}: </h4>
                                        <div className="comment">
                                            <h5>Name: </h5><p>{comment.title}</p>
                                            <h5>Comment: </h5><p>{comment.body}</p>
                                        </div>
                                    </div>

                                )
                            })}
                        </div>
                    </>
                )
            })}
        </>)
}