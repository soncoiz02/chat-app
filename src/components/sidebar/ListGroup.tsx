import React, { useEffect, useState } from "react";
import { ListGroupType } from "../../types/chat";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { saveListGroup } from "../../redux/features/sidebar/sidebarSlice";
import ListComponent from "./ListComponent";
import { getUserGroups } from "../../services/chat";

const ListGroup = () => {
  const [listGroup, setListGroup] = useState<ListGroupType[]>([]);

  const cacheListFriend = useAppSelector((state) => state.sidebar.listGroup);
  const dispatch = useAppDispatch();

  const handleGetFriends = async () => {
    try {
      const response = await getUserGroups();
      setListGroup(response);
      dispatch(saveListGroup(response));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cacheListFriend.length > 0) {
      return setListGroup(cacheListFriend);
    }
    handleGetFriends();
  }, []);
  return <ListComponent listData={listGroup} />;
};

export default ListGroup;
