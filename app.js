
// ── Modal & Dropdown UI Helpers ──
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('hidden');
}

function toggleElement(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('hidden');
}

// SOP Zalo Enterprise - Interactive BA Prototype
// Authoritative State Store & Deterministic Business Logic

const AppState = {
  selectedAccounts: new Set(), // IDs of bulk-selected accounts
  currentRole: 'SUPER_ADMIN', // 'SUPER_ADMIN' | 'BRANCH_ADMIN'
  activeBranchScope: 'Chi nhánh Ba Đình', // For BRANCH_ADMIN
  activeRegionScope: 'Vùng 1 - Hà Nội',
  currentView: 'overview', // 'overview' | 'accounts' | 'quotas' | 'audit'
  lastSyncTime: '25/09/2026 • 08:35',
  
  // 7 Vùng & Chi nhánh
  regions: [
    {
      id: 'V1',
      name: 'Vùng 1 - Hà Nội',
      quota: 16,
      branches: [
        { id: 'B101', name: 'Chi nhánh Ba Đình', quota: 8, assigned: 7, unassigned: 1 },
        { id: 'B102', name: 'Chi nhánh Cầu Giấy', quota: 8, assigned: 7, unassigned: 1 }
      ]
    },
    {
      id: 'V2',
      name: 'Vùng 2 - Tây Bắc Bộ',
      quota: 8,
      branches: [
        { id: 'B201', name: 'Chi nhánh Sơn La', quota: 4, assigned: 3, unassigned: 1 },
        { id: 'B202', name: 'Chi nhánh Điện Biên', quota: 4, assigned: 2, unassigned: 2 }
      ]
    },
    {
      id: 'V3',
      name: 'Vùng 3 - Đông Bắc Bộ',
      quota: 8,
      branches: [
        { id: 'B301', name: 'Chi nhánh Hải Phòng', quota: 4, assigned: 3, unassigned: 1 },
        { id: 'B302', name: 'Chi nhánh Quảng Ninh', quota: 4, assigned: 3, unassigned: 1 }
      ]
    },
    {
      id: 'V4',
      name: 'Vùng 4 - Miền Trung',
      quota: 10,
      branches: [
        { id: 'B401', name: 'Chi nhánh Đà Nẵng', quota: 6, assigned: 4, unassigned: 2 },
        { id: 'B402', name: 'Chi nhánh Huế', quota: 4, assigned: 2, unassigned: 2 }
      ]
    },
    {
      id: 'V5',
      name: 'Vùng 5 - TP.HCM',
      quota: 20,
      branches: [
        { id: 'B501', name: 'Chi nhánh Quận 1', quota: 10, assigned: 9, unassigned: 1 },
        { id: 'B502', name: 'Chi nhánh Tân Bình', quota: 10, assigned: 8, unassigned: 2 }
      ]
    },
    {
      id: 'V6',
      name: 'Vùng 6 - Đông Nam Bộ',
      quota: 4,
      branches: [
        { id: 'B601', name: 'Chi nhánh Bình Dương', quota: 2, assigned: 1, unassigned: 1 },
        { id: 'B602', name: 'Chi nhánh Đồng Nai', quota: 2, assigned: 1, unassigned: 1 }
      ]
    },
    {
      id: 'V7',
      name: 'Vùng 7 - Tây Nam Bộ',
      quota: 4,
      branches: [
        { id: 'B701', name: 'Chi nhánh Cần Thơ', quota: 2, assigned: 1, unassigned: 1 },
        { id: 'B702', name: 'Chi nhánh An Giang', quota: 2, assigned: 1, unassigned: 1 }
      ]
    }
  ],

  // Danh mục chi nhánh mở rộng tiềm năng (Chưa được cấp Quota - quota = 0)
  expansionBranches: [
    { name: 'Chi nhánh Đống Đa', region: 'Vùng 1 - Hà Nội' },
    { name: 'Chi nhánh Tây Hồ', region: 'Vùng 1 - Hà Nội' },
    { name: 'Chi nhánh Long Biên', region: 'Vùng 1 - Hà Nội' },
    { name: 'Chi nhánh Lào Cai', region: 'Vùng 2 - Tây Bắc Bộ' },
    { name: 'Chi nhánh Hòa Bình', region: 'Vùng 2 - Tây Bắc Bộ' },
    { name: 'Chi nhánh Bắc Ninh', region: 'Vùng 3 - Đông Bắc Bộ' },
    { name: 'Chi nhánh Thái Nguyên', region: 'Vùng 3 - Đông Bắc Bộ' },
    { name: 'Chi nhánh Nha Trang (Khánh Hòa)', region: 'Vùng 4 - Miền Trung' },
    { name: 'Chi nhánh Quảng Nam', region: 'Vùng 4 - Miền Trung' },
    { name: 'Chi nhánh TP Thủ Đức', region: 'Vùng 5 - TP.HCM' },
    { name: 'Chi nhánh Bình Thạnh', region: 'Vùng 5 - TP.HCM' },
    { name: 'Chi nhánh Gò Vấp', region: 'Vùng 5 - TP.HCM' },
    { name: 'Chi nhánh Vũng Tàu', region: 'Vùng 6 - Đông Nam Bộ' },
    { name: 'Chi nhánh Tiền Giang', region: 'Vùng 7 - Tây Nam Bộ' },
    { name: 'Chi nhánh Cà Mau', region: 'Vùng 7 - Tây Nam Bộ' }
  ],

  // 100 Accounts dataset initialized from baseline specs
  accounts: [],

  // Available HR employees for assignment mock across branches
  hrEmployees: [
    // Vùng 1 - Hà Nội
    { code: 'NV10492', name: 'Nguyễn Văn Minh', email: 'minhnv29@fpt.com', region: 'Vùng 1 - Hà Nội', branch: 'Chi nhánh Ba Đình', dept: 'Kinh doanh Doanh nghiệp', status: 'ACTIVE' },
    { code: 'NV10518', name: 'Trần Thị Thu Hà', email: 'hatt41@fpt.com', region: 'Vùng 1 - Hà Nội', branch: 'Chi nhánh Ba Đình', dept: 'Chăm sóc Khách hàng', status: 'ACTIVE' },
    { code: 'NV10520', name: 'Vũ Hải Nam', email: 'namvh@fpt.com', region: 'Vùng 1 - Hà Nội', branch: 'Chi nhánh Ba Đình', dept: 'Kỹ thuật Hiện trường', status: 'ACTIVE' },
    { code: 'NV10822', name: 'Lê Hoàng Nam', email: 'namlh12@fpt.com', region: 'Vùng 1 - Hà Nội', branch: 'Chi nhánh Cầu Giấy', dept: 'Kinh doanh Khách hàng', status: 'ACTIVE' },
    { code: 'NV10825', name: 'Đỗ Thúy Vy', email: 'vydt@fpt.com', region: 'Vùng 1 - Hà Nội', branch: 'Chi nhánh Cầu Giấy', dept: 'Dịch vụ Khách hàng', status: 'ACTIVE' },
    { code: 'NV10901', name: 'Nguyễn Quốc Anh', email: 'anhnq@fpt.com', region: 'Vùng 1 - Hà Nội', branch: 'Chi nhánh Đống Đa', dept: 'Kinh doanh Khách hàng', status: 'ACTIVE' },
    { code: 'NV10905', name: 'Hoàng Bích Phương', email: 'phuonghb@fpt.com', region: 'Vùng 1 - Hà Nội', branch: 'Chi nhánh Tây Hồ', dept: 'Tư vấn Giải pháp', status: 'ACTIVE' },
    { code: 'NV10910', name: 'Phạm Minh Đức', email: 'ducpm@fpt.com', region: 'Vùng 1 - Hà Nội', branch: 'Chi nhánh Long Biên', dept: 'Kỹ thuật & Hạ tầng', status: 'ACTIVE' },
    // Vùng 2 - Tây Bắc Bộ
    { code: 'NV20101', name: 'Lò Văn Mười', email: 'muoilv@fpt.com', region: 'Vùng 2 - Tây Bắc Bộ', branch: 'Chi nhánh Sơn La', dept: 'Kinh doanh Khách hàng', status: 'ACTIVE' },
    { code: 'NV20105', name: 'Quàng Thị Mai', email: 'maiqt@fpt.com', region: 'Vùng 2 - Tây Bắc Bộ', branch: 'Chi nhánh Sơn La', dept: 'Chăm sóc Khách hàng', status: 'ACTIVE' },
    { code: 'NV20120', name: 'Trần Văn Bách', email: 'bachtv@fpt.com', region: 'Vùng 2 - Tây Bắc Bộ', branch: 'Chi nhánh Điện Biên', dept: 'Kỹ thuật & Hạ tầng', status: 'ACTIVE' },
    { code: 'NV20130', name: 'Bùi Văn Thắng', email: 'thangbv@fpt.com', region: 'Vùng 2 - Tây Bắc Bộ', branch: 'Chi nhánh Hòa Bình', dept: 'Kinh doanh Khách hàng', status: 'ACTIVE' },
    { code: 'NV20140', name: 'Vàng A Súa', email: 'suava@fpt.com', region: 'Vùng 2 - Tây Bắc Bộ', branch: 'Chi nhánh Lào Cai', dept: 'Dịch vụ Khách hàng', status: 'ACTIVE' },
    // Vùng 3 - Đông Bắc Bộ
    { code: 'NV30101', name: 'Trần Tuấn Kiệt', email: 'kiettt@fpt.com', region: 'Vùng 3 - Đông Bắc Bộ', branch: 'Chi nhánh Hải Phòng', dept: 'Kinh doanh Doanh nghiệp', status: 'ACTIVE' },
    { code: 'NV30105', name: 'Lê Quỳnh Nga', email: 'ngalq@fpt.com', region: 'Vùng 3 - Đông Bắc Bộ', branch: 'Chi nhánh Hải Phòng', dept: 'Chăm sóc Khách hàng', status: 'ACTIVE' },
    { code: 'NV30115', name: 'Nguyễn Văn Đạt', email: 'datnv3@fpt.com', region: 'Vùng 3 - Đông Bắc Bộ', branch: 'Chi nhánh Quảng Ninh', dept: 'Kỹ thuật Hiện trường', status: 'ACTIVE' },
    { code: 'NV30125', name: 'Nguyễn Đức Thịnh', email: 'thinhnd@fpt.com', region: 'Vùng 3 - Đông Bắc Bộ', branch: 'Chi nhánh Bắc Ninh', dept: 'Kinh doanh Doanh nghiệp', status: 'ACTIVE' },
    { code: 'NV30135', name: 'Dương Thu Hằng', email: 'hangdt@fpt.com', region: 'Vùng 3 - Đông Bắc Bộ', branch: 'Chi nhánh Thái Nguyên', dept: 'Dịch vụ Khách hàng', status: 'ACTIVE' },
    // Vùng 4 - Miền Trung
    { code: 'NV40190', name: 'Hoàng Anh Tuấn', email: 'tuanha8@fpt.com', region: 'Vùng 4 - Miền Trung', branch: 'Chi nhánh Đà Nẵng', dept: 'Kinh doanh Khách hàng', status: 'ACTIVE' },
    { code: 'NV40195', name: 'Phan Mỹ Lệ', email: 'lepm@fpt.com', region: 'Vùng 4 - Miền Trung', branch: 'Chi nhánh Đà Nẵng', dept: 'Chăm sóc Khách hàng', status: 'ACTIVE' },
    { code: 'NV40210', name: 'Lê Khắc Huy', email: 'huylk@fpt.com', region: 'Vùng 4 - Miền Trung', branch: 'Chi nhánh Huế', dept: 'Kỹ thuật Hiện trường', status: 'ACTIVE' },
    { code: 'NV40220', name: 'Võ Minh Trí', email: 'trivm@fpt.com', region: 'Vùng 4 - Miền Trung', branch: 'Chi nhánh Nha Trang (Khánh Hòa)', dept: 'Tư vấn Doanh nghiệp', status: 'ACTIVE' },
    { code: 'NV40230', name: 'Trần Đại Nghĩa', email: 'nghiatd@fpt.com', region: 'Vùng 4 - Miền Trung', branch: 'Chi nhánh Quảng Nam', dept: 'Kinh doanh Khách hàng', status: 'ACTIVE' },
    // Vùng 5 - TP.HCM
    { code: 'NV50114', name: 'Phạm Quốc Bảo', email: 'baopq@fpt.com', region: 'Vùng 5 - TP.HCM', branch: 'Chi nhánh Quận 1', dept: 'Kinh doanh Doanh nghiệp', status: 'ACTIVE' },
    { code: 'NV50118', name: 'Nguyễn Thị Cẩm Tú', email: 'tuntc@fpt.com', region: 'Vùng 5 - TP.HCM', branch: 'Chi nhánh Quận 1', dept: 'Chăm sóc Khách hàng', status: 'ACTIVE' },
    { code: 'NV50349', name: 'Đỗ Mỹ Linh', email: 'linhdm5@fpt.com', region: 'Vùng 5 - TP.HCM', branch: 'Chi nhánh Tân Bình', dept: 'Dịch vụ Khách hàng', status: 'ACTIVE' },
    { code: 'NV50355', name: 'Trần Hữu Phước', email: 'phuocth@fpt.com', region: 'Vùng 5 - TP.HCM', branch: 'Chi nhánh Tân Bình', dept: 'Kỹ thuật & Hạ tầng', status: 'ACTIVE' },
    { code: 'NV50410', name: 'Huỳnh Tấn Đạt', email: 'datht@fpt.com', region: 'Vùng 5 - TP.HCM', branch: 'Chi nhánh TP Thủ Đức', dept: 'Kinh doanh Khách hàng', status: 'ACTIVE' },
    { code: 'NV50420', name: 'Mai Phương Thảo', email: 'thaomp@fpt.com', region: 'Vùng 5 - TP.HCM', branch: 'Chi nhánh Bình Thạnh', dept: 'Tư vấn Giải pháp', status: 'ACTIVE' },
    { code: 'NV50430', name: 'Lê Thanh Bình', email: 'binhlt@fpt.com', region: 'Vùng 5 - TP.HCM', branch: 'Chi nhánh Gò Vấp', dept: 'Kỹ thuật Hiện trường', status: 'ACTIVE' },
    // Vùng 6 - Đông Nam Bộ
    { code: 'NV60101', name: 'Lê Văn Khang', email: 'khanglv@fpt.com', region: 'Vùng 6 - Đông Nam Bộ', branch: 'Chi nhánh Đồng Nai', dept: 'Kinh doanh Khách hàng', status: 'ACTIVE' },
    { code: 'NV60110', name: 'Nguyễn Thị Diễm', email: 'diemnt@fpt.com', region: 'Vùng 6 - Đông Nam Bộ', branch: 'Chi nhánh Bình Dương', dept: 'Chăm sóc Khách hàng', status: 'ACTIVE' },
    { code: 'NV60120', name: 'Trịnh Quốc Toàn', email: 'toantq@fpt.com', region: 'Vùng 6 - Đông Nam Bộ', branch: 'Chi nhánh Vũng Tàu', dept: 'Kinh doanh Doanh nghiệp', status: 'ACTIVE' },
    // Vùng 7 - Tây Nam Bộ
    { code: 'NV70101', name: 'Nguyễn Thanh Phong', email: 'phongnt@fpt.com', region: 'Vùng 7 - Tây Nam Bộ', branch: 'Chi nhánh Cần Thơ', dept: 'Kinh doanh Doanh nghiệp', status: 'ACTIVE' },
    { code: 'NV70108', name: 'Võ Thùy Trang', email: 'trangvt@fpt.com', region: 'Vùng 7 - Tây Nam Bộ', branch: 'Chi nhánh Cần Thơ', dept: 'Chăm sóc Khách hàng', status: 'ACTIVE' },
    { code: 'NV70120', name: 'Lâm Văn Út', email: 'utlv@fpt.com', region: 'Vùng 7 - Tây Nam Bộ', branch: 'Chi nhánh An Giang', dept: 'Kỹ thuật Hiện trường', status: 'ACTIVE' },
    { code: 'NV70130', name: 'Phan Tấn Lộc', email: 'locpt@fpt.com', region: 'Vùng 7 - Tây Nam Bộ', branch: 'Chi nhánh Tiền Giang', dept: 'Kinh doanh Khách hàng', status: 'ACTIVE' },
    { code: 'NV70140', name: 'Nguyễn Hữu Tài', email: 'tainh@fpt.com', region: 'Vùng 7 - Tây Nam Bộ', branch: 'Chi nhánh Cà Mau', dept: 'Dịch vụ Khách hàng', status: 'ACTIVE' }
  ],

  // System Audit Log (Mocked realistically with operational trace for prototype)
  auditLogs: [
    {
      id: 'LOG-015',
      timestamp: '28/09/2026 10:15:20',
      actor: 'Hệ thống HR Sync',
      role: 'System',
      action: 'Cảnh báo nhân sự',
      target: 'ZA-015',
      detail: 'Nhân sự nghỉ việc từ 20/09/2026. Đề xuất thu hồi tài khoản về Kho trung tâm'
    },
    {
      id: 'LOG-014',
      timestamp: '28/09/2026 09:30:00',
      actor: 'Hệ thống An toàn TT',
      role: 'System',
      action: 'Cảnh báo bảo mật',
      target: 'ZA-028',
      detail: 'Phát hiện đăng nhập từ IP lạ ngoài dải mạng doanh nghiệp (118.69.182.45)'
    },
    {
      id: 'LOG-013',
      timestamp: '27/09/2026 15:45:10',
      actor: 'Admin Ba Đình',
      role: 'Admin chi nhánh',
      action: 'Gán tài khoản',
      target: 'ZA-003',
      detail: 'Cấp tài khoản cho nhân sự mới, trạng thái Chờ kích hoạt (gửi link kích hoạt qua email công ty, hạn 3 ngày)'
    },
    {
      id: 'LOG-012',
      timestamp: '27/09/2026 14:20:30',
      actor: 'Admin Cầu Giấy',
      role: 'Admin chi nhánh',
      action: 'Gán tài khoản',
      target: 'ZA-007',
      detail: 'Cấp tài khoản cho nhân sự mới, trạng thái Chờ kích hoạt (gửi link kích hoạt qua email công ty, hạn 3 ngày)'
    },
    {
      id: 'LOG-011',
      timestamp: '27/09/2026 11:10:00',
      actor: 'Admin Đống Đa',
      role: 'Admin chi nhánh',
      action: 'Gán tài khoản',
      target: 'ZA-009',
      detail: 'Cấp tài khoản cho nhân sự mới, trạng thái Chờ kích hoạt (gửi link kích hoạt qua email công ty, hạn 3 ngày)'
    },
    {
      id: 'LOG-010',
      timestamp: '26/09/2026 16:30:15',
      actor: 'Super Admin',
      role: 'Super Admin',
      action: 'Tạm khóa',
      target: 'ZA-020',
      detail: 'Tạm khóa tài khoản theo yêu cầu an toàn thông tin rà soát nội bộ'
    },
    {
      id: 'LOG-009',
      timestamp: '26/09/2026 15:20:00',
      actor: 'Super Admin',
      role: 'Super Admin',
      action: 'Tạm khóa',
      target: 'ZA-035',
      detail: 'Tạm khóa tài khoản theo yêu cầu an toàn thông tin rà soát nội bộ'
    },
    {
      id: 'LOG-008',
      timestamp: '26/09/2026 14:30:00',
      actor: 'Super Admin',
      role: 'Super Admin',
      action: 'Thu hồi',
      target: 'ZA-071',
      detail: 'Thu hồi từ nhân sự Trần Văn Hùng (Chi nhánh Ba Đình) về Kho trung tâm do nghỉ việc'
    },
    {
      id: 'LOG-007',
      timestamp: '26/09/2026 11:00:00',
      actor: 'Super Admin',
      role: 'Super Admin',
      action: 'Tạm khóa',
      target: 'ZA-050',
      detail: 'Tạm khóa tài khoản theo yêu cầu an toàn thông tin rà soát nội bộ'
    },
    {
      id: 'LOG-006',
      timestamp: '25/09/2026 14:15:00',
      actor: 'Hệ thống HR Sync',
      role: 'System',
      action: 'Cảnh báo nhân sự',
      target: 'ZA-022',
      detail: 'Nhân sự nghỉ việc từ 18/09/2026. Đề xuất thu hồi tài khoản về Kho trung tâm'
    },
    {
      id: 'LOG-005',
      timestamp: '25/09/2026 10:20:00',
      actor: 'Hệ thống HR Sync',
      role: 'System',
      action: 'Cảnh báo điều chuyển',
      target: 'ZA-041',
      detail: 'Nhân sự đã điều chuyển chi nhánh trên HR, đề xuất bàn giao hoặc chuyển quota'
    },
    {
      id: 'LOG-004',
      timestamp: '25/09/2026 08:35:10',
      actor: 'Super Admin',
      role: 'Super Admin',
      action: 'Đồng bộ Zalo',
      target: 'Toàn hệ thống',
      detail: 'Đồng bộ 100 Account ID từ Zalo Cloud API thành công'
    },
    {
      id: 'LOG-003',
      timestamp: '24/09/2026 16:20:00',
      actor: 'Super Admin',
      role: 'Super Admin',
      action: 'Phân bổ Quota',
      target: 'Vùng 5 - TP.HCM',
      detail: 'Cấp thêm 2 tài khoản cho Chi nhánh Quận 1 từ Kho trung tâm'
    },
    {
      id: 'LOG-002',
      timestamp: '24/09/2026 14:10:45',
      actor: 'Admin Ba Đình',
      role: 'Admin chi nhánh',
      action: 'Gán tài khoản',
      target: 'ZA-002',
      detail: 'Gán tài khoản cho nhân viên Trần Thị Mai (maitt@fpt.com)'
    },
    {
      id: 'LOG-001',
      timestamp: '20/09/2026 09:00:00',
      actor: 'Super Admin',
      role: 'Super Admin',
      action: 'Khởi tạo hệ thống',
      target: 'Toàn hệ thống',
      detail: 'Khởi tạo danh sách 100 tài khoản Zalo Enterprise và phân bổ ban đầu cho 7 Vùng'
    }
  ],

  // UI Filter State for Accounts view
  accountFilters: {
    status: 'all', // 'all' | 'unassigned' | 'active' | 'pending' | 'locked' | 'warning'
    search: '',
    region: 'all',
    branch: 'all',
    onlyAttention: false
  },

  activeDrawerAccount: null
};

