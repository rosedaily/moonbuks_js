// TODO localStorage Read & Write
// - []  localStorage에 데이터를 저장한다.
// - []  localStorage에 저장된 데이터를 읽어온다.

// TODO 카테고리별 메뉴판 관리
// - []  에스프레소 메뉴판 관리 
// - []  프라푸치노 메뉴판 관리
// - []  블렌디드 메뉴판 관리
// - []  티바나 메뉴판 관리 
// - []  디저트 메뉴판 관리

// TODO 페이지 접근시 최초 데이터 Read & Rendering
// - []  페이지에 최초로 로딩될 떄 lacalStorage에 에스프레소 메뉴를 읽어온다.
// - []  에스프레소 메뉴를 페이지에 그려준다.

// TODO 품절 상태 관리
// - []  품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
// - []  품절 버튼을 추가한다.
// - []  품절 버튼을 클릭하면 lacalStorage에 상태값이 저장된다.
// - []  클릭이벤트에서 가장 가까움 li태그의 class속성 값에 sold-out을 추가한다.

const $ = (selecter) => document.querySelector(selecter);

const store = {
  setLocalStorage(menu){
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage(){
    localStorage.getItem("menu");
  },
};

function App() {
  this.menu = [];


  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  }

  const addMenuName = () => {
    if($("#espresso-menu-name").value === ""){
      alert("값을 입력해주세요.");
      return;
    }

    const espressoMenuName = $("#espresso-menu-name").value;
    this.menu.push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);
    const template = this.menu.map(menuItem => {
      return `
        <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
            수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
            삭제
          </button>
        </li>`
    }).join("");

    $("#espresso-menu-list").innerHTML = template;
    updateMenuCount();
    $("#espresso-menu-name").value = "";

    // console.log(menuItemTemplate(espressoMenuName));
  };

  const updateMenuName = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴명을 수정하세요.", $menuName.innerText);
    $menuName.innerText = updatedMenuName;
  }

  const removeMenuName = (e) => {
    if( confirm("정말 삭제 하시겠습니까?") ){
      e.target.closest("li").remove();
      updateMenuCount();
    };
  }
  
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")){
      updateMenuName(e);
    };

    if (e.target.classList.contains("menu-remove-button")){
      removeMenuName(e);
    }
  });

  //form 태그가 자동으로 전송되는 걸 막아준다.
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

  // 메뉴 이름 입력받음
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if(e.key !== "Enter") return;
    addMenuName();
  });
}
new App();
// const a = new App();