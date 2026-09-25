# PO DECISION INTERVIEW ROUND 2 PREPARATION & ARTIFACT AUDIT
## Initiative: Zalo Enterprise Channel & Enterprise Account Administration
**Dự án**: Z-Enterprise Platform  
**Giai đoạn**: SDLC Stage 1 – Business Problem Framing & Requirements Discovery  
**Kỹ năng thực thi**: `ba-clarification-harness` (Bổ trợ 1)  
**Ranh giới phân tích**: 100% Business Truth & Product Behavior. Không suy diễn kiến trúc kỹ thuật (API, DB, Internal Service).

---

## BẢNG ĐỐI CHIẾU 10 QUYẾT ĐỊNH ĐÃ KHÓA (CONFIRMED INVARIANTS - KHÔNG HỎI LẠI)

| Mã Quyết Định | Tên Quy Tắc | Nội Dung Chuẩn Hóa Đã Được PO Phê Duyệt | Nguồn Dẫn |
|:---:|---|---|:---:|
| **D-001** | Quota Definition | 1 Quota được Zalo cấp = 1 Tài khoản Zalo Enterprise = Cấp cho 1 Sales. | `initiative.md` §3 |
| **D-002** | Account Cardinality | Mỗi Sales chỉ được sở hữu duy nhất 1 tài khoản Zalo Enterprise hoạt động. | `initiative.md` §3 |
| **D-003** | Account Ownership | Enterprise Account do công ty cấp, độc lập hoàn toàn với Personal Zalo; Personal Zalo nằm ngoài phạm vi hệ thống. | `initiative.md` §3 |
| **D-004** | Identity & Login | Phương thức định danh và đăng nhập hiện tại là Email công ty. | `initiative.md` §3 |
| **D-005** | Multi-platform Sync | Các môi trường hỗ trợ sử dụng cùng Enterprise Account và dữ liệu được đồng bộ với nhau. | `initiative.md` §3 |
| **D-006** | Usage Responsibility | Sales tự chịu trách nhiệm đối với hoạt động thực hiện bằng Enterprise Account được cấp; không có yêu cầu hoạt động phải giữ riêng tư khỏi công ty. | `initiative.md` §3 |
| **D-007** | Visibility Baseline | Admin/Super Admin cần biết Sales nào đang trao đổi với customer nào. Depth chưa chốt (BA phân tích và PO duyệt). | `initiative.md` §3 |
| **D-008** | Organization Hierarchy | Cơ cấu tổ chức phân cấp cố định: Company → Region → Branch → Sales. | `initiative.md` §3 |
| **D-009** | Admin Capabilities | Năng lực Admin các cấp do BA đề xuất và PO phê duyệt. | `initiative.md` §3 |
| **D-010** | MVP Capabilities | Năng lực toàn bộ Z-Enterprise và phạm vi MVP do BA đề xuất và PO phê duyệt. | `initiative.md` §3 |

---

# PHẦN 1: EVIDENCE LOOKUP BACKLOG
*Bao gồm các câu hỏi hoặc điểm thắc mắc nghiệp vụ có thể trả lời trực tiếp từ bằng chứng sẵn có (`initiative.md`, `current_state_as_is_analysis.md`, các quyết định `D-001` đến `D-010`). Không đưa vào phỏng vấn PO.*

| Mã Tra Cứu | Câu Hỏi / Vấn Đề Nghiệp Vụ | Câu Trả Lời Đã Được Xác Thực Bởi Bằng Chứng | Nguồn Bằng Chứng Cụ Thể | Trạng Thái Bằng Chứng |
|:---:|---|---|---|:---:|
| **EL-01** | Sales có được dùng Personal Zalo song song với Zalo Enterprise không? | **Có, nhưng độc lập hoàn toàn**. Personal Zalo của Sales hoàn toàn nằm ngoài phạm vi Z-Enterprise. Doanh nghiệp chỉ quản trị tài khoản Enterprise phục vụ công việc và không can thiệp vào Zalo cá nhân của nhân sự. | `initiative.md` Mục 1 & 3 (`D-003`); `current_state_as_is_analysis.md` §10 (`EB-02`) | **CONFIRMED FACT** |
| **EL-02** | Doanh nghiệp có yêu cầu bổ sung đăng nhập bằng Quét mã QR, Đăng nhập qua SMS OTP, hoặc SSO trong giai đoạn này không? | **Không**. Phương thức định danh và đăng nhập bắt buộc duy nhất hiện tại là Email công ty. Tài liệu quy định rõ: "Không tự bổ sung QR, SSO hoặc phương thức login khác thành requirement nếu chưa có PO Decision." | `initiative.md` Mục 3 (`D-004`) | **CONFIRMED FACT** |
| **EL-03** | Một Sales có thể giữ 2 tài khoản Enterprise để phụ trách 2 nhóm khách hàng khác nhau không? | **Không**. Nguyên tắc bất biến 1-1: Mỗi Sales chỉ được cấp duy nhất 1 tài khoản Zalo Enterprise. | `initiative.md` Mục 3 (`D-002`) | **CONFIRMED FACT** |
| **EL-04** | Doanh nghiệp có bắt buộc phải bảo mật nội dung công việc của Sales trên Enterprise Account khỏi sự quản lý của công ty không? | **Không**. "Không tồn tại requirement rằng hoạt động bên trong Enterprise Account phải được giữ riêng tư khỏi doanh nghiệp chỉ vì Sales là người sử dụng account." Hoạt động trên Enterprise Account hoàn toàn thuộc phạm vi quản trị của doanh nghiệp. | `initiative.md` Mục 3 (`D-006`) | **CONFIRMED FACT** |
| **EL-05** | Có được bổ sung thêm cấp quản lý trung gian như "Cụm chi nhánh", "Phòng ban", hay "Tổ/Đội" vào cây tổ chức không? | **Không**. Cơ cấu tổ chức chuẩn hóa gồm đúng 4 cấp: `Company → Region → Branch → Sales`. Không tự thêm tầng organization khác nếu chưa có business need được PO phê duyệt. | `initiative.md` Mục 3 (`D-008`) | **CONFIRMED FACT** |
| **EL-06** | Ai là người chịu trách nhiệm pháp lý và đạo đức đối với các phát ngôn, tin nhắn và người kết bạn trên Enterprise Account? | **Chính cá nhân Sales được cấp tài khoản**. Sales tự chịu trách nhiệm đối với người họ kết bạn, contact họ liên hệ và mọi hoạt động trao đổi thực hiện bằng tài khoản được cấp. | `initiative.md` Mục 3 (`D-006`) | **CONFIRMED FACT** |
| **EL-07** | Dữ liệu trò chuyện và danh bạ có thể truy cập từ những nền tảng nào và có đồng bộ không? | **Các môi trường hỗ trợ sử dụng cùng Enterprise Account và dữ liệu đồng bộ đa nền tảng** (PC App, Web, Mobile App). | `initiative.md` Mục 3 (`D-005`) | **CONFIRMED DIRECTION** |
| **EL-08** | Nguồn gốc Quota ban đầu của toàn hệ thống được tạo ra từ đâu? | **Doanh nghiệp ký hợp đồng trực tiếp với nhà cung cấp Zalo**; Zalo cấp tổng định mức Quota cho cấp cao nhất của doanh nghiệp (`Company`). | `initiative.md` Mục 2, Mục 3 (`D-001`) | **CONFIRMED FACT** |

