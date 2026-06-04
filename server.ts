import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
// Global Chat API utilizing simulated advisor logic (offline matching)
app.post("/api/chat", (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Tham số messages không hợp lệ." });
  }

  const query = messages[messages.length - 1]?.text || "";
  const q = query.toLowerCase();
  let responseText = "";

  if (q.includes("powerpoint") || q.includes("ppt") || q.includes("slide") || q.includes("trình chiếu")) {
    responseText = `### Dịch vụ thiết kế PowerPoint tại Maris Slide:
- **Gói 1 (PowerPoint Cơ Bản)**: **800.000đ / bài**. Giáo viên gửi bản PowerPoint nội dung. Tối đa 30 slide / bản.
- **Gói 2 (PowerPoint Trọn gói AI, video 2D & 3D)**: **1.500.000đ / bài**. Tối đa 30 slide. Maris Slide chịu trách nhiệm lên ý tưởng sư phạm đổi mới toàn diện đạt chuẩn nâng cao từ giáo án thô.
- **Hỗ trợ sửa bài**: Sửa đổi tối đa 5 lần cho Gói 2 và 3 lần cho Gói 1 kể từ ngày bàn giao bài demo trong vòng 1 tháng.`;
  } else if (q.includes("hoạt hình") || q.includes("phim") || q.includes("video") || q.includes("animiz") || q.includes("cảnh phim")) {
    responseText = `### Dịch vụ thiết kế Phim Hoạt Hình Giáo Khoa:
- **Phim hoạt hình tình huống 2D (Animiz)**: **300.000đ / phút phim**. (Tối thiểu thầu từ 3 phút).
- **Hoạt hình 3D Trí Tuệ Nhân Tạo AI**: **150.000đ / cảnh phim**.
- Đội ngũ biên kịch và thiết kế sẽ đồng hành chuyển thể kịch bản bài học của thầy cô thành những thước phim minh họa sinh động nhất.`;
  } else if (q.includes("elearning") || q.includes("e-learning") || q.includes("scorm") || q.includes("lms")) {
    responseText = `### Dịch vụ thiết kế Bài Giảng E-Learning (Chuẩn SCORM):
- **E-Learning Gói 1 (Cơ bản chuẩn SCORM)**: **1.500.000đ / bài**. Thiết kế SCORM tiêu chuẩn, chưa tích hợp AI.
- **E-Learning Gói 2 (Phổ thông & Quiz)**: **2.000.000đ / bài**. Tích hợp bộ Quiz trắc nghiệm tương tác, chưa tích hợp AI.
- **E-Learning Gói 3 (Trọn gói kịch bản từ A-Z)**: **4.000.000đ / bài** ⭐. Lên kịch bản từ A-Z, tích hợp Mini game, App AI tương tác, Chatbot hỗ trợ học viên, Video hoạt hình tình huống (2 phút) và sửa đổi tới 10 lần.
- *Lưu ý chung*: Giáo viên cần tự ghi âm, ghi hình lời giảng để Maris Slide thực hiện đồng bộ.`;
  } else if (q.includes("sáng kiến") || q.includes("skkn") || q.includes("kinh nghiệm") || q.includes("trùng lặp")) {
    responseText = `### Dịch vụ viết Sáng kiến kinh nghiệm (SKKN):
- **Bản Word hoàn thiện**: **2.000.000đ / bản**.
- **Cam kết & Quy trình**:
  - Quy trình viết Word trọn gói bám sát khung sườn.
  - Cam kết độ trùng lặp **<20%**.
  - Hỗ trợ chèn sản phẩm có trong sáng kiến (nếu có).
  - Thời hạn hoàn thiện 20-30 ngày. Số liệu định lượng giả định logic theo sĩ số thực tế.
  - Hỗ trợ sửa tối đa 3 lần bản thảo (không đổi khung đã chốt).`;
  } else if (q.includes("giáo viên giỏi") || q.includes("gvg") || q.includes("biện pháp") || q.includes("báo cáo")) {
    responseText = `### Dịch vụ Biện pháp & Báo cáo GVG:
- **Biện pháp Bản Word**: **1.000.000đ / bản**. Biên soạn nội dung Word chuẩn mực GVG bám sát sườn. Hoàn thiện trong 7-10 ngày.
- **PowerPoint Báo Cáo Biện Pháp**: **1.000.000đ / bài**.
- *Lưu ý*: File Word và PowerPoint là hai dịch vụ tách biệt. Hỗ trợ sửa đổi tối đa 3 lần bản thảo.`;
  } else if (q.includes("app") || q.includes("ứng dụng") || q.includes("phần mềm") || q.includes("game")) {
    responseText = `### Dịch vụ Thiết kế Ứng dụng theo yêu cầu (APP):
- **APP CƠ BẢN (Gói 1)**: **1.000.000đ / Ứng dụng**. Giải pháp thiết kế đơn giản, tối ưu chi phí. Thích hợp làm game tương tác học tập, phần mềm quản lý, mô phỏng cơ bản hoạt động độc lập (không cần máy chủ). Hỗ trợ sửa tối đa 5 lần.
- **APP NÂNG CAO (Gói 2)**: **2.000.000đ / Ứng dụng** ⭐. Tích hợp Database online, API, tính năng đăng nhập và đồng bộ dữ liệu thời gian thực, có trang quản trị viên. Hỗ trợ sửa tối đa 10 lần.`;
  } else if (q.includes("khóa học") || q.includes("học") || q.includes("đào tạo") || q.includes("lớp học")) {
    responseText = `### Khóa học Công nghệ tại Maris Slide:
Hiện tại Maris Slide đang cung cấp các khóa học công nghệ giáo dục giúp thầy cô tự làm chủ các công cụ soạn bài giảng.
- Quý thầy cô vui lòng truy cập liên kết sau để xem chi tiết thông tin khóa học: [Xem thông tin Khóa Học](https://khoahoccongnghe2-marisslide.vercel.app/)`;
  } else if (q.includes("giá") || q.includes("bao nhiêu") || q.includes("phí") || q.includes("chi phí") || q.includes("báo giá") || q.includes("tiền")) {
    responseText = `### Bảng giá dịch vụ tại Maris Slide:
- **PowerPoint**: **800.000đ** (Cơ bản) | **1.500.000đ** (Trọn gói AI)
- **Phim Hoạt Hình**: **300.000đ/phút** (2D) | **150.000đ/cảnh** (3D AI)
- **E-Learning**: **1.500.000đ** (Gói 1) | **2.000.000đ** (Phổ thông) | **4.000.000đ** (Trọn gói kịch bản A-Z)
- **Sáng kiến kinh nghiệm (SKKN)**: **2.000.000đ / bản Word**
- **Biện pháp GVG**: **1.000.000đ** (Bản Word) | **1.000.000đ** (PowerPoint báo cáo)
- **Thiết kế APP**: **1.000.000đ** (Cơ bản) | **2.000.000đ** (Nâng cao)`;
  } else if (q.includes("sửa") || q.includes("chỉnh sửa") || q.includes("bảo hành") || q.includes("yêu cầu thêm") || q.includes("lưu trữ")) {
    responseText = `### Quy định chỉnh sửa và lưu trữ bài dạy:
- **Thời hạn hỗ trợ**: Tất cả đơn hàng đều được hỗ trợ chỉnh sửa hoàn chỉnh trong thời hạn tối đa **1 tháng** kể từ ngày đặt bài.
- **Quy định đóng bài**: Sau 1 tháng, bài dạy sẽ được tự động đóng bảo mật lưu trữ và không hỗ trợ sửa đổi thêm miễn phí.
- **Số lần sửa đổi**: Từ 3 đến 10 lần tùy theo gói dịch vụ thầy cô lựa chọn.`;
  } else if (q.includes("bảo mật") || q.includes("cam kết") || q.includes("đảm bảo") || q.includes("uy tín") || q.includes("có vàng")) {
    responseText = `### Cam kết 3 "CÓ" Vàng từ Maris Slide:
1. **100% Độc Quyền**: Mỗi bài giảng đều được thiết kế độc nhất, không sao chép trùng lặp.
2. **100% Bảo Mật**: Tuyệt đối giữ bí mật tác quyền và thông tin lớp học/trường học của giáo viên.
3. **Tương Tác Mini Game**: Các hoạt động học tập tương tác, kích thích sự chủ động của học sinh được tích hợp hài hòa.`;
  } else {
    responseText = `Xin lỗi thầy cô, tôi chưa tìm thấy câu trả lời trực tiếp cho câu hỏi của thầy cô trong cơ sở dữ liệu trên web. 
Thầy cô có thể thử hỏi bằng các từ khóa liên quan như: **PowerPoint, E-Learning, Phim Hoạt Hình, Sáng kiến kinh nghiệm (SKKN), Biện pháp GVG, Thiết kế APP, Khóa học, Báo giá, Quy định sửa bài...** 
Hoặc thầy cô có thể bấm nút **Đặt Thiết Kế** hoặc liên hệ trực tiếp hotline **0396.581.283** để được chuyên viên trực tiếp tư vấn chi tiết hơn ạ!`;
  }

  return res.json({ text: responseText });
});

// Configure Vite or Static delivery depending on environment
async function start() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Maris Slide Server is running on http://localhost:${PORT}`);
  });
}

start();
