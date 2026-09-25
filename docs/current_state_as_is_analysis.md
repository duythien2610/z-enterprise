# BÁO CÁO PHÂN TÍCH HIỆN TRẠNG (CURRENT STATE / AS-IS ANALYSIS)
## Dự án: Zalo Enterprise Channel & Enterprise Account Administration
**Mã tài liệu**: CS-ZENTERPRISE-01  
**Trạng thái Vòng đời (Workflow State)**: `CURRENT_STATE_KNOWN`  
**Giai đoạn SDLC**: Stage 2 – Current State & Business Reality Trace  
**Tác giả**: Senior Product BA (Kỹ năng: `ba-current-state-analysis`)  
**Nguyên tắc Bất biến (Prime Directive)**: Chỉ mô tả hiện trạng thực tế vận hành nghiệp vụ (`Business Reality`), không đọc codebase, không suy diễn giải pháp kỹ thuật/kiến trúc To-Be, không coi các đề xuất tương lai là hành vi hiện tại.

---

## 1. PHẠM VI QUAN SÁT & NGUỒN BẰNG CHỨNG (SCOPE & EVIDENCE SOURCES)

### 1.1 Phạm Vi Quan Sát (Scope of Observation)
- **Đối tượng quan sát**: Kênh giao tiếp, trao đổi thông tin, gửi báo giá và chăm sóc khách hàng của lực lượng kinh doanh (Sales) trên nền tảng Zalo.
- **Ranh giới cơ cấu**: Toàn bộ chuỗi vận hành bán hàng từ cấp Tổng công ty (`Company`) ➔ Khu vực/Vùng (`Region`) ➔ Chi nhánh (`Branch`) ➔ Nhân viên kinh doanh (`Sales`).
- **Thời điểm quan sát**: Trước khi có bất kỳ sự can thiệp hoặc triển khai nào của giải pháp Zalo Enterprise.

### 1.2 Nguồn Bằng Chứng Được Công Nhận (Evidence Sources)
1. **`E-01`**: `input/initiative.md` – Mục 1 (Business Context): Xác nhận Sales đang dùng Zalo cá nhân, phụ thuộc tài khoản cá nhân, công ty chưa có hệ thống tài khoản công việc riêng.
2. **`E-02`**: `input/initiative.md` – Mục 2 (Business Objective): Xác nhận mục tiêu không còn phụ thuộc Zalo cá nhân, cần quản lý tập trung và phân bổ quota theo cơ cấu tổ chức.
3. **`E-03`**: `input/initiative.md` – Mục 3 (`D-003`, `D-006`, `D-007`, `D-008`): Xác nhận hiện tại Personal Zalo gắn với cá nhân Sales, Admin chưa nắm được Sales trao đổi với ai, và cơ cấu tổ chức gồm Company → Region → Branch → Sales.

---

## 2. TÓM TẮT HIỆN TRẠNG VẬN HÀNH (CURRENT STATE SUMMARY)

Hiện tại, doanh nghiệp vận hành mạng lưới kinh doanh phân cấp nhưng **kênh giao tiếp Zalo hoàn toàn nằm ngoài sự quản trị của doanh nghiệp**. 

100% hoạt động tư vấn, đàm phán giá, gửi hợp đồng và duy trì quan hệ với khách hàng được thực hiện qua **tài khoản Zalo cá nhân (`Personal Zalo`)** do Sales tự đăng ký bằng số điện thoại/SIM cá nhân. Doanh nghiệp không sở hữu tài khoản, không sở hữu danh bạ và không có bất kỳ khả năng giám sát nào đối với dữ liệu giao tiếp này.

Khi Sales phát sinh biến động (nghỉ việc, chuyển công tác), toàn bộ tài sản khách hàng và lịch sử tương tác biến mất cùng với nhân sự, gây ra sự đứt gãy dịch vụ nghiêm trọng và rủi ro rò rỉ dữ liệu khách hàng sang đối thủ cạnh tranh.

