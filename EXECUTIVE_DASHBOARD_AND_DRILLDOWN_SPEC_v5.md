# Z-Enterprise Management Platform — Executive Dashboard & Drill-down Specification
**Tài liệu Đặc tả Bàn Điều Hành Lãnh Đạo & Kiến Trúc Soi Chi Tiết (Drill-Down Telemetry)**  
*Mã tài liệu:* `SPEC-ISC-ZENT-DASHBOARD-v5.0` | *Phiên bản:* `v5.0-PROD` | *Ngày ban hành:* `24/09/2026`  
*Đơn vị chủ quản:* FPT Telecom — Trung Tâm Hệ Thống Thông Tin (ISC) & Ban Pháp Chế & Kiểm Soát Nội Bộ

---

## 1. TỔNG QUAN & MỤC TIÊU KIẾN TRÚC (EXECUTIVE SUMMARY)

Hệ thống Z-Enterprise Management Platform thiết lập bảng điều hành chỉ huy (Executive Dashboard) đa tầng phục vụ 5 nhóm đối tượng người dùng (Persona) với nguyên tắc bảo mật tối thượng: **"Phân quyền theo phạm vi địa lý (Geographic Scope), Giám sát theo định lượng vi mô (Micro-telemetry), và Bảo vệ quyền riêng tư cấp 5 (Privacy Level 5)"**.

### 1.1 Mục Tiêu Đo Lường Cốt Lõi
1. **Toàn vẹn Hạn ngạch (Quota Integrity):** Bảo toàn cân bằng phương trình hạn ngạch toàn quốc:
   $$\text{Quota Tổng Hợp Đồng (4,500)} = \text{Dự Phòng HQ (400)} + \sum \text{Hạn Ngạch 3 Vùng (4,100)}$$
2. **Cảnh báo sớm Thắt nút Cổ chai (Bottleneck Pre-emption):** Phát hiện trạng thái Zero Quota (cạn kiệt hạn ngạch tự do) tại các chi nhánh trước khi gây tắc nghẽn tuyển dụng và mở rộng kinh doanh.
3. **Giám sát Tải Nhân sự & Chống Thất thoát Tài sản (Workload & Asset Protection):** Duy trì tải danh mục khách hàng an toàn $\le 70\text{ KH/Sales}$ và đảm bảo 100% tài khoản của nhân sự thôi việc được thu hồi và bàn giao trong 24 giờ.

---

## 2. PHÂN HỆ ĐIỀU HÀNH 3 CẤP (HIERARCHICAL EXECUTIVE COCKPIT)

### 2.1 Cấp 1: Super Admin — Trụ Sở Chính (HQ FPT Telecom)
- **Phạm vi thẩm quyền:** Toàn quốc (National Scope).
- **Chỉ số điều hành then chốt (KPI Scorecard):**
  - **Tổng hạn ngạch hợp đồng:** 4,500 Quota (Gói Zalo Enterprise Business Enterprise).
  - **Hạn ngạch đã cấp cho các Vùng:** 4,100 Quota (Vùng Nam: 2,500 | Vùng Bắc: 1,200 | Vùng Trung: 400).
  - **Kho dự phòng chiến lược HQ:** 400 Quota (Sẵn sàng điều phối cấp cứu hoặc phân bổ bổ sung).
  - **Tài khoản đang hoạt động (Active Accounts):** 3,952 / 4,120 nhân sự biên chế kinh doanh.
  - **Chỉ số sức khỏe hệ thống (Health Score):** 96/100 (Dựa trên tỷ lệ khai dụng, số lượng chi nhánh Zero Quota, và vi phạm SLA).
- **Kiến trúc Soi Chi Tiết (Drill-Down Architecture):**
  - Cho phép Super Admin nhấp chọn trực tiếp từng Vùng (`REG_SOUTH`, `REG_NORTH`, `REG_CENTRAL`) để mở rộng ma trận chi nhánh trực thuộc mà không cần đăng xuất hoặc chuyển đổi tài khoản.
  - Cung cấp tính năng **Cưỡng Chế Thu Hồi Quota (Pull Reclaim - US02)** từ các Vùng dư thừa về kho dự phòng HQ kèm ràng buộc lý do $\ge 10\text{ ký tự}$.
  - Cung cấp **Hàng Đợi Phê Duyệt Quota Vĩ Mô** tiếp nhận đề xuất từ Region Admin.

