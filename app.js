/**
 * Z Enterprise Management Platform — Role-Centric Console (v3.5)
 * 
 * Design Philosophy:
 * 1. Role-Centric Matrix: Each persona possesses full visibility of information they are entitled to.
 * 2. Natural Enterprise Vietnamese Terminology (Standard FPT Telecom B2B Vocabulary).
 * 3. Modern Soft-Morphic & Glassmorphic UI (Tactile depth, frosted glass ribbons, elegant micro-elevations).
 * 4. Advanced Interactive Features: Quota Demand Forecasting, Workload Distribution Matrix, Official Enterprise ID Trust Badge, Message Template Vault, Anomaly Detection.
 * 5. Global Multi-Criteria Filter (Unit, Status, Quota Health, Time Range, Keyword).
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. INITIAL STATE & MOCK DATA FIXTURES
  // =========================================================================
  const INITIAL_STATE = {
    currentPersona: 'branch_admin', // Default: Branch Admin (HCM 01)
    activeView: 'branch_cockpit',
    selectedOrgNodeId: 'HCM01',
    selectedEmployeeId: 'EMP-00128',
    selectedCustomerId: 'CUST-001',
    selectedAccountId: 'ZENT-001293',

    // Sales Rep Omnichannel & Group Workspace State (matching user images)
    salesActiveChannel: 'zalo_enterprise', // 'all', 'zalo_enterprise', 'zalo_oa', 'portal', 'messenger', 'website'
    salesChatFilter: 'all', // 'all', 'unread', 'read', 'group'
    salesChatSelectedId: 'CUST-001', // null for empty state, or id of customer/group
    friendRequests: [
      { id: 'FR-001', name: 'Nguyễn Thành Đạt', role: 'Trưởng phòng Thu Mua', company: 'CTCP Sữa Vinamilk', phoneMasked: '093****112', time: '10 phút trước', note: 'Quan tâm hạ tầng FPT Internet Dedicated 1Gbps' },
      { id: 'FR-002', name: 'Lê Thị Thu', role: 'Kế toán trưởng', company: 'Vietcombank Tân Bình', phoneMasked: '097****890', time: '1 giờ trước', note: 'Cần nâng cấp hệ thống Camera Cloud 32 kênh' }
    ],

    // Global Advanced Filter State
    isFilterOpen: false,
    filters: {
      scopeUnit: 'ALL',
      status: 'ALL',
      quotaHealth: 'ALL',
      timeRange: 'ALL',
      keyword: ''
    },

    // Executive Hierarchical Drill-Down State for Higher-Level Admins
    superAdminDrilldown: 'ALL', // 'ALL', 'REG_SOUTH', 'REG_NORTH', 'REG_CENTRAL'
    regionAdminDrilldown: 'ALL', // 'ALL', 'HCM01', 'HCM02', 'DNG01'

    // Company & Organization Quota Pool (Mathematically Unified Source of Truth)
    companyQuota: {
      totalContract: 4500,
      allocatedToRegions: 4100,
      availableCompany: 400
    },

    // Organization Hierarchy Tree (Company -> Region -> Branch)
    orgTree: [
      {
        id: 'CORP',
        name: 'FPT Telecom (Toàn Quốc)',
        level: 1,
        allocated: 4500,
        assigned: 4100,
        available: 400,
        employees: 4120,
        children: [
          {
            id: 'REG_SOUTH',
            name: 'Vùng Miền Nam (South Region)',
            level: 2,
            allocated: 2500,
            assigned: 2400,
            available: 100,
            employees: 2450,
            children: [
              { id: 'HCM01', name: 'Chi nhánh HCM 01 - Tân Bình', level: 3, allocated: 300, assigned: 276, available: 24, employees: 281, withoutAccount: 5, suspended: 1 },
              { id: 'HCM02', name: 'Chi nhánh HCM 02 - Phú Nhuận', level: 3, allocated: 200, assigned: 200, available: 0, employees: 205, withoutAccount: 5, suspended: 0 },
              { id: 'DNG01', name: 'Chi nhánh Đồng Nai', level: 3, allocated: 150, assigned: 135, available: 15, employees: 140, withoutAccount: 5, suspended: 1 },
              { id: 'SATELLITES', name: '12 Chi nhánh vệ tinh Miền Nam', level: 3, allocated: 1750, assigned: 1689, available: 61, employees: 1824, withoutAccount: 15, suspended: 0 }
            ]
          },
          {
            id: 'REG_NORTH',
            name: 'Vùng Miền Bắc (North Region)',
            level: 2,
            allocated: 1200,
            assigned: 1000,
            available: 200,
            employees: 1020,
            children: [
              { id: 'HAN01', name: 'Chi nhánh Hà Nội 01 - Cầu Giấy', level: 3, allocated: 250, assigned: 220, available: 30, employees: 230, withoutAccount: 10, suspended: 2 },
              { id: 'HPG01', name: 'Chi nhánh Hải Phòng', level: 3, allocated: 150, assigned: 130, available: 20, employees: 135, withoutAccount: 5, suspended: 0 },
              { id: 'OTHER_NORTH', name: 'Các Chi nhánh khác Miền Bắc', level: 3, allocated: 600, assigned: 550, available: 50, employees: 655, withoutAccount: 15, suspended: 0 }
            ]
          },
          {
            id: 'REG_CENTRAL',
            name: 'Vùng Miền Trung (Central Region)',
            level: 2,
            allocated: 400,
            assigned: 300,
            available: 100,
            employees: 650,
            children: [
              { id: 'DAN01', name: 'Chi nhánh Đà Nẵng 01', level: 3, allocated: 200, assigned: 170, available: 30, employees: 180, withoutAccount: 10, suspended: 1 },
              { id: 'OTHER_CENTRAL', name: 'Các Chi nhánh khác Miền Trung', level: 3, allocated: 100, assigned: 80, available: 20, employees: 220, withoutAccount: 5, suspended: 0 }
            ]
          }
        ]
      }
    ],

    // Quota Requisitions between Branch -> Region -> HQ
    quotaRequests: [
      {
        id: 'REQ-2026-001',
        branchId: 'HCM02',
        branchName: 'Chi nhánh HCM 02 - Phú Nhuận',
        regionId: 'REG_SOUTH',
        requestType: 'BranchToRegion',
        requestQty: 20,
        reason: 'Chi nhánh hết Quota tự do (Zero Quota) trong khi đang tiếp nhận thêm 5 nhân viên kinh doanh mới phục vụ mở rộng địa bàn Phú Nhuận.',
        status: 'Pending', // Pending, Approved, Rejected
        requestedAt: '24/09/2026 09:15',
        requester: 'Nguyễn Bích Thủy (Branch Admin HCM 02)'
      },
      {
        id: 'REQ-HQ-001',
        regionId: 'REG_SOUTH',
        regionName: 'Vùng Miền Nam',
        requestType: 'RegionToHq',
        requestQty: 150,
        reason: 'Đề xuất Trụ sở HQ cấp thêm 150 Quota phục vụ chiến dịch mở rộng phát triển thị trường SME quý 4.',
        status: 'Pending',
        requestedAt: '24/09/2026 08:30',
        requester: 'Trần Đình Trọng (Region Admin South)'
      },
      {
        id: 'REQ-2026-002',
        branchId: 'DAN01',
        branchName: 'Chi nhánh Đà Nẵng 01',
        regionId: 'REG_CENTRAL',
        requestType: 'BranchToRegion',
        requestQty: 15,
        reason: 'Bổ sung hạn ngạch cho chiến dịch mở rộng CSKH dự án resort nghỉ dưỡng miền Trung.',
        status: 'Approved',
        requestedAt: '22/09/2026 14:30',
        requester: 'Trần Văn Cường (Branch Admin DAN 01)',
        approvedAt: '22/09/2026 16:00',
        approver: 'Lê Minh Hải (Region Admin Central)'
      }
    ],

    // Employees Roster
    employees: [
      {
        id: 'EMP-00128',
        name: 'Nguyễn Văn A',
        email: 'a.nguyen@fpt.com.vn',
        region: 'Vùng Miền Nam',
        regionId: 'REG_SOUTH',
        branchId: 'HCM01',
        branchName: 'Chi nhánh HCM 01',
        jobStatus: 'Active',
        accountId: 'ZENT-001293',
        accountStatus: 'Active',
        customersCount: 48,
        lastActivity: '10 phút trước',
        sessions: [
          { id: 'SES-01', platform: 'Windows 11 PC', client: 'Chrome Web Console', ip: '118.69.182.45', lastActive: '10 phút trước' },
          { id: 'SES-02', platform: 'iPhone 14 Pro', client: 'Z Enterprise Mobile App', ip: '14.241.12.89', lastActive: 'Vừa xong' }
        ]
      },
      {
        id: 'EMP-00129',
        name: 'Trần Thị B',
        email: 'b.tran@fpt.com.vn',
        region: 'Vùng Miền Nam',
        regionId: 'REG_SOUTH',
        branchId: 'HCM01',
        branchName: 'Chi nhánh HCM 01',
        jobStatus: 'Active',
        accountId: 'ZENT-001294',
        accountStatus: 'Active',
        customersCount: 65,
        lastActivity: '1 giờ trước',
        sessions: [
          { id: 'SES-03', platform: 'MacBook Pro M2', client: 'macOS Client', ip: '118.69.182.46', lastActive: '1 giờ trước' }
        ]
      },
      {
        id: 'EMP-00130',
        name: 'Lê Văn C',
        email: 'c.le@fpt.com.vn',
        region: 'Vùng Miền Nam',
        regionId: 'REG_SOUTH',
        branchId: 'HCM01',
        branchName: 'Chi nhánh HCM 01',
        jobStatus: 'Active',
        accountId: 'ZENT-001295',
        accountStatus: 'Suspended',
        customersCount: 32,
        lastActivity: '2 ngày trước',
        sessions: []
      },
      {
        id: 'EMP-00131',
        name: 'Phạm Văn D',
        email: 'd.pham@fpt.com.vn',
        region: 'Vùng Miền Nam',
        regionId: 'REG_SOUTH',
        branchId: 'HCM01',
        branchName: 'Chi nhánh HCM 01',
        jobStatus: 'Leaving (Nghỉ việc 30/09)',
        accountId: 'ZENT-001296',
        accountStatus: 'Active',
        customersCount: 127,
        lastActivity: 'Hôm qua',
        sessions: [
          { id: 'SES-04', platform: 'HP EliteBook 840', client: 'Windows Client', ip: '118.69.182.50', lastActive: 'Hôm qua' }
        ]
      },
      {
        id: 'EMP-00132',
        name: 'Nguyễn Văn E',
        email: 'e.nguyen@fpt.com.vn',
        region: 'Vùng Miền Nam',
        regionId: 'REG_SOUTH',
        branchId: 'HCM01',
        branchName: 'Chi nhánh HCM 01',
        jobStatus: 'Active',
        accountId: 'ZENT-001297',
        accountStatus: 'Active',
        customersCount: 20,
        lastActivity: '5 phút trước',
        sessions: [
          { id: 'SES-05', platform: 'Dell Vostro 5410', client: 'Web Client', ip: '118.69.182.51', lastActive: '5 phút trước' }
        ]
      },
      {
        id: 'EMP-00133',
        name: 'Trần Văn F',
        email: 'f.tran@fpt.com.vn',
        region: 'Vùng Miền Nam',
        regionId: 'REG_SOUTH',
        branchId: 'HCM01',
        branchName: 'Chi nhánh HCM 01',
        jobStatus: 'Active (Chờ chuyển Vùng)',
        accountId: 'ZENT-001298',
        accountStatus: 'Active',
        customersCount: 45,
        lastActivity: '15 phút trước',
        sessions: [
          { id: 'SES-06', platform: 'Lenovo ThinkBook 14', client: 'Windows Client', ip: '118.69.182.52', lastActive: '15 phút trước' }
        ]
      },
      {
        id: 'EMP-00134',
        name: 'Hoàng Văn G',
        email: 'g.hoang@fpt.com.vn',
        region: 'Vùng Miền Nam',
        regionId: 'REG_SOUTH',
        branchId: 'HCM01',
        branchName: 'Chi nhánh HCM 01',
        jobStatus: 'Active',
        accountId: 'ZENT-001299',
        accountStatus: 'Active',
        customersCount: 52,
        lastActivity: '1 ngày trước',
        sessions: [
          { id: 'SES-07', platform: 'Asus ZenBook Duo', client: 'Windows Client', ip: '118.69.182.55', lastActive: '1 ngày trước' }
        ]
      },
      {
        id: 'EMP-00135',
        name: 'Đặng Thị H',
        email: 'h.dang@fpt.com.vn',
        region: 'Vùng Miền Nam',
        regionId: 'REG_SOUTH',
        branchId: 'HCM01',
        branchName: 'Chi nhánh HCM 01',
        jobStatus: 'Active (Mới tiếp nhận)',
        accountId: null,
        accountStatus: 'Unassigned',
        customersCount: 0,
        lastActivity: 'N/A',
        sessions: []
      },
      {
        id: 'EMP-00136',
        name: 'Vũ Minh K',
        email: 'k.vu@fpt.com.vn',
        region: 'Vùng Miền Nam',
        regionId: 'REG_SOUTH',
        branchId: 'HCM01',
        branchName: 'Chi nhánh HCM 01',
        jobStatus: 'Active',
        accountId: 'ZENT-001300',
        accountStatus: 'Pending Activation',
        customersCount: 0,
        lastActivity: 'Chờ kích hoạt email',
        sessions: []
      },
      {
        id: 'EMP-00137',
        name: 'Đoàn Thanh L',
        email: 'l.doan@fpt.com.vn',
        region: 'Vùng Miền Nam',
        regionId: 'REG_SOUTH',
        branchId: 'HCM01',
        branchName: 'Chi nhánh HCM 01',
        jobStatus: 'Terminated (Đã nghỉ việc)',
        accountId: 'ZENT-001301',
        accountStatus: 'Active', // Needs Attention Alert!
        customersCount: 18,
        lastActivity: '3 giờ trước',
        sessions: [
          { id: 'SES-08', platform: 'Dell Latitude', client: 'Web Client', ip: '118.69.182.60', lastActive: '3 giờ trước' }
        ]
      }
    ],

    // Customer Relationships (Enterprise Assets)
    customers: [
      {
        id: 'CUST-001',
        name: 'CTCP Xây Dựng Hải Nam',
        contactPerson: 'Anh Hoàng Long (Giám đốc dự án)',
        phoneMasked: '090****567',
        handlerName: 'Nguyễn Văn A',
        handlerEmpId: 'EMP-00128',
        accountId: 'ZENT-001293',
        branchName: 'Chi nhánh HCM 01',
        lastInteraction: '50 giờ trước',
        hoursSinceLastMsg: 50,
        status: 'Active',
        tag: 'Đang Báo Giá',
        unread: false,
        notes: 'Dự án FPT Internet Doanh Nghiệp 500Mbps',
        messages: [
          { sender: 'them', text: 'Nhờ em gửi lại bảng báo giá gói Lux 800 và cam kết SLA băng thông quốc tế giúp anh nhé.', time: '10:00 ngày 22/09' }
        ]
      },
      {
        id: 'GROUP-001',
        isGroup: true,
        name: 'Nhóm Dự Án FPT Lux 800 - Hải Nam',
        contactPerson: '3 thành viên (Hoàng Long, Nguyễn Văn A, Lê Hoàng Nam)',
        phoneMasked: 'Nhóm Doanh Nghiệp',
        handlerName: 'Nguyễn Văn A',
        handlerEmpId: 'EMP-00128',
        accountId: 'ZENT-001293',
        branchName: 'Chi nhánh HCM 01',
        lastInteraction: '10 phút trước',
        hoursSinceLastMsg: 0.2,
        status: 'Active',
        tag: 'Nhóm Dự Án',
        unread: true,
        notes: 'Nhóm trao đổi kỹ thuật và hồ sơ năng lực',
        messages: [
          { sender: 'me', text: 'Em đã gửi phương án cam kết SLA 99.9% vào nhóm cho anh Long và anh Nam rồi ạ.', time: '10:15 Hôm nay' },
          { sender: 'them', text: 'Ok em, anh đang rà soát hợp đồng nhé.', time: '10:20 Hôm nay' }
        ]
      },
      {
        id: 'CUST-002',
        name: 'Trường Mầm Non Ánh Sao',
        contactPerson: 'Chị Mai Phương (Hiệu trưởng)',
        phoneMasked: '091****882',
        handlerName: 'Nguyễn Văn A',
        handlerEmpId: 'EMP-00128',
        accountId: 'ZENT-001293',
        branchName: 'Chi nhánh HCM 01',
        lastInteraction: '2 giờ trước',
        hoursSinceLastMsg: 2,
        status: 'Active',
        tag: 'Đã Ký Hợp Đồng',
        unread: true,
        notes: 'Gói 16 Camera FPT Cloud an ninh trường học',
        messages: [
          { sender: 'them', text: 'Chị nhận được hợp đồng rồi, chiều nay bên em cho kỹ thuật qua lắp đặt nhé.', time: '07:30 Hôm nay' },
          { sender: 'me', text: 'Dạ vâng chị Phương, đội kỹ thuật HCM 01 sẽ có mặt lúc 14:00 chiều nay ạ!', time: '07:45 Hôm nay' }
        ]
      },
      {
        id: 'CUST-003',
        name: 'Khách Sạn Imperial Palace',
        contactPerson: 'Anh Quốc Tuấn (IT Trưởng)',
        phoneMasked: '098****331',
        handlerName: 'Nguyễn Văn A',
        handlerEmpId: 'EMP-00128',
        accountId: 'ZENT-001293',
        branchName: 'Chi nhánh HCM 01',
        lastInteraction: '1 ngày trước',
        hoursSinceLastMsg: 24,
        status: 'Active',
        tag: 'Khảo Sát Hạ Tầng',
        notes: 'Hệ thống Wi-Fi chuyên dụng 7 tầng',
        messages: [
          { sender: 'me', text: 'Em đã gửi phương án Access Point qua Zalo rồi anh nhé.', time: '09:00 Hôm qua' },
          { sender: 'them', text: 'Sếp anh đã duyệt phương án, sáng mai qua làm việc nhé.', time: '10:15 Hôm qua' }
        ]
      },
      {
        id: 'CUST-004',
        name: 'Công Ty Logistics Phương Đông',
        contactPerson: 'Chị Lan Hương (Phó GĐ Vận Hành)',
        phoneMasked: '093****990',
        handlerName: 'Trần Thị B',
        handlerEmpId: 'EMP-00129',
        accountId: 'ZENT-001294',
        branchName: 'Chi nhánh HCM 01',
        lastInteraction: '30 phút trước',
        hoursSinceLastMsg: 0.5,
        status: 'Active',
        tag: 'Đang Chăm Sóc',
        notes: 'Dịch vụ Tổng đài ảo Oncall FPT 50 line',
        messages: [
          { sender: 'them', text: 'Bên chị cần bổ sung thêm 10 extension cho chi nhánh Bình Dương.', time: '11:30 Hôm nay' }
        ]
      },
      {
        id: 'CUST-005',
        name: 'Tập Đoàn Bán Lẻ Hoàng Kim',
        contactPerson: 'Anh Đức Trí (Giám Đốc IT)',
        phoneMasked: '097****123',
        handlerName: 'Phạm Văn D',
        handlerEmpId: 'EMP-00131',
        accountId: 'ZENT-001296',
        branchName: 'Chi nhánh HCM 01',
        lastInteraction: 'Hôm qua',
        hoursSinceLastMsg: 28,
        status: 'Active',
        tag: 'Cần Bàn Giao Gấp',
        notes: 'Khách hàng VIP cần bàn giao ngay vì nhân sự D sắp nghỉ việc',
        messages: [
          { sender: 'them', text: 'Hợp đồng đường truyền cáp quang bảo đảm đã hoàn tất ký kết.', time: '14:00 Hôm qua' }
        ]
      }
    ],

    // Activation Queue
    activationQueue: [
      {
        id: 'ACT-001',
        empId: 'EMP-00136',
        name: 'Vũ Minh K',
        email: 'k.vu@fpt.com.vn',
        branchName: 'Chi nhánh HCM 01',
        accountId: 'ZENT-001300',
        sentAt: '23/09/2026 10:00',
        expiresAt: '26/09/2026 10:00',
        hoursLeft: 46,
        status: 'Pending'
      },
      {
        id: 'ACT-002',
        empId: 'EMP-00210',
        name: 'Ngô Thanh T',
        email: 't.ngo@fpt.com.vn',
        branchName: 'Chi nhánh Hà Nội 01',
        accountId: 'ZENT-001305',
        sentAt: '24/09/2026 08:30',
        expiresAt: '27/09/2026 08:30',
        hoursLeft: 68,
        status: 'Pending'
      }
    ],

    // Handover Queue
    handoverQueue: [
      {
        id: 'HO-101',
        sourceEmpId: 'EMP-00131',
        sourceName: 'Phạm Văn D (Nghỉ việc 30/09)',
        targetEmpId: 'EMP-00129',
        targetName: 'Trần Thị B',
        branchName: 'Chi nhánh HCM 01',
        customersCount: 127,
        status: 'Pending',
        createdAt: '24/09/2026 08:00'
      }
    ],

    // System Needs Attention Alerts
    alerts: [
      {
        id: 'ALT-01',
        title: 'Chi nhánh HCM 02 đã hết sạch Quota tự do (Zero Quota)',
        desc: 'Hạn ngạch khả dụng = 0 trong khi có 5 nhân sự kinh doanh mới chưa được cấp tài khoản.',
        severity: 'danger',
        actionType: 'approve-quota-req',
        ctaLabel: 'Duyệt Xin Cấp Thêm Quota',
        regionId: 'REG_SOUTH'
      },
      {
        id: 'ALT-02',
        title: 'Nhân sự đã thôi việc nhưng tài khoản Enterprise vẫn hoạt động',
        desc: 'Đoàn Thanh L (EMP-00137) đã nghỉ việc trên HR nhưng tài khoản ZENT-001301 chưa bị thu hồi.',
        severity: 'danger',
        actionType: 'revoke-account',
        ctaLabel: 'Thu Hồi Tài Khoản Ngay',
        regionId: 'REG_SOUTH',
        branchId: 'HCM01'
      },
      {
        id: 'ALT-03',
        title: 'Thư mời kích hoạt sắp hết hạn (TTL < 48h)',
        desc: 'Vũ Minh K (EMP-00136) chưa xác nhận kích hoạt tài khoản qua email công ty (còn 46h).',
        severity: 'warning',
        actionType: 'resend-invite',
        ctaLabel: 'Gửi Lại Thư Mời',
        regionId: 'REG_SOUTH',
        branchId: 'HCM01'
      }
    ],

    // Centralized Audit Log
    auditLogs: [
      {
        timestamp: '24/09/2026 11:20:15',
        actor: 'Lê Hoàng Nam (Branch Admin)',
        action: 'Cấp phát tài khoản Enterprise',
        target: 'Vũ Minh K (EMP-00136)',
        org: 'Chi nhánh HCM 01',
        result: 'Thành Công'
      },
      {
        timestamp: '24/09/2026 09:15:30',
        actor: 'Nguyễn Bích Thủy (Branch Admin)',
        action: 'Gửi đề xuất xin cấp thêm 20 Quota',
        target: 'Ban Điều Hành Vùng Miền Nam',
        org: 'Chi nhánh HCM 02',
        result: 'Chờ Phê Duyệt'
      },
      {
        timestamp: '23/09/2026 16:45:00',
        actor: 'Trần Đình Trọng (Region Admin)',
        action: 'Phê duyệt phân bổ Quota',
        target: 'Chi nhánh Đồng Nai (+15 Quota)',
        org: 'Vùng Miền Nam',
        result: 'Thành Công'
      },
      {
        timestamp: '23/09/2026 14:10:22',
        actor: 'Vũ Minh Tuấn (Super Admin)',
        action: 'Điều chỉnh hạn ngạch Vùng',
        target: 'Vùng Miền Bắc (+100 Quota)',
        org: 'Trụ sở FPT HQ',
        result: 'Thành Công'
      },
      {
        timestamp: '22/09/2026 08:30:00',
        actor: 'Lê Hoàng Nam (Branch Admin)',
        action: 'Tạm khóa tài khoản Enterprise',
        target: 'Lê Văn C (EMP-00130)',
        org: 'Chi nhánh HCM 01',
        result: 'Thành Công'
      }
    ],

    // Break-Glass Emergency Interventions (US10 / FR08)
    breakGlassLogs: [
      {
        id: 'BG-2026-001',
        time: '24/09/2026 11:30:00',
        actorSuper: 'Vũ Minh Tuấn (Super Admin)',
        actorLegal: 'Đỗ Hoàng Mai (Legal/Audit)',
        targetId: 'EMP-SYS-GATEWAY',
        targetName: 'Tài Khoản Gateway Thử Nghiệm',
        reason: 'Diễn tập ứng cứu sự cố an toàn thông tin định kỳ CSOC',
        status: 'Approved & Executed'
      }
    ],

    // Enterprise Policies
    policies: {
      activationTtlHours: 72,
      lowQuotaThresholdPercent: 10,
      sessionTimeoutMinutes: 30,
      phoneMaskingEnforced: true,
      autoRevokeOnTermination: true
    }
  };

  // Mutable Application State
  let state = JSON.parse(JSON.stringify(INITIAL_STATE));

  // =========================================================================
  // 2. ROLE DEFINITIONS & METADATA
  // =========================================================================
  const PERSONA_METADATA = {
    super_admin: {
      name: 'Vũ Minh Tuấn',
      role: 'Super Admin',
      unit: 'Trụ sở HQ FPT Telecom',
      avatar: 'HQ',
      scopeTitle: 'Toàn Quốc (HQ) • Kho Quota Tổng: 4,500 • 3 Vùng',
      scopeClass: 'role-scope-badge-corp',
      defaultView: 'super_telemetry',
      allowedUnits: [
        { id: 'ALL', label: 'Toàn quốc (Tất cả đơn vị)' },
        { id: 'REG_SOUTH', label: 'Vùng Miền Nam' },
        { id: 'REG_NORTH', label: 'Vùng Miền Bắc' },
        { id: 'REG_CENTRAL', label: 'Vùng Miền Trung' },
        { id: 'HCM01', label: 'Chi nhánh HCM 01' },
        { id: 'HCM02', label: 'Chi nhánh HCM 02' },
        { id: 'DNG01', label: 'Chi nhánh Đồng Nai' }
      ]
    },
    region_admin: {
      name: 'Trần Đình Trọng',
      role: 'Region Admin',
      unit: 'Ban Điều Hành Vùng Miền Nam',
      avatar: 'RG',
      scopeTitle: 'Vùng Miền Nam • 2,500 Quota • 3 Chi Nhánh',
      scopeClass: 'role-scope-badge-region',
      defaultView: 'region_cockpit',
      allowedUnits: [
        { id: 'ALL', label: 'Toàn bộ Vùng Miền Nam' },
        { id: 'HCM01', label: 'Chi nhánh HCM 01 - Tân Bình' },
        { id: 'HCM02', label: 'Chi nhánh HCM 02 - Phú Nhuận' },
        { id: 'DNG01', label: 'Chi nhánh Đồng Nai' }
      ]
    },
    branch_admin: {
      name: 'Lê Hoàng Nam',
      role: 'Branch Admin',
      unit: 'Chi nhánh HCM 01 - Tân Bình',
      avatar: 'B1',
      scopeTitle: 'Chi Nhánh HCM 01 • 300 Quota • 281 Nhân Sự',
      scopeClass: 'role-scope-badge-branch',
      defaultView: 'branch_cockpit',
      allowedUnits: [
        { id: 'HCM01', label: 'Chi nhánh HCM 01 - Tân Bình (Phạm vi được phân công)' }
      ]
    },
    sales_rep: {
      name: 'Nguyễn Văn A',
      role: 'Sales Representative',
      unit: 'Chi nhánh HCM 01 - Tân Bình',
      avatar: 'SA',
      scopeTitle: 'TK: ZENT-001293 • 48 Khách Hàng • Active',
      scopeClass: 'role-scope-badge-sales',
      defaultView: 'sales_workspace',
      allowedUnits: [
        { id: 'MY_PORTFOLIO', label: 'Danh mục khách hàng của tôi' }
      ]
    },
    legal_audit: {
      name: 'Đỗ Hoàng Mai',
      role: 'Legal & Internal Audit',
      unit: 'Ban Pháp Chế & KSNB FPT',
      avatar: 'LA',
      scopeTitle: 'Kiểm Toán Toàn Hệ Thống • 100% Masked Data',
      scopeClass: 'role-scope-badge-legal',
      defaultView: 'compliance_cockpit',
      allowedUnits: [
        { id: 'ALL', label: 'Toàn bộ sự kiện kiểm toán hệ thống' },
        { id: 'REG_SOUTH', label: 'Vùng Miền Nam' },
        { id: 'REG_NORTH', label: 'Vùng Miền Bắc' },
        { id: 'REG_CENTRAL', label: 'Vùng Miền Trung' }
      ]
    }
  };

  // Dynamic Navigation Map per Role (Professional Enterprise Vietnamese Titles)
  const ROLE_NAVIGATION = {
    super_admin: [
      {
        title: 'ĐIỀU HÀNH TOÀN QUỐC',
        items: [
          { id: 'super_telemetry', label: 'Bảng Điều Hành Toàn Quốc', icon: '' },
          { id: 'quota_hq_pool', label: 'Quản Trị Kho Quota Tổng (4,500)', icon: '' },
          { 
            id: 'hq_quota_approval_queue', 
            label: 'Phê Duyệt Đề Xuất Vùng', 
            icon: '',
            getBadge: () => {
              const pending = (state.quotaRequests || []).filter(r => r.requestType === 'RegionToHq' && r.status === 'Pending').length;
              return pending > 0 ? `${pending} Chờ Duyệt` : null;
            }
          },
          { id: 'org_hierarchy', label: 'Sơ Đồ Cơ Cấu Tổ Chức 3 Cấp', icon: '' }
        ]
      },
      {
        title: 'NHÂN SỰ & QUẢN TRỊ VĨ MÔ',
        items: [
          { id: 'national_employees', label: 'Danh Bạ Nhân Sự (4,120)', icon: '', badge: '4,120' },
          { id: 'enterprise_policies', label: 'Chính Sách & Quy Định Vận Hành', icon: '️' },
          { id: 'super_audit', label: 'Báo Cáo Kiểm Soát Vĩ Mô', icon: '' }
        ]
      }
    ],
    region_admin: [
      {
        title: 'CHỈ HUY VÙNG MIỀN NAM',
        items: [
          { id: 'region_cockpit', label: 'Trung Tâm Chỉ Huy Vùng', icon: '' },
          { id: 'branch_quota_balancer', label: 'Điều Tiết Quota Nội Bộ Vùng', icon: '' },
          { 
            id: 'quota_approval_queue', 
            label: 'Phê Duyệt Đề Xuất Quota', 
            icon: '', 
            getBadge: () => {
              const pending = state.quotaRequests.filter(r => r.regionId === 'REG_SOUTH' && r.status === 'Pending').length;
              return pending > 0 ? `${pending} Yêu Cầu` : null;
            }
          }
        ]
      },
      {
        title: 'VẬN HÀNH LIÊN CHI NHÁNH',
        items: [
          { id: 'regional_staff', label: 'Nhân Sự Vùng (2,450)', icon: '', badge: '2,450' },
          { id: 'cross_branch_handover', label: 'Điều Chuyển Liên Chi Nhánh', icon: '' }
        ]
      }
    ],
    branch_admin: [
      {
        title: 'TÁC NGHIỆP CHI NHÁNH HCM 01',
        items: [
          { id: 'branch_cockpit', label: 'Bàn Điều Hành Chi Nhánh', icon: '' },
          { 
            id: 'staff_account_allocation', 
            label: 'Cấp Phát & Quản Lý Tài Khoản', 
            icon: '', 
            getBadge: () => {
              const unassigned = state.employees.filter(e => e.branchId === 'HCM01' && !e.accountId).length;
              return unassigned > 0 ? `${unassigned} Chờ Cấp` : null;
            }
          },
          { 
            id: 'activation_queue', 
            label: 'Theo Dõi Kích Hoạt (Hạn 72h)', 
            icon: '',
            getBadge: () => `${state.activationQueue.length}`
          }
        ]
      },
      {
        title: 'KHÁCH HÀNG & HẠN NGẠCH',
        items: [
          { 
            id: 'customer_handover_center', 
            label: 'Trung Tâm Bàn Giao Khách Hàng', 
            icon: '',
            getBadge: () => `${state.handoverQueue.length} Chờ Duyệt`
          },
          { id: 'branch_quota_requisition', label: 'Hạn Ngạch & Đề Xuất Xin Quota', icon: '' }
        ]
      }
    ],
    sales_rep: [
      {
        title: 'KHÔNG GIAN LÀM VIỆC DOANH NGHIỆP',
        items: [
          { id: 'sales_workspace', label: 'Trò Chuyện Khách Hàng (Z-Enterprise)', icon: '' },
          { id: 'my_customers', label: 'Danh Mục Khách Hàng (48 KH)', icon: '', badge: '48 Khách' }
        ]
      },
      {
        title: 'TÀI KHOẢN & LỊCH SỬ',
        items: [
          { id: 'account_devices', label: 'Hồ Sơ Doanh Nghiệp FPT', icon: '' },
          { id: 'handover_history', label: 'Lịch Sử Tiếp Quản Danh Bạ', icon: '' }
        ]
      }
    ],
    legal_audit: [
      {
        title: 'KIỂM SOÁT NỘI BỘ & TUÂN THỦ',
        items: [
          { id: 'compliance_cockpit', label: 'Giám Sát Tuân Thủ & Rủi Ro Dữ Liệu', icon: '' },
          { id: 'audit_trail', label: 'Sổ Nhật Ký Kiểm Toán (Bất Biến)', icon: '', getBadge: () => `${state.auditLogs.length}` }
        ]
      },
      {
        title: 'BẢO VỆ TÀI SẢN & BẢO MẬT',
        items: [
          { id: 'customer_asset_protection', label: 'Giám Sát Toàn Vẹn Tài Sản KH', icon: '' },
          { id: 'elevated_access_logs', label: 'Quyền Quản Trị & Can Thiệp Khẩn Cấp', icon: '' }
        ]
      }
    ]
  };

  // =========================================================================
  // 3. UTILITIES & HELPERS
  // =========================================================================
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '' : type === 'warning' ? '' : type === 'danger' ? '' : 'ℹ️';
    toast.innerHTML = `<span style="font-weight:700;">${icon}</span> <div>${message}</div>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 4000);
  }

  function addAuditLog(actor, action, target, org, result = 'Thành Công') {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const timestamp = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    state.auditLogs.unshift({ timestamp, actor, action, target, org, result });
  }

  function openModal(title, bodyHtml, footerHtml) {
    const backdrop = document.getElementById('modal-generic');
    const titleEl = document.getElementById('modal-generic-title');
    const bodyEl = document.getElementById('modal-generic-body');
    const footerEl = document.getElementById('modal-generic-footer');
    if (!backdrop) return;
    titleEl.textContent = title;
    bodyEl.innerHTML = bodyHtml;
    footerEl.innerHTML = footerHtml;
    backdrop.classList.add('active');
  }

  function closeModal() {
    const backdrop = document.getElementById('modal-generic');
    if (backdrop) backdrop.classList.remove('active');
  }

  // Real Mock CSV Downloader (No fake toasts for export actions)
  function downloadMockCsv(filename, rows) {
    const csvContent = "data:text/csv;charset=utf-8,﻿" + rows.map(e => e.map(x => `"${String(x).replace(/"/g, '""')}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast(`Đã xuất và tải xuống tệp dữ liệu ${filename} thành công!`, 'success');
  }

  // =========================================================================
  // DYNAMIC QUOTA CALCULATION ENGINE (Single Source of Truth - 100% Invariants)
  // =========================================================================
  function getHqMetrics() {
    const corp = state.orgTree[0];
    const south = corp.children.find(r => r.id === 'REG_SOUTH') || { allocated: 2500, available: 100 };
    const north = corp.children.find(r => r.id === 'REG_NORTH') || { allocated: 1200, available: 200 };
    const central = corp.children.find(r => r.id === 'REG_CENTRAL') || { allocated: 400, available: 100 };
    const totalAllocated = south.allocated + north.allocated + central.allocated;
    const hqReserve = 4500 - totalAllocated;
    state.companyQuota.allocatedToRegions = totalAllocated;
    state.companyQuota.availableCompany = hqReserve;
    corp.assigned = totalAllocated;
    corp.available = hqReserve;

    let totalActive = 0;
    corp.children.forEach(r => {
      r.children.forEach(b => {
        totalActive += b.assigned;
      });
    });

    return {
      totalContract: 4500,
      allocatedToRegions: totalAllocated,
      availableCompany: hqReserve,
      totalActiveAccounts: totalActive,
      totalEmployees: 4120,
      healthScore: 96
    };
  }

  function getRegionMetrics(regionId = 'REG_SOUTH') {
    const corp = state.orgTree[0];
    const region = corp.children.find(r => r.id === regionId);
    if (!region) return { allocated: 2500, assignedBranches: 2400, reserve: 100, activeAccounts: 2400, totalEmployees: 2450 };
    
    let sumBranchAllocated = 0;
    let sumBranchAssigned = 0;
    region.children.forEach(b => {
      sumBranchAllocated += b.allocated;
      sumBranchAssigned += b.assigned;
    });

    const reserve = region.allocated - sumBranchAllocated;
    region.available = reserve;

    return {
      allocated: region.allocated,
      assignedBranches: sumBranchAllocated,
      reserve: reserve,
      activeAccounts: sumBranchAssigned,
      totalEmployees: region.employees || 2450
    };
  }

  function getBranchMetrics(branchId = 'HCM01') {
    const south = state.orgTree[0].children[0];
    const branch = south.children.find(b => b.id === branchId) || south.children[0];
    return {
      allocated: branch.allocated,
      assigned: branch.assigned,
      available: branch.available,
      employees: branch.employees || 281
    };
  }

  // =========================================================================
  // 4. ROLE SWITCHER & SIDEBAR PROFILE RENDERING
  // =========================================================================
  function renderRoleBar() {
    const meta = PERSONA_METADATA[state.currentPersona] || PERSONA_METADATA.branch_admin;

    // Update Role Scope Badge in Header
    const scopeBadge = document.getElementById('role-scope-badge');
    if (scopeBadge) {
      scopeBadge.className = `role-scope-indicator ${meta.scopeClass}`;
      scopeBadge.innerHTML = meta.scopeTitle;
    }

    // Update Sidebar Profile Card
    const nameEl = document.getElementById('profile-name');
    const roleEl = document.getElementById('profile-role');
    const unitEl = document.getElementById('profile-unit');
    const avatarEl = document.getElementById('profile-avatar');

    if (nameEl) nameEl.textContent = meta.name;
    if (roleEl) roleEl.textContent = meta.role;
    if (unitEl) unitEl.textContent = meta.unit;
    if (avatarEl) avatarEl.textContent = meta.avatar;

    // Populate Dynamic Scope Units in Advanced Filter
    const filterUnitSelect = document.getElementById('filter-scope-unit');
    if (filterUnitSelect) {
      filterUnitSelect.innerHTML = meta.allowedUnits.map(u => `
        <option value="${u.id}" ${state.filters.scopeUnit === u.id ? 'selected' : ''}>${u.label}</option>
      `).join('');
    }
  }

  // =========================================================================
  // 5. SIDEBAR NAVIGATION RENDERING
  // =========================================================================
  function renderNav() {
    const navContainer = document.getElementById('sidebar-nav');
    if (!navContainer) return;

    const sections = ROLE_NAVIGATION[state.currentPersona] || ROLE_NAVIGATION.branch_admin;

    let html = '';
    sections.forEach(sec => {
      html += `<div class="nav-section-title">${sec.title}</div>`;
      sec.items.forEach(item => {
        const isActive = state.activeView === item.id ? 'active' : '';
        let badgeText = null;
        if (typeof item.getBadge === 'function') {
          badgeText = item.getBadge();
        } else if (item.badge) {
          badgeText = item.badge;
        }

        const badgeHtml = badgeText ? `<span class="badge badge-warning">${badgeText}</span>` : '';
        html += `
          <div class="nav-item ${isActive}" data-view="${item.id}">
            <span>${item.label}</span>
            ${badgeHtml}
          </div>
        `;
      });
    });

    navContainer.innerHTML = html;

    navContainer.querySelectorAll('.nav-item').forEach(el => {
      el.addEventListener('click', () => {
        state.activeView = el.dataset.view;
        renderApp();
      });
    });
  }

  // =========================================================================
  // 6. ADVANCED MULTI-CRITERIA FILTER COMPONENT
  // =========================================================================
  function renderFilterPanel() {
    const panel = document.getElementById('advanced-filter-panel');
    const dot = document.getElementById('filter-indicator-dot');
    const summary = document.getElementById('filter-active-summary');

    if (!panel) return;
    panel.style.display = state.isFilterOpen ? 'block' : 'none';

    // Check if any filter is active
    const f = state.filters;
    const hasActiveFilters = f.scopeUnit !== 'ALL' || f.status !== 'ALL' || f.quotaHealth !== 'ALL' || f.timeRange !== 'ALL' || f.keyword.trim() !== '';

    if (dot) dot.style.display = hasActiveFilters ? 'inline' : 'none';

    if (summary) {
      if (hasActiveFilters) {
        let details = [];
        if (f.scopeUnit !== 'ALL') details.push(`Đơn vị: ${f.scopeUnit}`);
        if (f.status !== 'ALL') details.push(`Trạng thái: ${f.status}`);
        if (f.quotaHealth !== 'ALL') details.push(`Quota: ${f.quotaHealth}`);
        if (f.timeRange !== 'ALL') details.push(`Thời gian: ${f.timeRange}`);
        if (f.keyword.trim() !== '') details.push(`Từ khóa: "${f.keyword.trim()}"`);
        summary.innerHTML = `<span class="filter-active-badge">Đang lọc</span> ${details.join(' • ')}`;
      } else {
        summary.innerHTML = `<span>Tiêu chí: Chưa kích hoạt bộ lọc (Hiển thị đầy đủ theo phân quyền vai trò)</span>`;
      }
    }
  }

  // Apply filters on employees
  function getFilteredEmployees() {
    let list = [...state.employees];
    const f = state.filters;

    // Scope boundary filter
    if (state.currentPersona === 'branch_admin') {
      list = list.filter(e => e.branchId === 'HCM01');
    } else if (state.currentPersona === 'region_admin') {
      list = list.filter(e => e.regionId === 'REG_SOUTH');
    } else if (state.currentPersona === 'sales_rep') {
      list = list.filter(e => e.id === 'EMP-00128');
    }

    // Advanced unit filter
    if (f.scopeUnit !== 'ALL') {
      list = list.filter(e => e.branchId === f.scopeUnit || e.regionId === f.scopeUnit);
    }

    // Status filter
    if (f.status !== 'ALL') {
      if (f.status === 'Active') list = list.filter(e => e.accountStatus === 'Active' && !e.jobStatus.includes('Leaving'));
      else if (f.status === 'Suspended') list = list.filter(e => e.accountStatus === 'Suspended');
      else if (f.status === 'Pending Activation') list = list.filter(e => e.accountStatus === 'Pending Activation');
      else if (f.status === 'Unassigned') list = list.filter(e => e.accountStatus === 'Unassigned');
      else if (f.status === 'Leaving') list = list.filter(e => e.jobStatus.includes('Leaving'));
      else if (f.status === 'Terminated') list = list.filter(e => e.jobStatus.includes('Terminated'));
    }

    // Quota health filter
    if (f.quotaHealth !== 'ALL') {
      if (f.quotaHealth === 'zero') {
        list = list.filter(e => !e.accountId || e.branchId === 'HCM02');
      } else if (f.quotaHealth === 'warning') {
        list = list.filter(e => e.accountStatus === 'Suspended' || e.jobStatus.includes('Leaving') || e.accountStatus === 'Pending Activation');
      } else if (f.quotaHealth === 'abundant') {
        list = list.filter(e => e.accountStatus === 'Active' && !e.jobStatus.includes('Leaving'));
      }
    }

    // Time range filter
    if (f.timeRange !== 'ALL') {
      if (f.timeRange === '24H') {
        list = list.filter(e => e.lastActivity.includes('phút') || e.lastActivity.includes('giờ') || e.lastActivity === 'Vừa xong');
      } else if (f.timeRange === '7D') {
        list = list.filter(e => !e.lastActivity.includes('N/A'));
      }
    }

    // Keyword filter
    if (f.keyword.trim() !== '') {
      const q = f.keyword.toLowerCase();
      list = list.filter(e => 
        e.name.toLowerCase().includes(q) || 
        e.email.toLowerCase().includes(q) || 
        (e.accountId && e.accountId.toLowerCase().includes(q))
      );
    }

    return list;
  }

  // =========================================================================
  // 7. VIEW DISPATCHER
  // =========================================================================
  function renderActiveView() {
    const mainViewport = document.getElementById('main-content-body');
    const headerTitle = document.getElementById('header-title');
    const headerDesc = document.getElementById('header-desc');
    const headerActions = document.getElementById('header-actions');
    if (!mainViewport || !headerTitle) return;

    headerActions.innerHTML = '';

    switch (state.activeView) {
      // Super Admin Views
      case 'super_telemetry':
        renderSuperTelemetryView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'hq_quota_approval_queue':
        renderHqQuotaApprovalQueueView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'quota_hq_pool':
        renderQuotaHqPoolView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'org_hierarchy':
        renderOrgHierarchyView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'national_employees':
        renderNationalEmployeesView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'enterprise_policies':
        renderEnterprisePoliciesView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'super_audit':
        renderSuperAuditView(mainViewport, headerTitle, headerDesc, headerActions);
        break;

      // Region Admin Views
      case 'region_cockpit':
        renderRegionCockpitView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'branch_quota_balancer':
        renderBranchQuotaBalancerView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'quota_approval_queue':
        renderQuotaApprovalQueueView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'regional_staff':
        renderRegionalStaffView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'cross_branch_handover':
        renderCrossBranchHandoverView(mainViewport, headerTitle, headerDesc, headerActions);
        break;

      // Branch Admin Views
      case 'branch_cockpit':
        renderBranchCockpitView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'staff_account_allocation':
        renderStaffAccountAllocationView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'activation_queue':
        renderActivationQueueView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'customer_handover_center':
        renderCustomerHandoverCenterView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'branch_quota_requisition':
        renderBranchQuotaRequisitionView(mainViewport, headerTitle, headerDesc, headerActions);
        break;

      // Sales Representative Views
      case 'sales_workspace':
        renderSalesWorkspaceView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'my_customers':
        renderMyCustomersView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'account_devices':
        renderAccountDevicesView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'handover_history':
        renderHandoverHistoryView(mainViewport, headerTitle, headerDesc, headerActions);
        break;

      // Legal & Internal Audit Views
      case 'compliance_cockpit':
        renderComplianceCockpitView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'audit_trail':
        renderAuditTrailView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'customer_asset_protection':
        renderCustomerAssetProtectionView(mainViewport, headerTitle, headerDesc, headerActions);
        break;
      case 'elevated_access_logs':
        renderElevatedAccessLogsView(mainViewport, headerTitle, headerDesc, headerActions);
        break;

      default:
        mainViewport.innerHTML = `<div class="callout callout-info">Phân hệ đang được tải hoặc không thuộc quyền hạn vai trò hiện tại.</div>`;
    }
  }

  // =========================================================================
  // VIEW: SUPER ADMIN — BẢNG ĐIỀU HÀNH TOÀN QUỐC
  // =========================================================================
  // =========================================================================
  // VIEW: SUPER ADMIN — BẢNG ĐIỀU HÀNH TOÀN QUỐC
  // =========================================================================
  function renderSuperTelemetryView(container, title, desc, actions) {
    title.textContent = 'Bảng Điều Hành Toàn Quốc (National Telemetry)';
    desc.textContent = 'Giám sát vĩ mô 4,500 Quota Enterprise, xếp hạng thi đua 3 Vùng kinh doanh và cảnh báo rủi ro toàn mạng lưới.';

    actions.innerHTML = `
      <button class="btn btn-secondary btn-sm" id="btn-hq-export-report">Xuất Báo Cáo Vĩ Mô</button>
      <button class="btn btn-primary btn-sm" id="btn-hq-allocate-quota">+ Điều Phối Quota Vùng</button>
    `;

    container.innerHTML = `
      <!-- KPI Row (Modern Morphic Cards) -->
      <div class="metric-grid">
        <div class="metric-card">
          <div class="metric-label">Tổng Hạn Ngạch Toàn Quốc</div>
          <div class="metric-value">4,500</div>
          <div class="metric-sub">Hợp đồng bản quyền Zalo cấp tập trung</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Đã Cấp Xuống 3 Vùng</div>
          <div class="metric-value">${state.companyQuota.allocatedToRegions}</div>
          <div class="metric-sub">Tỷ lệ phân bổ: ${((state.companyQuota.allocatedToRegions / state.companyQuota.totalContract) * 100).toFixed(1)}%</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Hạn Ngạch Dự Phòng HQ</div>
          <div class="metric-value" style="color: var(--primary);">${state.companyQuota.availableCompany}</div>
          <div class="metric-sub">Sẵn sàng điều tiết theo nhu cầu chiến lược</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Tài Khoản Đang Hoạt Động</div>
          <div class="metric-value" style="color: var(--success-solid);">3,890</div>
          <div class="metric-sub">Tài khoản đang hoạt động đồng bộ</div>
        </div>
      </div>

      <!-- EXECUTIVE LEVEL DRILL-DOWN SELECTOR -->
      <div class="drilldown-nav-container">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 13px;"></span>
          <strong style="font-size: 12px; color: var(--text-primary);">Chế Độ Giám Sát Cấp Bậc (HQ Drill-Down):</strong>
          <span style="font-size: 11.5px; color: var(--text-muted);">Quan sát chi tiết từ cấp Vùng xuống từng Chi nhánh</span>
        </div>
        <div class="drilldown-pills">
          <button class="drilldown-pill ${state.superAdminDrilldown === 'ALL' ? 'active' : ''}" data-drilldown="ALL">Toàn Cảnh 3 Vùng</button>
          <button class="drilldown-pill ${state.superAdminDrilldown === 'REG_SOUTH' ? 'active' : ''}" data-drilldown="REG_SOUTH">Vùng Miền Nam (3 Chi Nhánh - Cảnh Báo)</button>
          <button class="drilldown-pill ${state.superAdminDrilldown === 'REG_NORTH' ? 'active' : ''}" data-drilldown="REG_NORTH">Vùng Miền Bắc (2 Chi Nhánh)</button>
          <button class="drilldown-pill ${state.superAdminDrilldown === 'REG_CENTRAL' ? 'active' : ''}" data-drilldown="REG_CENTRAL">Vùng Miền Trung (1 Chi Nhánh)</button>
        </div>
      </div>

      ${state.superAdminDrilldown === 'ALL' ? `
        <!-- VISUAL CHART: SO SÁNH NĂNG LỰC & KHAI THÁC 3 VÙNG (SVG MORPHIC CHART) -->
        <div class="executive-chart-card">
          <div class="chart-header-row">
            <div>
              <strong style="font-size: 13.5px; color: var(--text-primary);">Biểu Đồ Tương Quan Hạn Ngạch & Khai Thác 3 Vùng Kinh Doanh</strong>
              <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">Trực quan hóa Hạn ngạch cấp, Tài khoản đang Active và Dung lượng dự phòng</div>
            </div>
            <div class="chart-legend">
              <div class="legend-item"><div class="legend-dot" style="background: #2563eb;"></div><span>Hạn Ngạch Được Cấp</span></div>
              <div class="legend-item"><div class="legend-dot" style="background: #10b981;"></div><span>Đang Hoạt Động (Active)</span></div>
              <div class="legend-item"><div class="legend-dot" style="background: #8b5cf6;"></div><span>Dự Phòng Vùng</span></div>
            </div>
          </div>

          <div style="width: 100%; height: 160px; overflow: hidden;">
            <svg viewBox="0 0 700 150" style="width: 100%; height: 100%;">
              <!-- Grid Lines -->
              <line x1="120" y1="20" x2="680" y2="20" stroke="#f1f5f9" stroke-dasharray="4" />
              <line x1="120" y1="65" x2="680" y2="65" stroke="#f1f5f9" stroke-dasharray="4" />
              <line x1="120" y1="110" x2="680" y2="110" stroke="#f1f5f9" stroke-dasharray="4" />
              <line x1="120" y1="135" x2="680" y2="135" stroke="#cbd5e1" stroke-width="1.5" />

              <!-- Row 1: Vùng Miền Nam -->
              <text x="110" y="38" text-anchor="end" font-size="11.5" font-weight="600" fill="#334155">Vùng Miền Nam</text>
              <rect x="120" y="24" width="500" height="7" rx="3" fill="#2563eb" />
              <rect x="120" y="34" width="480" height="7" rx="3" fill="#10b981" />
              <rect x="120" y="44" width="20" height="7" rx="3" fill="#8b5cf6" />
              <text x="630" y="38" font-size="11" font-weight="700" fill="#dc2626">2,400 / 2,500 (96%)</text>

              <!-- Row 2: Vùng Miền Bắc -->
              <text x="110" y="78" text-anchor="end" font-size="11.5" font-weight="600" fill="#334155">Vùng Miền Bắc</text>
              <rect x="120" y="64" width="240" height="7" rx="3" fill="#2563eb" />
              <rect x="120" y="74" width="197" height="7" rx="3" fill="#10b981" />
              <rect x="120" y="84" width="43" height="7" rx="3" fill="#8b5cf6" />
              <text x="370" y="78" font-size="11" font-weight="700" fill="#059669">984 / 1,200 (82%)</text>

              <!-- Row 3: Vùng Miền Trung -->
              <text x="110" y="118" text-anchor="end" font-size="11.5" font-weight="600" fill="#334155">Vùng Miền Trung</text>
              <rect x="120" y="104" width="160" height="7" rx="3" fill="#2563eb" />
              <rect x="120" y="114" width="114" height="7" rx="3" fill="#10b981" />
              <rect x="120" y="124" width="46" height="7" rx="3" fill="#8b5cf6" />
              <text x="290" y="118" font-size="11" font-weight="700" fill="#2563eb">568 / 800 (71%)</text>
            </svg>
          </div>
        </div>

        <!-- BENCHMARK SCORECARD: BẢNG XẾP HẠNG & SỨC KHỎE VẬN HÀNH 3 VÙNG -->
        <div class="table-container">
          <div class="table-toolbar">
            <div style="display: flex; align-items: center; gap: 8px;">
              <strong>Bảng Xếp Hạng & Sức Khỏe Vận Hành 3 Vùng Kinh Doanh</strong>
              <span class="badge badge-primary">Tiêu chí: Quota, Tốc độ kích hoạt, Tuân thủ Masking & Sự cố</span>
            </div>
            <span class="badge badge-neutral">Đánh Giá Toàn Diện HQ</span>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 70px;">Hạng</th>
                <th>Vùng Kinh Doanh</th>
                <th>Hạn Ngạch / Khai Thác</th>
                <th>Kích Hoạt < 24h</th>
                <th>Masking SĐT</th>
                <th>Sự Cố Vận Hành</th>
                <th>Điểm Sức Khỏe</th>
                <th>Đánh Giá HQ</th>
                <th style="text-align: right;">Thao Tác HQ</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: #f0fdf4;">
                <td><span class="rank-badge rank-badge-1">Hạng 1</span></td>
                <td>
                  <div style="font-weight: 700; color: var(--text-primary);">Vùng Miền Trung (Central)</div>
                  <div style="font-size: 11px; color: var(--text-muted);">1 Chi nhánh • 650 Nhân sự</div>
                </td>
                <td>
                  <div><strong>568 / 800</strong> <span style="color: var(--primary); font-weight: 600;">(71.0%)</span></div>
                  <div style="font-size: 11px; color: var(--text-muted);">Dự phòng: 232 Quota</div>
                </td>
                <td><span style="font-weight: 700; color: #059669;">98.2%</span></td>
                <td><span class="badge badge-success">100% Tuyệt Đối</span></td>
                <td><span style="color: #059669; font-weight: 600;">0 Sự cố</span></td>
                <td><span class="health-score-capsule health-score-high">96 / 100</span></td>
                <td><span class="badge badge-success">Tối Ưu & Dồi Dào Quota</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-secondary btn-sm btn-drilldown-region" data-target="REG_CENTRAL">Soi Chi Nhánh</button>
                </td>
              </tr>

              <tr>
                <td><span class="rank-badge rank-badge-2">Hạng 2</span></td>
                <td>
                  <div style="font-weight: 700; color: var(--text-primary);">Vùng Miền Bắc (North)</div>
                  <div style="font-size: 11px; color: var(--text-muted);">2 Chi nhánh • 1,020 Nhân sự</div>
                </td>
                <td>
                  <div><strong>984 / 1,200</strong> <span style="color: #059669; font-weight: 600;">(82.0%)</span></div>
                  <div style="font-size: 11px; color: var(--text-muted);">Dự phòng: 216 Quota</div>
                </td>
                <td><span style="font-weight: 700; color: #059669;">92.5%</span></td>
                <td><span class="badge badge-success">100% Tuyệt Đối</span></td>
                <td><span style="color: #059669; font-weight: 600;">0 Sự cố</span></td>
                <td><span class="health-score-capsule health-score-med">89 / 100</span></td>
                <td><span class="badge badge-neutral">Vận Hành Chuẩn Mực</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-secondary btn-sm btn-drilldown-region" data-target="REG_NORTH">Soi Chi Nhánh</button>
                </td>
              </tr>

              <tr style="background: #fff5f5;">
                <td><span class="rank-badge rank-badge-danger">Hạng 3</span></td>
                <td>
                  <div style="font-weight: 700; color: var(--danger-solid);">Vùng Miền Nam (South)</div>
                  <div style="font-size: 11px; color: var(--text-muted);">3 Chi nhánh • 2,450 Nhân sự</div>
                </td>
                <td>
                  <div><strong>2,400 / 2,500</strong> <span style="color: var(--danger-solid); font-weight: 700;">(96.0%)</span></div>
                  <div style="font-size: 11px; color: var(--danger-solid); font-weight: 600;">Dự phòng chỉ còn: 100</div>
                </td>
                <td><span style="font-weight: 700; color: #d97706;">86.4%</span></td>
                <td><span class="badge badge-success">100% Tuyệt Đối</span></td>
                <td><span class="badge badge-danger">1 Chi nhánh Zero Quota (HCM 02)</span></td>
                <td><span class="health-score-capsule health-score-low">74 / 100</span></td>
                <td><span class="badge badge-danger">Quá Tải - Cần Cấp Thêm Quota</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-primary btn-sm btn-drilldown-region" data-target="REG_SOUTH">Soi 3 Chi Nhánh </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ` : state.superAdminDrilldown === 'REG_SOUTH' ? `
        <!-- DRILLDOWN VIEW: VÙNG MIỀN NAM & 3 CHI NHÁNH TRỰC THUỘC -->
        <div class="executive-chart-card">
          <div class="chart-header-row">
            <div>
              <div style="font-weight: 700; font-size: 14px; color: var(--danger-solid); display: flex; align-items: center; gap: 8px;">
                Soi Chi Tiết Vùng Miền Nam — 3 Chi Nhánh Trực Thuộc
                <span class="badge badge-danger">Cảnh Báo Zero Quota</span>
              </div>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                Hạn ngạch Vùng: 2,500 Quota • Đã dùng: 2,400 (96%) • Dự phòng Vùng còn: 100 Quota
              </div>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-secondary btn-sm" onclick="state.superAdminDrilldown='ALL'; renderActiveView();">Quay Lại Toàn Cảnh</button>
              <button class="btn btn-primary btn-sm" onclick="openAllocateHqQuotaModal()">+ Bơm 150 Quota Cho Vùng</button>
            </div>
          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th>Chi Nhánh Trực Thuộc</th>
                <th>Hạn Ngạch Cấp</th>
                <th>Đã Gán</th>
                <th>Khả Dụng</th>
                <th>Tổng Nhân Sự</th>
                <th>Chưa Có Tài Khoản</th>
                <th>Điểm Sức Khỏe</th>
                <th>Đánh Giá Vùng</th>
                <th style="text-align: right;">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: #f0fdf4;">
                <td>
                  <strong>Chi nhánh HCM 01 - Tân Bình</strong>
                  <div style="font-size: 11px; color: var(--text-muted);">Trưởng CN: Lê Hoàng Nam</div>
                </td>
                <td>300</td>
                <td>276</td>
                <td><strong style="color: #059669;">24</strong></td>
                <td>281</td>
                <td>5 người</td>
                <td><span class="health-score-capsule health-score-high">94 / 100</span></td>
                <td><span class="badge badge-success">Vận Hành Tốt Nhất</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-secondary btn-sm" onclick="showToast('Chi nhánh HCM 01 đang duy trì 24 Quota tự do ổn định', 'info')">Chi Tiết</button>
                </td>
              </tr>

              <tr style="background: #fff5f5;">
                <td>
                  <strong style="color: var(--danger-solid);">Chi nhánh HCM 02 - Phú Nhuận</strong>
                  <div style="font-size: 11px; color: var(--danger-solid);">Trưởng CN: Nguyễn Bích Thủy</div>
                </td>
                <td>200</td>
                <td>200</td>
                <td><strong style="color: var(--danger-solid);">0 (HẾT)</strong></td>
                <td>205</td>
                <td><strong style="color: var(--danger-solid);">5 người (Tắc nghẽn)</strong></td>
                <td><span class="health-score-capsule health-score-low">58 / 100</span></td>
                <td><span class="badge badge-danger">Báo Động Đỏ (Zero Quota)</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-primary btn-sm" onclick="openAllocateHqQuotaModal()">Bơm Quota Cấp Cứu</button>
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Chi nhánh Đồng Nai</strong>
                  <div style="font-size: 11px; color: var(--text-muted);">Trưởng CN: Phạm Thành Long</div>
                </td>
                <td>150</td>
                <td>135</td>
                <td><strong style="color: #059669;">15</strong></td>
                <td>140</td>
                <td>5 người</td>
                <td><span class="health-score-capsule health-score-med">90 / 100</span></td>
                <td><span class="badge badge-neutral">Ổn Định</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-secondary btn-sm" onclick="showToast('Chi nhánh Đồng Nai còn 15 Quota dự phòng', 'info')">Chi Tiết</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ` : state.superAdminDrilldown === 'REG_NORTH' ? `
        <!-- DRILLDOWN VIEW: VÙNG MIỀN BẮC -->
        <div class="executive-chart-card">
          <div class="chart-header-row">
            <div>
              <div style="font-weight: 700; font-size: 14px; color: var(--primary);">Soi Chi Tiết Vùng Miền Bắc — 2 Chi Nhánh Trực Thuộc</div>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Hạn ngạch: 1,200 • Đã dùng: 984 (82%) • Dự phòng: 216 Quota</div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="state.superAdminDrilldown='ALL'; renderActiveView();">Quay Lại Toàn Cảnh</button>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Chi Nhánh</th><th>Hạn Ngạch</th><th>Đã Gán</th><th>Khả Dụng</th><th>Nhân Sự</th><th>Điểm Sức Khỏe</th><th>Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Hà Nội 01 - Cầu Giấy</strong></td><td>250</td><td>220</td><td><strong style="color:#059669;">30</strong></td><td>230</td><td><span class="health-score-capsule health-score-high">92 / 100</span></td><td><span class="badge badge-success">Tốt</span></td>
              </tr>
              <tr>
                <td><strong>Hải Phòng</strong></td><td>150</td><td>130</td><td><strong style="color:#059669;">20</strong></td><td>135</td><td><span class="health-score-capsule health-score-med">88 / 100</span></td><td><span class="badge badge-neutral">Ổn Định</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      ` : `
        <!-- DRILLDOWN VIEW: VÙNG MIỀN TRUNG -->
        <div class="executive-chart-card">
          <div class="chart-header-row">
            <div>
              <div style="font-weight: 700; font-size: 14px; color: #059669;">Soi Chi Tiết Vùng Miền Trung — Chi Nhánh Trực Thuộc</div>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Hạn ngạch: 800 • Đã dùng: 568 (71%) • Dự phòng: 232 Quota (Tối ưu nhất toàn quốc)</div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="state.superAdminDrilldown='ALL'; renderActiveView();">Quay Lại Toàn Cảnh</button>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Chi Nhánh</th><th>Hạn Ngạch</th><th>Đã Gán</th><th>Khả Dụng</th><th>Nhân Sự</th><th>Điểm Sức Khỏe</th><th>Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Đà Nẵng 01</strong></td><td>200</td><td>170</td><td><strong style="color:#059669;">30</strong></td><td>180</td><td><span class="health-score-capsule health-score-high">96 / 100</span></td><td><span class="badge badge-success">Xuất Sắc</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      `}

      <!-- Regional Breakdown & Macro Alerts -->
      <div style="display: grid; grid-template-columns: 1fr 380px; gap: 20px; margin-bottom: 20px;">
        
        <!-- Regional Quota Progress Bars -->
        <div class="table-container" style="margin-bottom: 0;">
          <div class="table-toolbar">
            <strong>Tiến Độ Tiêu Thụ Hạn Ngạch 3 Vùng</strong>
            <span class="badge badge-neutral">Thời gian thực</span>
          </div>
          <div style="padding: 18px; display: flex; flex-direction: column; gap: 18px;">
            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-weight: 600;">
                <span>Vùng Miền Nam (South Region)</span>
                <span style="color: var(--danger-solid);">2,400 / 2,500 (96%) • Báo Động Quá Tải</span>
              </div>
              <div class="progress-bar-container" style="height: 10px;">
                <div class="progress-bar-fill" style="width: 96%; background-color: var(--warning-solid);"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 11.5px; color: var(--text-muted); margin-top: 4px;">
                <span>Dự phòng Vùng: 100 Quota</span>
                <span>3 Chi nhánh • 2,450 Nhân sự</span>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-weight: 600;">
                <span>Vùng Miền Bắc (North Region)</span>
                <span style="color: var(--success-solid);">984 / 1,200 (82%) • Ổn định</span>
              </div>
              <div class="progress-bar-container" style="height: 10px;">
                <div class="progress-bar-fill" style="width: 82%; background-color: var(--success-solid);"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 11.5px; color: var(--text-muted); margin-top: 4px;">
                <span>Dự phòng Vùng: 216 Quota</span>
                <span>2 Chi nhánh • 1,020 Nhân sự</span>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-weight: 600;">
                <span>Vùng Miền Trung (Central Region)</span>
                <span style="color: var(--primary);">568 / 800 (71%) • Dồi dào</span>
              </div>
              <div class="progress-bar-container" style="height: 10px;">
                <div class="progress-bar-fill" style="width: 71%; background-color: var(--primary);"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 11.5px; color: var(--text-muted); margin-top: 4px;">
                <span>Dự phòng Vùng: 232 Quota</span>
                <span>1 Chi nhánh • 650 Nhân sự</span>
              </div>
            </div>
          </div>
        </div>

        <!-- National Alerts & Forecasting -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          
          <!-- Quota Forecast Card -->
          <div class="forecast-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <strong style="color: #6d28d9; font-size: 12.5px;">Dự Báo Nhu Cầu Quota Quý 4/2026</strong>
              <span class="badge badge-warning">Cần Bổ Sung +500</span>
            </div>
            <div style="font-size: 11.5px; color: #4b5563; line-height: 1.5; margin-bottom: 8px;">
              Tốc độ tuyển dụng tại Vùng Miền Nam tăng 18%/tháng. Dự kiến kho dự phòng HQ (475 Quota) sẽ chạm ngưỡng tới hạn trong 45 ngày tới.
            </div>
            <button class="btn btn-secondary btn-sm" style="width: 100%; border-color: #c4b5fd; color: #6d28d9;" onclick="showToast('Đã gửi đề xuất phê duyệt ngân sách đàm phán thêm 1,000 Quota với Zalo!', 'success')">Đề Xuất Mua Thêm Quota Đối Tác</button>
          </div>

          <!-- National Alerts -->
          <div class="table-container" style="margin-bottom: 0;">
            <div class="table-toolbar">
              <strong>Cảnh Báo Vĩ Mô (National Alerts)</strong>
              <span class="badge badge-warning">${state.alerts.length} Mục</span>
            </div>
            <div style="padding: 14px; display: flex; flex-direction: column; gap: 10px;">
              ${state.alerts.map(a => `
                <div class="attention-card ${a.severity}">
                  <div class="attention-main">
                    <div class="attention-title">
                      <span>${a.severity === 'danger' ? '' : ''}</span>
                      <span>${a.title}</span>
                    </div>
                    <div class="attention-desc">${a.desc}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>
    `;

    document.getElementById('btn-hq-allocate-quota')?.addEventListener('click', () => {
      openAllocateHqQuotaModal();
    });

    document.getElementById('btn-hq-export-report')?.addEventListener('click', () => {
      const rows = [
        ['Khu Vuc / Don Vi', 'Han Ngach Cap', 'Da Phan Bo', 'Du Phong', 'Ty Le Khai Thac', 'Trang Thai'],
        ['Vung Mien Nam', '2500', '2400', '100', '96.0%', 'Thieu hut co so'],
        ['Vung Mien Bac', '1200', '1000', '200', '83.3%', 'Can bang'],
        ['Vung Mien Trung', '400', '300', '100', '75.0%', 'Doi dao'],
        ['Kho Du Phong HQ', '400', '0', '400', '100.0%', 'San sang chien luoc']
      ];
      downloadMockCsv('National_Telemetry_Report_FPT_Telecom.csv', rows);
    });

    // Drilldown navigation pills click handlers
    container.querySelectorAll('.drilldown-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.superAdminDrilldown = btn.dataset.drilldown;
        renderActiveView();
      });
    });

    // Scorecard drilldown buttons
    container.querySelectorAll('.btn-drilldown-region').forEach(btn => {
      btn.addEventListener('click', () => {
        state.superAdminDrilldown = btn.dataset.target;
        renderActiveView();
      });
    });
  }

  // =========================================================================
  // VIEW: SUPER ADMIN — PHÊ DUYỆT ĐỀ XUẤT HẠN NGẠCH VÙNG (HQ APPROVAL QUEUE)
  // =========================================================================
  function renderHqQuotaApprovalQueueView(container, title, desc, actions) {
    title.textContent = 'Phê Duyệt Đề Xuất Hạn Ngạch Vùng (HQ Approval Queue)';
    desc.textContent = 'Tiếp nhận và thẩm định các đề xuất xin cấp thêm Quota từ Ban Điều Hành các Vùng gửi lên Trụ sở HQ.';

    const hqRequests = (state.quotaRequests || []).filter(r => r.requestType === 'RegionToHq');

    actions.innerHTML = `
      <span style="font-size: 11.5px; color: var(--text-muted); align-self: center;">Kho HQ còn: <strong>${state.companyQuota.availableCompany} Quota</strong></span>
    `;

    container.innerHTML = `
      <div class="callout callout-info" style="margin-bottom: 16px;">
        <strong>CHẾ ĐỘ KIỂM SOÁT TUÂN THỦ (PRIVACY LEVEL 5 - FR06):</strong><br>
        Nhật ký kiểm toán vĩ mô ghi nhận toàn bộ biến động Quota, cấp phát tài khoản và thao tác đặc quyền trên phạm vi 3 Vùng & 15 Chi nhánh. Mọi nội dung trao đổi khách hàng được mã hóa, chỉ hiển thị siêu dữ liệu kiểm toán.
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Mã Phiếu</th>
              <th>Đơn Vị Đề Xuất</th>
              <th>Số Lượng Xin</th>
              <th>Lý Do Nghiệp Vụ</th>
              <th>Người Đề Xuất</th>
              <th>Thời Gian</th>
              <th>Trạng Thái</th>
              <th style="text-align: right;">Quyết Định HQ</th>
            </tr>
          </thead>
          <tbody>
            ${hqRequests.map(r => `
              <tr>
                <td><strong>${r.id}</strong></td>
                <td><strong style="color: var(--primary);">${r.regionName}</strong></td>
                <td><strong style="color: var(--warning-text); font-size: 13px;">+${r.requestQty} Quota</strong></td>
                <td style="max-width: 320px;">${r.reason}</td>
                <td>${r.requester}</td>
                <td><code>${r.requestedAt}</code></td>
                <td>
                  <span class="badge ${r.status === 'Approved' ? 'badge-success' : r.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}">
                    ${r.status === 'Pending' ? 'Chờ HQ Duyệt' : r.status === 'Approved' ? 'Đã Cấp' : ' Từ Chối'}
                  </span>
                </td>
                <td style="text-align: right;">
                  ${r.status === 'Pending' ? `
                    <button class="btn btn-primary btn-sm btn-hq-approve-req" data-id="${r.id}">Phê Duyệt (+${r.requestQty})</button>
                    <button class="btn btn-secondary btn-sm btn-hq-reject-req" data-id="${r.id}" style="color: var(--danger-solid);"> Từ Chối</button>
                  ` : `
                    <span style="font-size: 11px; color: var(--text-muted);">Đã xử lý</span>
                  `}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    container.querySelectorAll('.btn-hq-approve-req').forEach(btn => {
      btn.addEventListener('click', () => {
        const reqId = btn.dataset.id;
        const req = state.quotaRequests.find(r => r.id === reqId);
        if (req) {
          if (state.companyQuota.availableCompany < req.requestQty) {
            showToast(`Kho HQ chỉ còn ${state.companyQuota.availableCompany} Quota, không đủ ${req.requestQty}!`, 'danger');
            return;
          }
          state.companyQuota.availableCompany -= req.requestQty;
          state.companyQuota.allocatedToRegions += req.requestQty;
          const reg = state.orgTree[0].children.find(r => r.id === req.regionId);
          if (reg) {
            reg.allocated += req.requestQty;
            reg.available += req.requestQty;
          }
          req.status = 'Approved';
          addAuditLog('Vũ Minh Tuấn (Super Admin)', 'Phê duyệt đề xuất hạn ngạch Vùng', `${req.regionName} (+${req.requestQty} Quota)`, 'Trụ sở HQ');
          showToast(`Đã duyệt cấp ${req.requestQty} Quota từ kho HQ xuống ${req.regionName}!`, 'success');
          renderActiveView();
          renderNav();
        }
      });
    });

    container.querySelectorAll('.btn-hq-reject-req').forEach(btn => {
      btn.addEventListener('click', () => {
        const reqId = btn.dataset.id;
        const req = state.quotaRequests.find(r => r.id === reqId);
        if (req) {
          req.status = 'Rejected';
          addAuditLog('Vũ Minh Tuấn (Super Admin)', 'Từ chối đề xuất hạn ngạch Vùng', `${req.regionName}`, 'Trụ sở HQ');
          showToast(`Đã từ chối đề xuất của ${req.regionName}!`, 'info');
          renderActiveView();
          renderNav();
        }
      });
    });
  }

  // Helper Modal: Cưỡng Chế Thu Hồi Quota (US02 - Pull Reclaim with Reason Constraint)
  function openPullReclaimModal(regionId) {
    const region = state.orgTree[0].children.find(r => r.id === regionId);
    if (!region) return;
    const maxReclaim = region.available;
    openModal(
      `Thu Hồi Quota Về Kho Tổng (Pull Reclaim - US02): ${region.name}`,
      `
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div class="callout callout-info" style="font-size: 11.5px;">
            <strong>Thẩm quyền Super Admin (US02):</strong> Thu hồi Quota dư thừa từ Vùng về Kho dự phòng chiến lược HQ. Hạn ngạch Vùng hiện tại: <strong>${region.allocated}</strong> • Dư thừa khả dụng: <strong style="color:var(--success-solid);">${region.available} Quota</strong>.
          </div>
          <div>
            <label class="form-label">Số Lượng Quota Cần Thu Hồi (Tối đa ${maxReclaim} Quota):</label>
            <input type="number" class="form-input" id="modal-reclaim-qty" value="${Math.min(30, maxReclaim)}" min="1" max="${maxReclaim}">
          </div>
          <div>
            <label class="form-label">Lý Do Nghiệp Vụ Thu Hồi (Bắt buộc tối thiểu 10 ký tự theo AC-03b):</label>
            <textarea class="form-input" id="modal-reclaim-reason" rows="2" placeholder="Ví dụ: Điều chuyển Quota dư thừa quý 3 về kho chiến lược HQ phục vụ dự án mới..."></textarea>
            <div id="reclaim-reason-error" style="display:none; color:var(--danger-solid); font-size:11.5px; margin-top:4px; font-weight:600;"></div>
          </div>
        </div>
      `,
      `
        <button class="btn btn-secondary btn-sm" onclick="closeModal()">Hủy</button>
        <button class="btn btn-warning btn-sm" id="btn-confirm-reclaim">Xác Nhận Thu Hồi</button>
      `
    );

    document.getElementById('btn-confirm-reclaim')?.addEventListener('click', () => {
      const qty = parseInt(document.getElementById('modal-reclaim-qty')?.value) || 0;
      const reason = document.getElementById('modal-reclaim-reason')?.value.trim() || '';
      const errorEl = document.getElementById('reclaim-reason-error');
      if (reason.length < 10) {
        if (errorEl) {
          errorEl.textContent = `Lý do thu hồi bắt buộc tối thiểu 10 ký tự (AC-03b). Hiện có ${reason.length} ký tự.`;
          errorEl.style.display = 'block';
        } else {
          showToast('Lý do thu hồi bắt buộc tối thiểu 10 ký tự!', 'danger');
        }
        return;
      }
      if (qty <= 0 || qty > region.available) {
        showToast(`Số lượng thu hồi vượt quá hạn ngạch dư thừa khả dụng (${region.available} Quota)!`, 'danger');
        return;
      }
      region.allocated -= qty;
      region.available -= qty;
      state.companyQuota.allocatedToRegions -= qty;
      state.companyQuota.availableCompany += qty;
      addAuditLog('Vũ Minh Tuấn (Super Admin)', 'Cưỡng chế thu hồi Quota (US02)', `${region.name} (-${qty} Quota) → Kho HQ - Lý do: ${reason}`, 'Trụ sở HQ');
      closeModal();
      showToast(`Đã thu hồi thành công ${qty} Quota từ ${region.name} về kho dự phòng HQ!`, 'success');
      renderActiveView();
    });
  }

  // =========================================================================
  // VIEW: SUPER ADMIN — QUẢN TRỊ KHO HẠN NGẠCH TỔNG
  // =========================================================================
  function renderQuotaHqPoolView(container, title, desc, actions) {
    title.textContent = 'Quản Trị Kho Quota Tổng (4,500 Quota)';
    desc.textContent = 'Quản lý kho hạn ngạch 4,500 Quota, thực hiện phân bổ xuống Vùng hoặc thu hồi hạn ngạch chưa sử dụng về kho tổng.';

    actions.innerHTML = `
      <button class="btn btn-primary btn-sm" id="btn-open-allocate-hq">+ Phân Bổ Quota Cho Vùng</button>
    `;

    container.innerHTML = `
      <div class="callout callout-info" style="margin-bottom: 16px;">
        <strong>Quy tắc nghiệp vụ:</strong> 1 Quota = 1 Tài khoản Zalo Enterprise. Super Admin sở hữu toàn quyền điều phối hạn ngạch giữa kho dự phòng HQ và 3 Vùng kinh doanh.
      </div>

      <div class="table-container">
        <div class="table-toolbar">
          <strong>Bảng Phân Bổ Hạn Ngạch Theo Vùng (Regional Quota Ledger)</strong>
          <span class="badge badge-neutral">Kho dự phòng HQ: ${state.companyQuota.availableCompany} Quota</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Đơn Vị Vùng</th>
              <th>Hạn Ngạch Cấp</th>
              <th>Đã Phân Bổ Chi Nhánh</th>
              <th>Dự Phòng Vùng</th>
              <th>Tỷ Lệ Đã Gán</th>
              <th>Trạng Thái</th>
              <th style="text-align: right;">Thao Tác HQ</th>
            </tr>
          </thead>
          <tbody>
            ${(() => {
              const south = state.orgTree[0].children.find(r => r.id === 'REG_SOUTH');
              const north = state.orgTree[0].children.find(r => r.id === 'REG_NORTH');
              const central = state.orgTree[0].children.find(r => r.id === 'REG_CENTRAL');
              return `
                <tr>
                  <td><strong>${south.name}</strong></td>
                  <td>${south.allocated}</td>
                  <td>${south.assigned || 2400}</td>
                  <td><span class="badge badge-warning">${south.available}</span></td>
                  <td>${((2400 / south.allocated) * 100).toFixed(1)}%</td>
                  <td><span class="badge ${south.available <= 100 ? 'badge-danger' : 'badge-success'}">${south.available <= 100 ? 'Thiếu hụt Quota cơ sở' : 'Ổn định'}</span></td>
                  <td style="text-align: right;">
                    <button class="btn btn-primary btn-sm btn-quick-add-quota" data-region="REG_SOUTH">+ Cấp Thêm 50</button>
                  </td>
                </tr>
                <tr>
                  <td><strong>${north.name}</strong></td>
                  <td>${north.allocated}</td>
                  <td>${north.assigned || 1000}</td>
                  <td><span class="badge badge-success">${north.available}</span></td>
                  <td>${((1000 / north.allocated) * 100).toFixed(1)}%</td>
                  <td><span class="badge badge-success">Cân bằng</span></td>
                  <td style="text-align: right;">
                    <button class="btn btn-secondary btn-sm btn-quick-reclaim-quota" data-region="REG_NORTH">Thu Hồi Về HQ (US02)</button>
                  </td>
                </tr>
                <tr>
                  <td><strong>${central.name}</strong></td>
                  <td>${central.allocated}</td>
                  <td>${central.assigned || 300}</td>
                  <td><span class="badge badge-success">${central.available}</span></td>
                  <td>${((300 / central.allocated) * 100).toFixed(1)}%</td>
                  <td><span class="badge badge-neutral">Dồi dào</span></td>
                  <td style="text-align: right;">
                    <button class="btn btn-secondary btn-sm btn-quick-reclaim-quota" data-region="REG_CENTRAL">Thu Hồi Về HQ (US02)</button>
                  </td>
                </tr>
              `;
            })()}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('btn-open-allocate-hq')?.addEventListener('click', openAllocateHqQuotaModal);

    container.querySelectorAll('.btn-quick-add-quota').forEach(btn => {
      btn.addEventListener('click', () => {
        const regId = btn.dataset.region || 'REG_SOUTH';
        const targetRegion = state.orgTree[0].children.find(r => r.id === regId);
        if (state.companyQuota.availableCompany < 50) {
          showToast('Kho HQ không đủ 50 Quota dự phòng!', 'danger');
          return;
        }
        state.companyQuota.availableCompany -= 50;
        state.companyQuota.allocatedToRegions += 50;
        if (targetRegion) {
          targetRegion.allocated += 50;
          targetRegion.available += 50;
        }
        addAuditLog('Vũ Minh Tuấn (Super Admin)', 'Cấp thêm Quota vĩ mô', `${targetRegion ? targetRegion.name : regId} (+50 Quota)`, 'Trụ sở HQ');
        showToast(`Đã cấp thêm 50 Quota từ kho HQ xuống ${targetRegion ? targetRegion.name : regId}!`, 'success');
        renderActiveView();
      });
    });

    container.querySelectorAll('.btn-quick-reclaim-quota').forEach(btn => {
      btn.addEventListener('click', () => {
        openPullReclaimModal(btn.dataset.region);
      });
    });
  }

  function openAllocateHqQuotaModal() {
    openModal(
      'Phân Bổ Hạn Ngạch Vĩ Mô (HQ → Vùng)',
      `
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div>
            <label class="form-label">Chọn Vùng Tiếp Nhận:</label>
            <select class="form-input" id="modal-select-region">
              <option value="REG_SOUTH">Vùng Miền Nam (Hiện tại: 2,500 Quota - Dư 100)</option>
              <option value="REG_NORTH">Vùng Miền Bắc (Hiện tại: 1,200 Quota - Dư 216)</option>
              <option value="REG_CENTRAL">Vùng Miền Trung (Hiện tại: 800 Quota - Dư 232)</option>
            </select>
          </div>
          <div>
            <label class="form-label">Số Lượng Quota Phân Bổ (Kho HQ còn ${state.companyQuota.availableCompany}):</label>
            <input type="number" class="form-input" id="modal-qty-quota" value="50" min="5" max="${state.companyQuota.availableCompany}">
          </div>
          <div>
            <label class="form-label">Lý Do Nghiệp Vụ Điều Phối:</label>
            <textarea class="form-input" id="modal-reason-quota" rows="2" placeholder="Ví dụ: Bổ sung hạn ngạch cho chi nhánh trọng điểm mở rộng đội ngũ CSKH..."></textarea>
          </div>
        </div>
      `,
      `
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('modal-generic').classList.remove('active')">Hủy</button>
        <button class="btn btn-primary btn-sm" id="btn-confirm-hq-allocate">Xác Nhận Phân Bổ</button>
      `
    );

    document.getElementById('btn-confirm-hq-allocate')?.addEventListener('click', () => {
      const qty = parseInt(document.getElementById('modal-qty-quota').value) || 0;
      const reg = document.getElementById('modal-select-region').value;
      if (qty <= 0 || qty > state.companyQuota.availableCompany) {
        showToast('Số lượng Quota không hợp lệ!', 'danger');
        return;
      }
      state.companyQuota.availableCompany -= qty;
      state.companyQuota.allocatedToRegions += qty;
      const targetRegion = state.orgTree[0].children.find(r => r.id === reg);
      if (targetRegion) {
        targetRegion.allocated += qty;
        targetRegion.available += qty;
      }
      addAuditLog('Vũ Minh Tuấn (Super Admin)', 'Phân bổ Quota vĩ mô', `${targetRegion ? targetRegion.name : reg} (+${qty} Quota)`, 'Trụ sở HQ');
      closeModal();
      showToast(`Đã phân bổ thành công ${qty} Quota cho ${targetRegion ? targetRegion.name : reg}!`, 'success');
      renderActiveView();
    });
  }

  // =========================================================================
  // VIEW: SUPER ADMIN — SƠ ĐỒ TỔ CHỨC 3 CẤP
  // =========================================================================
  function renderOrgHierarchyView(container, title, desc, actions) {
    title.textContent = 'Sơ Đồ Cơ Cấu Tổ Chức 3 Cấp (HQ → Vùng → Chi Nhánh)';
    desc.textContent = 'Mô hình phân cấp 3 tầng: Công ty (HQ) → Vùng (Region) → Chi nhánh (Branch) theo quyết định D-008.';

    actions.innerHTML = `
      <button class="btn btn-secondary btn-sm" onclick="showToast('Tính năng thêm Chi nhánh mới đang được hỗ trợ!', 'info')">+ Thêm Chi Nhánh Mới</button>
    `;

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: 320px 1fr; gap: 20px;">
        <div class="tree-container">
          <div class="tree-header">Cây Cơ Cấu Tổ Chức FPT Telecom</div>
          <div class="tree-body">
            <div class="tree-node active" style="font-weight: 700;">FPT Telecom (Toàn Quốc)</div>
            <div style="padding-left: 16px;">
              <div class="tree-node" style="font-weight: 600;">Vùng Miền Nam</div>
              <div style="padding-left: 16px;">
                <div class="tree-node">Chi nhánh HCM 01 - Tân Bình</div>
                <div class="tree-node" style="color: var(--danger-solid);">Chi nhánh HCM 02 (Zero Quota)</div>
                <div class="tree-node">Chi nhánh Đồng Nai</div>
              </div>
              <div class="tree-node" style="font-weight: 600; margin-top: 8px;">Vùng Miền Bắc</div>
              <div style="padding-left: 16px;">
                <div class="tree-node">Chi nhánh Hà Nội 01</div>
                <div class="tree-node">Chi nhánh Hải Phòng</div>
              </div>
              <div class="tree-node" style="font-weight: 600; margin-top: 8px;">Vùng Miền Trung</div>
              <div style="padding-left: 16px;">
                <div class="tree-node">Chi nhánh Đà Nẵng 01</div>
              </div>
            </div>
          </div>
        </div>

        <div class="table-container" style="margin-bottom: 0;">
          <div class="table-toolbar">
            <strong>Chi Tiết Đơn Vị Đang Chọn: FPT Telecom (Toàn Quốc)</strong>
            <span class="badge badge-success">Cấp Độ 1 (HQ)</span>
          </div>
          <div style="padding: 20px;">
            <div class="metric-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 20px;">
              <div class="metric-card">
                <div class="metric-label">Tổng Nhân Sự Toàn Quốc</div>
                <div class="metric-value">4,120</div>
                <div class="metric-sub">HR Quản lý trên biên chế</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">Hạn Ngạch Phân Bổ</div>
                <div class="metric-value">4,500</div>
                <div class="metric-sub">Bản quyền Enterprise</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">Tài Khoản Đã Gán</div>
                <div class="metric-value">4,025</div>
                <div class="metric-sub">Tỷ lệ phủ: 89.4%</div>
              </div>
            </div>
            <p style="color: var(--text-secondary); line-height: 1.6;">
              Mô hình tổ chức cho phép phân quyền quản trị 3 cấp độc lập: Super Admin kiểm soát vĩ mô toàn quốc, Region Admin điều tiết liên chi nhánh trong vùng, và Branch Admin tác nghiệp cấp phát tài khoản trực tiếp cho nhân viên kinh doanh.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // VIEW: SUPER ADMIN — DANH BẠ NHÂN SỰ TOÀN QUỐC
  // =========================================================================
  function renderNationalEmployeesView(container, title, desc, actions) {
    title.textContent = 'Danh Bạ Nhân Sự Toàn Quốc (4,120 Nhân Sự)';
    desc.textContent = 'Tra cứu nhân sự trên toàn quốc, kiểm soát tình trạng cấp phát Enterprise Account theo từng đơn vị.';

    const filtered = getFilteredEmployees();

    actions.innerHTML = `
      <span style="font-size: 11.5px; color: var(--text-muted); align-self: center;">Hiển thị ${filtered.length} / 4,120 nhân sự</span>
      <button class="btn btn-secondary btn-sm" id="btn-export-national-staff">Xuất Danh Sách Excel</button>
    `;

    container.innerHTML = `
      <div class="callout callout-info" style="margin-bottom: 16px;">
        <strong>CHẾ ĐỘ KIỂM SOÁT TUÂN THỦ (PRIVACY LEVEL 5 - FR06):</strong><br>
        Nhật ký kiểm toán vĩ mô ghi nhận toàn bộ biến động Quota, cấp phát tài khoản và thao tác đặc quyền trên phạm vi 3 Vùng & 15 Chi nhánh. Mọi nội dung trao đổi khách hàng được mã hóa, chỉ hiển thị siêu dữ liệu kiểm toán.
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Mã NV</th>
              <th>Họ Và Tên</th>
              <th>Email Công Ty</th>
              <th>Vùng / Chi Nhánh</th>
              <th>Tài Khoản Enterprise</th>
              <th>Trạng Thái TK</th>
              <th>Khách Hàng Phụ Trách</th>
              <th>Hoạt Động Gần Nhất</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(e => `
              <tr>
                <td><strong>${e.id}</strong></td>
                <td>${e.name}</td>
                <td><code>${e.email}</code></td>
                <td>${e.region} • ${e.branchName}</td>
                <td>${e.accountId ? `<strong>${e.accountId}</strong>` : '<span style="color: var(--text-muted);">Chưa gán</span>'}</td>
                <td>
                  <span class="badge ${
                    e.accountStatus === 'Active' ? 'badge-success' :
                    e.accountStatus === 'Suspended' ? 'badge-danger' :
                    e.accountStatus === 'Pending Activation' ? 'badge-warning' : 'badge-neutral'
                  }">${e.accountStatus}</span>
                </td>
                <td>${e.customersCount}</td>
                <td>${e.lastActivity}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('btn-export-national-staff')?.addEventListener('click', () => {
      showToast('Đã xuất danh bạ 4,120 nhân sự toàn quốc (Excel CSV)!', 'success');
    });
  }

  // =========================================================================
  // VIEW: SUPER ADMIN — CHÍNH SÁCH & QUY ĐỊNH VẬN HÀNH
  // =========================================================================
  function renderEnterprisePoliciesView(container, title, desc, actions) {
    title.textContent = 'Chính Sách & Quy Định Vận Hành Hệ Thống';
    desc.textContent = 'Cấu hình các quy tắc kinh doanh, thời hạn kích hoạt email (TTL) và ngưỡng an toàn tài khoản.';

    actions.innerHTML = `
      <button class="btn btn-primary btn-sm" id="btn-save-policies">Lưu Cấu Hình Chính Sách</button>
    `;

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        
        <div class="table-container" style="padding: 18px;">
          <h3 style="font-size: 14px; margin-bottom: 12px;">Quy Tắc Kích Hoạt & Hạn Ngạch</h3>
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div>
              <label class="form-label">Thời hạn hiệu lực thư mời kích hoạt (Activation TTL):</label>
              <select class="form-input" id="policy-ttl">
                <option value="24">24 giờ</option>
                <option value="48">48 giờ</option>
                <option value="72" selected>72 giờ (Tiêu chuẩn FPT ISC)</option>
                <option value="168">7 ngày</option>
              </select>
              <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Sau thời gian này, đường link xác thực qua email công ty sẽ tự động vô hiệu hóa.</div>
            </div>

            <div>
              <label class="form-label">Ngưỡng cảnh báo hạn ngạch thấp tại Chi nhánh (Low Quota Alert):</label>
              <select class="form-input" id="policy-low-quota">
                <option value="5">Dưới 5% Quota khả dụng</option>
                <option value="10" selected>Dưới 10% Quota khả dụng (Khuyên dùng)</option>
                <option value="15">Dưới 15% Quota khả dụng</option>
              </select>
            </div>
          </div>
        </div>

        <div class="table-container" style="padding: 18px;">
          <h3 style="font-size: 14px; margin-bottom: 12px;">Bảo Mật Truy Cập & An Toàn Dữ Liệu</h3>
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div>
              <label class="form-label">Thời gian tự động đăng xuất phiên không hoạt động (Session Timeout):</label>
              <select class="form-input" id="policy-session-timeout">
                <option value="15">15 Phút không thao tác</option>
                <option value="30" selected>30 Phút không thao tác (Khuyên dùng)</option>
                <option value="60">60 Phút không thao tác</option>
              </select>
            </div>

            <div>
              <label class="form-label">Chính sách bảo vệ số điện thoại khách hàng (Masking Rule):</label>
              <select class="form-input" id="policy-masking">
                <option value="true" selected>Bắt buộc che số (VD: 090****567) đối với toàn bộ Admin</option>
                <option value="false">Hiển thị đầy đủ (Chỉ dành cho phiên kiểm toán đặc biệt)</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    `;

    document.getElementById('btn-save-policies')?.addEventListener('click', () => {
      const timeoutVal = document.getElementById('policy-session-timeout')?.value || '30';
      state.policies.sessionTimeoutMinutes = parseInt(timeoutVal);
      const timerEl = document.getElementById('session-timer-text');
      if (timerEl) timerEl.textContent = `${timeoutVal}:00`;
      addAuditLog('Vũ Minh Tuấn (Super Admin)', 'Cập nhật chính sách hệ thống', `Session Timeout: ${timeoutVal} phút (FR04), TTL Kích hoạt: 72h`, 'Trụ sở HQ');
      showToast(`Đã lưu cấu hình chính sách bảo mật thành công! Session Timeout: ${timeoutVal} phút.`, 'success');
    });
  }

  // =========================================================================
  // VIEW: SUPER ADMIN — BÁO CÁO KIỂM SOÁT VĨ MÔ
  // =========================================================================
  function renderSuperAuditView(container, title, desc, actions) {
    title.textContent = 'Báo Cáo Kiểm Soát & Tuân Thủ Vĩ Mô';
    desc.textContent = 'Tổng hợp các sự kiện quản trị, biến động hạn ngạch và can thiệp đặc quyền trên toàn quốc.';

    actions.innerHTML = `
      <button class="btn btn-secondary btn-sm" id="btn-export-macro-audit">Xuất Báo Cáo CSV</button>
    `;

    container.innerHTML = `
      <div class="callout callout-info" style="margin-bottom: 16px;">
        <strong>CHẾ ĐỘ KIỂM SOÁT TUÂN THỦ (PRIVACY LEVEL 5 - FR06):</strong><br>
        Nhật ký kiểm toán vĩ mô ghi nhận toàn bộ biến động Quota, cấp phát tài khoản và thao tác đặc quyền trên phạm vi 3 Vùng & 15 Chi nhánh. Mọi nội dung trao đổi khách hàng được mã hóa, chỉ hiển thị siêu dữ liệu kiểm toán.
      </div>
      <div class="table-container">
        <div class="table-toolbar">
          <strong>Nhật Ký Quản Trị Hệ Thống Toàn Quốc (System Audit Logs)</strong>
          <span class="badge badge-neutral">${state.auditLogs.length} Bản Ghi Mới Nhất</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Thời Gian</th>
              <th>Người Thực Hiện (Actor)</th>
              <th>Hành Động Quản Trị</th>
              <th>Đối Tượng Tác Động</th>
              <th>Đơn Vị Trực Thuộc</th>
              <th>Kết Quả</th>
            </tr>
          </thead>
          <tbody>
            ${state.auditLogs.map(l => `
              <tr>
                <td><code>${l.timestamp}</code></td>
                <td><strong>${l.actor}</strong></td>
                <td>${l.action}</td>
                <td>${l.target}</td>
                <td>${l.org}</td>
                <td><span class="badge ${l.result === 'Thành Công' ? 'badge-success' : 'badge-warning'}">${l.result}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('btn-export-macro-audit')?.addEventListener('click', () => {
      downloadMockCsv('ZEnterprise_Macro_Audit_Trail.csv', [
        ['Thời Gian', 'Actor', 'Hành Động', 'Chi Tiết', 'Phạm Vi'],
        ...state.auditLogs.map(a => [a.time, a.actor, a.action, a.detail, a.scope])
      ]);
    });
  }

  // =========================================================================
  // VIEW: REGION ADMIN — TRUNG TÂM CHỈ HUY VÙNG MIỀN NAM
  // =========================================================================
  function renderRegionCockpitView(container, title, desc, actions) {
    title.textContent = 'Trung Tâm Chỉ Huy Vùng Miền Nam';
    desc.textContent = 'Quản trị 2,500 Quota, điều tiết hạn ngạch giữa 3 Chi nhánh (HCM 01, HCM 02, Đồng Nai) và phê duyệt các yêu cầu cấp Quota.';

    const pendingRequests = state.quotaRequests.filter(r => r.regionId === 'REG_SOUTH' && r.status === 'Pending');

    actions.innerHTML = `
      <button class="btn btn-secondary btn-sm" id="btn-request-hq-quota">+ Đề Xuất Xin Quota Lên HQ</button>
      <button class="btn btn-primary btn-sm" id="btn-open-balancer">Điều Tiết Quota Nội Bộ Vùng</button>
    `;

    container.innerHTML = `
      <!-- KPI Row (Dynamic Calculated Metrics) -->
      ${(() => {
        const south = state.orgTree[0].children.find(r => r.id === 'REG_SOUTH');
        const hcm01 = south.children.find(b => b.id === 'HCM01') || { allocated: 300, assigned: 276, available: 24 };
        const hcm02 = south.children.find(b => b.id === 'HCM02') || { allocated: 200, assigned: 200, available: 0 };
        const dng01 = south.children.find(b => b.id === 'DNG01') || { allocated: 150, assigned: 135, available: 15 };
        const sat = south.children.find(b => b.id === 'SATELLITES') || { allocated: 1750, assigned: 1689, available: 61 };
        const totalAllocatedBranches = hcm01.allocated + hcm02.allocated + dng01.allocated + sat.allocated;
        south.available = south.allocated - totalAllocatedBranches;
        return `
          <div class="metric-grid">
            <div class="metric-card">
              <div class="metric-label">Hạn Ngạch HQ Giao Cho Vùng</div>
              <div class="metric-value">${south.allocated}</div>
              <div class="metric-sub">Hạn ngạch Vùng Miền Nam</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Đã Cấp Cho 15 Chi Nhánh Vùng</div>
              <div class="metric-value">${totalAllocatedBranches}</div>
              <div class="metric-sub">3 Điểm nóng: ${hcm01.allocated + hcm02.allocated + dng01.allocated} • 12 Vệ tinh: ${sat.allocated}</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Dự Phòng Kho Vùng</div>
              <div class="metric-value" style="color: ${south.available <= 50 ? 'var(--danger-solid)' : 'var(--primary)'};">${south.available}</div>
              <div class="metric-sub">Sẵn sàng cấp cứu các chi nhánh thiếu</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Nhân Sự Toàn Vùng</div>
              <div class="metric-value">2,450</div>
              <div class="metric-sub">15 Chi nhánh kinh doanh trực thuộc</div>
            </div>
          </div>
        `;
      })()}

      <!-- REGIONAL EXECUTIVE LEVEL DRILL-DOWN SELECTOR -->
      <div class="drilldown-nav-container">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 13px;"></span>
          <strong style="font-size: 12px; color: var(--text-primary);">Chế Độ Giám Sát Cấp Bậc (Region Drill-Down):</strong>
          <span style="font-size: 11.5px; color: var(--text-muted);">Quan sát chi tiết từng Chi nhánh trực thuộc & Nhân sự</span>
        </div>
        <div class="drilldown-pills">
          <button class="drilldown-pill ${state.regionAdminDrilldown === 'ALL' ? 'active' : ''}" data-region-drilldown="ALL">Toàn Cảnh 3 Chi Nhánh</button>
          <button class="drilldown-pill ${state.regionAdminDrilldown === 'HCM01' ? 'active' : ''}" data-region-drilldown="HCM01">Chi Nhánh HCM 01 (Hạng 1)</button>
          <button class="drilldown-pill ${state.regionAdminDrilldown === 'HCM02' ? 'active' : ''}" data-region-drilldown="HCM02">Chi Nhánh HCM 02 (Zero Quota)</button>
          <button class="drilldown-pill ${state.regionAdminDrilldown === 'DNG01' ? 'active' : ''}" data-region-drilldown="DNG01">Chi Nhánh Đồng Nai</button>
        </div>
      </div>

      ${state.regionAdminDrilldown === 'ALL' ? `
        <!-- VISUAL CHART: NĂNG LỰC & TẢI VẬN HÀNH 3 CHI NHÁNH (SVG MORPHIC CHART) -->
        <div class="executive-chart-card">
          <div class="chart-header-row">
            <div>
              <strong style="font-size: 13.5px; color: var(--text-primary);">Biểu Đồ Khai Thác Hạn Ngạch & Tải Nhân Sự 3 Chi Nhánh (Vùng Miền Nam)</strong>
              <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">So sánh Hạn ngạch cấp, Tài khoản đã gán và Mức độ an toàn Quota khả dụng</div>
            </div>
            <div class="chart-legend">
              <div class="legend-item"><div class="legend-dot" style="background: #2563eb;"></div><span>Hạn Ngạch Cấp</span></div>
              <div class="legend-item"><div class="legend-dot" style="background: #10b981;"></div><span>Đã Gán Nhân Viên</span></div>
              <div class="legend-item"><div class="legend-dot" style="background: #f59e0b;"></div><span>Khả Dụng (Dự Phòng)</span></div>
            </div>
          </div>

          <div style="width: 100%; height: 160px; overflow: hidden;">
            <svg viewBox="0 0 700 150" style="width: 100%; height: 100%;">
              <!-- Grid Lines -->
              <line x1="150" y1="20" x2="680" y2="20" stroke="#f1f5f9" stroke-dasharray="4" />
              <line x1="150" y1="65" x2="680" y2="65" stroke="#f1f5f9" stroke-dasharray="4" />
              <line x1="150" y1="110" x2="680" y2="110" stroke="#f1f5f9" stroke-dasharray="4" />
              <line x1="150" y1="135" x2="680" y2="135" stroke="#cbd5e1" stroke-width="1.5" />

              <!-- Row 1: Chi nhánh HCM 01 - Tân Bình -->
              <text x="140" y="38" text-anchor="end" font-size="11.5" font-weight="600" fill="#334155">HCM 01 - Tân Bình</text>
              <rect x="150" y="24" width="400" height="7" rx="3" fill="#2563eb" />
              <rect x="150" y="34" width="368" height="7" rx="3" fill="#10b981" />
              <rect x="150" y="44" width="32" height="7" rx="3" fill="#f59e0b" />
              <text x="560" y="38" font-size="11" font-weight="700" fill="#059669">276 / 300 (92% - Khả dụng 24)</text>

              <!-- Row 2: Chi nhánh HCM 02 - Phú Nhuận -->
              <text x="140" y="78" text-anchor="end" font-size="11.5" font-weight="700" fill="#dc2626">HCM 02 - Phú Nhuận</text>
              <rect x="150" y="64" width="267" height="7" rx="3" fill="#2563eb" />
              <rect x="150" y="74" width="267" height="7" rx="3" fill="#dc2626" />
              <rect x="150" y="84" width="0" height="7" rx="3" fill="#f59e0b" />
              <text x="430" y="78" font-size="11" font-weight="700" fill="#dc2626">200 / 200 (100% - ZERO QUOTA)</text>

              <!-- Row 3: Chi nhánh Đồng Nai -->
              <text x="140" y="118" text-anchor="end" font-size="11.5" font-weight="600" fill="#334155">Chi nhánh Đồng Nai</text>
              <rect x="150" y="104" width="200" height="7" rx="3" fill="#2563eb" />
              <rect x="150" y="114" width="180" height="7" rx="3" fill="#10b981" />
              <rect x="150" y="124" width="20" height="7" rx="3" fill="#f59e0b" />
              <text x="365" y="118" font-size="11" font-weight="700" fill="#059669">135 / 150 (90% - Khả dụng 15)</text>
            </svg>
          </div>
        </div>

        <!-- BENCHMARK SCORECARD: BẢNG XẾP HẠNG & SỨC KHỎE 3 CHI NHÁNH -->
        <div class="table-container">
          <div class="table-toolbar">
            <div style="display: flex; align-items: center; gap: 8px;">
              <strong>Bảng Xếp Hạng & Sức Khỏe Vận Hành 3 Chi Nhánh (Vùng Miền Nam)</strong>
              <span class="badge badge-primary">Tiêu chí: Quota khả dụng, Kích hoạt SLA, Tải khách hàng & Bàn giao</span>
            </div>
            <span class="badge badge-neutral">Đánh Giá Ban Điều Hành Vùng</span>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 70px;">Hạng</th>
                <th>Tên Chi Nhánh</th>
                <th>Hạn Ngạch Cấp</th>
                <th>Đã Gán</th>
                <th>Khả Dụng</th>
                <th>Kích Hoạt SLA</th>
                <th>Tải Sales TB</th>
                <th>Điểm Sức Khỏe</th>
                <th>Đánh Giá Vùng</th>
                <th style="text-align: right;">Thao Tác Vùng</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: #f0fdf4;">
                <td><span class="rank-badge rank-badge-1">Hạng 1</span></td>
                <td>
                  <div style="font-weight: 700; color: var(--text-primary);">Chi nhánh HCM 01 - Tân Bình</div>
                  <div style="font-size: 11px; color: var(--text-muted);">281 Nhân sự • 48 KH/Sales TB</div>
                </td>
                <td>300</td>
                <td>276</td>
                <td><strong style="color: #059669; font-size: 13px;">24</strong></td>
                <td><span style="font-weight: 700; color: #059669;">92.0%</span></td>
                <td><span>48 KH / người</span></td>
                <td><span class="health-score-capsule health-score-high">94 / 100</span></td>
                <td><span class="badge badge-success">Vận Hành Tốt Nhất Vùng</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-secondary btn-sm btn-drilldown-branch" data-target="HCM01">Soi Chi Nhánh</button>
                </td>
              </tr>

              <tr>
                <td><span class="rank-badge rank-badge-2">Hạng 2</span></td>
                <td>
                  <div style="font-weight: 700; color: var(--text-primary);">Chi nhánh Đồng Nai</div>
                  <div style="font-size: 11px; color: var(--text-muted);">140 Nhân sự • 45 KH/Sales TB</div>
                </td>
                <td>150</td>
                <td>135</td>
                <td><strong style="color: #059669; font-size: 13px;">15</strong></td>
                <td><span style="font-weight: 700; color: #059669;">94.0%</span></td>
                <td><span>45 KH / người</span></td>
                <td><span class="health-score-capsule health-score-med">90 / 100</span></td>
                <td><span class="badge badge-neutral">Ổn Định & Dồi Dào Quota</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-secondary btn-sm btn-drilldown-branch" data-target="DNG01">Soi Chi Nhánh</button>
                </td>
              </tr>

              <tr style="background: #fff5f5;">
                <td><span class="rank-badge" style="background:#fef2f2; color:#991b1b; border:1px solid #fecaca;">Cần Điều Chỉnh</span></td>
                <td>
                  <div style="font-weight: 700; color: var(--danger-solid);">Chi nhánh HCM 02 - Phú Nhuận</div>
                  <div style="font-size: 11px; color: var(--danger-solid); font-weight: 600;">5 Nhân sự chờ cấp tài khoản</div>
                </td>
                <td>200</td>
                <td>200</td>
                <td><strong style="color: var(--danger-solid); font-size: 13px;">0 (Hết)</strong></td>
                <td><span class="badge badge-danger">Tắc Nghẽn</span></td>
                <td><span style="color: var(--danger-solid); font-weight: 600;">68 KH (Quá Tải)</span></td>
                <td><span class="health-score-capsule health-score-low">58 / 100</span></td>
                <td><span class="badge badge-danger">Báo Động Đỏ (Zero Quota)</span></td>
                <td style="text-align: right; display: flex; gap: 6px; justify-content: flex-end;">
                  <button class="btn btn-secondary btn-sm btn-drilldown-branch" data-target="HCM02">Soi Chi Nhánh </button>
                  <button class="btn btn-primary btn-sm btn-quick-resolve-zero" data-branch="HCM02">Bơm Cấp 20 Quota Ngay</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ` : state.regionAdminDrilldown === 'HCM01' ? `
        <!-- DRILLDOWN VIEW: CHI NHÁNH HCM 01 (TOP 1) -->
        <div class="executive-chart-card">
          <div class="chart-header-row">
            <div>
              <div style="font-weight: 700; font-size: 14px; color: #059669; display: flex; align-items: center; gap: 8px;">
                Soi Chi Tiết Chi Nhánh HCM 01 - Tân Bình
                <span class="badge badge-success">Vận Hành Xuất Sắc</span>
              </div>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                Trưởng Chi Nhánh: Lê Hoàng Nam • Hạn ngạch: 300 Quota • Đã dùng: 276 (92%) • Khả dụng: 24 Quota • 281 Nhân sự
              </div>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-secondary btn-sm" onclick="state.regionAdminDrilldown='ALL'; renderActiveView();">Quay Lại Toàn Cảnh</button>
              <button class="btn btn-primary btn-sm" onclick="state.activeView='branch_quota_balancer'; renderApp();">Điều Tiết Hạn Ngạch</button>
            </div>
          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th>Nhân Sự Kinh Doanh</th>
                <th>Tài Khoản Zalo Ent</th>
                <th>Khách Hàng Phụ Trách</th>
                <th>Tải Định Mức (70 KH)</th>
                <th>SLA Phản Hồi</th>
                <th>Thời Gian TB</th>
                <th>Trạng Thái</th>
                <th style="text-align: right;">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Trần Thị B</strong><div style="font-size:11px;color:var(--text-muted);">b.tran@fpt.com.vn</div></td>
                <td><code>ZENT-001294</code></td>
                <td><strong style="color:var(--primary);">65 KH</strong></td>
                <td><span class="badge badge-neutral">93% (An toàn)</span></td>
                <td><span style="font-weight:700;color:#059669;">98.5%</span></td>
                <td>12 phút</td>
                <td><span class="badge badge-success">Đang Hoạt Động</span></td>
                <td style="text-align: right;"><button class="btn btn-secondary btn-sm" onclick="showToast('Xem hồ sơ Trần Thị B', 'info')">Hồ Sơ</button></td>
              </tr>
              <tr>
                <td><strong>Nguyễn Văn A</strong><div style="font-size:11px;color:var(--text-muted);">a.nguyen@fpt.com.vn</div></td>
                <td><code>ZENT-001293</code></td>
                <td><strong style="color:var(--primary);">48 KH</strong></td>
                <td><span class="badge badge-neutral">69% (Chuẩn)</span></td>
                <td><span style="font-weight:700;color:#059669;">96.0%</span></td>
                <td>18 phút</td>
                <td><span class="badge badge-success">Đang Hoạt Động</span></td>
                <td style="text-align: right;"><button class="btn btn-secondary btn-sm" onclick="showToast('Xem hồ sơ Nguyễn Văn A', 'info')">Hồ Sơ</button></td>
              </tr>
              <tr style="background: #fff5f5;">
                <td><strong style="color:var(--danger-solid);">Phạm Văn D</strong><div style="font-size:11px;color:var(--danger-solid);">d.pham@fpt.com.vn</div></td>
                <td><code>ZENT-001296</code></td>
                <td><strong style="color:var(--danger-solid);">127 KH</strong></td>
                <td><span class="badge badge-danger">181% (Quá Tải )</span></td>
                <td><span style="font-weight:700;color:#dc2626;">84.0%</span></td>
                <td>45 phút</td>
                <td><span class="badge badge-warning">Cần San Sẻ Tải</span></td>
                <td style="text-align: right;"><button class="btn btn-primary btn-sm" onclick="showToast('Đề xuất điều phối bớt 40 KH từ Phạm Văn D sang Sales mới', 'info')">San Tải</button></td>
              </tr>
              <tr>
                <td><strong>Lê Văn C</strong><div style="font-size:11px;color:var(--text-muted);">c.le@fpt.com.vn</div></td>
                <td><code>ZENT-001295</code></td>
                <td><strong>32 KH</strong></td>
                <td><span class="badge badge-warning">46% (Tạm Dừng)</span></td>
                <td><span style="font-weight:700;color:#059669;">95.0%</span></td>
                <td>15 phút</td>
                <td><span class="badge badge-neutral">Tạm Dừng Nhận KH</span></td>
                <td style="text-align: right;"><button class="btn btn-secondary btn-sm" onclick="showToast('Xem hồ sơ Lê Văn C', 'info')">Hồ Sơ</button></td>
              </tr>
              <tr>
                <td><strong>Vũ Minh K</strong><div style="font-size:11px;color:var(--text-muted);">k.vu@fpt.com.vn</div></td>
                <td><code>ZENT-001297</code></td>
                <td><strong>0 KH</strong></td>
                <td><span class="badge badge-neutral">0% (Sẵn Sàng)</span></td>
                <td><span>-</span></td>
                <td>-</td>
                <td><span class="badge badge-info">Sẵn Sàng Nhận KH</span></td>
                <td style="text-align: right;"><button class="btn btn-secondary btn-sm" onclick="showToast('Phân bổ khách hàng cho Vũ Minh K', 'info')">Gán KH</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      ` : state.regionAdminDrilldown === 'HCM02' ? `
        <!-- DRILLDOWN VIEW: CHI NHÁNH HCM 02 (ZERO QUOTA ) -->
        <div class="executive-chart-card" style="border: 1.5px solid #fca5a5;">
          <div class="chart-header-row">
            <div>
              <div style="font-weight: 700; font-size: 14px; color: var(--danger-solid); display: flex; align-items: center; gap: 8px;">
                Soi Chi Tiết Chi Nhánh HCM 02 - Phú Nhuận (Điểm Nóng Zero Quota)
                <span class="badge badge-danger">Tắc Nghẽn Cấp Phép</span>
              </div>
              <div style="font-size: 12px; color: var(--danger-solid); margin-top: 2px;">
                Trưởng Chi Nhánh: Nguyễn Bích Thủy • Hạn ngạch: 200/200 Quota (100% Khai thác) • Khả dụng: 0 Quota • 5 Nhân sự mới chưa có tài khoản
              </div>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-secondary btn-sm" onclick="state.regionAdminDrilldown='ALL'; renderActiveView();">Quay Lại Toàn Cảnh</button>
              <button class="btn btn-primary btn-sm btn-quick-resolve-zero" data-branch="HCM02">+ Bơm Cấp 20 Quota Ngay</button>
            </div>
          </div>

          <div class="callout callout-danger" style="margin-bottom: 14px;">
            <strong>Cảnh báo tắc nghẽn tuyển dụng:</strong> 5 nhân sự kinh doanh dưới đây đã nhận việc và có email FPT, nhưng không thể khởi tạo Zalo Enterprise vì Chi nhánh HCM 02 đã cạn kiệt Quota.
          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th>Nhân Sự Chờ Cấp</th>
                <th>Email Doanh Nghiệp FPT</th>
                <th>Bộ Phận / Vị Trí</th>
                <th>Ngày Nhận Việc</th>
                <th>Tình Trạng Quota</th>
                <th>Khách Hàng Đang Chờ</th>
                <th style="text-align: right;">Xử Lý Khẩn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Hoàng Văn Tuấn</strong></td>
                <td><code>tuan.hv@fpt.com.vn</code></td>
                <td>Sales B2B Doanh Nghiệp</td>
                <td>22/09/2026</td>
                <td><span class="badge badge-danger">Thiếu Quota (Chưa Cấp)</span></td>
                <td>15 Đầu mối doanh nghiệp</td>
                <td style="text-align: right;"><button class="btn btn-primary btn-sm btn-quick-resolve-zero">Cấp Quota</button></td>
              </tr>
              <tr>
                <td><strong>Đặng Thị Mai</strong></td>
                <td><code>mai.dt@fpt.com.vn</code></td>
                <td>Sales SME & Chuỗi Cửa Hàng</td>
                <td>23/09/2026</td>
                <td><span class="badge badge-danger">Thiếu Quota (Chưa Cấp)</span></td>
                <td>12 Khách hàng tiềm năng</td>
                <td style="text-align: right;"><button class="btn btn-primary btn-sm btn-quick-resolve-zero">Cấp Quota</button></td>
              </tr>
              <tr>
                <td><strong>Vũ Quốc Hưng</strong></td>
                <td><code>hung.vq@fpt.com.vn</code></td>
                <td>Tư Vấn Hạ Tầng Internet FPT</td>
                <td>23/09/2026</td>
                <td><span class="badge badge-danger">Thiếu Quota (Chưa Cấp)</span></td>
                <td>8 Doanh nghiệp KCN</td>
                <td style="text-align: right;"><button class="btn btn-primary btn-sm btn-quick-resolve-zero">Cấp Quota</button></td>
              </tr>
              <tr>
                <td><strong>Bùi Anh Tuấn</strong></td>
                <td><code>tuan.ba@fpt.com.vn</code></td>
                <td>Sales Giải Pháp FPT Cloud</td>
                <td>24/09/2026</td>
                <td><span class="badge badge-danger">Thiếu Quota (Chưa Cấp)</span></td>
                <td>20 Liên hệ dự án</td>
                <td style="text-align: right;"><button class="btn btn-primary btn-sm btn-quick-resolve-zero">Cấp Quota</button></td>
              </tr>
              <tr>
                <td><strong>Lê Phương Nga</strong></td>
                <td><code>nga.lp@fpt.com.vn</code></td>
                <td>Chuyên Viên CSKH Cao Cấp</td>
                <td>24/09/2026</td>
                <td><span class="badge badge-danger">Thiếu Quota (Chưa Cấp)</span></td>
                <td>25 Khách hàng VIP</td>
                <td style="text-align: right;"><button class="btn btn-primary btn-sm btn-quick-resolve-zero">Cấp Quota</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      ` : `
        <!-- DRILLDOWN VIEW: CHI NHÁNH ĐỒNG NAI -->
        <div class="executive-chart-card">
          <div class="chart-header-row">
            <div>
              <div style="font-weight: 700; font-size: 14px; color: var(--primary); display: flex; align-items: center; gap: 8px;">
                Soi Chi Tiết Chi Nhánh Đồng Nai
                <span class="badge badge-neutral">Vận Hành Ổn Định</span>
              </div>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                Trưởng Chi Nhánh: Phạm Thành Long • Hạn ngạch: 150 Quota • Đã dùng: 135 (90%) • Khả dụng: 15 Quota • 140 Nhân sự • Tải TB: 45 KH/Sales
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="state.regionAdminDrilldown='ALL'; renderActiveView();">Quay Lại Toàn Cảnh</button>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; margin-bottom: 14px;">
            <div class="sla-progress-card">
              <div style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 4px;">Tỷ Lệ Kích Hoạt Đúng Hạn (< 24h)</div>
              <div style="font-size: 20px; font-weight: 800; color: #059669;">94.0%</div>
              <div style="font-size: 11px; color: #059669; margin-top: 2px;">Đạt chuẩn cam kết SLA Vùng</div>
            </div>
            <div class="sla-progress-card">
              <div style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 4px;">Tuân Thủ Masking SĐT FPT</div>
              <div style="font-size: 20px; font-weight: 800; color: #2563eb;">100%</div>
              <div style="font-size: 11px; color: #2563eb; margin-top: 2px;">Tuyệt đối bảo mật SĐT khách hàng</div>
            </div>
            <div class="sla-progress-card">
              <div style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 4px;">Sự Cố Vận Hành / Thu Hồi</div>
              <div style="font-size: 20px; font-weight: 800; color: #059669;">0 Sự Cố</div>
              <div style="font-size: 11px; color: #059669; margin-top: 2px;">Không phát sinh khiếu nại</div>
            </div>
          </div>
        </div>
      `}

      <!-- Pending Approval Requests Panel -->
      <div class="table-container">
        <div class="table-toolbar">
          <strong>Yêu Cầu Xin Cấp Thêm Quota Từ Chi Nhánh Đang Chờ Duyệt</strong>
          <span class="badge ${pendingRequests.length > 0 ? 'badge-danger' : 'badge-success'}">${pendingRequests.length} Đang Chờ</span>
        </div>
        <div style="padding: 16px;">
          ${pendingRequests.length === 0 ? `
            <div style="color: var(--text-muted); text-align: center; padding: 20px;">Không có yêu cầu xin hạn ngạch nào đang chờ duyệt.</div>
          ` : pendingRequests.map(r => `
            <div class="approval-card">
              <div class="approval-info">
                <div class="approval-title">${r.branchName}: Xin cấp thêm <strong>+${r.requestQty} Quota</strong></div>
                <div class="approval-meta">
                  Người đề xuất: <strong>${r.requester}</strong> • Gửi lúc: <code>${r.requestedAt}</code><br/>
                  Lý do: <em>"${r.reason}"</em>
                </div>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-secondary btn-sm btn-reject-req" data-req-id="${r.id}">Từ Chối</button>
                <button class="btn btn-primary btn-sm btn-approve-req" data-req-id="${r.id}">Phê Duyệt (+${r.requestQty})</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById('btn-open-balancer')?.addEventListener('click', () => {
      state.activeView = 'branch_quota_balancer';
      renderApp();
    });

    document.getElementById('btn-request-hq-quota')?.addEventListener('click', () => {
      showToast('Đã gửi phiếu đề xuất xin cấp thêm 150 Quota lên Trụ sở HQ!', 'success');
      addAuditLog('Trần Đình Trọng (Region Admin)', 'Đề xuất xin hạn ngạch vĩ mô', 'Trụ sở HQ (+150 Quota)', 'Vùng Miền Nam', 'Chờ Duyệt');
    });

    // Region Drilldown pills click handlers
    container.querySelectorAll('.drilldown-pill[data-region-drilldown]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.regionAdminDrilldown = btn.dataset.regionDrilldown;
        renderActiveView();
      });
    });

    // Scorecard drilldown buttons
    container.querySelectorAll('.btn-drilldown-branch').forEach(btn => {
      btn.addEventListener('click', () => {
        state.regionAdminDrilldown = btn.dataset.target;
        renderActiveView();
      });
    });

    container.querySelectorAll('.btn-quick-resolve-zero').forEach(btn => {
      btn.addEventListener('click', () => {
        const south = state.orgTree[0].children.find(r => r.id === 'REG_SOUTH');
        const hcm02 = south.children.find(b => b.id === 'HCM02');
        if (south.available < 20) {
          showToast(`Kho Vùng chỉ còn ${south.available} Quota, không đủ 20 Quota!`, 'danger');
          return;
        }
        south.available -= 20;
        hcm02.allocated += 20;
        hcm02.available += 20;
        addAuditLog('Trần Đình Trọng (Region Admin)', 'Cấp Quota giải tỏa Zero Quota', 'Kho Vùng → Chi nhánh HCM 02 (+20 Quota)', 'Vùng Miền Nam');
        showToast(`Đã điều phối 20 Quota sang Chi nhánh HCM 02! Khả dụng hiện tại: ${hcm02.available} Quota.`, 'success');
        renderActiveView();
      });
    });

    container.querySelectorAll('.btn-approve-req').forEach(btn => {
      btn.addEventListener('click', () => {
        const reqId = btn.dataset.reqId;
        const req = state.quotaRequests.find(r => r.id === reqId);
        if (req) {
          const south = state.orgTree[0].children.find(r => r.id === 'REG_SOUTH');
          const branch = south.children.find(b => b.id === req.branchId);
          if (south.available < req.requestQty) {
            showToast(`Kho Vùng chỉ còn ${south.available} Quota, không đủ cấp ${req.requestQty}!`, 'danger');
            return;
          }
          south.available -= req.requestQty;
          if (branch) {
            branch.allocated += req.requestQty;
            branch.available += req.requestQty;
          }
          req.status = 'Approved';
          addAuditLog('Trần Đình Trọng (Region Admin)', 'Phê duyệt xin cấp Quota', `${req.branchName} (+${req.requestQty} Quota)`, 'Vùng Miền Nam');
          showToast(`Đã phê duyệt cấp ${req.requestQty} Quota cho ${req.branchName}! Khả dụng hiện tại: ${branch ? branch.available : ''} Quota.`, 'success');
          renderActiveView();
          renderNav();
        }
      });
    });

    container.querySelectorAll('.btn-reject-req').forEach(btn => {
      btn.addEventListener('click', () => {
        const reqId = btn.dataset.reqId;
        const req = state.quotaRequests.find(r => r.id === reqId);
        if (req) {
          req.status = 'Rejected';
          addAuditLog('Trần Đình Trọng (Region Admin)', 'Từ chối xin cấp Quota', `${req.branchName}`, 'Vùng Miền Nam');
          showToast(`Đã từ chối yêu cầu của ${req.branchName}!`, 'info');
          renderActiveView();
          renderNav();
        }
      });
    });
  }

  // =========================================================================
  // VIEW: REGION ADMIN — ĐIỀU TIẾT HẠN NGẠCH NỘI BỘ VÙNG
  // =========================================================================
  function renderBranchQuotaBalancerView(container, title, desc, actions) {
    title.textContent = 'Điều Tiết Quota Nội Bộ Vùng';
    desc.textContent = 'Điều chuyển Quota linh hoạt giữa các Chi nhánh trong Vùng Miền Nam mà không cần xin thêm Quota từ Trụ sở HQ.';

    const south = state.orgTree[0].children.find(r => r.id === 'REG_SOUTH');
    const hcm01 = south.children.find(b => b.id === 'HCM01') || { available: 24, allocated: 300, assigned: 276 };
    const hcm02 = south.children.find(b => b.id === 'HCM02') || { available: 0, allocated: 200, assigned: 200 };
    const dng01 = south.children.find(b => b.id === 'DNG01') || { available: 15, allocated: 150, assigned: 135 };

    actions.innerHTML = `
      <button class="btn btn-secondary btn-sm" id="btn-back-cockpit">Quay Lại Chỉ Huy Vùng</button>
      <button class="btn btn-primary btn-sm" id="btn-interbranch-transfer">Thực Hiện Cân Đối (+15 Cho HCM02)</button>
    `;

    container.innerHTML = `
      <div class="callout callout-info" style="margin-bottom: 16px;">
        <strong>Giải pháp cân đối nội bộ:</strong> Chi nhánh Đồng Nai đang có ${dng01.available} Quota dư thừa và kho Vùng còn ${south.available} Quota. Region Admin có thể trực tiếp chuyển dịch Quota sang Chi nhánh HCM 02 đang bị Zero Quota để phục vụ kinh doanh tức thì.
      </div>

      <div class="balancer-grid">
        <div class="balancer-card">
          <div style="font-weight: 700; margin-bottom: 8px;">Chi nhánh HCM 01</div>
          <div style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">${hcm01.available} <span style="font-size: 13px; font-weight: 400; color: var(--text-muted);">Khả dụng</span></div>
          <div style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 12px;">Đã cấp: ${hcm01.allocated} • Đang dùng: ${hcm01.assigned}</div>
          <button class="btn btn-secondary btn-sm" id="btn-reclaim-hcm01-quota" style="width: 100%;">Trích Quota Dư (-4)</button>
        </div>

        <div class="balancer-card ${hcm02.available === 0 ? 'alert-zero' : ''}">
          <div style="font-weight: 700; color: ${hcm02.available === 0 ? 'var(--danger-solid)' : '#059669'}; margin-bottom: 8px;">
            ${hcm02.available === 0 ? 'Chi nhánh HCM 02' : 'Chi nhánh HCM 02'}
          </div>
          <div style="font-size: 24px; font-weight: 700; color: ${hcm02.available === 0 ? 'var(--danger-solid)' : '#059669'}; margin-bottom: 4px;">
            ${hcm02.available} <span style="font-size: 13px; font-weight: 400; color: var(--text-muted);">${hcm02.available === 0 ? 'Khả dụng (HẾT)' : 'Khả dụng (Đã Bơm)'}</span>
          </div>
          <div style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 12px;">Đã cấp: ${hcm02.allocated} • Đang dùng: ${hcm02.assigned}</div>
          <button class="btn btn-primary btn-sm" style="width: 100%;" id="btn-top-up-hcm02">+ Nạp 20 Quota Ngay</button>
        </div>

        <div class="balancer-card">
          <div style="font-weight: 700; margin-bottom: 8px;">Chi nhánh Đồng Nai</div>
          <div style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">${dng01.available} <span style="font-size: 13px; font-weight: 400; color: var(--text-muted);">Khả dụng</span></div>
          <div style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 12px;">Đã cấp: ${dng01.allocated} • Đang dùng: ${dng01.assigned}</div>
          <button class="btn btn-secondary btn-sm" id="btn-reclaim-dng-quota" style="width: 100%;">Trích Quota Dư (-5)</button>
        </div>
      </div>
    `;

    document.getElementById('btn-back-cockpit')?.addEventListener('click', () => {
      state.activeView = 'region_cockpit';
      renderApp();
    });

    // 1. Trích Quota dư từ HCM 01 về kho Vùng
    document.getElementById('btn-reclaim-hcm01-quota')?.addEventListener('click', () => {
      if (hcm01.available >= 4) {
        hcm01.available -= 4;
        hcm01.allocated -= 4;
        south.available += 4;
        addAuditLog('Trần Đình Trọng (Region Admin)', 'Trích Quota dư thừa về kho Vùng', 'Chi nhánh HCM 01 (-4 Quota)', 'Vùng Miền Nam');
        showToast('Đã trích 4 Quota tự do từ HCM 01 về Kho Dự Phòng Vùng Miền Nam!', 'success');
        renderActiveView();
      } else {
        showToast('Chi nhánh HCM 01 không đủ 4 Quota tự do để trích!', 'warning');
      }
    });

    // 2. Trích Quota dư từ Đồng Nai về kho Vùng
    document.getElementById('btn-reclaim-dng-quota')?.addEventListener('click', () => {
      if (dng01.available >= 5) {
        dng01.available -= 5;
        dng01.allocated -= 5;
        south.available += 5;
        addAuditLog('Trần Đình Trọng (Region Admin)', 'Trích Quota dư thừa về kho Vùng', 'Chi nhánh Đồng Nai (-5 Quota)', 'Vùng Miền Nam');
        showToast('Đã trích 5 Quota tự do từ Đồng Nai về Kho Dự Phòng Vùng Miền Nam!', 'success');
        renderActiveView();
      } else {
        showToast('Chi nhánh Đồng Nai không đủ 5 Quota tự do để trích!', 'warning');
      }
    });

    // 3. Thực hiện cân đối liên chi nhánh (Đồng Nai / Kho Vùng -> HCM 02)
    document.getElementById('btn-interbranch-transfer')?.addEventListener('click', () => {
      if (dng01.available >= 15) {
        dng01.available -= 15;
        dng01.allocated -= 15;
        hcm02.available += 15;
        hcm02.allocated += 15;
        addAuditLog('Trần Đình Trọng (Region Admin)', 'Cân đối hạn ngạch liên chi nhánh', 'Đồng Nai (-15) → HCM 02 (+15 Quota)', 'Vùng Miền Nam');
        showToast('Đã cân đối thành công: Chuyển 15 Quota từ Đồng Nai sang Chi nhánh HCM 02! Giải tỏa Zero Quota.', 'success');
        renderActiveView();
      } else if (south.available >= 15) {
        south.available -= 15;
        hcm02.available += 15;
        hcm02.allocated += 15;
        addAuditLog('Trần Đình Trọng (Region Admin)', 'Cân đối hạn ngạch từ kho Vùng', 'Kho Vùng → HCM 02 (+15 Quota)', 'Vùng Miền Nam');
        showToast('Đã trích 15 Quota từ Kho Dự Phòng Vùng sang Chi nhánh HCM 02!', 'success');
        renderActiveView();
      } else {
        showToast('Không đủ Quota khả dụng để thực hiện cân đối!', 'warning');
      }
    });

    // 4. Bơm 20 Quota trực tiếp cho HCM 02
    document.getElementById('btn-top-up-hcm02')?.addEventListener('click', () => {
      if (south.available >= 20) {
        south.available -= 20;
        hcm02.available += 20;
        hcm02.allocated += 20;
        addAuditLog('Trần Đình Trọng (Region Admin)', 'Cân đối hạn ngạch nội bộ Vùng', 'Kho Vùng → HCM 02 (+20 Quota)', 'Vùng Miền Nam');
        showToast(`Đã trích 20 Quota từ Kho Dự Phòng Vùng sang Chi nhánh HCM 02! Khả dụng hiện tại: ${hcm02.available} Quota.`, 'success');
        renderActiveView();
      } else {
        showToast(`Kho dự phòng Vùng chỉ còn ${south.available} Quota, không đủ 20 Quota!`, 'danger');
      }
    });
  }

  // =========================================================================
  // VIEW: REGION ADMIN — PHÊ DUYỆT ĐỀ XUẤT HẠN NGẠCH CHI NHÁNH
  // =========================================================================
  function renderQuotaApprovalQueueView(container, title, desc, actions) {
    title.textContent = 'Phê Duyệt Đề Xuất Hạn Ngạch Chi Nhánh';
    desc.textContent = 'Xử lý các đề xuất xin cấp thêm hạn ngạch từ các Branch Admin trong Vùng Miền Nam.';

    const allRequests = state.quotaRequests.filter(r => r.regionId === 'REG_SOUTH');

    actions.innerHTML = `
      <span style="font-size: 11.5px; color: var(--text-muted); align-self: center;">Tổng số: ${allRequests.length} phiếu</span>
    `;

    container.innerHTML = `
      <div class="callout callout-info" style="margin-bottom: 16px;">
        <strong>CHẾ ĐỘ KIỂM SOÁT TUÂN THỦ (PRIVACY LEVEL 5 - FR06):</strong><br>
        Nhật ký kiểm toán vĩ mô ghi nhận toàn bộ biến động Quota, cấp phát tài khoản và thao tác đặc quyền trên phạm vi 3 Vùng & 15 Chi nhánh. Mọi nội dung trao đổi khách hàng được mã hóa, chỉ hiển thị siêu dữ liệu kiểm toán.
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Mã Phiếu</th>
              <th>Chi Nhánh</th>
              <th>Số Lượng Xin</th>
              <th>Lý Do Nghiệp Vụ</th>
              <th>Người Đề Xuất</th>
              <th>Thời Gian</th>
              <th>Trạng Thái</th>
              <th style="text-align: right;">Quyết Định</th>
            </tr>
          </thead>
          <tbody>
            ${allRequests.map(r => `
              <tr>
                <td><strong>${r.id}</strong></td>
                <td><strong>${r.branchName}</strong></td>
                <td><span style="color: var(--primary); font-weight: 700;">+${r.requestQty}</span></td>
                <td style="max-width: 250px;">${r.reason}</td>
                <td>${r.requester}</td>
                <td><code>${r.requestedAt}</code></td>
                <td>
                  <span class="badge ${r.status === 'Approved' ? 'badge-success' : r.status === 'Pending' ? 'badge-warning' : 'badge-danger'}">
                    ${r.status === 'Approved' ? 'Đã Phê Duyệt' : r.status === 'Pending' ? 'Chờ Duyệt' : 'Đã Từ Chối'}
                  </span>
                </td>
                <td style="text-align: right;">
                  ${r.status === 'Pending' ? `
                    <button class="btn btn-secondary btn-sm btn-reject-q" data-id="${r.id}">Từ Chối</button>
                    <button class="btn btn-primary btn-sm btn-approve-q" data-id="${r.id}">Duyệt</button>
                  ` : `<span style="color: var(--text-muted); font-size: 11px;">Đã xử lý</span>`}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    container.querySelectorAll('.btn-approve-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const r = state.quotaRequests.find(x => x.id === btn.dataset.id);
        if (r) {
          r.status = 'Approved';
          addAuditLog('Trần Đình Trọng (Region Admin)', 'Phê duyệt hạn ngạch', `${r.branchName} (+${r.requestQty})`, 'Vùng Miền Nam');
          showToast(`Đã phê duyệt cấp ${r.requestQty} Quota cho ${r.branchName}!`, 'success');
          renderActiveView();
          renderNav();
        }
      });
    });

    container.querySelectorAll('.btn-reject-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const r = state.quotaRequests.find(x => x.id === btn.dataset.id);
        if (r) {
          r.status = 'Rejected';
          addAuditLog('Trần Đình Trọng (Region Admin)', 'Từ chối cấp hạn ngạch', `${r.branchName}`, 'Vùng Miền Nam');
          showToast(`Đã từ chối đề xuất của ${r.branchName}!`, 'info');
          renderActiveView();
          renderNav();
        }
      });
    });
  }

  // =========================================================================
  // VIEW: REGION ADMIN — NHÂN SỰ VÙNG MIỀN NAM
  // =========================================================================
  function renderRegionalStaffView(container, title, desc, actions) {
    title.textContent = 'Nhân Sự Vùng Miền Nam (2,450 Nhân Sự)';
    desc.textContent = 'Danh sách 2,450 nhân sự trực thuộc 3 Chi nhánh trong Vùng Miền Nam.';

    const filtered = getFilteredEmployees().filter(e => e.regionId === 'REG_SOUTH');

    actions.innerHTML = `
      <span style="font-size: 11.5px; color: var(--text-muted); align-self: center;">Hiển thị ${filtered.length} / 2,450 nhân sự</span>
      <button class="btn btn-secondary btn-sm" onclick="downloadMockCsv('Danh_Sach_Nhan_Su_Vung_Mien_Nam.csv', [['Mã NV', 'Họ Tên', 'Chi Nhánh', 'Chức Vụ', 'Trạng Thái'], ...state.employees.map(e => [e.id, e.name, e.branch, e.role, e.status])])">Xuất Danh Sách</button>
    `;

    container.innerHTML = `
      <div class="callout callout-info" style="margin-bottom: 16px;">
        <strong>CHẾ ĐỘ KIỂM SOÁT TUÂN THỦ (PRIVACY LEVEL 5 - FR06):</strong><br>
        Nhật ký kiểm toán vĩ mô ghi nhận toàn bộ biến động Quota, cấp phát tài khoản và thao tác đặc quyền trên phạm vi 3 Vùng & 15 Chi nhánh. Mọi nội dung trao đổi khách hàng được mã hóa, chỉ hiển thị siêu dữ liệu kiểm toán.
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Mã NV</th>
              <th>Họ Và Tên</th>
              <th>Email</th>
              <th>Chi Nhánh</th>
              <th>Tài Khoản Enterprise</th>
              <th>Trạng Thái TK</th>
              <th>Khách Hàng Phụ Trách</th>
              <th>Hoạt Động Gần Nhất</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(e => `
              <tr>
                <td><strong>${e.id}</strong></td>
                <td>${e.name}</td>
                <td><code>${e.email}</code></td>
                <td>${e.branchName}</td>
                <td>${e.accountId ? `<strong>${e.accountId}</strong>` : '<span style="color: var(--text-muted);">Chưa gán</span>'}</td>
                <td>
                  <span class="badge ${
                    e.accountStatus === 'Active' ? 'badge-success' :
                    e.accountStatus === 'Suspended' ? 'badge-danger' :
                    e.accountStatus === 'Pending Activation' ? 'badge-warning' : 'badge-neutral'
                  }">${e.accountStatus}</span>
                </td>
                <td>${e.customersCount}</td>
                <td>${e.lastActivity}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // =========================================================================
  // VIEW: REGION ADMIN — ĐIỀU CHUYỂN NHÂN SỰ LIÊN CHI NHÁNH
  // =========================================================================
  function renderCrossBranchHandoverView(container, title, desc, actions) {
    title.textContent = 'Điều Chuyển Nhân Sự Liên Chi Nhánh';
    desc.textContent = 'Giám sát điều chuyển nhân sự và chuyển giao danh bạ khách hàng giữa các Chi nhánh trong Vùng.';

    actions.innerHTML = `
      <button class="btn btn-primary btn-sm" id="btn-open-transfer-sales">+ Tạo Lệnh Điều Chuyển Vùng (US09)</button>
    `;

    container.innerHTML = `
      <div class="callout callout-info" style="margin-bottom: 16px;">
        <strong>CHẾ ĐỘ KIỂM SOÁT TUÂN THỦ (PRIVACY LEVEL 5 - FR06):</strong><br>
        Nhật ký kiểm toán vĩ mô ghi nhận toàn bộ biến động Quota, cấp phát tài khoản và thao tác đặc quyền trên phạm vi 3 Vùng & 15 Chi nhánh. Mọi nội dung trao đổi khách hàng được mã hóa, chỉ hiển thị siêu dữ liệu kiểm toán.
      </div>
      <div class="table-container">
        <div class="table-toolbar">
          <strong>Hàng Đợi Điều Chuyển Liên Chi Nhánh (Vùng Miền Nam)</strong>
          <span class="badge badge-neutral">1 Trường hợp đang theo dõi</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Nhân Sự Điều Chuyển</th>
              <th>Chi Nhánh Đi</th>
              <th>Chi Nhánh Đến</th>
              <th>Tài Khoản Enterprise</th>
              <th>Khách Hàng Bàn Giao</th>
              <th>Tình Trạng Hạn Ngạch</th>
              <th style="text-align: right;">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Trần Văn F (EMP-00133)</strong></td>
              <td>Chi nhánh HCM 01</td>
              <td>Chi nhánh Đồng Nai</td>
              <td>ZENT-001298 (Bảo lưu)</td>
              <td>45 Khách hàng (Đã bàn giao)</td>
              <td><span class="badge badge-success">Chuyển kèm 1 Quota sang Đồng Nai</span></td>
              <td style="text-align: right;">
                <button class="btn btn-secondary btn-sm" onclick="showToast('Đã xác nhận hoàn tất điều chuyển!', 'success')">Xác Nhận Đón Nhận</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('btn-open-transfer-sales')?.addEventListener('click', () => {
      openTransferSalesModal();
    });
  }

  // =========================================================================
  // VIEW: BRANCH ADMIN — BÀN ĐIỀU HÀNH CHI NHÁNH HCM 01
  // =========================================================================
  function renderBranchCockpitView(container, title, desc, actions) {
    title.textContent = 'Bàn Điều Hành Chi Nhánh HCM 01 - Tân Bình';
    desc.textContent = 'Quản lý hạn ngạch 300 Quota, 281 nhân sự và các việc cần tác nghiệp ngay trong ngày.';

    const unassignedCount = state.employees.filter(e => e.branchId === 'HCM01' && !e.accountId).length;

    actions.innerHTML = `
      <button class="btn btn-secondary btn-sm" id="btn-branch-request-quota">Xin Cấp Thêm Quota</button>
      <button class="btn btn-primary btn-sm" id="btn-branch-assign-staff">+ Cấp Tài Khoản Mới</button>
    `;

    container.innerHTML = `
      <!-- Single KPI Row (Dynamic Quota Model) -->
      ${(() => {
        const b = getBranchMetrics('HCM01');
        return `
          <div class="metric-grid">
            <div class="metric-card">
              <div class="metric-label">Hạn Ngạch Được Vùng Cấp</div>
              <div class="metric-value">${b.allocated}</div>
              <div class="metric-sub">Định mức Quota chi nhánh HCM 01</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Đã Gán Cho Nhân Viên</div>
              <div class="metric-value">${b.assigned}</div>
              <div class="metric-sub">Tài khoản Enterprise đang vận hành</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Quota Khả Dụng Để Cấp</div>
              <div class="metric-value" style="color: ${b.available > 0 ? '#059669' : 'var(--danger-solid)'};">${b.available}</div>
              <div class="metric-sub">${b.available > 0 ? 'Sẵn sàng cấp cho nhân sự mới' : 'Cảnh báo Zero Quota!'}</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Tổng Nhân Sự Chi Nhánh</div>
              <div class="metric-value">${b.employees}</div>
              <div class="metric-sub">${unassignedCount} Nhân sự chưa có tài khoản</div>
            </div>
          </div>
        `;
      })()}

      ${(() => {
        const overdueCust = state.customers.find(c => (c.hoursSinceLastMsg || 0) > 24);
        if (overdueCust) {
          return `
            <div class="callout callout-danger" style="margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <strong>Cảnh Báo Vi Phạm SLA Nghiêm Trọng (> 48h):</strong> Khách hàng <strong>${overdueCust.name}</strong> (${overdueCust.handlerName} phụ trách) đang chờ phản hồi suốt <strong>${overdueCust.hoursSinceLastMsg} giờ</strong>.
              </div>
              <button class="btn btn-danger btn-sm" id="btn-quick-reply-hainam">Mở Chat Trả Lời Ngay</button>
            </div>
          `;
        }
        return '';
      })()}

      <!-- DUAL EXECUTIVE CHARTS: CÂN BẰNG TẢI & CHẤT LƯỢNG PHỤC VỤ SLA -->
      <div class="dual-chart-grid">
        
        <!-- Chart Card 1: Cân Bằng Tải Khách Hàng vs Định Mức An Toàn -->
        <div class="executive-chart-card" style="margin-bottom: 0;">
          <div class="chart-header-row">
            <div>
              <div style="font-weight: 700; font-size: 13.5px; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                Phân Bổ Tải Khách Hàng / Nhân Sự
                <span class="badge badge-primary">272 Khách Hàng</span>
              </div>
              <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">
                So sánh số lượng khách hàng với định mức an toàn (70 KH/Sales)
              </div>
            </div>
            <div class="chart-legend">
              <div class="legend-item"><span class="legend-dot" style="background: #10b981;"></span> Tối Ưu (40-70)</div>
              <div class="legend-item"><span class="legend-dot" style="background: #ef4444;"></span> Quá Tải (>70)</div>
              <div class="legend-item"><span class="legend-dot" style="background: #94a3b8;"></span> Dưới Định Mức</div>
            </div>
          </div>

          <div style="width: 100%; overflow-x: auto;">
            <svg viewBox="0 0 460 195" style="width: 100%; height: auto; font-family: inherit;">
              <!-- Grid & Benchmark Line -->
              <line x1="45" y1="20" x2="440" y2="20" stroke="#f1f5f9" stroke-width="1" />
              <line x1="45" y1="55" x2="440" y2="55" stroke="#f1f5f9" stroke-width="1" />
              <line x1="45" y1="90" x2="440" y2="90" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4" />
              <text x="440" y="85" text-anchor="end" font-size="9" font-weight="700" fill="#d97706">--- Ngưỡng An Toàn (70 KH)</text>
              <line x1="45" y1="125" x2="440" y2="125" stroke="#f1f5f9" stroke-width="1" />
              <line x1="45" y1="160" x2="440" y2="160" stroke="#cbd5e1" stroke-width="1.5" />

              <!-- Y Axis Labels -->
              <text x="38" y="24" text-anchor="end" font-size="9" fill="#94a3b8">140</text>
              <text x="38" y="59" text-anchor="end" font-size="9" fill="#94a3b8">100</text>
              <text x="38" y="94" text-anchor="end" font-size="9" font-weight="700" fill="#d97706">70</text>
              <text x="38" y="129" text-anchor="end" font-size="9" fill="#94a3b8">40</text>
              <text x="38" y="164" text-anchor="end" font-size="9" fill="#94a3b8">0</text>

              <!-- Column 1: Trần Thị B (65 KH) -->
              <rect x="75" y="95" width="46" height="65" rx="4" fill="#10b981" />
              <text x="98" y="88" text-anchor="middle" font-size="10.5" font-weight="700" fill="#059669">65 KH</text>
              <text x="98" y="174" text-anchor="middle" font-size="10" font-weight="600" fill="#334155">Trần B</text>
              <text x="98" y="186" text-anchor="middle" font-size="8.5" fill="#059669">(93% Tải)</text>

              <!-- Column 2: Nguyễn Văn A (48 KH) -->
              <rect x="155" y="112" width="46" height="48" rx="4" fill="#2563eb" />
              <text x="178" y="105" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1d4ed8">48 KH</text>
              <text x="178" y="174" text-anchor="middle" font-size="10" font-weight="600" fill="#334155">Nguyễn A</text>
              <text x="178" y="186" text-anchor="middle" font-size="8.5" fill="#1d4ed8">(69% Tải)</text>

              <!-- Column 3: Phạm Văn D (127 KH - Quá Tải) -->
              <rect x="235" y="33" width="46" height="127" rx="4" fill="#ef4444" />
              <text x="258" y="25" text-anchor="middle" font-size="10.5" font-weight="700" fill="#dc2626">127 KH (Quá Tải)</text>
              <text x="258" y="174" text-anchor="middle" font-size="10" font-weight="700" fill="#dc2626">Phạm D</text>
              <text x="258" y="186" text-anchor="middle" font-size="8.5" font-weight="700" fill="#dc2626">(181% QUÁ TẢI)</text>

              <!-- Column 4: Lê Văn C (32 KH) -->
              <rect x="315" y="128" width="46" height="32" rx="4" fill="#94a3b8" />
              <text x="338" y="121" text-anchor="middle" font-size="10.5" font-weight="600" fill="#64748b">32 KH</text>
              <text x="338" y="174" text-anchor="middle" font-size="10" font-weight="600" fill="#64748b">Lê C</text>
              <text x="338" y="186" text-anchor="middle" font-size="8.5" fill="#64748b">(Tạm khóa)</text>

              <!-- Column 5: Vũ Minh K (0 KH) -->
              <rect x="395" y="157" width="46" height="3" rx="1.5" fill="#cbd5e1" stroke="#94a3b8" stroke-dasharray="2" />
              <text x="418" y="150" text-anchor="middle" font-size="10" font-weight="600" fill="#94a3b8">0 KH</text>
              <text x="418" y="174" text-anchor="middle" font-size="10" font-weight="600" fill="#64748b">Vũ K</text>
              <text x="418" y="186" text-anchor="middle" font-size="8.5" fill="#d97706">(Chờ kích hoạt)</text>
            </svg>
          </div>
        </div>

        <!-- Chart Card 2: Chất Lượng Phục Vụ SLA & Tốc Độ Phản Hồi -->
        <div class="executive-chart-card" style="margin-bottom: 0; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="chart-header-row">
              <div>
                <div style="font-weight: 700; font-size: 13.5px; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                  Tốc Độ Phản Hồi & Chất Lượng Phục Vụ SLA
                  <span class="badge badge-success">Đạt Chuẩn SLA</span>
                </div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">
                  Thời gian tiếp nhận & phản hồi tin nhắn khách hàng trên Zalo Enterprise
                </div>
              </div>
            </div>

            <!-- 3 KPI Pills Row (Reactive SLA) -->
            ${(() => {
              const overdueCust = state.customers.find(c => (c.hoursSinceLastMsg || 0) > 24);
              return `
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 14px;">
                  <div class="sla-progress-card">
                    <div style="font-size: 10.5px; color: var(--text-muted);">SLA Phản Hồi Đúng Hạn</div>
                    <div class="sla-metric-badge" style="color: #059669;">98.4%</div>
                    <div style="font-size: 10px; color: #059669;">Chuẩn FPT: > 95%</div>
                  </div>
                  <div class="sla-progress-card">
                    <div style="font-size: 10.5px; color: var(--text-muted);">Thời Gian Phản Hồi TB</div>
                    <div class="sla-metric-badge" style="color: var(--primary);">12 phút</div>
                    <div style="font-size: 10px; color: var(--primary);">Mục tiêu: &lt; 15 phút</div>
                  </div>
                  <div class="sla-progress-card" style="${overdueCust ? 'border-color: #f87171; background: #fef2f2;' : ''}">
                    <div style="font-size: 10.5px; color: ${overdueCust ? '#991b1b; font-weight: 700;' : 'var(--text-muted);'}">
                      ${overdueCust ? 'Bỏ Sót Quá 48h' : 'Bỏ Sót Quá 24h'}
                    </div>
                    <div class="sla-metric-badge" style="color: ${overdueCust ? '#dc2626;' : '#059669;'}">${overdueCust ? '1 KH' : '0 KH'}</div>
                    <div style="font-size: 10px; color: ${overdueCust ? '#dc2626;' : '#059669;'}">${overdueCust ? 'Hải Nam (50h)' : '100% An toàn'}</div>
                  </div>
                </div>
              `;
            })()}

            <!-- Rep Comparison Progress Bars -->
            <div style="display: flex; flex-direction: column; gap: 10px; font-size: 12px;">
              <div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                  <span><strong>Trần Thị B</strong> (Top 1)</span>
                  <span style="color: #059669; font-weight: 700;">98.5% • TB 12 phút</span>
                </div>
                <div class="progress-bar-container" style="height: 7px;">
                  <div class="progress-bar-fill" style="width: 98.5%; background: #10b981;"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                  <span><strong>Nguyễn Văn A</strong> (Top 2)</span>
                  <span style="color: #1d4ed8; font-weight: 700;">96.0% • TB 18 phút</span>
                </div>
                <div class="progress-bar-container" style="height: 7px;">
                  <div class="progress-bar-fill" style="width: 96%; background: #2563eb;"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                  <span><strong>Phạm Văn D</strong> (Quá tải 127 KH)</span>
                  <span style="color: #dc2626; font-weight: 700;">84.0% • TB 45 phút</span>
                </div>
                <div class="progress-bar-container" style="height: 7px;">
                  <div class="progress-bar-fill" style="width: 84%; background: #ef4444;"></div>
                </div>
              </div>
            </div>
          </div>

          <div style="margin-top: 12px; padding: 8px 12px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; font-size: 11px; color: #92400e;">
            <strong>Tác động điều hành:</strong> San tải 127 KH của Phạm Văn D sẽ lập tức nâng chỉ số SLA phản hồi toàn chi nhánh lên <strong>98.5%</strong>.
          </div>
        </div>

      </div>

      <!-- BENCHMARK SCORECARD: BẢNG XẾP HẠNG & SỨC KHỎE VẬN HÀNH TỪNG NHÂN SỰ -->
      <div class="table-container">
        <div class="table-toolbar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <strong>Bảng Xếp Hạng & Sức Khỏe Vận Hành Nhân Sự Kinh Doanh (Sales Rep Operational Scorecard)</strong>
            <span class="badge badge-primary">Tiêu chí: Số KH phụ trách, Tải so với định mức 70 KH, Tỷ lệ SLA, T/G phản hồi & Điểm sức khỏe</span>
          </div>
          <span class="badge badge-neutral">Đánh Giá Trực Tiếp Chi Nhánh HCM 01</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 75px;">Hạng</th>
              <th>Nhân Sự Kinh Doanh</th>
              <th>Tài Khoản Z-Enterprise</th>
              <th>Khách Hàng Phụ Trách</th>
              <th>Tải So Định Mức (70 KH)</th>
              <th>SLA Phản Hồi</th>
              <th>T/G Phản Hồi TB</th>
              <th>Điểm Sức Khỏe</th>
              <th>Đánh Giá Chi Nhánh</th>
              <th style="text-align: right;">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: #f0fdf4;">
              <td><span class="rank-badge rank-badge-1">Hạng 1</span></td>
              <td>
                <div style="font-weight: 700; color: var(--text-primary);">Trần Thị B</div>
                <div style="font-size: 11px; color: var(--text-muted);">EMP-00129 • <code>b.tran@fpt.com.vn</code></div>
              </td>
              <td><strong>ZENT-001294</strong></td>
              <td><strong style="color: #059669; font-size: 13px;">65 KH</strong> <span style="font-size: 11px; color: var(--text-muted);">(24%)</span></td>
              <td><span class="health-score-capsule health-score-high">93% (Lý Tưởng)</span></td>
              <td><span style="font-weight: 700; color: #059669;">98.5%</span></td>
              <td><span style="font-weight: 600; color: #059669;">12 phút</span></td>
              <td><span class="health-score-capsule health-score-high">98 / 100</span></td>
              <td><span class="badge badge-success">Xuất Sắc Nhất Chi Nhánh</span></td>
              <td style="text-align: right;">
                <button class="btn btn-secondary btn-sm btn-view-rep-portfolio" data-name="Trần Thị B" data-count="65">Xem Portfolio</button>
              </td>
            </tr>

            <tr>
              <td><span class="rank-badge rank-badge-2">Hạng 2</span></td>
              <td>
                <div style="font-weight: 700; color: var(--text-primary);">Nguyễn Văn A</div>
                <div style="font-size: 11px; color: var(--text-muted);">EMP-00128 • <code>a.nguyen@fpt.com.vn</code></div>
              </td>
              <td><strong>ZENT-001293</strong></td>
              <td><strong style="color: #1d4ed8; font-size: 13px;">48 KH</strong> <span style="font-size: 11px; color: var(--text-muted);">(18%)</span></td>
              <td><span class="health-score-capsule health-score-med">69% (Cân Bằng)</span></td>
              <td><span style="font-weight: 700; color: #1d4ed8;">96.0%</span></td>
              <td><span style="font-weight: 600; color: #1d4ed8;">18 phút</span></td>
              <td><span class="health-score-capsule health-score-high">94 / 100</span></td>
              <td><span class="badge badge-neutral">Chuẩn Mực & Sẵn Sàng Nhận Thêm</span></td>
              <td style="text-align: right;">
                <button class="btn btn-secondary btn-sm btn-view-rep-portfolio" data-name="Nguyễn Văn A" data-count="48">Xem Portfolio</button>
              </td>
            </tr>

            <tr style="background: #fff5f5;">
              <td><span class="rank-badge" style="background:#fef2f2; color:#991b1b; border:1px solid #fecaca;">Cần Điều Chỉnh</span></td>
              <td>
                <div style="font-weight: 700; color: var(--danger-solid);">Phạm Văn D</div>
                <div style="font-size: 11px; color: var(--danger-solid); font-weight: 600;">EMP-00131 • Nghỉ việc 30/09</div>
              </td>
              <td><strong>ZENT-001296</strong></td>
              <td><strong style="color: var(--danger-solid); font-size: 13px;">127 KH</strong> <span style="font-size: 11px; color: var(--danger-solid); font-weight: 700;">(47%)</span></td>
              <td><span class="health-score-capsule health-score-low">181% (Quá Tải )</span></td>
              <td><span style="font-weight: 700; color: var(--danger-solid);">84.0%</span></td>
              <td><span style="font-weight: 600; color: var(--danger-solid);">45 phút</span></td>
              <td><span class="health-score-capsule health-score-warn">62 / 100</span></td>
              <td><span class="badge badge-danger">Cần Bàn Giao Khẩn Cấp</span></td>
              <td style="text-align: right;">
                <button class="btn btn-primary btn-sm btn-scorecard-handover">Bàn Giao Ngay</button>
              </td>
            </tr>

            <tr>
              <td><span class="rank-badge rank-badge-3">Hạng 4</span></td>
              <td>
                <div style="font-weight: 700; color: var(--text-primary);">Lê Văn C</div>
                <div style="font-size: 11px; color: var(--text-muted);">EMP-00130 • <code>c.le@fpt.com.vn</code></div>
              </td>
              <td><strong>ZENT-001295</strong></td>
              <td><strong>32 KH</strong> <span style="font-size: 11px; color: var(--text-muted);">(11%)</span></td>
              <td><span class="health-score-capsule" style="background: #f1f5f9; color: #64748b;">46% (Tạm Dừng)</span></td>
              <td><span style="color: var(--text-muted);">-- (Tạm ngưng)</span></td>
              <td><span style="color: var(--text-muted);">--</span></td>
              <td><span class="health-score-capsule health-score-low">50 / 100</span></td>
              <td><span class="badge badge-warning">Tạm Khóa Chờ Rà Soát</span></td>
              <td style="text-align: right;">
                <button class="btn btn-secondary btn-sm btn-scorecard-restore">Kích Hoạt Lại</button>
              </td>
            </tr>

            <tr>
              <td><span class="badge badge-neutral">Chờ</span></td>
              <td>
                <div style="font-weight: 700; color: var(--text-primary);">Vũ Minh K</div>
                <div style="font-size: 11px; color: var(--text-muted);">EMP-00136 • Tiếp nhận 23/09</div>
              </td>
              <td><span style="color: var(--text-muted);">ZENT-001299 (Pending)</span></td>
              <td><span style="color: var(--text-muted);">0 KH</span></td>
              <td><span style="color: var(--text-muted);">0% (Sẵn Sàng)</span></td>
              <td><span style="color: var(--text-muted);">--</span></td>
              <td><span style="color: var(--text-muted);">--</span></td>
              <td><span class="health-score-capsule health-score-med">--</span></td>
              <td><span class="badge badge-warning">Thư Mời Còn 46h</span></td>
              <td style="text-align: right;">
                <button class="btn btn-secondary btn-sm btn-scorecard-resend">Gửi Lại Thư Mời</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Action Items & Workload Balancing Side-by-Side -->
      <div style="display: grid; grid-template-columns: 1fr 380px; gap: 20px; margin-bottom: 20px;">
        
        <!-- Action Items Checklist -->
        <div class="table-container" style="margin-bottom: 0;">
          <div class="table-toolbar">
            <strong>Danh Sách Việc Cần Tác Nghiệp Ngay (Action Items)</strong>
            <span class="badge badge-warning">4 Việc Cần Xử Lý</span>
          </div>
          <div style="padding: 16px; display: flex; flex-direction: column; gap: 12px;">
            
            <div class="approval-card" style="margin-bottom: 0;">
              <div class="approval-info">
                <div class="approval-title" style="color: var(--warning-text);">Có ${unassignedCount} nhân viên kinh doanh mới tiếp nhận chưa có tài khoản Enterprise</div>
                <div class="approval-meta">Điển hình: Đặng Thị H (EMP-00135) - Tiếp nhận ngày 24/09/2026. Quota chi nhánh còn 24 suất khả dụng.</div>
              </div>
              <button class="btn btn-primary btn-sm" id="btn-go-assign-staff">Cấp Tài Khoản Ngay</button>
            </div>

            <div class="approval-card" style="margin-bottom: 0;">
              <div class="approval-info">
                <div class="approval-title" style="color: var(--warning-text);">Thư mời kích hoạt tài khoản của Vũ Minh K sắp hết hạn (còn 46 giờ)</div>
                <div class="approval-meta">Email: <code>k.vu@fpt.com.vn</code> • Đã gửi lúc 23/09/2026 10:00. Nhân sự chưa mở link kích hoạt.</div>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-resend-k-invite">Gửi Lại Thư Mời</button>
            </div>

            <div class="approval-card" style="margin-bottom: 0;">
              <div class="approval-info">
                <div class="approval-title" style="color: var(--danger-solid);">Phạm Văn D (EMP-00131) sắp nghỉ việc 30/09 - Cần bàn giao 127 khách hàng</div>
                <div class="approval-meta">Tài khoản ZENT-001296 đang quản lý 127 khách hàng doanh nghiệp VIP. Bắt buộc hoàn tất bàn giao trước ngày nghỉ việc.</div>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-go-handover">Mở Trung Tâm Bàn Giao</button>
            </div>

            <div class="approval-card" style="margin-bottom: 0;">
              <div class="approval-info">
                <div class="approval-title">Tài khoản Lê Văn C (EMP-00130) đang bị tạm khóa</div>
                <div class="approval-meta">Tạm khóa ngày 22/09/2026 theo yêu cầu rà soát bảo mật tài khoản nhân sự.</div>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-restore-c">Kích Hoạt Lại</button>
            </div>

            <div class="approval-card" style="margin-bottom: 0; border: 1.5px solid #f87171; background: #fff5f5;">
              <div class="approval-info">
                <div class="approval-title" style="color: var(--danger-solid);">Đoàn Thanh L (EMP-00137) đã thôi việc trên HR nhưng tài khoản ZENT-001301 vẫn Active</div>
                <div class="approval-meta">Phụ trách 18 khách hàng doanh nghiệp. Theo quy định RBAC FPT ISC, Branch Admin bắt buộc thực hiện Thu hồi tài khoản & Bàn giao ngay.</div>
              </div>
              <button class="btn btn-danger btn-sm" id="btn-branch-offboard-l">Thu Hồi & Bàn Giao</button>
            </div>

          </div>
        </div>

        <!-- Customer Workload Balancing Engine (Safe Limits <= 70 KH) -->
        <div class="table-container" style="margin-bottom: 0;">
          <div class="table-toolbar">
            <strong>Phương Án Cân Bằng Tải Chi Nhánh</strong>
            <span class="badge badge-success">Gợi Ý Phân Bổ Tự Động</span>
          </div>
          <div style="padding: 16px;">
            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">
              Kịch bản tối ưu hóa 127 khách hàng của Phạm Văn D đảm bảo 100% Sales ≤ 70 KH:
            </div>

            <div class="workload-item">
              <div class="workload-header">
                <span>Trần Thị B (+5 KH dự kiến)</span>
                <span style="color: #059669; font-weight: 700;">70 KH (Ngưỡng Tối Đa An Toàn)</span>
              </div>
              <div class="workload-bar-wrap">
                <div class="workload-bar-fill" style="width: 100%; background: #10b981;"></div>
              </div>
            </div>

            <div class="workload-item">
              <div class="workload-header">
                <span>Nguyễn Văn A (+20 KH dự kiến)</span>
                <span style="color: #1d4ed8; font-weight: 700;">68 KH (Cân Bằng Lý Tưởng)</span>
              </div>
              <div class="workload-bar-wrap">
                <div class="workload-bar-fill" style="width: 97%; background: var(--primary);"></div>
              </div>
            </div>

            <div class="workload-item">
              <div class="workload-header">
                <span>Nguyễn Văn E (+40 KH dự kiến)</span>
                <span style="color: #059669; font-weight: 700;">60 KH (Vùng Tối Ưu)</span>
              </div>
              <div class="workload-bar-wrap">
                <div class="workload-bar-fill" style="width: 85%; background: #10b981;"></div>
              </div>
            </div>

            <div class="workload-item">
              <div class="workload-header">
                <span>Vũ Minh K (+32 KH sau kích hoạt)</span>
                <span style="color: #d97706; font-weight: 700;">32 KH (Khởi Đầu Tiêu Chuẩn)</span>
              </div>
              <div class="workload-bar-wrap">
                <div class="workload-bar-fill" style="width: 45%; background: #f59e0b;"></div>
              </div>
            </div>

            <div class="workload-item">
              <div class="workload-header">
                <span>Đặng Thị H (Nhân sự mới +30 KH)</span>
                <span style="color: #64748b; font-weight: 700;">30 KH (Onboarding Tiêu Chuẩn)</span>
              </div>
              <div class="workload-bar-wrap">
                <div class="workload-bar-fill" style="width: 42%; background: #94a3b8;"></div>
              </div>
            </div>

            <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border-subtle); font-size: 11px; color: var(--text-muted); line-height: 1.5;">
              <em>Đề xuất Phân Bổ Tự Động:</em> Kịch bản chia đều 127 KH sang 5 nhân sự, đảm bảo 100% đội ngũ duy trì dưới ngưỡng an toàn 70 KH/người theo chuẩn FPT ISC.
            </div>

            <button class="btn btn-primary btn-sm" style="width: 100%; margin-top: 14px;" id="btn-quick-distribute-plan">Áp Dụng Kịch Bản Phân Phối</button>
          </div>
        </div>

      </div>
    `;

    // Event listeners
    document.getElementById('btn-go-assign-staff')?.addEventListener('click', () => {
      state.activeView = 'staff_account_allocation';
      renderApp();
    });

    document.getElementById('btn-branch-assign-staff')?.addEventListener('click', () => {
      openAssignAccountModal();
    });

    document.getElementById('btn-branch-request-quota')?.addEventListener('click', () => {
      state.activeView = 'branch_quota_requisition';
      renderApp();
    });

    document.getElementById('btn-resend-k-invite')?.addEventListener('click', () => {
      showToast('Đã gửi lại email mời kích hoạt tài khoản Enterprise cho Vũ Minh K!', 'success');
      addAuditLog('Lê Hoàng Nam (Branch Admin)', 'Gửi lại thư mời kích hoạt', 'Vũ Minh K (k.vu@fpt.com.vn)', 'Chi nhánh HCM 01');
    });

    document.getElementById('btn-go-handover')?.addEventListener('click', () => {
      state.activeView = 'customer_handover_center';
      renderApp();
    });

    document.getElementById('btn-restore-c')?.addEventListener('click', () => {
      const emp = state.employees.find(e => e.id === 'EMP-00130');
      if (emp) {
        emp.accountStatus = 'Active';
        addAuditLog('Lê Hoàng Nam (Branch Admin)', 'Kích hoạt lại tài khoản', 'Lê Văn C (EMP-00130)', 'Chi nhánh HCM 01');
        showToast('Đã kích hoạt lại tài khoản cho Lê Văn C thành công!', 'success');
        renderActiveView();
      }
    });

    // Scorecard quick action buttons
    container.querySelectorAll('.btn-scorecard-handover').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeView = 'customer_handover_center';
        renderApp();
      });
    });

    container.querySelectorAll('.btn-scorecard-restore').forEach(btn => {
      btn.addEventListener('click', () => {
        const emp = state.employees.find(e => e.id === 'EMP-00130');
        if (emp) {
          emp.accountStatus = 'Active';
          addAuditLog('Lê Hoàng Nam (Branch Admin)', 'Kích hoạt lại tài khoản từ Scorecard', 'Lê Văn C (EMP-00130)', 'Chi nhánh HCM 01');
          showToast('Đã kích hoạt lại tài khoản cho Lê Văn C thành công!', 'success');
          renderActiveView();
        }
      });
    });

    container.querySelectorAll('.btn-scorecard-resend').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('Đã gửi lại thư mời kích hoạt tài khoản cho Vũ Minh K!', 'success');
        addAuditLog('Lê Hoàng Nam (Branch Admin)', 'Gửi lại thư mời từ Scorecard', 'Vũ Minh K (k.vu@fpt.com.vn)', 'Chi nhánh HCM 01');
      });
    });

    container.querySelectorAll('.btn-view-rep-portfolio').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const count = btn.dataset.count;
        showToast(`Nhân sự ${name} đang phụ trách ${count} khách hàng. Tỷ lệ hài lòng 99.2%!`, 'info');
      });
    });

    document.getElementById('btn-quick-distribute-plan')?.addEventListener('click', () => {
      state.activeView = 'customer_handover_center';
      renderApp();
      showToast('Đã chuyển sang Trung Tâm Bàn Giao để xác nhận phân phối khách hàng!', 'info');
    });

    document.getElementById('btn-quick-reply-hainam')?.addEventListener('click', () => {
      state.currentPersona = 'sales_rep';
      state.activeView = 'sales_workspace';
      state.salesChatSelectedId = 'CUST-001';
      renderApp();
    });

    document.getElementById('btn-branch-offboard-l')?.addEventListener('click', () => {
      const empL = state.employees.find(e => e.id === 'EMP-00137');
      if (empL) openSuspendImpactModal(empL);
    });
  }

  // =========================================================================
  // VIEW: BRANCH ADMIN — CẤP PHÁT & QUẢN LÝ TÀI KHOẢN NHÂN VIÊN
  // =========================================================================
  function renderStaffAccountAllocationView(container, title, desc, actions) {
    title.textContent = 'Cấp Phát & Quản Lý Tài Khoản Nhân Viên';
    desc.textContent = 'Quản trị danh sách nhân sự chi nhánh HCM 01. Thực hiện cấp mới, tạm khóa (có đối soát tác động), hoặc thu hồi tài khoản.';

    const filtered = getFilteredEmployees().filter(e => e.branchId === 'HCM01');

    actions.innerHTML = `
      <span style="font-size: 11.5px; color: var(--text-muted); align-self: center;">${filtered.length} Nhân sự</span>
      <button class="btn btn-primary btn-sm" id="btn-open-assign-modal">+ Cấp Tài Khoản Mới</button>
    `;

    container.innerHTML = `
      <div class="callout callout-info" style="margin-bottom: 16px;">
        <strong>CHẾ ĐỘ KIỂM SOÁT TUÂN THỦ (PRIVACY LEVEL 5 - FR06):</strong><br>
        Nhật ký kiểm toán vĩ mô ghi nhận toàn bộ biến động Quota, cấp phát tài khoản và thao tác đặc quyền trên phạm vi 3 Vùng & 15 Chi nhánh. Mọi nội dung trao đổi khách hàng được mã hóa, chỉ hiển thị siêu dữ liệu kiểm toán.
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Mã NV</th>
              <th>Họ Và Tên</th>
              <th>Email FPT</th>
              <th>Tài Khoản Z-Enterprise</th>
              <th>Trạng Thái TK</th>
              <th>Khách Hàng</th>
              <th>Phiên Online</th>
              <th style="text-align: right;">Hành Động Tác Nghiệp</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(e => `
              <tr>
                <td><strong>${e.id}</strong></td>
                <td>
                  <strong>${e.name}</strong>
                  <div style="font-size: 11px; color: var(--text-muted);">${e.jobStatus}</div>
                </td>
                <td><code>${e.email}</code></td>
                <td>
                  ${e.accountId ? `<strong style="color: var(--primary);">${e.accountId}</strong>` : `<span class="badge badge-warning">Chưa cấp</span>`}
                </td>
                <td>
                  <span class="badge ${
                    e.accountStatus === 'Active' ? 'badge-success' :
                    e.accountStatus === 'Suspended' ? 'badge-danger' :
                    e.accountStatus === 'Pending Activation' ? 'badge-warning' : 'badge-neutral'
                  }">${e.accountStatus}</span>
                </td>
                <td><strong>${e.customersCount}</strong> KH</td>
                <td>${e.sessions.length > 0 ? `<span class="badge badge-success">Online</span>` : '<span style="color: var(--text-muted);">Offline</span>'}</td>
                <td style="text-align: right;">
                  ${!e.accountId ? `
                    <button class="btn btn-primary btn-sm btn-action-assign" data-emp-id="${e.id}" data-emp-name="${e.name}" data-emp-email="${e.email}">+ Cấp Tài Khoản</button>
                  ` : e.accountStatus === 'Active' ? `
                    <button class="btn btn-secondary btn-sm btn-action-suspend" data-emp-id="${e.id}" data-emp-name="${e.name}">Tạm Khóa</button>
                    ${e.jobStatus.includes('Leaving') ? `
                      <button class="btn btn-secondary btn-sm btn-action-handover" data-emp-id="${e.id}" style="color: var(--danger-solid);">Bàn Giao & Thu Hồi</button>
                    ` : ''}
                  ` : e.accountStatus === 'Suspended' ? `
                    <button class="btn btn-secondary btn-sm btn-action-activate" data-emp-id="${e.id}">Mở Khóa</button>
                  ` : `
                    <button class="btn btn-secondary btn-sm" onclick="showToast('Đã gửi lại mã xác nhận email!', 'info')">Gửi Lại Email</button>
                  `}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('btn-open-assign-modal')?.addEventListener('click', openAssignAccountModal);

    container.querySelectorAll('.btn-action-assign').forEach(btn => {
      btn.addEventListener('click', () => {
        const empId = btn.dataset.empId;
        const empName = btn.dataset.empName;
        const empEmail = btn.dataset.empEmail;
        executeAssignAccount(empId, empName, empEmail);
      });
    });

    container.querySelectorAll('.btn-action-suspend').forEach(btn => {
      btn.addEventListener('click', () => {
        const empId = btn.dataset.empId;
        const emp = state.employees.find(e => e.id === empId);
        if (emp) openSuspendImpactModal(emp);
      });
    });

    container.querySelectorAll('.btn-action-activate').forEach(btn => {
      btn.addEventListener('click', () => {
        const empId = btn.dataset.empId;
        const emp = state.employees.find(e => e.id === empId);
        if (emp) {
          emp.accountStatus = 'Active';
          addAuditLog('Lê Hoàng Nam (Branch Admin)', 'Mở khóa tài khoản Enterprise', `${emp.name} (${emp.id})`, 'Chi nhánh HCM 01');
          showToast(`Đã mở khóa tài khoản cho ${emp.name}!`, 'success');
          renderActiveView();
        }
      });
    });

    container.querySelectorAll('.btn-action-handover').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeView = 'customer_handover_center';
        renderApp();
      });
    });
  }

  function executeAssignAccount(empId, empName, empEmail) {
    const emp = state.employees.find(e => e.id === empId);
    if (!emp) return;
    const south = state.orgTree[0].children.find(r => r.id === 'REG_SOUTH');
    const branch = south.children.find(b => b.id === 'HCM01');
    if (branch) {
      if (branch.available <= 0) {
        showToast('Chi nhánh HCM 01 đã hết Quota khả dụng (Zero Quota)! Vui lòng xin thêm Quota.', 'danger');
        return;
      }
      branch.available -= 1;
      branch.assigned += 1;
    }
    const newAccId = `ZENT-00${Math.floor(1300 + Math.random() * 100)}`;
    emp.accountId = newAccId;
    emp.accountStatus = 'Pending Activation';

    // Add to activation queue
    state.activationQueue.push({
      id: `ACT-00${state.activationQueue.length + 1}`,
      empId: emp.id,
      name: emp.name,
      email: emp.email,
      branchName: 'Chi nhánh HCM 01',
      accountId: newAccId,
      sentAt: 'Vừa xong',
      expiresAt: 'Sau 72 giờ',
      hoursLeft: 72,
      status: 'Pending'
    });

    addAuditLog('Lê Hoàng Nam (Branch Admin)', 'Cấp phát tài khoản Enterprise', `${emp.name} → ${newAccId}`, 'Chi nhánh HCM 01');
    showToast(`Đã cấp mã tài khoản ${newAccId} cho ${emp.name} và gửi thư mời kích hoạt!`, 'success');
    renderActiveView();
    renderNav();
  }

  function openAssignAccountModal() {
    const unassigned = state.employees.filter(e => e.branchId === 'HCM01' && !e.accountId);
    if (unassigned.length === 0) {
      showToast('Tất cả nhân sự trong chi nhánh đều đã có tài khoản!', 'info');
      return;
    }

    openModal(
      'Cấp Phát Tài Khoản Zalo Enterprise Mới',
      `
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div>
            <label class="form-label">Chọn Nhân Viên Cần Cấp (Biên chế HR):</label>
            <select class="form-input" id="modal-select-unassigned-emp">
              ${unassigned.map(e => `<option value="${e.id}">${e.name} (${e.email})</option>`).join('')}
            </select>
          </div>
          <div class="callout callout-info" style="font-size: 11.5px;">
            Quota chi nhánh HCM 01 hiện khả dụng: <strong>24 Quota</strong>. Thao tác này sẽ trừ 1 Quota khả dụng và gửi thư mời kích hoạt có thời hạn 72h tới email công ty của nhân viên.
          </div>
        </div>
      `,
      `
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('modal-generic').classList.remove('active')">Hủy</button>
        <button class="btn btn-primary btn-sm" id="btn-confirm-assign-modal">Xác Nhận & Gửi Thư Kích Hoạt</button>
      `
    );

    document.getElementById('btn-confirm-assign-modal')?.addEventListener('click', () => {
      const empId = document.getElementById('modal-select-unassigned-emp').value;
      const emp = state.employees.find(e => e.id === empId);
      if (emp) {
        closeModal();
        executeAssignAccount(emp.id, emp.name, emp.email);
      }
    });
  }

  function openSuspendImpactModal(emp) {
    openModal(
      `Tạm Khóa Tài Khoản: ${emp.name} (${emp.accountId})`,
      `
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div class="callout callout-warning">
            <strong>ĐỐI SOÁT TÁC ĐỘNG NGHIỆP VỤ TRƯỚC KHI KHÓA:</strong>
          </div>
          <div class="metric-grid" style="grid-template-columns: 1fr 1fr; margin-bottom: 0;">
            <div class="metric-card">
              <div class="metric-label">Số Phiên Bị Ngắt Ngay</div>
              <div class="metric-value" style="color: var(--danger-solid);">${emp.sessions.length}</div>
              <div class="metric-sub">Đăng xuất ngay lập tức</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Số Khách Hàng Bảo Lưu</div>
              <div class="metric-value">${emp.customersCount}</div>
              <div class="metric-sub">Khách hàng được bảo toàn</div>
            </div>
          </div>
          <div>
            <label class="form-label">Lý do tạm khóa:</label>
            <textarea class="form-input" id="suspend-reason" rows="2" placeholder="Ví dụ: Tạm dừng công việc theo yêu cầu bộ phận HR hoặc bàn giao công tác..."></textarea>
          </div>
        </div>
      `,
      `
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('modal-generic').classList.remove('active')">Hủy</button>
        <button class="btn btn-danger btn-sm" id="btn-confirm-suspend-action">Xác Nhận Tạm Khóa</button>
      `
    );

    document.getElementById('btn-confirm-suspend-action')?.addEventListener('click', () => {
      const reasonInput = document.getElementById('suspend-reason');
      const reasonVal = reasonInput ? reasonInput.value.trim() : '';
      if (reasonVal.length < 10) {
        showToast(`Lý do tạm khóa bắt buộc nhập tối thiểu 10 ký tự (AC-03b)! Hiện có ${reasonVal.length} ký tự.`, 'danger');
        if (reasonInput) {
          reasonInput.focus();
          reasonInput.style.borderColor = 'var(--danger-solid)';
        }
        return;
      }
      emp.accountStatus = 'Suspended';
      emp.sessions = [];
      addAuditLog('Lê Hoàng Nam (Branch Admin)', 'Tạm khóa tài khoản Enterprise', `${emp.name} (${emp.accountId}) - Lý do: ${reasonVal}`, 'Chi nhánh HCM 01');
      closeModal();
      showToast(`Đã tạm khóa tài khoản ${emp.accountId} của ${emp.name}!`, 'warning');
      renderActiveView();
      renderNav();
    });
  }


  // =========================================================================
  // MODAL: BÀN GIAO KÈM BOT CHÀO TỰ ĐỘNG (US07 / FR07 - Throttling <= 5 msg/s)
  // =========================================================================
  function openHandoverBotModal(handoverId) {
    const h = state.handoverQueue.find(x => x.id === handoverId);
    if (!h) {
      showToast('Không tìm thấy lệnh bàn giao trong hệ thống!', 'danger');
      return;
    }

    const bodyHtml = `
      <div style="font-size: 12.5px;">
        <div class="callout callout-info" style="margin-bottom: 14px;">
          <strong>TIẾN TRÌNH BÀN GIAO TÀI SẢN KHÁCH HÀNG (US07 / FR07):</strong><br>
          Chuyển giao toàn quyền quản lý khách hàng từ nhân sự thôi việc sang nhân sự tiếp nhận, kèm Bot tự động gửi tin nhắn giới thiệu nhân sự mới đến từng đối tác doanh nghiệp.
        </div>

        <div class="metric-grid" style="grid-template-columns: 1fr 1fr; margin-bottom: 14px;">
          <div class="metric-card" style="padding: 10px 14px;">
            <div class="metric-label">Nhân Sự Bàn Giao</div>
            <div class="metric-value" style="font-size: 15px; color: var(--danger-solid);">${h.sourceName}</div>
            <div class="metric-sub">Tài khoản sẽ được lưu trữ (Archived)</div>
          </div>
          <div class="metric-card" style="padding: 10px 14px;">
            <div class="metric-label">Nhân Sự Tiếp Nhận</div>
            <div class="metric-value" style="font-size: 15px; color: var(--primary);">${h.targetName}</div>
            <div class="metric-sub">Tiếp quản ${h.customersCount} Khách Hàng</div>
          </div>
        </div>

        <div class="bot-throttling-box">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="bot-pulse-icon"></span>
              <strong>Cơ Chế Bắn Tin Bot Chào Tự Động (Zalo Enterprise Gateway)</strong>
            </div>
            <span class="throttling-speed-pill">Tốc độ: 4.2 tin nhắn / giây</span>
          </div>
          <div style="font-size: 11.5px; color: var(--text-secondary); margin-bottom: 10px;">
            Tuân thủ nghiêm ngặt tiêu chuẩn kỹ thuật <strong>FR07 / US07</strong>: Giới hạn throttling rate &le; 5 tin nhắn/giây nhằm chống nghẽn kênh Zalo Gateway, bảo vệ uy tín Official Account và ngăn chặn việc bị thuật toán Zalo đánh dấu spam.
          </div>
          <div style="background: #e2e8f0; height: 8px; border-radius: 9999px; overflow: hidden; margin-bottom: 6px;">
            <div id="bot-progress-bar" style="background: linear-gradient(90deg, #2563eb, #10b981); height: 100%; width: 0%; transition: width 0.3s ease;"></div>
          </div>
          <div id="bot-progress-status" style="font-size: 11.5px; color: var(--text-muted); font-weight: 500;">
            Sẵn sàng thực thi tiến trình bàn giao...
          </div>
        </div>

        <div style="margin-top: 14px; padding: 10px; background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
          <div style="font-weight: 600; margin-bottom: 4px;">Nội dung tin nhắn Bot chào mẫu gửi đến đối tác:</div>
          <div style="font-size: 11.5px; color: var(--text-secondary); font-style: italic;">
            "Kính chào Quý khách! FPT Telecom xin trân trọng thông báo: Kể từ hôm nay, chuyên viên kinh doanh ${h.targetName} sẽ trực tiếp phụ trách đồng hành và hỗ trợ Quý khách qua kênh Z-Enterprise chính thức. Hotline hỗ trợ 24/7: 1900 6600."
          </div>
        </div>

        <div class="callout callout-warning" style="margin-top: 12px; margin-bottom: 0; font-size: 11.5px;">
          <strong>Quy tắc hoàn Quota:</strong> Sau khi bàn giao xong, hệ thống sẽ tự động chuyển trạng thái tài khoản cũ thành <strong>Lưu Trữ (Archived)</strong> và <strong>hoàn 1 Quota</strong> về kho Chi nhánh HCM 01!
        </div>
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-secondary btn-sm" onclick="closeModal()">Hủy</button>
      <button class="btn btn-primary btn-sm" id="btn-start-bot-handover">Bắt Đầu Bàn Giao Kèm Bot Chào (≤ 5 msg/s)</button>
    `;

    openModal('Bàn Giao Khách Hàng Kèm Bot Chào Tự Động (US07 / FR07)', bodyHtml, footerHtml);

    document.getElementById('btn-start-bot-handover')?.addEventListener('click', () => {
      const btn = document.getElementById('btn-start-bot-handover');
      const bar = document.getElementById('bot-progress-bar');
      const status = document.getElementById('bot-progress-status');
      if (btn) btn.disabled = true;

      if (bar) bar.style.width = '30%';
      if (status) status.textContent = 'Đang chuyển giao quyền quản lý danh bạ khách hàng...';

      setTimeout(() => {
        if (bar) bar.style.width = '70%';
        if (status) status.textContent = `Đang phát ${h.customersCount} tin chào Bot tự động (Tốc độ: 4.2 msg/s - Tuân thủ FR07/US07)...`;
      }, 700);

      setTimeout(() => {
        if (bar) bar.style.width = '100%';
        if (status) status.textContent = 'Đã phát xong tin chào! Đang hoàn 1 Quota và lưu trữ tài khoản cũ...';
      }, 1400);

      setTimeout(() => {
        // 1. Reassign customers
        state.customers.forEach(c => {
          if (c.handlerEmpId === h.sourceEmpId) {
            c.handlerEmpId = h.targetEmpId;
            c.handlerName = h.targetName;
          }
        });

        // 2. Archive old employee
        const oldEmp = state.employees.find(e => e.id === h.sourceEmpId);
        if (oldEmp) {
          oldEmp.status = 'Archived';
          oldEmp.accountStatus = 'Archived';
          oldEmp.sessions = [];
        }

        // 3. Reclaim 1 quota to branch
        const corp = state.orgTree[0];
        const south = corp.children.find(r => r.id === 'REG_SOUTH');
        if (south) {
          const hcm01 = south.children.find(b => b.id === 'HCM01');
          if (hcm01 && hcm01.assigned > 0) {
            hcm01.assigned -= 1;
            hcm01.available += 1;
          }
        }

        // 4. Mark order completed
        h.status = 'Completed';

        // 5. Audit Log
        addAuditLog(
          'Lê Hoàng Nam (Branch Admin)',
          'Bàn giao khách hàng kèm Bot chào (US07)',
          `Chuyển ${h.customersCount} KH từ ${h.sourceName} sang ${h.targetName}. Bot phát tin chào (4.2 msg/s). Lưu trữ TK cũ & hoàn 1 Quota về Chi nhánh HCM 01.`,
          'Chi nhánh HCM 01'
        );

        closeModal();
        showToast(`Đã hoàn tất bàn giao ${h.customersCount} KH cho ${h.targetName} kèm Bot chào (4.2 msg/s)! Đã hoàn 1 Quota về Chi nhánh.`, 'success');
        renderActiveView();
        renderNav();
      }, 2100);
    });
  }

  // =========================================================================
  // MODAL: CAN THIỆP KHẨN CẤP BREAK-GLASS (US10 / FR08 - Dual Authorization)
  // =========================================================================
  function openBreakGlassModal(empId) {
    const targetEmp = state.employees.find(e => e.id === empId) || state.employees.find(e => e.id === 'EMP-00137') || state.employees[0];

    const bodyHtml = `
      <div style="font-size: 12.5px;">
        <div class="callout callout-danger" style="margin-bottom: 14px;">
          <strong>CƠ CHẾ XÁC THỰC KÉP BẮT BUỘC (DUAL AUTHORIZATION - US10 / FR08):</strong><br>
          Quy trình Break-Glass chỉ được kích hoạt khi có sự phê duyệt đồng thời từ <strong>Super Admin (Trụ sở chính)</strong> và <strong>Legal/Compliance Officer (Pháp chế & Kiểm toán)</strong>. Mọi thao tác đều được ký số kiểm toán bất biến theo tiêu chuẩn an toàn thông tin FPT ISC.
        </div>

        <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px; margin-bottom: 14px;">
          <div style="font-weight: 700; color: var(--danger-solid); font-size: 13px;">Đối Tượng Can Thiệp Cưỡng Chế:</div>
          <div style="display: flex; justify-content: space-between; margin-top: 4px;">
            <span>Họ và tên: <strong>${targetEmp.name}</strong> (${targetEmp.id})</span>
            <span>Chức vụ: <strong>${targetEmp.role}</strong></span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 4px; font-size: 11.5px; color: var(--text-muted);">
            <span>Tài khoản: <code>${targetEmp.accountId || 'ZENT-001301'}</code></span>
            <span>Đơn vị: ${targetEmp.branch}</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
          <div>
            <label class="form-label"><span style="color: #ef4444;">*</span> Mã OTP 1 (Super Admin):</label>
            <input type="text" class="form-input" id="bg-otp-super" placeholder="Mẫu demo: 889102" value="889102" style="font-weight: 600; letter-spacing: 1px;">
            <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 3px;">Ký duyệt: Vũ Minh Tuấn (HQ)</div>
          </div>
          <div>
            <label class="form-label"><span style="color: #ef4444;">*</span> Mã OTP 2 (Legal & Audit):</label>
            <input type="text" class="form-input" id="bg-otp-legal" placeholder="Mẫu demo: 554321" value="554321" style="font-weight: 600; letter-spacing: 1px;">
            <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 3px;">Ký duyệt: Đỗ Hoàng Mai (Pháp chế)</div>
          </div>
        </div>

        <div>
          <label class="form-label"><span style="color: #ef4444;">*</span> Lý Do Can Thiệp Khẩn Cấp (Tối thiểu 10 ký tự):</label>
          <textarea class="form-input" id="bg-reason" rows="2" placeholder="Ví dụ: Nhân sự đã chấm dứt hợp đồng lao động, kích hoạt cưỡng chế thu hồi phiên ngăn chặn rủi ro dữ liệu..."></textarea>
          <div id="bg-error-msg" style="color: var(--danger-solid); font-size: 11.5px; margin-top: 4px; display: none;"></div>
        </div>
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-secondary btn-sm" onclick="closeModal()">Hủy</button>
      <button class="btn btn-danger btn-sm" id="btn-submit-break-glass">Xác Nhận Kích Hoạt Break-Glass (Dual Auth)</button>
    `;

    openModal('Kích Hoạt Can Thiệp Khẩn Cấp Break-Glass (US10 / FR08)', bodyHtml, footerHtml);

    document.getElementById('btn-submit-break-glass')?.addEventListener('click', () => {
      const otp1 = document.getElementById('bg-otp-super')?.value.trim();
      const otp2 = document.getElementById('bg-otp-legal')?.value.trim();
      const reasonEl = document.getElementById('bg-reason');
      const errEl = document.getElementById('bg-error-msg');
      const reason = reasonEl ? reasonEl.value.trim() : '';

      if (!otp1 || !otp2) {
        if (errEl) {
          errEl.textContent = 'Bắt buộc phải có đầy đủ 2 mã OTP xác thực kép từ Super Admin và Legal!';
          errEl.style.display = 'block';
        }
        return;
      }

      if (reason.length < 10) {
        if (errEl) {
          errEl.textContent = `Lý do can thiệp khẩn cấp bắt buộc tối thiểu 10 ký tự (AC-03b / US10)! Hiện có ${reason.length} ký tự.`;
          errEl.style.display = 'block';
        }
        if (reasonEl) {
          reasonEl.focus();
          reasonEl.style.borderColor = 'var(--danger-solid)';
        }
        return;
      }

      // Execute Break-Glass
      targetEmp.accountStatus = 'Revoked';
      targetEmp.status = 'Revoked';
      targetEmp.sessions = [];

      const bgEntry = {
        id: `BG-2026-00${state.breakGlassLogs.length + 1}`,
        time: new Date().toISOString().replace('T', ' ').substring(0, 19),
        actorSuper: 'Vũ Minh Tuấn (Super Admin)',
        actorLegal: 'Đỗ Hoàng Mai (Legal/Audit)',
        targetId: targetEmp.id,
        targetName: `${targetEmp.name} (${targetEmp.accountId || 'ZENT-001301'})`,
        reason: reason,
        status: 'Approved & Revoked'
      };
      state.breakGlassLogs.unshift(bgEntry);

      addAuditLog(
        'Dual Auth (Super Admin + Legal)',
        'BREAK-GLASS Cưỡng Chế Thu Hồi Quyền (US10/FR08)',
        `Thu hồi phiên tức thì và vô hiệu hóa tài khoản ${targetEmp.name} (${targetEmp.id}). Lý do: ${reason}`,
        'Toàn Quốc'
      );

      closeModal();
      showToast(`Đã thực thi can thiệp khẩn cấp Break-Glass (Dual Auth) thành công đối với ${targetEmp.name}!`, 'success');
      renderActiveView();
      renderNav();
    });
  }

  // =========================================================================
  // MODAL: CUỘC GỌI THOẠI ZALO DOANH NGHIỆP (US05 - Voice Call 1-1)
  // =========================================================================
  function openVoiceCallModal(customer) {
    if (!customer) customer = state.customers[0];

    let seconds = 0;
    let timerInterval = null;

    const bodyHtml = `
      <div style="font-size: 12.5px; text-align: center; padding: 10px 0;">
        <div style="width: 68px; height: 68px; border-radius: 50%; background: #eff6ff; color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 26px; font-weight: 700; margin: 0 auto 12px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);">
          ${customer.name.charAt(0)}
        </div>
        <div style="font-weight: 700; font-size: 16px; color: var(--text-primary);">${customer.name}</div>
        <div style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 12px;">${customer.contactPerson} • <code>${customer.phoneMasked}</code></div>
        
        <div style="margin-bottom: 16px;">
          <span class="badge badge-success" style="font-size: 12px; padding: 5px 14px;">
            Đang Đàm Thoại Mã Hóa Zalo Gateway (HD Voice): <span id="voice-call-timer">00:01</span>
          </span>
        </div>

        <div class="callout callout-info" style="text-align: left; font-size: 11.5px; margin-bottom: 0;">
          <strong>Interaction Metadata (US05):</strong> Cuộc gọi được ghi âm tuân thủ chính sách FPT Telecom. Bản ghi âm mã hóa và siêu dữ liệu cuộc gọi sẽ tự động được liên kết vào hồ sơ khách hàng ngay khi kết thúc.
        </div>
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-secondary btn-sm" id="btn-voice-mute">Tắt Mic</button>
      <button class="btn btn-secondary btn-sm" style="color: #ef4444; font-weight: 600;">Đang Ghi Âm</button>
      <button class="btn btn-danger btn-sm" id="btn-end-voice-call">Kết Thúc Cuộc Gọi</button>
    `;

    openModal('Cuộc Gọi Thoại Zalo Doanh Nghiệp (Official Account) - US05', bodyHtml, footerHtml);

    timerInterval = setInterval(() => {
      seconds++;
      const timerEl = document.getElementById('voice-call-timer');
      if (timerEl) {
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        timerEl.textContent = `${mins}:${secs}`;
      }
    }, 1000);

    document.getElementById('btn-end-voice-call')?.addEventListener('click', () => {
      clearInterval(timerInterval);
      const callDuration = seconds > 0 ? `${Math.floor(seconds / 60)} phút ${seconds % 60} giây` : '15 giây';

      if (!customer.messages) customer.messages = [];
      customer.messages.push({
        sender: 'me',
        text: `[Cuộc gọi thoại Zalo OA] Thời lượng: ${callDuration} • Đã lưu Interaction Metadata & Ghi âm mã hóa: REC-ZENT-20260924-001 • Kết quả: Đã tư vấn gói Internet FPT Lux 800.`,
        time: 'Vừa xong'
      });
      customer.lastInteraction = 'Vừa xong';
      customer.hoursSinceLastMsg = 0;

      addAuditLog(
        'Nguyễn Văn A (Sales)',
        'Cuộc gọi thoại Zalo OA (US05)',
        `Thực hiện cuộc gọi thoại (${callDuration}) tới khách hàng ${customer.name}. Ghi nhận Interaction Metadata.`,
        'Chi nhánh HCM 01'
      );

      closeModal();
      showToast(`Đã kết thúc cuộc gọi thoại (${callDuration}). Interaction Metadata đã được lưu vào hồ sơ khách hàng!`, 'success');
      renderActiveView();
    });
  }

  // =========================================================================
  // MODAL: ĐIỀU CHUYỂN NHÂN SỰ LIÊN CHI NHÁNH (US09)
  // =========================================================================
  function openTransferSalesModal() {
    const bodyHtml = `
      <div style="font-size: 12.5px;">
        <div class="callout callout-info" style="margin-bottom: 14px;">
          <strong>ĐIỀU CHUYỂN NHÂN SỰ LIÊN CHI NHÁNH (US09):</strong><br>
          Điều chuyển nhân sự kinh doanh giữa các chi nhánh trong Vùng Miền Nam, kèm tùy chọn điều chuyển 1 Quota tương ứng sang chi nhánh tiếp nhận.
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <label class="form-label">Chọn Nhân Sự Điều Chuyển:</label>
            <select class="form-input" id="transfer-staff-id">
              <option value="EMP-00130">Lê Văn C (EMP-00130 - Chi nhánh HCM 01 - Tân Bình)</option>
              <option value="EMP-00132">Nguyễn Văn E (EMP-00132 - Chi nhánh HCM 01 - Tân Bình)</option>
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
              <label class="form-label">Chi Nhánh Hiện Tại:</label>
              <input type="text" class="form-input" value="Chi nhánh HCM 01" disabled style="background: #f1f5f9;">
            </div>
            <div>
              <label class="form-label">Chi Nhánh Đến:</label>
              <select class="form-input" id="transfer-dest-branch">
                <option value="HCM02">Chi nhánh HCM 02 - Phú Nhuận</option>
                <option value="DNG01">Chi nhánh Đồng Nai</option>
              </select>
            </div>
          </div>

          <div style="padding: 10px; background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-weight: 600;">
              <input type="checkbox" id="transfer-carry-quota" checked style="accent-color: var(--primary);">
              <span>Điều chuyển kèm 1 Quota sang Chi nhánh tiếp nhận</span>
            </label>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px; padding-left: 24px;">
              Kho Quota của chi nhánh xuất sẽ giảm 1, và hạn ngạch chi nhánh tiếp nhận sẽ tăng 1 tự động.
            </div>
          </div>

          <div>
            <label class="form-label">Lý do điều chuyển:</label>
            <input type="text" class="form-input" id="transfer-reason" value="Tăng cường lực lượng kinh doanh cho dự án mở rộng chi nhánh mới">
          </div>
        </div>
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-secondary btn-sm" onclick="closeModal()">Hủy</button>
      <button class="btn btn-primary btn-sm" id="btn-submit-transfer-staff">Xác Nhận Điều Chuyển (US09)</button>
    `;

    openModal('Điều Chuyển Nhân Sự Liên Chi Nhánh (US09)', bodyHtml, footerHtml);

    document.getElementById('btn-submit-transfer-staff')?.addEventListener('click', () => {
      const staffId = document.getElementById('transfer-staff-id')?.value;
      const destId = document.getElementById('transfer-dest-branch')?.value;
      const carryQuota = document.getElementById('transfer-carry-quota')?.checked;
      const reason = document.getElementById('transfer-reason')?.value || 'Điều chuyển công tác';

      const staff = state.employees.find(e => e.id === staffId);
      const south = state.orgTree[0].children.find(r => r.id === 'REG_SOUTH');
      const srcBranch = south ? south.children.find(b => b.id === 'HCM01') : null;
      const destBranch = south ? south.children.find(b => b.id === destId) : null;

      if (staff && destBranch) {
        staff.branch = destBranch.name;
        if (carryQuota && srcBranch && srcBranch.assigned > 0) {
          srcBranch.assigned -= 1;
          srcBranch.available += 1;
          destBranch.allocated += 1;
          destBranch.assigned += 1;
        }

        addAuditLog(
          'Trần Quốc Tuấn (Region Admin)',
          'Điều chuyển nhân sự liên chi nhánh (US09)',
          `Điều chuyển ${staff.name} (${staff.id}) từ Chi nhánh HCM 01 sang ${destBranch.name}${carryQuota ? ' (Kèm 1 Quota)' : ''}. Lý do: ${reason}`,
          'Vùng Miền Nam'
        );

        closeModal();
        showToast(`Đã điều chuyển ${staff.name} sang ${destBranch.name} thành công!`, 'success');
        renderActiveView();
        renderNav();
      }
    });
  }

  // =========================================================================
  // MODAL: KHÓA PHIÊN AN TOÀN (FR04 - Session Timeout)
  // =========================================================================
  function lockSession() {
    const bodyHtml = `
      <div style="font-size: 12.5px; text-align: center; padding: 20px 0;">
        
        <div style="font-weight: 700; font-size: 16px; margin-bottom: 6px;">Phiên Làm Việc Tạm Thời Bị Khóa</div>
        <div style="font-size: 12px; color: var(--text-muted); max-width: 380px; margin: 0 auto 18px;">
          Để bảo vệ dữ liệu doanh nghiệp và tuân thủ tiêu chuẩn an toàn thông tin FPT ISC (FR04), hệ thống đã tạm khóa màn hình làm việc sau thời gian không thao tác.
        </div>
        <div style="max-width: 260px; margin: 0 auto 12px;">
          <input type="password" class="form-input" id="session-unlock-pin" placeholder="Nhập PIN hoặc Mật khẩu" value="123456" style="text-align: center; font-size: 15px; letter-spacing: 3px; font-weight: 700;">
        </div>
        <div style="font-size: 11px; color: var(--text-muted);">Mã PIN thử nghiệm: <code>123456</code></div>
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-primary btn-sm" id="btn-submit-unlock-session" style="width: 100%;">Mở Khóa Phiên Làm Việc</button>
    `;

    openModal('Bảo Mật Phiên Làm Việc (Session Lock - FR04)', bodyHtml, footerHtml);

    document.getElementById('btn-submit-unlock-session')?.addEventListener('click', unlockSession);
  }

  function unlockSession() {
    closeModal();
    showToast('Đã xác thực mở khóa phiên làm việc thành công!', 'success');
  }

  // =========================================================================
  // VIEW: BRANCH ADMIN — THEO DÕI KÍCH HOẠT EMAIL
  // =========================================================================
  function renderActivationQueueView(container, title, desc, actions) {
    title.textContent = 'Theo Dõi Kích Hoạt Email (Hạn 72 Giờ)';
    desc.textContent = 'Theo dõi các tài khoản đã cấp phát đang chờ nhân viên click link kích hoạt gửi qua email @fpt.com.vn (TTL 72 giờ).';

    actions.innerHTML = `
      <span style="font-size: 11.5px; color: var(--text-muted); align-self: center;">Đang chờ: ${state.activationQueue.length} thư mời</span>
      <button class="btn btn-secondary btn-sm" onclick="showToast('Đã quét toàn bộ hàng đợi kích hoạt!', 'info')">Kiểm Tra Trạng Thái</button>
    `;

    container.innerHTML = `
      <div class="callout callout-info" style="margin-bottom: 16px;">
        <strong>CHẾ ĐỘ KIỂM SOÁT TUÂN THỦ (PRIVACY LEVEL 5 - FR06):</strong><br>
        Nhật ký kiểm toán vĩ mô ghi nhận toàn bộ biến động Quota, cấp phát tài khoản và thao tác đặc quyền trên phạm vi 3 Vùng & 15 Chi nhánh. Mọi nội dung trao đổi khách hàng được mã hóa, chỉ hiển thị siêu dữ liệu kiểm toán.
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Mã Yêu Cầu</th>
              <th>Họ Tên Nhân Viên</th>
              <th>Email Công Ty</th>
              <th>Mã Tài Khoản Cấp</th>
              <th>Thời Điểm Gửi</th>
              <th>Thời Gian Còn Lại (TTL)</th>
              <th>Trạng Thái</th>
              <th style="text-align: right;">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            ${state.activationQueue.map(item => `
              <tr>
                <td><strong>${item.id}</strong></td>
                <td>${item.name}</td>
                <td><code>${item.email}</code></td>
                <td><strong>${item.accountId}</strong></td>
                <td>${item.sentAt}</td>
                <td>
                  <span class="badge ${item.hoursLeft < 48 ? 'badge-warning' : 'badge-neutral'}">
                    Còn ${item.hoursLeft} giờ
                  </span>
                </td>
                <td><span class="badge badge-warning">${item.status}</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-primary btn-sm btn-resend-invite" data-id="${item.id}">Gửi Lại Thư Mời</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    container.querySelectorAll('.btn-resend-invite').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('Đã gửi lại email kích hoạt kèm token bảo mật mới (gia hạn thêm 72h)!', 'success');
        addAuditLog('Lê Hoàng Nam (Branch Admin)', 'Gửi lại email kích hoạt', `Yêu cầu ${btn.dataset.id}`, 'Chi nhánh HCM 01');
      });
    });
  }

  // =========================================================================
  // VIEW: BRANCH ADMIN — TRUNG TÂM BÀN GIAO KHÁCH HÀNG
  // =========================================================================
  function renderCustomerHandoverCenterView(container, title, desc, actions) {
    title.textContent = 'Trung Tâm Bàn Giao Khách Hàng';
    desc.textContent = 'Điều phối chuyển giao danh bạ khách hàng doanh nghiệp khi nhân sự biến động (thôi việc hoặc đổi vị trí).';

    actions.innerHTML = `
      <button class="btn btn-primary btn-sm" id="btn-create-handover-order">+ Tạo Lệnh Bàn Giao Mới</button>
    `;

    container.innerHTML = `
      <div class="callout callout-info" style="margin-bottom: 16px;">
        <strong>Bảo vệ tài sản công ty:</strong> 100% Khách hàng doanh nghiệp được liên kết với Enterprise Account là tài sản thuộc FPT Telecom. Khi nhân sự thôi việc, toàn bộ quan hệ khách hàng và lịch sử tương tác phải được bàn giao cho nhân sự khác tiếp quản.
      </div>

      <div class="table-container">
        <div class="table-toolbar">
          <strong>Hàng Đợi Chuyển Giao Khách Hàng (Handover Queue)</strong>
          <span class="badge badge-neutral">${state.handoverQueue.length} Lệnh</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Mã Lệnh</th>
              <th>Nhân Sự Bàn Giao</th>
              <th>Nhân Sự Tiếp Nhận</th>
              <th>Số Lượng Khách Hàng</th>
              <th>Thời Điểm Tạo</th>
              <th>Trạng Thái</th>
              <th style="text-align: right;">Thao Tác Xác Nhận</th>
            </tr>
          </thead>
          <tbody>
            ${state.handoverQueue.map(h => `
              <tr>
                <td><strong>${h.id}</strong></td>
                <td><strong style="color: var(--danger-solid);">${h.sourceName}</strong></td>
                <td><strong style="color: var(--primary);">${h.targetName}</strong></td>
                <td><span class="badge badge-neutral">${h.customersCount} Khách Hàng</span></td>
                <td><code>${h.createdAt}</code></td>
                <td><span class="badge badge-warning">${h.status}</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-primary btn-sm btn-execute-handover" data-id="${h.id}">Thực Hiện Bàn Giao Ngay</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    container.querySelectorAll('.btn-execute-handover').forEach(btn => {
      btn.addEventListener('click', () => {
        openHandoverBotModal(btn.dataset.id);
      });
    });

    document.getElementById('btn-create-handover-order')?.addEventListener('click', () => {
      openModal(
        'Tạo Lệnh Bàn Giao Danh Bạ Khách Hàng',
        `
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div>
              <label class="form-label">Chọn Nhân Sự Bàn Giao:</label>
              <select class="form-input" id="ho-source-emp">
                <option value="EMP-00131">Phạm Văn D (127 Khách hàng - Nghỉ việc 30/09)</option>
                <option value="EMP-00137">Đoàn Thanh L (35 Khách hàng - Đã thôi việc HR)</option>
                <option value="EMP-00128">Nguyễn Văn A (48 Khách hàng)</option>
              </select>
            </div>
            <div>
              <label class="form-label">Chọn Nhân Sự Tiếp Nhận:</label>
              <select class="form-input" id="ho-target-emp">
                <option value="EMP-00129">Trần Thị B (Chi nhánh HCM 01)</option>
                <option value="EMP-00130">Lê Văn C (Chi nhánh HCM 01)</option>
                <option value="EMP-00132">Nguyễn Văn E (Chi nhánh HCM 01)</option>
              </select>
            </div>
            <div class="callout callout-info" style="font-size: 11.5px; margin-bottom: 0;">
              Lệnh bàn giao sẽ được đưa vào hàng đợi và kích hoạt quy trình Bot chào tự động (≤ 5 msg/s) theo chuẩn FR07/US07.
            </div>
          </div>
        `,
        `
          <button class="btn btn-secondary btn-sm" onclick="closeModal()">Hủy</button>
          <button class="btn btn-primary btn-sm" id="btn-submit-create-ho">Tạo Lệnh Bàn Giao</button>
        `
      );

      document.getElementById('btn-submit-create-ho')?.addEventListener('click', () => {
        const srcId = document.getElementById('ho-source-emp')?.value;
        const tgtId = document.getElementById('ho-target-emp')?.value;
        const srcEmp = state.employees.find(e => e.id === srcId);
        const tgtEmp = state.employees.find(e => e.id === tgtId);

        if (srcEmp && tgtEmp) {
          const newOrder = {
            id: `HO-2026-0${90 + state.handoverQueue.length}`,
            sourceEmpId: srcEmp.id,
            sourceName: srcEmp.name,
            targetEmpId: tgtEmp.id,
            targetName: tgtEmp.name,
            branchName: 'Chi nhánh HCM 01',
            customersCount: srcEmp.customersCount || 48,
            status: 'Pending',
            createdAt: '24/09/2026 16:45'
          };
          state.handoverQueue.unshift(newOrder);
          closeModal();
          showToast(`Đã tạo lệnh bàn giao ${newOrder.id} cho ${tgtEmp.name} tiếp nhận!`, 'success');
          renderActiveView();
          renderNav();
        }
      });
    });
  }

  // =========================================================================
  // VIEW: BRANCH ADMIN — HẠN NGẠCH CHI NHÁNH & ĐỀ XUẤT XIN QUOTA
  // =========================================================================
  function renderBranchQuotaRequisitionView(container, title, desc, actions) {
    title.textContent = 'Hạn Ngạch Chi Nhánh & Đề Xuất Xin Quota';
    desc.textContent = 'Quản lý số dư hạn ngạch chi nhánh HCM 01 và gửi đề xuất xin Vùng Miền Nam cấp thêm Quota.';

    actions.innerHTML = `
      <button class="btn btn-primary btn-sm" id="btn-open-request-quota-modal">+ Gửi Đề Xuất Xin Quota Lên Vùng</button>
    `;

    container.innerHTML = `
      <div class="metric-grid">
        <div class="metric-card">
          <div class="metric-label">Hạn Ngạch Chi Nhánh Được Giao</div>
          <div class="metric-value">300</div>
          <div class="metric-sub">Hạn ngạch chính thức</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Đã Gán Nhân Viên</div>
          <div class="metric-value">276</div>
          <div class="metric-sub">Tài khoản Active</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Hạn Ngạch Khả Dụng</div>
          <div class="metric-value" style="color: var(--primary);">24</div>
          <div class="metric-sub">Tỷ lệ dư: 8.0% (Mức an toàn)</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Hạn Ngạch Chờ Duyệt Từ Vùng</div>
          <div class="metric-value" style="color: var(--warning-solid);">0</div>
          <div class="metric-sub">Không có đề xuất tồn đọng</div>
        </div>
      </div>

      <div class="table-container">
        <div class="table-toolbar">
          <strong>Lịch Sử Đề Xuất Hạn Ngạch Gửi Lên Vùng Miền Nam</strong>
          <span class="badge badge-neutral">Chi nhánh HCM 01</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Mã Đề Xuất</th>
              <th>Số Lượng Xin</th>
              <th>Lý Do Nghiệp Vụ</th>
              <th>Thời Điểm Gửi</th>
              <th>Người Duyệt Cấp Vùng</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>REQ-2026-HCM01-09</strong></td>
              <td>+30 Quota</td>
              <td>Mở rộng đội ngũ tư vấn giải pháp Camera FPT Cloud</td>
              <td>15/09/2026</td>
              <td>Trần Đình Trọng (Region Admin)</td>
              <td><span class="badge badge-success">Đã duyệt & Cộng Quota</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('btn-open-request-quota-modal')?.addEventListener('click', () => {
      openModal(
        'Gửi Đề Xuất Xin Cấp Thêm Quota Lên Vùng Miền Nam',
        `
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div>
              <label class="form-label">Số Lượng Quota Cần Xin Bổ Sung:</label>
              <input type="number" class="form-input" id="req-quota-qty" value="15" min="5" max="50">
            </div>
            <div>
              <label class="form-label">Lý Do Nghiệp Vụ / Kế Hoạch Sử Dụng:</label>
              <textarea class="form-input" id="req-quota-reason" rows="3" placeholder="Ví dụ: Chi nhánh tuyển dụng thêm 5 nhân viên kinh doanh doanh nghiệp và mở rộng khách hàng dự án tòa nhà văn phòng..."></textarea>
            </div>
          </div>
        `,
        `
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('modal-generic').classList.remove('active')">Hủy</button>
          <button class="btn btn-primary btn-sm" id="btn-submit-branch-req">Gửi Lên Giám Đốc Vùng</button>
        `
      );

      document.getElementById('btn-submit-branch-req')?.addEventListener('click', () => {
        const qty = parseInt(document.getElementById('req-quota-qty').value) || 15;
        const reason = document.getElementById('req-quota-reason').value || 'Mở rộng kinh doanh chi nhánh';
        state.quotaRequests.unshift({
          id: `REQ-2026-00${state.quotaRequests.length + 1}`,
          branchId: 'HCM01',
          branchName: 'Chi nhánh HCM 01 - Tân Bình',
          regionId: 'REG_SOUTH',
          requestQty: qty,
          reason: reason,
          status: 'Pending',
          requestedAt: 'Vừa xong',
          requester: 'Lê Hoàng Nam (Branch Admin HCM 01)'
        });
        addAuditLog('Lê Hoàng Nam (Branch Admin)', 'Gửi đề xuất xin Quota', `Vùng Miền Nam (+${qty} Quota)`, 'Chi nhánh HCM 01', 'Chờ Duyệt');
        closeModal();
        showToast(`Đã gửi đề xuất xin cấp thêm ${qty} Quota lên Vùng Miền Nam!`, 'success');
        renderActiveView();
      });
    });
  }

  // =========================================================================
  // VIEW: SALES REPRESENTATIVE — KHÔNG GIAN TRÒ CHUYỆN KHÁCH HÀNG & NHÓM
  // =========================================================================

  // Helper Modal: Tạo Nhóm (Create Group - Matches Image 2)
  function openCreateGroupModal() {
    const contactPool = [
      { id: 'CUST-001', name: 'Anh Hoàng Long', company: 'CTCP Xây Dựng Hải Nam', phoneMasked: '090****567', avatar: 'HL', type: 'Khách Hàng' },
      { id: 'CUST-002', name: 'Chị Mai Phương', company: 'Trường Mầm Non Ánh Sao', phoneMasked: '091****882', avatar: 'MP', type: 'Khách Hàng' },
      { id: 'CUST-003', name: 'Anh Quốc Tuấn', company: 'Khách Sạn Imperial Palace', phoneMasked: '098****331', avatar: 'QT', type: 'Khách Hàng' },
      { id: 'EMP-NAM', name: 'Lê Hoàng Nam', company: 'Trưởng Chi Nhánh HCM 01', phoneMasked: 'Nội Bộ FPT', avatar: 'HN', type: 'Đồng Nghiệp' },
      { id: 'EMP-THIB', name: 'Trần Thị B', company: 'Chuyên Viên Kinh Doanh HCM 01', phoneMasked: 'Nội Bộ FPT', avatar: 'TB', type: 'Đồng Nghiệp' },
      { id: 'TECH-SUPP', name: 'Đội Kỹ Thuật Viễn Thông', company: 'Hạ Tầng FPT HCM 01', phoneMasked: 'Hotline Kỹ Thuật', avatar: 'KT', type: 'Đồng Nghiệp' }
    ];

    const bodyHtml = `
      <div style="font-size: 12.5px;">
        <div class="group-modal-grid">
          <div>
            <label style="display: block; font-weight: 600; margin-bottom: 5px; font-size: 12px;">
              <span style="color: #ef4444;">*</span> Tài khoản tạo nhóm
            </label>
            <select id="modal-group-account" class="form-input" style="font-size: 12px; width: 100%;">
              <option value="ZENT-001293">Nguyễn Văn A (ZENT-001293 - HCM 01)</option>
              <option value="ZENT-001294">Trần Thị B (ZENT-001294 - HCM 01)</option>
            </select>
          </div>
          <div>
            <label style="display: block; font-weight: 600; margin-bottom: 5px; font-size: 12px;">
              <span style="color: #ef4444;">*</span> Tên nhóm
            </label>
            <input type="text" id="modal-group-name" class="form-input" placeholder="Nhập tên nhóm..." value="" style="font-size: 12px; width: 100%;">
          </div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <label style="font-weight: 600; font-size: 12px;">
              <span style="color: #ef4444;">*</span> Danh sách thành viên
            </label>
            <span id="modal-group-selected-count" style="font-size: 11px; color: var(--primary); font-weight: 600;">Đã chọn 0 thành viên</span>
          </div>

          <div style="margin-bottom: 8px;">
            <input type="text" id="modal-group-member-search" class="form-input" placeholder="Tìm kiếm..." style="font-size: 12px; width: 100%;">
          </div>

          <div class="contact-select-list" id="modal-group-contact-list">
            ${contactPool.map(c => `
              <label class="contact-item-row" data-name="${c.name.toLowerCase()} ${c.company.toLowerCase()}">
                <input type="checkbox" class="group-member-cb" value="${c.name} (${c.company})" data-name="${c.name}">
                <div style="width: 28px; height: 28px; border-radius: 50%; background: #e0e7ff; color: #4338ca; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">
                  ${c.avatar}
                </div>
                <div style="flex: 1; min-width: 0;">
                  <div style="font-weight: 600; font-size: 12px; color: var(--text-primary);">${c.name}</div>
                  <div style="font-size: 11px; color: var(--text-muted);">${c.company} • ${c.phoneMasked}</div>
                </div>
                <span class="badge ${c.type === 'Khách Hàng' ? 'badge-primary' : 'badge-neutral'}" style="font-size: 9.5px;">${c.type}</span>
              </label>
            `).join('')}
          </div>

          <div id="modal-group-contact-empty" class="contact-empty-illustration" style="display: none;">
            <div style="font-size: 32px; margin-bottom: 6px;"></div>
            <div style="color: #64748b; font-weight: 500;">Chưa có liên hệ nào</div>
          </div>
        </div>
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-secondary btn-sm" onclick="closeModal()">Hủy</button>
      <button class="btn btn-primary btn-sm" id="btn-submit-create-group">Lưu</button>
    `;

    openModal('Tạo nhóm', bodyHtml, footerHtml);

    // Update count when checkboxes change
    const updateSelectedCount = () => {
      const checked = document.querySelectorAll('.group-member-cb:checked');
      const countEl = document.getElementById('modal-group-selected-count');
      if (countEl) countEl.textContent = `Đã chọn ${checked.length} thành viên`;
    };

    document.querySelectorAll('.group-member-cb').forEach(cb => {
      cb.addEventListener('change', updateSelectedCount);
    });

    // Real-time search filter in member checklist
    const searchInput = document.getElementById('modal-group-member-search');
    const contactList = document.getElementById('modal-group-contact-list');
    const emptyIllustration = document.getElementById('modal-group-contact-empty');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        let visibleCount = 0;
        document.querySelectorAll('.contact-item-row').forEach(row => {
          const match = row.dataset.name.includes(q);
          row.style.display = match ? 'flex' : 'none';
          if (match) visibleCount++;
        });

        if (emptyIllustration && contactList) {
          if (visibleCount === 0) {
            contactList.style.display = 'none';
            emptyIllustration.style.display = 'block';
          } else {
            contactList.style.display = 'block';
            emptyIllustration.style.display = 'none';
          }
        }
      });
    }

    // Submit Create Group
    document.getElementById('btn-submit-create-group')?.addEventListener('click', () => {
      const nameInput = document.getElementById('modal-group-name');
      const groupName = nameInput ? nameInput.value.trim() : '';
      if (!groupName) {
        showToast('Vui lòng nhập tên nhóm!', 'warning');
        nameInput?.focus();
        return;
      }

      const checked = Array.from(document.querySelectorAll('.group-member-cb:checked')).map(cb => cb.dataset.name);
      if (checked.length === 0) {
        showToast('Vui lòng chọn ít nhất 1 thành viên tham gia nhóm!', 'warning');
        return;
      }

      const newGroup = {
        id: 'GROUP-' + Date.now(),
        isGroup: true,
        name: groupName,
        contactPerson: `${checked.length + 1} thành viên (${checked.slice(0, 2).join(', ')}${checked.length > 2 ? '...' : ''})`,
        phoneMasked: 'Nhóm Doanh Nghiệp',
        handlerName: 'Nguyễn Văn A',
        handlerEmpId: 'EMP-00128',
        accountId: 'ZENT-001293',
        branchName: 'Chi nhánh HCM 01',
        lastInteraction: 'Vừa xong',
        hoursSinceLastMsg: 0.01,
        status: 'Active',
        tag: 'Nhóm Dự Án',
        unread: false,
        notes: `Nhóm trao đổi công việc gồm: ${checked.join(', ')}`,
        messages: [
          { sender: 'me', text: `Chào các anh/chị, em Nguyễn Văn A tạo nhóm để trao đổi dự án "${groupName}" ạ.`, time: 'Vừa xong' }
        ]
      };

      state.customers.unshift(newGroup);
      state.salesChatSelectedId = newGroup.id;
      closeModal();
      showToast(`Đã tạo nhóm "${groupName}" thành công với ${checked.length + 1} thành viên!`, 'success');
      addAuditLog('Nguyễn Văn A (Sales Rep)', 'Tạo nhóm Zalo Doanh Nghiệp', groupName, 'Chi nhánh HCM 01', 'Hợp Lệ');
      renderApp();
    });
  }

  // Helper Modal: Lời Mời Kết Bạn (Friend Requests)
  function openFriendRequestsModal() {
    const requests = state.friendRequests || [];
    const bodyHtml = `
      <div style="font-size: 12.5px;">
        <div style="margin-bottom: 12px; color: var(--text-secondary);">
          Các đại diện doanh nghiệp đã gửi lời mời kết bạn tới tài khoản Zalo Enterprise chính thức <strong>ZENT-001293</strong>:
        </div>

        ${requests.length === 0 ? `
          <div class="contact-empty-illustration">
            <div style="font-size: 32px; margin-bottom: 6px;"></div>
            <div style="color: #64748b;">Hiện không có lời mời kết bạn mới nào.</div>
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${requests.map(r => `
              <div style="padding: 12px 14px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); background: #ffffff; display: flex; justify-content: space-between; align-items: center; box-shadow: var(--shadow-morphic-subtle);">
                <div style="display: flex; gap: 12px; align-items: center;">
                  <div style="width: 38px; height: 38px; border-radius: 50%; background: #eff6ff; color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px;">
                    ${r.name.split(' ').pop()}
                  </div>
                  <div>
                    <div style="font-weight: 700; color: var(--text-primary); font-size: 13px;">${r.name}</div>
                    <div style="font-size: 11.5px; color: var(--text-secondary);">${r.role} • <strong>${r.company}</strong></div>
                    <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Nhu cầu: "${r.note}" • SĐT: ${r.phoneMasked} • ${r.time}</div>
                  </div>
                </div>
                <div style="display: flex; gap: 8px;">
                  <button class="btn btn-primary btn-sm btn-accept-friend" data-id="${r.id}" style="padding: 4px 10px; font-size: 11.5px;">Chấp Nhận</button>
                  <button class="btn btn-secondary btn-sm btn-reject-friend" data-id="${r.id}" style="padding: 4px 10px; font-size: 11.5px;">Từ Chối</button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-secondary btn-sm" onclick="closeModal()">Đóng</button>
    `;

    openModal(`Lời Mời Kết Bạn Zalo Doanh Nghiệp (${requests.length})`, bodyHtml, footerHtml);

    document.querySelectorAll('.btn-accept-friend').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const req = (state.friendRequests || []).find(r => r.id === id);
        if (req) {
          const newCust = {
            id: 'CUST-' + Date.now(),
            name: req.company,
            contactPerson: `${req.name} (${req.role})`,
            phoneMasked: req.phoneMasked,
            handlerName: 'Nguyễn Văn A',
            handlerEmpId: 'EMP-00128',
            accountId: 'ZENT-001293',
            branchName: 'Chi nhánh HCM 01',
            lastInteraction: 'Vừa xong',
            hoursSinceLastMsg: 0.01,
            status: 'Active',
            tag: 'Khách Mới Kết Bạn',
            unread: true,
            notes: req.note,
            messages: [
              { sender: 'them', text: `Chào em A, anh là ${req.name} bên ${req.company}. Nhờ em tư vấn gói dịch vụ ${req.note} nhé.`, time: 'Vừa xong' }
            ]
          };
          state.customers.unshift(newCust);
          state.friendRequests = (state.friendRequests || []).filter(r => r.id !== id);
          state.salesChatSelectedId = newCust.id;
          closeModal();
          showToast(`Đã đồng ý kết bạn với ${req.name} (${req.company})!`, 'success');
          addAuditLog('Nguyễn Văn A (Sales Rep)', 'Chấp nhận kết bạn Zalo Doanh Nghiệp', `${req.name} - ${req.company}`, 'Chi nhánh HCM 01', 'Hợp Lệ');
          renderApp();
        }
      });
    });

    document.querySelectorAll('.btn-reject-friend').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        state.friendRequests = (state.friendRequests || []).filter(r => r.id !== id);
        showToast('Đã từ chối lời mời kết bạn.', 'info');
        closeModal();
        renderApp();
      });
    });
  }

  // Render Sales Workspace View
  function renderSalesWorkspaceView(container, title, desc, actions) {
    title.textContent = 'Không Gian Trò Chuyện Khách Hàng (Z-Enterprise)';
    desc.textContent = 'Tài khoản chính thức ZENT-001293 (FPT Telecom) • Trao đổi với khách hàng doanh nghiệp chuẩn mực.';

    const currentEmp = state.employees.find(e => e.id === 'EMP-00128');
    const isSuspended = currentEmp && (currentEmp.status === 'Suspended' || currentEmp.accountStatus === 'Suspended');

    actions.innerHTML = `
      ${isSuspended ? '<span class="badge badge-danger">Tài Khoản Đang Bị Tạm Khóa (Suspended)</span>' : '<span class="badge badge-success">Tài Khoản Doanh Nghiệp Đang Online</span>'}
      <button class="btn btn-primary btn-sm" id="btn-top-create-group" ${isSuspended ? 'disabled' : ''}>+ Tạo Nhóm</button>
      <button class="btn btn-secondary btn-sm" id="btn-top-sync-chat">Đồng Bộ Kênh</button>
    `;

    // Filter conversations
    let convList = state.customers || [];
    if (state.salesChatFilter === 'unread') {
      convList = convList.filter(c => c.unread);
    } else if (state.salesChatFilter === 'read') {
      convList = convList.filter(c => !c.unread);
    } else if (state.salesChatFilter === 'group') {
      convList = convList.filter(c => c.isGroup);
    }

    const selectedChat = state.customers.find(c => c.id === state.salesChatSelectedId);
    const unreadCount = state.customers.filter(c => c.unread).length;
    const readCount = state.customers.filter(c => !c.unread).length;
    const groupCount = state.customers.filter(c => c.isGroup).length;
    const friendReqCount = (state.friendRequests || []).length;

    container.innerHTML = `
      ${isSuspended ? `
        <div class="sales-suspended-alert">
          
          <div>
            <strong>TÀI KHOẢN ĐANG BỊ TẠM KHÓA DO QUẢN TRỊ VIÊN CHI NHÁNH THỰC THI (AC-03c)</strong><br>
            Tài khoản Z-Enterprise <code>ZENT-001293</code> của Nguyễn Văn A đang trong trạng thái <strong>Tạm Khóa (Suspended)</strong>. Toàn bộ quyền gửi tin nhắn, tạo nhóm và gọi thoại đã bị vô hiệu hóa. Mọi tương tác dữ liệu đã bị đóng băng nhằm đảm bảo an toàn thông tin FPT Telecom. Vui lòng liên hệ Branch Admin (Lê Hoàng Nam) để mở khóa.
          </div>
        </div>
      ` : ''}
      <!-- Official Enterprise ID Badge (Trust Badge) -->
      <div class="enterprise-id-card">
        <div>
          <div class="id-card-brand">FPT Telecom • Zalo Enterprise Official Account</div>
          <div class="id-card-name">
            <span>Nguyễn Văn A</span>
            <span class="badge badge-success" style="font-size: 11px; font-weight: 600;">Tài Khoản Đã Xác Thực</span>
          </div>
          <div class="id-card-meta">
            Mã định danh: <code>ZENT-001293</code> • Chi nhánh HCM 01 - Tân Bình • Hotline Tổng đài: <strong>1900 6600</strong>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Tài Sản Doanh Nghiệp</div>
          <div style="font-size: 18px; font-weight: 700;">${state.customers.length} Khách Hàng & Nhóm</div>
        </div>
      </div>

      <!-- Omnichannel Tabs Ribbon (Matching Image 1) -->
      <div class="channel-ribbon" style="border-radius: var(--radius-lg) var(--radius-lg) 0 0; border: 1px solid var(--border-subtle); border-bottom: none; box-shadow: var(--shadow-morphic-subtle);">
        <div class="channel-tab ${state.salesActiveChannel === 'all' ? 'active' : ''}" data-channel="all">
          <span>Tất cả</span>
          <span class="channel-tab-badge">${state.customers.length}</span>
        </div>
        <div class="channel-tab ${state.salesActiveChannel === 'zalo_enterprise' ? 'active' : ''}" data-channel="zalo_enterprise">
          <span>Zalo Doanh Nghiệp</span>
          <span class="channel-tab-badge" style="background: #2563eb; color: #fff;">Chính</span>
        </div>
        <div class="channel-tab ${state.salesActiveChannel === 'zalo_oa' ? 'active' : ''}" data-channel="zalo_oa">
          <span>Zalo OA (FPT Telecom)</span>
        </div>
        <div class="channel-tab ${state.salesActiveChannel === 'portal' ? 'active' : ''}" data-channel="portal">
          <span> FPT Portal LiveChat</span>
        </div>
        <div class="channel-tab ${state.salesActiveChannel === 'messenger' ? 'active' : ''}" data-channel="messenger">
          <span>Messenger B2B</span>
        </div>
        <div class="channel-tab ${state.salesActiveChannel === 'website' ? 'active' : ''}" data-channel="website">
          <span>Website FPT</span>
        </div>
      </div>

      <!-- Main Chat Container (Split Columns) -->
      <div style="display: grid; grid-template-columns: 340px 1fr; height: calc(100vh - 360px); min-height: 360px; max-height: calc(100vh - 360px); background: #ffffff; border: 1px solid var(--border-subtle); border-radius: 0 0 var(--radius-lg) var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-morphic-card);">
        
        <!-- Left: Conversation Management Panel -->
        <div style="border-right: 1px solid var(--border-subtle); display: flex; flex-direction: column; height: 100%; min-height: 0; overflow: hidden; background: #ffffff;">
          
          <!-- Sub-toolbar matching Image 1 -->
          <div class="conv-subtoolbar">
            
            <!-- Account selector & quick action icons -->
            <div class="conv-account-row">
              <div style="display: flex; align-items: center; gap: 6px; flex: 1;">
                <input type="checkbox" checked style="accent-color: var(--primary);">
                <select id="select-sales-account-filter" class="form-input" style="font-size: 11.5px; padding: 4px 8px; flex: 1;">
                  <option value="ALL">Tất cả tài khoản Z-Enterprise</option>
                  <option value="ZENT-001293" selected>ZENT-001293 (Nguyễn Văn A)</option>
                </select>
              </div>
              <div style="display: flex; gap: 4px;">
                <button class="btn btn-secondary btn-sm" id="btn-subtoolbar-create-group" title="Tạo nhóm trao đổi mới" style="padding: 4px 8px; font-size: 12px;"></button>
                <button class="btn btn-secondary btn-sm" id="btn-subtoolbar-friend-req" title="Lời mời kết bạn" style="padding: 4px 8px; font-size: 12px; position: relative;">
                  
                  ${friendReqCount > 0 ? `<span style="position: absolute; top: -4px; right: -4px; background: #ef4444; color: #fff; font-size: 9px; border-radius: 9999px; padding: 1px 4px;">${friendReqCount}</span>` : ''}
                </button>
              </div>
            </div>

            <!-- Filter Status Pills (All, Unread, Read, Group) -->
            <div class="conv-filter-pills">
              <div class="conv-pill ${state.salesChatFilter === 'all' ? 'active' : ''}" data-filter="all">Tất cả (${state.customers.length})</div>
              <div class="conv-pill ${state.salesChatFilter === 'unread' ? 'active' : ''}" data-filter="unread">Chưa đọc (${unreadCount})</div>
              <div class="conv-pill ${state.salesChatFilter === 'read' ? 'active' : ''}" data-filter="read">Đã đọc (${readCount})</div>
              <div class="conv-pill ${state.salesChatFilter === 'group' ? 'active' : ''}" data-filter="group">Nhóm (${groupCount})</div>
            </div>

            <!-- Search Input -->
            <input type="text" id="sales-conv-search" class="form-input" placeholder="Tìm kiếm khách hàng, nhóm..." style="font-size: 11.5px; padding: 5px 8px;">

          </div>

          <!-- Utility Rows: Friend Requests & Sync from Image 1 -->
          <div class="conv-action-strip" id="row-open-friend-requests">
            <span style="display: flex; align-items: center; gap: 6px;">
              
              <span>Lời mời kết bạn</span>
            </span>
            <span class="conv-action-link" style="display: flex; align-items: center; gap: 4px;">
              <span>${friendReqCount}</span>
              <span>›</span>
            </span>
          </div>

          <div class="conv-action-strip" style="background: #ffffff;">
            <span style="display: flex; align-items: center; gap: 6px;">
              
              <span>Đồng bộ hội thoại đã xóa</span>
            </span>
            <span class="conv-action-link" id="link-sync-deleted">Đồng bộ</span>
          </div>

          <!-- Conversation Scrollable List -->
          <div style="overflow-y: auto; flex: 1;" id="sales-conv-items-list">
            ${convList.map((c) => {
              const isSelected = selectedChat && selectedChat.id === c.id;
              return `
                <div class="chat-conv-item" data-id="${c.id}" style="padding: 10px 14px; border-bottom: 1px solid var(--border-subtle); cursor: pointer; transition: all 0.15s ease; background: ${isSelected ? 'var(--primary-light)' : '#ffffff'}; border-left: ${isSelected ? '3px solid var(--primary)' : '3px solid transparent'};">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
                    <div style="display: flex; align-items: center; gap: 6px; min-width: 0;">
                      <span style="font-size: 13px;">${c.isGroup ? '[Nhóm]' : '[KH]'}</span>
                      <strong style="font-size: 12px; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 190px;">${c.name}</strong>
                    </div>
                    <span style="font-size: 10px; color: var(--text-muted);">${c.lastInteraction}</span>
                  </div>
                  
                  <div style="font-size: 11px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px;">
                    ${c.contactPerson} • ${c.phoneMasked}
                  </div>

                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="badge ${c.tag === 'Đang Báo Giá' ? 'badge-warning' : (c.tag === 'Nhóm Dự Án' ? 'badge-primary' : 'badge-neutral')}" style="font-size: 9.5px;">
                      ${c.tag || 'Khách Hàng'}
                    </span>
                    ${c.unread ? `<span style="background: #2563eb; color: #fff; font-size: 9px; font-weight: 700; border-radius: 9999px; padding: 1px 6px;">1</span>` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>

        </div>

        <!-- Right: Active Chat Area OR Empty State (Matching Image 1) -->
        <div style="display: flex; flex-direction: column; height: 100%; min-height: 0; overflow: hidden; background: #ffffff;">
          
          ${selectedChat ? `
            <!-- Chat Header -->
            <div style="padding: 12px 16px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; background: #ffffff; flex-shrink: 0;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: #eff6ff; color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px;">
                  ${selectedChat.name.charAt(0)}
                </div>
                <div>
                  <div style="font-weight: 700; font-size: 13.5px; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                    <span>${selectedChat.name}</span>
                    ${selectedChat.isGroup ? '<span class="badge badge-primary" style="font-size: 9.5px;">Nhóm Z-Enterprise</span>' : ''}
                  </div>
                  <div style="font-size: 11.5px; color: var(--text-muted);">${selectedChat.contactPerson} • ${selectedChat.phoneMasked}</div>
                </div>
              </div>
              <div style="display: flex; gap: 8px; align-items: center;">
                <button class="btn btn-primary btn-sm" id="btn-sales-voice-call" style="background: #10b981; border-color: #059669;" ${isSuspended ? 'disabled' : ''}>Gọi Zalo OA (US05)</button>
                <button class="btn btn-secondary btn-sm" onclick="showToast('Mở tài liệu hợp đồng và SLA gói cước FPT...', 'info')">Báo Giá Dự Án</button>
                <button class="btn btn-secondary btn-sm" id="btn-deselect-chat" title="Xem màn hình chờ chưa chọn phòng chat" style="font-size: 11px; color: var(--text-muted);">Đóng Phòng Chat</button>
              </div>
            </div>

            <!-- Quick Template Selector Chips -->
            <div class="template-chips-container" style="padding: 8px 16px; background: #f8fafc; border-bottom: 1px solid var(--border-subtle); display: flex; gap: 8px; overflow-x: auto; flex-shrink: 0;">
              <div class="template-chip" data-text="Dạ em xin gửi anh/chị bảng báo giá chính thức gói Internet Lux 800 cam kết SLA 99.9% của FPT Telecom ạ.">Mẫu Báo Giá Lux 800</div>
              <div class="template-chip" data-text="Dạ em xin phép gửi anh/chị bảng khảo sát kỹ thuật Camera Cloud an ninh 16 mắt tại cơ sở ạ.">Mẫu Camera Cloud</div>
              <div class="template-chip" data-text="Dạ chiều nay 14:00 đội kỹ thuật hạ tầng FPT HCM 01 sẽ qua khảo sát trực tiếp tại dự án anh/chị nhé.">Lịch Hẹn Khảo Sát</div>
            </div>

            <!-- Chat Messages Body -->
            <div class="chat-messages-area" id="sales-chat-messages-scroll" style="flex: 1; min-height: 0; padding: 16px; overflow-y: auto; background: #f8fafc;">
              ${(selectedChat.messages || []).map(m => `
                <div class="msg-bubble ${m.sender === 'me' ? 'msg-outgoing' : 'msg-incoming'}">
                  <div>${m.text}</div>
                  ${m.sender === 'me' && selectedChat.id === 'CUST-001' ? `
                    <div class="msg-attachment">
                      
                      <span style="font-size: 11.5px; font-weight: 600;">Bao_Gia_FPT_Lux800_HaiNam.pdf (1.8 MB)</span>
                    </div>
                  ` : ''}
                  <div class="msg-time">${m.time}</div>
                </div>
              `).join('')}
            </div>

            <!-- Chat Input Bar -->
            <div class="chat-input-bar">
              <input type="text" class="form-input" id="sales-chat-input" placeholder="${isSuspended ? 'Tài khoản đang bị tạm khóa (AC-03c) - Không thể gửi tin nhắn...' : 'Nhập tin nhắn công việc với khách hàng...'}" ${isSuspended ? 'disabled' : ''} style="flex: 1; font-size: 12.5px;">
              <button class="btn btn-primary btn-sm" id="btn-sales-send-msg" ${isSuspended ? 'disabled' : ''}>Gửi</button>
            </div>

          ` : `
            <!-- Empty Chat State (Direct Replica of Image 1) -->
            <div class="chat-empty-state">
              <div class="empty-chat-illustration">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  <circle cx="8" cy="10" r="1" fill="#2563eb"></circle>
                  <circle cx="12" cy="10" r="1" fill="#2563eb"></circle>
                  <circle cx="16" cy="10" r="1" fill="#2563eb"></circle>
                </svg>
              </div>
              <div class="empty-chat-title">Chưa có phòng chat nào được chọn</div>
              <div class="empty-chat-desc">
                Chọn một phòng chat ở danh sách bên trái để hiển thị tin nhắn, hoặc bấm nút bên dưới để tạo nhóm trao đổi dự án mới.
              </div>
              <div style="display: flex; gap: 10px;">
                <button class="btn btn-primary btn-sm" id="btn-empty-create-group">Tạo Nhóm Zalo Doanh Nghiệp</button>
                <button class="btn btn-secondary btn-sm" id="btn-empty-select-first">Mở Hội Thoại Đầu Tiên</button>
              </div>
            </div>
          `}

        </div>

      </div>
    `;

    // 1. Channel Selector Tabs Event Listeners
    container.querySelectorAll('.channel-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        state.salesActiveChannel = tab.dataset.channel;
        showToast(`Đã chuyển sang kênh: ${tab.textContent.trim()}`, 'info');
        renderSalesWorkspaceView(container, title, desc, actions);
      });
    });

    // 2. Filter Pills (All, Unread, Read, Group)
    container.querySelectorAll('.conv-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        state.salesChatFilter = pill.dataset.filter;
        renderSalesWorkspaceView(container, title, desc, actions);
      });
    });

    // 3. Conversation Item Selection
    container.querySelectorAll('.chat-conv-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        state.salesChatSelectedId = id;
        const target = state.customers.find(c => c.id === id);
        if (target) target.unread = false;
        renderSalesWorkspaceView(container, title, desc, actions);
      });
    });

    // 4. Deselect Chat (View Empty State from Image 1)
    document.getElementById('btn-deselect-chat')?.addEventListener('click', () => {
      state.salesChatSelectedId = null;
      renderSalesWorkspaceView(container, title, desc, actions);
    });

    // 5. Empty State Actions
    document.getElementById('btn-empty-create-group')?.addEventListener('click', () => {
      openCreateGroupModal();
    });

    document.getElementById('btn-empty-select-first')?.addEventListener('click', () => {
      if (state.customers.length > 0) {
        state.salesChatSelectedId = state.customers[0].id;
        state.customers[0].unread = false;
        renderSalesWorkspaceView(container, title, desc, actions);
      }
    });

    // 6. Top Buttons & Subtoolbar Actions
    document.getElementById('btn-top-create-group')?.addEventListener('click', openCreateGroupModal);
    document.getElementById('btn-subtoolbar-create-group')?.addEventListener('click', openCreateGroupModal);

    document.getElementById('row-open-friend-requests')?.addEventListener('click', openFriendRequestsModal);
    document.getElementById('btn-subtoolbar-friend-req')?.addEventListener('click', openFriendRequestsModal);

    const runSync = () => {
      showToast('Đang đồng bộ tin nhắn và khôi phục các hội thoại với Gateway Zalo...', 'info');
      setTimeout(() => {
        showToast('Đã đồng bộ toàn bộ hội thoại và kiểm tra tính toàn vẹn thành công!', 'success');
      }, 700);
    };

    document.getElementById('btn-top-sync-chat')?.addEventListener('click', runSync);
    document.getElementById('link-sync-deleted')?.addEventListener('click', runSync);

    // 7. Quick Message Template Chips
    container.querySelectorAll('.template-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const input = document.getElementById('sales-chat-input');
        if (input) {
          input.value = chip.dataset.text;
          input.focus();
        }
      });
    });

    // 8. Voice Call Button Handler (US05)
    document.getElementById('btn-sales-voice-call')?.addEventListener('click', () => {
      if (isSuspended) {
        showToast('Tài khoản đang bị tạm khóa (AC-03c). Không thể thực hiện cuộc gọi!', 'danger');
        return;
      }
      openVoiceCallModal(selectedChat);
    });

    // 8b. Send Chat Message (Retains focus, clears SLA breach)
    const sendMsg = () => {
      if (isSuspended) {
        showToast('Tài khoản đang bị tạm khóa (AC-03c). Không thể gửi tin nhắn!', 'danger');
        return;
      }
      const input = document.getElementById('sales-chat-input');
      if (input && input.value.trim() !== '' && selectedChat) {
        const text = input.value.trim();
        if (!selectedChat.messages) selectedChat.messages = [];
        selectedChat.messages.push({
          sender: 'me',
          text: text,
          time: 'Vừa xong'
        });
        selectedChat.lastInteraction = 'Vừa xong';
        selectedChat.hoursSinceLastMsg = 0; // Clear SLA breach immediately!

        // Append message directly into DOM without full re-render (Retains input focus!)
        const scrollArea = document.getElementById('sales-chat-messages-scroll');
        if (scrollArea) {
          const msgDiv = document.createElement('div');
          msgDiv.className = 'msg-bubble msg-outgoing';
          msgDiv.innerHTML = `<div>${text}</div><div class="msg-time">Vừa xong</div>`;
          scrollArea.appendChild(msgDiv);
          scrollArea.scrollTop = scrollArea.scrollHeight;
        }

        input.value = '';
        input.focus();
        showToast('Đã gửi tin nhắn công việc thành công! (SLA đã được phản hồi)', 'success');
      }
    };

    document.getElementById('btn-sales-send-msg')?.addEventListener('click', sendMsg);
    document.getElementById('sales-chat-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMsg();
    });

    // 9. Real-time Search Filter in Conversation List
    const searchInput = document.getElementById('sales-conv-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.chat-conv-item').forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(q) ? 'block' : 'none';
        });
      });
    }
  }

  // =========================================================================
  // VIEW: SALES REPRESENTATIVE — DANH MỤC KHÁCH HÀNG PHỤ TRÁCH
  // =========================================================================
  function renderMyCustomersView(container, title, desc, actions) {
    title.textContent = 'Danh Mục Khách Hàng Phụ Trách (48 Khách Hàng)';
    desc.textContent = 'Khách hàng được công ty phân công phụ trách. Thông tin SĐT được che số bảo vệ tài sản doanh nghiệp.';

    actions.innerHTML = `
      <button class="btn btn-primary btn-sm" onclick="showToast('Thêm quan hệ khách hàng doanh nghiệp mới!', 'info')">+ Thêm Khách Hàng</button>
    `;

    container.innerHTML = `
      <div class="callout callout-info" style="margin-bottom: 16px;">
        <strong>CHẾ ĐỘ KIỂM SOÁT TUÂN THỦ (PRIVACY LEVEL 5 - FR06):</strong><br>
        Nhật ký kiểm toán vĩ mô ghi nhận toàn bộ biến động Quota, cấp phát tài khoản và thao tác đặc quyền trên phạm vi 3 Vùng & 15 Chi nhánh. Mọi nội dung trao đổi khách hàng được mã hóa, chỉ hiển thị siêu dữ liệu kiểm toán.
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Mã KH</th>
              <th>Tên Khách Hàng Doanh Nghiệp</th>
              <th>Người Đại Diện Liên Hệ</th>
              <th>Số Điện Thoại (Masked)</th>
              <th>Dịch Vụ Đang Trao Đổi</th>
              <th>Tương Tác Gần Nhất</th>
              <th>Cảnh Báo Chăm Sóc</th>
              <th style="text-align: right;">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            ${state.customers.map(c => `
              <tr>
                <td><strong>${c.id}</strong></td>
                <td><strong>${c.name}</strong></td>
                <td>${c.contactPerson}</td>
                <td><code>${c.phoneMasked}</code></td>
                <td>${c.notes}</td>
                <td>${c.lastInteraction}</td>
                <td>
                  ${c.hoursSinceLastMsg >= 48 ? `
                    <span class="badge badge-danger">Quá 48h Chờ Phản Hồi</span>
                  ` : `
                    <span class="badge badge-success">Đang Duy Trì</span>
                  `}
                </td>
                <td style="text-align: right;">
                  <button class="btn btn-secondary btn-sm btn-open-customer-chat" data-id="${c.id}">Nhắn Tin</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    container.querySelectorAll('.btn-open-customer-chat').forEach(btn => {
      btn.addEventListener('click', () => {
        state.currentPersona = 'sales_rep';
        const personaSelect = document.getElementById('select-persona');
        if (personaSelect) personaSelect.value = 'sales_rep';
        state.activeView = 'sales_workspace';
        state.salesChatSelectedId = btn.dataset.id;
        renderApp();
      });
    });
  }

  // =========================================================================
  // VIEW: SALES REPRESENTATIVE — HỒ SƠ DOANH NGHIỆP FPT TELECOM
  // =========================================================================
  function renderAccountDevicesView(container, title, desc, actions) {
    title.textContent = 'Hồ Sơ Định Danh & Bản Quyền Z-Enterprise';
    desc.textContent = 'Mã tài khoản: ZENT-001293 • Chứng nhận tài khoản doanh nghiệp chính chủ FPT Telecom.';

    const me = state.employees.find(e => e.id === 'EMP-00128') || state.employees[0];

    actions.innerHTML = `
      <button class="btn btn-secondary btn-sm" onclick="showToast('Gửi link đổi mật khẩu tới email công ty a.nguyen@fpt.com.vn!', 'success')">Đổi Mật Khẩu</button>
      <button class="btn btn-primary btn-sm" onclick="showToast('Tài khoản Z-Enterprise đã được xác thực tích xanh FPT Telecom!', 'success')">Đã Xác Thực Tích Xanh</button>
    `;

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        
        <div class="table-container" style="padding: 18px;">
          <h3 style="font-size: 14px; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
            Thông Tin Tài Khoản Doanh Nghiệp
            <span class="badge badge-success">Active</span>
          </h3>
          <div style="display: flex; flex-direction: column; gap: 12px; font-size: 12.5px;">
            <div><strong>Mã Bản Quyền Z-Enterprise:</strong> <code style="font-size: 13px; color: var(--primary);">${me.accountId}</code></div>
            <div><strong>Doanh Nghiệp Sở Hữu:</strong> Công ty Cổ phần Viễn thông FPT (FPT Telecom JSC)</div>
            <div><strong>Họ Và Tên Cán Bộ:</strong> ${me.name} (${me.id})</div>
            <div><strong>Email Công Vụ Định Danh:</strong> <code>${me.email}</code></div>
            <div><strong>Đơn Vị & Địa Bàn:</strong> ${me.branchName} — ${me.region}</div>
            <div><strong>Thời Hạn Bản Quyền:</strong> Đến 31/12/2026 (Tự động gia hạn theo hợp đồng tập trung HQ)</div>
          </div>
        </div>

        <div class="table-container" style="padding: 18px;">
          <h3 style="font-size: 14px; margin-bottom: 14px;">Quy Chuẩn Vận Hành & Bảo Vệ Khách Hàng</h3>
          <div style="display: flex; flex-direction: column; gap: 12px; font-size: 12px; color: var(--text-secondary); line-height: 1.6;">
            <div style="display: flex; gap: 10px;">
              <span style="font-size: 16px;"></span>
              <div>
                <strong style="color: var(--text-primary);">Tuân Thủ Tuyệt Đối Masking SĐT:</strong>
                <div>Toàn bộ số điện thoại khách hàng được tự động che (VD: <code>090****567</code>) để đảm bảo an toàn thông tin theo Nghị định 13/2023/NĐ-CP.</div>
              </div>
            </div>

            <div style="display: flex; gap: 10px;">
              <span style="font-size: 16px;"></span>
              <div>
                <strong style="color: var(--text-primary);">Cam Kết SLA Phản Hồi Dưới 15 Phút:</strong>
                <div>Tiếp nhận và giải đáp kịp thời các yêu cầu tư vấn Internet doanh nghiệp, Camera Cloud và Trung tâm dữ liệu FPT.</div>
              </div>
            </div>

            <div style="display: flex; gap: 10px;">
              <span style="font-size: 16px;"></span>
              <div>
                <strong style="color: var(--text-primary);">Bảo Lưu Tài Sản Khách Hàng:</strong>
                <div>Toàn bộ danh bạ và lịch sử hội thoại thuộc quyền sở hữu của Chi nhánh FPT Telecom, sẵn sàng bàn giao liền mạch khi điều chuyển công tác.</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  // =========================================================================
  // VIEW: SALES REPRESENTATIVE — LỊCH SỬ TIẾP QUẢN DANH BẠ
  // =========================================================================
  function renderHandoverHistoryView(container, title, desc, actions) {
    title.textContent = 'Lịch Sử Tiếp Quản Khách Hàng';
    desc.textContent = 'Danh sách các khách hàng doanh nghiệp được bàn giao tiếp quản từ đồng nghiệp tiền nhiệm.';

    actions.innerHTML = `
      <span style="font-size: 11.5px; color: var(--text-muted); align-self: center;">Đã tiếp quản: 12 khách hàng</span>
    `;

    container.innerHTML = `
      <div class="callout callout-info" style="margin-bottom: 16px;">
        <strong>CHẾ ĐỘ KIỂM SOÁT TUÂN THỦ (PRIVACY LEVEL 5 - FR06):</strong><br>
        Nhật ký kiểm toán vĩ mô ghi nhận toàn bộ biến động Quota, cấp phát tài khoản và thao tác đặc quyền trên phạm vi 3 Vùng & 15 Chi nhánh. Mọi nội dung trao đổi khách hàng được mã hóa, chỉ hiển thị siêu dữ liệu kiểm toán.
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Ngày Tiếp Quản</th>
              <th>Khách Hàng Tiếp Nhận</th>
              <th>Đồng Nghiệp Bàn Giao</th>
              <th>Dịch Vụ Hiện Tại</th>
              <th>Ghi Chú Tiến Độ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>10/08/2026</code></td>
              <td><strong>CTCP May Mặc Tân Bình</strong></td>
              <td>Lê Văn C (EMP-00130)</td>
              <td>Internet Cáp Quang 300Mbps</td>
              <td>Đang đàm phán gia hạn hợp đồng năm 2027</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // =========================================================================
  // VIEW: LEGAL & INTERNAL AUDIT — BẢNG GIÁM SÁT TUÂN THỦ
  // =========================================================================
  function renderComplianceCockpitView(container, title, desc, actions) {
    title.textContent = 'Bảng Giám Sát Tuân Thủ & Rủi Ro Dữ Liệu';
    desc.textContent = 'Giám sát tuân thủ chính sách dữ liệu khách hàng, rủi ro tài khoản nhân sự nghỉ việc và can thiệp đặc quyền.';

    actions.innerHTML = `
      <button class="btn btn-secondary btn-sm" onclick="downloadMockCsv('Chung_Thu_Kiem_Toan_So_FPT_ISC.csv', [['Hạng Mục', 'Tỷ Lệ Tuân Thủ', 'Ghi Chú'], ['Bảo Vệ SĐT (Masking)', '100%', 'Đạt chuẩn ISC Level 5'], ['Rủi Ro Nhân Sự', 'Đã kiểm soát', 'Kích hoạt Break-Glass'], ['Bất Biến Audit Logs', '100%', 'HMAC Signed']])">Xuất Hồ Sơ Bằng Chứng Kiểm Toán</button>
    `;

    container.innerHTML = `
      <!-- KPI Row (Modern Morphic Cards) -->
      <div class="metric-grid">
        <div class="metric-card">
          <div class="metric-label">Tổng Sự Kiện Kiểm Toán</div>
          <div class="metric-value">${state.auditLogs.length}</div>
          <div class="metric-sub">Lưu trữ bất biến (Immutable)</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Tuân Thủ Masking SĐT</div>
          <div class="metric-value" style="color: var(--success-solid);">100%</div>
          <div class="metric-sub">Không rò rỉ SĐT khách hàng</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Cảnh Báo Rủi Ro Nhân Sự</div>
          <div class="metric-value" style="color: var(--danger-solid);">1</div>
          <div class="metric-sub">Nhân sự thôi việc chưa thu hồi TK</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Can Thiệp Đặc Quyền (Break-glass)</div>
          <div class="metric-value" style="color: var(--warning-solid);">0</div>
          <div class="metric-sub">30 ngày gần nhất</div>
        </div>
      </div>

      <!-- Privacy Level 5 Compliance Banner (FR06) -->
      <div class="callout callout-info" style="margin-bottom: 16px;">
        <strong>CHẾ ĐỘ GIÁM SÁT TUÂN THỦ (PRIVACY LEVEL 5 - FR06):</strong><br>
        Nội dung trò chuyện giữa Sales và Khách hàng được mã hóa đầu cuối tuân thủ Luật An Ninh Mạng & Chính sách FPT ISC. Cán bộ Pháp chế & Kiểm toán chỉ được phép xem <strong>Interaction Metadata</strong> (thời điểm, kênh, người phụ trách). Mọi hành vi mở khóa nội dung đàm thoại bắt buộc phải có Lệnh Audit phê duyệt kép <strong>Break-Glass (US10 / FR08)</strong>.
      </div>

      <!-- Compliance Risk Warning Panel -->
      <div class="table-container">
        <div class="table-toolbar">
          <strong style="color: var(--danger-solid);">Cảnh Báo Vi Phạm / Rủi Ro Tuân Thủ Cần Khắc Phục</strong>
          <span class="badge badge-danger">Mức Độ: Nghiêm Trọng</span>
        </div>
        <div style="padding: 16px;">
          <div class="approval-card" style="border-color: var(--danger-border); background-color: #fffaf0;">
            <div class="approval-info">
              <div class="approval-title" style="color: var(--danger-solid);">Đoàn Thanh L (EMP-00137) đã thôi việc trên HR nhưng tài khoản ZENT-001301 vẫn đang Active</div>
              <div class="approval-meta">
                Chi nhánh: <strong>HCM 01</strong> • Phiên đăng nhập cuối: <strong>3 giờ trước</strong> từ IP <code>118.69.182.60</code>.<br/>
                Nguy cơ: Khách hàng phát sinh giao dịch không được doanh nghiệp kiểm soát và rủi ro thất thoát dữ liệu.
              </div>
            </div>
            <button class="btn btn-danger btn-sm" id="btn-audit-force-revoke">Khóa Khẩn Cấp Break-Glass (Dual OTP)</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-audit-force-revoke')?.addEventListener('click', () => {
      openBreakGlassModal('EMP-00137');
    });
  }

  // =========================================================================
  // VIEW: LEGAL & INTERNAL AUDIT — SỔ NHẬT KÝ KIỂM TOÁN HỆ THỐNG
  // =========================================================================
  function renderAuditTrailView(container, title, desc, actions) {
    title.textContent = 'Sổ Nhật Ký Kiểm Toán Hệ Thống (Bất Biến)';
    desc.textContent = 'Toàn bộ thao tác cấp phát, thu hồi, phân bổ Quota, và bàn giao khách hàng được ghi nhận bất biến.';

    actions.innerHTML = `
      <span style="font-size: 11.5px; color: var(--text-muted); align-self: center;">${state.auditLogs.length} Bản ghi</span>
      <button class="btn btn-secondary btn-sm" onclick="downloadMockCsv('Nhat_Ky_Kiem_Toan_He_Thong.csv', [['Thời Gian', 'Actor', 'Hành Động', 'Chi Tiết', 'Phạm Vi'], ...state.auditLogs.map(a => [a.time, a.actor, a.action, a.detail, a.scope])])">Xuất Báo Cáo CSV</button>
    `;

    container.innerHTML = `
      <div class="callout callout-info" style="margin-bottom: 16px;">
        <strong>CHẾ ĐỘ KIỂM SOÁT TUÂN THỦ (PRIVACY LEVEL 5 - FR06):</strong><br>
        Nhật ký kiểm toán vĩ mô ghi nhận toàn bộ biến động Quota, cấp phát tài khoản và thao tác đặc quyền trên phạm vi 3 Vùng & 15 Chi nhánh. Mọi nội dung trao đổi khách hàng được mã hóa, chỉ hiển thị siêu dữ liệu kiểm toán.
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Dấu Thời Gian</th>
              <th>Người Thực Hiện (Actor)</th>
              <th>Thao Tác Thực Hiện</th>
              <th>Đối Tượng Tác Động</th>
              <th>Đơn Vị Trực Thuộc</th>
              <th>Kết Quả</th>
            </tr>
          </thead>
          <tbody>
            ${state.auditLogs.map(l => `
              <tr>
                <td><code>${l.timestamp}</code></td>
                <td><strong>${l.actor}</strong></td>
                <td>${l.action}</td>
                <td><strong>${l.target}</strong></td>
                <td>${l.org}</td>
                <td><span class="badge ${l.result === 'Thành Công' ? 'badge-success' : 'badge-warning'}">${l.result}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // =========================================================================
  // VIEW: LEGAL & INTERNAL AUDIT — GIÁM SÁT TOÀN VẸN TÀI SẢN KHÁCH HÀNG
  // =========================================================================
  function renderCustomerAssetProtectionView(container, title, desc, actions) {
    title.textContent = 'Giám Sát Toàn Vẹn Tài Sản Khách Hàng';
    desc.textContent = 'Rà soát tính toàn vẹn của danh bạ khách hàng doanh nghiệp, ngăn chặn thất thoát dữ liệu.';

    actions.innerHTML = `
      <button class="btn btn-secondary btn-sm" onclick="showToast('Báo cáo toàn vẹn tài sản khách hàng đạt 100%!', 'success')">Kiểm Tra Toàn Vẹn</button>
    `;

    container.innerHTML = `
      <div class="callout callout-info" style="margin-bottom: 16px;">
        <strong>CHẾ ĐỘ KIỂM SOÁT TUÂN THỦ (PRIVACY LEVEL 5 - FR06):</strong><br>
        Nhật ký kiểm toán vĩ mô ghi nhận toàn bộ biến động Quota, cấp phát tài khoản và thao tác đặc quyền trên phạm vi 3 Vùng & 15 Chi nhánh. Mọi nội dung trao đổi khách hàng được mã hóa, chỉ hiển thị siêu dữ liệu kiểm toán.
      </div>
      <div class="table-container">
        <div class="table-toolbar">
          <strong>Danh Mục Khách Hàng Được Bảo Vệ Dưới Tài Khoản Enterprise</strong>
          <span class="badge badge-success">100% Thuộc FPT Telecom</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Mã KH</th>
              <th>Tên Khách Hàng Doanh Nghiệp</th>
              <th>SĐT Đã Che (Masked)</th>
              <th>Nhân Viên Đang Phụ Trách</th>
              <th>Chi Nhánh Quản Lý</th>
              <th>Trạng Thái Tài Sản</th>
            </tr>
          </thead>
          <tbody>
            ${state.customers.map(c => `
              <tr>
                <td><strong>${c.id}</strong></td>
                <td>${c.name}</td>
                <td><code>${c.phoneMasked}</code></td>
                <td>${c.handlerName}</td>
                <td>${c.branchName}</td>
                <td><span class="badge badge-success">Đã Đăng Ký Tài Sản Cty</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // =========================================================================
  // VIEW: LEGAL & INTERNAL AUDIT — QUYỀN QUẢN TRỊ & CAN THIỆP KHẨN CẤP
  // =========================================================================
  function renderElevatedAccessLogsView(container, title, desc, actions) {
    title.textContent = 'Quyền Quản Trị Đặc Quyền & Can Thiệp Khẩn Cấp (US10 / FR08)';
    desc.textContent = 'Theo dõi các thao tác đặc quyền, xác thực kép Break-Glass và can thiệp cưỡng chế khẩn cấp.';

    actions.innerHTML = `
      <button class="btn btn-danger btn-sm" id="btn-top-trigger-breakglass">+ Kích Hoạt Break-Glass (Dual OTP)</button>
    `;

    container.innerHTML = `
      <div class="callout callout-danger" style="margin-bottom: 16px;">
        <strong>QUY TRÌNH CAN THIỆP ĐẶC QUYỀN BREAK-GLASS (US10 / FR08):</strong><br>
        Toàn bộ hành vi can thiệp khẩn cấp vào tài khoản nhân sự hoặc hệ thống bắt buộc phải có sự xác thực kép đồng thời (Dual Authorization) của Super Admin và Legal/Compliance Officer. Mọi thao tác được lưu trữ nhật ký bất biến.
      </div>

      <div class="table-container">
        <div class="table-toolbar">
          <strong>Nhật Ký Can Thiệp Đặc Quyền & Break-Glass Đã Thực Thi</strong>
          <span class="badge badge-neutral">${(state.breakGlassLogs || []).length} Bản Ghi</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Mã Sự Kiện</th>
              <th>Thời Gian</th>
              <th>Xác Thực 1 (Super Admin)</th>
              <th>Xác Thực 2 (Legal/Audit)</th>
              <th>Đối Tượng Can Thiệp</th>
              <th>Lý Do Can Thiệp Khẩn Cấp</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            ${(state.breakGlassLogs || []).map(bg => `
              <tr>
                <td><code>${bg.id}</code></td>
                <td><code>${bg.time}</code></td>
                <td><strong>${bg.actorSuper}</strong></td>
                <td><strong>${bg.actorLegal}</strong></td>
                <td><strong style="color: var(--danger-solid);">${bg.targetName}</strong></td>
                <td style="max-width: 250px;">${bg.reason}</td>
                <td><span class="badge badge-success">${bg.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('btn-top-trigger-breakglass')?.addEventListener('click', () => {
      openBreakGlassModal('EMP-00137');
    });
  }

  // =========================================================================
  // 8. GLOBAL APP INITIALIZATION & EVENT LISTENERS
  // =========================================================================
  function renderApp() {
    renderRoleBar();
    renderNav();
    renderFilterPanel();
    renderActiveView();
  }

  function init() {
    // 0. Parse URL Parameters & Hash for Direct Deep-Linking
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const hashString = window.location.hash.startsWith('#') ? window.location.hash.substring(1) : '';
      const hashParams = new URLSearchParams(hashString);
      const p = urlParams.get('persona') || hashParams.get('persona');
      const v = urlParams.get('view') || hashParams.get('view');
      const filterParam = urlParams.get('filter') || hashParams.get('filter');
      const chatParam = urlParams.get('chat') || hashParams.get('chat');
      const modalParam = urlParams.get('modal') || hashParams.get('modal');

      if (p && PERSONA_METADATA[p]) {
        state.currentPersona = p;
        state.activeView = v || PERSONA_METADATA[p].defaultView;
      }
      const superDrill = urlParams.get('super_drill') || hashParams.get('super_drill');
      if (superDrill) state.superAdminDrilldown = superDrill;
      const regionDrill = urlParams.get('region_drill') || hashParams.get('region_drill');
      if (regionDrill) state.regionAdminDrilldown = regionDrill;
      if (filterParam === 'open') {
        state.isFilterOpen = true;
      }
      if (chatParam === 'empty') {
        state.salesChatSelectedId = null;
      }
      if (modalParam === 'create_group') {
        setTimeout(openCreateGroupModal, 150);
      } else if (modalParam === 'friend_requests') {
        setTimeout(openFriendRequestsModal, 150);
      }
    } catch (e) {
      console.warn('URL parsing ignored', e);
    }

    // 1. Role Switcher Listener
    const personaSelect = document.getElementById('select-persona');
    if (personaSelect) {
      personaSelect.value = state.currentPersona;
      personaSelect.addEventListener('change', (e) => {
        state.currentPersona = e.target.value;
        const meta = PERSONA_METADATA[state.currentPersona];
        state.activeView = meta.defaultView;
        state.filters.scopeUnit = 'ALL';
        renderApp();
        showToast(`Đã chuyển sang vai trò: ${meta.role} (${meta.unit})`, 'info');
      });
    }

    // 2. Toggle Advanced Filter Button
    const btnToggleFilter = document.getElementById('btn-toggle-filter');
    if (btnToggleFilter) {
      btnToggleFilter.addEventListener('click', () => {
        state.isFilterOpen = !state.isFilterOpen;
        renderFilterPanel();
      });
    }

    const btnCloseFilter = document.getElementById('btn-close-filter');
    if (btnCloseFilter) {
      btnCloseFilter.addEventListener('click', () => {
        state.isFilterOpen = false;
        renderFilterPanel();
      });
    }

    // 3. Apply Filter Button
    const btnApplyFilter = document.getElementById('btn-apply-filter');
    if (btnApplyFilter) {
      btnApplyFilter.addEventListener('click', () => {
        state.filters.scopeUnit = document.getElementById('filter-scope-unit')?.value || 'ALL';
        state.filters.status = document.getElementById('filter-status')?.value || 'ALL';
        state.filters.quotaHealth = document.getElementById('filter-quota-health')?.value || 'ALL';
        state.filters.timeRange = document.getElementById('filter-time-range')?.value || 'ALL';
        state.filters.keyword = document.getElementById('filter-keyword')?.value || '';
        showToast('Đã áp dụng bộ lọc nâng cao!', 'success');
        renderApp();
      });
    }

    // 4. Reset Filter Button
    const btnResetFilter = document.getElementById('btn-reset-filter');
    if (btnResetFilter) {
      btnResetFilter.addEventListener('click', () => {
        state.filters = { scopeUnit: 'ALL', status: 'ALL', quotaHealth: 'ALL', timeRange: 'ALL', keyword: '' };
        const unitEl = document.getElementById('filter-scope-unit');
        const statEl = document.getElementById('filter-status');
        const quotaEl = document.getElementById('filter-quota-health');
        const timeEl = document.getElementById('filter-time-range');
        const keyEl = document.getElementById('filter-keyword');
        if (unitEl) unitEl.value = 'ALL';
        if (statEl) statEl.value = 'ALL';
        if (quotaEl) quotaEl.value = 'ALL';
        if (timeEl) timeEl.value = 'ALL';
        if (keyEl) keyEl.value = '';
        showToast('Đã đặt lại bộ lọc nâng cao!', 'info');
        renderApp();
      });
    }

    // 5. Session Lock Button (FR04)
    const btnSessionTimer = document.getElementById('btn-session-timer');
    if (btnSessionTimer) {
      btnSessionTimer.addEventListener('click', lockSession);
    }

    // 5b. Reset State Button (Closes any open modals first)
    const btnResetState = document.getElementById('btn-reset-state');
    if (btnResetState) {
      btnResetState.addEventListener('click', () => {
        closeModal();
        state = JSON.parse(JSON.stringify(INITIAL_STATE));
        if (personaSelect) personaSelect.value = state.currentPersona;
        showToast('Đã khôi phục trạng thái ban đầu của hệ thống!', 'info');
        renderApp();
      });
    }

    // 6. Generic Modal Close Handlers
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', closeModal);
    });

    const genericModal = document.getElementById('modal-generic');
    if (genericModal) {
      genericModal.addEventListener('click', (e) => {
        if (e.target === genericModal) closeModal();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // Initial render
    renderApp();
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // =========================================================================
  // GLOBAL WINDOW EXPORTS (100% Elimination of ReferenceErrors across Codebase)
  // =========================================================================
  window.state = state;
  window.showToast = showToast;
  window.closeModal = closeModal;
  window.openModal = openModal;
  window.openAllocateHqQuotaModal = openAllocateHqQuotaModal;
  window.openCreateGroupModal = openCreateGroupModal;
  window.openFriendRequestsModal = openFriendRequestsModal;
  window.openSuspendImpactModal = openSuspendImpactModal;
  window.openPullReclaimModal = openPullReclaimModal;
  window.openHandoverBotModal = openHandoverBotModal;
  window.openBreakGlassModal = openBreakGlassModal;
  window.openVoiceCallModal = openVoiceCallModal;
  window.openTransferSalesModal = openTransferSalesModal;
  window.lockSession = lockSession;
  window.unlockSession = unlockSession;
  window.renderApp = renderApp;
  window.renderActiveView = renderActiveView;
  window.renderNav = renderNav;
  window.downloadMockCsv = downloadMockCsv;

})();