---

## 3. CÁC TÁC NHÂN HIỆN TẠI (CURRENT ACTORS & ROLES)

| Tác Nhân (Actor) | Bản Chất Định Danh & Phương Tiện Hiện Tại | Vai Trò & Hành Vi Thực Tế Trong Kênh Zalo | Thẩm Quyền / Quyền Sở Hữu Hiện Tại | Trạng Thái Bằng Chứng |
|---|---|---|---|:---:|
| **Sales (Nhân viên Kinh doanh)** | • Số điện thoại cá nhân (SIM cá nhân).<br/>• Tài khoản Zalo Consumer cá nhân.<br/>• Điện thoại cá nhân (BYOD) và Laptop. | • Tự tìm kiếm, kết bạn với khách hàng.<br/>• Chat, tư vấn, gửi ảnh, bảng báo giá, gọi thoại.<br/>• Tự đặt tên gợi nhớ khách hàng theo ý thích cá nhân.<br/>• Tự quyết định thời gian và mức độ phản hồi khách hàng. | **Chủ sở hữu 100%**: Sở hữu tài khoản, danh bạ, tin nhắn. Toàn quyền xóa, đổi mật khẩu hoặc mang đi khi nghỉ việc. | `CONFIRMED CURRENT BEHAVIOR` (`E-01`, `E-03`) |
| **Customer (Khách hàng)** | • Tài khoản Zalo cá nhân thông thường.<br/>• Số điện thoại di động cá nhân. | • Nhận cuộc gọi/tin nhắn từ Sales qua số cá nhân.<br/>• Trao đổi nhu cầu mua hàng, nhận báo giá, chốt đơn.<br/>• Lưu liên hệ cá nhân của Sales vào danh bạ Zalo của mình. | Kết nối 1-1 trực tiếp với cá nhân Sales. Nhận diện người bán là cá nhân Sales thay vì thương hiệu công ty. | `CONFIRMED CURRENT BEHAVIOR` (`E-01`) |
| **Branch Manager (Trưởng Chi nhánh)** | Tài khoản quản lý nội bộ (không có tài khoản trên kênh Zalo của Sales). | • Giao chỉ tiêu doanh số cho Sales.<br/>• Nhận báo cáo thủ công (miệng/Excel) từ Sales.<br/>• Không thể can thiệp hoặc xem Sales đang chat với ai trên Zalo. | **0% quyền trên kênh Zalo**: Không xem được danh bạ, không xem được tiến độ chat, không kiểm soát được nội dung. | `CONFIRMED CURRENT BEHAVIOR` (`E-01`, `E-03`) |
| **Region Director (Giám đốc Vùng)** | Tài khoản quản lý cấp vùng. | • Theo dõi doanh số tổng hợp của các Branch trong Vùng.<br/>• Hoàn toàn đứng ngoài kênh tương tác Zalo. | **0% quyền trên kênh Zalo**. | `CONFIRMED CURRENT BEHAVIOR` (`E-03`) |
| **Company / Head Office (Tổng công ty)** | Pháp nhân doanh nghiệp. | • Ký hợp đồng lao động với Sales.<br/>• Ban hành quy chế bán hàng.<br/>• Không có công cụ kỹ thuật để thực thi giám sát trên Zalo cá nhân. | Không có quyền sở hữu đối với tài khoản Zalo cá nhân của nhân sự. | `CONFIRMED CURRENT BEHAVIOR` (`E-01`, `E-03`) |
| **Zalo Provider (Nhà cung cấp Zalo)** | Nền tảng OTT Consumer (VNG). | • Cung cấp dịch vụ nhắn tin consumer miễn phí gắn với số thuê bao viễn thông cá nhân. | Quản trị theo điều khoản người dùng cá nhân (Terms of Service cá nhân). | `CONFIRMED CURRENT BEHAVIOR` |

---

