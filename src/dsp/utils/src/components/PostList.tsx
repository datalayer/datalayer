import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IState } from "./../state/store"

const PostListContainer = styled.ul`
  list-style-type: none;
`;

const PostContainer = styled.article`
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 1rem;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: #eee;
  }
`;

function Post({ post }) {
  const selectedUserId = useSelector((state: IState) => state.post.selectedUserId);
  return (
    <PostContainer>
      <h4>
        UserID: {selectedUserId} title: {post.title}
      </h4>
      <p>{post.body}</p>
    </PostContainer>
  );
}

function PostList() {
  const posts = useSelector((state: IState) => state.post.posts);
  const isLoading = useSelector((state: IState) => state.post.isLoading);

  return (
    <PostListContainer>
      {isLoading && "Loading Posts...."}
      {!isLoading &&
        posts &&
        posts.map(post => (
          <li key={post.id}>
            <Post post={post} />
          </li>
        ))}
    </PostListContainer>
  );
}

export default PostList;
