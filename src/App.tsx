import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import WorkflowSection from "./components/WorkflowSection";
import AIConsultant from "./components/AIConsultant";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";
import { BookingOrder, ServiceType } from "./types";
import { Sparkles, ClipboardList, ShieldAlert, CheckCircle, Clock, Trash2, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [orders, setOrders] = useState<BookingOrder[]>([]);

  // Selected preset inside wizard launcher
  const [wizardService, setWizardService] = useState<ServiceType>("powerpoint");
  const [wizardPkgId, setWizardPkgId] = useState("ppt_g2");
  const [wizardQty, setWizardQty] = useState(1);

  // FAQ accordion active indexes
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Load orders history from local storage
  const loadOrders = () => {
    const saved = localStorage.getItem("maris_slide_orders");
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch (err) {
        setOrders([]);
      }
    }
  };

  useEffect(() => {
    loadOrders();
    // Refresh list occasionally when index load hooks trigger
    const syncInterval = setInterval(loadOrders, 5000);
    return () => clearInterval(syncInterval);
  }, []);

  const openWizardWithPreset = (serviceType: ServiceType, packageId: string, customQty?: number) => {
    setWizardService(serviceType);
    setWizardPkgId(packageId);
    if (customQty) setWizardQty(customQty);
    setIsBookingOpen(true);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm("Thầy cô có muốn xóa phiếu lưu trữ đơn hàng này không?")) {
      const filtered = orders.filter(o => o.id !== orderId);
      localStorage.setItem("maris_slide_orders", JSON.stringify(filtered));
      setOrders(filtered);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="text-[10px] bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full font-bold">Chờ biên toán</span>;
      case "invoice_sent":
        return <span className="text-[10px] bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full font-bold">Chờ duyệt giao khoản 100%</span>;
      case "processing":
        return <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-bold">Đang thiết đồ họa AI</span>;
      case "completed":
        return <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">Đã hoàn thành bàn giao</span>;
      default:
        return <span className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full font-bold">Đang lưu kho</span>;
    }
  };

  const faqData = [
    {
      q: "Maris Slide có hỗ trợ chỉnh kịch bản sau khi đã bàn giao video hoạt hình không?",
      a: "Dạ thưa thầy cô, theo quy tắc nghiệp vụ vàng của Maris Slide, kịch bản phải được thống nhất chi tiết và chốt kỹ trước khi chúng tôi tiến hành xuất hình và dựng video kịch bản. Sau khi video đã hoàn thành biên tập kỹ thuật, chúng tôi KHÔNG hỗ trợ sửa đổi kịch bản thô nguyên tác. Vì vậy thầy cô vui lòng phối hợp thống nhất sớm kịch bản cùng chuyên viên nhé."
    },
    {
      q: "Thời hạn tối đa hỗ trợ hoàn chỉnh một bài giảng là bao lâu?",
      a: "Chúng tôi hỗ trợ hiệu đính tối đa trong vòng 1 tháng kể từ ngày thầy cô đặt bài. Sau 1 tháng, hệ thống sẽ tự động lưu kho bảo mật đóng bài giảng và không bồi hoàn chi phí dịch vụ. Thầy cô vui lòng phối hợp với chúng tôi đánh giá các bản demo sớm nhất có thể."
    },
    {
      q: "Cam kết 3 'CÓ' độc quyền là gì?",
      a: "Maris Slide cam kết sâu sắc: \n1. CÓ Thiết kế độc quyền và duy nhất (mỗi bài là thiết kế mới dựa trên kịch bản sư phạm định đổi mới của thầy cô).\n2. CÓ Bảo mật dữ liệu tuyệt đối (mọi thông tin dự án, kịch bản chữ thô đều được lưu nội bộ an toàn).\n3. CÓ Tương tác trò chơi minigame, kỹ nghệ hoạt hình sinh động giúp học sinh siêng phát biểu xây dựng bài học."
    },
    {
      q: "Phương thức thanh toán hóa đơn của Maris Slide ra sao?",
      a: "Quý thầy cô vui lòng thực hiện chuyển khoản 100% chi phí dự kiến trước khi Maris Slide kích hoạt dây chuyền thiết kế. Mọi phiếu đăng ký được cấp hóa đơn số đi kèm mã QR VietQR quét nhanh phục vụ nghiệp vụ minh bạch."
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div id="mario-slide-app-engine" className="min-h-screen bg-slate-50/50 text-gray-800 flex flex-col font-sans">
      
      {/* Upper Navigation block */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openBookingModal={() => setIsBookingOpen(true)}
      />

      {/* Main Container Layout */}
      <main id="main-content-layout" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {activeTab === "home" && (
          <div className="space-y-16 animate-fade-in">
            {/* Introductory brand representation */}
            <AboutSection
              setActiveTab={setActiveTab}
              openBookingModal={() => setIsBookingOpen(true)}
            />

            {/* Interactive Orders Hub Area for tracking placed invoices */}
            {orders.length > 0 && (
              <section id="orders-dashboard" className="bg-white border border-rose-100 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center space-x-2">
                      <ClipboardList className="w-5 h-5 text-rose-500" />
                      <span>Bài Giảng Đang Thiết Kế ({orders.length})</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Nơi thầy cô giám sát hóa đơn, kiểm thử tính năng kịch bản và tiến độ bàn bàn giao PowerPoint / SCORM.</p>
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-md uppercase tracking-widest">
                    Đã Đồng Bộ Lưu Trữ
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      id={`order-card-${ord.id}`}
                      className="bg-slate-50/60 border border-gray-150 rounded-2xl p-4 space-y-3 relative group hover:border-rose-200 transition-colors"
                    >
                      {/* Delete simulated record */}
                      <button
                        onClick={() => handleDeleteOrder(ord.id)}
                        className="absolute top-4 right-4 text-gray-300 hover:text-rose-500 transition-colors"
                        title="Xóa phiếu lưu"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-bold text-gray-400">MÃ BÀI: <span className="font-mono text-rose-500 font-extrabold">{ord.id}</span></p>
                          <h4 className="text-sm font-black text-gray-950 mt-1">
                            {ord.serviceType === "powerpoint" ? "Thiết Kế PowerPoint" : 
                             ord.serviceType === "animation" ? "Phim Hoạt Hình Giáo Dục" : 
                             ord.serviceType === "elearning" ? "Thiết Kế E-Learning SCORM" : 
                             ord.serviceType === "skkn" ? "Sáng kiến kinh nghiệm (SKKN)" : 
                             ord.serviceType === "app" ? "Thiết Kế Ứng Dụng (APP)" : "Biện pháp & Báo cáo GVG"}
                          </h4>
                          <p className="text-[10px] text-gray-400 font-semibold">{ord.createdAt}</p>
                        </div>
                        {getStatusBadge(ord.status)}
                      </div>

                      <div className="text-xs text-gray-600 bg-white p-3 rounded-xl border border-gray-100 space-y-1.5">
                        <p><strong className="text-gray-700">Người đặt:</strong> {ord.customerName} - {ord.customerPhone}</p>
                        {(ord.schoolName || ord.className || ord.classSize) && (
                          <p className="text-[10px] text-emerald-800 font-bold bg-emerald-50/70 px-2 py-1 rounded-lg">
                            🏫 Trường: {ord.schoolName} | Lớp: {ord.className} ({ord.classSize})
                          </p>
                        )}
                        {ord.requirements && (
                          <p className="truncate"><strong className="text-gray-700">Ghi chú kịch bản:</strong> {ord.requirements}</p>
                        )}
                        {ord.filename && (
                          <p className="text-[10px] text-emerald-600 font-bold">📎 Tài liệu thô: {ord.filename}</p>
                        )}
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-[10px] text-gray-400 italic font-semibold">* Sửa tối đa trong 1 tháng</span>
                        <div className="text-right">
                          <p className="text-[10px] text-gray-400">Giá trị hóa đơn:</p>
                          <p className="text-sm font-black text-gray-900">{ord.totalPrice.toLocaleString("vi-VN")}đ</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Interactive FAQs Accordions */}
            <section id="faq-accordions" className="space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h3 className="text-2xl font-black text-gray-950">Giải Đáp Trăn Trở Thường Gặp</h3>
                <p className="text-gray-500 text-xs">Các vấn đề nghiệp vụ liên quan đến kịch bản giáo khoa và tiến độ chỉnh sửa của thầy cô.</p>
              </div>

              <div className="max-w-3xl mx-auto divide-y divide-gray-200">
                {faqData.map((faq, fIdx) => (
                  <div key={fIdx} className="py-4">
                    <button
                      onClick={() => toggleFaq(fIdx)}
                      className="w-full flex justify-between items-center text-left py-2 font-bold text-sm text-gray-900 hover:text-rose-500 transition-colors"
                    >
                      <span className="flex items-center space-x-2">
                        <HelpCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{faq.q}</span>
                      </span>
                      {openFaq === fIdx ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>
                    {openFaq === fIdx && (
                      <div className="mt-2 pl-6 pr-4 text-xs text-gray-600 leading-relaxed bg-rose-50/20 p-4 rounded-xl border border-rose-500/5 whitespace-pre-line">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "services" && (
          <div className="animate-fade-in">
            {/* Pricing columns + price multiplier calculators */}
            <ServicesSection
              onSelectPackage={(type, pkgId, qty) => openWizardWithPreset(type, pkgId, qty)}
            />
          </div>
        )}

        {activeTab === "workflow" && (
          <div className="animate-fade-in">
            {/* Workflow steps layout */}
            <WorkflowSection />
          </div>
        )}

        {activeTab === "advisor" && (
          <div className="animate-fade-in">
            {/* Live custom consulting AI agent matching System Instructions */}
            <AIConsultant />
          </div>
        )}

      </main>

      {/* Booking Form popup modal */}
      <BookingForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialServiceType={wizardService}
        initialPackageId={wizardPkgId}
        initialQuantity={wizardQty}
        onBookingSuccess={() => {
          loadOrders();
          setActiveTab("home");
        }}
      />

      {/* Brand information policies and contacts footers */}
      <Footer />
    </div>
  );
}