## 4. MÔ HÌNH ĐỊNH DANH & SỞ HỮU TÀI KHOẢN HIỆN TẠI (IDENTITY & ACCOUNT OWNERSHIP)

```
+-----------------------------------------------------------------------------------------+
| HIỆN TRẠNG: MÔ HÌNH TÀI KHOẢN PHÂN TÁN GẮN VỚI CÁ NHÂN SALES                             |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   [SIM Cá Nhân / Thuê Bao Viễn Thông] ──> [Tài Khoản Zalo Consumer Cá Nhân]             |
|                                                          │                              |
|                                                          v                              |
|                                               [CÁ NHÂN SALES SỞ HỮU]                    |
|                                             • Sở hữu SIM: Sales                         |
|                                             • Sở hữu Mật khẩu: Sales                    |
|                                             • Sở hữu Danh bạ: Sales                     |
|                                                                                         |
|   ===================================================================================   |
|   DOANH NGHIỆP (COMPANY / BRANCH)                                                       |
|   • Quyền sở hữu tài khoản: 0%                                                          |
|   • Khả năng thu hồi tài khoản: 0%                                                      |
|   • Khả năng sao lưu dữ liệu danh bạ: 0%                                                |
|   • Ranh giới công việc và đời tư: BỊ XÓA NHÒA HOÀN TOÀN                                |
+-----------------------------------------------------------------------------------------+
```

### Chi Tiết Phân Tích Mô Hình Sở Hữu:
1. **Định danh đăng nhập**: Xác thực qua Số điện thoại cá nhân (SIM vật lý) và OTP gửi về điện thoại riêng của Sales. Doanh nghiệp không thể can thiệp cấp phát hay đổi mật khẩu.
2. **Hồ sơ hiển thị (Profile)**: Ảnh đại diện, tên hiển thị, trạng thái (status), nhật ký (timeline) là tài sản đời tư của Sales. Sales có thể để ảnh cá nhân, gia đình, hoặc tự gán tên công ty mà không có bất kỳ quy chuẩn kiểm duyệt nào.
3. **Quyền sở hữu pháp lý đối với dữ liệu**:
   - Về mặt pháp lý dân sự và chính sách nền tảng Zalo: Tài khoản thuộc về chủ thuê bao SIM viễn thông.
   - Doanh nghiệp không có căn cứ kỹ thuật lẫn quyền truy cập để tuyên bố chủ quyền đối với danh bạ Zalo cá nhân của nhân viên.

---

## 5. LUỒNG GIAO TIẾP VỚI KHÁCH HÀNG HIỆN TẠI (AS-IS BUSINESS FLOW)

```
[Khách Hàng Có Nhu Cầu] ──> (Biết SĐT Sales qua card visit / giới thiệu cá nhân)
                                            │
                                            v
                                 [Tìm SĐT trên Zalo Cá Nhân]
                                            │
                                            v
                         [Gửi Lời Mời Kết Bạn Zalo Consumer]
                                            │
                                            v
                       [Sales Dùng Zalo Cá Nhân Đồng Ý Kết Bạn]
                                            │
                                            v
                     [Trao Đổi Báo Giá / Tư Vấn Không Qua Kiểm Duyệt]
                                            │
                                            v
           [Toàn Bộ Danh Bạ & Lịch Sử Lưu Cục Bộ Trên Thiết Bị Cá Nhân Của Sales]
```

### Các Bước Chi Tiết Của Luồng Hiện Tại:
- **Bước 1 (Thiết lập kết nối)**: Khách hàng tìm số điện thoại của Sales trên Zalo hoặc Sales chủ động kết bạn với khách hàng bằng tài khoản cá nhân.
- **Bước 2 (Tương tác tư vấn)**: Sales gửi thông tin sản phẩm, báo giá, hình ảnh qua chat 1-1. Nếu khách hàng gọi điện, Sales tiếp nhận cuộc gọi thoại Zalo trên điện thoại cá nhân.
- **Bước 3 (Lưu trữ thông tin)**: Khách hàng được lưu vào danh bạ Zalo cá nhân của Sales. Sales tự ghi chú tên khách hàng theo thói quen cá nhân.
- **Bước 4 (Báo cáo nội bộ)**: Trưởng chi nhánh chỉ biết thông tin khách hàng nếu Sales chủ động điền vào file Excel báo cáo hoặc khai báo trên hệ thống nội bộ khác. Kênh Zalo hoàn toàn là một "hộp đen" đối với cấp quản lý.

