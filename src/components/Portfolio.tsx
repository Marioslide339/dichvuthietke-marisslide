import React, { useState } from "react";
import { Sparkles, ArrowUpRight, Search, Play, FileText, CheckCircle } from "lucide-react";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "ppt" | "animation" | "elearning">("all");

  const portfolioItems = [
    {
      title: "Bài giảng tương tác E-Learning",
      category: "elearning",
      desc: "Quiz trắc nghiệm kéo thả đồng bộ lời giảng giáo viên. Định dạng đóng SCORM 2004 hỗ trợ chạy mượt trên mọi hệ thống LMS.",
      imgUrl: "/src/assets/images/demo_elearning_interactive.png",
      tag: "Chuẩn E-Learning SCORM",
      color: "border-emerald-100",
      link: "https://khoahoc4-sudadangcuanam.netlify.app/",
    },
    {
      title: "Bài giảng PowerPoint",
      category: "ppt",
      desc: "Lên kịch bản hoạt ảnh theo phương pháp Trạm chuẩn nâng cao. Tích hợp minigame câu cá và tính điểm thông minh.",
      imgUrl: "/src/assets/images/mario_slide_hero_1780385062012.png", // reusing brand graphic for slide samples
      tag: "PowerPoint Nâng Cao (Chuẩn Trạm)",
      color: "border-blue-100",
      link: "https://youtu.be/8waAhW77MKo?si=DnrzFTg6wM1OhMSn",
    },
    {
      title: "Video hoạt hình 3D dựng trên AI",
      category: "animation",
      desc: "Công nghệ AI dựng hình con vật 3D sống động chân thật, kích thích tư duy quan sát khám phá tự nhiên lớp 2.",
      imgUrl: "/src/assets/images/demo_animal_3d_1780385098693.png",
      tag: "Dựng Phim Hoạt Hình 3D AI",
      color: "border-rose-100",
      link: "https://youtu.be/i9s6Bl0IPJA?si=-jSiDSoHXW3sl4Nl",
    },
    {
      title: "Phim hoạt hình 2D dựng trên Animiz",
      category: "animation",
      desc: "Trang bị hoạt cảnh nhà bếp ngộ nghĩnh, bổ sung trò chơi nấu ăn tương tác rèn luyện trí não bé mầm non.",
      imgUrl: "/src/assets/images/demo_kitchen_2d_1780385079211.png",
      tag: "Dựng Phim Hoạt Hình 2D",
      color: "border-amber-100",
      link: "https://www.youtube.com/watch?v=NGQsQ0Ks-1I",
    },
  ];

  const filteredItems = selectedCategory === "all"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div id="portfolio-container-block" className="space-y-10 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
            <i data-lucide="sparkles" className="w-3 h-3" />
            <span>Thư viện Demo Thực tế</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Dự án Đã Thực Hiện Thành Công</h2>
          <p class="text-gray-500 text-xs mt-1">Các tác phẩm thiết kế độc quyền nâng tầm hiệu suất sư phạm được chọn lọc từ hơn 3,000 buổi học toàn quốc.</p>
        </div>

        {/* Categories toggler */}
        <div className="flex flex-wrap gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-150 shrink-0">
          {[
            { id: "all", label: "Tất cả" },
            { id: "ppt", label: "PowerPoint" },
            { id: "animation", label: "Phim Hoạt Hình" },
            { id: "elearning", label: "E-Learning" },
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid gallery layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredItems.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-white rounded-3xl border ${item.color} overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group block`}
          >
            {/* Visual thumb container */}
            <div className="relative min-h-60 aspect-video overflow-hidden bg-slate-100">
              <img
                src={item.imgUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent opacity-60"></div>
              
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-extrabold px-3 py-1 rounded-full border border-white/20 shadow-xs uppercase">
                {item.tag}
              </span>
            </div>

            {/* Description card */}
            <div className="p-6 space-y-3">
              <h3 className="text-base font-bold text-gray-950 leading-snug group-hover:text-rose-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                {item.desc}
              </p>

              <div className="pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400 font-bold">
                <span className="flex items-center space-x-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <i data-lucide="check-circle" className="w-3 h-3 mr-0.5" />
                  <span>Cam kết Độc Quyền</span>
                </span>
                <span className="text-gray-500 group-hover:text-rose-500 cursor-pointer flex items-center space-x-0.5 transition-colors">
                  <span>Xem chi tiết</span>
                  <i data-lucide="arrow-up-right" className="w-3 h-3" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