---

# PHẦN 2: DERIVED DECISIONS
*Các quyết định sản phẩm được suy luận logic một cách tất yếu và chặt chẽ từ các nguyên tắc đã xác nhận (`D-001` đến `D-010`). Không cần hỏi lại PO vì đã có kết quả xác định duy nhất (Deterministic).*

| Mã Suy Luận | Vấn Đề Sản Phẩm | Quyết Định Tất Yếu (Derived Decision) | Căn Cứ Suy Luận Logic (Derivation Logic) |
|:---:|---|---|---|
| **DD-01** | Định mức trần tài khoản Active trong toàn công ty | Tổng số Enterprise Account ở trạng thái hoạt động (`ACTIVE`) tại bất kỳ thời điểm nào **tuyệt đối không bao giờ vượt quá** tổng số Quota mà Zalo đã cấp theo hợp đồng. | Suy luận trực tiếp từ `D-001` (1 Quota = 1 Account) và `D-002` (1 Sales = 1 Account). Không tồn tại khái niệm "bán khống Quota" (Over-subscription). |
| **DD-02** | Ranh giới hiển thị và quản trị của Region Admin vs Branch Admin | - **Region Admin**: Chỉ được nhìn thấy và điều phối Quota/báo cáo của các Branch trực thuộc Region của mình; hoàn toàn không nhìn thấy dữ liệu của Region khác.<br/>- **Branch Admin**: Chỉ được quản trị tài khoản và danh bạ Sales trực thuộc Branch mình; không có quyền thao tác trên Sales của Branch khác. | Suy luận trực tiếp từ cây phân cấp 3 tầng `Company → Region → Branch → Sales` (`D-008`). Đây là nguyên tắc phân quyền phân cấp chuẩn tắc (Hierarchical Isolation). |
| **DD-03** | Dòng chảy phân bổ Quota bắt buộc theo cấp bậc | Quota bắt buộc phải luân chuyển tuần tự: `Company Quota Pool` ➔ `Region Quota Pool` ➔ `Branch Quota Pool` ➔ `Gán cho Sales`. Không được phép nhảy cóc cấp (ví dụ: Super Admin không gán thẳng quota cho Sales cá nhân mà phải qua đơn vị chi nhánh). | Suy luận từ `D-008`: Super Admin phân bổ xuống tổ chức bên dưới; Admin tiếp tục quản lý/phân bổ cho Sales thuộc phạm vi được giao. |
| **DD-04** | Cơ chế hoàn trả Quota khi đóng tài khoản Sales | Khi một tài khoản Enterprise Account bị thu hồi hoặc hủy bỏ (do Sales thôi việc), định mức 1 Quota **bắt buộc phải được giải phóng và hoàn trả về Quota Pool** (tối thiểu là Branch Pool), không được làm mất Quota của doanh nghiệp. | Suy luận từ `D-001` và bài toán tối ưu chi phí bản quyền (`M-01`): Quota là tài sản trả phí theo thời hạn, đóng tài khoản phải hồi phục lại hạn ngạch sử dụng. |
| **DD-05** | Ngăn chặn tính năng Đăng ký Tự do (No Self-service Signup) | Sales **không thể tự bấm đăng ký tài khoản Z-Enterprise** từ màn hình Login. Tài khoản phải được khởi tạo và gán quyền bởi Admin có thẩm quyền thông qua Email công ty. | Suy luận từ `D-003` (công ty cấp) và `D-004` (định danh bằng email công ty). Nếu cho tự đăng ký sẽ phá vỡ quy chế kiểm soát định mức Quota. |
| **DD-06** | Tính nhất quán dữ liệu giữa các thiết bị đăng nhập | Mọi tin nhắn gửi/nhận, danh bạ thêm mới, hoặc thao tác đổi tên gợi nhớ khách hàng trên một thiết bị (ví dụ: PC) **phải lập tức phản ánh đồng nhất** trên thiết bị thứ 2 (Mobile App). | Suy luận từ `D-005`: Dữ liệu được đồng bộ xuyên suốt giữa các môi trường truy cập để đảm bảo tính liên tục của công việc. |

---

# PHẦN 3: REVERSIBLE ASSUMPTION REGISTER
*Bảng đăng ký các giả định kỹ thuật/vận hành rủi ro thấp (`A-###`). Đây là các quyết định mang tính thông lệ (working conventions) có thể tạm thời áp dụng để thiết kế chi tiết PRD/Wireframe mà không làm thay đổi chính sách hay hành vi cốt lõi của sản phẩm. Nếu PO muốn điều chỉnh trong tương lai, chi phí thay đổi rất thấp (Reversible).*