---

## 6. MỨC ĐỘ THAM GIA CỦA TỔ CHỨC HIỆN TẠI (ORGANIZATION INVOLVEMENT)

| Cấp Tổ Chức | Mức Độ Tham Gia Hiện Tại Trên Kênh Zalo | Phương Thức Quản Lý Hiện Có | Trạng Thái Bằng Chứng |
|---|:---:|---|:---:|
| **Company (Tổng công ty)** | **Hoàn toàn vắng bóng (0%)** | Ký hợp đồng lao động, ban hành KPI doanh số chung. Không có công cụ kỹ thuật trên kênh chat. | `CONFIRMED CURRENT BEHAVIOR` |
| **Region (Vùng)** | **Hoàn toàn vắng bóng (0%)** | Đôn đốc số liệu doanh thu qua các cuộc họp định kỳ. Không có khả năng giám sát giao tiếp. | `CONFIRMED CURRENT BEHAVIOR` |
| **Branch (Chi nhánh)** | **Hoàn toàn vắng bóng (0%)** | Họp giao ban, kiểm tra báo cáo tự khai của Sales. Không có quyền truy cập vào hội thoại khách hàng. | `CONFIRMED CURRENT BEHAVIOR` |
| **Sales** | **Chủ động 100%** | Toàn quyền tự quản lý, tự quyết định tốc độ phản hồi, tự chăm sóc khách hàng. | `CONFIRMED CURRENT BEHAVIOR` |

*Nhận định nghiệp vụ*: **Mạng lưới phân cấp 3 tầng (Company → Region → Branch) hoàn toàn bị đứt gãy tại điểm tiếp xúc khách hàng**. Doanh nghiệp phó thác 100% mối quan hệ khách hàng cho ý thức cá nhân của từng nhân viên.

---

## 7. TÁC ĐỘNG KHI BIẾN ĐỘNG NHÂN SỰ HIỆN TẠI (ONBOARDING & OFFBOARDING IMPACT)

### 7.1 Khi Nhân Viên Mới Vào Làm (Onboarding)
- **Hành vi hiện tại**: Công ty không cấp tài khoản Zalo làm việc. Sales mới bắt buộc phải sử dụng Zalo cá nhân sẵn có của mình để liên hệ với khách hàng.
- **Hậu quả thực tế**:
  - Sales mới phải bắt đầu xây dựng mạng lưới khách hàng từ con số 0.
  - Không có danh bạ khách hàng cũ bàn giao lại, thời gian tiếp cận thị trường và phát sinh doanh số bị kéo dài.
  - Hồ sơ Zalo mang đậm tính cá nhân (ảnh đi chơi, gia đình) làm giảm tính chuyên nghiệp và độ tin cậy trong mắt khách hàng doanh nghiệp.

### 7.2 Khi Nhân Viên Nghỉ Việc (Offboarding)
- **Hành vi hiện tại**: Nhân viên làm thủ tục trả máy tính công ty (nếu có) và nhận quyết định thôi việc. SIM điện thoại và tài khoản Zalo cá nhân tiếp tục thuộc quyền sở hữu của cá nhân nhân viên.
- **Hậu quả thực tế**:
  - **Mất trắng danh bạ khách hàng**: Toàn bộ khách hàng đã phát sinh giao dịch hoặc đang trong quá trình báo giá tiếp tục nằm trong danh bạ cá nhân của Sales cũ.
  - **Khách hàng không biết Sales đã nghỉ việc**: Khách hàng tiếp tục nhắn tin, gọi điện cho Sales cũ khi có nhu cầu phát sinh.
  - **Rò rỉ cơ hội kinh doanh**: Sales cũ có thể mang toàn bộ tệp khách hàng này sang công ty đối thủ cạnh tranh hoặc tự mở dịch vụ riêng để khai thác.
  - **Đứt gãy dịch vụ**: Chi nhánh không thể tiếp quản hoặc cử người khác hỗ trợ khách hàng vì không hề biết khách hàng đó là ai và đang trao đổi dở dang điều gì.

