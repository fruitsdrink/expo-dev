import { Like, Post, supabase } from "./supabase";

export async function sendLikeNotification(like: Like) {
  if (!like?.id) {
    return;
  }
  const { data } = await supabase
    .from("likes")
    .select("*, posts(*, profiles(*))")
    .eq("id", like.id)
    .single();
  console.log("liked: ", JSON.stringify(data, null, 2));
  const pushToken = data?.posts?.profiles?.push_token;
  if (!pushToken) {
    return;
  }

  const message = {
    to: pushToken,
    sound: "default",
    title: "Someone liked your post",
    body: `${data?.posts?.profiles.username} liked your post!`,
    data: { postId: like.post_id }
  };

  sendPushNotification(message);
}

async function sendPushNotification(message: {
  to: string;
  sound: string;
  title: string;
  body: string;
  data: any;
}) {
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(message)
  });
}