// Initialize the 100 accounts baseline (CR-001)
function initAccountsData() {
  const accounts = [];
  let seq = 1;

  // Pool of realistic Vietnamese employee profiles for FPT Telecom
  const REAL_EMPLOYEE_POOL = [
    { name: 'Nguyễn Văn An', user: 'annv', dept: 'Kinh doanh KHDN' },
    { name: 'Trần Thị Mai', user: 'maitt', dept: 'Chăm sóc Khách hàng' },
    { name: 'Lê Hoàng Long', user: 'longlh2', dept: 'Kỹ thuật & Hạ tầng' },
    { name: 'Phạm Thu Trang', user: 'trangpt', dept: 'Dịch vụ Khách hàng' },
    { name: 'Vũ Đức Thắng', user: 'thangvd', dept: 'Kinh doanh Cá nhân' },
    { name: 'Đỗ Minh Quân', user: 'quandm', dept: 'Quản lý Thu cước' },
    { name: 'Hoàng Bích Ngọc', user: 'ngochb', dept: 'Tư vấn Doanh nghiệp' },
    { name: 'Bùi Tuấn Anh', user: 'anhbt3', dept: 'Kỹ thuật Hiện trường' },
    { name: 'Ngô Thanh Hà', user: 'hant', dept: 'Chăm sóc Khách hàng' },
    { name: 'Đặng Quốc Huy', user: 'huydq', dept: 'Kinh doanh KHDN' },
    { name: 'Dương Thùy Linh', user: 'linhdt', dept: 'Dịch vụ Khách hàng' },
    { name: 'Lý Gia Hưng', user: 'hunglg', dept: 'Kỹ thuật & Hạ tầng' },
    { name: 'Mai Khánh Linh', user: 'linhmk', dept: 'Tư vấn Giải pháp' },
    { name: 'Hồ Quang Dũng', user: 'dunghq', dept: 'Kinh doanh Cá nhân' },
    { name: 'Trịnh Phương Thảo', user: 'thaotp', dept: 'Chăm sóc Khách hàng' },
    { name: 'Võ Thành Nam', user: 'namvt', dept: 'Hạ tầng Mạng viễn thông' },
    { name: 'Nguyễn Kiều Oanh', user: 'oanhnk', dept: 'Dịch vụ Khách hàng' },
    { name: 'Trần Đình Trọng', user: 'trongtd', dept: 'Kinh doanh KHDN' },
    { name: 'Lê Thị Thu Hương', user: 'huonglt', dept: 'Hỗ trợ Kỹ thuật' },
    { name: 'Phan Hữu Nghĩa', user: 'nghiaph', dept: 'Phát triển Khách hàng' },
    { name: 'Đinh Xuân Trường', user: 'truongdx', dept: 'Kỹ thuật & Hạ tầng' },
    { name: 'Tạ Thị Thanh Tâm', user: 'tamttt', dept: 'Chăm sóc Khách hàng' },
    { name: 'Lâm Hải Đăng', user: 'danglh', dept: 'Kinh doanh Cá nhân' },
    { name: 'Chu Tuấn Kiệt', user: 'kietct', dept: 'Tư vấn Doanh nghiệp' },
    { name: 'Nguyễn Hồng Phúc', user: 'phucnh', dept: 'Quản lý Dịch vụ' },
    { name: 'Trần Việt Dũng', user: 'dungtv', dept: 'Kỹ thuật Hiện trường' },
    { name: 'Phạm Mỹ Duyên', user: 'duyenpm', dept: 'Dịch vụ Khách hàng' },
    { name: 'Vũ Minh Trí', user: 'trivm', dept: 'Kinh doanh KHDN' },
    { name: 'Đỗ Cẩm Nhung', user: 'nhungdc', dept: 'Chăm sóc Khách hàng' },
    { name: 'Hoàng Gia Bảo', user: 'baohg', dept: 'Hỗ trợ Kỹ thuật' },
    { name: 'Bùi Thị Lan Anh', user: 'anhbtl', dept: 'Kinh doanh Cá nhân' },
    { name: 'Ngô Quang Vinh', user: 'vinhnq', dept: 'Hạ tầng Viễn thông' },
    { name: 'Đặng Bảo Châu', user: 'chaudb', dept: 'Chăm sóc Khách hàng' },
    { name: 'Dương Thế Vinh', user: 'vinhdt', dept: 'Kinh doanh KHDN' },
    { name: 'Lý Thảo My', user: 'mylt', dept: 'Dịch vụ Khách hàng' },
    { name: 'Hà Trọng Nhân', user: 'nhanht', dept: 'Kỹ thuật Hiện trường' },
    { name: 'Trịnh Nhật Minh', user: 'minhtn', dept: 'Phát triển Thị trường' },
    { name: 'Võ Thúy Kiều', user: 'kieuvt', dept: 'Chăm sóc Khách hàng' },
    { name: 'Nguyễn Hùng Cường', user: 'cuongnh', dept: 'Kỹ thuật & Hạ tầng' },
    { name: 'Trần Thanh Tú', user: 'tutt', dept: 'Kinh doanh KHDN' },
    { name: 'Lê Quốc Thịnh', user: 'thinhlq', dept: 'Hỗ trợ Kỹ thuật' },
    { name: 'Phạm Ngọc Hân', user: 'hanpn', dept: 'Dịch vụ Khách hàng' },
    { name: 'Vũ Đình Phong', user: 'phongvd', dept: 'Kinh doanh Cá nhân' },
    { name: 'Đỗ Khánh Toàn', user: 'toandk', dept: 'Kỹ thuật Hiện trường' },
    { name: 'Hoàng Thu Thủy', user: 'thuyht', dept: 'Chăm sóc Khách hàng' },
    { name: 'Bùi Quốc Triệu', user: 'trieubq', dept: 'Kinh doanh KHDN' },
    { name: 'Ngô Nhật Linh', user: 'linhnn', dept: 'Dịch vụ Khách hàng' },
    { name: 'Đặng Tiến Đạt', user: 'datdt', dept: 'Kỹ thuật & Hạ tầng' },
    { name: 'Dương Minh Châu', user: 'chaudm', dept: 'Chăm sóc Khách hàng' },
    { name: 'Lý Quốc Trung', user: 'trunglq', dept: 'Phát triển Thị trường' },
    { name: 'Hồ Bảo Nam', user: 'namhb', dept: 'Kỹ thuật Hiện trường' },
    { name: 'Trịnh Thùy Trang', user: 'trangtt', dept: 'Dịch vụ Khách hàng' }
  ];

  // Helper to format ID
  const fmtId = (num) => `ZA-${String(num).padStart(3, '0')}`;

  // 1. Generate allocated accounts for 14 branches across 7 regions (70 accounts: ZA-001 -> ZA-070)
  AppState.regions.forEach(region => {
    region.branches.forEach(branch => {
      for (let i = 0; i < branch.quota; i++) {
        const id = fmtId(seq++);
        let status = 'ACTIVE';
        let attention = null;
        
        const emp = REAL_EMPLOYEE_POOL[(seq - 2) % REAL_EMPLOYEE_POOL.length];
        const empName = emp.name;
        const empEmail = `${emp.user}@fpt.com`;
        const empDept = emp.dept || 'Kinh doanh Khách hàng';
        const empCode = `NV${10000 + seq}`;
        const empPhone = `098${seq % 9 + 1}.345.${100 + seq}`;
        const displayName = empName;
        const username = emp.user;

        // Branch unassigned slots: ZA-008 (Ba Đình V1), ZA-019 (V2), ZA-032 (V3), ZA-058 (V5)
        // Total: 4 UNASSIGNED at branches + 30 central + 60 ACTIVE + 3 PENDING + 3 LOCKED = 100
        const BRANCH_UNASSIGNED_IDS = new Set(['ZA-008', 'ZA-019', 'ZA-032', 'ZA-058']);
        const isBaDinhUnassigned = BRANCH_UNASSIGNED_IDS.has(id);
        if (isBaDinhUnassigned) {
          status = 'UNASSIGNED';
          attention = null;
        }
        // Exactly 3 PENDING accounts (ZA-003 in Ba Đình, ZA-011 in Cầu Giấy, ZA-027 in Sơn La)
        else if (id === 'ZA-003' || id === 'ZA-011' || id === 'ZA-027') {
          status = 'PENDING';
          attention = { severity: 'WARNING', title: 'Tài khoản chưa được kích hoạt quá 3 ngày' };
        } 
        // Exactly 3 LOCKED accounts (ZA-020, ZA-035, ZA-050)
        else if (id === 'ZA-020' || id === 'ZA-035' || id === 'ZA-050') {
          status = 'LOCKED';
          attention = { severity: 'WARNING', title: 'Tạm khóa theo yêu cầu bảo mật thông tin' };
        }
        // Realistic Operational Attention items on ACTIVE accounts (5 items)
        else if (id === 'ZA-015' || id === 'ZA-022') {
          status = 'ACTIVE';
          attention = { severity: 'CRITICAL', title: 'Nhân viên đã nghỉ việc nhưng tài khoản vẫn hoạt động' };
        } else if (id === 'ZA-041') {
          status = 'ACTIVE';
          attention = { severity: 'WARNING', title: 'Nhân viên đã chuyển chi nhánh nhưng tài khoản chưa xử lý' };
        } else if (id === 'ZA-028') {
          status = 'ACTIVE';
          attention = { severity: 'WARNING', title: 'Đăng nhập từ IP/vị trí bất thường' };
        } else if (id === 'ZA-065') {
          status = 'ACTIVE';
          attention = { severity: 'INFO', title: 'Tài khoản không phát sinh tương tác quá 30 ngày' };
        }

        accounts.push({
          id,
          username: isBaDinhUnassigned ? `zalo_${id.toLowerCase()}` : username,
          ownerName: isBaDinhUnassigned ? null : empName,
          displayName: isBaDinhUnassigned ? null : displayName,
          ownerEmail: isBaDinhUnassigned ? null : empEmail,
          empCode: isBaDinhUnassigned ? null : empCode,
          empDept: isBaDinhUnassigned ? null : empDept,
          empPhone: isBaDinhUnassigned ? null : empPhone,
          empStatus: isBaDinhUnassigned ? null : 'Chính thức',
          region: region.name,
          branch: branch.name,
          createdDate: '15/08/2026',
          assignedDate: isBaDinhUnassigned ? null : '20/08/2026',
          status,
          attention,
          isReclaimed: false,
          ownershipHistory: [],
          history: isBaDinhUnassigned ? [] : [
            { from: 'Kho trung tâm (Zalo)', to: empName, date: '20/08/2026 09:00', by: 'Super Admin' }
          ]
        });
      }
    });
  });

  // 2. Kho trung tâm accounts: 30 accounts (ZA-071 -> ZA-100)
  while (seq <= 100) {
    const id = fmtId(seq++);
    const isZa71 = id === 'ZA-071';
    accounts.push({
      id,
      username: `zalo_${id.toLowerCase()}`,
      ownerName: null,
      displayName: null,
      ownerEmail: null,
      empCode: null,
      empDept: null,
      empPhone: null,
      empStatus: null,
      region: 'Toàn quốc',
      branch: 'Kho trung tâm',
      createdDate: '15/08/2026',
      assignedDate: null,
      status: 'UNASSIGNED',
      attention: null,
      isReclaimed: isZa71,
      formerOwner: isZa71 ? {
        name: 'Trần Văn Hùng',
        email: 'hungtv8@fpt.com',
        code: 'NV10321',
        dept: 'Kinh doanh Khách hàng Cá nhân',
        branch: 'Chi nhánh Ba Đình',
        phone: '0981.234.567',
        reclaimedDate: '26/09/2026 14:30',
        reclaimedBy: 'Super Admin',
        reason: 'Nhân sự nghỉ việc - Thu hồi tài khoản về Kho trung tâm'
      } : null,
      ownershipHistory: isZa71 ? [
        {
          generation: 2,
          name: 'Trần Văn Hùng',
          email: 'hungtv8@fpt.com',
          code: 'NV10321',
          dept: 'Kinh doanh Khách hàng Cá nhân',
          branch: 'Chi nhánh Ba Đình',
          phone: '0981.234.567',
          fromDate: '15/08/2026',
          toDate: '26/09/2026',
          reclaimedDate: '26/09/2026 14:30',
          reclaimedBy: 'Super Admin',
          reason: 'Nhân sự nghỉ việc'
        },
        {
          generation: 1,
          name: 'Phạm Hồng Đăng',
          email: 'dangph@fpt.com',
          code: 'NV10105',
          dept: 'Phát triển Khách hàng',
          branch: 'Chi nhánh Ba Đình',
          phone: '0983.567.890',
          fromDate: '01/01/2026',
          toDate: '14/08/2026',
          reclaimedDate: '14/08/2026 17:00',
          reclaimedBy: 'Super Admin',
          reason: 'Điều chuyển công tác sang đơn vị khác'
        }
      ] : [],
      history: isZa71 ? [
        { from: 'Trần Văn Hùng (Chi nhánh Ba Đình)', to: 'Kho trung tâm (Thu hồi)', date: '26/09/2026 14:30', by: 'Super Admin' },
        { from: 'Kho trung tâm', to: 'Trần Văn Hùng', date: '15/08/2026 09:00', by: 'Super Admin' }
      ] : []
    });
  }

  AppState.accounts = accounts;
}

// Compute metrics dynamically from current state (CR-001 exact numbers)
function getMetrics() {
  const accounts = AppState.accounts;
  const total = accounts.length; // 100
  const centralPool = accounts.filter(a => a.branch === 'Kho trung tâm').length; // 30
  const allocated = total - centralPool; // 70
  
  const active = accounts.filter(a => a.status === 'ACTIVE').length; // 60
  const pending = accounts.filter(a => a.status === 'PENDING').length; // 3
  const locked = accounts.filter(a => a.status === 'LOCKED').length; // 3
  const attention = accounts.filter(a => a.attention !== null).length; // 8

  const assigned = accounts.filter(a => a.branch !== 'Kho trung tâm' && a.ownerName !== null).length;
  // UNASSIGNED tại chi nhánh = accounts ở branch thực mà chưa có ownerName (không tính Kho TT)
  const unassignedInBranch = accounts.filter(a => a.branch !== 'Kho trung tâm' && (a.ownerName === null || a.status === 'UNASSIGNED')).length; // 4
  const unassignedTotal = centralPool + unassignedInBranch; // 34
  
  const utilizationRate = allocated > 0 ? Math.round((active / allocated) * 100) : 0;

  return {
    total,
    centralPool,
    allocated,
    assigned,
    unassignedInBranch,
    unassigned: unassignedTotal,
    totalUnassignedOnTable: unassignedTotal,
    active,
    pending,
    locked,
    attention,
    utilizationRate
  };
}

// Compute scoped metrics based on active role (Super Admin vs Branch Admin)
function getRoleScopedMetrics() {
  const isBranchAdmin = AppState.currentRole === 'BRANCH_ADMIN';
  const branchScope = AppState.activeBranchScope;

  if (isBranchAdmin) {
    const branchAccounts = AppState.accounts.filter(a => a.branch === branchScope);
    const total = branchAccounts.length; // 8 for Ba Đình
    const active = branchAccounts.filter(a => a.status === 'ACTIVE').length; // 6
    const pending = branchAccounts.filter(a => a.status === 'PENDING').length; // 1 (ZA-003)
    const locked = branchAccounts.filter(a => a.status === 'LOCKED').length; // 0
    const unassigned = branchAccounts.filter(a => a.ownerName === null || a.status === 'UNASSIGNED').length; // 1
    const attention = branchAccounts.filter(a => a.attention !== null).length; // 1
    const utilizationRate = total > 0 ? Math.round((active / total) * 100) : 0; // 75%

    return {
      isBranchAdmin: true,
      total,
      centralPool: 0,
      allocated: total,
      assigned: active,
      unassignedInBranch: unassigned,
      unassigned,
      active,
      pending,
      locked,
      attention,
      utilizationRate
    };
  }

  // Super Admin view (Enterprise wide)
  return {
    isBranchAdmin: false,
    ...getMetrics()
  };
}

// Recalculate branch & region assigned/unassigned counts
function recalculateRegionCounts() {
  AppState.regions.forEach(region => {
    let regQuota = 0;
    region.branches.forEach(branch => {
      const branchAccounts = AppState.accounts.filter(a => a.branch === branch.name);
      branch.quota = branchAccounts.length;
      branch.assigned = branchAccounts.filter(a => a.ownerName !== null).length;
      branch.unassigned = branchAccounts.filter(a => a.ownerName === null).length;
      regQuota += branch.quota;
    });
    region.quota = regQuota;
  });
}

// Navigation View Switcher
function switchView(viewName) {
  AppState.currentView = viewName;

  document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));
  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) targetView.classList.remove('hidden');

  // Update nav links active styling
  document.querySelectorAll('.nav-item').forEach(btn => {
    if (btn.getAttribute('data-view') === viewName) {
      btn.classList.add('bg-surface-container-high', 'text-primary', 'border-l-2', 'border-primary', 'font-title-sm');
      btn.classList.remove('text-on-surface-variant');
    } else {
      btn.classList.remove('bg-surface-container-high', 'text-primary', 'border-l-2', 'border-primary', 'font-title-sm');
      btn.classList.add('text-on-surface-variant');
    }
  });

  // Render content of active view
  if (viewName === 'overview') switchView('quotas');
  else if (viewName === 'accounts') renderAccounts();
  else if (viewName === 'quotas') renderQuotas();
  else if (viewName === 'audit') renderAudit();
  else if (viewName === 'chat-monitor') renderChatMonitor();
}

// Render Overview View (Redirects to Quotas & Accounts after merging views)
function renderOverview() {
  renderQuotas();
  renderAccounts();
}

// Navigate to Accounts view with specific filter
function navigateToFilter(tabStatus, accountIdToHighlight = null) {
  AppState.accountFilters.status = tabStatus;
  AppState.accountFilters.search = '';
  AppState.accountFilters.region = 'all';
  AppState.accountFilters.branch = 'all';
  switchView('accounts');

  if (accountIdToHighlight) {
    setTimeout(() => {
      openDrawer(accountIdToHighlight);
    }, 150);
  }
}

// Triggered by "Áp dụng" filter button or Search Enter
function applyAccountFilters() {
  const searchInput = document.getElementById('acc-search-input');
  const regionSel = document.getElementById('acc-filter-region');
  const branchSel = document.getElementById('acc-filter-branch');

  if (searchInput) AppState.accountFilters.search = searchInput.value;
  if (regionSel && AppState.currentRole === 'SUPER_ADMIN') AppState.accountFilters.region = regionSel.value;
  if (branchSel && AppState.currentRole === 'SUPER_ADMIN') AppState.accountFilters.branch = branchSel.value;

  renderAccounts();
}

