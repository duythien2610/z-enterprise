# HƯỚNG DẪN SỬ DỤNG HỆ THỐNG Z-ENTERPRISE PLATFORM
## SỔ TAY VẬN HÀNH DÀNH CHO CÁC CẤP QUẢN TRỊ & NHÂN SỰ KINH DOANH
### (Z-Enterprise Role-Based Operational User Guide & Business Rules Standard)

> **Mã tài liệu:** `ISC_ZENT_USER_GUIDE_v1.0`  
> **Dự án:** Z-Enterprise — Nền Tảng Quản Trị Phân Phối Hạn Ngạch & Tác Nghiệp Bán Hàng Tập Trung  
> **Cơ quan ban hành:** Ban Đảm Bảo Chất Lượng FPT ISC & Khối Kinh Doanh B2B FPT Telecom  
> **Phiên bản chuẩn hóa:** v1.0 (Đồng bộ PRD v1.3-REBASELINED & Prototype v5.1 Clean Minimalism)  
> **Ngày hiệu lực:** 25/09/2026  

---

## MỤC LỤC TỔNG QUAN

1. [TỔNG QUAN VỀ HỆ THỐNG Z-ENTERPRISE PLATFORM](#1-tổng-quan-về-hệ-thống-z-enterprise-platform)
   - 1.1. Bối Cảnh & Mục Tiêu Hệ Thống
   - 1.2. Ba Trụ Cột Vận Hành Cốt Lõi
   - 1.3. Mô Hình Phân Quyền 5 Vai Trò (RBAC Architecture)
2. [HƯỚNG DẪN CHI TIẾT THEO TỪNG VAI TRÒ (ROLE-BASED GUIDE & BUSINESS RULES)](#2-hướng-dẫn-chi-tiết-theo-từng-vai-trò)
   - 2.1. [SUPER ADMIN (HQ) — Lãnh Đạo Trụ Sở FPT Telecom](#21-super-admin-hq--lãnh-đạo-trụ-sở-fpt-telecom)
     - Phân hệ 1: Trung Tâm Điều Hành Quota Toàn Quốc (HQ Telemetry & Scorecard)
     - Phân hệ 2: Phân Bổ Hạn Ngạch 3 Vùng (Quota Allocation Engine)
     - Phân hệ 3: Cơ Cấu Tổ Chức & Cây Phân Cấp Doanh Nghiệp (Organizational Hierarchy)
     - Phân hệ 4: Chính Sách Bảo Mật & Quản Trị Hệ Thống (System Policies & Timeout)
   - 2.2. [REGION ADMIN — Ban Điều Hành Vùng Kinh Doanh (Miền Nam)](#22-region-admin--ban-điều-hành-vùng-kinh-doanh)
     - Phân hệ 1: Trung Tâm Chỉ Huy Vùng Miền Nam (Regional Cockpit Dashboard)
     - Phân hệ 2: Điều Tiết Quota Nội Bộ Vùng & Bơm Quota Cấp Cứu
     - Phân hệ 3: Hàng Đợi Phê Duyệt Đề Xuất Quota Từ Chi Nhánh
     - Phân hệ 4: Điều Chuyển Nhân Sự & Hạn Ngạch Liên Chi Nhánh (Inter-Branch Transfer)
   - 2.3. [BRANCH ADMIN — Trưởng Chi Nhánh Kinh Doanh (HCM 01 - Tân Bình)](#23-branch-admin--trưởng-chi-nhánh-kinh-doanh)
     - Phân hệ 1: Bàn Điều Hành Chi Nhánh & Cảnh Báo Bỏ Sót SLA (Branch Cockpit)
     - Phân hệ 2: Cấp Mới Tài Khoản Tự Chủ Bằng Email FPT (Account Lifecycle)
     - Phân hệ 3: Tạm Khóa & Mở Khóa Tài Khoản Nhân Viên (AC-03b / AC-03c)
     - Phân hệ 4: Bàn Giao Danh Bạ Kèm Bot Chào Tự Động Throttling (US07 / FR07)
     - Phân hệ 5: Phương Án Cân Bằng Tải Khách Hàng Nội Bộ (Workload Rebalancing)
   - 2.4. [SALES REPRESENTATIVE — Chuyên Viên Kinh Doanh B2B](#24-sales-representative--chuyên-viên-kinh-doanh)
     - Phân hệ 1: Thẻ Định Danh Doanh Nghiệp FPT (Enterprise ID Card)
     - Phân hệ 2: Thanh Kênh Hội Thoại Đa Nguồn Hợp Nhất (Omnichannel Ribbon)
     - Phân hệ 3: Không Gian Chat B2B & Soạn Thảo Tin Nhắn Nhanh (Smart Composer)
     - Phân hệ 4: Gọi Thoại 1-1 Qua Zalo Doanh Nghiệp & Ghi Nhận Metadata (US05)
     - Phân hệ 5: Tạo Nhóm Zalo Doanh Nghiệp & Duyệt Lời Mời Kết Bạn B2B
   - 2.5. [LEGAL & AUDIT — Ban Pháp Chế & Kiểm Soát Nội Bộ](#25-legal--audit--ban-pháp-chế--kiểm-soát-nội-bộ)
     - Phân hệ 1: Bảng Giám Sát Tuân Thủ & Rủi Ro Dữ Liệu (Compliance Dashboard)
     - Phân hệ 2: Khóa Khẩn Cấp Xác Thực Kép Break-Glass (US10 / FR08)
     - Phân hệ 3: Sổ Nhật Ký Kiểm Toán Bất Biến & Xuất Báo Cáo CSV (Audit Ledger)
3. [MA TRẬN PHÂN QUYỀN CHỨC NĂNG (RBAC CAPABILITY MATRIX)](#3-ma-trận-phân-quyền-chức-năng-rbac-capability-matrix)
4. [HƯỚNG DẪN XỬ LÝ NGOẠI LỆ & CÂU HỎI THƯỜNG GẶP (FAQS)](#4-hướng-dẫn-xử-lý-ngoại-lệ--câu-hỏi-thường-gặp-faqs)

---

# 1. TỔNG QUAN VỀ HỆ THỐNG Z-ENTERPRISE PLATFORM

### 1.1. Bối Cảnh & Mục Tiêu Hệ Thống
Trước khi triển khai Z-Enterprise, đội ngũ kinh doanh FPT Telecom sử dụng tài khoản Zalo cá nhân để giao tiếp với khách hàng. Thực trạng này dẫn đến 3 rủi ro chí mạng:
1. **Thất thoát tài sản số:** Khi nhân viên kinh doanh (Sales) nghỉ việc hoặc chuyển đơn vị, danh bạ khách hàng bị mang đi theo tài khoản cá nhân, công ty mất hoàn toàn dấu vết tương tác.
2. **Lãng phí hạn ngạch (Quota):** Hạn ngạch tài khoản doanh nghiệp được mua từ Zalo cấp phát thủ công, thiếu cơ chế giám sát dẫn đến tình trạng chi nhánh thừa bỏ phí, chi nhánh thiếu không có để dùng.
3. **Vi phạm pháp lý bảo mật (Privacy Level 5):** Khách hàng doanh nghiệp bị lộ số điện thoại, nhân sự đã nghỉ việc vẫn tiếp tục giao dịch với danh nghĩa nhân viên công ty.

**Z-Enterprise Platform** ra đời nhằm:
- Thiết lập quyền sở hữu tập trung toàn bộ danh bạ khách hàng của FPT Telecom.
- Tự động hóa điều tiết hạn ngạch Quota theo cơ chế phân tầng 3 cấp minh bạch.
- Cung cấp môi trường tác nghiệp bán hàng đa kênh chuẩn hóa (Omnichannel B2B Workspace).
- Kiểm soát tuân thủ và bảo vệ dữ liệu khách hàng tuyệt đối theo quy định của Ban Pháp chế & KSNB.

---

### 1.2. Ba Trụ Cột Vận Hành Cốt Lõi

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Z-ENTERPRISE ARCHITECTURE                       │
├─────────────────────┬──────────────────────────┬───────────────────────┤
│  1. QUOTA POOLING   │  2. ZERO PERSONAL ASSET  │  3. PRIVACY LEVEL 5   │
│  Phân cấp 3 tầng:   │  Danh bạ & Chat thuộc về │  Ẩn số điện thoại:    │
│  HQ -> Vùng -> CN.  │  công ty; bàn giao tự    │  090****567; ghi nhận │
│  Pull & Push Model  │  động kèm Bot chào <=5/s │  Metadata cuộc gọi    │
└─────────────────────┴──────────────────────────┴───────────────────────┘
```

---

### 1.3. Mô Hình Phân Quyền 5 Vai Trò (RBAC Architecture)

Hệ thống được thiết kế theo đúng thẩm quyền nghiệp vụ thực tế tại FPT Telecom:
1. **Super Admin (HQ Admin):** Quản trị kho hạn ngạch toàn quốc (4,500 Quota), điều phối vĩ mô giữa 3 Vùng kinh doanh.
2. **Region Admin (Trưởng Ban Vùng):** Quản trị kho Quota Vùng (2,500 Quota Miền Nam), điều tiết hạn ngạch giữa các chi nhánh trực thuộc, cứu trợ chi nhánh Zero Quota.
3. **Branch Admin (Trưởng Chi Nhánh):** Quản trị Quota chi nhánh (300 Quota), cấp mới/tạm khóa/thu hồi tài khoản nhân sự kinh doanh, giám sát SLA và tổ chức bàn giao danh bạ.
4. **Sales Representative (Chuyên Viên Kinh Doanh):** Sử dụng tài khoản doanh nghiệp chính danh, tác nghiệp chat đa kênh B2B, gửi mẫu báo giá chuẩn hóa, gọi điện thoại bảo mật.
5. **Legal & Internal Audit (Ban Pháp Chế & KSNB):** Giám sát bảo mật dữ liệu, rà soát nhật ký kiểm toán bất biến, thực thi quyền can thiệp đặc quyền Break-Glass khi phát hiện vi phạm.

---

# 2. HƯỚNG DẪN CHI TIẾT THEO TỪNG VAI TRÒ

---

## 2.1. SUPER ADMIN (HQ) — LÃNH ĐẠO TRỤ SỞ FPT TELECOM

* **Persona mặc định:** Vũ Minh Tuấn — Trưởng Phòng Quản Trị Hệ Thống Trụ Sở FPT Telecom
* **Phạm vi quản lý:** Toàn quốc (3 Vùng: Miền Bắc, Miền Trung, Miền Nam; Tổng kho: 4,500 Quota)
* **Mã vai trò hệ thống:** `ROLE_SUPER_ADMIN`

```
┌────────────────────────────────────────────────────────────────────────┐
│                      SUPER ADMIN — WORKSPACE SITEMAP                   │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Trung Tâm Điều Hành Quota Toàn Quốc (HQ Telemetry & Scorecard)      │
│ 2. Phân Bổ Hạn Ngạch 3 Vùng (Quota Allocation & Pull/Push Engine)      │
│ 3. Cây Cơ Cấu Tổ Chức & Doanh Nghiệp (Organizational Hierarchy)        │
│ 4. Chính Sách Bảo Mật & Quản Trị Hệ Thống (System Policies & Timeout)  │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Phân Hệ 1: Trung Tâm Điều Hành Quota Toàn Quốc (HQ Telemetry & Scorecard)

#### 1. Mục đích & Mục tiêu
- **Mục đích:** Cung cấp góc nhìn toàn cảnh về tài nguyên hạn ngạch Zalo Enterprise của toàn tập đoàn FPT Telecom theo thời gian thực.
- **Mục tiêu:**
  - Nhận diện tức thì tình trạng phân bổ Quota giữa các miền: Tổng hạn ngạch đã mua, đã phân bổ cho các Vùng, và lượng dự phòng tại Trụ sở (HQ Buffer).
  - So sánh tốc độ khai thác và sức khỏe vận hành giữa 3 Vùng kinh doanh để ra quyết định điều chuyển chiến lược.
  - Dự báo nhu cầu hạn ngạch trong các quý tiếp theo (Q4/2026).

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR01-01 (Định Mức 1-1 Bất Biến)`: 1 Quota = 1 Tài khoản Zalo Enterprise gán cho 1 nhân viên kinh doanh (`D-001`). Tuyệt đối không cho phép over-subscription (không thể tạo tài khoản khi Quota Pool = 0).
- `BR01-02 (Cây Phân Bổ Bất Biến)`: Dòng chảy Quota tuần tự theo thứ bậc: `Company Pool ↔ Region Pool ↔ Branch Pool` (`D-008`). Cấm cấp thẳng Quota từ Trụ sở HQ vượt cấp xuống nhân viên tại chi nhánh.
- `BR01-03 (Bảo Toàn Quota Khả Dụng)`: Tổng Quota toàn hệ thống tại mọi thời điểm bảo toàn theo công thức:  
  $$\text{Tổng Quota Hợp Đồng (4,500)} = \text{Company Pool} + \sum(\text{Region Pools}) + \sum(\text{Branch Pools}) + \sum(\text{Active/Suspended Accounts})$$
- `BR01-07 (Dự Báo Nhu Cầu Quota Vĩ Mô)`: Hệ thống tự động phân tích tốc độ tiêu thụ Quota trung bình 30 ngày qua của từng Vùng. Khi số dư Quota dự phòng của một Vùng dự kiến chạm ngưỡng cạn kiệt trong vòng dưới 45 ngày (ví dụ: Miền Nam tăng 18%/tháng, kho dự phòng HQ sắp cạn), hệ thống kích hoạt cảnh báo vĩ mô và tạo đề xuất mua bổ sung gói Quota đối tác Zalo.
- `BR01-08 (Cơ Chế Giám Sát Cấp Bậc Xuyên Tầng - Hierarchical Drill-Down)`: Bàn điều hành Super Admin hỗ trợ thanh điều hướng cấp bậc (Drill-Down Pills) cho phép soi chi tiết từng Vùng (danh sách chi nhánh trực thuộc, phát hiện ngay đơn vị rơi vào tình trạng **Zero Quota** như HCM 02 kèm nút Bơm Quota cấp cứu).

#### 3. Ý nghĩa các chỉ số đo lường
- **Tổng Quota Toàn Quốc (4,500):** Tổng lượng bản quyền tài khoản Zalo Enterprise FPT Telecom đã mua trả trước.
- **Đã Cấp Cho 3 Vùng (4,025):** Lượng Quota đã giao quyền cho Ban Điều Hành 3 Vùng tự chủ phân bổ.
- **Dự Phòng Kho HQ (475):** Số Quota nhàn rỗi tại Trụ sở, sẵn sàng ứng cứu khi có Vùng tăng trưởng đột biến.
- **Tài Khoản Đang Hoạt Động (Active Accounts - 3,890):** Số lượng nhân viên kinh doanh thực tế đang sử dụng tài khoản để bán hàng.
- **Tỷ Lệ Kích Hoạt SLA (94.8%):** Tỷ lệ tài khoản phát sinh tương tác chăm sóc khách hàng trong vòng 24 giờ sau khi được cấp.

#### 4. Đọc hiểu Biểu đồ Cột SVG 3 Vùng & Bảng Xếp Hạng National Scorecard
- **Biểu đồ Cột 3 Vùng:** So sánh trực quan giữa 3 thông số của từng Vùng:
  - *Cột Xanh Dương:* Hạn ngạch HQ cấp cho Vùng.
  - *Cột Xanh Lá:* Số tài khoản nhân viên đang sử dụng thực tế.
  - *Cột Cam:* Hạn ngạch dự phòng còn dư tại kho Vùng.
- **Bảng Xếp Hạng Quốc Gia (National Scorecard):**
  - `[Hạng 1] Vùng Miền Trung (Điểm sức khỏe: 96/100)`: Tối ưu & Dồi dào Quota (Cấp 800, Active 568, Dự phòng 232). SLA đạt 98.2%, 0 sự cố.
  - `[Hạng 2] Vùng Miền Bắc (Điểm sức khỏe: 89/100)`: Vận hành ổn định (Cấp 1,200, Active 984, Dự phòng 216). SLA đạt 92.5%.
  - `[Hạng 3] Vùng Miền Nam (Điểm sức khỏe: 74/100)`: **Báo động quá tải** (Cấp 2,500, Đã cấp chi nhánh 2,400, Dự phòng chỉ còn 100 Quota). Đặc biệt có Chi nhánh HCM 02 rơi vào trạng thái cạn kiệt Quota.

#### 5. Quy trình thao tác chuẩn
1. Đăng nhập hệ thống, chọn vai trò **Super Admin** trên thanh công cụ trên cùng.
2. Tại màn hình **Trung Tâm Điều Hành**, rà soát thẻ KPI tổng quan và cảnh báo màu tại bảng National Scorecard.
3. Khi nhận thấy Vùng Miền Nam có điểm sức khỏe giảm xuống ngưỡng vàng/đỏ (`74/100`), nhấp chuột vào nút **"Soi Vùng Miền Nam"** trên bảng xếp hạng để hệ thống tự động điều hướng sang góc nhìn chỉ huy của Vùng Miền Nam.

---

### Phân Hệ 2: Phân Bổ Hạn Ngạch 3 Vùng (Quota Allocation Engine)

#### 1. Mục đích & Mục tiêu
- **Mục đích:** Thực hiện các nghiệp vụ bơm thêm hạn ngạch (Push) hoặc thu hồi hạn ngạch dôi dư (Pull) giữa Trụ sở HQ và các Ban Điều Hành Vùng.
- **Mục tiêu:**
  - Ngăn ngừa tình trạng đứt gãy hoạt động bán hàng tại các Vùng trọng điểm.
  - Tối ưu hóa chi phí bản quyền, đảm bảo tỷ lệ sử dụng thực tế (Utilization Rate) luôn $\ge 90\%$.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR01-04 (Cơ Chế Cưỡng Chế Thu Hồi - Forced Reclaim Pull Model)`: Cấp trên có toàn quyền cưỡng chế thu hồi Quota nhàn rỗi (chưa gán vào tài khoản) từ cấp dưới về Pool của mình mà không cần sự chấp thuận của cấp dưới (`DEC-PO-06`).
- `BR01-05 (Chặn Thu Hồi Quota Đang Gán)`: Tuyệt đối không cho phép thu hồi các Quota đã được gán vào tài khoản đang `ACTIVE`, `SUSPENDED` hoặc `TRANSFER_PENDING`. Quota chỉ được thu hồi khi ở trạng thái khả dụng tự do trong Pool.
- `BR01-06 (Bảo Vệ Toàn Vẹn Số Dư Pool & Khóa Dòng Concurrency Lock)`: Mọi thao tác làm biến động số dư Quota Pool BẮT BUỘC thực thi trong Database Transaction có khóa dòng bi quan (`SELECT ... FOR UPDATE`).
- `AC-01.1.01 (Ràng Buộc Cấp Thêm Quota)`: Thao tác cấp thêm Quota cho Vùng chỉ hợp lệ khi:
  $$\text{Số Quota Cấp Thêm} \le \text{Số Dư Dự Phòng Tại Kho HQ}$$
- `AC-02.2.01 (Ràng Buộc Thu Hồi Quota)`: Thao tác thu hồi Quota từ Vùng về HQ chỉ hợp lệ khi:
  $$\text{Số Quota Thu Hồi} \le \text{Số Dư Khả Dụng Tự Do Của Vùng}$$

#### 3. Quy trình thao tác chuẩn
* **Tình huống 1: Bơm thêm 50 Quota cho Vùng Miền Nam:**
  1. Trong menu bên trái, nhấp vào **"Phân Bổ Hạn Ngạch 3 Vùng"**.
  2. Tại bảng dữ liệu Vùng Miền Nam, xác định dòng thông tin Quota.
  3. Nhấp vào nút **"+ Cấp Thêm 50 Quota Cho Vùng"**.
  4. Hệ thống thực hiện trừ 50 Quota tại Kho HQ (từ 475 còn 425), đồng thời cộng 50 Quota vào Kho Vùng Miền Nam (từ 100 lên 150). Hiển thị thông báo giao dịch thành công.
* **Tình huống 2: Thu hồi 30 Quota từ Vùng Miền Bắc về Trụ sở:**
  1. Nhấp vào nút **"Thu Hồi 30 Quota Về HQ"** trên dòng Vùng Miền Bắc.
  2. Hệ thống kiểm tra số dư dự phòng của Miền Bắc (hiện có 216 Quota > 30).
  3. Lệnh được phê duyệt: Kho HQ tăng thêm 30 Quota, kho Miền Bắc giảm 30 Quota tương ứng.

---

### Phân Hệ 3: Cơ Cấu Tổ Chức & Cây Phân Cấp Doanh Nghiệp (Organizational Hierarchy)

#### 1. Mục đích & Mục tiêu
- **Mục đích:** Quản lý mô hình phân cấp tổ chức 3 cấp của tập đoàn FPT Telecom: Trụ Sở Tập Đoàn (HQ) $\rightarrow$ Ban Điều Hành Vùng (Region) $\rightarrow$ Chi Nhánh Kinh Doanh (Branch).
- **Mục tiêu:** Đảm bảo ranh giới quản lý địa bàn và phân quyền dữ liệu tuyệt đối giữa các đơn vị kinh doanh.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR-ORG-01 (Mô Hình Cây Đơn Tuyến)`: Mỗi Chi nhánh chỉ thuộc về đúng 1 Vùng quản lý; mỗi nhân viên kinh doanh chỉ trực thuộc đúng 1 Chi nhánh tại một thời điểm (`D-002`).
- `BR-ORG-02 (Ranh Giới Dữ Liệu Địa Bàn)`: Người dùng chỉ được phép truy cập và xem dữ liệu khách hàng thuộc phạm vi đơn vị mình được phân quyền theo cấu trúc cây tổ chức.

#### 3. Quy trình thao tác chuẩn
1. Chọn mục **"Cơ Cấu Tổ Chức"** trên menu điều hướng bên trái.
2. Mở rộng cây đơn vị để xem chi tiết các phòng ban, số lượng nhân sự và hạn ngạch tương ứng của từng Chi nhánh.

---

### Phân Hệ 4: Chính Sách Bảo Mật & Quản Trị Hệ Thống (System Policies & Timeout)

#### 1. Mục đích & Mục tiêu
- **Mục đích:** Quy định thời gian tự động khóa phiên làm việc (Session Inactivity Timeout) và chính sách quản lý thiết bị trên toàn hệ thống để chống xâm nhập trái phép khi người dùng rời bàn làm việc.
- **Mục tiêu:** Tuân thủ tiêu chuẩn an toàn thông tin cấp tập đoàn do CSOC phê duyệt.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR04-01 (Loại Bỏ Giới Hạn Cứng Thiết Bị)`: Hệ thống không áp đặt giới hạn cứng số lượng thiết bị đăng nhập đồng thời, tạo điều kiện thuận lợi nhất để Sales linh hoạt làm việc trên Laptop công ty, PC tại văn phòng và Mobile di chuyển thị trường (`A-003`).
- `BR04-02 (Tự Động Hết Hạn Phiên Không Hoạt Động - Session Timeout)`: Hệ thống áp dụng chính sách tự động khóa màn hình và bắt buộc đăng nhập lại (Force Re-authentication) khi không có bất kỳ tương tác bàn phím/chuột nào sau một khoảng thời gian cấu hình:
  - Mức cấu hình tiêu chuẩn: `15 phút`, `30 phút (Mặc định khuyên dùng)`, `60 phút`, hoặc `120 phút`.
  - Khi hết hạn, ứng dụng khóa phiên an toàn và yêu cầu người dùng nhập lại mật khẩu / OTP email FPT.
- `BR04-03 (Bảo Mật Masking SĐT FPT Bắt Buộc)`: Toàn bộ số điện thoại khách hàng hiển thị trên giao diện của Admin các cấp và hồ sơ nhân sự bắt buộc phải được che 4 số giữa (ví dụ: `090****567`) tuân thủ Nghị định 13/2023/NĐ-CP.
- `BR04-04 (Đăng Xuất Khẩn Cấp Từ Xa - Remote Session Revocation)`: Super Admin có toàn quyền ngắt kết nối phiên làm việc của bất kỳ tài khoản nào trên toàn quốc khi phát hiện dấu hiệu vi phạm an ninh.

#### 3. Hướng dẫn thao tác
1. Chọn mục **"Chính Sách Bảo Mật"** tại thanh menu bên trái.
2. Tại trường **"Thời Gian Khóa Phiên Không Hoạt Động (FR04)"**, lựa chọn mức thời gian mong muốn: `15 phút`, `30 phút (Khuyến nghị)`, `60 phút`, hoặc `120 phút`.
3. Nhấp nút **"Lưu Cấu Hình Chính Sách"**. Thông số này ngay lập tức có hiệu lực và áp dụng đồng hồ đếm ngược trên thanh trạng thái của toàn bộ 5 nhóm người dùng.

---

## 2.2. REGION ADMIN — BAN ĐIỀU HÀNH VÙNG KINH DOANH (MIỀN NAM)

* **Persona mặc định:** Trần Đình Trọng — Trưởng Ban Điều Hành Vùng Miền Nam
* **Phạm vi quản lý:** Vùng Miền Nam (Gồm 15 Chi nhánh; 3 Chi nhánh trọng điểm: HCM 01 - Tân Bình, HCM 02 - Phú Nhuận, Đồng Nai; Quota Vùng: 2,500)
* **Mã vai trò hệ thống:** `ROLE_REGION_ADMIN`

```
┌────────────────────────────────────────────────────────────────────────┐
│                     REGION ADMIN — WORKSPACE SITEMAP                   │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Trung Tâm Chỉ Huy Vùng Miền Nam (Regional Cockpit Dashboard)        │
│ 2. Điều Tiết Hạn Ngạch & Bơm Quota Cấp Cứu (Quota Rebalancing)         │
│ 3. Phê Duyệt Đề Xuất Quota Từ Chi Nhánh (Approval Queue)               │
│ 4. Giám Sát Cấp Bậc & Điều Chuyển Liên Chi Nhánh (Drill-Down Transfer) │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Phân Hệ 1: Trung Tâm Chỉ Huy Vùng Miền Nam (Regional Cockpit Dashboard)

#### 1. Mục đích & Mục tiêu
- **Mục đích:** Trao quyền tự chủ cho Lãnh đạo Vùng quản trị và điều tiết 2,500 Quota được HQ giao phó, theo dõi sát sao tiến độ khai thác của từng Chi nhánh trực thuộc.
- **Mục tiêu:**
  - Phát hiện nhanh các điểm nóng kinh doanh: Chi nhánh nào đang tăng trưởng vượt bậc, chi nhánh nào rơi vào khủng hoảng cạn kiệt tài nguyên.
  - Phân tầng giám sát qua tính năng Lọc Cấp Bậc (Region Drill-Down) từ Vùng xuống từng Chi nhánh cụ thể.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR01-02 (Dòng Chảy Quota Vùng)`: Quota Vùng nhận từ Trụ sở HQ và chỉ được phân bổ cho các Chi nhánh trực thuộc Vùng Miền Nam.
- `BR01-08 (Cơ Chế Giám Sát Cấp Bậc Cấp Vùng)`: Cho phép Region Admin soi chi tiết từng Chi nhánh: danh sách nhân sự chờ Quota tại HCM 02, bảng phân bổ tải khách hàng tại HCM 01.
- `BR-REG-01 (Cảnh Báo Đỏ Zero Quota)`: Chi nhánh có Quota khả dụng = 0 và có nhân sự đang chờ cấp tài khoản onboard lập tức bị gắn nhãn cảnh báo đỏ `ZERO QUOTA` và điểm sức khỏe bị trừ xuống ngưỡng cảnh báo (<60đ).

#### 3. Ý nghĩa các chỉ số đo lường
- **Hạn Ngạch HQ Giao Cho Vùng (2,500):** Tổng hạn mức tối đa Vùng được quyền phân phối.
- **Đã Cấp Cho 15 Chi Nhánh (2,400):** Số Quota đã giao về các Chi nhánh (trong đó 3 Chi nhánh điểm nóng chiếm 650 Quota: HCM 01 là 300, HCM 02 là 200, Đồng Nai là 150).
- **Dự Phòng Kho Vùng (100):** Quota nhàn rỗi do Ban Điều Hành Vùng nắm giữ để sẵn sàng điều tiết.
- **Nhân Sự Toàn Vùng (2,450):** Tổng số nhân sự kinh doanh trực thuộc 15 chi nhánh.

#### 4. Đọc hiểu Biểu Đồ Năng Lực & Tải Khai Thác 3 Chi Nhánh
- **Chi nhánh HCM 01 - Tân Bình:** Cấp 300 | Đã gán 276 (92%) | Khả dụng: **24 Quota** $\rightarrow$ Trạng thái: An toàn, kinh doanh tốt.
- **Chi nhánh HCM 02 - Phú Nhuận:** Cấp 200 | Đã gán 200 (100%) | Khả dụng: **0 Quota (ZERO QUOTA)** $\rightarrow$ **Báo động đỏ nguy cấp:** Hiện có 5 nhân viên kinh doanh mới tuyển dụng không thể tạo tài khoản để làm việc.
- **Chi nhánh Đồng Nai:** Cấp 150 | Đã gán 135 (90%) | Khả dụng: **15 Quota** $\rightarrow$ Trạng thái: Dồi dào, ổn định.

#### 5. Bảng Xếp Hạng Regional Benchmark
- `[Hạng 1] Chi nhánh HCM 01`: Điểm sức khỏe `94/100`, SLA `92.0%`, tải trung bình `48 KH/người`. Đánh giá: *Vận hành tốt nhất Vùng*.
- `[Hạng 2] Chi nhánh Đồng Nai`: Điểm sức khỏe `90/100`, SLA `94.0%`, tải trung bình `45 KH/người`. Đánh giá: *Ổn định & Dồi dào Quota*.
- `[Cần Điều Chỉnh] Chi nhánh HCM 02`: Điểm sức khỏe `58/100`. Đánh giá: *Báo động đỏ Zero Quota*.

---

### Phân Hệ 2: Điều Tiết Hạn Ngạch & Bơm Quota Cấp Cứu Cho Chi Nhánh

#### 1. Mục đích & Mục tiêu
- Cấp cứu khẩn cấp cho chi nhánh đang bị cạn kiệt tài khoản mà không cần chờ thủ tục phê duyệt phức tạp từ Tập đoàn, giúp việc kinh doanh không bị gián đoạn dù chỉ 1 giờ.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR01-04 (Cưỡng Chế Thu Hồi Nội Bộ Vùng - Forced Pull)`: Region Admin có toàn quyền thu hồi Quota tự do từ Chi nhánh dồi dào về Kho Vùng mà không cần Chi nhánh duyệt (`DEC-PO-06`).
- `BR01-05 (Chặn Thu Hồi Quota Đang Gán)`: Không được thu hồi Quota của các tài khoản nhân viên đang hoạt động tại Chi nhánh.
- `BR01-06 (Khóa Dòng Bi Quan Concurrency Lock)`: Giao dịch điều tiết hạn ngạch thực thi nguyên tử (Atomic Transaction), ngăn ngừa tình trạng số dư âm khi nhiều quản trị viên cùng thao tác.
- `AC-02.1.01 (Ràng Buộc Bơm Quota Cấp Cứu)`: Thao tác bơm 20 Quota cho HCM 02 chỉ hợp lệ khi:
  $$\text{Dự Phòng Kho Vùng} \ge 20 \text{ Quota}$$

#### 3. Quy trình thao tác "Bơm Cấp Cứu 20 Quota Cho HCM 02"
1. Tại Bảng Xếp Hạng & Sức Khỏe 3 Chi Nhánh, tìm dòng của **Chi nhánh HCM 02 - Phú Nhuận**.
2. Nhấp vào nút màu đỏ **"Bơm Cấp 20 Quota Ngay"** (hoặc nút **"Điều Tiết Quota Nội Bộ Vùng"** ở góc phải tiêu đề).
3. **Phản hồi nghiệp vụ của hệ thống:**
   - Số Quota tại Kho Dự Phòng Vùng lập tức giảm 20 (từ 100 còn 80).
   - Hạn ngạch cấp cho HCM 02 tăng từ 200 lên 220 Quota.
   - Quota khả dụng của HCM 02 từ 0 (Zero Quota) tăng lên 20 Quota tự do.
   - Nhãn cảnh báo đỏ `ZERO QUOTA` chuyển sang trạng thái xanh an toàn.
   - Hệ thống ghi nhật ký kiểm toán: *Admin Vùng Trần Đình Trọng đã điều tiết 20 Quota cho HCM 02*.

#### 4. Quy trình đề xuất xin thêm Quota lên HQ (Push Request)
1. Khi kho dự phòng của Vùng giảm xuống dưới mức an toàn (<50 Quota), Lãnh đạo Vùng nhấp nút **"+ Đề Xuất Xin Quota Lên HQ"**.
2. Nhập số lượng mong muốn (ví dụ: `150 Quota`) và lý do nhu cầu (ví dụ: *"Bổ sung mở rộng Chi nhánh Bình Chánh và Thủ Đức đợt 2"*).
3. Nhấp **"Gửi Lệnh Đề Xuất"** $\rightarrow$ Phiếu đề xuất được gửi vào Hàng đợi của Super Admin HQ.

---

### Phân Hệ 3: Hàng Đợi Phê Duyệt Đề Xuất Quota Từ Chi Nhánh (Approval Queue)

#### 1. Mục đích & Mục tiêu
- Tiếp nhận và xử lý các yêu cầu bổ sung Quota chính thức từ các Giám đốc Chi nhánh trực thuộc gửi lên.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR-REG-02 (Điều Kiện Phê Duyệt Đề Xuất)`: Đề xuất xin Quota từ Chi nhánh chỉ được phê duyệt thành công khi số Quota yêu cầu $\le$ Số dư dự phòng tại kho Vùng.
- `BR-REG-03 (Chuyển Tiếp Đề Xuất Lên HQ)`: Nếu kho Vùng không đủ số dư để duyệt, hệ thống yêu cầu Region Admin gửi phiếu đề xuất xin Quota lên Super Admin HQ trước khi phê duyệt cho Chi nhánh.

#### 3. Quy trình thao tác chuẩn
1. Nhấp vào mục **"Phê Duyệt Đề Xuất Quota"** trên menu bên trái (có badge số đếm yêu cầu chờ duyệt).
2. Kiểm tra thông tin đề xuất: Tên chi nhánh, số Quota xin cấp, lý do kinh doanh.
3. Nhấp **"Phê Duyệt"** để chuyển Quota ngay lập tức, hoặc **"Từ Chối"** kèm giải thích lý do.

---

### Phân Hệ 4: Điều Chuyển Nhân Sự & Hạn Ngạch Liên Chi Nhánh (Inter-Branch Transfer)

#### 1. Mục đích & Mục tiêu
- Quản lý việc điều động chuyên viên kinh doanh giữa các Chi nhánh trong cùng Vùng hoặc phối hợp điều chuyển liên Vùng.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR09-01 (Nguyên Tắc Quản Trị Địa Bàn - Territory Governance)`: Khi Sales chuyển công tác từ Chi nhánh A sang Chi nhánh B:
  - **Tài khoản Enterprise & 1 Quota**: Chuyển theo Sales sang Chi nhánh mới.
  - **100% Danh bạ Khách hàng**: BẮT BUỘC để lại Chi nhánh cũ để nhân sự tại chỗ tiếp quản. Tuyệt đối không cho phép mang khách hàng sang địa bàn mới gây xung đột thị trường (`DEC-PO-05`).
- `BR09-02 (Điều Kiện Bàn Giao Hết Danh Bạ Tại Chỗ)`: Lệnh điều chuyển chỉ hoàn tất khi số lượng khách hàng còn lại của Sales tại Chi nhánh cũ = 0.
- `BR09-03 (Thẩm Quyền Phê Duyệt)`: Điều chuyển nhân sự nội Vùng do Region Admin phê duyệt; Điều chuyển liên Vùng do Super Admin phê duyệt.

#### 3. Quy trình thao tác chuẩn
1. Chọn mục **"Điều Chuyển Liên Chi Nhánh"** trên thanh menu.
2. Chọn nhân sự cần điều chuyển, chọn Chi nhánh tiếp nhận.
3. Hệ thống kiểm tra điều kiện danh bạ tại chỗ $\rightarrow$ Phê duyệt điều chuyển.

---

## 2.3. BRANCH ADMIN — TRƯỞNG CHI NHÁNH KINH DOANH (HCM 01 - TÂN BÌNH)

* **Persona mặc định:** Lê Hoàng Nam — Trưởng Chi Nhánh HCM 01 - Tân Bình
* **Phạm vi quản lý:** Chi nhánh HCM 01 (Hạn ngạch: 300 Quota; 281 Nhân sự; 272 Khách hàng đang tương tác)
* **Mã vai trò hệ thống:** `ROLE_BRANCH_ADMIN`

```
┌────────────────────────────────────────────────────────────────────────┐
│                     BRANCH ADMIN — WORKSPACE SITEMAP                   │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Bàn Điều Hành Chi Nhánh & Cảnh Báo SLA (Branch Cockpit)             │
│ 2. Cấp Mới Tài Khoản Tự Chủ Bằng Email FPT (Account Lifecycle)         │
│ 3. Tạm Khóa / Mở Khóa Tài Khoản Kèm Kiểm Tra Lý Do (AC-03b / AC-03c)   │
│ 4. Bàn Giao Danh Bạ Kèm Bot Chào Tự Động Throttling <=5/s (US07/FR07)  │
│ 5. Phương Án Cân Bằng Tải Khách Hàng Nội Bộ (Workload Rebalancing)    │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Phân Hệ 1: Bàn Điều Hành Chi Nhánh & Cảnh Báo Bỏ Sót SLA (Branch Cockpit)

#### 1. Mục đích & Mục tiêu
- **Mục đích:** Giúp Giám đốc Chi nhánh nắm bắt hiệu quả bán hàng, tình trạng quá tải hoặc vi phạm cam kết phản hồi khách hàng của từng nhân viên kinh doanh dưới quyền.
- **Mục tiêu:**
  - Duy trì cam kết chất lượng dịch vụ: 100% tin nhắn khách hàng phải được phản hồi trong vòng 30 phút.
  - Phát hiện ngay các nhân viên chuẩn bị nghỉ việc hoặc quá tải để chủ động san sẻ khách hàng.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR06-01 (Cấp Độ Hiển Thị Phê Duyệt)`: Áp dụng nghiêm ngặt chuẩn **Level 1 (Trạng thái) + Level 2 (Danh bạ Khách hàng masked) + Level 3 (Metadata Tương tác)** cho Branch Admin (`DEC-PO-02`). **Khóa tuyệt đối tính năng đọc trộm nội dung tin nhắn thường nhật (Level 5 Snooping)**.
- `BR06-02 (Cảnh Báo Vi Phạm SLA > 48h)`: Tự động gắn cờ cảnh báo màu đỏ đối với hội thoại mà khách hàng nhắn đến nhưng sau 48 giờ Sales chưa phản hồi (`DEC-PO-02`).
- `BR06-03 (Bộ Đôi Biểu Đồ Điều Hành Chi Nhánh - Dual Executive Charts)`:
  - **Biểu đồ 1: Phân Bổ Tải Khách Hàng / Nhân Sự**: Trực quan hóa số lượng khách hàng của từng Sales Rep trong chi nhánh so với **Ngưỡng An Toàn Định Mức (70 KH/Sales)**.
  - **Biểu đồ 2: Ma Trận Tốc Độ & Chất Lượng Phục Vụ SLA**: Hiển thị 3 chỉ số then chốt: *Tỷ lệ phản hồi đúng hạn (Chuẩn FPT > 95%)*, *Thời gian phản hồi trung bình (Mục tiêu < 30 phút)*, và *Khách hàng bị bỏ sót quá 24h (Mục tiêu = 0)*.
- `BR06-04 (Ngưỡng Định Mức An Toàn 70 Khách Hàng & Cảnh Báo Quá Tải)`:
  - Định mức chuẩn: **70 khách hàng / 1 Sales Rep**.
  - Tải tối ưu: Dưới 70 KH (Tỷ lệ tải $\le 100\%$ - Badge Xanh: Tối ưu / An toàn).
  - Tải vượt ngưỡng: Trên 70 KH (Tỷ lệ tải $> 100\%$ - Badge Đỏ: Quá Tải, ví dụ: 127 KH = 181% Quá Tải).
- `BR06-05 (Chỉ Dẫn Điều Hành Tự Động - Automated Operational Guidance)`: Bàn điều hành tự động phân tích và đưa ra khuyến nghị điều phối: *"San tải bớt 40-50 KH của Sales quá tải sang Sales mới tiếp nhận sẽ lập tức nâng chỉ số SLA phản hồi toàn chi nhánh lên mức xuất sắc (>98.5%)"*.

#### 3. Đọc hiểu Cảnh Báo Bỏ Sót SLA & Biểu Đồ Danh Mục Khách Hàng (Stacked Bar)
- **Hộp Cảnh Báo Đỏ Bỏ Sót SLA:**
  - Hiển thị thông báo khi có khách hàng bị bỏ rơi: *"Phát hiện 1 khách hàng (Hải Nam - FPT Software) chưa được nhân viên Nguyễn Văn A phản hồi trong suốt 50 giờ qua (vượt ngưỡng cam kết < 30 phút)"*.
  - Giúp Trưởng Chi nhánh có căn cứ nhắc nhở trực tiếp nhân sự.
- **Biểu Đồ Tỷ Trọng Danh Mục Khách Hàng (Stacked Bar 272 KH):**
  - Trực quan hóa tỷ trọng khách hàng do từng nhân sự quản lý:
    - *Màu Đỏ (Phạm Văn D):* 127 KH (Chiếm 47% toàn chi nhánh) $\rightarrow$ **Quá tải nghiêm trọng!** (Đặc biệt nhân sự này đã nộp đơn nghỉ việc trước 30/09).
    - *Màu Xanh Dương (Trần Thị B):* 65 KH (Chiếm 24%) $\rightarrow$ Năng lực tốt, SLA 98.5%.
    - *Màu Xanh Lá (Nguyễn Văn A):* 48 KH (Chiếm 18%) $\rightarrow$ Đang xử lý ổn định.
    - *Màu Xám (Lê Văn C):* 32 KH (Chiếm 12%) $\rightarrow$ Tài khoản đang tạm khóa kỷ luật.

#### 4. Bảng Xếp Hạng & Sức Khỏe Nhân Sự (Sales Rep Scorecard)
- `[Hạng 1] Trần Thị B`: Điểm `98/100`. 65 KH, phản hồi trung bình 12 phút. Đánh giá: *Xuất sắc nhất chi nhánh*.
- `[Hạng 2] Nguyễn Văn A`: Điểm `94/100`. 48 KH, phản hồi trung bình 18 phút. Đánh giá: *Chuẩn mực*.
- `[Cần Điều Chỉnh] Phạm Văn D`: Điểm `62/100`. 127 KH (Quá tải 47%), sắp nghỉ việc. Đánh giá: *Cần bàn giao khẩn cấp*.
- `[Khóa] Lê Văn C`: Điểm `50/100`. 32 KH. Đang bị tạm khóa phiên làm việc.
- `[Chờ Kích Hoạt] Vũ Minh K`: Đang ở trạng thái `PENDING`, thư mời kích hoạt còn hạn 46 giờ.

---

### Phân Hệ 2: Cấp Mới Tài Khoản Tự Chủ Bằng Email FPT (Account Lifecycle)

#### 1. Mục đích & Mục tiêu
- Trưởng Chi nhánh được toàn quyền tự chủ cấp phát tài khoản Z-Enterprise cho nhân viên mới vào đơn vị mà không cần gửi ticket chờ IT Trụ sở duyệt.
- Tự động trừ 1 Quota khả dụng từ kho của chi nhánh, đảm bảo hạn ngạch được kiểm soát chặt chẽ.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR02-01 (Mô Hình Tự Chủ Chi Nhánh)`: Branch Admin có toàn quyền tự quyết việc khởi tạo và cấp tài khoản cho Sales trực thuộc mà không cần tạo phiếu yêu cầu hay chờ phê duyệt từ Region Admin (`DEC-PO-07`).
- `BR02-02 (Định Danh Duy Nhất Bằng Email Công Ty)`: Mỗi nhân sự chỉ được cấp duy nhất 1 tài khoản Enterprise (`D-002`). Bắt buộc sử dụng Email công ty có tên miền chuẩn (`@fpt.com.vn`) (`D-004`).
- `BR02-03 (Thời Hạn Token Kích Hoạt - TTL)`: Thư mời kích hoạt có hiệu lực trong vòng 72 giờ (`A-002`). Nếu quá 72 giờ Sales chưa kích hoạt, token hết hạn; Quota vẫn được giữ chỗ; Branch Admin có thể bấm "Gửi lại lời mời".
- `BR02-04 (Trừ Quota Thời Gian Thực)`: Ngay khi Branch Admin bấm cấp tài khoản, Branch Pool khả dụng lập tức giảm 1 (`AC-03.1.01`).
- `AC-03.1.02 (Chặn Khi Quota Bằng Không)`: Nếu Branch Pool = 0, nút cấp tài khoản bị khóa mờ kèm cảnh báo: *"Chi nhánh đã hết Quota khả dụng. Vui lòng liên hệ Admin Vùng để được cấp thêm"*.

#### 3. Quy trình thao tác cấp mới tài khoản
1. Tại phân hệ **"Nhân Sự & Tài Khoản"**, nhấp vào nút **"+ Cấp Tài Khoản Mới"**.
2. Hộp thoại khởi tạo tài khoản hiện ra:
   - **Mã Nhân Viên:** Nhập mã nội bộ (ví dụ: `EMP-00142`).
   - **Họ Và Tên:** Nhập tên đầy đủ (ví dụ: `Hoàng Văn Nam`).
   - **Email Doanh Nghiệp:** Bắt buộc có đuôi `@fpt.com.vn` (ví dụ: `namhv12@fpt.com.vn`).
   - **Hạn Mức Quota:** Mặc định `1 Tài Khoản Z-Enterprise`.
3. Nhấp nút **"Khởi Tạo & Cấp Quota"**.
4. **Phản hồi của hệ thống:**
   - Hệ thống tự động trừ `1 Quota` từ số dư khả dụng của chi nhánh (từ 24 còn 23).
   - Bản ghi nhân viên mới được thêm vào danh sách với trạng thái `PENDING (Chờ Kích Hoạt)`.
   - Một liên kết kích hoạt an toàn có thời hạn 72 giờ được gửi tự động vào hộp thư email doanh nghiệp của nhân viên.

---

### Phân Hệ 3: Tạm Khóa & Mở Khóa Tài Khoản Nhân Viên (AC-03b / AC-03c)

#### 1. Mục đích & Mục tiêu
- Tức thì phong tỏa phiên làm việc của nhân sự kinh doanh khi có dấu hiệu vi phạm chính sách công ty, mất thiết bị hoặc phục vụ quy trình đánh giá kỷ luật.
- Đảm bảo tính minh bạch, chống lạm quyền bằng việc bắt buộc giải trình lý do rõ ràng.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR03-01 (Tự Chủ Trạng Thái Chi Nhánh)`: Branch Admin có toàn quyền tự chuyển đổi trạng thái tài khoản: `ACTIVE` $\leftrightarrow$ `SUSPENDED` và `ACTIVE/SUSPENDED` $\rightarrow$ `OFFBOARDING_PENDING` mà không cần duyệt (`DEC-PO-07`).
- `BR03-02 (Cưỡng Chế Ngắt Phiên Khi Suspend)`: Khi tài khoản chuyển sang `SUSPENDED`, hệ thống lập tức hủy toàn bộ phiên làm việc của Sales trên mọi thiết bị.
- `BR03-03 (Chính Sách Chặn Tin Nhắn Đến - Inbound Message Blocked)`: Khi tài khoản đang ở trạng thái `SUSPENDED` hoặc `OFFBOARDING_PENDING`, nếu khách hàng gửi tin nhắn đến tài khoản này, hệ thống áp dụng cơ chế chặn hoàn toàn (Blocked / Delivery Failed) (`DEC-PO-08`):
  - Khách hàng nhận được thông báo: *"Người nhận hiện không thể tiếp nhận tin nhắn vào thời điểm này"*.
  - Tin nhắn không được ghi nhận vào hộp thư của Sales cũ, bảo đảm an toàn dữ liệu và tránh hiểu lầm giao dịch.
- `AC-03b.2.01 (Bắt Buộc Nhập Lý Do Khóa $\ge 10$ Ký Tự)`: Khi tạm khóa tài khoản, **trường "Lý do tạm khóa" bắt buộc phải nhập tối thiểu 10 ký tự**. Nếu để trống hoặc nhập dưới 10 ký tự (ví dụ: *"khóa"*, *"vi phạm"*), hệ thống lập tức chặn lại và hiển thị cảnh báo đỏ.
- `AC-03c.1.01 (Bắt Buộc Xác Nhận Mở Khóa)`: Mở khóa lại tài khoản cũng bắt buộc xác nhận lý do để lưu vết vào Sổ nhật ký kiểm toán.

#### 3. Quy trình thao tác tạm khóa tài khoản
1. Tại bảng danh sách nhân sự, tìm nhân viên cần xử lý (ví dụ: `Nguyễn Văn A`).
2. Nhấp vào nút **"Tạm Khóa"** ở cột Hành động.
3. Hộp thoại xác nhận hiện ra:
   - *Nếu bạn chỉ nhập:* `"vi phạm"` $\rightarrow$ Bấm Lưu $\rightarrow$ Hệ thống sẽ báo lỗi: `"Lý do tạm khóa phải có ít nhất 10 ký tự để lưu vết kiểm toán"`.
   - *Bạn nhập đầy đủ:* `"Tạm khóa theo yêu cầu kiểm tra bàn giao khách hàng"` ($\ge 10$ ký tự) $\rightarrow$ Bấm **"Xác Nhận Tạm Khóa"**.
4. Trạng thái của Nguyễn Văn A chuyển sang màu đỏ: `SUSPENDED (Đã Tạm Khóa)`. Nếu chuyển sang góc nhìn của Sales Nguyễn Văn A, toàn bộ quyền soạn tin và gọi điện sẽ bị vô hiệu hóa ngay lập tức.

---

### Phân Hệ 4: Bàn Giao Danh Bạ Kèm Bot Chào Tự Động Throttling (US07 / FR07)

#### 1. Mục đích & Mục tiêu
- **Mục đích:** Chuyển giao toàn bộ danh bạ khách hàng của nhân sự chuẩn bị thôi việc (Phạm Văn D - 127 KH) cho nhân sự mới tiếp quản (Trần Thị B).
- **Mục tiêu:**
  - Khách hàng không bị bỡ ngỡ: Bot tự động gửi tin nhắn chào văn minh thông báo chuyên viên mới tiếp quản hợp đồng.
  - Chống vi phạm chính sách Spam của Zalo Platform: **Giới hạn tốc độ gửi tin tối đa không quá 5 tin nhắn/giây** (Throttling mechanism).
  - Thu hồi lại 1 Quota tài khoản cho chi nhánh sau khi hoàn tất lưu trữ.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR07-01 (Bắt Buộc Bàn Giao Khi Offboarding)`: Không thể thu hồi tài khoản nếu chưa bàn giao 100% danh bạ khách hàng của Sales nghỉ việc cho nhân sự khác trong Chi nhánh (`D-011`).
- `BR07-02 (Phạm Vi Kế Thừa Dữ Liệu)`: Chuyển giao Danh bạ + Ghi chú phân loại. **Tuyệt đối không chuyển giao Lịch sử Tin nhắn cũ (Chat History)** (`DEC-PO-04`).
- `BR07-03 (Tin Nhắn Chào Tự Động)`: Ngay khi kích hoạt bàn giao, hệ thống kích hoạt bot tự động gửi tin nhắn thông báo nhân sự mới tiếp quản đến toàn bộ khách hàng (`DEC-PO-04`).
- `BR07-04 (Hồi Phục Quota Tức Thì)`: Sau bàn giao, tài khoản cũ chuyển sang trạng thái `ARCHIVED_AND_REVOKED`, 1 Quota hoàn về Branch Pool (`DEC-PO-03`).
- `BR07-05 (Hàng Đợi Nền & Throttling Tin Nhắn Bot Chào Khách)`: Đẩy toàn bộ danh sách khách hàng vào Background Message Queue, điều tiết tốc độ gửi tin tối đa **không vượt quá 5 tin nhắn/giây** nhằm tránh bị Zalo Platform đánh dấu Spam. Tự động Retry tối đa 3 lần với Exponential Backoff (5s, 15s, 60s).

#### 3. Quy trình thao tác bàn giao kèm Bot chào
1. Nhấp vào nút **"Bàn Giao Kèm Bot Chào"** trên dòng nhân viên **Phạm Văn D (127 KH)**.
2. Hộp thoại thiết lập lệnh bàn giao xuất hiện:
   - **Nhân Sự Bàn Giao:** `Phạm Văn D (EMP-00128) - 127 Khách hàng`.
   - **Nhân Sự Tiếp Nhận:** Chọn từ dropdown (ví dụ: `Trần Thị B (EMP-00130)`).
   - **Nội Dung Bot Chào Tự Động:**
     > *"Kính chào Quý khách! Tôi là Trần Thị B - Chuyên viên FPT Telecom sẽ chính thức tiếp quản hỗ trợ hợp đồng và dịch vụ của Quý khách thay cho anh Phạm Văn D từ ngày hôm nay. Trân trọng cảm ơn Quý khách!"*
3. Nhấp nút **"Thực Hiện Bàn Giao & Kích Hoạt Bot (<= 5 tin/s)"**.
4. **Hành vi xử lý của hệ thống:**
   - Hệ thống hiển thị Thanh tiến trình bàn giao (Progress Bar) chạy từ 0% đến 100%, gửi theo từng khối (batches) với tốc độ $\le 5$ tin nhắn/giây.
   - 127 khách hàng được gán chuyển quyền quản lý sang cho Trần Thị B.
   - Tài khoản của Phạm Văn D được chuyển vào trạng thái `ARCHIVED (Đã Lưu Trữ)`.
   - **Chi nhánh được hoàn trả 1 Quota khả dụng** (Quota khả dụng tăng từ 24 lên 25).

---

### Phân Hệ 5: Phương Án Cân Bằng Tải Khách Hàng Nội Bộ (Workload Rebalancing)

#### 1. Mục đích & Mục tiêu
- **Mục đích:** Cung cấp công cụ giả lập và phân bổ lại số lượng khách hàng giữa các chuyên viên kinh doanh trong chi nhánh.
- **Mục tiêu:** Đưa tải làm việc của toàn bộ Sales về dưới ngưỡng an toàn (70 KH/người), loại bỏ tình trạng nhân viên quá tải dẫn đến trễ hạn SLA.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR06-04 (Ngưỡng An Toàn 70 KH)`: Tỷ lệ tải của nhân sự nhận bàn giao sau khi san tải không được vượt quá 120% định mức an toàn (>84 KH).
- `BR06-05 (Chỉ Dẫn San Tải)`: Ưu tiên phân bổ khách hàng cho các nhân sự có điểm SLA cao (>95%) và tải hiện tại thấp (<50 KH).

#### 3. Hướng dẫn thao tác
1. Xem khối **"Phương Án Cân Bằng Tải Chi Nhánh"** tại bảng điều hành Branch Admin.
2. Rà soát kịch bản đề xuất: San 60 KH của Phạm Văn D sang cho Nguyễn Văn A và 67 KH sang cho Trần Thị B.
3. Nhấp **"Thực Hiện Cân Đối"** để áp dụng phân bổ danh bạ.

---

## 2.4. SALES REPRESENTATIVE — CHUYÊN VIÊN KINH DOANH

* **Persona mặc định:** Nguyễn Văn A — Chuyên Viên Kinh Doanh B2B FPT Telecom
* **Phạm vi quản lý:** Danh mục khách hàng doanh nghiệp được phân công (48 KH; Mã tài khoản: `ZENT-001293`)
* **Mã vai trò hệ thống:** `ROLE_SALES_REP`

```
┌────────────────────────────────────────────────────────────────────────┐
│                   SALES REPRESENTATIVE — WORKSPACE SITEMAP             │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Thẻ Định Danh Doanh Nghiệp FPT Telecom (Enterprise ID Card)         │
│ 2. Thanh Kênh Hội Thoại Đa Nguồn Hợp Nhất (Omnichannel Ribbon)         │
│ 3. Không Gian Chat B2B & Soạn Thảo Tin Nhắn Nhanh (Smart Composer)     │
│ 4. Gọi Thoại 1-1 Qua Zalo Doanh Nghiệp (Voice Call & Metadata - US05)  │
│ 5. Tạo Nhóm Zalo Doanh Nghiệp & Duyệt Lời Mời Kết Bạn B2B              │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Phân Hệ 1: Thẻ Định Danh Doanh Nghiệp FPT (Enterprise ID Card)

#### 1. Mục đích & Mục tiêu
- Xóa bỏ việc nhân viên dùng tài khoản Zalo cá nhân đại diện cho doanh nghiệp. Khẳng định tư cách pháp nhân chính thức của FPT Telecom khi làm việc với đối tác lớn.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR04-01 (Đa Thiết Bị Linh Hoạt)`: Cho phép Sales đăng nhập và đồng bộ hội thoại đồng thời trên cả máy tính xách tay và điện thoại thông minh phục vụ thị trường (`A-003`).
- `BR05-01 (Quy Chế Zero Personal Contacts)`: Toàn bộ 100% người dùng Zalo kết bạn hoặc phát sinh trao đổi hai chiều với Enterprise Account mặc nhiên là tài sản của Doanh nghiệp (`DEC-PO-01`). Mọi contact đều được tự động đồng bộ vào danh bạ chi nhánh, không có mục liên hệ riêng tư.

#### 3. Thông tin hiển thị trên thẻ
- **Mã Tài Khoản:** `ZENT-001293` (Gắn với bản quyền doanh nghiệp).
- **Họ Tên & Đơn Vị:** `Nguyễn Văn A | Chi nhánh HCM 01 - Tân Bình`.
- **Huy Hiệu:** `Xác Thực Doanh Nghiệp FPT` (Chính sách Zero Personal Asset).
- **Cam Kết Dịch Vụ:** `Cam kết phản hồi dưới 15 phút` | `Quản lý 48 Khách hàng B2B`.

---

### Phân Hệ 2: Thanh Kênh Hội Thoại Đa Nguồn Hợp Nhất (Omnichannel Ribbon)

#### 1. Mục đích & Mục tiêu
- Cho phép nhân viên kinh doanh tiếp nhận và chăm sóc khách hàng từ tất cả các kênh tiếp xúc số của FPT Telecom tại một giao diện màn hình duy nhất, không cần cài đặt nhiều ứng dụng.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR05-02 (Không Gian Bán Hàng Đa Kênh Hội Tụ - Omnichannel Workspace)`: Bàn làm việc của Sales Rep tích hợp tiếp nhận và chuyển đổi giữa 6 kênh liên lạc tập trung: Zalo Enterprise, Zalo OA, Portal Khách Hàng, Messenger B2B, Website Livechat, và Tất Cả.
- `BR06-01 (Bảo Mật Nội Dung Phía Sales)`: Chỉ Sales trực tiếp phụ trách mới có quyền đọc và phản hồi tin nhắn trong phòng chat. Admin các cấp bị khóa đọc trộm.

#### 3. Danh mục 6 Kênh hội thoại
- **Tất Cả:** Toàn bộ cuộc trò chuyện từ mọi nguồn đổ về.
- **Zalo Doanh Nghiệp (Kênh chính):** Tin nhắn từ ứng dụng Zalo người dùng cá nhân gửi tới tài khoản Z-Enterprise của nhân viên.
- **Zalo OA:** Tin nhắn gửi tới Trang Zalo Official Account chính thức của FPT Telecom.
- **FPT Portal LiveChat:** Khách hàng đang truy cập cổng dịch vụ FPT Telecom bấm chat hỗ trợ.
- **Messenger B2B:** Khách hàng nhắn tin qua Fanpage Facebook FPT Doanh Nghiệp.
- **Website FPT:** Khách hàng để lại yêu cầu tư vấn trên website tập đoàn.

---

### Phân Hệ 3: Không Gian Chat B2B & Soạn Thảo Tin Nhắn Nhanh (Smart Composer)

#### 1. Mục đích & Mục tiêu
- Hỗ trợ nhân viên chốt hợp đồng nhanh chóng bằng các mẫu báo giá dịch vụ viễn thông chuẩn hóa, tài liệu kỹ thuật có sẵn của tập đoàn mà không mất thời gian gõ lại văn bản.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR04-03 (Bảo Mật Masking SĐT FPT Bắt Buộc)`: Toàn bộ số điện thoại của khách hàng trong danh bạ đều được **che số tự động:** `090****567` (Anh Nam - FPT Software), `091****890` (Chị Lan - Vinamilk). Nhân viên kinh doanh tuyệt đối không thể sao chép số điện thoại cá nhân của khách hàng ra ngoài hệ thống.
- `BR05-05 (Thư Viện Mẫu Tin Nhắn FPT Chuẩn Hóa)`: Cung cấp kho mẫu tin nhắn nghiệp vụ được Ban Kinh doanh FTEL thẩm định, nghiêm cấm nhân viên tự ý sửa đổi các điều khoản pháp lý về giá cước và cam kết SLA.
- `AC-05.1.01 (Duy Trì Tiêu Điểm Soạn Thảo - Auto-Focus)`: Sau mỗi lần nhấn Enter gửi tin nhắn, ô soạn thảo phải tự động duy trì con trỏ văn bản (auto-focus), không làm mất focus của Sales.

#### 3. Hướng dẫn sử dụng Chip Mẫu Tin Nhắn Nhanh (Template Chips)
1. Trong cửa sổ chat với khách hàng đang chọn (ví dụ: Anh Hải Nam), phía trên ô nhập văn bản có 3 chip mẫu chuẩn:
   - **Mẫu Báo Giá Lux 800:** Tự động chèn nội dung: *"Kính gửi Quý công ty chính sách gói Internet FPT Lux 800 tốc độ cao kèm thiết bị Wi-Fi 6..."*.
   - **Mẫu Camera Cloud:** Chèn thông số kỹ thuật giải pháp Cloud Camera giám sát an ninh doanh nghiệp.
   - **Lịch Hẹn Khảo Sát:** Chèn mẫu xác nhận lịch chuyên viên kỹ thuật FPT đến tận nơi đo đạc hạ tầng mạng.
2. Nhấp vào chip mong muốn $\rightarrow$ Nội dung lập tức điền vào ô soạn thảo.
3. Nhập thêm nội dung tùy chỉnh hoặc bấm phím **Enter** (hoặc nút **"Gửi Tin Nhắn"**) để gửi ngay.

---

### Phân Hệ 4: Gọi Thoại 1-1 Qua Zalo Doanh Nghiệp & Ghi Nhận Metadata (US05)

#### 1. Mục đích & Mục tiêu
- Cho phép nhân viên thực hiện cuộc gọi thoại trực tiếp với khách hàng ngay trong nền tảng Z-Enterprise.
- Ghi nhận đầy đủ Siêu dữ liệu đàm thoại (*Interaction Metadata*) phục vụ kiểm toán chất lượng dịch vụ, bảo vệ quyền lợi cả khách hàng lẫn nhân viên khi có tranh chấp hợp đồng.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR05-03 (Gọi Thoại 1-1 Trực Tiếp Qua Zalo - Zalo Voice Call)`: Cho phép Sales thực hiện cuộc gọi thoại 1-1 trực tiếp qua Zalo Enterprise đến khách hàng (`DEC-PO-09`).
- `BR05-03b (Lưu Vết Interaction Metadata)`: Mọi cuộc gọi đều được tự động lưu vết Metadata: Thời gian bắt đầu, thời lượng cuộc gọi, trạng thái (Thành công / Nhỡ / Bận), mã Sales và mã KH. **Tuyệt đối không ghi âm lén nội dung giọng nói cuộc gọi trong MVP Phase 1** nhằm tuân thủ quyền riêng tư theo Luật An ninh mạng.

#### 3. Quy trình thực hiện cuộc gọi thoại 1-1
1. Tại góc trên bên phải khung chat khách hàng, nhấp nút **"Gọi Zalo OA (US05)"**.
2. Màn hình đàm thoại thoại mô phỏng xuất hiện với đồng hồ đếm thời lượng cuộc gọi theo giây.
3. Khi cuộc gọi kết thúc, nhấp nút **"Kết Thúc Cuộc Gọi"**.
4. **Hệ thống tự động ghi nhận Metadata vào cơ sở dữ liệu:**
   - Thời điểm thực hiện: `Ngày, giờ chính xác`.
   - Thời lượng đàm thoại: `Ví dụ: 02 phút 45 giây`.
   - Kênh thực hiện: `Zalo Enterprise Voice Protocol`.
   - Tài khoản thực hiện: `Nguyễn Văn A (ZENT-001293)`.
   - Khách hàng tiếp nhận: `Hải Nam (SĐT: 090****567)`.

---

### Phân Hệ 5: Tạo Nhóm Zalo Doanh Nghiệp & Duyệt Lời Mời Kết Bạn B2B

#### 1. Mục đích & Mục tiêu
- Phối hợp nhóm kỹ thuật dự án và kết nối với các đối tác khách hàng tiềm năng.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR05-04 (Nhóm Chat Chăm Sóc Doanh Nghiệp B2B - Customer Group Chat)`: Hỗ trợ tạo và quản trị Nhóm Chat Doanh Nghiệp phục vụ các dự án B2B lớn. Thành viên nhóm gồm: Sales phụ trách, Khách hàng doanh nghiệp, Chuyên viên kỹ thuật NOC / Kỹ sư hạ tầng FTEL.
- `BR05-06 (Quản Lý Lời Mời Kết Bạn B2B - Friend Requests Governance)`: Cho phép tiếp nhận, xem hồ sơ chức danh, đơn vị công tác và phê duyệt/từ chối lời mời kết bạn từ khách hàng doanh nghiệp.

#### 3. Hướng dẫn thao tác
* **Tạo Nhóm Zalo Phối Hợp Dự Án:**
  1. Phía trên danh sách cuộc trò chuyện, nhấp nút **"+ Tạo Nhóm"**.
  2. Hộp thoại tạo nhóm 2 cột hiện ra:
     - **Tài Khoản Tạo Nhóm:** Mặc định `Nguyễn Văn A (ZENT-001293)`.
     - **Tên Nhóm:** Nhập tên nhóm dự án (ví dụ: `Hội Đồng Kỹ Thuật FPT - Dự Án Lux Vinamilk`).
     - **Chọn Thành Viên:** Đánh dấu chọn cả khách hàng doanh nghiệp lẫn đồng nghiệp kỹ thuật (NOC, Hỗ trợ kỹ thuật On-site).
  3. Nhấp nút **"Tạo Nhóm Ngay"** $\rightarrow$ Nhóm được khởi tạo với nhãn phân loại `[Nhóm]` trên danh bạ.
* **Duyệt Lời Mời Kết Bạn B2B:**
  1. Nhấp nút **"Lời Mời (2)"** trên thanh công cụ danh bạ.
  2. Danh sách các đối tác doanh nghiệp đang gửi yêu cầu kết nối xuất hiện (Đại diện Vinamilk, Giám đốc CNTT Vietcombank...).
  3. Nhấp nút **"Chấp Nhận"** để đưa đối tác vào danh bạ chăm sóc chính thức, hoặc **"Từ Chối"** nếu không phù hợp.

---

## 2.5. LEGAL & AUDIT — BAN PHÁP CHẾ & KIỂM SOÁT NỘI BỘ

* **Persona mặc định:** Đỗ Hoàng Mai — Chuyên Viên Kiểm Toán Trưởng Ban Pháp Chế & KSNB FPT
* **Phạm vi quản lý:** Toàn bộ hệ thống Z-Enterprise (Giám sát tuân thủ 100% dữ liệu, kiểm toán bất biến)
* **Mã vai trò hệ thống:** `ROLE_LEGAL_AUDIT`

```
┌────────────────────────────────────────────────────────────────────────┐
│                     LEGAL & AUDIT — WORKSPACE SITEMAP                  │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Bảng Giám Sát Tuân Thủ & Rủi Ro Dữ Liệu (Compliance Dashboard)      │
│ 2. Sổ Nhật Ký Kiểm Toán Bất Biến (Immutable Audit Ledger & CSV Export) │
│ 3. Khóa Khẩn Cấp Xác Thực Kép Break-Glass (Dual OTP - US10/FR08)       │
│ 4. Giám Sát Chế Độ Bảo Mật Privacy Level 5 (FR06 Policy)               │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Phân Hệ 1: Bảng Giám Sát Tuân Thủ & Rủi Ro Dữ Liệu (Compliance Dashboard)

#### 1. Mục đích & Mục tiêu
- Ngăn chặn triệt để nguy cơ thất thoát dữ liệu khách hàng (Data Leakage) và rò rỉ bí mật kinh doanh khi có sự biến động về mặt nhân sự trong công ty.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR06-01 (Khóa Đọc Trộm Thường Nhật - Privacy Level 5)`: Ban Pháp chế & Kiểm toán không có quyền và không có giao diện đọc nội dung tin nhắn thường nhật giữa Sales và Khách hàng (`DEC-PO-02`).
- `BR04-03 (Masking SĐT Toàn Hệ Thống)`: 100% số điện thoại khách hàng hiển thị trên bảng giám sát tuân thủ phải được che 4 số giữa (`090****567`).
- `BR-AUD-01 (Cảnh Báo Nhân Sự Nghỉ Việc Chưa Thu Hồi)`: Hệ thống tự động đối soát với cơ sở dữ liệu FPT HR; nếu phát hiện nhân sự đã thôi việc (`RESIGNED`) nhưng tài khoản Z-Enterprise vẫn mở (`ACTIVE`), hệ thống lập tức bật cảnh báo đỏ cấp cao nhất (`CRITICAL SECURITY RISK`).

#### 3. Ý nghĩa các chỉ số giám sát
- **Tổng Sự Kiện Kiểm Toán (5+):** Số lượng hành vi quản trị hệ thống đã được ghi nhận vào sổ nhật ký bất biến.
- **Tuân Thủ Masking SĐT (100%):** Không có bất kỳ người dùng nào (kể cả Admin) được xem đầy đủ số điện thoại trần của khách hàng khi chưa có lệnh thanh tra.
- **Cảnh Báo Rủi Ro Nhân Sự (1 Sự Cố Cần Xử Lý):** Nhân sự đã nghỉ việc trên hệ thống nhân sự FPT HR nhưng tài khoản Z-Enterprise vẫn đang mở.
- **Can Thiệp Đặc Quyền (Break-Glass) (0 Lần Trong 30 Ngày):** Số lần mở khóa xem nội dung đàm thoại nhạy cảm.

#### 4. Xử lý Cảnh Báo Vi Phạm Nghiêm Trọng
- **Bản tin cảnh báo đỏ:**
  > *"Nhân viên Đoàn Thanh L (Mã NV: EMP-00137) đã hoàn tất thủ tục thôi việc trên hệ thống HR từ 3 ngày trước, nhưng tài khoản kinh doanh ZENT-001301 tại Chi nhánh HCM 01 vẫn đang ở trạng thái ACTIVE. Phiên đăng nhập cuối cùng ghi nhận cách đây 3 giờ từ địa chỉ IP 118.69.182.60. Nguy cơ: Khách hàng tiếp tục giao dịch và nhân viên mang danh bạ đi phục vụ đơn vị đối thủ!"*
- Đây là tình huống cần kích hoạt ngay quy trình cưỡng chế khóa khẩn cấp Break-Glass.

---

### Phân Hệ 2: Khóa Khẩn Cấp Xác Thực Kép Break-Glass (US10 / FR08)

#### 1. Mục đích & Mục tiêu
- **Mục đích:** Lập tức phong tỏa hoàn toàn tài khoản của nhân sự vi phạm mà không cần thông qua sự đồng ý của Trưởng Chi nhánh quản lý trực tiếp.
- **Mục tiêu:** Ngăn chặn việc lạm dụng quyền lực bằng cơ chế **Xác thực kép (Dual-Authorization):** Phải có sự phối hợp giữa Ban Pháp chế và Trưởng Ban Kiểm toán nội bộ qua mã OTP và Chữ ký số mới kích hoạt được.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR08-03 (Cơ Chế Mở Khóa Kiểm Toán Khẩn Cấp - Dual-Authorization Break-Glass)`: Phục vụ điều tra pháp lý với sự đồng phê duyệt bằng chữ ký số/OTP của đồng thời **02 chủ thể độc lập**: Super Admin (HQ) và Trưởng Ban Pháp chế / Kiểm soát nội bộ (`DEC-PO-10`).
- `BR08-03b (Bắt Buộc Xác Thực Token OTP & Mã Vụ Việc)`: Thao tác Break-Glass bắt buộc phải có Mã hồ sơ thanh tra hợp lệ và Mã OTP bảo mật 6 số từ thiết bị Token phần cứng của Ban Kiểm toán. Thiếu 1 trong 2 thông tin trên hệ thống sẽ từ chối thực thi.
- `BR08-04 (Cảnh Báo Đỏ & Lưu Vết Bảo Mật)`: Khi kích hoạt thành công, hệ thống lập tức hủy toàn bộ phiên làm việc của tài khoản trên toàn quốc, chuyển tài khoản sang trạng thái phong tỏa đặc biệt và ghi nhận vĩnh viễn vào Security Audit Log.

#### 3. Quy trình thao tác Break-Glass khẩn cấp
1. Tại khung cảnh báo vi phạm của Đoàn Thanh L, nhấp vào nút đỏ **"Khóa Khẩn Cấp Break-Glass (Dual OTP)"**.
2. Hộp thoại kích hoạt đặc quyền hiện ra:
   - **Mã Hồ Sơ Thanh Tra:** Bắt buộc nhập (ví dụ: `CASE-2026-FPT-089`).
   - **Lý Do Khóa Khẩn Cấp:** Ghi rõ căn cứ pháp lý (ví dụ: *"Nhân sự thôi việc chưa thu hồi tài khoản theo Quyết định số 142/QĐ-FPT"*).
   - **Mã Xác Thực Kép (Dual-Authorization OTP):** Nhập mã bảo mật 6 số từ thiết bị Token của Ban Kiểm toán (ví dụ: `889241`).
3. Nhấp nút **"Xác Nhận Kích Hoạt Break-Glass"**.
4. **Hành vi thực thi của hệ thống:**
   - Tài khoản `ZENT-001301` lập tức bị cưỡng chế khóa toàn diện trên toàn quốc.
   - Toàn bộ phiên làm việc của nhân viên bị hủy bỏ; khách hàng gửi tin nhắn sẽ nhận được phản hồi hệ thống chuyển tiếp.
   - Hồ sơ vụ việc được ghi nhận vĩnh viễn vào Sổ kiểm toán bất biến với cấp độ `CRITICAL SECURITY EVENT`.

---

### Phân Hệ 3: Sổ Nhật Ký Kiểm Toán Bất Biến & Xuất Báo Cáo CSV (Audit Ledger)

#### 1. Mục đích & Mục tiêu
- Cung cấp bằng chứng pháp lý đầy đủ trước ban lãnh đạo hoặc cơ quan tư pháp khi xảy ra tranh chấp quyền sở hữu dữ liệu, gian lận thương mại hoặc lộ lọt thông tin.

#### 2. Quy tắc nghiệp vụ & Điều kiện chặn (Business Rules)
- `BR08-01 (Nhật Ký Bất Biến Append-only)`: Nhật ký thao tác hệ thống là bất biến (chỉ ghi thêm, tuyệt đối không cho phép chỉnh sửa hoặc xóa bỏ bản ghi), lưu trữ tối thiểu 12 tháng (`A-007`).
- `BR08-02 (Sự Kiện Bắt Buộc Ghi Vết)`: Ghi nhận mọi sự kiện: Phân bổ Quota, Cưỡng chế thu hồi, Cấp phát tài khoản, Tạm khóa, Mở khóa, Offboarding, Handover danh bạ, Khóa khẩn cấp Break-glass. Mỗi bản ghi bắt buộc có đủ: *Thời điểm, Mã sự kiện, Người thực hiện, Chi tiết hành vi, Địa chỉ IP và Kết quả*.

#### 3. Quy trình xuất bằng chứng kiểm toán
1. Nhấp vào mục **"Sổ Nhật Ký Kiểm Toán (Bất Biến)"** tại thanh điều hướng bên trái.
2. Rà soát bảng dữ liệu gồm 5 cột chuẩn mực: `Thời Điểm (Timestamp)`, `Mã Sự Kiện`, `Người Thực Hiện`, `Chi Tiết Hành Vi`, `Địa Chỉ IP & Kết Quả`.
3. Nhấp nút **"Xuất Hồ Sơ Bằng Chứng Kiểm Toán"** ở góc phải trên cùng màn hình.
4. Hệ thống tự động tạo tệp `audit_evidence_ledger_FPT_2026.csv` và tải về máy tính để phục vụ công tác thanh tra.

---

# 3. MA TRẬN PHÂN QUYỀN CHỨC NĂNG (RBAC CAPABILITY MATRIX)

Bảng ma trận xác định rõ tính năng nào được phép thao tác bởi vai trò nào (áp dụng nghiêm ngặt theo RBAC):

| Mã Tính Năng | Tên Tính Năng & Phân Hệ | Super Admin (HQ) | Region Admin | Branch Admin | Sales Rep | Legal & Audit |
|:---:|---|:---:|:---:|:---:|:---:|:---:|
| **FR01** | Quản trị Kho Quota Toàn Quốc (4,500) | **Chủ sở hữu** | Chỉ xem | Không | Không | Giám sát |
| **FR01b**| Điều tiết Quota nội bộ Vùng & Cứu trợ | Phê duyệt cấp thêm | **Chủ sở hữu** | Gửi đề xuất | Không | Giám sát |
| **FR02** | Cấp mới tài khoản bằng Email FPT | Chỉ xem | Chỉ xem | **Chủ sở hữu** | Không | Kiểm toán |
| **FR03** | Tạm khóa / Mở khóa tài khoản (AC-03b) | Toàn quyền | Toàn quyền | **Chủ sở hữu** | Bị áp dụng | Khóa khẩn |
| **FR04** | Cấu hình thời gian khóa phiên (Timeout)| **Chủ sở hữu** | Không | Không | Bị áp dụng | Kiểm toán |
| **FR05** | Gọi thoại 1-1 Zalo OA & Lưu Metadata | Không | Không | Xem báo cáo | **Chủ sở hữu** | Xem Metadata |
| **FR06** | Ẩn số điện thoại khách hàng (Masking) | 100% Masked | 100% Masked | 100% Masked | 100% Masked | Mở theo vụ việc |
| **FR07** | Bàn giao danh bạ & Bot chào ($\le 5$ tin/s) | Giám sát | Giám sát | **Chủ sở hữu** | Tiếp nhận | Kiểm tra lưu trữ |
| **FR08** | Khóa cưỡng chế đặc quyền (Break-Glass)| Cùng ký duyệt | Nhận thông báo | Nhận thông báo | Bị khóa | **Chủ trì thực hiện**|
| **FR09** | Xuất sổ nhật ký kiểm toán bất biến CSV | Xem | Xem | Xem chi nhánh | Không | **Chủ sở hữu** |
| **FR10** | Tác nghiệp chat đa kênh B2B (Omnichannel)| Không | Không | Không | **Chủ sở hữu** | Không |

*Ghi chú:*
- **Chủ sở hữu (Owner):** Người có quyền cao nhất thực thi và chịu trách nhiệm về tính năng.
- **Chỉ xem (Read-only):** Được phép theo dõi số liệu báo cáo nhưng không có quyền bấm nút can thiệp.
- **Không (No Access):** Phân hệ bị ẩn hoàn toàn khỏi thanh điều hướng của vai trò đó.

---

# 4. HƯỚNG DẪN XỬ LÝ NGOẠI LỆ & CÂU HỎI THƯỜNG GẶP (FAQS)

### Câu hỏi 1: Tại sao khi Branch Admin bấm tạm khóa tài khoản nhân viên, hệ thống báo lỗi không cho lưu?
* **Nguyên nhân:** Bạn đang nhập lý do tạm khóa dưới 10 ký tự hoặc để trống trường thông tin.
* **Cách khắc phục:** Theo chuẩn nghiệp vụ `AC-03b.2.01`, bạn phải nhập giải trình tối thiểu 10 ký tự (ví dụ: *"Nhân sự tạm dừng công việc đi học quân sự"*). Quy định này nhằm chống việc Trưởng Chi nhánh khóa tài khoản tùy tiện không rõ nguyên nhân.

### Câu hỏi 2: Chi nhánh HCM 02 đang bị Zero Quota, nhân viên mới vào không thể tạo được tài khoản thì xử lý thế nào?
* **Cách xử lý:** 
  1. Trưởng Chi nhánh HCM 02 liên hệ với Ban Điều Hành Vùng Miền Nam.
  2. Region Admin sẽ mở **Trung Tâm Chỉ Huy Vùng Miền Nam**, tìm đến Chi nhánh HCM 02 và bấm nút **"Bơm Cấp 20 Quota Ngay"**.
  3. Kho Quota của HCM 02 sẽ lập tức có 20 hạn ngạch tự do để tiếp tục cấp tài khoản bình thường theo quy tắc `AC-02.1.01`.

### Câu hỏi 3: Trong quá trình bàn giao 127 khách hàng của anh Phạm Văn D, tại sao hệ thống phải chạy thanh tiến trình và gửi từ từ mà không chuyển ngay lập tức trong 1 giây?
* **Giải thích nghiệp vụ:** Hệ thống áp dụng quy tắc kỹ thuật `FR07` & `BR07-05`: **Giới hạn tốc độ gửi Bot chào không vượt quá 5 tin nhắn/giây (Throttling)**. Nếu gửi đồng loạt 127 tin nhắn trong 1 tích tắc, Zalo Platform sẽ gắn cờ tài khoản doanh nghiệp là hành vi Spam tự động và có nguy cơ khóa toàn bộ kênh OA của FPT Telecom. Cơ chế gửi điều tiết bảo đảm 100% an toàn pháp lý kỹ thuật.

### Câu hỏi 4: Sales có thể xem số điện thoại thật của khách hàng để gọi bằng điện thoại cá nhân không?
* **Trả lời:** **Tuyệt đối không.** Theo chính sách bảo vệ dữ liệu Privacy Level 5 (`FR06` & `BR04-03`), 100% số điện thoại trên giao diện đều hiển thị dạng `090****567`. Sales chỉ được phép liên hệ với khách hàng qua tính năng **Gọi Zalo OA (US05 / BR05-03)** tích hợp sẵn trên hệ thống. Mọi hành vi cố tình dò tìm số điện thoại trần sẽ bị ghi nhận vào Sổ nhật ký kiểm toán và xử lý kỷ luật.

### Câu hỏi 5: Nếu phiên làm việc của tôi bị khóa do không hoạt động (Session Timeout), dữ liệu đang nhập dở có bị mất không?
* **Trả lời:** Hệ thống Z-Enterprise có cơ chế lưu nháp tự động (Auto-save draft) trong bộ nhớ đệm trình duyệt theo `BR04-02`. Khi hết thời gian phiên (ví dụ sau 30 phút), màn hình sẽ hiển thị thông báo khóa phiên an toàn. Bạn chỉ cần nhập lại mật khẩu/mã xác thực để mở khóa và tiếp tục công việc mà không làm mất nội dung văn bản đang soạn thảo.

---
*(Hết tài liệu Hướng Dẫn Sử Dụng — FPT Telecom ISC Z-Enterprise Platform)*
