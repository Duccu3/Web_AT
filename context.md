Dự án: Web_AT
URL chạy: https://duccu3.github.io/Web_AT/
Kiến trúc: SPA. index.html cố định. Nội dung nạp bằng hash -> fetch -> main.innerHTML.
JS bổ trợ: executeScripts() để chạy <script> trong fragment; shim document.write qua window.documentWriteTarget.
CSS: main.css cho khung chung; Lab tách riêng: assets/css/Lab2.css, assets/css/Lab3.css.
Menu: cấu hình trong assets/js/app.js với {title, path, css}.
Trạng thái:
- Lab1: xong.
- Lab2: example, information, score (bảng HTML chỉnh trực tiếp), cv, news (iframe template) – xong.
- Lab3: tách riêng Lab3.css; 7.1 đã tạo examples và 7 ví dụ đầu.
Quy ước fragment: mỗi trang bắt đầu bằng <div class="content btX">, không có <html><head><body>.
