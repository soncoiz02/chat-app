import { useEffect, useState } from "react";
import { getUserFriend } from "../../services/user";
import { FriendType } from "../../types/user";
import ListComponent from "./ListComponent";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { saveListFriend } from "../../redux/features/sidebar/sidebarSlice";

const ListFriend = () => {
  const [listFriends, setListFriends] = useState<FriendType[]>([]);

  const cacheListFriend = useAppSelector((state) => state.sidebar.listFriend);
  const dispatch = useAppDispatch();

  const handleGetFriends = async () => {
    try {
      const response = await getUserFriend();
      setListFriends(response);
      dispatch(saveListFriend(response));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cacheListFriend.length > 0) {
      return setListFriends(cacheListFriend);
    }
    handleGetFriends();
  }, []);

  return <ListComponent listData={listFriends} />;
};

export default ListFriend;