### 2.2 Cấp 2: Region Admin — Ban Điều Hành Vùng (Vùng Miền Nam)
- **Phạm vi thẩm quyền:** Vùng Miền Nam (South Region — 2,450 Nhân sự, 15 Chi nhánh).
- **Chỉ số điều hành then chốt (KPI Scorecard):**
  - **Hạn ngạch Vùng được giao:** 2,500 Quota.
  - **Đã cấp cho 15 Chi nhánh:** 2,400 Quota (HCM 01: 300 | HCM 02: 200 | Đồng Nai: 150 | 12 Vệ tinh: 1,750).
  - **Kho dự phòng Vùng Miền Nam:** 100 Quota (Dùng để can thiệp nhanh các điểm nóng).
  - **Tài khoản đang vận hành:** 2,400 tài khoản.
  - **Cảnh báo Điểm nóng:** 1 Chi nhánh Zero Quota (HCM 02) và 5 nhân sự mới chưa được cấp tài khoản.
- **Cơ chế Cân Đối Hạn Ngạch Nội Bộ Vùng (Inter-Branch Quota Balancer):**
  - Trực tiếp trích Quota dự phòng từ Chi nhánh dồi dào (Đồng Nai thừa 15 Quota) hoặc Kho Vùng (100 Quota) bơm sang Chi nhánh cạn kiệt (HCM 02).
  - Tự động giải tỏa trạng thái báo động đỏ mà không làm thay đổi tổng quota của toàn Vùng.

### 2.3 Cấp 3: Branch Admin — Chỉ Huy Chi Nhánh (HCM 01 - Tân Bình)
- **Phạm vi thẩm quyền:** Chi nhánh HCM 01 (281 Nhân sự).
- **Chỉ số điều hành then chốt (KPI Scorecard):**
  - **Hạn ngạch chi nhánh:** 300 Quota.
  - **Tài khoản đã gán:** 276 tài khoản Active.
  - **Hạn ngạch khả dụng (Free Quota):** 24 Quota (Duy trì vùng an toàn).
  - **Hiệu suất phản hồi SLA (< 15 phút):** 98.4%.
  - **Cảnh báo Khách hàng Bỏ sót (> 48h):** Giám sát trực tiếp các cuộc hội thoại chưa được trả lời quá 48 giờ (Khách hàng CTCP Xây Dựng Hải Nam - 50h).
  - **Cảnh báo Rủi ro Thất thoát:** Phát hiện nhân sự đã thôi việc trên HR nhưng tài khoản chưa được thu hồi (Đoàn Thanh L - EMP-00137).
- **Biểu Đồ Kép Trực Quan (Dual Visual Analytics):**
  - *Biểu đồ 1:* Phân bổ tải danh mục khách hàng theo nhân sự (Workload Distribution) kèm ngưỡng an toàn $\le 70\text{ KH}$.
  - *Biểu đồ 2:* Tiến độ xử lý SLA phản hồi khách hàng theo thời gian thực (Real-time SLA Compliance).

---

## 3. MÔ TẢ DỮ LIỆU & RÀNG BUỘC NGHIỆP VỤ (DATA CONTRACT & RULES)

```
========================================================================================
LEVEL 1: TRỤ SỞ CHÍNH HQ (FPT TELECOM)
Total Contract Quota: 4,500
Allocated to Regions: 4,100 (91.1%)
HQ Reserve Quota:       400 ( 8.9%)
Active Accounts:      3,952 / 4,120 Nhân sự
----------------------------------------------------------------------------------------
   |-- VÙNG MIỀN NAM (REG_SOUTH): Allocated = 2,500 | Assigned = 2,400 | Reserve = 100
   |   |-- Chi nhánh HCM 01 (HCM01):   Allocated = 300 | Assigned = 276 | Free = 24
   |   |-- Chi nhánh HCM 02 (HCM02):   Allocated = 200 | Assigned = 200 | Free =  0 (ZERO!)
   |   |-- Chi nhánh Đồng Nai (DNG01): Allocated = 150 | Assigned = 135 | Free = 15
   |   `-- 12 Chi nhánh vệ tinh khác:  Allocated = 1750| Assigned = 1689| Free = 61
   |
   |-- VÙNG MIỀN BẮC (REG_NORTH): Allocated = 1,200 | Assigned = 1,000 | Reserve = 200
   |   |-- Chi nhánh Hà Nội 01 (HAN01): Allocated = 250 | Assigned = 220 | Free = 30
   |   |-- Chi nhánh Hải Phòng (HPG01):  Allocated = 150 | Assigned = 130 | Free = 20
   |   `-- Các chi nhánh khác Miền Bắc: Allocated = 600 | Assigned = 550 | Free = 50
   |
   `-- VÙNG MIỀN TRUNG (REG_CENTRAL): Allocated = 400 | Assigned = 300 | Reserve = 100
       |-- Chi nhánh Đà Nẵng 01 (DAN01): Allocated = 200 | Assigned = 170 | Free = 30
       `-- Các chi nhánh khác Miền Trung:Allocated = 100 | Assigned =  80 | Free = 20
========================================================================================
```

