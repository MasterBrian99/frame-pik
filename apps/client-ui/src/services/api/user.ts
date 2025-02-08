import axios from "@/utils/axios";

export async function getUserProfile() {
  const res = await axios.get("user/profile-image", {
    responseType: "blob",
  });
  return res.data;
}

export async function updateUserProfile(data: FormData) {
  const res = await axios.post("user/profile-image", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