| Mã Giả Định | Khía Cạnh Áp Dụng | Nội Dung Giả Định Tạm Thời (Working Assumption) | Đánh Giá Mức Độ Rủi Ro | Ranh Giới Đảo Ngược (Reversibility Boundary) |
|:---:|---|---|:---:|---|
| **A-001** | Điều kiện tiên quyết định danh | Mọi Sales trong danh sách được cấp tài khoản đều đã có tài khoản Email công ty đang hoạt động bình thường trước khi Branch Admin thao tác gán tài khoản. | Cực thấp (Low) | Nếu nhân viên chưa có email công ty, Branch Admin không thể gán account; quy trình chờ HR cấp email trước. |
| **A-002** | Thời hạn hiệu lực thư mời kích hoạt (Invite Token) | Thư mời kích hoạt tài khoản gửi qua email có thời hạn hiệu lực là **72 giờ**. Sau 72 giờ nếu Sales chưa kích hoạt, token hết hạn và Branch Admin có nút "Gửi lại lời mời" (Resend Invite). | Rất thấp (Low) | Có thể cấu hình lại thành 24h, 48h hoặc 7 ngày trong tham số hệ thống mà không ảnh hưởng logic lõi. |
| **A-003** | Giới hạn thiết bị đăng nhập đồng thời | Mỗi tài khoản Enterprise Account được phép đăng nhập đồng thời trên **tối đa 02 thiết bị vật lý** (01 PC/Web Client + 01 Mobile App). Khi đăng nhập trên thiết bị thứ 3 cùng loại, hệ thống tự động đăng xuất (logout) phiên cũ nhất. | Thấp (Low) | Có thể tăng lên 3 thiết bị hoặc giới hạn 1 thiết bị thông qua tham số cấu hình Session Policy. |
| **A-004** | Dung lượng tệp đính kèm trong chat MVP | Dung lượng tệp đính kèm tối đa cho một lần gửi tài liệu (PDF, Word, Excel) qua chat tạm thời giới hạn ở mức **25 MB/file**; các định dạng file thực thi (.exe, .bat, .sh) bị chặn tải lên. | Thấp (Low) | Có thể nâng lên 50MB hoặc 100MB tùy thuộc vào năng lực hạ tầng và giới hạn API của Zalo. |
| **A-005** | Phạm vi Nhóm chat (Group Chat) trong MVP | Phiên bản MVP Phase 1 **chỉ hỗ trợ Hội thoại 1-1** giữa Sales và Khách hàng; tính năng Tạo nhóm chat nội bộ hoặc Nhóm chat nhiều khách hàng được đưa vào Phase 2 (Should-Have). | Trung bình thấp (Low-Med) | Giúp kiểm soát chất lượng bàn giao khách hàng và đồng bộ tin nhắn; có thể bổ sung Group chat sau khi core 1-1 ổn định. |
| **A-006** | Độ trễ cập nhật báo cáo Admin | Dashboard giám sát và báo cáo quản trị Quota/Metadata vận hành theo cơ chế **Cận thời gian thực (Near Real-time)** với độ trễ dữ liệu từ 1 đến 5 phút, hoặc cập nhật ngay khi bấm nút "Làm mới dữ liệu" (Manual Refresh). | Rất thấp (Low) | Phù hợp với năng lực xử lý dữ liệu báo cáo, có thể tinh chỉnh sang Real-time Socket nếu cần thiết. |
| **A-007** | Thời gian lưu trữ vết kiểm toán (Audit Retention) | Toàn bộ nhật ký thao tác (Audit Log) về Quota, Tài khoản và Bàn giao khách hàng được lưu trữ tối thiểu **12 tháng** phục vụ tra cứu kiểm toán nội bộ. | Rất thấp (Low) | Tham số lưu trữ DB, có thể mở rộng lên 24 tháng hoặc 36 tháng theo chính sách lưu trữ chung của công ty. |

---

# PHẦN 4: PO DECISION BACKLOG
*Danh mục toàn bộ các quyết định chính sách, thẩm quyền và ranh giới nghiệp vụ bắt buộc phải do Product Owner / Decision Owner phê duyệt.*

| Nhóm Nghiệp Vụ Ưu Tiên | Mã Quyết Định | Tên Vấn Đề Quyết Định (Decision Topic) | Cấp Độ Ảnh Hưởng | Độ Khẩn Cấp (MVP vs Later) |
|---|:---:|---|---|:---:|
| **1. Customer Relationship** | `DEC-PO-01` | Quyền sở hữu Danh bạ & Ranh giới Liên hệ trên Enterprise Account | Toàn hệ thống | **Bắt buộc chốt cho MVP (Round 2)** |
| **2. Admin Visibility** | `DEC-PO-02` | Độ sâu Giám sát Hoạt động của Admin (Giải quyết `D-007`) | Trải nghiệm & Báo cáo | **Bắt buộc chốt cho MVP (Round 2)** |
| **3. Account Lifecycle** | `DEC-PO-03` | Chính sách Xử lý Tài khoản khi Sales Nghỉ việc (Reuse vs. Archive) | Vòng đời Tài khoản & Quota | **Bắt buộc chốt cho MVP (Round 2)** |
| **4. Customer Handover** | `DEC-PO-04` | Phạm vi Bàn giao Khách hàng & Kế thừa Dữ liệu Hội thoại | Nghiệp vụ Chăm sóc Khách hàng | **Bắt buộc chốt cho MVP (Round 2)** |
| **5. Sales Transfer** | `DEC-PO-05` | Chính sách Điều chuyển Sales giữa các Chi nhánh & Vùng | Phân chia Thị trường & Quota | **Bắt buộc chốt cho MVP (Round 2)** |
| **6. Quota Governance** | `DEC-PO-06` | Cơ chế Điều tiết & Thu hồi Quota Nhàn rỗi (Cưỡng chế vs. Tự nguyện) | Quản trị Nguồn lực | **Bắt buộc chốt cho MVP (Round 2)** |
| **7. Admin Permissions** | `DEC-PO-07` | Ranh giới Phê duyệt: Thao tác Tự quyết vs. Cần Cấp trên Phê duyệt | Kiểm soát Nội bộ (RBAC) | **Bắt buộc chốt cho MVP (Round 2)** |
| **8. Sales Offboarding** | `DEC-PO-08` | Trải nghiệm Khách hàng khi Nhắn tin vào Tài khoản Bị khóa/Nghỉ việc | Trải nghiệm Khách hàng (CX) | **Bắt buộc chốt cho MVP (Round 2)** |
| **9. Messaging Scope** | `DEC-PO-09` | Ranh giới Bộ Năng lực Giao tiếp Sales trong MVP (Voice Call & Voice Message) | Tiến độ Go-Live MVP | **Bắt buộc chốt cho MVP (Round 2)** |
| **10. Audit & Compliance** | `DEC-PO-10` | Cơ chế Mở khóa Kiểm toán Khẩn cấp khi Tranh chấp (Break-Glass Protocol) | Pháp chế & Tuân thủ | **Bắt buộc chốt cho MVP (Round 2)** |
| *Bổ sung (Giai đoạn sau)* | `DEC-PO-11` | Quy tắc Đặt tên Gợi nhớ Khách hàng (Đồng bộ chuẩn Doanh nghiệp vs Tự do) | Tiện ích Bán hàng | Xem xét Phase 2 |
| *Bổ sung (Giai đoạn sau)* | `DEC-PO-12` | Chính sách Giới hạn Số lượng Khách hàng Tối đa mà 1 Sales được phụ trách | Cân bằng Tải Bán hàng | Xem xét Phase 2 |

---

# PHẦN 5: PO INTERVIEW ROUND 2 (TOP 10 DECISIONS NỀN TẢNG)

