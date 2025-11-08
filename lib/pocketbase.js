import PocketBase from "pocketbase";

let pb;

if (typeof window === "undefined") {
  // server
  pb = new PocketBase("https://jolly-jennings-nkmfaj8pmf.liara.run");
} else {
  // client
  pb = new PocketBase("https://jolly-jennings-nkmfaj8pmf.liara.run");
  pb.authStore.loadFromCookie(document.cookie);
}

export { pb };
