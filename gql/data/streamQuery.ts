import config from "../../../backend";

export default async (
  query: string,
  wsCallback: (value: any) => void
  // options?: opts
) => {
  // const opt = {
  //   ...{ useSession: true, debug: false },
  //   ...options
  // };
  let headers: any = {
    "Content-Type": "application/json"
  };

  const ws = new WebSocket(config.wsurl);
  ws.onopen = async () => {
    ws.send(
      JSON.stringify({
        type: "connection_init",
        payload: {
          headers
        }
      })
    );
    ws.send(
      JSON.stringify({
        id: "1",
        type: "start",
        payload: {
          variables: {},
          extensions: {},
          operationName: null,
          query
        }
      })
    );
  };

  ws.onmessage = (e: any) => {
    try {
      const data = JSON.parse(e.data);
      if (data.type === "data" || data.type === "error") {
        wsCallback(data);
        if (data.type === "error") {
          console.log(query, data);
        }
      }
    } catch (err) {}
  };

  ws.onerror = (e: any) => {
    // an error occurred
    console.log(e);
  };

  ws.onclose = (e: any) => {
    // connection closed
    console.log(e);
  };
  return ws;
};