### 3.1 Quy Tắc Bất Biến Về Hạn Ngạch (Quota Invariants)
1. **BR-QUOTA-01 (Bảo Toàn Tổng Hạn Ngạch):** Không có bất kỳ hành động nào được tự ý sinh thêm Quota vượt quá 4,500 trừ khi có hợp đồng bổ sung từ Zalo Business.
2. **BR-QUOTA-02 (Kiểm Tra Số Dư Khả Dụng):** Thao tác cấp phát tài khoản nhân sự chỉ hợp lệ khi `Branch.FreeQuota > 0`. Khi `FreeQuota == 0`, hệ thống khóa chức năng cấp tài khoản và kích hoạt cảnh báo Zero Quota.
3. **BR-QUOTA-03 (Hoàn Lại Hạn Ngạch Khi Bàn Giao/Thu Hồi):** Khi hoàn tất bàn giao danh mục khách hàng và lưu trữ tài khoản của nhân sự thôi việc, hệ thống hoàn trả đúng 1 Quota về kho khả dụng của Chi nhánh:
   $$\text{Branch.FreeQuota}_{\text{new}} = \text{Branch.FreeQuota}_{\text{old}} + 1$$

---

## 4. MA TRẬN TƯƠNG TÁC THEO ACCEPTANCE CRITERIA (AC MAPPING)

| Mã AC | Tiêu Chuẩn Nghiệp Vụ | Hành Vi Prototype Đã Kiểm Chứng |
|---|---|---|
| **AC-01.1** | Phân quyền hiển thị theo Role Scope | Super Admin xem toàn quốc; Region Admin xem Vùng Nam; Branch Admin chỉ xem HCM 01; Sales chỉ xem tài khoản cá nhân. |
| **AC-02.1** | Cảnh báo tắc nghẽn Zero Quota | HCM 02 hiển thị cảnh báo đỏ và liệt kê danh sách 5 nhân sự mới bị chặn khởi tạo tài khoản. |
| **AC-02.2** | Cân đối hạn ngạch nội bộ Vùng | Nút "Thực Hiện Cân Đối" và "Bơm Cấp 20 Quota Ngay" trực tiếp điều chuyển quota giữa các chi nhánh, cập nhật KPI ngay lập tức. |
| **AC-03.1** | Khấu trừ Quota khi cấp mới | Cấp tài khoản mới cho Đặng Thị H ngay lập tức trừ 1 Quota của HCM 01 (24 $\rightarrow$ 23). |
| **AC-03b** | Tạm khóa tài khoản bắt buộc lý do $\ge 10$ ký tự | Form tạm khóa chặn submit và báo lỗi đỏ nếu lý do trống hoặc $< 10$ ký tự. |
| **AC-03c** | Tác động 2 chiều khi Sales bị tạm khóa | Khi Nguyễn Văn A bị tạm khóa, chuyển sang Persona Sales sẽ hiển thị Banner cảnh báo và khóa ô nhập chat. |
| **AC-04.1** | Cảnh báo vi phạm SLA phản hồi | Cảnh báo đỏ khách hàng Hải Nam chờ 50h ($> 48\text{h}$). Khi Sales phản hồi, vi phạm lập tức được xóa bỏ. |
| **AC-07.1** | Bàn giao kèm Bot chào (Throttling $\le 5$ tin/giây) | Mô phỏng tốc độ gửi tin chống spam Zalo, lưu trữ tài khoản cũ và hoàn 1 Quota khả dụng. |
| **AC-10.1** | Can thiệp khẩn cấp Break-Glass xác thực kép | Quy trình 2 bước: Super Admin OTP + Pháp chế OTP và ghi nhận nhật ký kiểm toán không thể xóa. |

---

## 5. KẾT LUẬN & HƯỚNG DẪN KIỂM THỬ

Tài liệu đặc tả này là căn cứ kỹ thuật để thẩm định tính toàn vẹn của giao diện nguyên mẫu (Interactive Prototype v3.5). Toàn bộ 87 điểm tương tác, hệ thống biểu đồ trực quan, và các ràng buộc nghiệp vụ phải thỏa mãn 100% các tiêu chí trong tài liệu này trước khi tiến hành nghiệm thu UAT (Step 4 FPT ISC).
