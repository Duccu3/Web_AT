
// Data source for sidebar
const DATA = [
  {
    group: "Bài thực hành 1",
    items: [
      { title: "Cấu hình ứng dụng Web", slug: "lab1", pages: [
        { title: "1.1 Nội dung", path: "pages/Bai1/Bai1.html" },
      ]}
    ]
  },
  {
    group: "Bài thực hành 2",
    items: [
      { title: "HTML và CSS", slug: "lab2", pages: [
        { title: "2.1 Ví dụ", path: "pages/Bai2/example.html", css: "assets/css/Lab2.css" },
        { title: "2.2 Thông tin", path: "pages/Bai2/information.html", css: "assets/css/Lab2.css" },
        { title: "2.3 CV", path: "pages/Bai2/cv.html", css: "assets/css/Lab2.css" },
        { title: "2.4 Điểm số", path: "pages/Bai2/score.html", css: "assets/css/Lab2.css" },
        { title: "2.5 Báo chí", path: "pages/Bai2/news.html", css: "assets/css/Lab2.css" },
      ]}
    ]
  },
  {
    group: "Bài thực hành 3",
    items: [
      { title: "HTML, CSS và JS", slug: "lab3", pages: [
        { title: "3.1 Ví dụ mẫu", path: "pages/Bai3/examples.html", css: "assets/css/Lab3.css" },
        { title: "3.2 Quiz", path: "pages/Bai3/Quiz.html", css: "assets/css/Lab3.css" },
        { title: "3.3 Form", path: "pages/Bai3/form.html", css: "assets/css/Lab3.css" },
        { title: "3.4 Ho so", path: "pages/Bai3/ho_so.html", css: "assets/css/Lab3.css" },
        { title: "3.5 Form nhập", path: "pages/Bai3/register.html", css: "assets/css/Lab3.css" },
        { title: "3.6 Bảng checkbox", path: "pages/Bai3/list.html", css: "assets/css/Lab3.css" },
        { title: "3.7 Thực đơn", path: "pages/Bai3/menu.html", css: "assets/css/Lab3.css" },
        { title: "3.8 Tabs", path: "pages/Bai3/tabs.html", css: "assets/css/Lab3.css" },
        { title: "3.9 Cây thư mục", path: "pages/Bai3/tree.html", css: "assets/css/Lab3.css" },
        { title: "3.10 Máy tính cơ bản", path: "pages/Bai3/maytinh.html", css: "assets/css/Lab3.css" },
        { title: "3.11 Hoạt cảnh", path: "pages/Bai3/animation.html", css: "assets/css/Lab3.css" },
        { title: "3.12 Sắp xếp và tìm kiếm trên bảng", path: "pages/Bai3/search.html", css: "assets/css/Lab3.css" },
      ]}
    ]
  },

];

const qs = (sel, el=document)=>el.querySelector(sel);
const qsa = (sel, el=document)=>[...el.querySelectorAll(sel)];

function renderSidebar(){
  const container = qs("#sidebar-list");
  container.innerHTML = "";
  DATA.forEach((section, idx)=>{
    const wrap = document.createElement("div");
    wrap.innerHTML = `<div class="section-title">${section.group}</div>`;
    const ul = document.createElement("ul");
    ul.className = "accordion";
    section.items.forEach((it, i)=>{
      const li = document.createElement("li");
      li.className = "ac-item";
      li.innerHTML = `
        <button type="button" aria-expanded="false">
          <span>${it.title}</span>
          <span>▸</span>
        </button>
        <div class="ac-body"></div>
      `;
      const btn = qs("button", li);
      const body = qs(".ac-body", li);
      btn.addEventListener("click", ()=>{
        const open = btn.getAttribute("aria-expanded")==="true";
        btn.setAttribute("aria-expanded", String(!open));
        qs("span:last-child", btn).textContent = open ? "▸" : "▾";
        body.style.display = open ? "none" : "block";
      });
      // fill children
      it.pages.forEach(pg=>{
        const a = document.createElement("a");
        a.href = `#/open?path=${encodeURIComponent(pg.path)}${pg.css ? `&css=${encodeURIComponent(pg.css)}` : ""}`;
        a.textContent = pg.title;
        body.appendChild(a);
      });
      ul.appendChild(li);
    });
    wrap.appendChild(ul);
    container.appendChild(wrap);
  });
}
function usePageCss(href){
  let el = document.getElementById("page-css");
  if(!href){ if(el) el.remove(); return; }
  if(!el){ el = document.createElement("link"); el.id="page-css"; el.rel="stylesheet"; document.head.appendChild(el); }
  el.href = href;
}

// chạy lại <script> trong vùng vừa nạp
function executeScripts(root){
  root.querySelectorAll("script").forEach(old=>{
    const s = document.createElement("script");
    if (old.src) s.src = old.src; else s.textContent = old.textContent;
    document.body.appendChild(s);
    old.remove();
  });
}
// cho phép dùng document.write mà không phá trang
(function(){
  const nativeWrite = document.write.bind(document);
  document.write = function(html){
    const t = window.documentWriteTarget;
    if (t) t.insertAdjacentHTML("beforeend", html);
    else nativeWrite(html);
  };
})();

async function loadPageByHash(){
  const url  = new URL(location.hash.slice(1), location.href);
  const path = url.searchParams.get("path");
  const css  = url.searchParams.get("css");
  const main = document.querySelector("main");
  if(!path){ main.innerHTML = `<div class="content"><h1>Chọn một mục ở sidebar</h1></div>`; usePageCss(null); return; }
  const html = await (await fetch(path)).text();
  main.innerHTML = html;
  usePageCss(css);
  executeScripts(main);
}


window.addEventListener("hashchange", loadPageByHash);
window.addEventListener("DOMContentLoaded", ()=>{
  renderSidebar();
  loadPageByHash();
});
