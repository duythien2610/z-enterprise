# PROTOTYPE SCOPE CONTRACT (v5.0)
# Z Enterprise — Role-Centric Management & Multi-Tier Executive Platform

> **Status:** FULLY ALIGNED TO USER DIRECTIVES & EXECUTIVE DASHBOARD UPGRADES (CLEAN MINIMALISM)  
> **Source Baseline:** [`initiative.md`](../input/initiative.md) (PO Decisions `D-001` đến `D-012`), User Feedback  
> **Design Philosophy:** **Clean Minimalism / Neutral Product UI Contract** (Giao diện phẳng tối giản, 100% không sticker/emoji trang trí, đường nét tinh tế 1px, độ tương phản văn bản cao, chuẩn mực B2B SaaS Enterprise).  
> **Target Viewport:** Desktop Admin Console & Workspace (1440 × 900 px tiêu chuẩn, responsive container).

---

## 1. MỤC TIÊU & NGUYÊN TẮC QUY HOẠCH ĐIỀU HÀNH V5.1

1. **Hệ Thống Bàn Điều Hành Trực Quan 3 Cấp Quản Trị (Multi-Tier Executive Dashboards):**
   - Đáp ứng trọn vẹn yêu cầu quản trị từ C-Level (HQ) đến Lãnh đạo Vùng và Trưởng Chi nhánh.
   - Trả lời tức thì các câu hỏi điều hành cốt lõi: *"Vùng nào đang ok nhất?", "Chi nhánh nào đang vận hành tốt nhất, chi nhánh nào gặp sự cố?", "Nhân sự kinh doanh nào xuất sắc nhất, ai đang quá tải cần san tải?"*
2. **Biểu Đồ Trực Quan Tự Thân (Native High-Precision SVG Charts):**
   - Biểu đồ Cột SVG So Sánh Tương Quan Quota & Tài Khoản Hoạt Động 3 Vùng (Super Admin).
   - Biểu đồ Năng Lực & Tải Khai Thác 3 Chi Nhánh (Region Admin) với cảnh báo đỏ trực quan tại điểm Zero Quota.
   - Biểu đồ Tỷ Trọng Danh Mục & Cân Bằng Tải Khách Hàng (Branch Admin) kết hợp Stacked Macro Bar 100% và chỉ số đáp ứng SLA.
3. **Bảng Xếp Hạng & Sức Khỏe Vận Hành Đa Tiêu Chí (Benchmark Scorecards & Rankings):**
   - Badge xếp hạng chữ nhật chuẩn mực (Hạng 1, Hạng 2, Hạng 3, Cần Điều Chỉnh, Báo Động Đỏ) không sử dụng biểu tượng cảm xúc.
   - Điểm số sức khỏe vận hành (`Health Score / 100`) tính toán trên các tiêu chí: Quota khả dụng, Tỷ lệ kích hoạt <24h, Mức độ quá tải khách hàng, Tình trạng sự cố.
4. **Phong Cách Thiết Kế Clean Minimalism Chuẩn B2B SaaS Enterprise:**
   - Giao diện phẳng tối giản, viền mảnh 1px, loại bỏ hoàn toàn sticker/emoji và bóng đổ morphic nặng nề. Thẻ định danh doanh nghiệp FPT phẳng thanh lịch, giao diện chat Omnichannel đa nguồn hiển thị trọn vẹn trong viewport 1440 × 900 px.
5. **100% Thuật Ngữ Nghiệp Vụ Doanh Nghiệp Thực Tế (Zero Technical Jargon):**
   - Giao tiếp hoàn toàn bằng ngôn từ điều hành kinh doanh viễn thông FPT Telecom.

---

## 2. KIẾN TRÚC 5 ROLES & CHI TIẾT BÀN ĐIỀU HÀNH TỪNG LEVEL

