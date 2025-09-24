
// Data source for sidebar
const DATA = [
  {
    group: "Bài thực hành 1",
    items: [
      { title: "Cấu hình ứng dụng Web", slug: "lab1", pages: [
        { title: "Nội dung", path: "pages/Bai1/Bai1.html" },
      ]}
    ]
  },
  {
    group: "Bài thực hành 2",
    items: [
      { title: "HTML và CSS", slug: "lab2", pages: [
        { title: "Nội dung", path: "pages/Bai1/Bai1.html" },
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
        a.href = `#/open?path=${encodeURIComponent(pg.path)}`;
        a.textContent = pg.title;
        body.appendChild(a);
      });
      ul.appendChild(li);
    });
    wrap.appendChild(ul);
    container.appendChild(wrap);
  });
}

async function loadPageByHash(){
  const hash = location.hash || "";
  const url = new URL(hash.slice(1), location.href); // treat hash like query
  const path = url.searchParams.get("path");
  const main = qs("main");
  if(!path){
    main.innerHTML = `<div class="content"><h1>Công nghệ web an toàn</h1><p>Chọn một mục ở sidebar để xem nội dung của từng bài.</p></div>`;
    return;
  }
  try{
    const res = await fetch(path);
    const html = await res.text();
    main.innerHTML = html;
  }catch(e){
    main.innerHTML = `<div class="content"><h2>Lỗi tải nội dung</h2><pre>${e}</pre></div>`;
  }
}

window.addEventListener("hashchange", loadPageByHash);
window.addEventListener("DOMContentLoaded", ()=>{
  renderSidebar();
  loadPageByHash();
});
