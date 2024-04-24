import axios from "axios";
import { Data as BoardsData } from "./user/[uid]/boards/route";
import { Data as BoardData } from "./boards/[bid]/[uid]/route";
import { Data as InviteData } from "./boards/[bid]/invite/route";
import { DefaultResponse } from "@/types/responses";

class API {
  constructor() {}

  async getBoards(owner_id?: string) {
    if (!owner_id) return null;

    const res = await axios.get<BoardsData>(`/api/user/${owner_id}/boards`);

    const { success, data, message } = res.data;

    if (!success) {
      throw new Error(message);
    }

    return data;
  }

  async createBoard({
    title,
    description,
    userId,
  }: {
    userId: string;
    title: string;
    description?: string;
  }) {
    const res = await axios.post<DefaultResponse>(`/api/boards`, {
      title,
      description,
      uid: userId,
    });
    const { success, message } = res.data;

    if (!success) {
      throw new Error(message);
    }

    return message;
  }

  async deleteBoard({ user_id, bid }: { user_id: string; bid: string }) {
    const res = await axios.delete<DefaultResponse>(`/api/boards/${bid}`, {
      data: {
        uid: user_id,
      },
    });

    const { success, message } = res.data;

    if (!success) {
      throw new Error(message);
    }

    return message;
  }

  async editBoard({
    bid,
    user_id,
    title,
    titleChanged,
    description,
  }: {
    bid: string;
    user_id: string;
    title: string;
    titleChanged: boolean;
    description: string;
  }) {
    const res = await axios.put(`/api/boards/${bid}`, {
      uid: user_id,
      title,
      titleChanged,
      description,
    });

    const { success, message } = res.data;

    if (!success) {
      throw new Error(message);
    }

    return message;
  }

  async getBoard(bid: string, uid?: string) {
    if (!bid || !uid) return null;

    const res = await axios.get<BoardData>(`/api/boards/${bid}/${uid}`);

    const { success, data, message } = res.data;

    if (!success) {
      throw new Error(message);
    }
    return data;
  }

  async createInvite(bid: string, title: string) {
    const res = await axios.post<InviteData>(`/api/boards/${bid}/invite`, {
      title,
    });

    const { success, data, message } = res.data;

    if (!success) {
      throw new Error(message);
    }

    return data;
  }
  async acceptInvite(bid: string, uid: string) {
    const res = await axios.post<BoardsData>(`/api/boards/${bid}/invite/accept`, {
      uid,
    });

    const { success, message } = res.data;

    if (!success) {
      throw new Error(message);
    }

    return { success, message };
  }
}

const api = new API();
export default api;
