var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const ERROR_MESSAGE = {
  restaurantNameMaxLength: "이름은 최대 20글자까지 가능합니다.",
  duplicateRestaurantName: "기존에 있는 식당과 중복된 이름입니다.",
  descriptionMaxLength: "설명은 최대 500글자까지 가능합니다."
};
const IMAGE_SRC_BY_RESTAURANTS_CATEGORY = {
  한식: "images/category-korean.png",
  중식: "images/category-chinese.png",
  일식: "images/category-japanese.png",
  양식: "images/category-western.png",
  아시안: "images/category-asian.png",
  기타: "images/category-etc.png"
};
const CATEGORIES = [
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타"
];
const DISTANCES = [5, 10, 15, 20, 30];
const createCategory = () => {
  const addRestaurantForm = document.querySelector(".addRestaurantForm");
  const category = `
  <div class="form-item form-item--required">
    <label for="category text-caption">카테고리</label>
    <select name="category" id="category" required>
    <option value="">선택해 주세요</option>
    ${CATEGORIES.map(
    (category2) => `<option value="${category2}">${category2}</option>`
  )}
  </select>
  </div>
`;
  addRestaurantForm.insertAdjacentHTML("beforeend", category);
};
const createName = () => {
  const addRestaurantForm = document.querySelector(".addRestaurantForm");
  const nameInput = `
    <div class="form-item form-item--required">
    <label for="name" class="text-caption">이름</label>
    <input type="text" name="name" id="name" required />
    </div>
  `;
  addRestaurantForm.insertAdjacentHTML("beforeend", nameInput);
};
const createDistance = () => {
  const addRestaurantForm = document.querySelector(".addRestaurantForm");
  const distance = `
    <div class="form-item form-item--required">
    <label for="distance" class="text-caption"
      >거리(도보 이동 시간)</label>
    <select name="distance" id="distance" required>
      <option value="">선택해 주세요</option>
      ${DISTANCES.map(
    (distance2) => `<option value="${distance2}">${distance2}</option>`
  )}
    </select>
  </div>
  `;
  addRestaurantForm.insertAdjacentHTML("beforeend", distance);
};
const createDescription = () => {
  const addRestaurantForm = document.querySelector(".addRestaurantForm");
  const descriptionInput = `
   <div class="form-item">
      <label for="description" class="text-caption">설명</label>
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="5"
      ></textarea>
      <span class="help-text text-caption">
        메뉴 등 추가 정보를 입력해 주세요.
      </span>
    </div>
  `;
  addRestaurantForm.insertAdjacentHTML("beforeend", descriptionInput);
};
const createLink = () => {
  const addRestaurantForm = document.querySelector(".addRestaurantForm");
  const linkInput = `
    <div class="form-item">
      <label for="link" class="text-caption">참고 링크</label>
      <input type="url" name="link" id="link" />
      <span class="help-text text-caption">
        매장 정보를 확인할 수 있는 링크를 입력해 주세요.
      </span>
    </div>
  `;
  addRestaurantForm.insertAdjacentHTML("beforeend", linkInput);
};
const modalButton = () => {
  const addRestaurantForm = document.querySelector(".addRestaurantForm");
  const modalButton2 = `
    <div class="button-container">
      <button
        type="button"
        class="button button--secondary text-caption"
        id="cancel-dialog-btn"
      >
        취소하기
      </button>
      <button
        type="submit"
        id="add-restaurant-btn"
        class="button button--primary text-caption"
      >
        추가하기
      </button>
    </div>
  `;
  addRestaurantForm.insertAdjacentHTML("beforeend", modalButton2);
};
const restaurantsData = [
  {
    category: "한식",
    name: "피양콩할마니",
    distance: 10,
    description: "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.",
    link: "https://www.google.com/",
    isFavorite: true
  },
  {
    category: "중식",
    name: "친친",
    distance: 5,
    description: "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다",
    link: "https://www.google.com/",
    isFavorite: false
  },
  {
    category: "일식",
    name: "잇쇼우",
    distance: 10,
    description: "정통 자가제면 사누끼 우동을 제공하는 일식당. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다합니다.",
    link: "https://www.google.com/",
    isFavorite: true
  },
  {
    category: "양식",
    name: "이태리키친",
    distance: 20,
    description: "늘 변화를 추구하는 이태리키친. 현대적인 감각의 양식 메뉴를 선보입니다.",
    link: "https://www.google.com/",
    isFavorite: false
  },
  {
    category: "아시안",
    name: "호아빈 삼성점",
    distance: 15,
    description: "푸짐한 양과 일품 국물이 매력인 쌀국수 전문점. 다양한 아시안 요리를 즐길 수 있습니다.",
    link: "https://www.google.com/",
    isFavorite: true
  },
  {
    category: "기타",
    name: "도스타코스 선릉점",
    distance: 5,
    description: "멕시칸 캐주얼 그릴. 다양한 메뉴와 분위기를 즐길 수 있는 곳입니다.",
    link: "https://www.google.com/",
    isFavorite: true
  }
];
const validateRestaurant = (newRestaurant, restaurantNames) => {
  if (newRestaurant.name.length > 20) {
    return ERROR_MESSAGE.restaurantNameMaxLength;
  }
  if (restaurantNames.includes(newRestaurant.name)) {
    return ERROR_MESSAGE.duplicateRestaurantName;
  }
  if (newRestaurant.description.length > 500) {
    return ERROR_MESSAGE.descriptionMaxLength;
  }
  return null;
};
class RestaurantFormModal {
  constructor(restaurantList, openButton) {
    this.modalElement = document.getElementById("add-restaurant-dialog");
    this.restaurantList = restaurantList;
    this.addFormFields();
    this.openButton = openButton;
    this.formElement = this.modalElement.querySelector("form");
    this.closeButton = document.querySelector("#cancel-dialog-btn");
    this.addEventListeners();
  }
  addFormFields() {
    createCategory();
    createName();
    createDistance();
    createDescription();
    createLink();
    modalButton();
  }
  addEventListeners() {
    this.openButton.addEventListener("click", () => this.open());
    this.closeButton.addEventListener("click", () => this.close());
    this.modalElement.addEventListener("click", (event) => {
      if (!event.target.closest(".modal-container")) {
        this.close();
      }
    });
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleSubmit();
    });
  }
  handleSubmit() {
    const nameInput = document.getElementById("name");
    const descriptionInput = document.getElementById("description");
    const categoryInput = document.getElementById("category");
    const distanceInput = document.getElementById("distance");
    const linkInput = document.getElementById("link");
    const restaurantsNameList = restaurantsData.map(
      (restaurant) => restaurant.name
    );
    const newRestaurant = {
      category: categoryInput.value,
      name: nameInput.value,
      distance: distanceInput.value,
      description: descriptionInput.value,
      link: linkInput.value
    };
    const errorMessage = validateRestaurant(newRestaurant, restaurantsNameList);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    this.restaurantList.addRestaurant(newRestaurant);
    this.formElement.reset();
    this.close();
  }
  open() {
    this.modalElement.showModal();
  }
  close() {
    this.modalElement.close();
  }
}
const createHeader = ({ title }) => {
  const header = document.createElement("header");
  header.classList.add("gnb");
  header.insertAdjacentHTML(
    "beforeend",
    `<h1 class="gnb__title text-title">${title}</h1>
    <button type="button" class="gnb__button" aria-label="음식점 추가">
      <img src="images/add-button.png" alt="음식점 추가" />
    </button>`
  );
  return header;
};
const clickStar = (isFavorite) => {
  const imgSrc = isFavorite ? "public/images/star.png" : "public/images/empty-star.png";
  return `<img src="${imgSrc}" class="star-icon">`;
};
class RestaurantDetailModal {
  constructor(restaurant, updateFavoriteStatus, deleteRestaurant) {
    __publicField(this, "restaurant");
    __publicField(this, "modalElement");
    __publicField(this, "closeButton");
    __publicField(this, "deleteButton");
    __publicField(this, "updateFavoriteStatus");
    __publicField(this, "deleteRestaurant");
    this.restaurant = restaurant;
    this.modalElement = document.getElementById(
      "restaurant-detail-dialog"
    );
    this.addRestaurantDetail();
    this.closeButton = document.querySelector(
      ".detail-close-button"
    );
    this.deleteButton = document.querySelector(
      ".detail-delete-button"
    );
    this.updateFavoriteStatus = updateFavoriteStatus;
    this.deleteRestaurant = deleteRestaurant;
    this.addEventListeners();
  }
  addRestaurantDetail() {
    let { category, name, distance, description, link, isFavorite } = this.restaurant;
    const container = document.querySelector(
      "#detail-modal-container"
    );
    container.addEventListener("click", (e) => {
      const starIcon = e.target.closest(
        ".star-icon"
      );
      if (starIcon) {
        starIcon.src = !isFavorite ? "public/images/star.png" : "public/images/empty-star.png";
        isFavorite = !isFavorite;
        this.updateFavoriteStatus(name);
        return;
      }
    });
    const mappedImage = IMAGE_SRC_BY_RESTAURANTS_CATEGORY[category] || "images/default.png";
    container.innerHTML = `
          <div class="icon-container">
            <div class="restaurant__category">
              <img class="category-icon" src="${mappedImage}"/>
            </div>
            <div class="favorite">${clickStar(isFavorite)}</div>
          </div>
          <div class="detail-restaurant__info">
            <h3 class="detail-restaurant__name text-title">${name}</h3>
            <span class="detail-restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            <p class="detail-restaurant__description text-body">${description}</p>
            <a class="detail-restaurant__link" href="${link}">${link}</a>
          </div>

          <div class="detail-button-box">
            <button type="button" class="button detail-delete-button">
              삭제하기
            </button>
            <button type="button" class="button detail-close-button">
              닫기
            </button>
          </div>`;
  }
  open() {
    this.modalElement.showModal();
  }
  close() {
    this.modalElement.close();
  }
  addEventListeners() {
    this.closeButton.addEventListener("click", () => this.close());
    this.deleteButton.addEventListener("click", () => {
      this.deleteRestaurant(this.restaurant.name);
      this.close();
    });
    this.modalElement.addEventListener("click", (event) => {
      const target = event.target;
      if (!target.closest("#detail-modal-container")) {
        this.close();
      }
    });
  }
}
const renderRestaurantElement = ({ category, name, distance, description, link, isFavorite }, updateFavoriteStatus, deleteRestaurant) => {
  const li = document.createElement("li");
  li.classList.add("restaurant");
  const restaurant = {
    category,
    name,
    distance,
    description,
    link,
    isFavorite
  };
  li.addEventListener("click", (e) => {
    const starIcon = e.target.closest(".star-icon");
    if (starIcon) {
      starIcon.src = !restaurant.isFavorite ? "public/images/star.png" : "public/images/empty-star.png";
      restaurant.isFavorite = !restaurant.isFavorite;
      updateFavoriteStatus(name);
      return;
    }
    const restaurantDetailModal = new RestaurantDetailModal(
      restaurant,
      (name2) => updateFavoriteStatus(name2),
      (name2) => deleteRestaurant(name2)
    );
    restaurantDetailModal.open();
  });
  const mappedImage = IMAGE_SRC_BY_RESTAURANTS_CATEGORY[category] || "images/default.png";
  li.innerHTML = `
    <div class="restaurant__box">
      <div class="restaurant__category">
        <img class="category-icon" />
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle"></h3>
        <span class="restaurant__distance text-body"></span>
        <p class="restaurant__description text-body"></p>
      </div>
    </div>
    <div class="favorite">${clickStar(isFavorite)}</div>
    `;
  li.querySelector(".category-icon").src = mappedImage;
  li.querySelector(".category-icon").alt = category;
  li.querySelector(".restaurant__name").textContent = name;
  li.querySelector(
    ".restaurant__distance"
  ).textContent = `캠퍼스로부터 ${distance}분 내`;
  li.querySelector(".restaurant__description").textContent = description;
  return li;
};
const createTabFilter = (restaurantList) => {
  const tap_container = document.querySelector(".tab-container");
  const tabFilter = `<div class="tab-button">
      <button class="tab-btn text-title" data-tab="allTab">모든 음식점</button>
      <button class="tab-btn text-title" data-tab="favoriteTab">자주 가는 음식점</button>
      <p id="tab-filter-result"></p>
  </div>
  `;
  tap_container.insertAdjacentHTML("beforeend", tabFilter);
  setActive();
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const selectedTab = event.target.dataset.tab;
      tabButtons.forEach((button2) => button2.classList.remove("active"));
      event.target.classList.add("active");
      handleOnClick(selectedTab);
    });
  });
  function setActive() {
    if (restaurantList.selectedTab === "allTab") {
      document.querySelector('.tab-btn[data-tab="allTab"]').classList.add("active");
    } else {
      document.querySelector('.tab-btn[data-tab="favoriteTab"]').classList.add("active");
    }
  }
  function handleOnClick(selectedTab) {
    restaurantList.setSelectedTab(selectedTab);
    restaurantList.createRestaurantList();
  }
};
const createSortFilter = (restaurantList) => {
  const addrestaurant_filter_container = document.querySelector(
    ".restaurant-filter-container"
  );
  const sortFilter = `<div>
  <select name="sorting" id="sort-filter" class="restaurant-filter">
    <option value="name">이름순</option>
    <option value="distance">거리순</option>
  </select>
    <p id="sort-filter-result"></p>
    </div>
  `;
  addrestaurant_filter_container.insertAdjacentHTML("beforeend", sortFilter);
  const selectElement = document.getElementById("sort-filter");
  selectElement.addEventListener(
    "change",
    (event) => handleOnChange(event.target)
  );
  function handleOnChange(event) {
    showSelectedSortRestaurantList(event.target.value);
  }
  function showSelectedSortRestaurantList(selectedSort) {
    restaurantList.setSelectedSort(selectedSort);
    restaurantList.createRestaurantList();
    document.getElementById("sort-filter").value = selectedSort;
  }
};
class RestaurantList {
  constructor() {
    __publicField(this, "selectedCategory");
    __publicField(this, "selectedSort");
    __publicField(this, "selectedTab");
    const storedRestaurants = JSON.parse(localStorage.getItem("restaurants"));
    this.restaurants = storedRestaurants ? storedRestaurants : [...restaurantsData];
    const storedCategory = JSON.parse(localStorage.getItem("category"));
    const storedSort = JSON.parse(localStorage.getItem("sort"));
    const storedTab = JSON.parse(localStorage.getItem("tab"));
    this.selectedCategory = storedCategory ? storedCategory : "전체";
    this.selectedSort = storedSort ? storedSort : "이름순";
    this.selectedTab = storedTab ? storedTab : "allTab";
    this.restaurantListElement = null;
  }
  setSelectedCategory(category) {
    localStorage.setItem("category", JSON.stringify(category));
    this.selectedCategory = category;
  }
  setSelectedSort(sortOption) {
    this.selectedSort = sortOption;
    localStorage.setItem("sort", JSON.stringify(sortOption));
  }
  setSelectedTab(tab) {
    this.selectedTab = tab;
    localStorage.setItem("tab", JSON.stringify(tab));
  }
  createRestaurantList() {
    const restaurantListContainer = document.querySelector(
      ".restaurant-list-container"
    );
    const restaurantListHTML = `<ul class="restaurant-list"></ul>`;
    restaurantListContainer.insertAdjacentHTML("beforeend", restaurantListHTML);
    this.restaurantListElement = document.querySelector(".restaurant-list");
    this.render();
  }
  updateFavoriteStatus(name) {
    const restaurant = this.restaurants.find((r) => r.name === name);
    if (!restaurant) return;
    restaurant.isFavorite = !restaurant.isFavorite;
    this.render();
  }
  deleteRestaurant(name) {
    this.restaurants = this.restaurants.filter(
      (restaurant) => restaurant.name !== name
    );
    this.render();
  }
  renderFilter() {
    const addrestaurant_filter_container = document.querySelector(
      ".restaurant-filter-container"
    );
    addrestaurant_filter_container.innerHTML = "";
    createCategoryFilter(this);
    createSortFilter(this);
  }
  renderAllTabData() {
    this.renderFilter();
    let categoryFilteredData;
    let sortFilteredData;
    if (this.selectedCategory === "전체") {
      categoryFilteredData = this.restaurants;
    } else {
      categoryFilteredData = this.restaurants.filter(
        (restaurant) => restaurant.category === this.selectedCategory
      );
    }
    if (this.selectedSort === "이름순") {
      sortFilteredData = categoryFilteredData.slice().sort((a, b) => a.name.localeCompare(b.name, "ko"));
    } else {
      sortFilteredData = categoryFilteredData.slice().sort((a, b) => a.distance - b.distance);
    }
    sortFilteredData.forEach((restaurant) => {
      const restaurantItem = renderRestaurantElement(
        restaurant,
        (name) => this.updateFavoriteStatus(name),
        (name) => this.deleteRestaurant(name)
      );
      this.restaurantListElement.appendChild(restaurantItem);
    });
  }
  renderFavoriteData() {
    const addrestaurant_filter_container = document.querySelector(
      ".restaurant-filter-container"
    );
    addrestaurant_filter_container.innerHTML = "";
    const favoriteData = this.restaurants.filter(
      (restaurant) => restaurant.isFavorite === true
    );
    favoriteData.forEach((restaurant) => {
      const restaurantItem = renderRestaurantElement(
        restaurant,
        (name) => this.updateFavoriteStatus(name),
        (name) => this.deleteRestaurant(name)
      );
      this.restaurantListElement.appendChild(restaurantItem);
    });
  }
  render() {
    localStorage.setItem("restaurants", JSON.stringify(this.restaurants));
    this.restaurantListElement.innerHTML = "";
    if (this.selectedTab === "allTab") {
      this.renderAllTabData();
    } else {
      this.renderFavoriteData();
    }
  }
  addRestaurant(newRestaurant) {
    this.restaurants.push(newRestaurant);
    console.log(this.restaurants);
    this.render();
  }
}
const createCategoryFilter = (restaurantList) => {
  const addrestaurant_filter_container = document.querySelector(
    ".restaurant-filter-container"
  );
  const categoryFilter = `<div>
  <select name="category" id="category-filter" class="restaurant-filter">
    <option value="전체">전체</option>
    ${CATEGORIES.map(
    (category) => `<option value="${category}">${category}</option>`
  ).join("")}
  </select>
  <p id="category-filter-result"></p>
  </div>
  `;
  addrestaurant_filter_container.insertAdjacentHTML(
    "beforeend",
    categoryFilter
  );
  const selectElement = document.getElementById("category-filter");
  selectElement.addEventListener(
    "change",
    (event) => handleOnChange(event.target)
  );
  function handleOnChange(selectedCategory) {
    const text = selectedCategory.options[selectedCategory.selectedIndex].text;
    document.getElementById(
      "category-filter-result"
    );
    showSelectedCategoryRestaurantList(text);
  }
  function showSelectedCategoryRestaurantList(selectedCategory) {
    restaurantList.setSelectedCategory(selectedCategory);
    restaurantList.createRestaurantList();
    const selectElement2 = document.getElementById("category-filter");
    selectElement2.value = selectedCategory;
  }
};
document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const header = createHeader({ title: "점심 뭐 먹지" });
  body.prepend(header);
  const restaurantList = new RestaurantList();
  restaurantList.createRestaurantList();
  createTabFilter(restaurantList);
  const addRestaurantModalButton = header.querySelector(".gnb__button");
  new RestaurantFormModal(
    restaurantList,
    addRestaurantModalButton
  );
});
