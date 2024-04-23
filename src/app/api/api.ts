import axios from "axios";

class API {
  constructor() {}

  async getBoards(owner_id?: string) {
    if (!owner_id) return null;

    const res = await axios.get(`/api/user/${owner_id}/boards`);
    return res.data;
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
    const res = await axios.post(`/api/boards`, {
      title,
      description,
      uid: userId,
    });
    return res.data;
  }

  async deleteBoard({ user_id, bid }: { user_id: string; bid: string }) {
    const res = await axios.delete(`/api/boards/${bid}`, {
      data: {
        uid: user_id,
      },
    });
    return res.data;
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
    return res.data;
  }
}

const api = new API();
export default api;
