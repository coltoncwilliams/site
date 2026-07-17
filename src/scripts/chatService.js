const API_URL = "https://my-chat-worker.cole242000.workers.dev/";

export async function sendChatMessage(chats) {
  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        chats,
      }),
    });

    if (resp.ok) {
      const result = await resp.json();
      return { success: true, response: result };
    }

    const errorMsg = await resp.text();
    return { success: false, errorMsg };
  } catch (error) {
    console.log(error);
    return { success: false, errorMsg: error.message };
  }
}