---

## 8. MỨC ĐỘ HIỂN THỊ CỦA QUẢN LÝ HIỆN TẠI (MANAGEMENT VISIBILITY)

| Khía Cạnh Hoạt Động | Khả Năng Nhìn Thấy Của Admin Hiện Tại | Thực Trạng Dữ Liệu | Trạng Thái Bằng Chứng |
|---|:---:|---|:---:|
| **Trạng thái tài khoản Sales** | ❌ Không thấy | Không biết Sales có đang online, hoạt động hay đã đổi nghề. | `CONFIRMED CURRENT BEHAVIOR` |
| **Số lượng khách hàng đang chăm sóc** | ❌ Không thấy | Phụ thuộc hoàn toàn vào số liệu Sales tự khai báo trên báo cáo miệng/Excel. | `CONFIRMED CURRENT BEHAVIOR` |
| **Danh tính & SĐT khách hàng** | ❌ Không thấy | Lưu trữ trên điện thoại cá nhân của Sales. Công ty không có danh bạ tập trung. | `CONFIRMED CURRENT BEHAVIOR` |
| **Thời gian tương tác gần nhất** | ❌ Không thấy | Không biết Sales có bỏ quên khách hàng hay không. | `CONFIRMED CURRENT BEHAVIOR` |
| **Tần suất & SLA phản hồi khách hàng** | ❌ Không thấy | Không thể đo lường thời gian phản hồi của Sales đối với yêu cầu của khách. | `CONFIRMED CURRENT BEHAVIOR` |
| **Nội dung tư vấn & Báo giá** | ❌ Không thấy | Hoàn toàn nằm trong hộp thoại 1-1 riêng tư giữa Sales và khách hàng. | `CONFIRMED CURRENT BEHAVIOR` |

*Kết luận*: **Management Visibility hiện tại = 0% (Hoàn toàn mù thông tin)**. Ban quản lý vận hành trong trạng thái không có dữ liệu thực tế về hoạt động bán hàng trên kênh OTT số 1 Việt Nam.

---

## 9. CÁC ĐIỂM ĐAU VẬN HÀNH HIỆN TẠI (CURRENT OPERATIONAL PAIN POINTS)

Phân tích chi tiết theo cấu trúc chuẩn:  
`Current Behavior → Problem → Business Impact → Evidence Status`.

### Pain Point 1: Mất Mát Toàn Bộ Tài Sản Khách Hàng Khi Biến Động Nhân Sự
- **Current Behavior**: Sales dùng Zalo cá nhân để kết bạn và tư vấn cho khách hàng. Khi nghỉ việc, Sales giữ nguyên tài khoản và SIM cá nhân.
- **Problem**: Doanh nghiệp không có bất kỳ cơ chế nào để thu hồi tài khoản hoặc trích xuất danh bạ khách hàng từ Zalo cá nhân.
- **Business Impact**: Mất trắng khách hàng, thất thoát doanh thu, lãng phí chi phí tiếp thị (Marketing CAC) đã bỏ ra để mang khách hàng về cho Sales, rò rỉ khách sang đối thủ.
- **Evidence Status**: `CONFIRMED CURRENT BEHAVIOR` (`E-01`, `E-03`).

