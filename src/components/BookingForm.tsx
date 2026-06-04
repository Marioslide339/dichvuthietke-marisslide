import React, { useState, useEffect } from "react";
import { FolderUp, HelpCircle, Check, CreditCard, Sparkles, Clipboard, ShieldAlert, CheckCircle2, Trash, QrCode, MessageCircle } from "lucide-react";
import { ServiceType, BookingOrder } from "../types";

interface BookingFormProps {
  initialServiceType: ServiceType;
  initialPackageId: string;
  initialQuantity?: number;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: () => void;
}

export default function BookingForm({
  initialServiceType,
  initialPackageId,
  initialQuantity = 1,
  isOpen,
  onClose,
  onBookingSuccess,
}: BookingFormProps) {
  // Wizard states: 'form' | 'payment' | 'completed'
  const [wizardStep, setWizardStep] = useState<'form' | 'payment' | 'completed'>('form');

  // Fields state
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [serviceType, setServiceType] = useState<ServiceType>(initialServiceType);
  const [packageId, setPackageId] = useState(initialPackageId);
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [requirements, setRequirements] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");

  // Specific to SKKN
  const [classSize, setClassSize] = useState("");
  const [className, setClassName] = useState("");
  const [schoolName, setSchoolName] = useState("");

  // File drag & drop simulator states
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFileSize, setUploadedFileSize] = useState("");

  // Target Order created
  const [activeOrder, setActiveOrder] = useState<BookingOrder | null>(null);

  // List of packages prices mapping
  const packagesInfo: Record<string, { name: string; price: number; unit: string }> = {
    // PPT
    ppt_g1: { name: "PowerPoint Cơ Bản (800.000đ)", price: 800000, unit: "bài" },
    ppt_g2: { name: "PowerPoint Trọn gói AI & 3D (1.500.000đ)", price: 1500000, unit: "bài" },
    // Animation
    anime_2d: { name: "Phim hoạt hình tình huống 2D ( Animiz) (300.000đ/phút)", price: 300000, unit: "phút" },
    anime_3d: { name: "Hoạt hình 3D AI (150.000đ/cảnh)", price: 150000, unit: "cảnh" },
    // E-Learning
    el_g1: { name: "E-Learning SCORM Cơ bản (1.500.000đ)", price: 1500000, unit: "bài" },
    el_g2: { name: "E-Learning SCORM Phổ thông (2.000.000đ)", price: 2000000, unit: "bài" },
    el_g3: { name: "E-Learning SCORM Cao cấp (3.000.000đ)", price: 3000000, unit: "bài" },
    // SKKN
    skkn_word: { name: "Sáng kiến Kinh nghiệm Word (2.000.000đ)", price: 2000000, unit: "bản" },
    // GVG
    gvg_word: { name: "Biện pháp Giáo viên giỏi - Bản Word (1.000.000đ)", price: 1000000, unit: "bản" },
    gvg_ppt: { name: "PowerPoint Báo Cáo Biện Pháp GVG (1.000.000đ)", price: 1000000, unit: "bài" },
    // App
    app_g1: { name: "APP CƠ BẢN (Gói 1) (1.000.000đ)", price: 1000000, unit: "Ứng dụng" },
    app_g2: { name: "APP NÂNG CAO (Gói 2) (2.000.000đ)", price: 2000000, unit: "Ứng dụng" },
  };

  // Sync props when modal triggers
  useEffect(() => {
    if (isOpen) {
      setServiceType(initialServiceType);
      setPackageId(initialPackageId);
      setQuantity(initialQuantity);
      setWizardStep('form');
      setUploadedFileName("");
      setClassSize("");
      setClassName("");
      setSchoolName("");
    }
  }, [isOpen, initialServiceType, initialPackageId, initialQuantity]);

  // Adjust package dropdown options when main category shifts
  const handleCategoryChange = (cat: ServiceType) => {
    setServiceType(cat);
    if (cat === "powerpoint") {
      setPackageId("ppt_g2");
      setQuantity(1);
    } else if (cat === "animation") {
      setPackageId("anime_2d");
      setQuantity(3);
    } else if (cat === "elearning") {
      setPackageId("el_g2");
      setQuantity(1);
    } else if (cat === "skkn") {
      setPackageId("skkn_word");
      setQuantity(1);
    } else if (cat === "app") {
      setPackageId("app_g1");
      setQuantity(1);
    } else {
      setPackageId("gvg_word");
      setQuantity(1);
    }
  };

  // Calculate dynamic price live on the form
  const getSelectedPrice = () => {
    const pkg = packagesInfo[packageId];
    if (!pkg) return 0;
    // For PowerPoint & E-Learning, quantity is usually 1 project. For animation, it multiplies mins or scenes.
    if (serviceType === "animation") {
      return pkg.price * quantity;
    }
    return pkg.price;
  };

  // Drag and drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setUploadedFileName(file.name);
      setUploadedFileSize((file.size / 1024 / 1024).toFixed(2) + " MB");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      setUploadedFileSize((file.size / 1024 / 1024).toFixed(2) + " MB");
    }
  };

  // Submit wizard: validate, save order, send to Google Sheet script, and show completion
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert("Vui lòng nhập đầy đủ thông tin Họ Tên và Số điện thoại Zalo.");
      return;
    }

    const calculatedTotal = getSelectedPrice();
    const orderId = "MS-" + Math.floor(100000 + Math.random() * 900000);

    const newOrder: BookingOrder = {
      id: orderId,
      customerName,
      customerEmail: "dummy@gmail.com",
      customerPhone,
      serviceType,
      packageId,
      quantity,
      requirements,
      totalPrice: calculatedTotal,
      status: 'pending',
      createdAt: new Date().toLocaleDateString("vi-VN") + " " + new Date().toLocaleTimeString("vi-VN", {hour: '2-digit', minute:'2-digit'}),
      paymentMethod: 'zalo_chat',
    };

    setActiveOrder(newOrder);

    // Save order locally
    const savedOrdersString = localStorage.getItem("maris_slide_orders");
    let ordersList: BookingOrder[] = [];
    if (savedOrdersString) {
      try {
        ordersList = JSON.parse(savedOrdersString);
      } catch (err) {
        ordersList = [];
      }
    }
    ordersList.unshift(newOrder);
    localStorage.setItem("maris_slide_orders", JSON.stringify(ordersList));

    // Submit to Google Sheets (connected Apps Script URL)
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwAsaTdvnohm7Yj9zLvl7m8xBOs-qAE0QlEMXqirxNnNN53nJsMLnIe3K61RuLKzI1C/exec";
    
    const categoryNames = {
      powerpoint: "Thiết kế PowerPoint",
      animation: "Phim Hoạt Hình",
      elearning: "Thiết kế E-Learning",
      skkn: "Sáng kiến kinh nghiệm (SKKN)",
      gvg: "Biện pháp & Báo cáo GVG",
      app: "Thiết kế Ứng dụng theo yêu cầu"
    };

    const payload = {
      id: orderId,
      customerName: customerName,
      zalo: customerPhone,
      serviceType: categoryNames[serviceType] || serviceType,
      packageName: packagesInfo[packageId]?.name || packageId,
      quantity: serviceType === 'animation' ? quantity : 1,
      requirements: requirements,
      totalPrice: calculatedTotal.toLocaleString('vi-VN') + "đ",
      createdAt: newOrder.createdAt
    };

    try {
      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error("Google Sheets submit error:", err);
    }

    setWizardStep('completed');
  };

  if (!isOpen) return null;

  return (
    <div id="booking-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-rose-100 flex flex-col justify-between max-h-[90vh]">
        
        {/* Header of modal */}
        <div className="bg-rose-50/60 border-b border-rose-100 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></span>
            <h2 className="text-lg font-black text-gray-900">
              {wizardStep === 'form' && "Phiếu Đăng Ký Thiết Kế"}
              {wizardStep === 'completed' && "Đăng Ký Thành Công!"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 bg-white border border-gray-100 cursor-pointer w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {wizardStep === 'form' && (
            <form onSubmit={handleFormSubmit} id="booking-wizard-form" className="space-y-6">
              
              {/* Client specifications contacts details */}
              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">
                  Thông tin đăng ký tư vấn & thiết kế:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Họ & Tên *</label>
                    <input
                      type="text"
                      required
                      placeholder="Cô Nguyễn Thị Lan"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 h-10 px-3 py-1.5 rounded-xl text-sm focus:bg-white focus:outline-rose-400 placeholder-gray-400 font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Số ZALO (Số điện thoại) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0396.581.283"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 h-10 px-3 py-1.5 rounded-xl text-sm focus:bg-white focus:outline-rose-400 placeholder-gray-400 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Package selector */}
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Category select block */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Dịch vụ quan tâm</label>
                    <select
                      value={serviceType}
                      onChange={(e) => handleCategoryChange(e.target.value as ServiceType)}
                      className="w-full bg-slate-50 border border-gray-200 h-10 px-3 py-1.5 rounded-xl text-sm focus:bg-white focus:outline-rose-400"
                    >
                      <option value="powerpoint">Thiết kế PowerPoint</option>
                      <option value="animation">Phim Hoạt Hình</option>
                      <option value="elearning">Thiết kế E-Learning</option>
                      <option value="skkn">Sáng kiến kinh nghiệm (SKKN)</option>
                      <option value="gvg">Biện pháp & Báo cáo GVG</option>
                      <option value="app">Thiết kế Ứng dụng theo yêu cầu</option>
                    </select>
                  </div>

                  {/* Sub package details */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-gray-700">Gói thầu thiết kế đăng ký</label>
                    <select
                      value={packageId}
                      onChange={(e) => setPackageId(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 h-10 px-3 py-1.5 rounded-xl text-sm focus:bg-white focus:outline-rose-400"
                    >
                      {serviceType === "powerpoint" && (
                        <>
                          <option value="ppt_g1">PowerPoint Gói 1 - Cơ Bản (800.000đ)</option>
                          <option value="ppt_g2">PowerPoint Gói 2 - Trọn gói AI, video 2D & 3D (1.500.000đ) ⭐</option>
                        </>
                      )}
                      {serviceType === "animation" && (
                        <>
                          <option value="anime_2d">Phim hoạt hình tình huống 2D ( Animiz) (300.000đ / phút phim)</option>
                          <option value="anime_3d">Hoạt hình 3D Trí Tuệ Nhân Tạo AI (150.000đ / cảnh phim)</option>
                        </>
                      )}
                      {serviceType === "elearning" && (
                        <>
                          <option value="el_g1">E-Learning Gói 1 - Cơ bản chuẩn SCORM (1.500.000đ)</option>
                          <option value="el_g2">E-Learning Gói 2 - Phổ thông & Quiz (2.000.000đ)</option>
                          <option value="el_g3">E-Learning Gói 3 - Trọn gói kịch bản từ A-Z (4.000.000đ) ⭐</option>
                        </>
                      )}
                      {serviceType === "skkn" && (
                        <>
                          <option value="skkn_word">Bản Word Sáng kiến kinh nghiệm (2.000.000đ)</option>
                        </>
                      )}
                      {serviceType === "gvg" && (
                        <>
                          <option value="gvg_word">Biện pháp Giáo viên giỏi - Bản Word (1.000.000đ)</option>
                          <option value="gvg_ppt">PowerPoint Báo Cáo Biện Pháp GVG (1.000.000đ)</option>
                        </>
                      )}
                      {serviceType === "app" && (
                        <>
                          <option value="app_g1">APP CƠ BẢN - Gói 1 (1.000.000đ)</option>
                          <option value="app_g2">APP NÂNG CAO - Gói 2 (2.000.000đ) ⭐</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                {/* Sub volume adjuster inside Wizard form */}
                {serviceType === "animation" && (
                  <div className="bg-slate-50 rounded-2xl p-4 border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div>
                      <p className="text-xs font-bold text-gray-700">Khối lượng kịch bản phim:</p>
                      <p className="text-[11px] text-gray-400">Điều chỉnh số lượng cần thiết kế</p>
                    </div>
                    <div className="flex items-center space-x-3 justify-end">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-full bg-white border border-gray-200 font-black cursor-pointer flex items-center justify-center hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="text-base font-bold text-rose-500 font-mono w-12 text-center">
                        {quantity} {packageId === "anime_2d" ? "phút" : "cảnh"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white border border-gray-200 font-black cursor-pointer flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* SKKN & GVG Info Box */}
              {(serviceType === "skkn" || serviceType === "gvg") && (
                <div className="bg-rose-50/40 border border-rose-100/75 rounded-xl p-3.5 text-xs text-rose-700/90 leading-relaxed">
                  {serviceType === "skkn"
                    ? "Quy trình viết Word trọn gói bám sát khung sườn. Thời hạn hoàn thiện 20-30 ngày. Số liệu giả định theo sĩ số thực tế."
                    : "Biên soạn nội dung Word chuẩn mực GVG bám sát sườn. Hoàn thiện trong 7-10 ngày. File Word và Powerpoint là 2 dịch vụ tách biệt."}
                </div>
              )}

              {/* Lesson notes / requirements */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Ghi chú (Yêu cầu bài giảng chi tiết, chủ đề, khối lớp, phương pháp):</label>
                <textarea
                  placeholder="Gợi ý: Môn Tự nhiên xã hội Lớp 2, bài Thú nuôi quanh nhà. Hướng dẫn theo phong cách Trạm hoặc STEAM..."
                  rows={3}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-rose-400 placeholder-gray-400"
                ></textarea>
              </div>

              {/* Live invoice estimate */}
              <div className="bg-rose-50/40 border border-rose-100 rounded-2xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-rose-500 uppercase">Chi phí dự kiến</p>
                  <p className="text-[10px] text-gray-500 font-medium">Báo giá minh bạch từ Maris Slide</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-gray-950">
                    {getSelectedPrice().toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>

              {/* Operational button */}
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  id="submit-order-form-btn"
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-3 rounded-xl text-xs shadow-md shadow-rose-200 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Gửi Thông Tin Đăng Ký</span>
                </button>
              </div>
            </form>
          )}

          {wizardStep === 'completed' && activeOrder && (
            <div className="text-center py-6 space-y-6 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-100">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-gray-950">Gửi thông tin thành công!</h3>
                <p className="text-gray-500 text-xs max-w-md mx-auto leading-relaxed">
                  Maris Slide đã tiếp nhận thông tin đăng ký của thầy cô. Vui lòng liên hệ trực tiếp qua Zalo để trao đổi chi tiết và bắt đầu thiết kế nhanh nhất.
                </p>
              </div>

              {/* Details cards */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs space-y-2 max-w-sm text-center mx-auto shadow-xs w-full">
                <p className="text-gray-400 font-semibold uppercase">Thông tin đã lưu:</p>
                <p className="font-bold text-gray-800">{activeOrder.customerName}</p>
                <p className="font-bold text-rose-500 uppercase">
                  {activeOrder.serviceType === "powerpoint" ? "Thiết Kế PowerPoint" : 
                   activeOrder.serviceType === "animation" ? "Phim Hoạt Hình" : 
                   activeOrder.serviceType === "elearning" ? "Thiết Kế E-Learning" : 
                   activeOrder.serviceType === "skkn" ? "Sáng kiến kinh nghiệm (SKKN)" : 
                   activeOrder.serviceType === "app" ? "Thiết kế Ứng dụng theo yêu cầu" : "Biện pháp & Báo cáo GVG"}
                </p>
                <p className="text-emerald-600 font-bold">
                  Chi phí dự kiến: {activeOrder.totalPrice.toLocaleString("vi-VN")}đ
                </p>
                <p className="text-[10px] text-gray-500">Mã bài: {activeOrder.id}</p>
              </div>

              <div className="space-y-3 w-full max-w-xs mx-auto">
                {/* Link Zalo Button */}
                <a
                  href="https://zalo.me/0396581283"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#0068ff] hover:bg-[#0054d3] text-white py-3 rounded-xl font-bold text-xs transition-colors flex items-center justify-center space-x-2 shadow-md shadow-blue-200 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Liên hệ ZALO: 0396.581.283</span>
                </a>
                
                <button
                  id="close-wizard-success-btn"
                  onClick={() => {
                    onBookingSuccess();
                    onClose();
                  }}
                  className="w-full bg-gray-900 hover:bg-gray-850 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Đóng & Xem Quản Lý Bài Dạy
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
