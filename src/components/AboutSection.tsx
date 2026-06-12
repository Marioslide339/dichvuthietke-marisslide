import { ShieldCheck, Zap, Sparkles, BookOpen, Clock, Heart, ArrowRight, Award, Cpu } from "lucide-react";
import heroImg from "../assets/images/hero_ai_3d_interactive.png";
import Portfolio from "./Portfolio";

interface AboutSectionProps {
  setActiveTab: (tab: string) => void;
  openBookingModal: () => void;
}

export default function AboutSection({ setActiveTab, openBookingModal }: AboutSectionProps) {
  const heroImgUrl = heroImg;

  const painPoints = [
    {
      title: "Thiếu thời gian soạn giảng",
      desc: "Thầy cô bận rộn với hồ sơ sổ sách, chấm bài, chủ nhiệm, không có thời gian thiết kế slide tỉ mỉ.",
      icon: Clock,
    },
    {
      title: "Học sinh lơ là, mất tập trung",
      desc: "Các bài giảng tĩnh thiếu hoạt hình tương tác làm buổi học tẻ nhạt, giảm chất lượng học tập.",
      icon: Zap,
    },
    {
      title: "Rào cản công nghệ số",
      desc: "Khó tự xuất bản bài giảng SCORM thi giáo viên giỏi quốc gia hay tích hợp vẽ hình ảnh AI, 2D/3D.",
      icon: BookOpen,
    },
  ];

  const commitments = [
    {
      title: "Thiết kế ĐỘC QUYỀN",
      desc: "Cam kết 100% độc quyền duy nhất theo cấu trúc bài dạy riêng. Không sao chép hay tái sử dụng các mẫu slide đại trà.",
      color: "from-rose-500 to-rose-600",
    },
    {
      title: "BẢO MẬT tuyệt đối",
      desc: "Toàn bộ tài liệu, giáo án, thông tin dự án, và tác quyền lớp học của thầy cô được cam kết bảo mật 100% vĩnh viễn.",
      color: "from-amber-500 to-yellow-500",
    },
    {
      title: "TƯƠNG TÁC đỉnh cao",
      desc: "Trang bị các kỹ thuật hoạt hình, minigame tương tác thu hút học sinh tích cực phát biểu, tăng khả năng nhớ bài.",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div id="about-section-container" className="space-y-20 py-8">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-rose-50/50 rounded-3xl p-8 md:p-12 border border-rose-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tiên Phong Công Nghệ Giáo Dục Số</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
              DỊCH VỤ THIẾT KẾ
              <span className="block mt-3 py-2 px-1 bg-gradient-to-r from-rose-600 to-amber-500 bg-clip-text text-transparent">
                HỌC LIỆU SỐ
              </span>
            </h1>

            {/* Three badges for Chuyên nghiệp + Công nghệ + Sinh động */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center space-x-2 bg-rose-50 text-rose-700 px-3.5 py-2 rounded-xl text-xs font-bold border border-rose-100/50">
                <Award className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Chuyên nghiệp</span>
              </div>
              <div className="flex items-center space-x-2 bg-amber-50 text-amber-700 px-3.5 py-2 rounded-xl text-xs font-bold border border-amber-100/50">
                <Cpu className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Công nghệ</span>
              </div>
              <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3.5 py-2 rounded-xl text-xs font-bold border border-emerald-100/50">
                <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Sinh động</span>
              </div>
            </div>
            
            <p className="text-gray-600 text-base leading-relaxed max-w-2xl">
              Chào mừng quý thầy cô đến với <strong>Maris Slide</strong>. Chúng tôi sẽ đồng hành cùng quý thầy cô biến những kịch bản sư phạm khô khan thành những bài giảng số sinh động, giàu tính tương tác và đạt giải cao trong các kỳ thi.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                id="hero-go-services"
                onClick={() => setActiveTab("services")}
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-all active:scale-[0.98] cursor-pointer flex items-center space-x-2 text-base"
              >
                <span>Xem Bảng Giá Chi Tiết</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Quick trust counter */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-rose-100 max-w-lg">
              <div>
                <p className="text-2xl font-black text-rose-600">3,000+</p>
                <p className="text-xs text-gray-500 font-semibold">Khách hàng</p>
              </div>
              <div>
                <p className="text-2xl font-black text-amber-500">100%</p>
                <p className="text-xs text-gray-500 font-semibold">Bảo mật độc quyền</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-500">1,000+</p>
                <p className="text-xs text-gray-500 font-semibold">Sản phẩm đạt giải cao</p>
              </div>
            </div>
          </div>

          {/* Banner Graphic Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-rose-200 to-amber-200 rounded-3xl p-2 shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
              <img
                src={heroImgUrl}
                alt="Mario Slide Brand Hero Presentation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-900">Thiết kế bài giảng mẫu</p>
                  <p className="text-[10px] text-gray-500">Tích hợp AI & Hiệu ứng Chuyển Động</p>
                </div>
                <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider animate-pulse">
                  Độc Quyền
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio interactive preview section */}
      <Portfolio />

      {/* Pain points solve */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-black text-gray-950">
            Khó khăn của thầy cô khi <br />
            <span className="text-rose-500">chuẩn bị bài giảng là gì?</span>
          </h2>
          <p className="text-gray-500">
            Giáo dục hiện đại yêu cầu sự sinh động và ứng dụng đổi mới, nhưng vướng phải các thử thách lớn:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div
                key={index}
                className="p-6 bg-white rounded-2xl border border-gray-150 hover:border-rose-100 hover:shadow-xl hover:shadow-rose-500/5 transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3 "CÓ" commitment banner */}
      <section className="bg-gradient-to-br from-gray-900 to-slate-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
        {/* Decorative ambient spots */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-block bg-white/10 text-rose-400 px-3 py-1 rounded-full text-xs font-semibold uppercase">
              Cam Kết 3 "CÓ" Vàng
            </div>
            <h2 className="text-3xl font-black tracking-tight leading-snug">
              Bảo Chứng Tác Quyền <br />& Sự Khác Biệt
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Maris Slide tự hào là sự lựa chọn tiên phong cam kết sâu sắc về quyền lợi kinh doanh cũng như trải nghiệm sư phạm tốt nhất của cô cậu học sinh.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {commitments.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 space-y-4"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center font-black text-sm`}>
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