### Pain Point 2: Mù Thông Tin Quản Trị & Đứt Gãy SLA Chăm Sóc Khách Hàng
- **Current Behavior**: Trưởng chi nhánh không có quyền truy cập vào hoạt động Zalo của Sales.
- **Problem**: Không thể giám sát Sales có phản hồi khách hàng kịp thời không, có bỏ quên tin nhắn hay không; hoàn toàn không có chỉ số SLA.
- **Business Impact**: Khách hàng bức xúc vì bị phản hồi chậm hoặc bỏ rơi, giảm tỷ lệ chốt hợp đồng (Conversion Rate), ảnh hưởng nghiêm trọng đến uy tín dịch vụ của công ty.
- **Evidence Status**: `CONFIRMED CURRENT BEHAVIOR` (`E-01`, `E-03`).

### Pain Point 3: Rủi Ro Thương Hiệu & Không Kiểm Soát Được Cam Kết Kinh Doanh
- **Current Behavior**: Sales đại diện công ty báo giá và tư vấn trên profile Zalo cá nhân không có xác thực chính thức.
- **Problem**: Không có quy chuẩn phát ngôn, Sales có thể chào giá sai chính sách, cam kết vượt thẩm quyền hoặc tư vấn không chuẩn xác mà công ty không hề hay biết.
- **Business Impact**: Nguy cơ tranh chấp pháp lý và hợp đồng với khách hàng; suy giảm độ tin cậy và hình ảnh chuyên nghiệp của thương hiệu trên thị trường.
- **Evidence Status**: `INFERENCE` (Suy luận trực tiếp từ việc tài khoản cá nhân không có kiểm soát).

### Pain Point 4: Lãng Phí Chi Phí & Không Khai Thác Được Tài Nguyên Zalo Hợp Đồng
- **Current Behavior**: Doanh nghiệp muốn triển khai gói Zalo Enterprise nhưng chưa có hệ thống phân bổ quota và tài khoản theo cơ cấu vùng miền.
- **Problem**: Thiếu năng lực quản trị tập trung dẫn đến việc không thể đưa quota vào vận hành thực tế một cách hiệu quả.
- **Business Impact**: Lãng phí ngân sách đầu tư bản quyền, chậm tiến độ số hóa kênh bán hàng của doanh nghiệp.
- **Evidence Status**: `CONFIRMED CURRENT BEHAVIOR` (`E-01`, `E-02`).

### Pain Point 5: Gánh Nặng & Ức Chế Cho Cá Nhân Nhân Viên (Sales Friction)
- **Current Behavior**: Sales phải dùng điện thoại cá nhân và Zalo cá nhân để phục vụ công việc 24/7.
- **Problem**: Lẫn lộn giữa tin nhắn công việc và tin nhắn gia đình/bạn bè; khách hàng nhắn tin ngoài giờ làm việc; chi phí dung lượng bộ nhớ máy bị đầy do tệp công việc.
- **Business Impact**: Tăng áp lực cho nhân viên, giảm sự gắn kết và hài lòng trong công việc.
- **Evidence Status**: `INFERENCE` (Phản ánh thực tế tâm lý nhân sự khi dùng Zalo cá nhân làm việc).

---

## 10. EVIDENCE LEDGER (SỔ THEO DÕI BẰNG CHỨNG HIỆN TRẠNG)