> **SƠ ĐỒ PHỤ THUỘC QUYẾT ĐỊNH (DECISION DEPENDENCY GRAPH):**
> 
> ```mermaid
> graph TD
>     D01[DEC-PO-01: Customer Ownership] --> D02[DEC-PO-02: Admin Visibility Depth]
>     D01 --> D03[DEC-PO-03: Account Reuse vs. Archive]
>     D03 --> D04[DEC-PO-04: Customer Handover Scope]
>     D03 --> D05[DEC-PO-05: Sales Transfer Policy]
>     D05 --> D06[DEC-PO-06: Quota Reclaim Mechanism]
>     D06 --> D07[DEC-PO-07: Admin Approval Boundary]
>     D04 --> D08[DEC-PO-08: Inbound Message Handling]
>     D02 --> D09[DEC-PO-09: Messaging MVP Scope]
>     D02 --> D10[DEC-PO-10: Break-Glass Audit Policy]
> ```
> *Thứ tự phỏng vấn đi từ Nền tảng pháp lý & Ranh giới sở hữu (1) ➔ Mức độ giám sát (2) ➔ Vòng đời tài khoản & Bàn giao (3, 4, 5) ➔ Quản trị nguồn lực & Phân quyền (6, 7) ➔ Trải nghiệm dịch vụ & Phạm vi MVP (8, 9, 10).*

---

### DECISION 01: `DEC-PO-01`
- **Decision Topic**: Quyền sở hữu Danh bạ Khách hàng & Ranh giới Liên hệ trên Enterprise Account.
- **Context**: Sales sử dụng Enterprise Account do công ty cấp để liên lạc với khách hàng. Cần xác định tư cách pháp lý và quyền quản trị dữ liệu đối với mọi mối quan hệ kết bạn phát sinh trên tài khoản này.
- **Question**: Doanh nghiệp áp dụng chính sách sở hữu và phân loại như thế nào đối với các liên hệ (contacts) được tạo lập trên tài khoản Zalo Enterprise?
- **Options**:
  - **Option A**: Quy chế Sở hữu Tuyệt đối 100% (Zero Personal Contacts Policy).
    - *Behavior*: Toàn bộ 100% danh bạ khách hàng kết bạn trên Enterprise Account mặc nhiên là tài sản của công ty, tự động đồng bộ vào hệ thống quản trị của Chi nhánh, và có thể bị bàn giao cưỡng chế bất kỳ lúc nào. Không có tính năng gắn nhãn "Liên hệ riêng tư".
    - *Impact*: Bảo vệ triệt để tài sản công ty, ngăn chặn việc Sales giữ riêng khách hàng; Sales buộc phải tách bạch 100% việc công (dùng Enterprise Account) và việc tư (dùng Personal Zalo).
  - **Option B**: Cho phép Sales Tự phân loại Contact (Business vs. Personal Contacts).
    - *Behavior*: Khi kết bạn, Sales được quyền gắn tag: "Khách hàng công việc" hoặc "Liên hệ cá nhân". Chỉ những contact gắn tag "Khách hàng công việc" mới đồng bộ vào hệ thống quản trị của Branch Admin và bị bàn giao khi nghỉ việc.
    - *Impact*: Tạo sự thoải mái cho Sales; nhưng tạo ra kẽ hở nghiêm trọng: Sales có thể cố tình gắn nhãn "cá nhân" cho các khách hàng lớn/VIP để tránh sự giám sát và mang khách hàng đi khi nghỉ việc.
- **Affected Capability**: Quản lý Danh bạ Sales (`CAP-SALES-02`), Đồng bộ Danh bạ Doanh nghiệp (`CAP-ADMIN-04`).
- **Affected Business State**: `ACTIVE` Account, Contact Association State.
- **Why PO Decision is Required**: Xác định nền tảng pháp lý về quyền sở hữu dữ liệu khách hàng của doanh nghiệp, chi phối toàn bộ logic đồng bộ danh bạ và quy trình bàn giao khách hàng.
- **Decision Owner**: Product Owner / Chief Commercial Officer (CCO) / Legal Director.

---

### DECISION 02: `DEC-PO-02`
- **Decision Topic**: Độ sâu Giám sát Hoạt động của Quản lý các cấp (Admin Visibility Depth - Giải quyết `D-007`).
- **Context**: `D-007` xác nhận Admin/Super Admin cần biết Sales nào đang trao đổi với khách hàng nào, nhưng mức hiển thị cụ thể chưa chốt. Cần cân bằng giữa tính minh bạch quản trị (Enterprise Governance) và sự chủ động/tin cậy của Sales (Sales Operational Autonomy).
- **Question**: Mức độ hiển thị chi tiết (Visibility Depth) mà Admin các cấp được phép tiếp cận trong vận hành thường nhật là gì?
- **Options**:
  - **Option A**: Visibility Levels 1 + 2 + 3 (Trạng thái Account + Danh bạ Khách hàng + Metadata Tương tác); Khóa hoàn toàn Nội dung Tin nhắn (Level 5).
    - *Behavior*: Admin xem được danh sách khách hàng của Sales, thời điểm nhắn tin gần nhất, số lượng tin nhắn gửi/nhận, thời gian phản hồi trung bình, và cảnh báo SLA (>48h chưa phản hồi). Không có giao diện và không có quyền đọc nội dung tin nhắn thường nhật giữa Sales và khách hàng.
    - *Impact*: Đáp ứng 100% mục tiêu quản trị tài sản khách hàng và đo lường chất lượng dịch vụ chăm sóc khách hàng mà không gây cảm giác bị xâm phạm vi mô (micromanaged), giúp tỷ lệ Sales chấp nhận sử dụng Z-Enterprise đạt cao nhất.
  - **Option B**: Full Visibility bao gồm cả Nội dung Tin nhắn thường nhật (Level 1 + 2 + 3 + Level 5).
    - *Behavior*: Admin có thể nhấp vào bất kỳ khách hàng nào để đọc toàn bộ lịch sử tin nhắn trò chuyện, xem hình ảnh và tệp đính kèm mà Sales đã gửi cho khách hàng theo thời gian thực.
    - *Impact*: Kiểm soát tuyệt đối mọi cam kết và báo giá của Sales; tuy nhiên sẽ vấp phải sự phản kháng lớn từ đội ngũ Sales, khiến Sales tìm cách lách qua Zalo cá nhân, làm thất bại mục tiêu chuyển đổi kênh giao tiếp chính thức.
  - **Option C**: Visibility Levels 1 + 2 (Chỉ xem Trạng thái Tài khoản và Danh sách Khách hàng; Không đo lường Metadata tương tác).
    - *Behavior*: Admin chỉ biết Sales đang có bao nhiêu khách hàng và danh sách tên/SĐT khách hàng; không có dữ liệu về thời điểm tương tác hay tần suất nhắn tin.
    - *Impact*: Bảo toàn tối đa sự tự do của Sales; nhưng Ban quản lý hoàn toàn "mù thông tin" về việc Sales có đang chăm sóc khách hàng hay không, không thể phát hiện khách hàng bị bỏ quên.
