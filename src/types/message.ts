type AttachmentType = {
  type: "file" | "image" | "link";
  content: string;
};

export type DisplayMessageType = {
  newestMessage: string;
  totalUnreadMessage: number;
  time: Date;
};

interface BaseMessageType {
  _id?: string;
  message: string;
  from: string;
  attachment: AttachmentType | null;
  createdAt: Date;
}

export interface NormalMessageType extends BaseMessageType {
  chatId: string;
}

export type ResponseFriendMessageType = {
  message: NormalMessageType[];
  total: number;
};

// Group message

export interface GroupMessageType extends BaseMessageType {
  groupId: string;
}

export type ResponseGroupMessageType = {
  message: GroupMessageType[];
  total: number;
};
