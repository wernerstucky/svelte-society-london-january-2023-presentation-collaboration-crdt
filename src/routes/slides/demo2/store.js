import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import { writable } from "svelte/store";

let initJSON = {
  json: {
    test: "test",
    article: {
      title: "CRDTs are cool",
      content: "Use Yjs to build collaborative apps",
      comments: [{ by: "Alice", content: "I don't agree" }],
    },
  },
};
const tWStore = writable(initJSON);
const tRStore = writable(initJSON);

const ydoc = new Y.Doc();
const tMap = ydoc.getMap("template");

export const webrtcProvider = new WebrtcProvider(
  "syncedstore-werner-svelte-society-collaboration-blog-example",
  ydoc
);

export const disconnect = () => webrtcProvider.disconnect();
export const connect = () => webrtcProvider.connect();

tMap.observe((evt) => {
  //console.log("----OBSERVED change in MAP", evt);
  if (evt.transaction.origin) {
    let currentTMap = tMap.toJSON();
    //console.log("current tMap", currentTMap);
    if (currentTMap.t) {
      setReadStore(currentTMap.t);
    }
  } else {
    //console.log("Ignoring change from self");
  }
});

tWStore.subscribe((template) => {
  if (template !== undefined) {
    //console.log("-----> WRITING to MAP", template);
    tMap.set("t", template);
  }
});

ydoc.on("update", (update, origin, doc) => {
  //console.log("_____got update", update.length); //, doc);
});

function set(obj) {
  tWStore.set(obj);
}

function update(func) {
  tWStore.update(func);
}

function setReadStore(content) {
  tRStore.set(content);
}

export const svelteStore = {
  subscribe: tRStore.subscribe,
  set,
  update,
};