- **Affected Capability**: Giám sát Hoạt động Admin (`CAP-ADMIN-05`), Đo lường SLA Tương tác (`CAP-ADMIN-06`).
- **Affected Business State**: Active Monitoring State.
- **Why PO Decision is Required**: Quyết định văn hóa quản trị, tỷ lệ đón nhận sản phẩm của người dùng (User Adoption Rate) và định hình kiến trúc lưu trữ dữ liệu tương tác.
- Decision Owner: Product Owner / Head of Sales.

---

### DECISION 03: `DEC-PO-03`
- **Decision Topic**: Chính sách Vòng đời Tài khoản khi Sales Nghỉ việc (Account Lifecycle: Reuse vs. Archive).
- **Context**: Khi Sales chấm dứt hợp đồng lao động, doanh nghiệp cần chính sách dứt khoát về việc tài khoản Zalo Enterprise gắn với nhân sự đó sẽ được tái sử dụng hay hủy bỏ vĩnh viễn.
- **Question**: Khi một Sales chính thức thôi việc, tài khoản Zalo Enterprise của người đó được xử lý theo phương án nào?
- **Options**:
  - **Option A**: Archive vĩnh viễn tài khoản cũ và Thu hồi 1 Quota về Branch Pool để cấp Tài khoản mới tinh cho Sales tuyển dụng sau.
    - *Behavior*: Tài khoản cũ chuyển sang trạng thái `ARCHIVED_AND_REVOKED` (ngắt kết nối vĩnh viễn, lưu trữ lịch sử phục vụ đối soát). 1 Quota được hoàn trả về Branch Pool. Khi có Sales mới, Branch Admin dùng Quota khả dụng để tạo một Enterprise Account mới mang đúng họ tên và Email của nhân sự mới.
    - *Impact*: Minh bạch 100% về danh tính người bán hàng trước khách hàng (khách hàng không bị bối rối vì một tài khoản Zalo cũ đột ngột đổi tên thành người khác); an toàn dữ liệu cá nhân; nhưng phát sinh công đoạn Sales mới phải kết bạn lại với khách hàng được bàn giao.
  - **Option B**: Tái sử dụng (Reuse) tài khoản cũ bằng cách Đổi thông tin định danh (Account Re-assignment).
    - *Behavior*: Giữ nguyên tài khoản Zalo Enterprise cũ (giữ nguyên Zalo UID và khung chat với khách hàng), Branch Admin đổi Email liên kết và Tên hiển thị sang cho Sales mới tiếp quản.
    - *Impact*: Khách hàng không cần kết bạn lại, giữ nguyên được luồng chat cũ; tuy nhiên gây rủi ro lộ lọt thông tin cá nhân/trao đổi riêng tư của Sales cũ cho Sales mới, và tạo trải nghiệm kỳ lạ cho khách hàng khi thấy người chat với mình đổi tên liên tục.
- **Affected Capability**: Quản trị Vòng đời Account (`CAP-ADMIN-02`), Thu hồi Quota (`CAP-ADMIN-01`).
- **Affected Business State**: `OFFBOARDING_PENDING` ➔ `ARCHIVED_AND_REVOKED` vs. `REASSIGNED`.
- **Why PO Decision is Required**: Định hình kiến trúc vòng đời tài khoản Zalo Enterprise, quản trị rủi ro pháp lý về dữ liệu cá nhân và trải nghiệm tiếp cận của khách hàng.
- **Decision Owner**: Product Owner / HR Director / IT Operations.

---

### DECISION 04: `DEC-PO-04`
- **Decision Topic**: Phạm vi Bàn giao Khách hàng & Kế thừa Dữ liệu Hội thoại (Customer Handover Scope & Continuity).
- **Context**: Khi một Sales rời khỏi vị trí, danh bạ khách hàng được Branch Admin phân bổ lại cho Sales khác. Cần quyết định mức độ kế thừa dữ liệu mà Sales mới được tiếp cận và cách thức chuyển giao tới khách hàng.
- **Question**: Khi Branch Admin thực hiện bàn giao danh bạ khách hàng cho Sales mới, những dữ liệu nào được chuyển giao và hệ thống có gửi thông báo tự động cho khách hàng hay không?
- **Options**:
  - **Option A**: Bàn giao Thông tin Danh bạ + Ghi chú phân loại (Contact Info & Notes); Không chuyển giao Lịch sử Chat; Khách hàng không nhận thông báo tự động (Sales mới tự chủ động kết nối).
    - *Behavior*: Sales mới nhận được danh sách khách hàng gồm: Tên khách hàng, SĐT, Nguồn kết nối, Ghi chú phân loại, và Thời điểm tương tác gần nhất. Không xem được các tin nhắn trao đổi cũ. Sales mới dùng tài khoản của mình chủ động nhắn tin chào hỏi khách hàng.
    - *Impact*: Đơn giản, an toàn thông tin tuyệt đối; bảo vệ các trao đổi nhạy cảm trước đây; nhưng Sales mới mất thêm công sức tìm hiểu lại nhu cầu chi tiết của khách hàng.
  - **Option B**: Bàn giao Danh bạ + Hệ thống tự động gửi Tin nhắn Thông báo Bàn giao (Automated Handover Greeting) tới Khách hàng.
    - *Behavior*: Khi Branch Admin bấm duyệt bàn giao, tài khoản cũ tự động gửi 1 tin nhắn mẫu chuẩn công ty tới khách hàng: "Trân trọng thông báo chuyên viên A đã chuyển công tác. Từ ngày DD/MM, chuyên viên B (SĐT/Zalo...) sẽ tiếp tục đồng hành hỗ trợ quý khách". Đồng thời danh bạ được gán cho Sales B.
    - *Impact*: Trải nghiệm khách hàng vô cùng chuyên nghiệp và minh bạch; giảm thiểu tối đa nguy cơ khách hàng bơ vơ hoặc tiếp tục liên lạc vào kênh cá nhân của Sales cũ; đòi hỏi hệ thống hỗ trợ kịch bản tin nhắn bàn giao tự động.
  - **Option C**: Bàn giao Toàn bộ Danh bạ + Toàn bộ Lịch sử Tin nhắn Cũ (Full Chat History Migration) sang tài khoản Sales mới.
    - *Behavior*: Toàn bộ tin nhắn trao đổi trong quá khứ giữa khách hàng và Sales cũ được đồng bộ và hiển thị trên giao diện chat của Sales mới.
    - *Impact*: Giúp Sales mới nắm bắt 100% diễn biến tư vấn dở dang; nhưng phụ thuộc vào khả năng kỹ thuật của nền tảng Zalo trong việc chuyển giao lịch sử giữa 2 tài khoản khác nhau, và tiềm ẩn rủi ro bảo mật dữ liệu nội bộ.
