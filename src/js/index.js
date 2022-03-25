// step1. 요구사항 구현을 위한 전략
// TODO 메뉴 추가 
// - [o] 메뉴 이름을 받아 엔터키로 추가
// - [] 메뉴의 이름을 입력받고, 엔터키 입력으로 추가한다.
// - [o] 추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입
// - [o] 총 메뉴 갯수 conunt해서 상단에 보여줌
// - [o] 메뉴 추가 후, input은 빈 값으로 초기화
// - [o] 사용자 입력값이 빈 값이라면 추가 되지 않음

//TDD 메뉴 수정
// - [o] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 모달창(prompt)이 뜬다.
// - [o] 모달창에서 신규메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다.

// TODO 메뉴 삭제
// - [o] 메뉴 삭제 버튼 클릭 이벤트를 받아, 메뉴 삭제 컨펌(confirm) 모달창이 뜬다.
// - [o] 확인 버튼을 클릭하면 메뉴가 삭제된다.
// - [o] 총 메뉴 갯수를 conunt 해서 상단에 보여준다.

const $ = (selecter) => document.querySelector(selecter);

function App() {
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
    const menuItemTemplate = (espressoMenuName) => {
      return `
        <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
        </li>`;
    };
    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate(espressoMenuName)
    );
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

App();