// Render Accounts View & Table (CR-001)
function renderAccounts() {
  const metrics = getRoleScopedMetrics();
  const isBranchAdmin = metrics.isBranchAdmin;

  // 1. Update Top KPI Overview Cards based on Role Scope
  const kpiTotalLabel = document.getElementById('acc-kpi-total-label');
  const kpiTotalSub = document.getElementById('acc-kpi-total-sub');
  
  if (isBranchAdmin) {
    if (kpiTotalLabel) kpiTotalLabel.innerText = 'Ngân sách chi nhánh';
    if (kpiTotalSub) kpiTotalSub.innerText = AppState.activeBranchScope;
  } else {
    if (kpiTotalLabel) kpiTotalLabel.innerText = 'Tổng quota';
    if (kpiTotalSub) kpiTotalSub.innerText = 'Ngân sách hệ thống';
  }

  const totalCount = metrics.total || 1;

  const kpiTotal = document.getElementById('acc-kpi-total');
  if (kpiTotal) kpiTotal.innerText = metrics.total;

  const kpiAllocated = document.getElementById('acc-kpi-allocated');
  if (kpiAllocated) kpiAllocated.innerText = isBranchAdmin ? metrics.allocated : metrics.allocated;
  const kpiAllocatedSub = document.getElementById('acc-kpi-allocated-sub');
  if (kpiAllocatedSub) kpiAllocatedSub.innerText = isBranchAdmin ? 'Đã phân bổ về CN' : 'Cấp 14 chi nhánh (70%)';

  const kpiCentral = document.getElementById('acc-kpi-central');
  if (kpiCentral) kpiCentral.innerText = isBranchAdmin ? metrics.unassigned : metrics.centralPool;
  const kpiCentralLabel = document.getElementById('acc-kpi-central-label');
  if (kpiCentralLabel) kpiCentralLabel.innerText = isBranchAdmin ? 'Chưa gán' : 'Chưa phân bổ';
  const kpiCentralSub = document.getElementById('acc-kpi-central-sub');
  if (kpiCentralSub) kpiCentralSub.innerText = isBranchAdmin ? 'Sẵn sàng gán' : 'Kho trung tâm (30%)';

  const kpiPending = document.getElementById('acc-kpi-pending');
  if (kpiPending) kpiPending.innerText = metrics.pending;
  const kpiLocked = document.getElementById('acc-kpi-locked');
  if (kpiLocked) kpiLocked.innerText = metrics.locked;

  // 1b. Update Top Right Attention Notification List (Scoped by Role)
  const attentionAccounts = isBranchAdmin
    ? AppState.accounts.filter(a => a.branch === AppState.activeBranchScope && a.attention !== null)
    : AppState.accounts.filter(a => a.attention !== null);

  const attentionBadge = document.getElementById('acc-attention-count-badge');
  if (attentionBadge) attentionBadge.innerText = `${attentionAccounts.length} ưu tiên`;

  const attentionList = document.getElementById('acc-attention-list');
  if (attentionList) {
    attentionList.innerHTML = '';
    const topAttentions = attentionAccounts.slice(0, 4);
    if (topAttentions.length === 0) {
      attentionList.innerHTML = '<div class="py-3 text-center text-slate-400 text-xs italic">Không có tài khoản nào cần chú ý trong phạm vi chi nhánh</div>';
    } else {
      topAttentions.forEach(acc => {
        const isCrit = acc.attention.severity === 'CRITICAL';
        let typeBadge = 'Cảnh báo';
        let badgeStyle = 'bg-amber-100 text-amber-900 border-amber-300';
        if (isCrit) {
          typeBadge = 'Nghỉ việc';
          badgeStyle = 'bg-red-100 text-red-800 border-red-300 font-bold';
        } else if (acc.status === 'PENDING') {
          typeBadge = 'Chưa kích hoạt';
          badgeStyle = 'bg-amber-100 text-amber-900 border-amber-300';
        } else if (acc.status === 'LOCKED') {
          typeBadge = 'Tạm khóa';
          badgeStyle = 'bg-slate-200 text-slate-800 border-slate-300';
        } else if (acc.attention.title.includes('IP')) {
          typeBadge = 'IP lạ';
          badgeStyle = 'bg-orange-100 text-orange-900 border-orange-300 font-bold';
        } else if (acc.attention.title.includes('chi nhánh')) {
          typeBadge = 'Chuyển đơn vị';
          badgeStyle = 'bg-blue-100 text-blue-900 border-blue-300';
        }

        const item = document.createElement('div');
        item.className = 'py-1.5 flex items-start justify-between gap-2 hover:bg-slate-50 cursor-pointer rounded px-1 transition-colors';
        item.onclick = () => openDrawer(acc.id);
        item.innerHTML = `
          <div class="flex items-start gap-1.5 min-w-0 flex-1">
            <span class="mt-0.5 inline-flex items-center px-1.5 py-0.2 rounded text-[10px] border shrink-0 ${badgeStyle}">${typeBadge}</span>
            <div class="flex flex-col min-w-0">
              <span class="text-[11px] text-on-surface font-medium leading-tight truncate" title="${acc.attention.title}">${acc.attention.title}</span>
              <span class="text-[10px] text-slate-400 mt-0.5"><strong class="text-primary font-mono">${acc.id}</strong> • ${acc.ownerName || 'Chưa gán'} (${acc.branch})</span>
            </div>
          </div>
          <button class="text-primary hover:text-primary-container text-[11px] font-semibold shrink-0" onclick="event.stopPropagation(); openDrawer('${acc.id}')">Xem</button>
        `;
        attentionList.appendChild(item);
      });
    }
  }

  const tabUnassignedLabel = document.getElementById('tab-unassigned-label');
  if (tabUnassignedLabel) {
    tabUnassignedLabel.innerText = isBranchAdmin ? 'Chưa phân bổ' : 'Chưa phân bổ';
  }

  // Toggle Role Toolbar Elements
  const regionFilterGroup = document.getElementById('acc-region-filter-group');
  const branchScopeBadge = document.getElementById('acc-branch-scope-badge');
  if (isBranchAdmin) {
    if (regionFilterGroup) regionFilterGroup.classList.add('hidden');
    if (branchScopeBadge) {
      branchScopeBadge.classList.remove('hidden');
      branchScopeBadge.classList.add('flex');
    }
  } else {
    if (regionFilterGroup) regionFilterGroup.classList.remove('hidden');
    if (branchScopeBadge) {
      branchScopeBadge.classList.add('hidden');
      branchScopeBadge.classList.remove('flex');
    }
  }

  // Active tab style
  document.querySelectorAll('.acc-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-filter') === AppState.accountFilters.status) {
      btn.classList.add('border-primary', 'text-primary', 'font-semibold');
      btn.classList.remove('border-transparent', 'text-on-surface-variant');
    } else {
      btn.classList.remove('border-primary', 'text-primary', 'font-semibold');
      btn.classList.add('border-transparent', 'text-on-surface-variant');
    }
  });

  // Base filters (Role, Search, Region, Branch) - applied BEFORE Quick Tab metrics
  let baseFiltered = AppState.accounts.slice();

  if (AppState.currentRole === 'BRANCH_ADMIN') {
    baseFiltered = baseFiltered.filter(a => a.branch === AppState.activeBranchScope);
  }

  const s = AppState.accountFilters.search.toLowerCase().trim();
  if (s) {
    baseFiltered = baseFiltered.filter(a => 
      a.id.toLowerCase().includes(s) ||
      (a.ownerName && a.ownerName.toLowerCase().includes(s)) ||
      (a.ownerEmail && a.ownerEmail.toLowerCase().includes(s)) ||
      a.branch.toLowerCase().includes(s)
    );
  }

  if (AppState.currentRole === 'SUPER_ADMIN' && AppState.accountFilters.region !== 'all') {
    baseFiltered = baseFiltered.filter(a => a.region === AppState.accountFilters.region);
  }

  if (AppState.currentRole === 'SUPER_ADMIN' && AppState.accountFilters.branch !== 'all') {
    baseFiltered = baseFiltered.filter(a => a.branch === AppState.accountFilters.branch);
  }

  // Update Quick Status Tab Counts based on baseFiltered!
  document.getElementById('tab-count-all').innerText = baseFiltered.length;
  document.getElementById('tab-count-unassigned').innerText = baseFiltered.filter(a => a.status === 'UNASSIGNED' || a.ownerName === null).length;
  document.getElementById('tab-count-active').innerText = baseFiltered.filter(a => a.status === 'ACTIVE').length;
  document.getElementById('tab-count-pending').innerText = baseFiltered.filter(a => a.status === 'PENDING').length;
  document.getElementById('tab-count-locked').innerText = baseFiltered.filter(a => a.status === 'LOCKED').length;
  document.getElementById('tab-count-warning').innerText = baseFiltered.filter(a => a.attention !== null).length;

  // Final filtered list including Quick tab filter
  let filtered = baseFiltered.slice();
  const curTab = AppState.accountFilters.status;
  
  if (curTab === 'unassigned') {
    filtered = filtered.filter(a => a.status === 'UNASSIGNED' || a.ownerName === null);
    // Pin reclaimed accounts to top (CR-001)
    filtered.sort((a, b) => (b.isReclaimed ? 1 : 0) - (a.isReclaimed ? 1 : 0));
  } else if (curTab === 'active') {
    filtered = filtered.filter(a => a.status === 'ACTIVE');
  } else if (curTab === 'pending') {
    filtered = filtered.filter(a => a.status === 'PENDING');
  } else if (curTab === 'locked') {
    filtered = filtered.filter(a => a.status === 'LOCKED');
  } else if (curTab === 'warning') {
    filtered = filtered.filter(a => a.attention !== null);
  }

  // Render Table Rows
  const tbody = document.getElementById('accounts-table-body');
  tbody.innerHTML = '';
  const countEl = document.getElementById('acc-visible-count');
  if (countEl) countEl.innerText = `${filtered.length} tài khoản`;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="py-8 text-center text-on-surface-variant text-sm">
          Không tìm thấy tài khoản phù hợp với điều kiện tìm kiếm/bộ lọc.
        </td>
      </tr>
    `;
    return;
  }

  filtered.forEach(acc => {
    const tr = document.createElement('tr');
    tr.className = `border-b border-outline-variant/30 hover:bg-sky-50/50 cursor-pointer transition-colors ${acc.isReclaimed ? 'bg-red-50/20' : ''}`;
    tr.setAttribute('data-id', acc.id);
    tr.onclick = (e) => {
      if (e.target.closest('button')) return;
      openDrawer(acc.id);
    };

    // Status pill helper (CR-001)
    let statusPill = '';
    if (acc.isReclaimed) {
      statusPill = `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-red-50 text-red-700 border border-red-200"><span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>Đã thu hồi</span>`;
    } else if (acc.ownerName === null || acc.status === 'UNASSIGNED') {
      statusPill = `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">Chưa phân bổ</span>`;
    } else if (acc.status === 'ACTIVE') {
      statusPill = `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Đang hoạt động</span>`;
    } else if (acc.status === 'PENDING') {
      statusPill = `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Chờ kích hoạt</span>`;
    } else if (acc.status === 'LOCKED') {
      statusPill = `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-slate-200 text-slate-700 border border-slate-300">Tạm khóa</span>`;
    }

    // Attention badge helper — empty for normal accounts (no dash clutter)
    let attentionCol = '';
    if (acc.attention) {
      const isCrit = acc.attention.severity === 'CRITICAL';
      attentionCol = `
        <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-semibold ${isCrit ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-amber-100 text-amber-900 border border-amber-300'}" title="${acc.attention.title}">
          <span class="material-symbols-outlined text-[13px]">${isCrit ? 'error' : 'warning'}</span>
          <span>${acc.attention.title.length > 25 ? acc.attention.title.substring(0, 25) + '...' : acc.attention.title}</span>
        </span>
      `;
    }

    // 4 Action Icons for Table Row (CR-001)
    let actionIcons = '';

    // Icon 1: Gán (unassigned) hoặc Bàn giao (active)
    if (acc.status === 'UNASSIGNED' || acc.ownerName === null) {
      actionIcons += `
        <button onclick="event.stopPropagation(); openAssignModal('${acc.id}')" title="Gán tài khoản cho nhân sự" class="w-7 h-7 rounded hover:bg-emerald-50 text-emerald-700 flex items-center justify-center cursor-pointer transition-colors">
          <span class="material-symbols-outlined text-[17px]">person_add</span>
        </button>
      `;
    } else if (acc.status === 'ACTIVE') {
      actionIcons += `
        <button onclick="event.stopPropagation(); openHandoverModal('${acc.id}')" title="Bàn giao tài khoản" class="w-7 h-7 rounded hover:bg-sky-50 text-sky-700 flex items-center justify-center cursor-pointer transition-colors">
          <span class="material-symbols-outlined text-[17px]">sync_alt</span>
        </button>
      `;
    } else {
      actionIcons += `
        <button disabled title="Không thể bàn giao khi ở trạng thái này" class="w-7 h-7 rounded text-slate-300 flex items-center justify-center cursor-not-allowed opacity-40">
          <span class="material-symbols-outlined text-[17px]">sync_alt</span>
        </button>
      `;
    }

    // Icon 2: Khóa (active) hoặc Mở khóa (locked)
    if (acc.status === 'ACTIVE') {
      actionIcons += `
        <button onclick="event.stopPropagation(); openLockModal('${acc.id}', true)" title="Tạm khóa tài khoản" class="w-7 h-7 rounded hover:bg-amber-50 text-amber-700 flex items-center justify-center cursor-pointer transition-colors">
          <span class="material-symbols-outlined text-[17px]">lock</span>
        </button>
      `;
    } else if (acc.status === 'LOCKED') {
      actionIcons += `
        <button onclick="event.stopPropagation(); openLockModal('${acc.id}', false)" title="Mở khóa tài khoản" class="w-7 h-7 rounded hover:bg-emerald-50 text-emerald-700 flex items-center justify-center cursor-pointer transition-colors">
          <span class="material-symbols-outlined text-[17px]">lock_open</span>
        </button>
      `;
    } else {
      actionIcons += `
        <button disabled title="Chỉ khóa được tài khoản đang hoạt động" class="w-7 h-7 rounded text-slate-300 flex items-center justify-center cursor-not-allowed opacity-40">
          <span class="material-symbols-outlined text-[17px]">lock</span>
        </button>
      `;
    }

    // Icon 3: Thu hồi (active, pending, locked)
    if (acc.status !== 'UNASSIGNED' && acc.ownerName !== null) {
      actionIcons += `
        <button onclick="event.stopPropagation(); openReclaimModal('${acc.id}')" title="Thu hồi về Kho trung tâm" class="w-7 h-7 rounded hover:bg-red-50 text-red-600 flex items-center justify-center cursor-pointer transition-colors">
          <span class="material-symbols-outlined text-[17px]">undo</span>
        </button>
      `;
    } else {
      actionIcons += `
        <button disabled title="Tài khoản đã ở Kho trung tâm" class="w-7 h-7 rounded text-slate-300 flex items-center justify-center cursor-not-allowed opacity-40">
          <span class="material-symbols-outlined text-[17px]">undo</span>
        </button>
      `;
    }

    // Icon 4: Xem chi tiết (mở Drawer)
    actionIcons += `
      <button onclick="event.stopPropagation(); openDrawer('${acc.id}')" title="Xem chi tiết tài khoản" class="w-7 h-7 rounded hover:bg-slate-100 text-slate-600 hover:text-primary flex items-center justify-center cursor-pointer transition-colors">
        <span class="material-symbols-outlined text-[17px]">visibility</span>
      </button>
    `;

    tr.innerHTML = `
      <td class="py-2.5 px-2 text-center w-8">
        <input type="checkbox" class="acc-row-checkbox w-3.5 h-3.5 rounded border-slate-300 cursor-pointer accent-primary"
          data-id="${acc.id}" onchange="toggleBulkSelect('${acc.id}', this.checked)"
          ${AppState.selectedAccounts.has(acc.id) ? 'checked' : ''}>
      </td>
      <td class="py-2.5 px-3 font-semibold text-primary text-body-sm font-mono flex items-center gap-1.5">
        <span>${acc.id}</span>
        ${acc.isReclaimed ? '<span class="px-1 py-0.2 bg-red-100 text-red-700 text-[10px] rounded font-bold">Thu hồi</span>' : ''}
      </td>
      <td class="py-2.5 px-3 text-body-sm font-medium text-on-surface">
        ${acc.ownerName 
          ? `<div>${acc.displayName || acc.ownerName}</div>${acc.displayName && acc.displayName !== acc.ownerName ? `<div class="text-[10px] text-slate-400">(${acc.ownerName})</div>` : ''}` 
          : (acc.isReclaimed && acc.formerOwner 
              ? `<div class="text-slate-400 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span><span class="line-through-none">${acc.formerOwner.name}</span><span class="text-[10px] text-slate-400 bg-slate-100 px-1 py-0.2 rounded font-normal border border-slate-200">(Thu hồi - Cũ)</span></div>` 
              : '<span class="text-slate-400 italic">Chưa gán</span>')}
      </td>
      <td class="py-2.5 px-3 text-body-xs text-on-surface-variant font-mono">
        ${acc.ownerEmail 
          ? acc.ownerEmail 
          : (acc.isReclaimed && acc.formerOwner 
              ? `<span class="text-slate-400 italic">${acc.formerOwner.email}</span>` 
              : '<span class="text-slate-400">—</span>')}
      </td>
      <td class="py-2.5 px-3 text-body-xs text-on-surface-variant">
        <div>${acc.branch}</div>
        <div class="text-[10px] text-slate-400">${acc.region}</div>
      </td>
      <td class="py-2.5 px-3">${statusPill}</td>
      <td class="py-2.5 px-3">${attentionCol}</td>
      <td class="py-2 px-2 text-center">
        <div class="inline-flex items-center gap-0.5 justify-center">
          ${actionIcons}
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ─── BULK SELECTION & ACTIONS ───────────────────────────────────────────────
function toggleBulkSelect(accountId, checked) {
  if (checked) AppState.selectedAccounts.add(accountId);
  else AppState.selectedAccounts.delete(accountId);
  updateBulkActionBar();
}

function toggleSelectAll(checked) {
  const checkboxes = document.querySelectorAll('.acc-row-checkbox');
  checkboxes.forEach(cb => {
    cb.checked = checked;
    const id = cb.getAttribute('data-id');
    if (checked) AppState.selectedAccounts.add(id);
    else AppState.selectedAccounts.delete(id);
  });
  updateBulkActionBar();
}

function updateBulkActionBar() {
  const bar = document.getElementById('bulk-action-bar');
  const countEl = document.getElementById('bulk-selected-count');
  const selectAllCb = document.getElementById('acc-select-all');
  const count = AppState.selectedAccounts.size;
  if (bar) {
    if (count > 0) bar.classList.remove('hidden');
    else bar.classList.add('hidden');
  }
  if (countEl) countEl.innerText = `Đã chọn ${count} tài khoản`;
  // Sync select-all checkbox state
  const allCbs = document.querySelectorAll('.acc-row-checkbox');
  if (selectAllCb && allCbs.length > 0) {
    const checkedCount = [...allCbs].filter(c => c.checked).length;
    selectAllCb.indeterminate = checkedCount > 0 && checkedCount < allCbs.length;
    selectAllCb.checked = checkedCount === allCbs.length;
  }
}

function bulkLockSelected() {
  const ids = [...AppState.selectedAccounts];
  const eligible = ids.filter(id => {
    const acc = AppState.accounts.find(a => a.id === id);
    return acc && acc.status === 'ACTIVE';
  });
  if (eligible.length === 0) {
    alert('Không có tài khoản nào đang hoạt động trong danh sách chọn để tạm khóa.');
    return;
  }
  if (!confirm(`Tạm khóa hàng loạt ${eligible.length} tài khoản đang hoạt động?

${eligible.join(', ')}

Tài khoản sẽ bị đình chỉ nhưng dữ liệu được bảo lưu.`)) return;
  eligible.forEach(id => {
    const acc = AppState.accounts.find(a => a.id === id);
    if (acc) {
      acc.status = 'LOCKED';
      acc.attention = { severity: 'WARNING', title: 'Tạm khóa hàng loạt theo yêu cầu quản trị' };
      AppState.auditLogs.unshift({
        id: `LOG-BULK-${id}`, type: 'lock', accountId: id,
        message: `Tạm khóa hàng loạt tài khoản ${id}`,
        actor: AppState.currentRole === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin Chi nhánh Ba Đình',
        date: new Date().toLocaleString('vi-VN')
      });
    }
  });
  AppState.selectedAccounts.clear();
  renderAccounts();
  alert(`Đã tạm khóa ${eligible.length} tài khoản thành công.`);
}

function bulkReclaimSelected() {
  const ids = [...AppState.selectedAccounts];
  const eligible = ids.filter(id => {
    const acc = AppState.accounts.find(a => a.id === id);
    return acc && acc.ownerName !== null && acc.status !== 'UNASSIGNED';
  });
  if (eligible.length === 0) {
    alert('Không có tài khoản nào đủ điều kiện thu hồi trong danh sách chọn.');
    return;
  }
  if (!confirm(`Thu hồi hàng loạt ${eligible.length} tài khoản về Kho trung tâm?

${eligible.join(', ')}

Thông tin nhân sự sẽ bị xóa khỏi các tài khoản này.`)) return;
  eligible.forEach(id => {
    const acc = AppState.accounts.find(a => a.id === id);
    if (acc) {
      acc.formerOwner = { name: acc.ownerName, email: acc.ownerEmail, code: acc.empCode,
        dept: acc.empDept, branch: acc.branch, phone: acc.empPhone,
        reclaimedDate: new Date().toLocaleString('vi-VN'), reclaimedBy: 'Super Admin (Bulk)',
        reason: 'Thu hồi hàng loạt sau đợt nghỉ việc' };
      acc.isReclaimed = true;
      acc.ownerName = null; acc.displayName = null; acc.ownerEmail = null;
      acc.empCode = null; acc.empDept = null; acc.empPhone = null;
      acc.status = 'UNASSIGNED';
      acc.region = 'Toàn quốc'; acc.branch = 'Kho trung tâm';
      acc.attention = null;
      AppState.auditLogs.unshift({
        id: `LOG-BULK-${id}`, type: 'reclaim', accountId: id,
        message: `Thu hồi hàng loạt tài khoản ${id} về Kho trung tâm`,
        actor: 'Super Admin (Bulk)', date: new Date().toLocaleString('vi-VN')
      });
    }
  });
  AppState.selectedAccounts.clear();
  renderAccounts();
  alert(`Đã thu hồi ${eligible.length} tài khoản về Kho trung tâm thành công.`);
}

function clearBulkSelection() {
  AppState.selectedAccounts.clear();
  document.querySelectorAll('.acc-row-checkbox').forEach(cb => cb.checked = false);
  const selectAllCb = document.getElementById('acc-select-all');
  if (selectAllCb) { selectAllCb.checked = false; selectAllCb.indeterminate = false; }
  updateBulkActionBar();
}

// ─────────────────────────────────────────────────────────────────────────────

