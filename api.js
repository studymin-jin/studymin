class APIRequest {
  constructor(method, path, body = null, accesstoken = null) {
    this.method = method;
    this.url = path;
    this.body = body;
    this.accesstoken = accesstoken;
  }
}

const APIProcessor = async (request) => {
  try {
    const response = await fetch(request.url, {
      method: request.method, // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //"X-Cog-Token": request.accesstoken,
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

export class APIHandlerIntro {
  constructor() {
    this.host =
      "https://9exn85jyp0.execute-api.ap-northeast-2.amazonaws.com/prod";
  }

  async postIntro(Obj, accesstoken) {
    const request = new APIRequest(
      "POST",
      this.host + "/intro/",
      {
        desc: Obj.desc,
        modidt: Obj.modidt,
      },
      accesstoken
    );
    const response = await APIProcessor(request);
    if (response != "Error") {
      console.log(response);
      return response.id;
    } else {
      return null;
    }
  }

  // Intro CRUD
  async getIntro() {
    const request = new APIRequest("GET", this.host + "/intro");
    const processor = await APIProcessor(request);
    return processor;
  }

  async getIntroById(_id) {
    const request = new APIRequest("GET", this.host + "/intro/" + _id);
    const processor = await APIProcessor(request);
    return processor;
  }

  async putIntro(Obj) {
    const request = new APIRequest("PUT", this.host + "/intro/" + Obj.id, {
      desc: Obj.desc,
      modidt: Obj.modidt,
    });
    await APIProcessor(request);
  }

  async deleteIntro(_id) {
    const request = new APIRequest("DELETE", this.host + "/intro/" + _id);
    await APIProcessor(request);
  }
}

export class APIHandlerQna {
  constructor() {
    this.host =
      "https://dip1p488d6.execute-api.ap-northeast-2.amazonaws.com/prod";
  }

  // QnA CRUD
  async getQnas() {
    const request = new APIRequest("GET", this.host + "/qna");
    const processor = await APIProcessor(request);
    return processor;
  }

  async getQnaComments(subid) {
    const request = new APIRequest("GET", this.host + "/qna/" + subid);
    const processor = await APIProcessor(request);
    return processor;
  }

  async postQna(Obj) {
    const request = new APIRequest("POST", this.host + "/qna", {
      content: Obj.content,
      writer: Obj.writer,
      regdt: Obj.regdt,
      modidt: Obj.modidt,
    });
    const response = await APIProcessor(request);
    if (response != "Error") {
      console.log(response);
      return response.seq;
    } else {
      return null;
    }
  }

  async postComment(Obj) {
    const request = new APIRequest("POST", this.host + "/qna/" + Obj.seq, {
      content: Obj.content,
      writer: Obj.writer,
      regdt: Obj.regdt,
      modidt: Obj.modidt,
    });
    const response = await APIProcessor(request);
    if (response != "Error") {
      console.log(response);
      return response.subid;
    } else {
      return null;
    }
  }
}