- **Affected Capability**: Quy trình Bàn giao Khách hàng (`CAP-ADMIN-07`), Giao diện Chat Sales (`CAP-SALES-01`).
- **Affected Business State**: Customer Association State (`REASSIGNED`).
- **Why PO Decision is Required**: Quyết định chất lượng dịch vụ khách hàng (Customer Experience), tính liên tục của giao dịch bán hàng và rủi ro rò rỉ dữ liệu lịch sử.
- **Decision Owner**: Product Owner / Head of Customer Care.

---

### DECISION 05: `DEC-PO-05`
- **Decision Topic**: Chính sách Quản trị Điều chuyển Sales giữa các Chi nhánh & Vùng (Sales Transfer Governance).
- **Context**: Nhân sự Sales thường xuyên được luân chuyển công tác giữa các Chi nhánh (nội bộ Vùng) hoặc chuyển sang Vùng khác. Cần quyết định Quota và Danh bạ khách hàng hiện tại sẽ đi theo Sales hay ở lại đơn vị cũ.
- **Question**: Khi một Sales có quyết định điều chuyển sang Chi nhánh mới, số phận của Tài khoản Enterprise, Quota và Danh bạ khách hàng được giải quyết theo nguyên tắc nào?
- **Options**:
  - **Option A**: Tài khoản & Quota đi theo Sales; Toàn bộ Danh bạ Khách hàng BẮT BUỘC ở lại Chi nhánh cũ để bàn giao.
    - *Behavior*: 1 Quota từ Branch cũ được điều chuyển sang Branch mới theo nhân sự. Sales giữ nguyên tài khoản Enterprise để tiếp tục làm việc tại địa bàn mới, nhưng 100% tệp khách hàng tại địa bàn cũ phải được bàn giao lại cho nhân sự ở lại Branch cũ trước khi lệnh chuyển hoàn tất.
    - *Impact*: Tôn trọng nguyên tắc phân chia thị trường theo địa bàn (Territory Governance): khách hàng ở địa bàn nào thuộc về chi nhánh đó, ngăn chặn việc Sales mang khách hàng tỉnh này sang bán cho tỉnh khác; nhưng làm biến động số lượng quota giữa các chi nhánh.
  - **Option B**: Thu hồi hoàn toàn Tài khoản & Quota tại Chi nhánh cũ; Chi nhánh mới tự cấp Tài khoản mới từ Quota của mình.
    - *Behavior*: Branch cũ thu hồi tài khoản của Sales đó và giữ lại Quota trong Branch Pool của mình; toàn bộ khách hàng được bàn giao nội bộ. Khi Sales đến Branch mới, nếu Branch mới còn Quota trống thì mới cấp tài khoản mới cho Sales.
    - *Impact*: Bảo toàn ngân sách Quota cho Branch cũ; phân định ranh giới tài nguyên độc lập giữa các chi nhánh; nhưng tạo quy trình kép (offboarding ở chi nhánh cũ, onboarding ở chi nhánh mới).
  - **Option C**: Cho phép Sales mang theo cả Tài khoản, Quota và Toàn bộ Khách hàng sang Chi nhánh mới (Full Portfolio Portability).
    - *Behavior*: Toàn bộ tài khoản và các khách hàng của Sales được chuyển giao nguyên vẹn sang quyền quản trị của Branch mới.
    - *Impact*: Tối đa hóa quyền lợi và sự gắn bó của Sales giỏi với khách hàng thân thiết; tuy nhiên gây xung đột lợi ích sâu sắc giữa các Giám đốc Chi nhánh (Branch cũ bị mất khách và mất doanh thu về tay chi nhánh mới).
- **Affected Capability**: Quy trình Điều chuyển Sales (`CAP-ADMIN-08`), Điều hòa Quota (`CAP-SA-02`).
- **Affected Business State**: `TRANSFER_PENDING` ➔ `ACTIVE_IN_NEW_BRANCH`.
- **Why PO Decision is Required**: Quyết định quy chế quản trị thị trường bán hàng, phân chia doanh số giữa các đơn vị và chính sách giữ chân nhân tài.
- **Decision Owner**: Product Owner / Chief Sales Officer (CSO) / Region Directors.

---

### DECISION 06: `DEC-PO-06`
- **Decision Topic**: Cơ chế Điều tiết & Thu hồi Quota Nhàn rỗi (Quota Rebalance: Forced Pull vs. Voluntary Push).
- **Context**: Một số Branch/Region được cấp Quota nhưng tốc độ tuyển dụng chậm dẫn đến Quota bị găm giữ nhàn rỗi trong Pool, trong khi các Chi nhánh tăng trưởng nóng lại thiếu Quota để cấp cho Sales mới.
- **Question**: Cấp trên (Super Admin đối với Region; Region Admin đối với Branch) được áp dụng cơ chế nào để thu hồi Quota chưa sử dụng từ cấp dưới?
- **Options**:
  - **Option A**: Cơ chế Cưỡng chế Thu hồi một chiều (Forced Reclaim / Pull Model).
    - *Behavior*: Cấp trên có toàn quyền thu hồi bất kỳ số lượng Quota nào đang ở trạng thái Khả dụng (chưa gán cho Sales) của cấp dưới về Pool của mình mà không cần sự đồng ý hay phê duyệt của Admin cấp dưới.
    - *Impact*: Tối ưu hóa tối đa hiệu suất khai thác tài nguyên Quota trên toàn công ty (`M-01`), giải quyết ngay lập tức tình trạng thiếu hụt cục bộ; nhưng có thể gây phản ứng từ các Chi nhánh bị rút Quota đột ngột khi họ đang có kế hoạch tuyển dụng.
  - **Option B**: Cơ chế Yêu cầu Hoàn trả Tự nguyện (Voluntary Return / Push Model).
    - *Behavior*: Cấp dưới tự cân đối nhu cầu; nếu dư thừa thì chủ động bấm nút hoàn trả Quota lên cấp trên. Cấp trên chỉ có thể gửi "Thông báo yêu cầu hoàn trả" và phải chờ cấp dưới bấm xác nhận.
    - *Impact*: Tôn trọng quyền tự chủ kế hoạch kinh doanh của cấp dưới; nhưng tiềm ẩn nguy cơ các đơn vị giữ Quota để phòng thủ, làm lãng phí chi phí bản quyền của doanh nghiệp.
