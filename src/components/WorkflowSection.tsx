import React from "react";
import { Send, FileCheck, CheckCircle, CreditCard, PenTool, ClipboardCheck, Award, ThumbsUp } from "lucide-react";

export default function WorkflowSection() {
  const steps = [
    {
      step: "01",
      title: "Gửi Đăng Ký Yêu Cầu",
      desc: "Thầy cô nhấn 'Đặt thiết kế' trên website, điền thông tin đề bài giáo án thô hoặc kịch bản sơ bộ.",
      icon: Send,
      color: "text-rose-500 bg-rose-50 border-rose-100",
    },
    {
      step: "02",
      title: "Tư Vấn Giải Pháp Sư Phạm",
      desc: "Chuyên viên Mario Slide liên hệ tư vấn chọn gói (Gói PowerPoint, E-Learning hoặc Làm phim hoạt cảnh 2D/3D).",
      icon: FileCheck,
      color: "text-amber-500 bg-amber-50 border-amber-100",
    },
    {
      step: "03",
      title: "Thanh Toán Đặt Bài",
      desc: "Thầy cô thực hiện chuyển khoản 100% chi phí dịch vụ. Hệ thống kích hoạt trạng thái thiết kế độc quyền ngay lập tức.",
      icon: CreditCard,
      color: "text-emerald-500 bg-emerald-50 border-emerald-100",
    },
    {
      step: "04",
      title: "Biên Tập & Thiết Kế Thô",
      desc: "Họa sĩ vẽ tranh, kỹ sư tích hợp AI độc quyền dựng hình 2D/3D và tạo các trò chơi minigame tương tác thông thái.",
      icon: PenTool,
      color: "text-purple-500 bg-purple-50 border-purple-100",
    },
    {
      step: "05",
      title: "Duyệt Bản Demo Sơ Bộ",
      desc: "Mario Slide gửi liên kết xem trước demo. Giáo viên đánh giá nội dung, hiệu ứng và mức độ thích thú của hoạt cảnh.",
      icon: ClipboardCheck,
      color: "text-blue-500 bg-blue-50 border-blue-100",
    },
    {
      step: "06",
      title: "Hiệu Chỉnh Theo Gói Đã Chọn",
      desc: "Chỉnh sửa thẩm mỹ theo đúng hạn mức (3 lần < 10% với Gói PPT-1, 5 lần < 20% với Gói PPT-2, hay 10 lần với E-Learning-3).",
      icon: ThumbsUp,
      color: "text-pink-500 bg-pink-50 border-pink-100",
    },
    {
      step: "07",
      title: "Nghiệm Thu & Bàn Giao",
      desc: "Xuất bản và gửi file PowerPoint gốc, video MP4 chuẩn Full-HD sắc nét, hoặc gói đóng chuẩn Quốc tế SCORM 2004.",
      icon: Award,
      color: "text-indigo-500 bg-indigo-50 border-indigo-100",
    },
    {
      step: "08",
      title: "Chăm Sóc Sau Bàn Giao",
      desc: "Mario Slide lưu trữ dự án bảo mật, hỗ trợ thầy cô các kỹ thuật thao tác bấm nút trò chơi trong vòng 1 tháng tối đa.",
      icon: CheckCircle,
      color: "text-teal-500 bg-teal-50 border-teal-100",
    },
  ];

  return (
    <div id="workflow-section-container" className="space-y-12 py-4">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl font-black text-gray-950">
          Quy trình <span className="text-rose-500">8 Bước Chuyên Nghiệp</span>
        </h2>
        <p className="text-gray-500 text-sm">
          Nhờ quy trình khép kín, an toàn và bài bản, Mario Slide tự tin rút ngắn thời gian thiết kế, đảm bảo hiệu ứng và tương tác sinh động nhất của bài giảng.
        </p>
      </div>

      {/* Steps Visual Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((item, index) => {
          const IconComp = item.icon;
          return (
            <div
              key={index}
              id={`workflow-step-${item.step}`}
              className="bg-white rounded-2xl border border-gray-150 p-6 shadow-xs hover:shadow-md hover:border-rose-100 transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                {/* Header of step card */}
                <div className="flex justify-between items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-3xl font-black text-gray-100 group-hover:text-rose-100 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-gray-950 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Step guidelines indicators */}
              <div className="pt-3 border-t border-gray-50 text-[10px] text-gray-400 font-semibold italic flex items-center space-x-1">
                <span>Nhịp xử lý bài:</span>
                <span className="text-rose-500">Nhanh chóng & Sư phạm</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rules callout inside workflow */}
      <div className="bg-amber-50/50 border border-amber-150 rounded-2xl p-5 text-xs text-gray-700 leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-2">
          <p className="font-extrabold text-gray-900 uppercase tracking-wider text-amber-700">⚠️ Điều khoản và quy trình thanh toán:</p>
          <ul className="list-disc pl-4 space-y-1 text-gray-600">
            <li>Thanh toán chuyển khoản <strong>100% chi phí</strong> trước khi tiến hành thực hiện thiết kế.</li>
            <li>Sau khi nhận thanh toán và phê duyệt của thầy cô, dự án được đưa vào dây chuyền thiết kế.</li>
          </ul>
        </div>
        <div className="space-y-2">
          <p className="font-extrabold text-gray-900 uppercase tracking-wider text-amber-700">⏱️ Giới hạn thời gian hoàn thiện:</p>
          <p className="text-gray-600">
            Mỗi đơn hàng được hỗ trợ chỉnh sửa, hoàn chỉnh trong thời hạn tối đa <strong>1 tháng</strong> kể từ ngày đặt bài. Quá 1 tháng bài giảng sẽ được tự động lưu trữ đóng và không hoàn tiền dịch vụ. Thầy cô vui lòng phối hợp phản hồi sớm bài demo.
          </p>
        </div>
      </div>
    </div>
  );
}
