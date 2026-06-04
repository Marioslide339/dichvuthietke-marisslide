/**
 * GOOGLE APPS SCRIPT FOR MARIS SLIDE REGISTRATION FORM
 * 
 * HƯỚNG DẪN CÀI ĐẶT:
 * 1. Mở trang Google Sheet của bạn: https://docs.google.com/spreadsheets/d/1rk5WN09Htpp8JP0XRC20mmN_bHd8ZjJvBfef2YplbCA/edit
 * 2. Trên thanh menu, chọn: Tiện ích mở rộng (Extensions) -> Trình biên kịch Apps Script (Apps Script)
 * 3. Xóa hết code mặc định trong trình soạn thảo, dán toàn bộ đoạn code dưới đây vào.
 * 4. Nhấn nút "Lưu" (biểu tượng hình đĩa mềm).
 * 5. Nhấn nút "Triển khai" (Deploy) ở góc trên bên phải -> Chọn "Triển khai mới" (New deployment).
 * 6. Click biểu tượng bánh răng cài đặt -> Chọn "Ứng dụng web" (Web app).
 * 7. Cấu hình cài đặt triển khai:
 *    - Mô tả: Maris Slide Registration Form API
 *    - Thực thi dưới danh nghĩa: Bạn (Địa chỉ email của bạn)
 *    - Ai có quyền truy cập: Mọi người (Anyone) - RẤT QUAN TRỌNG ĐỂ WEB CÓ THỂ GỬI ĐƯỢC DATA
 * 8. Nhấn "Triển khai" (Deploy). Google sẽ yêu cầu bạn cấp quyền truy cập, hãy nhấn "Cấp quyền truy cập" (Authorize Access), chọn tài khoản Google của bạn, nhấn "Nâng cao" (Advanced) -> Chọn "Đi tới Dự án không có tiêu đề (không an toàn)" và nhấn "Cho phép" (Allow).
 * 9. Sau khi thành công, Google sẽ cung cấp một đường dẫn "URL ứng dụng web" (Web app URL) có đuôi dạng `/exec`.
 * 10. Copy URL đó và thay thế vào hằng số `GOOGLE_SCRIPT_URL` trong các file:
 *     - preview.html
 *     - src/components/BookingForm.tsx
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Tự động thêm hàng tiêu đề nếu trang tính đang trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Mã Đăng Ký",
        "Thời Gian Gửi",
        "Họ và Tên",
        "Số ZALO (SĐT)",
        "Dịch Vụ Quan Tâm",
        "Gói Thiết Kế",
        "Số Lượng (Phút/Cảnh)",
        "Chi Phí Dự Kiến",
        "Ghi Chú / Yêu Cầu Chi Tiết"
      ]);
      // Định dạng dòng tiêu đề (Chữ in đậm, nền hồng nhạt, căn giữa)
      sheet.getRange(1, 1, 1, 9)
           .setFontWeight("bold")
           .setBackground("#ffe4e6")
           .setHorizontalAlignment("center");
    }
    
    // Thêm thông tin đăng ký mới vào dòng tiếp theo
    sheet.appendRow([
      data.id || "",
      data.createdAt || "",
      data.customerName || "",
      "'" + (data.zalo || ""), // Thêm dấu nháy đơn trước số điện thoại để tránh Google Sheet tự động bỏ số 0 ở đầu
      data.serviceType || "",
      data.packageName || "",
      data.quantity || 1,
      data.totalPrice || "",
      data.requirements || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Ghi nhận thông tin thành công!" }))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Maris Slide Sheets API is Active.")
                       .setMimeType(ContentService.MimeType.TEXT);
}