- **Affected Capability**: Quản trị Quota Pool (`CAP-SA-02`, `CAP-REG-01`).
- **Affected Business State**: Quota Transition (`DISTRIBUTED_TO_BRANCH` ➔ `DISTRIBUTED_TO_REGION` ➔ `ALLOCATED_TO_COMPANY`).
- **Why PO Decision is Required**: Xác lập phong cách quản trị tập trung (Centralized) hay phân tán (Decentralized), ảnh hưởng trực tiếp đến chỉ số lãng phí tài nguyên (`M-01`).
- **Decision Owner**: Product Owner / Head of Finance & Operations.

---

### DECISION 07: `DEC-PO-07`
- **Decision Topic**: Ranh giới Thẩm quyền Quản trị: Thao tác Tự quyết vs. Cần Cấp trên Phê duyệt (Admin Approval Boundary).
- **Context**: Cần xác định các thao tác có tác động lớn đến vận hành tài khoản (Tạm đình chỉ, Thu hồi, Bàn giao danh bạ) do Branch Admin tự quyết định hay bắt buộc phải qua phê duyệt của Region Admin.
- **Question**: Ranh giới thẩm quyền phê duyệt đối với các thao tác quản trị tài khoản Sales được phân định như thế nào giữa Branch Admin và Region Admin?
- **Options**:
  - **Option A**: Mô hình Tự chủ Chi nhánh Toàn diện (Branch Autonomous Model).
    - *Behavior*: Branch Admin có toàn quyền tự thực hiện: Tạo tài khoản, Gán email, Tạm khóa (Suspend), Mở khóa lại (Reactivate), Thu hồi (Revoke), và Bàn giao danh bạ khách hàng mà không cần bước phê duyệt từ Region Admin. Region Admin chỉ theo dõi báo cáo và xử lý điều chuyển liên Branch.
    - *Impact*: Tốc độ xử lý vận hành tức thì (Real-time), không tạo nút thắt cổ chai phê duyệt; tuy nhiên phụ thuộc hoàn toàn vào tính cẩn trọng và trung thực của từng Branch Admin.
  - **Option B**: Mô hình Phê duyệt 2 Bước cho Thao tác Rủi ro cao (Maker - Checker Approval Model).
    - *Behavior*: Branch Admin tạo lệnh: Tạm khóa, Thu hồi, hoặc Bàn giao danh bạ ở dạng "Đề xuất (Draft Request)". Thao tác chỉ chính thức có hiệu lực sau khi Region Admin phụ trách bấm "Phê duyệt (Approve)". Các thao tác tạo tài khoản mới thì Branch Admin tự làm.
    - *Impact*: Kiểm soát rủi ro chặt chẽ, ngăn chặn việc Branch Admin lạm quyền hoặc tranh chấp lao động nội bộ; nhưng kéo dài thời gian xử lý thủ tục nhân sự và bàn giao khách hàng.
- **Affected Capability**: Phân quyền RBAC (`CAP-ADMIN-01`, `CAP-ADMIN-02`, `CAP-REG-02`).
- **Affected Business State**: Account Approval State.
- **Why PO Decision is Required**: Quyết định cấu trúc kiểm soát rủi ro nội bộ (Internal Controls), thẩm quyền cấp bậc và SLA xử lý biến động nhân sự.
- **Decision Owner**: Product Owner / Head of Human Resources.

---

### DECISION 08: `DEC-PO-08`
- **Decision Topic**: Trải nghiệm Khách hàng khi Nhắn tin vào Tài khoản Bị Khóa hoặc Đã Nghỉ việc (Inbound Communication Handling).
- **Context**: Khi Sales bị tạm khóa tài khoản (Suspended) hoặc đang làm thủ tục thôi việc (Offboarding Pending / Archived), khách hàng cũ vẫn có thể nhắn tin tới tài khoản này. Cần quy định hành vi phản hồi ở phía khách hàng.
- **Question**: Khi khách hàng gửi tin nhắn đến một tài khoản Zalo Enterprise đang bị Tạm khóa hoặc Chờ bàn giao, hệ thống xử lý tin nhắn đó như thế nào?
- **Options**:
  - **Option A**: Hệ thống Tự động Gửi Tin nhắn Phản hồi (Automated Inbound Responder) thông báo tình trạng và hướng dẫn kênh liên hệ thay thế.
    - *Behavior*: Khi khách hàng nhắn tin tới tài khoản bị khóa, hệ thống tự động trả lời bằng tin nhắn chuẩn: "Chuyên viên tư vấn hiện đang tạm vắng mặt. Yêu cầu của quý khách đã được ghi nhận trên hệ thống chi nhánh, người phụ trách mới sẽ liên hệ lại trong thời gian sớm nhất hoặc quý khách vui lòng liên hệ hotline...".
    - *Impact*: Khách hàng không bị rơi vào "hố đen im lặng", giữ gìn uy tín dịch vụ của công ty; đòi hỏi sản phẩm phải hỗ trợ tính năng bot phản hồi tự động khi tài khoản bị khóa.
  - **Option B**: Cho phép Nhận và Lưu trữ Tin nhắn trong Trạng thái Im lặng (Silent Inbound Queueing).
    - *Behavior*: Phía khách hàng vẫn hiển thị tin nhắn "Đã nhận" bình thường. Sales cũ không thể mở app để đọc. Toàn bộ tin nhắn này được lưu trên hệ thống và chuyển giao cho Sales mới đọc khi quy trình Handover hoàn tất.
    - *Impact*: Tránh gây tâm lý xáo trộn cho khách hàng; bảo toàn 100% nội dung khách cần hỏi; tuy nhiên nếu quy trình handover bị chậm, khách hàng sẽ cảm thấy bị bỏ rơi do không thấy ai phản hồi.
  - **Option C**: Chặn hoàn toàn Tin nhắn gửi đến (Blocked / Delivery Failed).
    - *Behavior*: Phía khách hàng nhận thông báo lỗi từ Zalo rằng người nhận hiện không thể nhận tin nhắn vào thời điểm này.
    - *Impact*: Đơn giản về mặt kỹ thuật; nhưng gây trải nghiệm cực kỳ tiêu cực, khách hàng có thể cho rằng công ty làm ăn tắc trách hoặc nghi ngờ có sự cố lừa đảo.
- **Affected Capability**: Điều phối Tin nhắn Đến (`CAP-SALES-01`), Quản trị Trạng thái Tài khoản (`CAP-ADMIN-02`).
- **Affected Business State**: `SUSPENDED`, `OFFBOARDING_PENDING`.
- **Why PO Decision is Required**: Ảnh hưởng trực tiếp đến trải nghiệm dịch vụ khách hàng (Customer Satisfaction), hình ảnh thương hiệu doanh nghiệp và tỷ lệ giữ chân khách hàng.
- **Decision Owner**: Product Owner / Head of Customer Experience.

