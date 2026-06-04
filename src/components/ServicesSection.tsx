import React, { useState } from "react";
import { Check, ArrowRight, DollarSign, HelpCircle, Layers, Sliders, Calendar, Sparkles } from "lucide-react";
import { ServiceType } from "../types";

interface ServicesSectionProps {
  onSelectPackage: (serviceType: ServiceType, packageId: string, customQty?: number) => void;
}

export default function ServicesSection({ onSelectPackage }: ServicesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | ServiceType>("all");

  // Calculator states
  const [calcService, setCalcService] = useState<ServiceType>("powerpoint");
  const [calcSubOption, setCalcSubOption] = useState<string>("ppt_g2"); // ppt_g1, ppt_g2, anime_2d, anime_3d, el_g1, el_g2, el_g3
  const [calcQty, setCalcQty] = useState<number>(3); // slide slides, mins, or scenes

  const serviceCategories = [
    { id: "all", label: "Tất cả dịch vụ" },
    { id: "powerpoint", label: "Thiết kế PowerPoint" },
    { id: "animation", label: "Phim Hoạt Hình" },
    { id: "elearning", label: "Thiết kế E-Learning" },
    { id: "skkn", label: "Sáng kiến kinh nghiệm" },
    { id: "gvg", label: "Biện pháp & Báo cáo GVG" },
    { id: "app", label: "Thiết kế APP" }
  ];

  const packages = [
    {
      id: "ppt_g1",
      category: "powerpoint",
      name: "PowerPoint Cơ Bản (Gói 1)",
      price: 800000,
      unit: "Bài thiết kế",
      description: "Chỉnh sửa bài dạy dựa trên ý tưởng sẵn có của giáo viên, chuẩn hóa mỹ thuật và tối ưu trò chơi học tập sinh động.",
      features: [
        "Giáo viên gửi bản PowerPoint nội dung",
        "Tối đa 30 slide/ bản PowerPoint",
        "Chỉnh sửa slide mỹ thuật chuyên nghiệp",
        "Tích hợp các minigame trò chơi vui nhộn",
        "Đèn tranh, hiệu ứng hoạt cảnh, video có sẵn",
        "Giấy biên nhận / thanh toán hóa đơn",
        "Bàn giao trọn gói File PowerPoint (.pptx)"
      ],
      revisions: "Sửa tối đa 3 lần (mỗi lần sửa đổi dưới 10% quy mô bài giảng)",
      targetUser: "Thầy cô giáo đã có sẵn khung giáo án, cần tối ưu hình thức và vẽ hoạt cảnh.",
      bgColor: "bg-white border-gray-250",
    },
    {
      id: "ppt_g2",
      category: "powerpoint",
      name: "PowerPoint Trọn Gói AI & 3D (Gói 2)",
      price: 1500000,
      unit: "Bài thiết kế",
      description: "Maris Slide chịu trách nhiệm lên ý tưởng sư phạm đổi mới toàn diện đạt chuẩn nâng cao từ giáo án thô.",
      features: [
        "Tối đa 30 slide/ bản PowerPoint",
        "Maris Slide lên ý tưởng hoạt cảnh toàn diện",
        "Đạt chuẩn nâng cao (phương pháp Trạm, STEAM, dạy học dự án)",
        "Tích hợp hình vẽ AI độc quyền (Tối đa 10 hình phong phú)",
        "Tích hợp video phim 2D (2p) hoặc 3D (5 cảnh)",
        "Sửa tối đa 5 lần (dưới 20% quy mô bài giảng)",
        "Bàn giao trọn gói File PowerPoint (.pptx)"
      ],
      revisions: "Sửa tối đa 5 lần (mỗi lần sửa đổi dưới 20% quy mô bài giảng)",
      targetUser: "Giáo viên thi đua giáo viên dạy giỏi, trường mẫu, ban giám khảo đánh giá cao sáng tạo công nghệ.",
      bgColor: "bg-rose-50/50 border-rose-200 ring-2 ring-rose-400/20",
      pill: "Khuyên dùng tốt nhất",
    },
    {
      id: "anime_2d",
      category: "animation",
      name: "Phim hoạt hình tình huống 2D ( Animiz)",
      price: 300000,
      unit: "phút phim",
      description: "Tạo phim hoạt cảnh giáo khoa hoạt hình biểu đạt bài học trực quan sinh động trên nền tảng Animiz.",
      features: [
        "Chuyển đổi giáo án thành kịch bản phim hấp dẫn",
        "Nhân vật, bối cảnh lớp học phong phú",
        "Chuẩn giọng thuyết minh / đồng bộ lời thoại giáo viên",
        "Tự động xuất bản định dạng Video Full HD (.mp4)",
        "Chuẩn hóa kịch bản phù hợp phần mềm",
      ],
      revisions: "Chốt kịch bản kỹ trước khi dựng. Không nhận sửa kịch bản sau khi đã hoàn thiện video.",
      targetUser: "Thầy cô cần tư liệu hoạt cảnh mở đầu bài dạy, giải quyết bài toán tư duy cho học sinh mầm non & tiểu học.",
      bgColor: "bg-white border-gray-250",
    },
    {
      id: "anime_3d",
      category: "animation",
      name: "Phim Hoạt Hình 3D (Trí Tuệ Nhân Tạo AI)",
      price: 1500000, // baseline package is 150k per scene
      unit: "bộ 10 cảnh",
      description: "Công nghệ AI tiên tiến dựng bối cảnh động vật 3D, sự vật trực quan chân thực và hấp dẫn nhất.",
      features: [
        "Áp dụng trí tuệ nhân tạo 3D tạo hình nhân vật độc lạ",
        "Hoạt cảnh cute (hình ảnh nhà bếp, con vật 3D sống động)",
        "150.000đ / cảnh phim - Đăng ký gói 10 cảnh hoàn thiện chuyên nghiệp",
        "Xuất bản file Video MP4 chất lượng điện ảnh cao",
      ],
      revisions: "Chốt kịch bản kỹ trước khi làm. Không sửa kịch bản khi video đã đóng gói.",
      targetUser: "Đơn vị giáo dục số, giáo viên thiết kế bài thi quốc tế, trường mầm non quốc tế.",
      bgColor: "bg-white border-gray-250",
    },
    {
      id: "el_g1",
      category: "elearning",
      name: "E-Learning Cơ Bản (Gói 1)",
      price: 1500000,
      unit: "Bài giảng",
      description: "Tạo bản E-learning chuẩn quốc tế, phù hợp kiểm tra và nộp kho bài giảng, tương thích hoàn toàn các hệ thống LMS trường học.",
      features: [
        "Đồng bộ hóa lời giảng thuyết minh với nội dung trình văn",
        "Tích hợp Quizz trắc nghiệm tương tác kiểm tra học sinh",
        "Bàn giao trọn gói File nguồn PPT, định dạng HTML5 / SCORM",
        "Xem trước giao điện dễ dàng",
        "Chưa có ứng dụng AI vào bài giảng",
      ],
      revisions: "Hỗ trợ chỉnh sửa biên tập lỗi nhỏ chính tả miễn phí\n* Lưu ý chung: Giáo viên phải tự ghi âm, ghi hình để Maris Slide đồng bộ lời giảng khớp với hiệu ứng.",
      targetUser: "Thầy cô cần nộp học liệu số định kỳ, có tích hợp Quiz cơ bản tương tác tốt.",
      bgColor: "bg-white border-gray-250",
    },
    {
      id: "el_g2",
      category: "elearning",
      name: "E-Learning Phổ thông (Gói 2)",
      price: 2000000,
      unit: "Bài giảng",
      description: "E-learning thế hệ mới bổ sung tương tác động, sửa lỗi toàn diên và thích ứng tối đa với trải nghiệm của học sinh.",
      features: [
        "Bao gồm toàn bộ quyền lợi Gói 1",
        "Hỗ trợ chỉnh sửa nội dung chuyên sâu tới 5 lần",
        "Thiết kế trò chơi phân vai trong E-learning",
        "Đóng gói chuẩn Scorm 2004 / HTML5 tiện dụng đăng tải",
        "Chưa có ứng dụng AI vào bài giảng",
      ],
      revisions: "Hỗ trợ sửa đổi và hiệu chỉnh nội dung 5 lần\n* Lưu ý chung: Giáo viên phải tự ghi âm, ghi hình để Maris Slide đồng bộ lời giảng khớp với hiệu ứng.",
      targetUser: "Thầy cô nộp bài dự thi cấp Quận/Tỉnh, yêu cầu chỉnh sửa tỉ mỉ từ hội đồng giám khảo.",
      bgColor: "bg-white border-gray-250",
    },
    {
      id: "el_g3",
      category: "elearning",
      name: "E-Learning Cao Cấp (Gói 3)",
      price: 4000000,
      unit: "Bài giảng",
      description: "Gói chất lượng tốt nhất của dòng E-learning. Lên ý tưởng sư phạm, minigame và trợ lý AI chatbot hỗ trợ học viên.",
      features: [
        "Lên ý tưởng, kịch bản bài dạy từ A-Z",
        "Kết hợp Mini game, APP AI tương tác đỉnh cao",
        "Kết hợp APP chat bot hỗ trợ học viên",
        "Video hoạt hình tình huống (Tổng thời lượng 2 phút)",
        "Hình ảnh minh hoạ, phong cách thiết kế độc đáo",
        "Hỗ trợ sửa đổi cao cấp tới 10 lần",
      ],
      revisions: "Hỗ trợ sửa đổi toàn diện 10 lần bất kể thay đổi bố cục\n* Lưu ý chung: Giáo viên phải tự ghi âm, ghi hình để Maris Slide đồng bộ lời giảng khớp với hiệu ứng.",
      targetUser: "E-learning thi cấp Quốc Gia, Trường học quốc tế xây dựng học liệu dùng chung lâu dài.",
      bgColor: "bg-purple-50/50 border-purple-200 ring-2 ring-purple-400/10",
      pill: "Giải pháp Đỉnh Cao Quốc Gia",
    },
    {
      id: "skkn_word",
      category: "skkn",
      name: "Sáng kiến Kinh nghiệm (File Word)",
      price: 2000000,
      unit: "bản hoàn thiện",
      description: "Maris Slide trực tiếp viết chi tiết trên Word theo đúng cấu trúc khung đề đạt khoa học sư phạm đổi mới.",
      features: [
        "Cam kết độ trùng lặp <20%",
        "Hỗ trợ chèn sản phẩm có trong sáng kiến (nếu có)",
        "Biên soạn nội dung Word chuẩn mực bám sát khung yêu cầu",
        "Tự nghiên cứu lên đề cương/khung nội dung nếu thầy cô chưa có (Duyệt khung trước mới bắt đầu viết)",
        "Các số liệu định lượng fake logic dựa trên sĩ số thực tế lớp",
        "Thời hạn hoàn thành: 20-30 ngày (5-7 ngày nghiên cứu tài liệu, còn lại bắt tay viết nội dung)",
        "Giáo viên tự chủ động chèn thêm hình ảnh minh chứng thực tế",
        "Cam kết độc quyền, bảo mật tác quyền tuyệt đối 100%"
      ],
      revisions: "Hỗ trợ sửa tối đa 3 lần bản thảo. Lưu ý không hỗ trợ sửa lại bố cục khung bài do đã thống nhất chốt trước đó.",
      targetUser: "Thầy cô giáo cần nộp đề tài Sáng kiến kinh nghiệm nâng cao chất lượng dạy học mà bận rộn.",
      bgColor: "bg-emerald-50/50 border-emerald-250 ring-2 ring-emerald-400/10",
      pill: "Dịch vụ Mới Đặc Biệt",
    },
    {
      id: "gvg_word",
      category: "gvg",
      name: "Biện pháp Giáo viên giỏi (File Word)",
      price: 1000000,
      unit: "bản word",
      description: "Biên soạn Word biện pháp giáo viên dạy giỏi đổi mới, sườn khoa học sư phạm vững chắc đạt cấp Quận/Tỉnh.",
      features: [
        "Biên soạn chi tiết nội dung Word, theo đúng khung yêu cầu",
        "Tự lên khung nội dung/sườn bài nếu thầy cô chưa có (Duyệt sườn xong mới bắt đầu viết)",
        "Các số liệu định lượng fake logic chuẩn xác dựa trên sĩ số thực tế lớp",
        "Thời gian bàn giao nhanh gọn: chỉ từ 7-10 ngày",
        "Giáo viên tự chủ động chèn thêm hình ảnh, sản phẩm minh chứng phù hợp",
        "Cam kết sở hữu độc quyền & bảo mật tuyệt đối 100%"
      ],
      revisions: "Hỗ trợ sửa đổi tối đa 3 lần bản thảo (Không sửa lại khung bài do đã thống nhất chốt trước khi viết)",
      targetUser: "Thầy cô giáo dự thi Giáo viên dạy giỏi, giáo viên chủ nhiệm tâm huyết cần nộp đề án biện pháp chất lượng.",
      bgColor: "bg-emerald-50/50 border-emerald-250 ring-2 ring-emerald-400/10",
      pill: "Giải Pháp Sư Phạm Mới",
    },
    {
      id: "gvg_ppt",
      category: "gvg",
      name: "PowerPoint Báo Cáo GVG (Infographics)",
      price: 1000000,
      unit: "Bài thiết kế",
      description: "Thiết kế slide PowerPoint báo cáo rực rỡ, trực quan và chuyên nghiệp tối đa 20 slide dựa trên bài báo cáo biện Pháp.",
      features: [
        "Biến bài thô thành slide PowerPoint (Tối đa 20 slide chuyên biệt)",
        "Thiết kế theo dạng Infographics mỹ thuật ấn tượng, chuyên nghiệp",
        "Hỗ trợ vẽ sơ đồ, biểu đồ trực quan hóa số liệu dễ hiểu nhất",
        "Hiệu ứng chuyển cảnh tinh tế, hiện đại, tăng tính thuyết phục diện rộng",
        "Bàn giao trọn gói File PowerPoint gốc (.pptx) có thể tùy ý thay đổi"
      ],
      revisions: "Hỗ trợ chỉnh sửa nhanh chóng tối đa 3 lần miễn phí",
      targetUser: "Giáo viên báo cáo trực tiếp trước hội đồng chấm thi Giáo viên dạy giỏi, cần slide thuyết phục tuyệt đối.",
      bgColor: "bg-amber-50/50 border-amber-250 ring-2 ring-amber-400/10",
      pill: "Infographics Trực Quan",
    },
    {
      id: "app_g1",
      category: "app",
      name: "APP CƠ BẢN (GÓI 1)",
      price: 1000000,
      unit: "Ứng dụng",
      description: "Giải pháp thiết kế ứng dụng đơn giản, tối ưu chi phí. Phù hợp cho giáo viên, cá nhân và tổ chức.",
      features: [
        "Thiết kế giao diện APP theo yêu cầu",
        "Game tương tác học tập đơn giản",
        "Phần mềm quản lý cơ bản",
        "Ứng dụng cá nhân hóa theo nhu cầu",
        "Phần mềm mô phỏng, thực hành trực quan",
        "Hoạt động độc lập, không cần máy chủ",
        "Hỗ trợ sửa đổi cao cấp tối đa 05 lần"
      ],
      revisions: "Hỗ trợ sửa đổi tối đa 05 lần kể từ khi bàn giao sản phẩm.\nLưu ý: Các yêu cầu phát sinh thêm tính năng ngoài phạm vi ban đầu sẽ được báo giá riêng.",
      targetUser: "Giáo viên, học sinh, cá nhân, trung tâm đào tạo hoặc doanh nghiệp nhỏ cần ứng dụng đơn giản phục vụ công việc và học tập.",
      bgColor: "bg-white border-gray-250",
    },
    {
      id: "app_g2",
      category: "app",
      name: "APP NÂNG CAO (GÓI 2)",
      price: 2000000,
      unit: "Ứng dụng",
      description: "Giải pháp ứng dụng chuyên nghiệp với khả năng kết nối dữ liệu, tự động hóa quy trình và quản lý trực tuyến hiệu quả.",
      features: [
        "Thiết kế APP chuyên nghiệp theo yêu cầu",
        "Tích hợp API kết nối hệ thống bên ngoài",
        "Tích hợp Database lưu trữ dữ liệu trực tuyến",
        "APP quản lý lớp học, học sinh",
        "APP hỗ trợ viết sáng kiến kinh nghiệm",
        "APP đánh giá thi đua, xếp loại",
        "APP soạn giáo án, quản lý học liệu",
        "Quản lý tài khoản và phân quyền người dùng",
        "Hỗ trợ sửa đổi cao cấp tối đa 10 lần"
      ],
      revisions: "Hỗ trợ sửa đổi tối đa 10 lần kể từ khi bàn giao sản phẩm.\nLưu ý: Giáo viên cần cung cấp đầy đủ nội dung, quy trình nghiệp vụ và dữ liệu cần quản lý để đảm bảo APP hoạt động hiệu quả.",
      targetUser: "Trường học, tổ chuyên môn, giáo viên, đơn vị giáo dục và doanh nghiệp cần hệ thống quản lý dữ liệu, tự động hóa công việc và khai thác AI trong vận hành.",
      bgColor: "bg-blue-50/50 border-blue-200 ring-2 ring-blue-400/10",
      pill: "Chuyên Nghiệp & Tự Động Hóa",
    },
  ];

  const filteredPackages = activeFilter === "all" 
    ? packages 
    : packages.filter(p => p.category === activeFilter);

  // Dynamic cost calculation based on user variables
  const calculateTotalCost = () => {
    if (calcService === "powerpoint") {
      if (calcSubOption === "ppt_g1") return 800000;
      return 1500000;
    } else if (calcService === "animation") {
      if (calcSubOption === "anime_2d") {
        return calcQty * 300000; // 300k/minute
      } else {
        return calcQty * 150000; // 150k/scene
      }
    } else if (calcService === "elearning") {
      if (calcSubOption === "el_g1") return 1500000;
      if (calcSubOption === "el_g2") return 2000000;
      return 4000000;
    } else if (calcService === "skkn") {
      return 2000000; // SKKN
    } else if (calcService === "app") {
      if (calcSubOption === "app_g1") return 1000000;
      return 2000000;
    } else {
      // calcService === "gvg"
      return 1000000; // Both gvg_word and gvg_ppt are 1.000.000đ
    }
  };

  const handleCalculatorSubmit = () => {
    const isAnim = calcService === "animation";
    onSelectPackage(calcService, calcSubOption, isAnim ? calcQty : undefined);
  };

  return (
    <div id="services-section-wrapper" className="space-y-16 py-4">
      {/* Services presentation */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl font-black text-gray-950">
          Danh mục dịch vụ thiết kế của <span className="text-rose-500">Maris Slide</span>
        </h2>
        <p className="text-gray-500 text-sm">
          Thiết kế chuẩn mực sư phạm đổi mới, kết hợp thẩm mỹ tinh tế và công nghệ AI/3D độc quyền. Hoàn tiền nếu không bàn giao đúng cam kết đã đề ra.
        </p>

        {/* Filters bar */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {serviceCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeFilter === cat.id 
                  ? "bg-rose-500 text-white shadow-md shadow-rose-200" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of package cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-2xl border p-6 flex flex-col justify-between transition-all hover:shadow-xl relative ${pkg.bgColor}`}
          >
            {pkg.pill && (
              <span className="absolute -top-3 left-6 px-3 py-1 bg-rose-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider animate-pulse">
                {pkg.pill}
              </span>
            )}

            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">{pkg.category}</span>
                <h3 className="text-lg font-black text-gray-900 mt-1">{pkg.name}</h3>
                <p className="text-gray-500 text-xs mt-2 leading-relaxed h-12 overflow-hidden">{pkg.description}</p>
              </div>

              {/* Price block */}
              <div className="border-t border-b border-gray-100 py-4">
                <p className="text-sm font-semibold text-gray-400">Trọn gói từ: </p>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-3xl font-black text-gray-950">
                    {pkg.price.toLocaleString("vi-VN")}đ
                  </span>
                  <span className="text-gray-500 text-xs">/ {pkg.unit}</span>
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-2.5">
                {pkg.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start space-x-2 text-xs text-gray-600">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Revision Limit & Order button */}
            <div className="mt-8 pt-4 border-t border-gray-100 space-y-4">
              <div className="text-[10px] text-gray-500">
                <p className="font-bold text-gray-700">Quy định sửa bài:</p>
                <p className="italic whitespace-pre-line">{pkg.revisions}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 text-[10px] text-gray-600">
                <p className="font-bold">Đối tượng lý tưởng:</p>
                <p>{pkg.targetUser}</p>
              </div>

              <button
                id={`pkg-select-btn-${pkg.id}`}
                onClick={() => onSelectPackage(pkg.category as ServiceType, pkg.id)}
                className="w-full bg-gray-950 hover:bg-rose-600 text-white py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center space-x-1 cursor-pointer"
              >
                <span>Chọn Gói Dịch Vụ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic calculator widget */}
      <div id="interactive-price-calculator" className="bg-gradient-to-br from-rose-500/5 via-amber-500/5 to-transparent rounded-3xl p-6 md:p-8 border border-rose-100 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-gray-950">Công Cụ Ước Tính Chi Phí Nhanh</h3>
            <p className="text-xs text-gray-500">Thầy cô tự tùy chọn để xem trước bảng giá minh bạch cho từng loại dịch vụ.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Inputs layout */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">1. Chọn loại hình dịch vụ:</label>
              <select
                id="calc-service-type"
                value={calcService}
                onChange={(e) => {
                  const val = e.target.value as ServiceType;
                  setCalcService(val);
                  // Auto-switch default options
                  if (val === "powerpoint") setCalcSubOption("ppt_g2");
                  else if (val === "animation") { setCalcSubOption("anime_2d"); setCalcQty(3); }
                  else if (val === "elearning") setCalcSubOption("el_g2");
                  else if (val === "skkn") setCalcSubOption("skkn_word");
                  else if (val === "app") setCalcSubOption("app_g1");
                  else setCalcSubOption("gvg_word");
                }}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-rose-400"
              >
                <option value="powerpoint">Thiết kế PowerPoint</option>
                <option value="animation">Phim Hoạt Hình Giáo Dục</option>
                <option value="elearning">Thiết kế E-Learning SCORM</option>
                <option value="skkn">Sáng kiến kinh nghiệm (SKKN)</option>
                <option value="gvg">Biện pháp & Báo cáo GVG</option>
                <option value="app">Thiết kế Ứng dụng theo yêu cầu</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">2. Chọn phân khúc gói cụ thể:</label>
              <select
                id="calc-package-select"
                value={calcSubOption}
                onChange={(e) => setCalcSubOption(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-rose-400"
              >
                {calcService === "powerpoint" && (
                  <>
                    <option value="ppt_g1">PowerPoint Hoàn Thiện (800.000đ)</option>
                    <option value="ppt_g2">PowerPoint Trọn gói AI & 3D (1.500.000đ)</option>
                  </>
                )}
                {calcService === "animation" && (
                  <>
                    <option value="anime_2d">Phim Hoạt hình 2D Animiz (300.000đ/phút)</option>
                    <option value="anime_3d">Phim Hoạt hình 3D AI (150.000đ/cảnh)</option>
                  </>
                )}
                {calcService === "elearning" && (
                  <>
                    <option value="el_g1">E-Learning Gói 1 (1.500.000đ)</option>
                    <option value="el_g2">E-Learning Gói 2 (2.000.000đ)</option>
                    <option value="el_g3">E-Learning Gói 3 (4.000.000đ)</option>
                  </>
                )}
                {calcService === "skkn" && (
                  <>
                    <option value="skkn_word">Bản Word Sáng kiến kinh nghiệm (2.000.000đ)</option>
                  </>
                )}
                {calcService === "app" && (
                  <>
                    <option value="app_g1">APP CƠ BẢN - Gói 1 (1.000.000đ)</option>
                    <option value="app_g2">APP NÂNG CAO - Gói 2 (2.000.000đ)</option>
                  </>
                )}
                {calcService === "gvg" && (
                  <>
                    <option value="gvg_word">Biện pháp Giáo viên giỏi - Bản Word (1.000.000đ)</option>
                    <option value="gvg_ppt">PowerPoint Báo Cáo Biện Pháp GVG (1.000.000đ)</option>
                  </>
                )}
              </select>
            </div>

            {/* Dynamic volume controller (shows up for animation only) */}
            {calcService === "animation" && (
              <div className="sm:col-span-2 space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-700 font-bold">
                  <span>3. Nhập số lượng {calcSubOption === "anime_2d" ? "Phút Phim" : "Cảnh Phim 3D"}:</span>
                  <span className="text-rose-500 font-mono text-sm">{calcQty} {calcSubOption === "anime_2d" ? "phút" : "cảnh"}</span>
                </div>
                <input
                  type="range"
                  id="calc-volume-slider"
                  min="1"
                  max="30"
                  step="1"
                  value={calcQty}
                  onChange={(e) => setCalcQty(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                  <span>1 {calcSubOption === "anime_2d" ? "phút" : "cảnh"}</span>
                  <span>15 {calcSubOption === "anime_2d" ? "phút" : "cảnh"}</span>
                  <span>30 {calcSubOption === "anime_2d" ? "phút" : "cảnh"}</span>
                </div>
              </div>
            )}
          </div>

          {/* Pricing display and direct converter */}
          <div className="md:col-span-4 bg-white/80 p-5 rounded-2xl border border-rose-100 flex flex-col items-center justify-center text-center space-y-4">
            <p className="text-xs font-bold text-gray-400 tracking-wider">TỔNG PHÍ ƯỚC CHỪNG</p>
            <p className="text-3xl font-black text-rose-600 bg-rose-50 px-4 py-2 rounded-xl">
              {calculateTotalCost().toLocaleString("vi-VN")}đ
            </p>
            <div className="text-[10px] text-gray-500 leading-snug">
              <p>Chuyển khoản thanh toán 100% trước khi làm.</p>
              <p>Cam kết 3 Có: Độc Quyền - Tương Tác - Bảo Mật.</p>
            </div>
            <button
              id="calc-order-trigger"
              onClick={handleCalculatorSubmit}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-rose-200 transition-all cursor-pointer"
            >
              Đặt Thiết Kế Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
