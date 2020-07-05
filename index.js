import APIHandler from "./api.js";
const API = new APIHandler();

const getIntroByID = async (_id) => {
  let promise = await API.getTreeByID(_id);
  let Obj = promise.Item;

  let introItem = JSON.parse(Obj);
  console.log(introItem);

  return introItem;
};

const getIntro = async () => {
  let Objs = await API.getIntro();
  console.log(Objs);
  renderTable(Objs.Items);
};

const postIntro = async (Obj) => {
  let id = await API.postIntro(Obj);
  console.log(id);
};

const updateIntro = async (Obj) => {
  await API.putCard(Obj);
};

const deleteIntro = async (_id) => {
  await API.deleteIntro(_id);
};

const renderTable = (items) => {
  let introContainer = document.querySelector(".introContainer");
  let toggleShowButton = document.querySelector("#toggleShowButton");
  toggleShowButton.onclick = toggleShow;
  let plusCardButton = document.querySelector("#plusButton");
  plusCardButton.onclick = plusCard;

  items.forEach((item) => {
    console.log(item);

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

  desc.value = "";
  modidt.value = "";

  if (id != "") {
    alert("입력완료 // f5눌러서 새로고침 이건 나중에 새로고침 되도록 고쳐야함");
  }
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
})();
