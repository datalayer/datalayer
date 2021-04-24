import React from "react";
import { Provider } from "react-redux";
import styled from "styled-components";
import configureStore from "../state/store";
import UserList from "./UserList";
import PostList from "./PostList";

import './styles.css';

const MainContainer = styled.main`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas: "users posts";
  grid-gap: 20px;
`;
const UserListContainer = styled.section`
  grid-area: users;
`;
const PostListContainer = styled.section`
  grid-area: posts;
`;

function UserPostList() {
  return (
    <MainContainer>
      <UserListContainer>
        <h2>Users</h2>
        <UserList />
      </UserListContainer>
      <PostListContainer>
        <h2>Posts</h2>
        <PostList />
      </PostListContainer>
    </MainContainer>
  );
}

const store = configureStore();

const UserPostListExample = () => <Provider store={store}>
  <UserPostList />
</Provider>

export default UserPostListExample;