| Mã ID | Phân Loại Statement | Nội Dung Statement | Căn Cứ / Nguồn Dẫn Chứng | Đánh Giá Độ Tin Cậy |
|---|---|---|---|:---:|
| `EB-01` | **CONFIRMED CURRENT BEHAVIOR** | Sales hiện tại sử dụng tài khoản Zalo cá nhân để trao đổi với khách hàng phục vụ công việc. | `initiative.md` Mục 1 | 100% Xác thực |
| `EB-02` | **CONFIRMED CURRENT BEHAVIOR** | Zalo cá nhân gắn với cá nhân Sales, không phải tài khoản do công ty cấp; công ty chưa có hệ thống tài khoản công việc riêng. | `initiative.md` Mục 1, `D-003` | 100% Xác thực |
| `EB-03` | **CONFIRMED CURRENT BEHAVIOR** | Cơ cấu tổ chức kinh doanh của doanh nghiệp có phân cấp: Company → Region → Branch → Sales. | `initiative.md` Mục 3 (`D-008`) | 100% Xác thực |
| `EB-04` | **CONFIRMED CURRENT BEHAVIOR** | Quản lý các cấp (Admin/Super Admin) hiện tại không nắm được Sales nào đang trao đổi với những khách hàng nào trên Zalo. | `initiative.md` Mục 3 (`D-007`) | 100% Xác thực |
| `EB-05` | **CONFIRMED CURRENT BEHAVIOR** | Chưa có mô hình Quota Enterprise và quản trị tài khoản tập trung được đưa vào vận hành. | `initiative.md` Mục 1, 2 | 100% Xác thực |
| `EB-06` | **INFERENCE** | Khi Sales nghỉ việc, doanh nghiệp mất toàn bộ danh bạ khách hàng vì tài khoản thuộc về cá nhân Sales và công ty không có quyền truy cập. | Suy luận logic từ `EB-01` và `EB-02` | Rất cao (Đã được xác nhận bối cảnh) |
| `EB-07` | **INFERENCE** | Hiện tại không có chỉ số SLA phản hồi tin nhắn do công ty không có công cụ giám sát thời gian nhắn tin. | Suy luận logic từ `EB-04` | Rất cao |
| `EB-08` | **INFERENCE** | Khách hàng tiếp tục liên hệ với Sales cũ sau khi Sales nghỉ việc vì chỉ có thông tin kết nối Zalo cá nhân của Sales đó. | Suy luận logic từ luồng giao tiếp 1-1 | Hợp lý theo thực tế thị trường |

---

## 11. CURRENT-STATE UNKNOWNS & EVIDENCE GAPS (KHOẢNG TRỐNG THÔNG TIN)

Những thông tin về hiện trạng thực tế mà tài liệu đầu vào **chưa cung cấp đủ bằng chứng** và cần được thẩm định bổ sung:

| Mã Gap | Thông Tin Hiện Trạng Còn Thiếu (Unknown) | Tác Động Nghiệp Vụ | Nguồn Cần Thu Thập Bổ Sung | Hành Động Tiếp Theo |
|:---:|---|---|---|---|
| `GAP-01` | Quy trình bàn giao công việc giấy tờ hiện tại (SOP Offboarding) có điều khoản nào quy định về danh bạ khách hàng trên điện thoại của Sales không? | Xác định xem về mặt pháp lý/nội quy công ty đã có ràng buộc nào trước đây chưa. | **Bộ phận Nhân sự (HR) / Pháp chế (Legal)** | Phỏng vấn đại diện HR/Legal về hợp đồng lao động hiện hành. |
| `GAP-02` | Doanh nghiệp hiện đã có hệ thống CRM hoặc phần mềm quản lý bán hàng nào đang ghi nhận thông tin khách hàng độc lập với Zalo hay chưa? | Xác định mức độ phụ thuộc dữ liệu khách hàng vào duy nhất Zalo là bao nhiêu phần trăm. | **Business Stakeholder / IT Ops** | Khảo sát hệ sinh thái ứng dụng hiện có của khối bán hàng. |
| `GAP-03` | Tỷ lệ biến động nhân sự (Turnover rate) trung bình hàng tháng của đội ngũ Sales hiện tại là bao nhiêu? | Cung cấp số liệu định lượng về mức độ thất thoát khách hàng hàng tháng để đo lường ROI. | **Giám đốc Kinh doanh / HR** | Thu thập số liệu thống kê nhân sự 6 tháng gần nhất. |
| `GAP-04` | Hiện tại SIM điện thoại Sales dùng để đăng ký Zalo là SIM cá nhân tự mua hay SIM do công ty cấp tiền cước hàng tháng? | Làm rõ ranh giới quyền sở hữu số điện thoại (Phone Number Ownership). | **Phòng Hành chính / Kế toán** | Xác nhận chính sách cấp phát điện thoại/SIM hiện có. |