| Role | Persona Đại Diện | Đơn Vị & Phạm Vi Quản Trị | Bàn Điều Hành, Biểu Đồ & Bảng Xếp Hạng V5.0 |
|---|---|---|---|
| **1. Super Admin** | Vũ Minh Tuấn | Trụ sở FPT Telecom (Toàn Quốc)<br/>• 4,500 Quota Tổng • 3 Vùng | • **Biểu đồ Cột SVG 3 Vùng:** So sánh Hạn ngạch cấp vs Tài khoản Active vs Dự phòng Vùng.<br/>• **Bảng Xếp Hạng & Sức Khỏe 3 Vùng (National Scorecard):**<br/>&nbsp;&nbsp;[Hạng 1] *Vùng Miền Trung* (96/100 Điểm, Tối ưu & Dồi dào Quota, Kích hoạt SLA 98.2%, 0 sự cố).<br/>&nbsp;&nbsp;[Hạng 2] *Vùng Miền Bắc* (89/100 Điểm, Chuẩn mực & Cân bằng, Kích hoạt SLA 92.5%).<br/>&nbsp;&nbsp;[Hạng 3] *Vùng Miền Nam* (74/100 Điểm, Quá tải 96%, Cảnh báo 1 Chi nhánh Zero Quota HCM 02).<br/>• **Thẻ Dự Báo Quota Quý 4/2026** & Cây cơ cấu tổ chức 3 cấp. |
| **2. Region Admin** | Trần Đình Trọng | Ban Điều Hành Vùng Miền Nam<br/>• 2,500 Quota • 3 Chi Nhánh | • **Biểu đồ Năng Lực & Tải Vận Hành 3 Chi Nhánh:** Trực quan hóa số lượng và mức an toàn Quota.<br/>• **Bảng Xếp Hạng & Sức Khỏe 3 Chi Nhánh (Regional Benchmark):**<br/>&nbsp;&nbsp;[Hạng 1] *Chi nhánh HCM 01 - Tân Bình* (94/100 Điểm, Vận hành Tốt nhất Vùng, 24 Quota khả dụng, 96% kích hoạt SLA).<br/>&nbsp;&nbsp;[Hạng 2] *Chi nhánh Đồng Nai* (90/100 Điểm, Ổn định & Dồi dào, 15 Quota khả dụng).<br/>&nbsp;&nbsp;[Cần Điều Chỉnh] *Chi nhánh HCM 02 - Phú Nhuận* (58/100 Điểm, Báo động Zero Quota, 5 nhân sự chờ cấp, nút **"Bơm Cấp 20 Quota Ngay"**).<br/>• Phê duyệt đề xuất xin Quota và điều tiết Quota nội bộ Vùng. |
| **3. Branch Admin** | Lê Hoàng Nam | Chi nhánh HCM 01 - Tân Bình<br/>• 300 Quota • 281 Nhân Sự | • **Biểu đồ Tỷ Trọng Khách Hàng (Customer Portfolio Share SVG):** Stacked bar 272 KH chi nhánh.<br/>• **Bảng Xếp Hạng & Sức Khỏe Nhân Sự Kinh Doanh (Sales Rep Scorecard):**<br/>&nbsp;&nbsp;[Hạng 1] *Trần Thị B* (65 KH, SLA 98.5%, Phản hồi 12p, Điểm 98/100 - Xuất sắc nhất chi nhánh).<br/>&nbsp;&nbsp;[Hạng 2] *Nguyễn Văn A* (48 KH, SLA 96.0%, Phản hồi 18p, Điểm 94/100 - Chuẩn mực).<br/>&nbsp;&nbsp;[Cần Điều Chỉnh] *Phạm Văn D* (127 KH - Quá tải 47%, Nghỉ việc 30/09, SLA 84.0%, Điểm 62/100 - Cần bàn giao khẩn).<br/>&nbsp;&nbsp;[Khóa] *Lê Văn C* (32 KH, Tạm khóa, Điểm 50/100).<br/>&nbsp;&nbsp;[Chờ Kích Hoạt] *Vũ Minh K* (Thư mời còn 46h).<br/>• **Phương Án Cân Bằng Tải Chi Nhánh (Kịch bản san tải):** Kịch bản san tải 127 KH trước ngày 30/09. |
| **4. Sales Rep** | Nguyễn Văn A | Chuyên Viên Kinh Doanh<br/>• Chi nhánh HCM 01<br/>• TK: ZENT-001293 • 48 KH | • Thẻ định danh doanh nghiệp FPT (`ZENT-001293`).<br/>• Omnichannel Chat Ribbon: Zalo Doanh Nghiệp (Chính), Zalo OA, Portal, Messenger, Website.<br/>• Sub-toolbar chọn tài khoản, pills lọc hội thoại (Tất cả, Chưa đọc, Đã đọc, Nhóm).<br/>• Empty state "Chưa có phòng chat nào được chọn" chuẩn mực.<br/>• Modal Tạo Nhóm Zalo Doanh Nghiệp & Modal Lời Mời Kết Bạn B2B. |
| **5. Legal & Audit** | Đỗ Hoàng Mai | Ban Pháp Chế & KSNB FPT<br/>• Toàn Hệ Thống • 100% Masked Phone | • Giám sát tuân thủ bảo mật dữ liệu khách hàng (100% Masked SĐT `090****567`).<br/>• Sổ nhật ký kiểm toán hành chính bất biến (Immutable Audit Ledger) hỗ trợ xuất CSV.<br/>• Bộ nhận diện nguy cơ thất thoát dữ liệu và Break-Glass Emergency Override. |

---

## 3. THÔNG SỐ ĐIỀU HƯỚNG DEEP-LINK TRỰC TIẾP

Prototype hỗ trợ đầy đủ các tham số trực tiếp qua Hash (`#`) hoặc Query (`?`):
- `index.html#persona=super_admin` — Bảng Điều Hành Toàn Quốc (HQ Telemetry + SVG Chart 3 Vùng + National Scorecard).
- `index.html#persona=region_admin` — Trung Tâm Chỉ Huy Vùng Miền Nam (Regional Cockpit + SVG Chart Chi Nhánh + Branch Scorecard + Nút Cấp Zero Quota).
- `index.html#persona=branch_admin` — Bàn Điều Hành Chi Nhánh HCM 01 (Branch Cockpit + SVG Customer Share Chart + Sales Rep Scorecard + Kịch Bản Cân Bằng Tải).
- `index.html#persona=sales_rep` — Không Gian Làm Việc Chuyên Viên Kinh Doanh (Chat đang chọn).
- `index.html#persona=sales_rep&chat=empty` — Trạng Thái Chờ (Chưa có phòng chat nào được chọn).
- `index.html#persona=sales_rep&modal=create_group` — Modal Tạo Nhóm Zalo Doanh Nghiệp.
- `index.html#persona=sales_rep&modal=friend_requests` — Modal Lời Mời Kết Bạn B2B.
- `index.html#persona=legal_audit` — Bảng Giám Sát Tuân Thủ & Kiểm Toán Nội Bộ.
- Thêm `&filter=open` — Tự động mở rộng Bảng điều khiển Bộ Lọc Nâng Cao Đa Tiêu Chí.



