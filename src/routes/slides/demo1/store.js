import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import { writable } from "svelte/store";

const tWStore = writable({
  json: {
    test: "test",
  },
});
const tRStore = writable({
  json: {
    test: "test",
  },
});

const ydoc = new Y.Doc();
const tMap = ydoc.getMap("template");

export const webrtcProvider = new WebrtcProvider(
  "syncedstore-werner-svelte-society-collaboration",
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