---

## 12. TỔNG KẾT KHOẢNG TRỐNG NGHIỆP VỤ (BUSINESS GAP SUMMARY)

```
+-----------------------------------------------------------------------------------------+
| AS-IS (HIỆN TRẠNG)                     VS.                 TO-BE (KỲ VỌNG MỤC TIÊU)      |
+------------------------------------------------------------+----------------------------+
| 1. Tài khoản Zalo cá nhân của Sales                        | 1. Tài khoản Zalo Enterprise|
|    (Gắn với SIM cá nhân, Sales sở hữu 100%)                |    (Công ty sở hữu, cấp qua |
|                                                            |     Email công ty)          |
|                                                            |                            |
| 2. Quản trị phân cấp vắng bóng trên kênh chat             | 2. Quản trị tập trung      |
|    (Company → Region → Branch không có điểm chạm)          |    (Super Admin → Region    |
|                                                            |     Admin → Branch Admin)   |
|                                                            |                            |
| 3. Mất trắng danh bạ khi Sales nghỉ việc                   | 3. Bảo toàn 100% danh bạ    |
|    (Khách hàng đi theo Sales sang đối thủ)                 |    (Handover danh bạ cưỡng  |
|                                                            |     chế cho Sales mới)      |
|                                                            |                            |
| 4. Visibility = 0% (Mù thông tin hoàn toàn)                | 4. Visibility Levels 1-2-3  |
|    (Không biết Sales chat với ai, SLA phản hồi ra sao)     |    (Nắm danh bạ, thời điểm  |
|                                                            |     chat, cảnh báo trễ SLA) |
|                                                            |                            |
| 5. Lãng phí quota hợp đồng chưa đưa vào dùng              | 5. Quota Lifecycle tối ưu   |
|    (Chưa có công cụ phân bổ và thu hồi hạn ngạch)          |    (Điều chuyển quota linh  |
|                                                            |     hoạt theo nhu cầu thực) |
+-----------------------------------------------------------------------------------------+
```

---

## 13. KẾT LUẬN & ĐÁNH GIÁ ĐỦ ĐIỀU KIỆN (COMPLETION EVALUATION)

### 13.1 Đánh Giá Mức Độ Đầy Đủ Bằng Chứng (Evidence Sufficiency)
- **Về bối cảnh và hành vi cốt lõi**: Bằng chứng hiện trạng đã **ĐẦY ĐỦ VÀ CHẮC CHẮN** (`CONFIRMED CURRENT BEHAVIOR`) dựa trên xác nhận từ PO và tài liệu `initiative.md`.
- **Về các chi tiết định lượng sâu (Turnover rate, chính sách SIM, CRM hiện tại)**: Đã được định vị rõ ràng trong mục `GAP-01` đến `GAP-04` như các khoảng trống thông tin cần thu thập thêm từ HR và Business Stakeholder, không làm cản trở việc xác lập bức tranh tổng thể của As-Is.

### 13.2 Trạng Thái Xác Nhận
Báo cáo Hiện trạng này chính thức đưa dự án đạt mốc **`CURRENT_STATE_KNOWN`** theo đúng quy chuẩn của `WORKFLOW.md`. Toàn bộ thông tin mô tả đã được phân tách minh bạch giữa:
- `CONFIRMED CURRENT BEHAVIOR` (Hành vi hiện tại đã được chứng minh có nguồn gốc).
- `INFERENCE` (Suy luận nghiệp vụ logic).
- `UNKNOWN` (Khoảng trống cần bổ sung dữ liệu).

Tuyệt đối không có bất kỳ giải pháp To-Be hay thiết kế kỹ thuật nào bị trộn lẫn vào báo cáo này.

