import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchUserList, selectUser } from "../state/user";
import { fetchPostList } from  "./../state/post";
import { IState } from "./../state/store"

export interface ISelected {
  isSelected: boolean;
}

const UserListContainer = styled.ul`
  list-style-type: none;
`;

const UserContainer = styled.article<ISelected>`
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 1rem;
  margin-bottom: 0.5rem;
  background-color: ${props => (props.isSelected ? "#e91e634a" : "inherited")};
  &:hover {
    cursor: pointer;
    background-color: ${props => (props.isSelected ? "#e91e634a" : "#eee")};
  }
`;

function User({ user }) {
  const selectedUserId = useSelector((state: IState) => state.user.selectedUserId);
  const dispatch = useDispatch();
  const isSelected = React.useMemo(() => selectedUserId === user.id, [
    selectedUserId,
    user.id
  ]);
  const getPostList = React.useCallback(() => {
    dispatch(selectUser(user.id));
    dispatch(fetchPostList(user.id));
  }, [dispatch, user.id]);
  return (
    <UserContainer isSelected={isSelected} onClick={getPostList}>
      <h4>
        ID: {user.id} - {user.name}
      </h4>
      <p>username: {user.username}</p>
      <p>email: {user.email}</p>
    </UserContainer>
  );
}

const MemoizedUser = React.memo(User);

function UserList() {
  const users = useSelector(state => (state as any).user.users);
  const dispatch = useDispatch();
  const usersCache = React.useMemo(() => users, [users]);
  const getUserList = React.useCallback(() => dispatch(fetchUserList()), [
    dispatch
  ]);
  React.useEffect(() => {
    getUserList();
  }, [getUserList]);
  return (
    <UserListContainer>
      {usersCache &&
        usersCache.map(user => (
          <li key={user.id}>
            <MemoizedUser user={user} />
          </li>
        ))}
    </UserListContainer>
  );
}

export default UserList;
