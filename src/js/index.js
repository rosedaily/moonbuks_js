// step1. 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - [o] 메뉴 이름을 받아 엔터키로 추가
// - [o] 추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입
// - [o] 총 메뉴 갯수 conunt해서 상단에 보여줌
// - [] 메뉴 추가 후, input은 빈 값으로 초기화
// - [] 사용자 입력값이 빈 값이라면 추가 되지 않음

const $ = (selecter) => document.querySelector(selecter);

function App() {
  //form 태그가 자동으로 전송되는 걸 막아준다.
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 메뉴 이름 입력받음
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
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
      const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
      console.log("::menuCount::" + menuCount);
      $(".menu-count").innerText = `총 ${menuCount}개`;

      // console.log(menuItemTemplate(espressoMenuName));
    }
  });
}

App();

// TODO 메뉴 수정
// - [] 메뉴의 수정 버튼 클릭 이벤트를 받아 메뉴 수정하는 모달창이 뜬다.
// - [] 모달창에서 신규메뉴명 입력 받아, 확인버튼을 누르면 메뉴가 수정된다.

// TODO 메뉴 삭제
// - [] 메뉴 삭제 버튼 클릭 이벤트를 받아, 메뉴 삭제 컨펌 모달창이 뜬다.
// - [] 확인 버튼을 클릭하면 메뉴가 삭제된다.
// - [] 총 메뉴 갯수를 conunt 해서 상단에 보여준다.
