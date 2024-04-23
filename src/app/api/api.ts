import axios from "axios";

class API {
  constructor() {}

  async getBoards(owner_id?: string) {
    if (!owner_id) return null;

    const res = await axios.get(`/api/user/${owner_id}/boards`);
    return res.data;
  }

  async getUser(uid?: string | null) {
    if (!uid) return null;

    const res = await axios.get(`/api/user/${uid}`);
    return res.data;
  }
}

const api = new API();
export default api;