// Drawer Open / Close / Tabs (CR-001 Redesign)
function openDrawer(accountId) {
  const acc = AppState.accounts.find(a => a.id === accountId);
  if (!acc) return;

  AppState.activeDrawerAccount = acc;

  const drawer = document.getElementById('account-drawer');
  drawer.classList.remove('translate-x-full');

  // Show drawer overlay
  const overlay = document.getElementById('drawer-overlay');
  if (overlay) overlay.classList.remove('hidden');

  // Fill Header
  document.getElementById('dw-account-id').innerText = acc.id;
  document.getElementById('dw-username').innerText = acc.username;

  // Status Badge
  const statusBadge = document.getElementById('dw-status-badge');
  if (acc.isReclaimed) {
    statusBadge.className = 'px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-800 border border-red-300';
    statusBadge.innerText = 'Đã thu hồi';
  } else if (acc.ownerName === null || acc.status === 'UNASSIGNED') {
    statusBadge.className = 'px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300';
    statusBadge.innerText = 'Chưa phân bổ';
  } else if (acc.status === 'ACTIVE') {
    statusBadge.className = 'px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300';
    statusBadge.innerText = 'Đang hoạt động';
  } else if (acc.status === 'PENDING') {
    statusBadge.className = 'px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300';
    statusBadge.innerText = 'Chờ kích hoạt';
  } else if (acc.status === 'LOCKED') {
    statusBadge.className = 'px-2 py-0.5 rounded text-xs font-semibold bg-slate-300 text-slate-800 border border-slate-400';
    statusBadge.innerText = 'Tạm khóa';
  }

  // Attention banner in drawer
  const attBanner = document.getElementById('dw-attention-banner');
  if (acc.attention) {
    attBanner.classList.remove('hidden');
    document.getElementById('dw-attention-title').innerText = acc.attention.title;
  } else {
    attBanner.classList.add('hidden');
  }

  // SECTION 1: THÔNG TIN NHÂN SỰ HR
  const hrDataGrid = document.getElementById('dw-hr-data-grid');
  const hrEmpty = document.getElementById('dw-hr-empty');
  const hrBadge = document.getElementById('dw-hr-badge');
  const hrReclaimedAlert = document.getElementById('dw-hr-reclaimed-alert');

  if (acc.isReclaimed && acc.formerOwner) {
    if (hrReclaimedAlert) hrReclaimedAlert.classList.remove('hidden');
    hrDataGrid.classList.remove('hidden');
    hrEmpty.classList.add('hidden');
    hrBadge.innerText = 'Đã thu hồi - Nhân sự cũ';
    hrBadge.className = 'px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-200 text-slate-700 border border-slate-300';

    document.getElementById('dw-hr-code').innerText = acc.formerOwner.code || '—';
    document.getElementById('dw-hr-name').innerText = acc.formerOwner.name;
    document.getElementById('dw-hr-dept').innerText = acc.formerOwner.dept || 'Kinh doanh Khách hàng';
    document.getElementById('dw-hr-branch').innerText = acc.formerOwner.branch || 'Chi nhánh cũ';
    document.getElementById('dw-hr-email').innerText = acc.formerOwner.email || '—';
    document.getElementById('dw-hr-phone').innerText = acc.formerOwner.phone || '—';

    // Apply muted gray styling to all info boxes
    hrDataGrid.querySelectorAll('div').forEach(box => {
      box.classList.add('opacity-75', 'bg-slate-50', 'text-slate-500');
    });

  // Update Ownership History Button in Drawer Header
  const historyCount = (acc.ownershipHistory ? acc.ownershipHistory.length : 0) + (acc.formerOwner ? 1 : 0);
  const btnHistory = document.getElementById('dw-btn-ownership-history');
  if (btnHistory) {
    btnHistory.innerHTML = `<span class="material-symbols-outlined text-[15px]">history</span> <span>Lịch sử nhân sự (${historyCount})</span>`;
    btnHistory.onclick = () => openOwnershipHistoryModal(acc.id);
  }
  } else if (acc.ownerName) {
    if (hrReclaimedAlert) hrReclaimedAlert.classList.add('hidden');
    hrDataGrid.classList.remove('hidden');
    hrEmpty.classList.add('hidden');
    hrBadge.innerText = acc.empStatus || 'Chính thức';
    hrBadge.className = 'px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800';

    document.getElementById('dw-hr-code').innerText = acc.empCode || 'NV10492';
    document.getElementById('dw-hr-name').innerText = acc.ownerName;
    document.getElementById('dw-hr-dept').innerText = acc.empDept || 'Kinh doanh Khách hàng';
    document.getElementById('dw-hr-branch').innerText = acc.branch;
    document.getElementById('dw-hr-email').innerText = acc.ownerEmail;
    document.getElementById('dw-hr-phone').innerText = acc.empPhone || '0982.345.678';

    // Remove muted styling
    hrDataGrid.querySelectorAll('div').forEach(box => {
      box.classList.remove('opacity-75', 'bg-slate-50', 'text-slate-500');
    });
  } else {
    if (hrReclaimedAlert) hrReclaimedAlert.classList.add('hidden');
    hrDataGrid.classList.add('hidden');
    hrEmpty.classList.remove('hidden');
    hrBadge.innerText = 'Chưa gán';
    hrBadge.className = 'px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-300';
  }

  // SECTION 2: THÔNG TIN ZALO CLOUD & TÊN HIỂN THỊ
  document.getElementById('dw-zalo-id').innerText = acc.id;
  document.getElementById('dw-zalo-username').innerText = acc.username;
  document.getElementById('dw-display-name').innerText = acc.displayName || acc.ownerName || 'Chưa thiết lập';
  document.getElementById('dw-created-date').innerText = acc.createdDate;
  document.getElementById('dw-assigned-date').innerText = acc.assignedDate || 'Chưa gán';

  // Toggle edit profile button (only when assigned)
  const editProfileBtn = document.getElementById('dw-btn-edit-profile');
  if (editProfileBtn) {
    if (acc.ownerName) editProfileBtn.classList.remove('hidden');
    else editProfileBtn.classList.add('hidden');
  }

  // Render Unified Timeline (CR-001: Lịch sử & Nhật ký)
  const timelineList = document.getElementById('dw-timeline-list');
  timelineList.innerHTML = '';

  const events = [];
  // 1. History events
  if (acc.history && acc.history.length > 0) {
    acc.history.forEach(h => {
      events.push({
        type: 'HISTORY',
        timestamp: h.date,
        title: `${h.from} → ${h.to}`,
        actor: h.by,
        icon: 'swap_horiz',
        iconBg: 'bg-primary/10 text-primary'
      });
    });
  }

  // 2. Audit log events
  const accountLogs = AppState.auditLogs.filter(l => l.target === acc.id);
  accountLogs.forEach(l => {
    let icon = 'info';
    let iconBg = 'bg-slate-100 text-slate-700';
    if (l.action.includes('Gán') || l.action.includes('Cấp')) {
      icon = 'person_add';
      iconBg = 'bg-emerald-50 text-emerald-700';
    } else if (l.action.includes('Bàn giao')) {
      icon = 'sync_alt';
      iconBg = 'bg-sky-50 text-sky-700';
    } else if (l.action.includes('Tạm khóa')) {
      icon = 'lock';
      iconBg = 'bg-amber-50 text-amber-700';
    } else if (l.action.includes('Thu hồi')) {
      icon = 'undo';
      iconBg = 'bg-red-50 text-red-700';
    } else if (l.action.includes('Profile') || l.action.includes('Tùy chỉnh')) {
      icon = 'badge';
      iconBg = 'bg-indigo-50 text-indigo-700';
    }

    events.push({
      type: 'AUDIT',
      timestamp: l.timestamp,
      title: `${l.action}: ${l.detail}`,
      actor: `${l.actor} (${l.role})`,
      icon,
      iconBg
    });
  });

  if (events.length === 0) {
    timelineList.innerHTML = `<div class="text-xs text-slate-400 italic p-3 text-center">Chưa có lịch sử hoặc nhật ký thao tác nào cho tài khoản này.</div>`;
  } else {
    events.forEach(ev => {
      const card = document.createElement('div');
      card.className = 'flex items-start gap-2.5 p-2.5 rounded-lg border border-outline-variant/30 bg-white text-xs shadow-2xs';
      card.innerHTML = `
        <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${ev.iconBg}">
          <span class="material-symbols-outlined text-[16px]">${ev.icon}</span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between text-[11px] text-slate-400 mb-0.5">
            <span class="font-mono">${ev.timestamp}</span>
            <span class="text-slate-500 font-medium">${ev.actor}</span>
          </div>
          <div class="text-on-surface font-medium leading-snug">${ev.title}</div>
        </div>
      `;
      timelineList.appendChild(card);
    });
  }

  // Contextual Sticky Action Bar Setup (with PENDING constraints)
  updateDrawerActionBar(acc);

  // Switch to Information Tab by default
  switchDrawerTab('info');
}

function closeDrawer() {
  document.getElementById('account-drawer').classList.add('translate-x-full');
  AppState.activeDrawerAccount = null;
  const overlay = document.getElementById('drawer-overlay');
  if (overlay) overlay.classList.add('hidden');
}

function switchDrawerTab(tabName) {
  document.querySelectorAll('.dw-panel').forEach(p => p.classList.add('hidden'));
  document.querySelectorAll('.dw-tab-btn').forEach(btn => {
    btn.classList.remove('border-primary', 'text-primary', 'font-semibold');
    btn.classList.add('border-transparent', 'text-on-surface-variant');
  });

  const panel = document.getElementById(`dw-panel-${tabName}`);
  if (panel) panel.classList.remove('hidden');
  const targetBtn = document.getElementById(`dw-tab-btn-${tabName}`);
  if (targetBtn) {
    targetBtn.classList.add('border-primary', 'text-primary', 'font-semibold');
    targetBtn.classList.remove('border-transparent', 'text-on-surface-variant');
  }
}

// Update Drawer Action buttons based on status & role (CR-001 Constraints)
function updateDrawerActionBar(acc) {
  const container = document.getElementById('dw-action-bar');
  container.innerHTML = '';

  const isSuper = AppState.currentRole === 'SUPER_ADMIN';

  // Case 1: Unassigned Account
  if (acc.ownerName === null || acc.status === 'UNASSIGNED') {
    if (acc.branch === 'Kho trung tâm' && !isSuper) {
      container.innerHTML = `<span class="text-xs text-slate-400 italic">Tài khoản thuộc Kho trung tâm, chỉ Super Admin được thao tác gán.</span>`;
      return;
    }

    container.innerHTML = `
      <button class="flex-1 h-9 px-3 bg-primary text-white rounded font-medium text-xs hover:bg-primary-container flex items-center justify-center gap-1.5 cursor-pointer shadow-sm" onclick="openAssignModal('${acc.id}')">
        <span class="material-symbols-outlined text-[16px]">person_add</span>
        <span>Gán tài khoản</span>
      </button>
    `;
    return;
  }

  // Case 2: PENDING Account (CR-001: DISABLE Handover & Lock, ENABLE Reclaim & Reset/Resend)
  if (acc.status === 'PENDING') {
    container.innerHTML = `
      <button class="flex-1 h-9 px-2 bg-slate-100 text-slate-400 border border-slate-200 rounded font-medium text-xs flex items-center justify-center gap-1 cursor-not-allowed opacity-50" disabled title="Tài khoản đang chờ kích hoạt (timeout 3 ngày), không thể bàn giao">
        <span class="material-symbols-outlined text-[15px]">sync_alt</span>
        <span>Bàn giao</span>
      </button>

      <button class="h-9 px-2 bg-slate-100 text-slate-400 border border-slate-200 rounded font-medium text-xs flex items-center justify-center gap-1 cursor-not-allowed opacity-50" disabled title="Tài khoản đang chờ kích hoạt, không thể tạm khóa">
        <span class="material-symbols-outlined text-[15px]">lock</span>
        <span>Tạm khóa</span>
      </button>

      <button class="h-9 px-2 bg-red-50 text-red-700 hover:bg-red-100 border border-red-300 rounded font-medium text-xs flex items-center justify-center gap-1 cursor-pointer" onclick="openReclaimModal('${acc.id}')" title="Thu hồi tài khoản về Kho trung tâm">
        <span class="material-symbols-outlined text-[15px]">undo</span>
        <span>Thu hồi</span>
      </button>

      <button class="h-9 px-2.5 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 rounded font-medium text-xs flex items-center justify-center gap-1 cursor-pointer" onclick="openResetPasswordModal('${acc.id}')" title="Gửi lại mã/link kích hoạt tài khoản">
        <span class="material-symbols-outlined text-[15px]">send</span>
        <span>Gửi lại kích hoạt</span>
      </button>
    `;
    return;
  }

  // Case 3: ACTIVE Account (Full 4 actions directly visible)
  if (acc.status === 'ACTIVE') {
    container.innerHTML = `
      <button class="flex-1 h-9 px-2 bg-surface-container-high text-primary hover:bg-surface-container-highest border border-primary/20 rounded font-medium text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors active:scale-95" onclick="openHandoverModal('${acc.id}')" title="Bàn giao tài khoản trực tiếp cho nhân viên cùng chi nhánh">
        <span class="material-symbols-outlined text-[15px]">sync_alt</span>
        <span>Bàn giao</span>
      </button>

      <button class="h-9 px-2.5 bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-300 rounded font-medium text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors active:scale-95" onclick="openLockModal('${acc.id}', true)" title="Tạm khóa tài khoản">
        <span class="material-symbols-outlined text-[15px]">lock</span>
        <span>Tạm khóa</span>
      </button>

      <button class="h-9 px-2.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-300 rounded font-medium text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors active:scale-95" onclick="openReclaimModal('${acc.id}')" title="Thu hồi tài khoản về Kho trung tâm">
        <span class="material-symbols-outlined text-[15px]">undo</span>
        <span>Thu hồi</span>
      </button>

      <button class="h-9 px-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 rounded font-medium text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors active:scale-95" onclick="openResetPasswordModal('${acc.id}')" title="Reset thông tin đăng nhập / Đặt lại mật khẩu">
        <span class="material-symbols-outlined text-[15px]">password</span>
        <span>Đặt lại MK</span>
      </button>
    `;
    return;
  }

  // Case 4: LOCKED Account
  if (acc.status === 'LOCKED') {
    container.innerHTML = `
      <button class="flex-1 h-9 px-3 bg-emerald-600 text-white hover:bg-emerald-700 rounded font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors active:scale-95" onclick="openLockModal('${acc.id}', false)">
        <span class="material-symbols-outlined text-[16px]">lock_open</span>
        <span>Mở khóa tài khoản</span>
      </button>

      <button class="h-9 px-3 bg-red-50 text-red-700 hover:bg-red-100 border border-red-300 rounded font-medium text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors active:scale-95" onclick="openReclaimModal('${acc.id}')" title="Thu hồi tài khoản về Kho trung tâm">
        <span class="material-symbols-outlined text-[15px]">undo</span>
        <span>Thu hồi</span>
      </button>

      <button class="h-9 px-3 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 rounded font-medium text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors active:scale-95" onclick="openResetPasswordModal('${acc.id}')" title="Reset thông tin đăng nhập / Đặt lại mật khẩu">
        <span class="material-symbols-outlined text-[15px]">password</span>
        <span>Đặt lại MK</span>
      </button>
    `;
    return;
  }
}

// -----------------------------------------------------------------
// Action Modals: Assign, Handover, Lock, Unlock, Reclaim, Reset Pass, Allocate Quota, Transfer Quota, Sync Zalo
// -----------------------------------------------------------------

