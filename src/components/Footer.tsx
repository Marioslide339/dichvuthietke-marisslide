import React from "react";
import { Mail, ShieldCheck, HelpCircle, PhoneCall, Award, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer id="mario-slide-footer" className="bg-gray-900 text-white mt-24 border-t-4 border-rose-500 rounded-t-3xl overflow-hidden">
      
      {/* Top commitment strip */}
      <div className="bg-gradient-to-r from-rose-600 to-amber-500 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">ĐÀO TẠO VÀ HỖ TRỢ THIẾT KẾ ĐỈNH CAO</h4>
            <p className="text-xs text-white/80">Maris Slide cam kết đồng hành cùng buổi lên lớp đổi mới chất lượng cao nhất của thầy cô.</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <span className="bg-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold text-white flex items-center space-x-1 uppercase border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Độc Quyền</span>
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold text-white flex items-center space-x-1 uppercase border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Bảo Mật</span>
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold text-white flex items-center space-x-1 uppercase border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Tương Tác Mini Game</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Intro Column */}
          <div className="md:col-span-1.5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-500 flex items-center justify-center font-bold">M</div>
              <span className="text-lg font-black bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">Maris Slide</span>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed">
              Maris Slide là đơn vị tiên phong trong đào tạo và giải pháp thiết kế giáo dục số chuyên nghiệp. Chúng tôi phát triển các sản phẩm bài dạy sinh động, tính tương tác cao, ứng dụng AI và đạt giải cao trong các kỳ thi từ cấp trường đến cấp quốc gia.
            </p>

            <div className="space-y-2 text-xs text-gray-400 font-medium">
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                <span>marioslide.animation@gmail.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <PhoneCall className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Hotline: 0396581283</span>
              </p>
            </div>
          </div>

          {/* Business Rules Terms Columns */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-200 uppercase tracking-widest border-b border-gray-800 pb-2">Quy Định Thanh Toán</h4>
            <ul className="space-y-2 text-xs text-gray-400 leading-relaxed">
              <li>• Chuyển khoản <strong>100% chi phí</strong> trước khi tiến hành thực hiện thiết kế hoặc tạo phim.</li>
              <li>• Thời hạn hoàn thiện tối đa <strong>1 tháng</strong> từ lúc đặt bài. Sau 1 tháng bài tự động đóng bảo mật lưu trữ và không hỗ trợ hoàn tiền chi phí đã gởi.</li>
            </ul>
          </div>

          {/* Deliverables Columns */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-200 uppercase tracking-widest border-b border-gray-800 pb-2">Đóng Gói & Bàn Giao</h4>
            <ul className="space-y-2 text-xs text-gray-400 leading-relaxed">
              <li>• Định dạng phân phối tiêu chuẩn: <strong className="text-gray-300">File PowerPoint gốc (.pptx)</strong>, <strong className="text-gray-300">Video giáo khoa Full-HD (.mp4)</strong>, hoặc đóng gói chuẩn <strong className="text-gray-300">HTML5/SCORM 2004</strong> đáp ứng mọi nền tảng LMS của Bộ và các trường.</li>
            </ul>
          </div>

          {/* Policy specifications column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-200 uppercase tracking-widest border-b border-gray-800 pb-2">Cam Kết 3 "CÓ" Vàng</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Mỗi bài giảng đều là độc nhất, bảo mật tuyệt tác và trang bị toàn diên chuyển chuyển động tương tác thu hút người học.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-[10px] text-gray-400 italic">
              "Nâng tầm bài giảng của quý thầy cô là sứ mệnh vinh quang của phụ tá kịch bản Maris Slide!"
            </div>
          </div>

        </div>

        {/* Absolute copyright container */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-[10px] text-gray-500 font-extrabold uppercase">
          <p>© 2026 Maris Slide INC. All Rights Reserved. Thiết kế bởi Chuyên viên và Kỹ sư AI.</p>
        </div>
      </div>
    </footer>
  );
}
