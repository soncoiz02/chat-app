type AttachmentType = {
  type: "file" | "image" | "link";
  content: string;
};

export type DisplayMessageType = {
  newestMessage: string;
  totalUnreadMessage: number;
  time: Date;
};

export type NormalMessageType = {
  message: string;
  from: string;
  attachment: AttachmentType | null;
  chatId: string;
  createdAt: Date;
};