---

### DECISION 09: `DEC-PO-09`
- **Decision Topic**: Ranh giới Bộ Năng lực Giao tiếp Sales trong MVP (Core Messaging Scope: Voice Call & Voice Message).
- **Context**: Cần xác định phạm vi các phương thức giao tiếp bắt buộc phải có mặt trong gói MVP Phase 1 để đảm bảo đúng tiến độ phát hành nhưng vẫn đáp ứng đủ nhu cầu làm việc tối thiểu của Sales.
- **Question**: Ngoài Nhắn tin văn bản, Gửi hình ảnh và Tệp tài liệu báo giá, tính năng Gọi thoại (Voice Call qua Zalo) và Tin nhắn thoại (Voice Message) có nằm trong cam kết phạm vi MVP hay không?
- **Options**:
  - **Option A**: MVP bao gồm Nhắn tin Text, Ảnh, Tệp Báo giá và Gọi thoại 1-1 (Voice Call); Hoãn Tin nhắn thoại (Voice Message) sang Phase 2.
    - *Behavior*: Sales có thể gọi thoại trực tiếp qua Zalo Enterprise cho khách hàng để tư vấn nhanh và chốt đơn; hệ thống ghi nhận thời lượng cuộc gọi vào Interaction Metadata.
    - *Impact*: Đáp ứng trọn vẹn thói quen làm việc thực tế của Sales (chốt đơn dịch vụ bắt buộc phải gọi điện trực tiếp); giúp Sales hoàn toàn không cần dùng Personal Zalo; tăng khối lượng kiểm thử chất lượng cuộc gọi trong MVP.
  - **Option B**: MVP Tối giản chỉ hỗ trợ Nhắn tin Text, Gửi Ảnh và Tệp Báo giá (Pure Messaging MVP); Hoãn toàn bộ Gọi thoại (Voice Call) sang Phase 2.
    - *Behavior*: Sales chỉ có thể nhắn tin văn bản, gửi catalogue ảnh và gửi file PDF báo giá trên Z-Enterprise. Nếu muốn gọi điện, Sales phải gọi qua điện thoại di động thông thường.
    - *Impact*: Rút ngắn thời gian phát triển và kiểm thử MVP từ 3–4 tuần, tập trung nguồn lực làm chuẩn core Quota và Quản trị Account; tuy nhiên Sales có thể phàn nàn vì không thể gọi điện thoại miễn phí cho khách hàng qua Zalo.
- **Affected Capability**: Bộ Công cụ Giao tiếp Sales (`CAP-SALES-01`), Thu thập Metadata Tương tác (`CAP-ADMIN-06`).
- **Affected Business State**: MVP Scope Commitment.
- **Why PO Decision is Required**: Định đoạt thời gian ra mắt thị trường (Time-to-Market), ngân sách phát triển và mức độ sẵn sàng thay thế hoàn toàn Personal Zalo của lực lượng bán hàng.
- **Decision Owner**: Product Owner / Commercial Sponsor.

---

### DECISION 10: `DEC-PO-10`
- **Decision Topic**: Cơ chế Mở khóa Kiểm toán Khẩn cấp khi Tranh chấp Pháp lý (Break-Glass Compliance Audit Protocol).
- **Context**: Quyết định `DEC-02` đã khóa quyền đọc nội dung tin nhắn thường nhật của Admin để bảo vệ quyền tự chủ của Sales. Tuy nhiên, doanh nghiệp cần chính sách ứng phó khi xảy ra tranh chấp hợp đồng nghiêm trọng, dấu hiệu gian lận thương mại, hoặc có yêu cầu từ cơ quan bảo vệ pháp luật.
- **Question**: Doanh nghiệp có xây dựng cơ chế "Mở khóa Khẩn cấp" (Break-Glass Protocol) cho phép Hội đồng Tuân thủ / Ban Kiểm soát đọc nội dung tin nhắn trong các vụ việc điều tra đặc biệt hay không?
- **Options**:
  - **Option A**: Cho phép Cơ chế Break-Glass Audit với Quy trình Xác thực Kép (Dual-Authorization Break-Glass).
    - *Behavior*: Hệ thống hỗ trợ tính năng xuất hoặc mở khóa xem nội dung tin nhắn của một tài khoản cụ thể, nhưng BẮT BUỘC phải có sự đồng thuận và phê duyệt số của đồng thời 02 chủ thể độc lập: Super Admin VÀ Trưởng Ban Pháp chế/Kiểm soát nội bộ. Mọi lượt mở khóa đều gửi cảnh báo bảo mật và ghi vết vĩnh viễn vào Security Audit Trail.
    - *Impact*: Cung cấp công cụ bảo vệ pháp lý sống còn cho doanh nghiệp trước tòa án hoặc xử lý gian lận nội bộ; đồng thời ngăn chặn tuyệt đối việc Admin thông thường lạm quyền đọc trộm tin nhắn đời thường.
  - **Option B**: Tuyệt đối Không Hỗ trợ Tính năng Đọc Nội dung Tin nhắn trên Hệ thống Phần mềm (Zero Break-Glass Policy).
    - *Behavior*: Sản phẩm không xây dựng bất kỳ màn hình hay công cụ nào cho phép người dùng đọc nội dung tin nhắn. Mọi yêu cầu trích xuất pháp lý (nếu có yêu cầu từ cơ quan công an) sẽ phải xử lý qua kênh can thiệp kỹ thuật tầng cơ sở hạ tầng với nhà cung cấp dịch vụ OTT (Zalo).
    - *Impact*: Tạo niềm tin tuyệt đối 100% cho đội ngũ Sales khi sử dụng ứng dụng; loại bỏ hoàn toàn trách nhiệm pháp lý nội bộ về việc nhân sự quản trị đọc tin nhắn; nhưng doanh nghiệp bị động khi cần điều tra nhanh các sự vụ vi phạm nội quy kinh doanh.
- **Affected Capability**: Quản trị Tuân thủ & An toàn Thông tin (`CAP-SA-06`, `CAP-ADMIN-09`).
- **Affected Business State**: Account Investigation State.
- **Why PO Decision is Required**: Quyết định chính sách tuân thủ pháp luật (Legal & Compliance Policy), rủi ro kiện tụng lao động và ranh giới đạo đức sản phẩm của doanh nghiệp.
- **Decision Owner**: Product Owner / Legal Counsel / Head of Internal Audit.

---
*Tài liệu được soạn thảo và phân loại chuẩn tắc theo Hệ điều hành Senior Product BA (.agents).*

