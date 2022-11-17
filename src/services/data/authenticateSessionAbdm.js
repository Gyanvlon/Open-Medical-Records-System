import { postAPIabdmSession } from "../index";

export async function generateSessionForAbdm() {
  const body = {
    clientId: "SBX_001530",
    clientSecret: "448c8543-9028-44a9-a8e7-2b67f6196e39",
  };
  try {
    const data = await postAPIabdmSession("/sessions", body);
    return data;
  } catch (error) {
    return error;
  }
}