// Helper to append system audit log
function addAuditLog(action, target, detail) {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const timeStr = `${pad(now.getDate())}/${pad(now.getMonth()+1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  
  const actorName = AppState.currentRole === 'SUPER_ADMIN' ? 'Super Admin' : `Admin (${AppState.activeBranchScope})`;
  const actorRole = AppState.currentRole === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin chi nhánh';

  AppState.auditLogs.unshift({
    id: `LOG-${String(AppState.auditLogs.length + 1).padStart(3, '0')}`,
    timestamp: timeStr,
    actor: actorName,
    role: actorRole,
    action,
    target,
    detail
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// OWNERSHIP HISTORY AUDIT TRAIL (Tra cứu lịch sử các đời nhân viên sử dụng)
// ─────────────────────────────────────────────────────────────────────────────
function openOwnershipHistoryModal(accountId) {
  const acc = AppState.accounts.find(a => a.id === accountId);
  if (!acc) return;

  document.getElementById('modal-history-acc-id').innerText = acc.id;
  document.getElementById('modal-history-cur-status').innerText = acc.status;

  const tbody = document.getElementById('modal-history-tbody');
  tbody.innerHTML = '';

  const history = acc.ownershipHistory || [];

  if (history.length === 0 && !acc.formerOwner) {
    tbody.innerHTML = `<tr><td colspan="6" class="py-6 text-center text-slate-400 italic">Tài khoản này chưa có tiền sử thu hồi / chuyển nhượng qua các đời nhân sự.</td></tr>`;
  } else {
    // Combine current formerOwner if exists
    let list = [...history];
    if (acc.formerOwner && !list.some(h => h.email === acc.formerOwner.email)) {
      list.unshift({
        generation: list.length + 1,
        name: acc.formerOwner.name,
        email: acc.formerOwner.email,
        code: acc.formerOwner.code || '—',
        dept: acc.formerOwner.dept || 'Kinh doanh',
        branch: acc.formerOwner.branch || acc.branch,
        fromDate: '15/08/2026',
        toDate: acc.formerOwner.reclaimedDate || '26/09/2026',
        reclaimedDate: acc.formerOwner.reclaimedDate || '26/09/2026',
        reclaimedBy: acc.formerOwner.reclaimedBy || 'Super Admin',
        reason: acc.formerOwner.reason || 'Thu hồi về Kho trung tâm'
      });
    }

    list.forEach((item, idx) => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50 border-b border-outline-variant/30 text-xs';
      tr.innerHTML = `
        <td class="py-2.5 px-3 font-bold text-center text-primary font-mono">Đời ${list.length - idx}</td>
        <td class="py-2.5 px-3">
          <div class="font-bold text-on-surface">${item.name}</div>
          <div class="text-[10px] text-slate-400 font-mono">${item.code || '—'}</div>
        </td>
        <td class="py-2.5 px-3 font-mono text-slate-600">${item.email}</td>
        <td class="py-2.5 px-3">${item.branch}</td>
        <td class="py-2.5 px-3 text-slate-500 font-mono">${item.fromDate || '15/08/2026'} → ${item.toDate || item.reclaimedDate}</td>
        <td class="py-2.5 px-3">
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
            ${item.reason || 'Thu hồi tài khoản'}
          </span>
          <div class="text-[10px] text-slate-400 mt-0.5 font-mono">Bởi: ${item.reclaimedBy || 'Super Admin'}</div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  document.getElementById('modal-ownership-history').classList.remove('hidden');
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIFIED ASSIGN / PROVISION MODAL (Refined Enterprise Design)
// ─────────────────────────────────────────────────────────────────────────────
let gTargetAssignAccount = null;

function openAssignModal(accountId) {
  openAssignAccountModal(accountId);
}

function openTopProvisionModal() {
  openAssignAccountModal(null);
}

function openAssignAccountModal(accountId = null) {
  let targetAccount = null;
  const isBranchAdmin = AppState.currentRole === 'BRANCH_ADMIN';
  let availableAccounts = [];

  // Determine available accounts
  if (isBranchAdmin) {
    availableAccounts = AppState.accounts.filter(a => a.branch === AppState.activeBranchScope && (a.ownerName === null || a.status === 'UNASSIGNED'));
  } else {
    // Super Admin: All unassigned accounts
    availableAccounts = AppState.accounts.filter(a => a.ownerName === null || a.status === 'UNASSIGNED');
  }

  const readonlyWrapAcc = document.getElementById('modal-provision-acc-readonly-wrap');
  const selectWrapAcc = document.getElementById('modal-provision-acc-select-wrap');
  const accSelect = document.getElementById('modal-provision-acc-select');
  const empInput = document.getElementById('modal-provision-emp-input');
  const dispInput = document.getElementById('modal-provision-display-name');

  if (accountId) {
    targetAccount = AppState.accounts.find(a => a.id === accountId);
    if (readonlyWrapAcc) readonlyWrapAcc.classList.remove('hidden');
    if (selectWrapAcc) selectWrapAcc.classList.add('hidden');

    // Enable fields since account is known
    if (empInput) {
      empInput.disabled = false;
      empInput.className = 'w-full text-xs pl-8 pr-8 py-2 rounded-lg border border-outline-variant bg-white focus:outline-primary focus:border-primary font-medium';
    }
    if (dispInput) {
      dispInput.disabled = false;
      dispInput.className = 'w-full text-xs p-2 rounded-lg border border-outline-variant bg-white text-on-surface font-medium focus:outline-primary focus:border-primary';
    }
  } else {
    if (availableAccounts.length === 0) {
      alert('Không còn tài khoản khả dụng để gán! Vui lòng thu hồi tài khoản không dùng trước.');
      return;
    }
    
    // Do not auto select target account
    targetAccount = null;

    if (readonlyWrapAcc) readonlyWrapAcc.classList.add('hidden');
    if (selectWrapAcc) selectWrapAcc.classList.remove('hidden');

    // Populate Account ID select
    if (accSelect) {
      accSelect.innerHTML = '<option value="">--- Chọn Account ID ---</option>';
      availableAccounts.forEach(a => {
        const opt = document.createElement('option');
        opt.value = a.id;
        opt.innerText = `${a.id} (${a.branch || 'Kho trung tâm'})`;
        accSelect.appendChild(opt);
      });
      accSelect.value = '';
    }

    // Disable email and display name fields until Account ID is selected
    if (empInput) {
      empInput.disabled = true;
      empInput.className = 'w-full text-xs pl-8 pr-8 py-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-400 font-medium cursor-not-allowed focus:outline-primary focus:border-primary';
    }
    if (dispInput) {
      dispInput.disabled = true;
      dispInput.className = 'w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-400 font-medium cursor-not-allowed focus:outline-primary focus:border-primary';
    }
  }

  if (accountId && !targetAccount) {
    alert('Không tìm thấy tài khoản để gán.');
    return;
  }

  gTargetAssignAccount = targetAccount;

  // Set Account ID in header (for readonly mode)
  const accIdEl = document.getElementById('modal-provision-acc-id');
  if (accIdEl) accIdEl.innerText = targetAccount ? targetAccount.id : '...';

  const poolTag = document.getElementById('modal-provision-pool-tag');
  if (poolTag) {
    if (targetAccount && targetAccount.isReclaimed) {
      poolTag.innerText = 'Đã thu hồi - Sẵn sàng gán';
      poolTag.className = 'px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200';
    } else {
      poolTag.innerText = 'Chưa phân bổ';
      poolTag.className = 'px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
  }

  renderProvisionBranchUI();

  // Reset Combobox & Display Name
  clearProvisionCombobox();
  if (dispInput) dispInput.value = '';

  document.getElementById('modal-top-provision').classList.remove('hidden');
}

function onProvisionAccChanged(accId) {
  const empInput = document.getElementById('modal-provision-emp-input');
  const dispInput = document.getElementById('modal-provision-display-name');

  if (accId) {
    const target = AppState.accounts.find(a => a.id === accId);
    gTargetAssignAccount = target || null;
    
    // Enable fields
    if (empInput) {
      empInput.disabled = false;
      empInput.className = 'w-full text-xs pl-8 pr-8 py-2 rounded-lg border border-outline-variant bg-white focus:outline-primary focus:border-primary font-medium';
    }
    if (dispInput) {
      dispInput.disabled = false;
      dispInput.className = 'w-full text-xs p-2 rounded-lg border border-outline-variant bg-white text-on-surface font-medium focus:outline-primary focus:border-primary';
    }
  } else {
    gTargetAssignAccount = null;

    // Disable fields
    if (empInput) {
      empInput.disabled = true;
      empInput.className = 'w-full text-xs pl-8 pr-8 py-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-400 font-medium cursor-not-allowed focus:outline-primary focus:border-primary';
    }
    if (dispInput) {
      dispInput.disabled = true;
      dispInput.className = 'w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-400 font-medium cursor-not-allowed focus:outline-primary focus:border-primary';
    }
  }

  renderProvisionBranchUI();
  clearProvisionCombobox();
  if (dispInput) dispInput.value = '';
  
  // Set Account ID in header (for readonly mode)
  const accIdEl = document.getElementById('modal-provision-acc-id');
  if (accIdEl) accIdEl.innerText = gTargetAssignAccount ? gTargetAssignAccount.id : '...';

  const poolTag = document.getElementById('modal-provision-pool-tag');
  if (poolTag) {
    if (gTargetAssignAccount && gTargetAssignAccount.isReclaimed) {
      poolTag.innerText = 'Đã thu hồi - Sẵn sàng gán';
      poolTag.className = 'px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200';
    } else {
      poolTag.innerText = 'Chưa phân bổ';
      poolTag.className = 'px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
  }
}

function renderProvisionBranchUI() {
  const readonlyWrap = document.getElementById('modal-provision-branch-readonly-wrap');
  const selectWrap = document.getElementById('modal-provision-branch-select-wrap');
  const branchLabel = document.getElementById('modal-provision-branch-label');
  const branchReadonly = document.getElementById('modal-provision-branch-readonly');
  const branchSelect = document.getElementById('modal-provision-branch-select');

  if (!gTargetAssignAccount) {
    if (readonlyWrap) readonlyWrap.classList.add('hidden');
    if (selectWrap) selectWrap.classList.add('hidden');
    return;
  }
  
  const targetAccount = gTargetAssignAccount;
  
  // Branch Handling
  const isFromCentralPool = targetAccount.branch === 'Kho trung tâm';

  if (isFromCentralPool && AppState.currentRole === 'SUPER_ADMIN') {
    if (branchLabel) branchLabel.innerText = 'Chi nhánh nhận tài khoản';
    if (readonlyWrap) readonlyWrap.classList.add('hidden');
    if (selectWrap) selectWrap.classList.remove('hidden');

    // Populate branches
    if (branchSelect) {
      branchSelect.innerHTML = '';
      AppState.regions.forEach(r => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = r.name;
        r.branches.forEach(b => {
          const opt = document.createElement('option');
          opt.value = b.name;
          opt.innerText = b.name;
          optgroup.appendChild(opt);
        });
        branchSelect.appendChild(optgroup);
      });
    }
  } else {
    // Fixed branch
    const fixedBranch = isFromCentralPool ? AppState.activeBranchScope : targetAccount.branch;
    if (branchLabel) branchLabel.innerText = 'Chi nhánh quản lý';
    if (readonlyWrap) readonlyWrap.classList.remove('hidden');
    if (selectWrap) selectWrap.classList.add('hidden');
    if (branchReadonly) branchReadonly.value = `${fixedBranch} (${targetAccount.region !== 'Toàn quốc' ? targetAccount.region : 'Vùng 1 - Hà Nội'})`;
  }
}

function getActiveProvisionBranch() {
  if (!gTargetAssignAccount) return 'Chi nhánh Ba Đình';
  const isFromCentralPool = gTargetAssignAccount.branch === 'Kho trung tâm';
  if (isFromCentralPool && AppState.currentRole === 'SUPER_ADMIN') {
    const sel = document.getElementById('modal-provision-branch-select');
    return sel ? sel.value : 'Chi nhánh Ba Đình';
  }
  return isFromCentralPool ? AppState.activeBranchScope : gTargetAssignAccount.branch;
}

function onProvisionBranchChanged(branchName) {
  clearProvisionCombobox();
}

// ── Searchable Combobox Logic ──
function openProvisionCombobox() {
  if (!gTargetAssignAccount) return;
  renderProvisionComboboxList('');
  const dropdown = document.getElementById('modal-provision-emp-dropdown');
  if (dropdown) dropdown.classList.remove('hidden');
}

function onProvisionComboboxInput(keyword) {
  if (!gTargetAssignAccount) return;
  const clearBtn = document.getElementById('modal-provision-emp-clear');
  if (clearBtn) {
    if (keyword.length > 0) clearBtn.classList.remove('hidden');
    else clearBtn.classList.add('hidden');
  }

  // Clear hidden values if user edits text
  document.getElementById('modal-provision-selected-code').value = '';
  document.getElementById('modal-provision-selected-name').value = '';
  document.getElementById('modal-provision-selected-email').value = '';
  document.getElementById('modal-provision-selected-dept').value = '';

  renderProvisionComboboxList(keyword);
  const dropdown = document.getElementById('modal-provision-emp-dropdown');
  if (dropdown) dropdown.classList.remove('hidden');
}

function clearProvisionCombobox() {
  const input = document.getElementById('modal-provision-emp-input');
  if (input) input.value = '';
  const clearBtn = document.getElementById('modal-provision-emp-clear');
  if (clearBtn) clearBtn.classList.add('hidden');

  document.getElementById('modal-provision-selected-code').value = '';
  document.getElementById('modal-provision-selected-name').value = '';
  document.getElementById('modal-provision-selected-email').value = '';
  document.getElementById('modal-provision-selected-dept').value = '';

  const dropdown = document.getElementById('modal-provision-emp-dropdown');
  if (dropdown) dropdown.classList.add('hidden');
}

function renderProvisionComboboxList(keyword = '') {
  const dropdown = document.getElementById('modal-provision-emp-dropdown');
  if (!dropdown) return;
  dropdown.innerHTML = '';

  const branch = getActiveProvisionBranch();
  const kw = keyword.toLowerCase().trim();

  // Get active accounts emails to avoid duplicates
  const assignedEmails = new Set(
    AppState.accounts.filter(a => a.ownerEmail && a.status !== 'UNASSIGNED').map(a => a.ownerEmail)
  );

  // Filter eligible employees:
  // 1. status === 'ACTIVE'
  // 2. has corporate email (@fpt.com)
  // 3. no active Zalo Enterprise account
  // 4. belongs to current branch
  // 5. matches search keyword (name or email or code)
  const eligible = AppState.hrEmployees.filter(emp => {
    if (emp.status !== 'ACTIVE') return false;
    if (!emp.email || !emp.email.endsWith('@fpt.com')) return false;
    if (assignedEmails.has(emp.email)) return false;
    if (branch && emp.branch !== branch) return false;
    if (kw) {
      const matchName = emp.name.toLowerCase().includes(kw);
      const matchEmail = emp.email.toLowerCase().includes(kw);
      const matchCode = emp.code.toLowerCase().includes(kw);
      return matchName || matchEmail || matchCode;
    }
    return true;
  });

  if (eligible.length === 0) {
    dropdown.innerHTML = `<div class="p-3 text-center text-slate-400 text-xs italic">Không tìm thấy nhân sự phù hợp tại ${branch || 'chi nhánh này'}</div>`;
    return;
  }

  eligible.forEach(emp => {
    const item = document.createElement('div');
    item.className = 'p-2.5 hover:bg-primary/5 cursor-pointer transition-colors';
    item.onclick = () => selectProvisionEmployee(emp);
    item.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="font-bold text-on-surface text-xs">${emp.name}</div>
        <span class="text-[10px] font-mono text-slate-400">${emp.code}</span>
      </div>
      <div class="text-[11px] text-slate-500 font-mono mt-0.5">${emp.email} <span class="text-slate-300">•</span> ${emp.dept || 'Kinh doanh'}</div>
    `;
    dropdown.appendChild(item);
  });
}

function selectProvisionEmployee(emp) {
  const input = document.getElementById('modal-provision-emp-input');
  if (input) input.value = `${emp.name} (${emp.email})`;

  document.getElementById('modal-provision-selected-code').value = emp.code;
  document.getElementById('modal-provision-selected-name').value = emp.name;
  document.getElementById('modal-provision-selected-email').value = emp.email;
  document.getElementById('modal-provision-selected-dept').value = emp.dept || 'Kinh doanh Khách hàng';

  // Auto-fill Display Name if empty
  const dispNameInput = document.getElementById('modal-provision-display-name');
  if (dispNameInput && !dispNameInput.value) dispNameInput.value = emp.name;

  const clearBtn = document.getElementById('modal-provision-emp-clear');
  if (clearBtn) clearBtn.classList.remove('hidden');

  const dropdown = document.getElementById('modal-provision-emp-dropdown');
  if (dropdown) dropdown.classList.add('hidden');
}

// Close combobox when clicking outside
document.addEventListener('click', (e) => {
  const wrapper = document.getElementById('provision-combobox-wrapper');
  const dropdown = document.getElementById('modal-provision-emp-dropdown');
  if (wrapper && dropdown && !wrapper.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});

function submitTopProvision() {
  const targetAccount = gTargetAssignAccount;
  if (!targetAccount) {
    alert('Vui lòng chọn một Account ID cần cấp!');
    return;
  }

  const name = document.getElementById('modal-provision-selected-name').value;
  const email = document.getElementById('modal-provision-selected-email').value;
  const code = document.getElementById('modal-provision-selected-code').value;
  const dept = document.getElementById('modal-provision-selected-dept').value || 'Kinh doanh Khách hàng';
  const displayName = document.getElementById('modal-provision-display-name').value.trim();

  if (!name || !email) {
    alert('Vui lòng chọn một nhân viên từ danh sách gợi ý!');
    return;
  }

  if (!displayName) {
    alert('Vui lòng nhập Tên hiển thị trên Zalo (bắt buộc)!');
    document.getElementById('modal-provision-display-name').focus();
    return;
  }

  const branchName = getActiveProvisionBranch();

  // Archive formerOwner into ownershipHistory
  if (!targetAccount.ownershipHistory) targetAccount.ownershipHistory = [];
  if (targetAccount.formerOwner) {
    targetAccount.ownershipHistory.unshift({
      generation: targetAccount.ownershipHistory.length + 1,
      name: targetAccount.formerOwner.name,
      email: targetAccount.formerOwner.email,
      code: targetAccount.formerOwner.code || '—',
      dept: targetAccount.formerOwner.dept || 'Kinh doanh',
      branch: targetAccount.formerOwner.branch || targetAccount.branch,
      phone: targetAccount.formerOwner.phone || '—',
      fromDate: '15/08/2026',
      toDate: targetAccount.formerOwner.reclaimedDate || '26/09/2026',
      reclaimedDate: targetAccount.formerOwner.reclaimedDate || '26/09/2026',
      reclaimedBy: targetAccount.formerOwner.reclaimedBy || 'Super Admin',
      reason: targetAccount.formerOwner.reason || 'Thu hồi về Kho trung tâm'
    });
    targetAccount.formerOwner = null;
  }

  // Clear reclaimed flag completely
  targetAccount.isReclaimed = false;

  targetAccount.ownerName = name;
  targetAccount.displayName = displayName;
  targetAccount.username = email.split('@')[0];
  targetAccount.ownerEmail = email;
  targetAccount.empCode = code;
  targetAccount.empDept = dept;
  targetAccount.empPhone = '098' + (Math.floor(Math.random()*899)+100) + '.345';
  targetAccount.empStatus = 'Chính thức';
  targetAccount.status = 'PENDING'; // Chờ kích hoạt
  targetAccount.branch = branchName;
  const reg = AppState.regions.find(r => r.branches.some(b => b.name === branchName));
  targetAccount.region = reg ? reg.name : 'Vùng 1 - Hà Nội';
  targetAccount.assignedDate = new Date().toLocaleDateString('vi-VN');
  targetAccount.attention = null;

  targetAccount.history.unshift({
    from: 'Kho trung tâm',
    to: name,
    date: new Date().toLocaleString('vi-VN'),
    by: AppState.currentRole === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin chi nhánh'
  });

  addAuditLog('Gán tài khoản', targetAccount.id, `Gán tài khoản cho nhân sự ${name} (${email}) tại ${branchName}, trạng thái Chờ kích hoạt`);
  recalculateRegionCounts();

  closeModal('modal-top-provision');
  openDrawer(targetAccount.id);
  renderAccounts();
  renderOverview();
  alert(`Gán thành công tài khoản ${targetAccount.id} cho nhân viên ${name} (${email})!`);
}


// 2. Handover Account (Searchable Combobox strictly scoped to Same Branch)
let gTargetHandoverAccount = null;

function openHandoverModal(accountId) {
  const acc = AppState.accounts.find(a => a.id === accountId);
  if (!acc) return;
  gTargetHandoverAccount = acc;

  document.getElementById('modal-handover-acc-id').innerText = acc.id;
  document.getElementById('modal-handover-current-owner').innerText = `${acc.ownerName} (${acc.ownerEmail})`;
  document.getElementById('modal-handover-branch').innerText = acc.branch;

  clearHandoverCombobox();
  document.getElementById('modal-handover').classList.remove('hidden');
}

function openHandoverCombobox() {
  renderHandoverComboboxList('');
  const dropdown = document.getElementById('modal-handover-emp-dropdown');
  if (dropdown) dropdown.classList.remove('hidden');
}

function onHandoverComboboxInput(keyword) {
  const clearBtn = document.getElementById('modal-handover-emp-clear');
  if (clearBtn) {
    if (keyword.length > 0) clearBtn.classList.remove('hidden');
    else clearBtn.classList.add('hidden');
  }

  document.getElementById('modal-handover-selected-code').value = '';
  document.getElementById('modal-handover-selected-name').value = '';
  document.getElementById('modal-handover-selected-email').value = '';
  document.getElementById('modal-handover-selected-dept').value = '';

  renderHandoverComboboxList(keyword);
  const dropdown = document.getElementById('modal-handover-emp-dropdown');
  if (dropdown) dropdown.classList.remove('hidden');
}

function clearHandoverCombobox() {
  const input = document.getElementById('modal-handover-emp-input');
  if (input) input.value = '';
  const clearBtn = document.getElementById('modal-handover-emp-clear');
  if (clearBtn) clearBtn.classList.add('hidden');

  document.getElementById('modal-handover-selected-code').value = '';
  document.getElementById('modal-handover-selected-name').value = '';
  document.getElementById('modal-handover-selected-email').value = '';
  document.getElementById('modal-handover-selected-dept').value = '';

  const dropdown = document.getElementById('modal-handover-emp-dropdown');
  if (dropdown) dropdown.classList.add('hidden');
}

function renderHandoverComboboxList(keyword = '') {
  const dropdown = document.getElementById('modal-handover-emp-dropdown');
  if (!dropdown || !gTargetHandoverAccount) return;
  dropdown.innerHTML = '';

  const branch = gTargetHandoverAccount.branch;
  const kw = keyword.toLowerCase().trim();

  const assignedEmails = new Set(
    AppState.accounts.filter(a => a.ownerEmail && a.status !== 'UNASSIGNED').map(a => a.ownerEmail)
  );

  // STRICT RULE: Same branch only, active, has corporate email, no active account
  const eligible = AppState.hrEmployees.filter(emp => {
    if (emp.status !== 'ACTIVE') return false;
    if (!emp.email || !emp.email.endsWith('@fpt.com')) return false;
    if (emp.branch !== branch) return false;
    if (assignedEmails.has(emp.email)) return false;
    if (emp.email === gTargetHandoverAccount.ownerEmail) return false;
    if (kw) {
      const matchName = emp.name.toLowerCase().includes(kw);
      const matchEmail = emp.email.toLowerCase().includes(kw);
      const matchCode = emp.code.toLowerCase().includes(kw);
      return matchName || matchEmail || matchCode;
    }
    return true;
  });

  if (eligible.length === 0) {
    dropdown.innerHTML = `<div class="p-3 text-center text-slate-400 text-xs italic">Không tìm thấy nhân sự khả dụng tại ${branch}</div>`;
    return;
  }

  eligible.forEach(emp => {
    const item = document.createElement('div');
    item.className = 'p-2.5 hover:bg-primary/5 cursor-pointer transition-colors';
    item.onclick = () => selectHandoverEmployee(emp);
    item.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="font-bold text-on-surface text-xs">${emp.name}</div>
        <span class="text-[10px] font-mono text-slate-400">${emp.code}</span>
      </div>
      <div class="text-[11px] text-slate-500 font-mono mt-0.5">${emp.email} <span class="text-slate-300">•</span> ${emp.dept || 'Kinh doanh'} <span class="text-slate-300">•</span> <strong class="text-primary font-normal">${emp.branch}</strong></div>
    `;
    dropdown.appendChild(item);
  });
}

function selectHandoverEmployee(emp) {
  const input = document.getElementById('modal-handover-emp-input');
  if (input) input.value = `${emp.name} (${emp.email})`;

  document.getElementById('modal-handover-selected-code').value = emp.code;
  document.getElementById('modal-handover-selected-name').value = emp.name;
  document.getElementById('modal-handover-selected-email').value = emp.email;
  document.getElementById('modal-handover-selected-dept').value = emp.dept || 'Kinh doanh';

  const clearBtn = document.getElementById('modal-handover-emp-clear');
  if (clearBtn) clearBtn.classList.remove('hidden');

  const dropdown = document.getElementById('modal-handover-emp-dropdown');
  if (dropdown) dropdown.classList.add('hidden');
}

// Click outside listener for handover combobox
document.addEventListener('click', (e) => {
  const wrapper = document.getElementById('handover-combobox-wrapper');
  const dropdown = document.getElementById('modal-handover-emp-dropdown');
  if (wrapper && dropdown && !wrapper.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});

function submitHandover() {
  const name = document.getElementById('modal-handover-selected-name').value;
  const email = document.getElementById('modal-handover-selected-email').value;
  const code = document.getElementById('modal-handover-selected-code').value;
  const dept = document.getElementById('modal-handover-selected-dept').value || 'Kinh doanh';

  if (!name || !email) {
    alert('Vui lòng chọn nhân viên tiếp nhận từ danh sách gợi ý!');
    return;
  }

  const acc = gTargetHandoverAccount;
  if (!acc) {
    alert('Không tìm thấy thông tin tài khoản cần bàn giao!');
    return;
  }

  const oldName = acc.ownerName;
  const oldEmail = acc.ownerEmail;

  acc.ownerName = name;
  acc.displayName = name;
  acc.username = email.split('@')[0];
  acc.ownerEmail = email;
  acc.empCode = code;
  acc.empDept = dept;
  acc.assignedDate = new Date().toLocaleDateString('vi-VN');
  acc.history.unshift({
    from: `${oldName} (${oldEmail})`,
    to: `${name} (${email})`,
    date: new Date().toLocaleString('vi-VN'),
    by: AppState.currentRole === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin chi nhánh'
  });

  addAuditLog('Bàn giao tài khoản', acc.id, `Bàn giao từ ${oldName} sang ${name} (${email}) tại ${acc.branch}, giữ nguyên dữ liệu và Account ID`);

  closeModal('modal-handover');
  openDrawer(acc.id);
  renderAccounts();
  alert(`Bàn giao thành công tài khoản ${acc.id} cho nhân sự ${name} (${email}) thuộc ${acc.branch}!`);
}

// 3. Lock & Unlock
function openLockModal(accountId, isLocking) {
  const acc = AppState.accounts.find(a => a.id === accountId);
  if (!acc) return;

  document.getElementById('modal-lock-acc-id').innerText = acc.id;
  document.getElementById('modal-lock-action-title').innerText = isLocking ? 'Xác nhận tạm khóa tài khoản' : 'Xác nhận mở khóa tài khoản';
  document.getElementById('modal-lock-desc').innerText = isLocking 
    ? `Tạm khóa tài khoản ${acc.id} (${acc.ownerName}). Quota của chi nhánh và thông tin người dùng vẫn được bảo lưu.`
    : `Mở khóa tài khoản ${acc.id} (${acc.ownerName}). Tài khoản sẽ chuyển lại trạng thái Đang hoạt động bình thường.`;

  document.getElementById('modal-lock-btn').innerText = isLocking ? 'Xác nhận tạm khóa' : 'Xác nhận mở khóa';
  document.getElementById('modal-lock-btn').className = isLocking 
    ? 'px-3 py-1.5 rounded text-white bg-amber-600 hover:bg-amber-700 text-xs font-semibold cursor-pointer'
    : 'px-3 py-1.5 rounded text-white bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold cursor-pointer';

  document.getElementById('modal-lock-btn').onclick = () => {
    if (isLocking) {
      acc.status = 'LOCKED';
      addAuditLog('Tạm khóa', acc.id, `Tạm khóa tài khoản của ${acc.ownerName}, giữ quota đơn vị`);
    } else {
      acc.status = 'ACTIVE';
      addAuditLog('Mở khóa', acc.id, `Mở khóa tài khoản, khôi phục trạng thái Đang hoạt động`);
    }

    closeModal('modal-lock');
    openDrawer(acc.id);
    renderAccounts();
    renderOverview();
  };

  document.getElementById('modal-lock').classList.remove('hidden');
}

// 4. Reclaim Account
function openReclaimModal(accountId) {
  const acc = AppState.accounts.find(a => a.id === accountId);
  if (!acc) return;

  document.getElementById('modal-reclaim-acc-id').innerText = acc.id;
  document.getElementById('modal-reclaim-desc').innerHTML = `
    Thu hồi tài khoản <strong>${acc.id}</strong> (đang gán cho <strong>${acc.ownerName}</strong>, thuộc <strong>${acc.branch}</strong>).<br><br>
    <ul class="list-disc pl-4 space-y-1 text-slate-600">
      <li>Quyền truy cập của nhân viên hiện tại bị vô hiệu hóa ngay lập tức.</li>
      <li>Quota của ${acc.branch} giảm đi 1.</li>
      <li>Tài khoản trả về Kho trung tâm (Chưa phân bổ), quota Kho trung tâm tăng 1.</li>
      <li>Toàn bộ danh bạ và dữ liệu lịch sử của Account ID được giữ nguyên.</li>
    </ul>
  `;

  document.getElementById('modal-reclaim').classList.remove('hidden');
}

function submitReclaim() {
  const accId = document.getElementById('modal-reclaim-acc-id').innerText;
  const acc = AppState.accounts.find(a => a.id === accId);
  if (acc) {
    const oldBranch = acc.branch;
    const oldOwner = acc.ownerName;

    // Save former employee details for audit trace & drawer display (CR-001)
    acc.formerOwner = {
      name: oldOwner,
      email: acc.ownerEmail,
      code: acc.empCode,
      dept: acc.empDept,
      branch: oldBranch,
      phone: acc.empPhone,
      reclaimedDate: '28/09/2026 11:30',
      reclaimedBy: AppState.currentRole === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin chi nhánh'
    };

    acc.ownerName = null;
    acc.displayName = null;
    acc.ownerEmail = null;
    acc.empCode = null;
    acc.empDept = null;
    acc.empPhone = null;
    acc.empStatus = null;
    acc.branch = 'Kho trung tâm';
    acc.region = 'Toàn quốc';
    acc.status = 'UNASSIGNED';
    acc.attention = null;
    acc.assignedDate = null;
    acc.isReclaimed = true; // Pin to top with badge "Đã thu hồi" (CR-001)

    acc.history.unshift({
      from: oldOwner,
      to: 'Kho trung tâm (Thu hồi)',
      date: '28/09/2026 10:30',
      by: AppState.currentRole === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin chi nhánh'
    });

    addAuditLog('Thu hồi', acc.id, `Thu hồi từ ${oldOwner} (${oldBranch}) về Kho trung tâm, quota ${oldBranch} giảm 1`);
    recalculateRegionCounts();
  }

  closeModal('modal-reclaim');
  openDrawer(accId);
  renderAccounts();
  renderOverview();
}

// 5. Reset Password / Resend Activation Link (CR-001)
function openResetPasswordModal(accountId) {
  const acc = AppState.accounts.find(a => a.id === accountId);
  if (!acc) return;

  document.getElementById('modal-reset-acc-id').innerText = acc.id;
  document.getElementById('modal-reset-email').innerText = acc.ownerEmail || 'Email chưa cấu hình';
  document.getElementById('modal-reset-pwd').classList.remove('hidden');
}

function submitResetPassword() {
  const accId = document.getElementById('modal-reset-acc-id').innerText;
  const acc = AppState.accounts.find(a => a.id === accountId || a.id === accId);

  if (acc) {
    const isPending = acc.status === 'PENDING';
    const logAction = isPending ? 'Gửi lại kích hoạt' : 'Reset mật khẩu';
    const logDetail = isPending 
      ? `Gửi lại link kích hoạt tài khoản Zalo Cloud cho nhân viên ${acc.ownerName} (${acc.ownerEmail}) với hạn timeout 3 ngày`
      : `Reset thông tin đăng nhập và gửi thông tin cấp lại tới ${acc.ownerEmail}`;

    addAuditLog(logAction, acc.id, logDetail);
    alert(isPending 
      ? `Đã gửi lại link kích hoạt tài khoản cho ${acc.ownerName} qua email ${acc.ownerEmail}!`
      : `Đã gửi thông tin cấp lại mật khẩu cho tài khoản ${accId} qua email doanh nghiệp.`
    );
  }

  closeModal('modal-reset-pwd');
  openDrawer(accId);
}

// 5b. Tùy chỉnh Tên hiển thị Profile (CR-001)
function openEditProfileModal() {
  const acc = AppState.activeDrawerAccount;
  if (!acc || !acc.ownerName) return;

  document.getElementById('modal-edit-acc-id').value = acc.id;
  document.getElementById('modal-edit-owner-name').value = acc.ownerName;
  document.getElementById('modal-edit-owner-email').value = acc.ownerEmail;
  document.getElementById('modal-edit-display-name').value = acc.displayName || acc.ownerName;

  document.getElementById('modal-edit-profile').classList.remove('hidden');
}

function submitEditProfile() {
  const acc = AppState.activeDrawerAccount;
  if (!acc) return;

  const newDisplayName = document.getElementById('modal-edit-display-name').value.trim();
  if (!newDisplayName) {
    alert('Vui lòng nhập Tên hiển thị Zalo (Biệt danh CSKH).');
    return;
  }

  const oldDisplayName = acc.displayName || acc.ownerName;
  acc.displayName = newDisplayName;

  addAuditLog('Tùy chỉnh Profile', acc.id, `Nhân viên ${acc.ownerName} cập nhật Tên hiển thị Zalo từ "${oldDisplayName}" thành "${newDisplayName}"`);

  document.getElementById('dw-display-name').innerText = newDisplayName;

  closeModal('modal-edit-profile');
  alert(`Cập nhật Tên hiển thị cho tài khoản ${acc.id} thành công!`);
  renderAccounts();
  openDrawer(acc.id);
}

// 6. Quota Tree Overview (Clean visual display, all modifications via Modal Điều chỉnh Quota)
function renderQuotas() {
  const metrics = getMetrics();

  // 1. Top 5 Quota KPIs
  const elCentral = document.getElementById('quota-central-available');
  if (elCentral) elCentral.innerText = metrics.centralPool;
  const elAllocated = document.getElementById('quota-total-allocated');
  if (elAllocated) elAllocated.innerText = metrics.allocated;
  const elInUse = document.getElementById('quota-in-use-count');
  if (elInUse) elInUse.innerText = metrics.assigned;
  const elRate = document.getElementById('quota-in-use-rate');
  if (elRate) {
    const rateVal = metrics.allocated > 0 ? ((metrics.assigned / metrics.allocated) * 100).toFixed(1) : 0;
    elRate.innerText = `Lấp đầy ${rateVal}% đã phân vùng`;
  }
  const elBranchUnassigned = document.getElementById('quota-branch-unassigned');
  if (elBranchUnassigned) elBranchUnassigned.innerText = metrics.unassignedInBranch;

  // 2. Render 100% Stacked Regional Distribution Bar (7 Vùng + Kho trung tâm)
  const distBar = document.getElementById('regional-distribution-bar');
  const distLegend = document.getElementById('regional-distribution-legend');

  if (distBar && distLegend) {
    distBar.innerHTML = '';
    distLegend.innerHTML = '';

    const REGION_COLORS = [
      { bg: 'bg-blue-600', dot: 'bg-blue-600', text: 'text-blue-700' },
      { bg: 'bg-teal-600', dot: 'bg-teal-600', text: 'text-teal-700' },
      { bg: 'bg-cyan-600', dot: 'bg-cyan-600', text: 'text-cyan-700' },
      { bg: 'bg-indigo-600', dot: 'bg-indigo-600', text: 'text-indigo-700' },
      { bg: 'bg-emerald-600', dot: 'bg-emerald-600', text: 'text-emerald-700' },
      { bg: 'bg-amber-600', dot: 'bg-amber-600', text: 'text-amber-700' },
      { bg: 'bg-orange-600', dot: 'bg-orange-600', text: 'text-orange-700' }
    ];

    AppState.regions.forEach((reg, idx) => {
      const regAccounts = AppState.accounts.filter(a => a.region === reg.name);
      const regQuota = regAccounts.length;
      const pct = (regQuota / 100) * 100;
      const color = REGION_COLORS[idx % REGION_COLORS.length];

      // Segment in bar — flex-shrink-0 prevents CSS from squishing segments
      if (pct > 0) {
        const seg = document.createElement('div');
        seg.className = `h-full ${color.bg} transition-all duration-300 relative group flex items-center justify-center text-[10px] font-bold text-white overflow-hidden flex-shrink-0`;
        seg.style.width = `${pct}%`;
        seg.title = `${reg.name}: ${regQuota} Quota (${pct}%)`;
        if (pct >= 8) {
          seg.innerHTML = `<span class="truncate px-1">${reg.name.split(' - ')[0]} (${regQuota})</span>`;
        }
        distBar.appendChild(seg);
      }

      // Legend chip — larger dots, more padding
      const chip = document.createElement('div');
      chip.className = 'inline-flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container-low border border-outline-variant/40 text-[11px] font-medium';
      chip.innerHTML = `
        <span class="w-3 h-3 rounded-full ${color.dot} shrink-0"></span>
        <span class="text-on-surface">${reg.name}:</span>
        <strong class="${color.text} font-mono">${regQuota}</strong>
        <span class="text-slate-400 text-[10px]">(${pct}%)</span>
      `;
      distLegend.appendChild(chip);
    });

    // Central Pool Segment — appended LAST so it is always rightmost
    const centralCount = metrics.centralPool;
    const centralPct = (centralCount / 100) * 100;
    if (centralPct > 0) {
      const centralSeg = document.createElement('div');
      centralSeg.className = 'h-full bg-slate-400 transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden flex-shrink-0';
      centralSeg.style.width = `${centralPct}%`;
      centralSeg.title = `Kho trung tâm: ${centralCount} Quota (${centralPct}%)`;
      if (centralPct >= 10) {
        centralSeg.innerHTML = `<span class="truncate px-1">Kho trung tâm (${centralCount})</span>`;
      }
      distBar.appendChild(centralSeg);

      const centralChip = document.createElement('div');
      centralChip.className = 'inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 border border-slate-300 text-[11px] font-medium';
      centralChip.innerHTML = `
        <span class="w-3 h-3 rounded-full bg-slate-500 shrink-0"></span>
        <span class="text-slate-800">Kho trung tâm:</span>
        <strong class="text-slate-700 font-mono">${centralCount}</strong>
        <span class="text-slate-500 text-[10px]">(${centralPct}%)</span>
      `;
      distLegend.appendChild(centralChip);
    }
  }

  // 3. Render 7 Regional Cards in Quota Tree Container
  const quotaContainer = document.getElementById('quota-tree-container');
  if (!quotaContainer) return;
  quotaContainer.innerHTML = '';

    AppState.regions.forEach(region => {
    const regAccounts = AppState.accounts.filter(a => a.region === region.name);
    const regQuota = regAccounts.length;
    const regActive = regAccounts.filter(a => a.status === 'ACTIVE').length;
    const regPendingLocked = regAccounts.filter(a => a.status === 'PENDING' || a.status === 'LOCKED').length;
    const regUnassigned = regAccounts.filter(a => a.ownerName === null || a.status === 'UNASSIGNED').length;
    const regUtil = regQuota > 0 ? Math.round((regActive / regQuota) * 100) : 0;

    // ── OBJECTIVE RISK BADGE (Dữ kiện khách quan theo chỉ đạo) ──
    let riskBadge = '';
    if (regUnassigned === 0) {
      riskBadge = '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-red-50 text-red-700 border border-red-300"><span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>Đã hết quota</span>';
    } else if (regUnassigned === 1) {
      riskBadge = '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Sắp hết quota (còn 1)</span>';
    } else {
      riskBadge = `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Còn quota dự phòng (còn ${regUnassigned})</span>`;
    }

    const card = document.createElement('div');
    card.className = 'bg-surface-container-lowest border border-outline-variant/60 rounded-xl overflow-hidden shadow-xs mb-3';

    // Compute branch stats (Objective data, no fabricated recommendation tags)
    const branchStats = region.branches.map(b => {
      const bAccounts = AppState.accounts.filter(a => a.branch === b.name);
      const bQuota = bAccounts.length;
      const bActive = bAccounts.filter(a => a.status === 'ACTIVE').length;
      const bPendingLocked = bAccounts.filter(a => a.status === 'PENDING' || a.status === 'LOCKED').length;
      const bUnassigned = bAccounts.filter(a => a.ownerName === null || a.status === 'UNASSIGNED').length;
      const bUtil = bQuota > 0 ? Math.round((bActive / bQuota) * 100) : 0;
      return { name: b.name, bQuota, bActive, bPendingLocked, bUnassigned, bUtil };
    });

    let branchesRows = '';
    branchStats.forEach(bs => {
      branchesRows += `
        <tr class="hover:bg-slate-50/80 border-b border-outline-variant/20 transition-colors group">
          <td class="py-2 px-4 font-medium text-on-surface">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-slate-400 text-[16px]">subdirectory_arrow_right</span>
              <span>${bs.name}</span>
            </div>
          </td>
          <td class="py-2 px-3 text-center font-bold text-primary font-mono">${bs.bQuota}</td>
          <td class="py-2 px-3 text-center font-semibold text-emerald-700 font-mono">${bs.bActive}</td>
          <td class="py-2 px-3 text-center font-medium text-amber-700 font-mono">${bs.bPendingLocked}</td>
          <td class="py-2 px-3 text-center font-medium ${bs.bUnassigned > 0 ? 'text-sky-700 font-bold' : 'text-slate-400'} font-mono">${bs.bUnassigned}</td>
          <td class="py-2 px-4">
            <div class="flex items-center gap-2 max-w-[150px] mx-auto">
              <div class="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
                <div class="h-full bg-emerald-500 rounded-full" style="width: ${bs.bUtil}%;"></div>
              </div>
              <span class="text-[11px] font-bold text-slate-600 font-mono w-9 text-right">${bs.bUtil}%</span>
            </div>
          </td>
          <td class="py-2 px-3 text-right">
            <button onclick="jumpToBranchAccounts('${region.name}', '${bs.name}')" class="text-slate-400 hover:text-primary hover:bg-primary/10 w-7 h-7 rounded inline-flex items-center justify-center transition-colors tooltip-trigger" title="Xem danh sách tài khoản">
              <span class="material-symbols-outlined text-[16px]">person_search</span>
            </button>
          </td>
        </tr>
      `;
    });

    // Percentages for Split Bar
    const activePct = regQuota > 0 ? (regActive / regQuota) * 100 : 0;
    const pendingLockedPct = regQuota > 0 ? (regPendingLocked / regQuota) * 100 : 0;
    const unassignedPct = regQuota > 0 ? (regUnassigned / regQuota) * 100 : 0;

    card.innerHTML = `
      <!-- Compact Enterprise Region Row -->
      <div class="py-2.5 px-4 bg-surface-container-low flex items-center justify-between gap-4 hover:bg-surface-container transition-colors select-none">

        <!-- Col 1: Fixed 310px width (Region Name, Risk Badge, Branch Count) -->
        <div class="w-[310px] shrink-0 cursor-pointer flex items-center gap-2.5" onclick="toggleRegionBranches('${region.id}')">
          <span class="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[20px]">location_city</span>
          </span>
          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <strong class="text-on-surface text-sm font-bold truncate">${region.name}</strong>
              ${riskBadge}
            </div>
            <div class="text-[11px] text-slate-500 font-mono mt-0.5">
              ${region.branches.length} chi nhánh trực thuộc
            </div>
          </div>
        </div>

        <!-- Col 2: Fixed Semantic Split Bar (Đang dùng: Emerald, Chờ/Khóa: Amber, Khả dụng: Sky) -->
        <div class="flex-1 max-w-md px-3 hidden md:flex flex-col gap-1 cursor-pointer justify-center" onclick="toggleRegionBranches('${region.id}')">
          <!-- 3-Segment Semantic Split Bar -->
          <div class="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden flex shadow-inner">
            <div class="h-full bg-emerald-500 transition-all duration-300" style="width: ${activePct}%;" title="Đang dùng: ${regActive}"></div>
            <div class="h-full bg-amber-400 transition-all duration-300" style="width: ${pendingLockedPct}%;" title="Chờ KH / Tạm khóa: ${regPendingLocked}"></div>
            <div class="h-full bg-sky-400 transition-all duration-300" style="width: ${unassignedPct}%;" title="Khả dụng chi nhánh: ${regUnassigned}"></div>
          </div>
          <!-- Clean Metric Legend Under Bar -->
          <div class="flex items-center justify-between text-[11px] font-mono">
            <div class="flex items-center gap-2 text-slate-600">
              <span class="text-emerald-700 font-semibold">${regActive} Đang dùng</span>
              <span class="text-slate-300">|</span>
              <span class="text-amber-700 font-semibold">${regPendingLocked} Chờ/Khóa</span>
              <span class="text-slate-300">|</span>
              <span class="text-sky-700 font-semibold">${regUnassigned} Khả dụng</span>
            </div>
            <span class="text-slate-600 font-semibold text-[10px]"><strong>${regUtil}%</strong> đã khai thác</span>
          </div>
        </div>

        <!-- Col 3: Fixed 200px width (Total Quota & Branch Actions) -->
        <div class="w-[200px] shrink-0 flex items-center justify-end gap-2.5">
          <div class="text-right font-mono mr-1">
            <div class="text-xs font-bold text-primary">${regQuota} Quota</div>
          </div>
          <button class="h-7 px-2.5 rounded-lg border border-outline-variant/60 text-slate-600 bg-surface-container-low hover:bg-surface-container-high text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-all active:scale-95"
            onclick="toggleRegionBranches('${region.id}')" title="Xem/ẩn chi nhánh">
            <span class="material-symbols-outlined text-[14px]">table_rows</span>
            Chi nhánh
            <span id="branch-arrow-${region.id}" class="material-symbols-outlined text-[15px] text-slate-400 transition-transform duration-200">expand_more</span>
          </button>
        </div>
      </div>

      <!-- Expandable Branch Table -->
      <div id="branch-list-${region.id}" class="overflow-x-auto hidden">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="bg-surface-container-lowest text-[11px] font-bold text-slate-500 border-t border-b border-outline-variant/40">
              <th class="py-2 px-4">Chi nhánh</th>
              <th class="py-2 px-3 text-center">Quota cấp</th>
              <th class="py-2 px-3 text-center">Đang dùng</th>
              <th class="py-2 px-3 text-center">Chờ/Khóa</th>
              <th class="py-2 px-3 text-center">Khả dụng</th>
              <th class="py-2 px-4 text-center">Tỷ lệ khai thác</th>
              <th class="py-2 px-3"></th>
            </tr>
          </thead>
          <tbody>
            ${branchesRows}
          </tbody>
        </table>
      </div>
    `;

    quotaContainer.appendChild(card);
  });
}

// -----------------------------------------------------------------
// UNIFIED QUOTA MANAGEMENT MODAL (CR-001 - Super Admin Only)
// -----------------------------------------------------------------
function openQuotaManageModal(selectedRegion) {
  // If not explicitly provided, smart-fallback: check if account table is filtered by region
  if (!selectedRegion) {
    selectedRegion = (AppState.accountFilters && AppState.accountFilters.region !== 'all')
      ? AppState.accountFilters.region
      : 'all';
  }

  const metrics = getMetrics();
  const centralEl = document.getElementById('qm-central-available');
  if (centralEl) centralEl.innerText = metrics.centralPool;
  const allocEl = document.getElementById('qm-total-allocated');
  if (allocEl) allocEl.innerText = metrics.allocated;

  const regFilter = document.getElementById('qm-region-filter');
  if (regFilter) regFilter.value = selectedRegion;

  // filterQuotaManageTable automatically scopes both table and add-branch dropdown
  filterQuotaManageTable(selectedRegion);

  const modal = document.getElementById('modal-quota-manage');
  if (modal) modal.classList.remove('hidden');
}

function filterQuotaManageTable(regionFilter) {
  const tbody = document.getElementById('qm-branches-tbody');
  tbody.innerHTML = '';

  const metrics = getMetrics();
  let branchesToShow = [];

  AppState.regions.forEach(r => {
    if (regionFilter === 'all' || r.name === regionFilter) {
      r.branches.forEach(b => {
        const bAccounts = AppState.accounts.filter(a => a.branch === b.name);
        const bQuota = bAccounts.length;
        const bAssigned = bAccounts.filter(a => a.ownerName !== null).length;
        const bUnassigned = bQuota - bAssigned;

        branchesToShow.push({
          branchName: b.name,
          regionName: r.name,
          quota: bQuota,
          assigned: bAssigned,
          unassigned: bUnassigned
        });
      });
    }
  });

  // Always synchronize the add-branch dropdown with current region filter
  populateAddBranchDropdown(regionFilter);

  // Update Section Title dynamically
  const titleEl = document.getElementById('qm-add-branch-title');
  if (titleEl) {
    titleEl.innerHTML = regionFilter !== 'all'
      ? `<span class="material-symbols-outlined text-[16px]">add_circle</span> Cấp Quota cho Chi nhánh mới thuộc <strong>${regionFilter}</strong>:`
      : `<span class="material-symbols-outlined text-[16px]">add_circle</span> Cấp Quota cho Chi nhánh mới (Toàn quốc):`;
  }

  if (branchesToShow.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="py-6 text-center text-slate-400 italic">Không có chi nhánh phù hợp</td></tr>`;
    return;
  }

  branchesToShow.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/80 transition-colors';

    const canReclaim = item.unassigned > 0;
    const canAllocate = metrics.centralPool > 0;

    tr.innerHTML = `
      <td class="py-2.5 px-3 font-semibold text-on-surface">${item.branchName}</td>
      <td class="py-2.5 px-3 text-slate-500">${item.regionName}</td>
      <td class="py-2.5 px-3 text-center font-bold text-primary">${item.quota}</td>
      <td class="py-2.5 px-3 text-center text-amber-700 font-semibold">${item.unassigned}</td>
      <td class="py-2.5 px-3 text-center">
        <div class="inline-flex items-center gap-1 justify-center">
          <input type="number" id="adjust-input-${item.branchName.replace(/\s+/g, '-')}" class="w-14 text-xs border border-outline-variant rounded p-1 text-center font-medium" placeholder="SL..." min="1" max="999">
          <button class="px-2 py-1 rounded text-[11px] font-semibold border flex items-center gap-0.5 transition-all ${canReclaim ? 'border-red-300 text-red-700 hover:bg-red-50 cursor-pointer active:scale-95' : 'border-slate-200 text-slate-300 cursor-not-allowed opacity-50'}" ${!canReclaim ? 'disabled title="Không có quota nhàn rỗi để thu hồi"' : ''} onclick="bulkReclaimBranchQuota('${item.branchName}')">
            Thu hồi
          </button>
          <button class="px-2 py-1 rounded text-[11px] font-semibold border flex items-center gap-0.5 transition-all ${canAllocate ? 'border-emerald-300 text-emerald-700 hover:bg-emerald-50 cursor-pointer active:scale-95' : 'border-slate-200 text-slate-300 cursor-not-allowed opacity-50'}" ${!canAllocate ? 'disabled title="Kho trung tâm đã hết quota khả dụng"' : ''} onclick="bulkAllocateBranchQuota('${item.branchName}')">
            Cấp thêm
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function populateAddBranchDropdown(selectedRegion = 'all') {
  const addSel = document.getElementById('qm-add-branch-select');
  if (!addSel) return;
  addSel.innerHTML = '';

  // Lấy danh sách các chi nhánh hiện đã có tài khoản (quota > 0)
  const activeBranchNames = new Set(
    AppState.accounts.filter(a => a.branch !== 'Kho trung tâm').map(a => a.branch)
  );

  // CHỈ nạp các chi nhánh chưa có quota nào (quota === 0)
  let zeroQuotaBranches = AppState.expansionBranches.filter(b => !activeBranchNames.has(b.name));
  if (selectedRegion && selectedRegion !== 'all') {
    zeroQuotaBranches = zeroQuotaBranches.filter(b => b.region === selectedRegion);
  }

  if (zeroQuotaBranches.length === 0) {
    const msg = selectedRegion && selectedRegion !== 'all'
      ? `-- Không còn chi nhánh chưa có Quota thuộc ${selectedRegion} --`
      : '-- Tất cả chi nhánh đều đã có Quota --';
    addSel.innerHTML = `<option value="">${msg}</option>`;
    return;
  }

  // Khi chọn 'all': Nhóm chi nhánh theo từng Vùng qua <optgroup> để rõ ràng
  if (!selectedRegion || selectedRegion === 'all') {
    const grouped = {};
    zeroQuotaBranches.forEach(b => {
      if (!grouped[b.region]) grouped[b.region] = [];
      grouped[b.region].push(b);
    });
    Object.keys(grouped).forEach(regName => {
      const optgroup = document.createElement('optgroup');
      optgroup.label = `── ${regName} ──`;
      grouped[regName].forEach(b => {
        const opt = document.createElement('option');
        opt.value = b.name;
        opt.setAttribute('data-region', b.region);
        opt.innerText = `${b.name} - Chưa có quota (0)`;
        optgroup.appendChild(opt);
      });
      addSel.appendChild(optgroup);
    });
  } else {
    // Khi chọn 1 vùng cụ thể: chỉ hiện danh sách chi nhánh của vùng đó
    zeroQuotaBranches.forEach(b => {
      addSel.innerHTML += `<option value="${b.name}" data-region="${b.region}">${b.name} - Chưa có quota (0)</option>`;
    });
  }
}

function quickAllocateBranchQuota(branchName) {
  const metrics = getMetrics();
  if (metrics.centralPool <= 0) {
    alert('Kho trung tâm đã hết hạn ngạch (0 quota khả dụng)! Không thể cấp thêm.');
    return;
  }

  // Find 1 unassigned account in Kho trung tâm
  const acc = AppState.accounts.find(a => a.branch === 'Kho trung tâm' && a.ownerName === null);
  if (!acc) return;

  const reg = AppState.regions.find(r => r.branches.some(b => b.name === branchName));
  acc.branch = branchName;
  acc.region = reg ? reg.name : 'Vùng 1 - Hà Nội';

  addAuditLog('Cấp Quota', branchName, `Cấp thêm 1 quota từ Kho trung tâm cho ${branchName}`);
  recalculateRegionCounts();

  // Refresh UI
  const curRegFilter = document.getElementById('qm-region-filter').value;
  filterQuotaManageTable(curRegFilter);
  populateAddBranchDropdown();
  document.getElementById('qm-central-available').innerText = getMetrics().centralPool;
  document.getElementById('qm-total-allocated').innerText = getMetrics().allocated;
  renderQuotas();
  renderOverview();
  renderAccounts();
}

function quickReclaimBranchQuota(branchName) {
  // Find 1 unassigned account in this branch
  const acc = AppState.accounts.find(a => a.branch === branchName && a.ownerName === null);
  if (!acc) {
    alert(`Chi nhánh ${branchName} không còn tài khoản chưa gán nào để thu hồi! Để thu hồi tài khoản đang có người dùng, vui lòng thực hiện từ danh sách Quản trị tài khoản.`);
    return;
  }

  acc.branch = 'Kho trung tâm';
  acc.region = 'Toàn quốc';
  acc.isReclaimed = true;

  addAuditLog('Thu hồi Quota', branchName, `Thu hồi 1 quota chưa gán của ${branchName} về Kho trung tâm`);
  recalculateRegionCounts();

  // Refresh UI
  const curRegFilter = document.getElementById('qm-region-filter').value;
  filterQuotaManageTable(curRegFilter);
  populateAddBranchDropdown();
  document.getElementById('qm-central-available').innerText = getMetrics().centralPool;
  document.getElementById('qm-total-allocated').innerText = getMetrics().allocated;
  renderQuotas();
  renderOverview();
  renderAccounts();
}

function addNewBranchQuota() {
  const addSel = document.getElementById('qm-add-branch-select');
  const branchName = addSel.value;
  const count = parseInt(document.getElementById('qm-add-branch-amount').value, 10);
  const metrics = getMetrics();

  if (!branchName) {
    alert('Vui lòng chọn chi nhánh cần cấp quota!');
    return;
  }

  if (isNaN(count) || count <= 0) {
    alert('Vui lòng nhập số lượng quota hợp lệ (tối thiểu 1)!');
    return;
  }

  if (count > metrics.centralPool) {
    alert(`Kho trung tâm chỉ còn ${metrics.centralPool} quota khả dụng! Không thể cấp vượt quá.`);
    return;
  }

  // Xác định Vùng của chi nhánh này
  let regName = 'Vùng 1 - Hà Nội';
  const expBranch = AppState.expansionBranches.find(b => b.name === branchName);
  if (expBranch) {
    regName = expBranch.region;
  } else {
    const r = AppState.regions.find(r => r.branches.some(b => b.name === branchName));
    if (r) regName = r.name;
  }

  // Đảm bảo chi nhánh có mặt trong AppState.regions
  const targetRegion = AppState.regions.find(r => r.name === regName);
  if (targetRegion) {
    let targetBranch = targetRegion.branches.find(b => b.name === branchName);
    if (!targetBranch) {
      targetBranch = {
        id: `B${targetRegion.id.replace('V', '')}${String(targetRegion.branches.length + 1).padStart(2, '0')}`,
        name: branchName,
        quota: count,
        assigned: 0,
        unassigned: count
      };
      targetRegion.branches.push(targetBranch);
    }
  }

  const poolAccounts = AppState.accounts.filter(a => a.branch === 'Kho trung tâm').slice(0, count);

  poolAccounts.forEach(acc => {
    acc.branch = branchName;
    acc.region = regName;
    acc.isReclaimed = false;
  });

  addAuditLog('Cấp Quota Mới', branchName, `Cấp mới ${count} quota từ Kho trung tâm cho ${branchName} (${regName})`);
  recalculateRegionCounts();

  // Refresh
  const curRegFilter = document.getElementById('qm-region-filter').value;
  filterQuotaManageTable(curRegFilter);
  populateAddBranchDropdown();
  document.getElementById('qm-central-available').innerText = getMetrics().centralPool;
  document.getElementById('qm-total-allocated').innerText = getMetrics().allocated;
  renderQuotas();
  renderOverview();
  renderAccounts();
}

// ─────────────────────────────────────────────────────────────────────────────
// ── Missing Functions for Quota and Audit Views ──

function toggleRegionBranches(regionId) {
  const list = document.getElementById(`branch-list-${regionId}`);
  const arrow = document.getElementById(`branch-arrow-${regionId}`);
  if (list && arrow) {
    if (list.classList.contains('hidden')) {
      list.classList.remove('hidden');
      arrow.classList.add('rotate-180');
    } else {
      list.classList.add('hidden');
      arrow.classList.remove('rotate-180');
    }
  }
}

function jumpToBranchAccounts(regionName, branchName) {
  // Update filters in state
  AppState.accountFilters.region = regionName;
  AppState.accountFilters.branch = branchName;
  AppState.accountFilters.status = 'all';
  
  // Update UI Selectors in Account Tab
  const regionSel = document.getElementById('acc-filter-region');
  const branchSel = document.getElementById('acc-filter-branch');
  
  if (regionSel) {
    regionSel.value = regionName;
    // Dispatch change to populate branch options
    regionSel.dispatchEvent(new Event('change'));
  }
  
  if (branchSel) {
    branchSel.value = branchName;
  }
  
  // Switch to Accounts view
  switchView('accounts');
}

function renderAudit() {
  const tbody = document.getElementById('audit-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  // Sort logs by time desc
  const sortedLogs = [...AppState.auditLogs].sort((a, b) => new Date(b.time) - new Date(a.time));

  if (sortedLogs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="py-4 text-center text-slate-400 italic">Chưa có nhật ký hoạt động nào.</td></tr>`;
    return;
  }

  sortedLogs.forEach(log => {
    let actionStyle = 'text-slate-700 bg-slate-100';
    if (log.action.includes('Gán') || log.action.includes('Mở') || log.action.includes('Cấp')) actionStyle = 'text-emerald-700 bg-emerald-100';
    else if (log.action.includes('Khóa') || log.action.includes('Thu hồi')) actionStyle = 'text-amber-700 bg-amber-100';
    else if (log.action.includes('Bàn giao')) actionStyle = 'text-sky-700 bg-sky-100';
    
    tbody.innerHTML += `
      <tr class="border-b border-outline-variant/30 text-xs text-on-surface hover:bg-slate-50 transition-colors">
        <td class="py-2.5 px-3 font-mono text-slate-500 whitespace-nowrap">${log.time}</td>
        <td class="py-2.5 px-3 font-medium">${log.actor}</td>
        <td class="py-2.5 px-3">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${actionStyle}">${log.action}</span>
        </td>
        <td class="py-2.5 px-3 font-mono text-primary font-medium">${log.target}</td>
        <td class="py-2.5 px-3 text-slate-600 max-w-md truncate" title="${log.detail}">${log.detail}</td>
      </tr>
    `;
  });
}

// APP INITIALIZATION & DEFAULT LANDING (CR-001)
// ─────────────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initAccountsData();
  recalculateRegionCounts();

  // Search input: press Enter to apply filters
  const searchInput = document.getElementById('acc-search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        applyAccountFilters();
      }
    });
  }

  // Region filter: populate dependent branch dropdown only (requires clicking "Áp dụng" to filter table)
  const regionSel = document.getElementById('acc-filter-region');
  if (regionSel) {
    regionSel.addEventListener('change', (e) => {
      const branchSel = document.getElementById('acc-filter-branch');
      if (branchSel) {
        branchSel.innerHTML = '<option value="all">Tất cả chi nhánh</option>';
        if (e.target.value !== 'all') {
          const reg = AppState.regions.find(r => r.name === e.target.value);
          if (reg) {
            reg.branches.forEach(b => {
              branchSel.innerHTML += `<option value="${b.name}">${b.name}</option>`;
            });
          }
        }
      }
    });
  }

  // Tab buttons click listeners
  document.querySelectorAll('.acc-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      AppState.accountFilters.status = btn.getAttribute('data-filter');
      renderAccounts();
    });
  });

  // CR-001: Default landing page is Account Management ('accounts')
  switchView('accounts');
});



// Bulk adjustments from modal
function bulkReclaimBranchQuota(branchName) {
  const inputEl = document.getElementById('adjust-input-' + branchName.replace(/\s+/g, '-'));
  if (!inputEl || !inputEl.value) {
    alert('Vui lòng nhập số lượng cần thu hồi');
    return;
  }
  const amount = parseInt(inputEl.value, 10);
  if (isNaN(amount) || amount <= 0) {
    alert('Số lượng không hợp lệ');
    return;
  }
  
  const bAccounts = AppState.accounts.filter(a => a.branch === branchName);
  const bQuota = bAccounts.length;
  const bAssigned = bAccounts.filter(a => a.ownerName !== null).length;
  const bUnassigned = bQuota - bAssigned;
  
  if (amount > bUnassigned) {
    alert(`Không thể thu hồi ${amount}. Quota nhàn rỗi chỉ còn ${bUnassigned}.`);
    return;
  }

  let reclaimed = 0;
  for (let i = AppState.accounts.length - 1; i >= 0 && reclaimed < amount; i--) {
    const acc = AppState.accounts[i];
    if (acc.branch === branchName && acc.ownerName === null) {
      acc.branch = null;
      acc.region = null;
      reclaimed++;
    }
  }

  inputEl.value = '';
  const regFilter = document.getElementById('qm-region-filter').value;
  filterQuotaManageTable(regFilter);
  renderQuotas();
  renderAccounts();
  updateTopLeftNavigation();
}

function bulkAllocateBranchQuota(branchName) {
  const inputEl = document.getElementById('adjust-input-' + branchName.replace(/\s+/g, '-'));
  if (!inputEl || !inputEl.value) {
    alert('Vui lòng nhập số lượng cần cấp thêm');
    return;
  }
  const amount = parseInt(inputEl.value, 10);
  if (isNaN(amount) || amount <= 0) {
    alert('Số lượng không hợp lệ');
    return;
  }

  const metrics = getMetrics();
  if (amount > metrics.centralPool) {
    alert(`Không thể cấp thêm ${amount}. Kho trung tâm chỉ còn ${metrics.centralPool}.`);
    return;
  }

  let regionName = null;
  for (const r of AppState.regions) {
    if (r.branches.some(b => b.name === branchName)) {
      regionName = r.name;
      break;
    }
  }

  if (!regionName) return;

  let allocated = 0;
  for (let i = 0; i < AppState.accounts.length && allocated < amount; i++) {
    const acc = AppState.accounts[i];
    if (acc.branch === null && acc.region === null) {
      acc.branch = branchName;
      acc.region = regionName;
      allocated++;
    }
  }

  inputEl.value = '';
  const regFilter = document.getElementById('qm-region-filter').value;
  filterQuotaManageTable(regFilter);
  renderQuotas();
  renderAccounts();
  updateTopLeftNavigation();
}

// ========================================================
// ROLE SWITCHER HANDLER
// ========================================================
function switchRole(role) {
  AppState.currentRole = role;
  const roleNameEl = document.getElementById('sidebar-role-name');
  const roleBadgeEl = document.getElementById('sidebar-role-badge');
  const roleSelect = document.getElementById('role-switcher-select');
  const quotaNavItem = document.getElementById('nav-item-quotas');
  const accScopeNotice = document.getElementById('acc-scope-notice');

  if (role === 'BRANCH_ADMIN') {
    if (roleNameEl) roleNameEl.innerText = 'Admin Ba Đình';
    if (roleBadgeEl) {
      roleBadgeEl.innerText = 'Chi nhánh';
      roleBadgeEl.className = 'text-[10px] text-sky-700 font-medium';
    }
    if (quotaNavItem) quotaNavItem.classList.add('hidden');
    if (accScopeNotice) accScopeNotice.classList.remove('hidden');
    if (AppState.currentView === 'quotas') switchView('accounts');
  } else {
    if (roleNameEl) roleNameEl.innerText = 'Super Admin';
    if (roleBadgeEl) {
      roleBadgeEl.innerText = 'Toàn quyền';
      roleBadgeEl.className = 'text-[10px] text-emerald-700 font-medium';
    }
    if (quotaNavItem) quotaNavItem.classList.remove('hidden');
    if (accScopeNotice) accScopeNotice.classList.add('hidden');
  }

  if (roleSelect) roleSelect.value = role;

  // Re-render active view
  if (AppState.currentView === 'accounts') renderAccounts();
  else if (AppState.currentView === 'quotas') renderQuotas();
  else if (AppState.currentView === 'audit') renderAudit();
  else if (AppState.currentView === 'chat-monitor') renderChatMonitor();
}

// ========================================================
// PHÂN HỆ: GIÁM SÁT HỘI THOẠI (CHAT MONITOR - ZALO MIRRORING)
// ========================================================

AppState.chatMonitor = {
  selectedRegion: 'all',
  selectedBranch: 'all',
  selectedAccountId: 'ZA-001',
  selectedConversationId: 'CONV-001',
  activeTab: 'all',
  searchQuery: '',
  conversations: {
    'ZA-001': [
      {
        id: 'CONV-001',
        customerName: 'Nguyễn Văn An',
        customerAvatar: 'NA',
        customerType: 'Khách cá nhân',
        customerPhone: '0912.345.678',
        customerMeta: 'SĐT: 0912.345.678 • Hoạt động 5 phút trước',
        lastMessage: 'Dạ FPT Telecom thu cước qua cổng thanh toán ạ!',
        lastTime: '10:41',
        unreadCount: 0,
        messages: [
          { id: 'M1', sender: 'customer', text: 'Dạ em chào anh, em đang tìm hiểu lắp gói cước Internet cho gia đình ở phố Đội Cấn, Ba Đình ạ.', time: '10:30', status: 'Đã nhận' },
          { id: 'M2', sender: 'sales', text: 'Chào anh An! Cảm ơn anh đã liên hệ FPT Telecom Ba Đình. Em Quân xin gửi anh bảng giá cước ưu đãi tháng 10 mới nhất kèm chương trình tặng tháng cước trải nghiệm:', time: '10:32', status: 'Đã xem' },
          { id: 'M3', sender: 'sales', type: 'file', fileName: 'Bang_gia_FPT_Net500_2026.pdf', fileSize: '1.2 MB', fileExt: 'PDF', time: '10:32', status: 'Đã xem' },
          { id: 'M4', sender: 'sales', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80', imageCaption: 'Thiết bị Modem Wi-Fi 6 AX1800GZ 2 băng tần chuẩn FPT', time: '10:33', status: 'Đã xem' },
          { id: 'M5', sender: 'customer', type: 'voice', duration: '0:24', voiceText: 'Anh cho em hỏi nếu đóng trước 6 tháng thì có miễn phí lắp đặt không em?', time: '10:35', status: 'Đã nhận' },
          { id: 'M6', sender: 'sales', text: 'Dạ đúng rồi anh An nhé! Khi tham gia trả trước 6 tháng, anh được miễn phí 100% chi phí lắp đặt, trang bị modem Wi-Fi 6 và tặng thêm 1 tháng cước thứ 7 hoàn toàn miễn phí ạ.', time: '10:36', status: 'Đã xem' },
          { id: 'M7', type: 'divider', text: 'BÀN GIAO TỪ LÊ HOÀNG NAM SANG TRẦN MINH QUÂN LÚC 08:00 NGÀY 28/09/2026' },
          { id: 'M8', sender: 'customer', type: 'recalled', recallTime: '10:40 01/10/2026', originalText: 'Anh gửi STK cá nhân để em chuyển khoản tiền cọc 500k trước nhé.', time: '10:40' },
          { id: 'M9', sender: 'sales', text: 'Dạ anh An yên tâm, FPT Telecom thu cước hoàn toàn minh bạch qua Cổng thanh toán trực tuyến Foxpay/VNPay hoặc nhân viên có phiếu thu điện tử gửi SMS/Email chính chủ. Tuyệt đối nhân viên không thu tiền qua số tài khoản cá nhân ạ!', time: '10:41', status: 'Đã gửi' }
        ]
      },
      {
        id: 'CONV-002',
        customerName: 'Chị Mai Phương',
        customerAvatar: 'MP',
        customerType: 'Khách doanh nghiệp',
        customerPhone: '0983.888.999',
        customerMeta: 'SĐT: 0983.888.999 • Hoạt động 1 giờ trước',
        lastMessage: 'Em gửi anh hợp đồng điện tử qua email nhé',
        lastTime: '09:15',
        unreadCount: 1,
        messages: [
          { id: 'M201', sender: 'customer', text: 'Chào Quân, bên công ty chị ở Kim Mã cần nâng cấp gói Internet quang 500Mbps và thêm 2 địa chỉ IP tĩnh.', time: '09:00', status: 'Đã nhận' },
          { id: 'M202', sender: 'sales', text: 'Dạ em chào chị Phương! Gói Super500 Doanh nghiệp bên em cam kết băng thông quốc tế 15Mbps và tặng kèm 1 IP tĩnh miễn phí, nếu lấy thêm 1 IP tĩnh nữa là 500k/tháng ạ.', time: '09:05', status: 'Đã xem' },
          { id: 'M203', sender: 'sales', type: 'file', fileName: 'Hop_dong_Doanh_nghiep_FPT_KimMa.docx', fileSize: '850 KB', fileExt: 'DOCX', time: '09:10', status: 'Đã xem' },
          { id: 'M204', sender: 'customer', text: 'Em gửi anh hợp đồng điện tử qua email nhé, bên chị duyệt rồi tiến hành ký số trong chiều nay.', time: '09:15', status: 'Đã nhận' }
        ]
      },
      {
        id: 'CONV-003',
        customerName: 'Bác Hoàng Văn Thụ',
        customerAvatar: 'HT',
        customerType: 'Hỗ trợ Kỹ thuật',
        customerPhone: '0903.111.222',
        customerMeta: 'SĐT: 0903.111.222 • Hoạt động hôm qua',
        lastMessage: 'Dạ kỹ thuật đã qua hỗ trợ đổi nguồn camera cho bác rồi ạ',
        lastTime: 'Hôm qua',
        unreadCount: 0,
        messages: [
          { id: 'M301', sender: 'customer', text: 'Cháu ơi camera phòng khách nhà bác ở Liễu Giai bị mất tín hiệu từ tối qua.', time: 'Hôm qua 14:00', status: 'Đã nhận' },
          { id: 'M302', sender: 'sales', text: 'Dạ bác Thụ ơi, cháu đã báo anh Tuấn kỹ thuật khu vực Ba Đình qua kiểm tra tận nhà cho bác trong 30 phút nữa ạ.', time: 'Hôm qua 14:05', status: 'Đã xem' },
          { id: 'M303', sender: 'sales', type: 'location', locationTitle: 'VP FPT Telecom Ba Đình', locationAddress: '48 Vạn Bảo, Phường Liễu Giai, Ba Đình, Hà Nội', time: 'Hôm qua 14:06', status: 'Đã xem' },
          { id: 'M304', sender: 'sales', text: 'Dạ kỹ thuật đã qua hỗ trợ đổi nguồn camera cho bác rồi ạ. Bác kiểm tra lại xem hình ảnh sắc nét bình thường chưa giúp cháu nhé!', time: 'Hôm qua 15:30', status: 'Đã xem' }
        ]
      }
    ],
    'ZA-002': [
      {
        id: 'CONV-004',
        customerName: 'Anh Phạm Thành Long',
        customerAvatar: 'TL',
        customerType: 'Khách cá nhân',
        customerPhone: '0977.654.321',
        customerMeta: 'SĐT: 0977.654.321 • Hoạt động 15 phút trước',
        lastMessage: 'Combo Internet + FPT Play xem Ngoại hạng Anh giá bao nhiêu em?',
        lastTime: '11:05',
        unreadCount: 1,
        messages: [
          { id: 'M401', sender: 'customer', text: 'Chào em Nam, anh đang tìm hiểu gói Combo Internet + FPT Play xem Ngoại hạng Anh bên Cầu Giấy giá bao nhiêu em?', time: '11:05', status: 'Đã nhận' }
        ]
      },
      {
        id: 'CONV-005',
        customerName: 'Chị Đỗ Thu Hà',
        customerAvatar: 'TH',
        customerType: 'Khách cá nhân',
        customerPhone: '0915.222.333',
        customerMeta: 'SĐT: 0915.222.333 • Hoạt động sáng nay',
        lastMessage: 'Đã hoàn tất thanh toán hóa đơn cước',
        lastTime: '08:45',
        unreadCount: 0,
        messages: [
          { id: 'M501', sender: 'sales', text: 'Chào chị Hà, hóa đơn cước Internet tháng 9 của chị đã đến kỳ thanh toán ạ.', time: '08:30', status: 'Đã xem' },
          { id: 'M502', sender: 'customer', text: 'Chị vừa thanh toán qua app Hi FPT xong rồi em nhé, cảm ơn em!', time: '08:45', status: 'Đã nhận' }
        ]
      }
    ],
    'ZA-003': [
      {
        id: 'CONV-006',
        customerName: 'Nguyễn Thị Bích',
        customerAvatar: 'NB',
        customerType: 'Khách cá nhân',
        customerPhone: '0934.555.666',
        customerMeta: 'SĐT: 0934.555.666 • Hoạt động 30 phút trước',
        lastMessage: 'Em gửi chị link kích hoạt tài khoản Zalo nhé',
        lastTime: '10:15',
        unreadCount: 0,
        messages: [
          { id: 'M601', sender: 'sales', text: 'Chào chị Bích, em Nam FPT Ba Đình gửi chị thông tin gói cước Camera IQ3 thông minh ạ.', time: '10:00', status: 'Đã xem' },
          { id: 'M602', sender: 'customer', text: 'Em gửi chị link kích hoạt tài khoản Zalo nhé.', time: '10:15', status: 'Đã nhận' }
        ]
      }
    ]
  }
};

// Render full Chat Monitor View
function renderChatMonitor() {
  const breadcrumb = document.getElementById('topbar-breadcrumb-view');
  if (breadcrumb) breadcrumb.innerText = 'Giám sát Hội thoại (Read-Only)';

  const isBranchAdmin = AppState.currentRole === 'BRANCH_ADMIN';
  const regionSel = document.getElementById('chat-filter-region');
  const branchSel = document.getElementById('chat-filter-branch');
  const salesSel = document.getElementById('chat-select-sales');

  // 1. Populate Region Dropdown
  if (regionSel) {
    if (isBranchAdmin) {
      regionSel.innerHTML = `<option value="Vùng 1 - Hà Nội" selected>Vùng 1 - Hà Nội</option>`;
      regionSel.disabled = true;
      AppState.chatMonitor.selectedRegion = 'Vùng 1 - Hà Nội';
    } else {
      regionSel.disabled = false;
      let html = '<option value="all">Tất cả 7 Vùng</option>';
      AppState.regions.forEach(r => {
        const sel = r.name === AppState.chatMonitor.selectedRegion ? 'selected' : '';
        html += `<option value="${r.name}" ${sel}>${r.name}</option>`;
      });
      regionSel.innerHTML = html;
    }
  }

  // 2. Populate Branch Dropdown
  if (branchSel) {
    if (isBranchAdmin) {
      branchSel.innerHTML = `<option value="Chi nhánh Ba Đình" selected>Chi nhánh Ba Đình</option>`;
      branchSel.disabled = true;
      AppState.chatMonitor.selectedBranch = 'Chi nhánh Ba Đình';
    } else {
      branchSel.disabled = false;
      let html = '<option value="all">Tất cả chi nhánh</option>';
      AppState.regions.forEach(r => {
        if (AppState.chatMonitor.selectedRegion === 'all' || AppState.chatMonitor.selectedRegion === r.name) {
          r.branches.forEach(b => {
            const sel = b.name === AppState.chatMonitor.selectedBranch ? 'selected' : '';
            html += `<option value="${b.name}" ${sel}>${b.name} (${r.name.split(' - ')[0]})</option>`;
          });
        }
      });
      branchSel.innerHTML = html;
    }
  }

  // 3. Populate Sales Selector Dropdown
  if (salesSel) {
    let candidateAccounts = AppState.accounts.filter(a => a.ownerName !== null && a.status === 'ACTIVE');

    if (isBranchAdmin) {
      candidateAccounts = candidateAccounts.filter(a => a.branch === 'Chi nhánh Ba Đình');
    } else {
      if (AppState.chatMonitor.selectedRegion !== 'all') {
        candidateAccounts = candidateAccounts.filter(a => a.region === AppState.chatMonitor.selectedRegion);
      }
      if (AppState.chatMonitor.selectedBranch !== 'all') {
        candidateAccounts = candidateAccounts.filter(a => a.branch === AppState.chatMonitor.selectedBranch);
      }
    }

    if (candidateAccounts.length === 0) {
      candidateAccounts = AppState.accounts.filter(a => a.ownerName !== null).slice(0, 3);
    }

    let optionsHtml = '';
    candidateAccounts.forEach(acc => {
      const isSelected = acc.id === AppState.chatMonitor.selectedAccountId ? 'selected' : '';
      optionsHtml += `<option value="${acc.id}" ${isSelected}>${acc.id} • ${acc.displayName || acc.ownerName} (${acc.branch})</option>`;
    });
    salesSel.innerHTML = optionsHtml;

    if (!candidateAccounts.some(a => a.id === AppState.chatMonitor.selectedAccountId)) {
      if (candidateAccounts.length > 0) {
        AppState.chatMonitor.selectedAccountId = candidateAccounts[0].id;
        salesSel.value = candidateAccounts[0].id;
      }
    }
  }

  // 4. Update Sales Profile Card & Footer
  updateActiveSalesProfileCard();

  // 5. Render Dynamic Watermark
  renderDynamicWatermark();

  // 6. Render Conversation List & Message Feed
  renderChatConversationList();
  renderChatMessageFeed();
}

function updateActiveSalesProfileCard() {
  const accId = AppState.chatMonitor.selectedAccountId;
  const acc = AppState.accounts.find(a => a.id === accId) || AppState.accounts[0];

  const salesNameEl = document.getElementById('chat-sales-name');
  const salesMetaEl = document.getElementById('chat-sales-meta');
  const salesInitialsEl = document.getElementById('chat-sales-avatar-initials');
  const footerSalesNameEl = document.getElementById('chat-footer-sales-name');

  const name = acc.displayName || acc.ownerName || 'Trần Minh Quân';
  const empCode = acc.empCode || 'NV042';
  const branch = acc.branch || 'Chi nhánh Ba Đình';

  if (salesNameEl) salesNameEl.innerText = name;
  if (salesMetaEl) salesMetaEl.innerText = `${empCode} • ${branch} • ${acc.id}`;
  if (footerSalesNameEl) footerSalesNameEl.innerText = name;

  if (salesInitialsEl) {
    const parts = name.trim().split(' ');
    salesInitialsEl.innerText = parts.length > 1 ? (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase() : name.substring(0, 2).toUpperCase();
  }
}

function renderDynamicWatermark() {
  const watermarkContainer = document.getElementById('chat-dynamic-watermark');
  if (!watermarkContainer) return;

  const actor = AppState.currentRole === 'SUPER_ADMIN' ? 'Super Admin (AD001)' : 'Admin Ba Đình (AD101)';
  const dateStr = new Date().toLocaleDateString('vi-VN');
  const stampText = `[SOP SECURITY] ${actor} • ${dateStr} • 118.69.182.45`;

  let html = '';
  for (let i = 0; i < 20; i++) {
    html += `<div class="whitespace-nowrap">${stampText}</div>`;
  }
  watermarkContainer.innerHTML = html;
}

function onChatFilterRegionChanged(regionVal) {
  AppState.chatMonitor.selectedRegion = regionVal;
  AppState.chatMonitor.selectedBranch = 'all';
  renderChatMonitor();
}

function onChatFilterBranchChanged(branchVal) {
  AppState.chatMonitor.selectedBranch = branchVal;
  renderChatMonitor();
}

function onChatSelectSalesChanged(accId) {
  AppState.chatMonitor.selectedAccountId = accId;
  
  const convs = getConversationsForAccount(accId);
  if (convs.length > 0) {
    AppState.chatMonitor.selectedConversationId = convs[0].id;
  }

  updateActiveSalesProfileCard();
  renderChatConversationList();
  renderChatMessageFeed();

  const acc = AppState.accounts.find(a => a.id === accId);
  const salesName = acc ? (acc.displayName || acc.ownerName) : accId;
  addAuditLog('Giám sát hội thoại', accId, `Mở xem toàn bộ lịch sử tin nhắn của Salesman ${salesName} (${accId})`);
}

function getConversationsForAccount(accId) {
  if (AppState.chatMonitor.conversations[accId]) {
    return AppState.chatMonitor.conversations[accId];
  }
  return [
    {
      id: `CONV-GEN-${accId}-1`,
      customerName: 'Nguyễn Văn An',
      customerAvatar: 'NA',
      customerType: 'Khách cá nhân',
      customerPhone: '0912.345.678',
      customerMeta: 'SĐT: 0912.345.678 • Hoạt động 10 phút trước',
      lastMessage: 'Dạ em cảm ơn anh đã tư vấn nhiệt tình ạ!',
      lastTime: '10:45',
      unreadCount: 0,
      messages: [
        { id: 'GM1', sender: 'customer', text: 'Chào bạn, mình cần lắp đặt mạng Internet FPT.', time: '10:20', status: 'Đã nhận' },
        { id: 'GM2', sender: 'sales', text: 'Dạ chào anh, em xin gửi anh các gói cước gia đình ưu đãi tốt nhất:', time: '10:25', status: 'Đã xem' },
        { id: 'GM3', sender: 'sales', type: 'file', fileName: 'Goi_cuoc_FPT_2026.pdf', fileSize: '980 KB', fileExt: 'PDF', time: '10:25', status: 'Đã xem' },
        { id: 'GM4', sender: 'customer', text: 'Dạ em cảm ơn anh đã tư vấn nhiệt tình ạ!', time: '10:45', status: 'Đã nhận' }
      ]
    },
    {
      id: `CONV-GEN-${accId}-2`,
      customerName: 'Chị Mai Phương',
      customerAvatar: 'MP',
      customerType: 'Khách doanh nghiệp',
      customerPhone: '0983.888.999',
      customerMeta: 'SĐT: 0983.888.999 • Hoạt động 2 giờ trước',
      lastMessage: 'Em gửi hợp đồng qua email giúp chị nhé',
      lastTime: '08:30',
      unreadCount: 1,
      messages: [
        { id: 'GM5', sender: 'customer', text: 'Em gửi hợp đồng qua email giúp chị nhé', time: '08:30', status: 'Đã nhận' }
      ]
    }
  ];
}

function renderChatConversationList() {
  const container = document.getElementById('chat-conversation-list');
  if (!container) return;

  const accId = AppState.chatMonitor.selectedAccountId;
  let convs = getConversationsForAccount(accId);

  const countAllEl = document.getElementById('chat-count-all');
  const countUnreadEl = document.getElementById('chat-count-unread');
  if (countAllEl) countAllEl.innerText = convs.length;
  if (countUnreadEl) countUnreadEl.innerText = convs.filter(c => c.unreadCount > 0).length;

  if (AppState.chatMonitor.searchQuery) {
    const q = AppState.chatMonitor.searchQuery.toLowerCase();
    convs = convs.filter(c => c.customerName.toLowerCase().includes(q) || c.customerPhone.includes(q) || c.lastMessage.toLowerCase().includes(q));
  }

  if (AppState.chatMonitor.activeTab === 'unread') {
    convs = convs.filter(c => c.unreadCount > 0);
  }

  const tabAll = document.getElementById('chat-tab-all');
  const tabUnread = document.getElementById('chat-tab-unread');
  if (AppState.chatMonitor.activeTab === 'all') {
    if (tabAll) { tabAll.className = 'px-2.5 py-1 rounded bg-white text-primary border border-outline-variant/40 shadow-2xs font-bold cursor-pointer transition-all'; }
    if (tabUnread) { tabUnread.className = 'px-2.5 py-1 rounded text-on-surface-variant hover:bg-white/60 cursor-pointer transition-all'; }
  } else {
    if (tabAll) { tabAll.className = 'px-2.5 py-1 rounded text-on-surface-variant hover:bg-white/60 cursor-pointer transition-all'; }
    if (tabUnread) { tabUnread.className = 'px-2.5 py-1 rounded bg-white text-primary border border-outline-variant/40 shadow-2xs font-bold cursor-pointer transition-all'; }
  }

  if (convs.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-xs text-slate-400">
        <span class="material-symbols-outlined text-[32px] mb-1 text-slate-300">chat_bubble_outline</span>
        <p>Không tìm thấy cuộc trò chuyện phù hợp</p>
      </div>
    `;
    return;
  }

  let html = '';
  convs.forEach(c => {
    const isSelected = c.id === AppState.chatMonitor.selectedConversationId;
    const activeClass = isSelected ? 'bg-sky-50/90 border-l-4 border-primary font-medium' : 'hover:bg-surface-container-low/60';
    const unreadBadge = c.unreadCount > 0 ? `<span class="px-1.5 py-0.2 rounded-full bg-error text-white text-[10px] font-bold">${c.unreadCount}</span>` : '';

    html += `
      <div class="p-3 cursor-pointer transition-colors flex items-start gap-2.5 ${activeClass}" onclick="selectChatConversation('${c.id}')">
        <div class="w-10 h-10 rounded-full bg-blue-100 text-primary font-bold text-xs flex items-center justify-center shrink-0 border border-blue-200">
          ${c.customerAvatar}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-1 mb-0.5">
            <span class="text-xs font-bold text-on-surface truncate">${c.customerName}</span>
            <span class="text-[10px] text-slate-400 shrink-0">${c.lastTime}</span>
          </div>
          <div class="flex items-center justify-between gap-1">
            <p class="text-[11px] text-on-surface-variant truncate">${c.lastMessage}</p>
            ${unreadBadge}
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function selectChatConversation(convId) {
  AppState.chatMonitor.selectedConversationId = convId;
  renderChatConversationList();
  renderChatMessageFeed();
}

function setChatConversationFilter(filterType) {
  AppState.chatMonitor.activeTab = filterType;
  renderChatConversationList();
}

function filterChatConversations(query) {
  AppState.chatMonitor.searchQuery = query;
  renderChatConversationList();
}

function renderChatMessageFeed() {
  const feedContainer = document.getElementById('chat-message-feed');
  if (!feedContainer) return;

  const accId = AppState.chatMonitor.selectedAccountId;
  const convs = getConversationsForAccount(accId);
  const activeConv = convs.find(c => c.id === AppState.chatMonitor.selectedConversationId) || convs[0];

  if (!activeConv) {
    feedContainer.innerHTML = '<div class="p-6 text-center text-xs text-slate-400">Chưa có hội thoại nào</div>';
    return;
  }

  const nameEl = document.getElementById('chat-active-customer-name');
  const avatarEl = document.getElementById('chat-active-customer-avatar');
  const metaEl = document.getElementById('chat-active-customer-meta');

  if (nameEl) nameEl.innerText = activeConv.customerName;
  if (avatarEl) avatarEl.innerText = activeConv.customerAvatar;
  if (metaEl) metaEl.innerText = `${activeConv.customerPhone || '0912.345.678'} • Hoạt động gần đây`;

  let html = `
    <div class="text-center my-1 select-none">
      <span class="px-3 py-1 rounded-full bg-slate-200/80 text-[10px] font-semibold text-slate-600">Hôm nay, 01/10/2026</span>
    </div>
  `;

  activeConv.messages.forEach(m => {
    if (m.type === 'divider') {
      html += `
        <div class="my-2 py-1.5 px-3 bg-amber-100/90 border border-amber-300/80 rounded-lg text-[11px] text-amber-900 text-center font-semibold flex items-center justify-center gap-2 shadow-2xs select-none">
          <span class="material-symbols-outlined text-[16px] text-amber-700">swap_horiz</span>
          <span>${m.text}</span>
        </div>
      `;
      return;
    }

    if (m.type === 'recalled') {
      html += `
        <div class="flex flex-col items-start max-w-md my-1">
          <div class="p-2.5 rounded-xl border border-dashed border-red-300 bg-red-50/60 text-xs text-on-surface flex flex-col gap-1 shadow-2xs">
            <div class="flex items-center gap-1 text-[11px] text-error font-bold select-none">
              <span class="material-symbols-outlined text-[15px]">undo</span>
              <span>[Đã thu hồi trên Zalo lúc ${m.recallTime}]</span>
            </div>
            <div class="italic line-through text-slate-500 font-mono text-[11px]">"${m.originalText}"</div>
          </div>
          <span class="text-[10px] text-slate-400 mt-0.5 ml-1">${m.time}</span>
        </div>
      `;
      return;
    }

    const isSales = m.sender === 'sales';
    const alignClass = isSales ? 'items-end' : 'items-start';
    const bubbleClass = isSales 
      ? 'bg-[#006194] text-white rounded-2xl rounded-tr-xs shadow-xs' 
      : 'bg-white text-on-surface rounded-2xl rounded-tl-xs shadow-2xs border border-outline-variant/30';
    const statusIcon = isSales ? `<span class="text-[10px] text-blue-200 font-medium flex items-center gap-0.5 ml-1"><span class="material-symbols-outlined text-[12px]">done_all</span> ${m.status}</span>` : '';

    let contentHtml = '';
    if (m.type === 'file') {
      contentHtml = `
        <div class="flex items-center gap-2.5 p-1">
          <div class="w-9 h-9 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs shrink-0">
            ${m.fileExt}
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-semibold underline truncate max-w-[200px]">${m.fileName}</span>
            <span class="text-[10px] text-blue-200">${m.fileSize} • Đã quét an toàn</span>
          </div>
          <button class="w-7 h-7 rounded bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer ml-1" onclick="alert('Đang tải xuống tệp tin: ${m.fileName} phục vụ đối soát an toàn.')">
            <span class="material-symbols-outlined text-[16px]">download</span>
          </button>
        </div>
      `;
    } else if (m.type === 'image') {
      contentHtml = `
        <div class="flex flex-col gap-1.5 p-1">
          <div class="relative rounded-xl overflow-hidden cursor-pointer group" onclick="openChatImagePreview('${m.imageUrl}', '${m.imageCaption}')">
            <img src="${m.imageUrl}" alt="Zalo Attachment" class="max-w-[260px] h-[150px] object-cover rounded-xl transition-transform group-hover:scale-105">
            <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium text-xs gap-1">
              <span class="material-symbols-outlined text-[18px]">zoom_in</span> Click để phóng to
            </div>
          </div>
          <span class="text-[11px] text-blue-100 italic px-1">${m.imageCaption}</span>
        </div>
      `;
    } else if (m.type === 'voice') {
      contentHtml = `
        <div class="flex items-center gap-3 p-1 min-w-[220px]">
          <button id="btn-voice-${m.id}" class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-xs cursor-pointer hover:bg-primary-container" onclick="toggleVoiceAudio('btn-voice-${m.id}')">
            <span class="material-symbols-outlined text-[18px]">play_arrow</span>
          </button>
          <div class="flex flex-col flex-1">
            <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div class="bg-primary h-full w-1/3"></div>
            </div>
            <div class="flex items-center justify-between text-[10px] text-slate-500 mt-1">
              <span>Tin nhắn thoại</span>
              <span class="font-mono font-semibold">${m.duration}</span>
            </div>
          </div>
        </div>
      `;
    } else if (m.type === 'location') {
      contentHtml = `
        <div class="flex flex-col gap-1.5 p-1 min-w-[240px]">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-red-600 text-[20px]">location_on</span>
            <div class="flex flex-col">
              <strong class="text-xs font-bold text-white">${m.locationTitle}</strong>
              <span class="text-[10px] text-blue-100">${m.locationAddress}</span>
            </div>
          </div>
        </div>
      `;
    } else {
      contentHtml = `<p class="text-xs leading-relaxed px-1 py-0.5">${m.text}</p>`;
    }

    html += `
      <div class="flex flex-col ${alignClass} max-w-[75%]">
        <div class="px-3.5 py-2.5 ${bubbleClass}">
          ${contentHtml}
        </div>
        <div class="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5 px-1 select-none">
          <span>${m.time}</span>
          ${statusIcon}
        </div>
      </div>
    `;
  });

  feedContainer.innerHTML = html;
  feedContainer.scrollTop = feedContainer.scrollHeight;
}

function openChatImagePreview(src, title) {
  const modal = document.getElementById('modal-chat-image-preview');
  const imgEl = document.getElementById('chat-preview-image-src');
  const titleEl = document.getElementById('chat-preview-image-title');

  if (imgEl) imgEl.src = src;
  if (titleEl) titleEl.innerText = title || 'Hình ảnh đính kèm Zalo';
  if (modal) modal.classList.remove('hidden');
}

function openDrawerForActiveSales() {
  const accId = AppState.chatMonitor.selectedAccountId;
  if (accId) {
    openDrawer(accId);
  }
}

function toggleVoiceAudio(btnId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  const icon = btn.querySelector('.material-symbols-outlined');
  if (!icon) return;

  if (icon.innerText === 'play_arrow') {
    icon.innerText = 'pause';
    btn.classList.add('bg-emerald-600');
    setTimeout(() => {
      icon.innerText = 'play_arrow';
      btn.classList.remove('bg-emerald-600');
    }, 3000);
  } else {
    icon.innerText = 'play_arrow';
    btn.classList.remove('bg-emerald-600');
  }
}

