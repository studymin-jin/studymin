class APIRequest {
  constructor(method, path, body = null,accesstoken=null) {
    this.method = method;
    this.url = HOST + path;
    this.body = body;
    this.accesstoken = accesstoken;
  }
}

const HOST = "https://9exn85jyp0.execute-api.ap-northeast-2.amazonaws.com/prod";

const APIProcessor = async (request) => {
  try {
    const response = await fetch(request.url, {
      method: request.method, // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Cog-Token": request.accesstoken,
      },
      body: request.body ? JSON.stringify(request.body) : null, // body data type must match "Content-Type" header
    });

    switch (response.status) {
      case 200:
        return await response.json();
      case 204:
        return null;
      default:
        console.error(await response.json());
    }
  } catch (e) {
    console.error(e);
  }
  return "Error";
};

export default class APIHandler {
  constructor() {}

  async postIntro(Obj,accesstoken) {
    const request = new APIRequest("POST", "/intro/", {
      desc: Obj.desc,
      modidt: Obj.modidt,
    },accesstoken);
    const response = await APIProcessor(request);
    if (response !== "Error") {
      console.log(response);
      return response.id;
    } else {
      return null;
    }
  }

  // TODO: 전체 카드 객체 리스트 반환. 없으면 NULL
  async getIntro() {
    const request = new APIRequest("GET", "/intro");
    const processor = await APIProcessor(request);
    console.log(processor);
    return processor;
  }

  async getIntroById(_id) {
    const request = new APIRequest("GET", "/intro/" + _id);
    const processor = await APIProcessor(request);
    console.log(processor);
    return processor;
  }

  async putIntro(Obj) {
    const request = new APIRequest("PUT", "/intro/" + Obj.id, {
      desc: Obj.desc,
      modidt: Obj.modidt,
    });
    await APIProcessor(request);
  }

  async deleteIntro(_id) {
    const request = new APIRequest("DELETE", "/intro/" + _id);
    await APIProcessor(request);
  }
}
