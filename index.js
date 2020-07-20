import * as API from "./api.js";

const APIIntro = new API.APIHandlerIntro();
const APIQna = new API.APIHandlerQna();

const getIntroByID = async (_id) => {
  let promise = await APIIntro.getTreeByID(_id);
  let Obj = promise.Item;

  let introItem = JSON.parse(Obj);

  return introItem;
};

const getIntro = async () => {
  let Objs = await APIIntro.getIntro();
  renderTable(Objs.Items);
};

const getQnas = async () => {
  let Objs = await APIQna.getQnas();
  renderQna(Objs.Items);
};

const postIntro = async (Obj) => {
  if (_accessToken != null) {
    let id = await APIIntro.postIntro(Obj, _accessToken);
    return id;
  }
  return "needLogin";
};

const updateIntro = async (Obj) => {
  await APIIntro.putCard(Obj);
};

const deleteIntro = async (_id) => {
  await APIIntro.deleteIntro(_id);
};

const renderTable = (items) => {
  let introContainer = document.querySelector(".introContainer");
  let toggleShowButton = document.querySelector("#toggleShowButton");
  toggleShowButton.onclick = toggleShow;
  let plusCardButton = document.querySelector("#plusButton");
  plusCardButton.onclick = plusCard;

  items.forEach((item) => {
    let card = document.createElement("div");
    card.className = "uk-card uk-card-default uk-card-body";
    card.id = item.id;

    let modidt = document.createElement("div");
    modidt.className = "uk-card-badge uk-label";
    modidt.innerText = item.modidt;

    let desc = document.createElement("h3");
    desc.className = "uk-card-title";
    desc.innerText = item.desc;

    let editButton = document.createElement("button");
    editButton.className = "uk-button uk-button-default";
    editButton.innerText = "수정";

    let deleteButton = document.createElement("button");
    deleteButton.className = "uk-button uk-button-default";
    deleteButton.innerText = "삭제";
    deleteButton.onclick = deleteCard;

    let detailButton = document.createElement("button");
    detailButton.className = "uk-button uk-button-default";
    detailButton.innerText = "상세";

    card.appendChild(modidt);
    card.appendChild(desc);

    card.appendChild(editButton);
    card.appendChild(deleteButton);
    card.appendChild(detailButton);

    introContainer.appendChild(card);
  });
};

const renderQna = (items) => {
  const ul = document.querySelector("#ul_qna");

  items.forEach((item) => {
    console.log(item);
    if (item.subid == 0) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.className = "uk-accordion-title";
      a.id = item.id;
      a.name = item.seq;

      const spanI = document.createElement("span");
      spanI.setAttribute("uk-icon", "question");

      const spanC = document.createElement("span");
      spanC.innerText = " " + item.content;

      a.appendChild(spanI);
      a.appendChild(spanC);
      li.appendChild(a);
      ul.appendChild(li);
    }
  });

  var liArray = Array.from(ul.children);
  liArray.forEach((li) => {
    const divcontent = document.createElement("div");
    divcontent.className = "uk-accordion-content";
    items.forEach((item) => {
      if (item.subid != 0) {
        const title = li.querySelector(".uk-accordion-title");
        if (item.seq == title.name) {
          const p = document.createElement("p");
          p.id = item.id;

          const spanS = document.createElement("span");
          spanS.innerHTML = "&nbsp;&nbsp;";

          const spanI = document.createElement("span");
          spanI.setAttribute("uk-icon", "comments");

          const spanC = document.createElement("span");
          spanC.innerText = " " + item.content;

          p.appendChild(spanS);
          p.appendChild(spanI);
          p.appendChild(spanC);
          divcontent.appendChild(p);
        }
      }
    });
    const divmargin = document.createElement("div");
    divmargin.className = "uk-margin";

    const divflex = document.createElement("div");
    divflex.className = "uk-flex";

    const textarea = document.createElement("textarea");
    textarea.className = "uk-textarea";
    textarea.rows = 5;
    textarea.placeholder = "댓글을 입력해 주세요.";

    const btnwrite = document.createElement("button");
    btnwrite.className =
      "uk-button uk-button-default uk-height-1-3 uk-margin-left";
    btnwrite.innerText = "입력";

    divflex.appendChild(textarea);
    divflex.appendChild(btnwrite);
    divmargin.appendChild(divflex);
    divcontent.appendChild(divmargin);
    li.appendChild(divcontent);
  });
};

const deleteCard = (event) => {
  let cardElement = event.target.parentNode;
  deleteIntro(cardElement.id);
};

const plusCard = (event) => {
  let cardElement = new Object();
  let desc = document.querySelector("#inputdesc");
  let modidt = document.querySelector("#inputmodidt");
  cardElement.desc = desc.value;
  cardElement.modidt = modidt.value;

  let id = postIntro(cardElement);
  id.then((data) => {
    if (data == "needLogin") {
      alert("로그인 후 다시 입력해주세요");
    } else {
      alert("입력성공 f5눌러주세요");
    }
  });

  desc.value = "";
  modidt.value = "";
};

const toggleShow = (event) => {
  let inputArea = document.querySelector(".inputArea");
  if (inputArea.style.display == "none") inputArea.style.display = "block";
  else inputArea.style.display = "none";
};

(() => {
  let inputArea = document.querySelector(".inputArea");
  inputArea.style.display = "none";
  const items = getIntro();

  getQnas();
})();
