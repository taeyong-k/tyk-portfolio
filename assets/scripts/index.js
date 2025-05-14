// toolbar scroll + scroll-to-top
const $AboutMe = document.getElementById('AboutMe');
const $toolBar = $AboutMe.querySelector(':scope > .toolBar');
const $topAnchor = document.getElementById('topAnchor');

const hideToolBar = () => $toolBar.classList.remove('visible');
const addToolBar = () => $toolBar.classList.add('visible');
const hideTopAnchor = () => $topAnchor.classList.remove('visible');
const addTopAnchor = () => $topAnchor.classList.add('visible');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {      // 50px 이상 스크롤 시
        addToolBar();
        addTopAnchor();
    } else {
        hideToolBar();
        hideTopAnchor();
    }
});

// scroll-to-top
const $scrollToTop = $topAnchor.querySelector(':scope > .up-chevron');

$scrollToTop.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// toolbar 'click' moves to the section
// 모든 링크 가져오기
const $getContent = $toolBar.querySelectorAll(':scope > .content > .deco');

$getContent.forEach(content => {
    content.addEventListener('click', (e) => {
        e.preventDefault();     // 기본 이벤트 방지

        const $SectionId = content.classList[1]; // 두 번째 클래스 값 (해당 섹션 Id 값 찾기)
        const $Section = document.getElementById($SectionId);  // 해당 Id의 섹션 찾기
        $Section.scrollIntoView({behavior: 'smooth'});  // 부드러운 스크롤
    });
});


// projectPage(Form-open/close)
// body.scroll hidden
function initProjectForm() {
    const $Projects = document.getElementById('Projects');
    const $ProjectsForm = document.getElementById('ProjectsForm');
    const $projectsBtn = $Projects.querySelectorAll('.moreInfo > .button > .btn'); // 모든 프로젝트 버튼
    const $projectForms = $ProjectsForm.querySelectorAll('.projectPage'); // 모든 프로젝트 폼
    const $projectCloseBtn = $ProjectsForm.querySelectorAll('.closeBtn > .button');

    // 스크롤바 너비 계산하기
    function getBodyScrollbarWidth() {
        return window.innerWidth - document.documentElement.offsetWidth;
    }

    // body의 스크롤 막기
    // 스크롤 차단을 위해 overflow-hidden 클래스를 추가
    function blockBodyScroll(className = 'overflow-hidden') {   // class 이름 변경
        // HTML 문서의 body에 'overflow-hidden' 클래스 포함하는지 체크
        const isBlocked = document.body.classList.contains(className);
        if (isBlocked) return;  // 있으면 return, 없으면 추가

        document.body.style.setProperty('--scrollbar-width', getBodyScrollbarWidth() + 'px');
        document.body.classList.add(className);
    }

    // body의 스크롤 허용하기
    // 스크롤 차단을 해제하기 위해 overflow-hidden 클래스를 제거하고, CSS 변수를 삭제한다.
    function unblockBodyScroll(className = 'overflow-hidden') {
        const isBlocked = document.body.classList.contains(className);
        if (!isBlocked) return;

        document.body.style.removeProperty('--scrollbar-width');
        document.body.classList.remove(className);
    }

    // projects openForm
    $projectsBtn.forEach(button => {    // forEach로 돌리는 이유: $projectsBtn가 하나의 버튼이 아닌 여러 개의 버튼을 포함하기 때문에 (각 버튼에 click 이벤트 추가하기 위함)
        button.addEventListener('click', () => {
            const projectData = button.dataset.projectId; // 버튼에서 프로젝트 ID 가져오기
                                                          // 즉, 사용자가 누른 버튼에 해당하는 프로젝트 ID를 변수 projectData에 저장
            // 모든 프로젝트 폼 숨기기
            $projectForms.forEach(hideForm => {
                hideForm.style.display = 'none';    // display와 opacity를 적용해 완전히 안 보이게 처리
                hideForm.style.opacity = 0;
            });

            // 해당 프로젝트의 폼 찾기 & 표시
            const targetForm = document.querySelector(`.projectPage[data-project-id="${projectData}"]`);
            // 해석 querySelector: 일치하는 Element를 반환
            //     projectData: 프로젝트 버튼을 누른 그 프로젝트 데이터 아이디 값
            //     버튼을 누른 해당 프로젝트 ID 값을 가진 프로젝트 페이지 data-project-id 값이 동일한 페이지를 반환한것을 targetForm에 담아줌
            // 즉, 사용자가 클릭한 버튼과 같은 data-project-id 값을 가진 .projectPage 요소를 찾음

            if (targetForm) {   // if문으로 한것은 존재 여부 확인 (오류 방지 역할)
                targetForm.style.display = 'block'; // 해당 프로젝트 폼 보이게 하기
                targetForm.style.opacity = 1;

                $ProjectsForm.style.visibility = 'visible'; // 전체 폼 컨테이너 보이게 하기
                setTimeout(() => {
                    $ProjectsForm.classList.add('visible'); // 애니메이션 효과
                }, 10);
                blockBodyScroll();
            }
        });
    });

    // projects closeForm
    $projectCloseBtn.forEach(closeBtn => {
        closeBtn.onclick = () => {
            // 해당 프로젝트 폼 숨기기
            const projectPage = closeBtn.closest('.projectPage');

            if (projectPage) {
                projectPage.style.opacity = 0;
                setTimeout(() => {
                    projectPage.style.display = 'none'; // 완전히 숨기기
                }, 250);
            }

            $ProjectsForm.classList.remove('visible'); // 투명하게 만듦
            setTimeout(() => {
                $ProjectsForm.style.visibility = 'none'; // 완전히 안 보이게 설정
            }, 250);
            unblockBodyScroll();
        };
    });
}

document.addEventListener("DOMContentLoaded", initProjectForm); // 페이지 로드 후 실행
