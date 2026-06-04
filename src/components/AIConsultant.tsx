import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, User, RefreshCw, AlertCircle, HelpCircle } from "lucide-react";
import { Message } from "../types";

const getOfflineResponse = (query: string): string => {
  const q = query.toLowerCase();

  if (q.includes("powerpoint") || q.includes("ppt") || q.includes("slide") || q.includes("trình chiếu")) {
    return `### Dịch vụ thiết kế PowerPoint tại Maris Slide:
- **Gói 1 (PowerPoint Cơ Bản)**: **800.000đ / bài**. Giáo viên gửi bản PowerPoint nội dung. Tối đa 30 slide / bản.
- **Gói 2 (PowerPoint Trọn gói AI, video 2D & 3D)**: **1.500.000đ / bài**. Tối đa 30 slide. Maris Slide chịu trách nhiệm lên ý tưởng sư phạm đổi mới toàn diện đạt chuẩn nâng cao từ giáo án thô.
- **Hỗ trợ sửa bài**: Sửa đổi tối đa 5 lần cho Gói 2 và 3 lần cho Gói 1 kể từ ngày bàn giao bài demo trong vòng 1 tháng.`;
  }

  if (q.includes("hoạt hình") || q.includes("phim") || q.includes("video") || q.includes("animiz") || q.includes("cảnh phim")) {
    return `### Dịch vụ thiết kế Phim Hoạt Hình Giáo Khoa:
- **Phim hoạt hình tình huống 2D (Animiz)**: **300.000đ / phút phim**. (Tối thiểu thầu từ 3 phút).
- **Hoạt hình 3D Trí Tuệ Nhân Tạo AI**: **150.000đ / cảnh phim**.
- Đội ngũ biên kịch và thiết kế sẽ đồng hành chuyển thể kịch bản bài học của thầy cô thành những thước phim minh họa sinh động nhất.`;
  }

  if (q.includes("elearning") || q.includes("e-learning") || q.includes("scorm") || q.includes("lms")) {
    return `### Dịch vụ thiết kế Bài Giảng E-Learning (Chuẩn SCORM):
- **E-Learning Gói 1 (Cơ bản chuẩn SCORM)**: **1.500.000đ / bài**. Thiết kế SCORM tiêu chuẩn, chưa tích hợp AI.
- **E-Learning Gói 2 (Phổ thông & Quiz)**: **2.000.000đ / bài**. Tích hợp bộ Quiz trắc nghiệm tương tác, chưa tích hợp AI.
- **E-Learning Gói 3 (Trọn gói kịch bản từ A-Z)**: **4.000.000đ / bài** ⭐. Lên kịch bản từ A-Z, tích hợp Mini game, App AI tương tác, Chatbot hỗ trợ học viên, Video hoạt hình tình huống (2 phút) và sửa đổi tới 10 lần.
- *Lưu ý chung*: Giáo viên cần tự ghi âm, ghi hình lời giảng để Maris Slide thực hiện đồng bộ.`;
  }

  if (q.includes("sáng kiến") || q.includes("skkn") || q.includes("kinh nghiệm") || q.includes("trùng lặp")) {
    return `### Dịch vụ viết Sáng kiến kinh nghiệm (SKKN):
- **Bản Word hoàn thiện**: **2.000.000đ / bản**.
- **Cam kết & Quy trình**:
  - Quy trình viết Word trọn gói bám sát khung sườn.
  - Cam kết độ trùng lặp **<20%**.
  - Hỗ trợ chèn sản phẩm có trong sáng kiến (nếu có).
  - Thời hạn hoàn thiện 20-30 ngày. Số liệu định lượng giả định logic theo sĩ số thực tế.
  - Hỗ trợ sửa tối đa 3 lần bản thảo (không đổi khung đã chốt).`;
  }

  if (q.includes("giáo viên giỏi") || q.includes("gvg") || q.includes("biện pháp") || q.includes("báo cáo")) {
    return `### Dịch vụ Biện pháp & Báo cáo GVG:
- **Biện pháp Bản Word**: **1.000.000đ / bản**. Biên soạn nội dung Word chuẩn mực GVG bám sát sườn. Hoàn thiện trong 7-10 ngày.
- **PowerPoint Báo Cáo Biện Pháp**: **1.000.000đ / bài**.
- *Lưu ý*: File Word và PowerPoint là hai dịch vụ tách biệt. Hỗ trợ sửa đổi tối đa 3 lần bản thảo.`;
  }

  if (q.includes("app") || q.includes("ứng dụng") || q.includes("phần mềm") || q.includes("game")) {
    return `### Dịch vụ Thiết kế Ứng dụng theo yêu cầu (APP):
- **APP CƠ BẢN (Gói 1)**: **1.000.000đ / Ứng dụng**. Giải pháp thiết kế đơn giản, tối ưu chi phí. Thích hợp làm game tương tác học tập, phần mềm quản lý, mô phỏng cơ bản hoạt động độc lập (không cần máy chủ). Hỗ trợ sửa tối đa 5 lần.
- **APP NÂNG CAO (Gói 2)**: **2.000.000đ / Ứng dụng** ⭐. Tích hợp Database online, API, tính năng đăng nhập và đồng bộ dữ liệu thời gian thực, có trang quản trị viên. Hỗ trợ sửa tối đa 10 lần.`;
  }

  if (q.includes("khóa học") || q.includes("học") || q.includes("đào tạo") || q.includes("lớp học")) {
    return `### Khóa học Công nghệ tại Maris Slide:
Hiện tại Maris Slide đang cung cấp các khóa học công nghệ giáo dục giúp thầy cô tự làm chủ các công cụ soạn bài giảng.
- Quý thầy cô vui lòng truy cập liên kết sau để xem chi tiết thông tin khóa học: [Xem thông tin Khóa Học](https://khoahoccongnghe2-marisslide.vercel.app/)`;
  }

  if (q.includes("giá") || q.includes("bao nhiêu") || q.includes("phí") || q.includes("chi phí") || q.includes("báo giá") || q.includes("tiền")) {
    return `### Bảng giá dịch vụ tại Maris Slide:
- **PowerPoint**: **800.000đ** (Cơ bản) | **1.500.000đ** (Trọn gói AI)
- **Phim Hoạt Hình**: **300.000đ/phút** (2D) | **150.000đ/cảnh** (3D AI)
- **E-Learning**: **1.500.000đ** (Gói 1) | **2.000.000đ** (Phổ thông) | **4.000.000đ** (Trọn gói kịch bản A-Z)
- **Sáng kiến kinh nghiệm (SKKN)**: **2.000.000đ / bản Word**
- **Biện pháp GVG**: **1.000.000đ** (Bản Word) | **1.000.000đ** (PowerPoint báo cáo)
- **Thiết kế APP**: **1.000.000đ** (Cơ bản) | **2.000.000đ** (Nâng cao)`;
  }

  if (q.includes("sửa") || q.includes("chỉnh sửa") || q.includes("bảo hành") || q.includes("yêu cầu thêm") || q.includes("lưu trữ")) {
    return `### Quy định chỉnh sửa và lưu trữ bài dạy:
- **Thời hạn hỗ trợ**: Tất cả đơn hàng đều được hỗ trợ chỉnh sửa hoàn chỉnh trong thời hạn tối đa **1 tháng** kể từ ngày đặt bài.
- **Quy định đóng bài**: Sau 1 tháng, bài dạy sẽ được tự động đóng bảo mật lưu trữ và không hỗ trợ sửa đổi thêm miễn phí.
- **Số lần sửa đổi**: Từ 3 đến 10 lần tùy theo gói dịch vụ thầy cô lựa chọn.`;
  }

  if (q.includes("bảo mật") || q.includes("cam kết") || q.includes("đảm bảo") || q.includes("uy tín") || q.includes("có vàng")) {
    return `### Cam kết 3 "CÓ" Vàng từ Maris Slide:
1. **100% Độc Quyền**: Mỗi bài giảng đều được thiết kế độc nhất, không sao chép trùng lặp.
2. **100% Bảo Mật**: Tuyệt đối giữ bí mật tác quyền và thông tin lớp học/trường học của giáo viên.
3. **Tương Tác Mini Game**: Các hoạt động học tập tương tác, kích thích sự chủ động của học sinh được tích hợp hài hòa.`;
  }

  return `Xin lỗi thầy cô, tôi chưa tìm thấy câu trả lời trực tiếp cho câu hỏi của thầy cô trong cơ sở dữ liệu trên web. 
Thầy cô có thể thử hỏi bằng các từ khóa liên quan như: **PowerPoint, E-Learning, Phim Hoạt Hình, Sáng kiến kinh nghiệm (SKKN), Biện pháp GVG, Thiết kế APP, Khóa học, Báo giá, Quy định sửa bài...** 
Hoặc thầy cô có thể bấm nút **Đặt Thiết Kế** hoặc liên hệ trực tiếp hotline **0396.581.283** để được chuyên viên trực tiếp tư vấn chi tiết hơn ạ!`;
};

export default function AIConsultant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Xin chào quý thầy cô! Tôi là **Trợ lý Tư vấn Sư phạm của Maris Slide** 🌸.\n\nTôi ở đây để giúp giải đáp các trăn trở của thầy cô về việc chuẩn bị bài giảng, gợi ý ý tưởng hoạt cảnh, tính phí dịch vụ PowerPoint, E-Learning hoặc Làm phim hoạt hình 2D / 3D AI.\n\nThầy cô cần tôi giải đáp nội dung nào hôm nay ạ?",
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const presetQuestions = [
    { text: "Báo giá chi tiết gói PowerPoint?", category: "ppt" },
    { text: "Nên làm Video 2D Animiz hay 3D AI?", category: "anim" },
    { text: "Thiết kế E-Learning gói cao cấp hỗ trợ gì?", category: "elearn" },
    { text: "Chính sách bảo mật & tương tác 3 'Có'?", category: "policy" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);
    setErrorText("");

    setTimeout(() => {
      try {
        const responseText = getOfflineResponse(textToSend);
        const assistantMessage: Message = {
          id: Math.random().toString(),
          sender: "assistant",
          text: responseText,
          timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err: any) {
        console.error("Chat error:", err);
        setErrorText("Đã xảy ra lỗi khi xử lý câu hỏi.");
      } finally {
        setIsLoading(false);
      }
    }, 600);
  };

  const handlePresetClick = (qText: string) => {
    handleSend(qText);
  };

  const handleResetChat = () => {
    if (window.confirm("Thầy cô có muốn xóa cuộc hội thoại này để bắt đầu tư vấn mới không?")) {
      setMessages([
        {
          id: "welcome",
          sender: "assistant",
          text: "Xin chào quý thầy cô! Tôi là **Trợ lý Tư vấn Sư phạm của Maris Slide** 🌸.\n\nTôi ở đây để giúp giải đáp các trăn trở của thầy cô về việc chuẩn bị bài giảng, gợi ý ý tưởng hoạt cảnh, tính phí dịch vụ PowerPoint, E-Learning hoặc Làm phim hoạt hình 2D / 3D AI.\n\nThầy cô cần tôi giải đáp nội dung nào hôm nay ạ?",
          timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  };

  // Safe and clean text splitter helper that simulates markdown bullet points & headers
  const formatMessageText = (text: string) => {
    return text.split("\n").map((line, idx) => {
      let content = line;
      let isBold = false;
      let isHeader = false;

      // Handle bold blocks **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIdx = 0;
      let match;

      while ((match = boldRegex.exec(content)) !== null) {
        if (match.index > lastIdx) {
          parts.push(content.substring(lastIdx, match.index));
        }
        parts.push(<strong key={match.index} className="text-gray-900 font-extrabold">{match[1]}</strong>);
        lastIdx = boldRegex.lastIndex;
      }
      if (lastIdx < content.length) {
        parts.push(content.substring(lastIdx));
      }

      const finalRender = parts.length > 0 ? parts : content;

      if (line.startsWith("### ")) {
        return (
          <h4 key={idx} className="text-base font-bold text-gray-900 mt-4 mb-2">
            {line.substring(4)}
          </h4>
        );
      }
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={idx} className="ml-4 list-disc text-sm text-gray-700 leading-relaxed my-1">
            {finalRender}
          </li>
        );
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-2.5" />;
      }

      return (
        <p key={idx} className="text-sm text-gray-700 leading-relaxed my-1">
          {finalRender}
        </p>
      );
    });
  };

  return (
    <div id="ai-advisor-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-4 h-[630px]">
      
      {/* Intro block / instructions */}
      <div className="lg:col-span-4 bg-gray-50 border border-gray-150 rounded-2xl p-6 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Consultant Hub</span>
          </div>
          
          <h3 className="text-lg font-black text-gray-900">Chuyên viên Tư vấn Maris Slide</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Hệ thống AI được chuẩn hóa theo đúng triết lý sư phạm của Maris Slide. Thầy cô có thể hỏi ý tưởng thiết kế, so sánh các gói PowerPoint, hỏi cấu trúc chuẩn SCORM hay tìm hiểu cơ hội được tăng hạn mức sửa bài.
          </p>

          <div className="pt-4 border-t border-gray-200 space-y-3">
            <p className="text-xs font-bold text-gray-700 flex items-center space-x-1">
              <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>Gợi ý câu hỏi nhanh:</span>
            </p>
            <div className="flex flex-col gap-2">
              {presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  id={`preset-q-${idx}`}
                  onClick={() => handlePresetClick(q.text)}
                  className="text-left bg-white hover:bg-rose-50/50 border border-gray-150 hover:border-rose-200 text-gray-700 text-xs py-2 px-3 rounded-xl transition-all cursor-pointer font-medium"
                >
                  {q.text}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Reset button */}
        <div className="pt-4 border-t border-gray-200">
          <button
            id="reset-chat-btn"
            onClick={handleResetChat}
            className="w-full flex items-center justify-center space-x-2 border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors py-2 rounded-xl text-xs font-bold cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Làm Mới Trò Chuyện</span>
          </button>
        </div>
      </div>

      {/* Main chat log Area */}
      <div className="lg:col-span-8 bg-white border border-rose-100 rounded-3xl shadow-xs overflow-hidden flex flex-col justify-between h-full">
        {/* Chat window header */}
        <div className="bg-rose-50/60 border-b border-rose-100 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-rose-500 flex items-center justify-center text-white font-black text-sm">
              MS
            </div>
            <div>
              <p className="text-sm font-bold text-gray-950">Chuyên viên Maris Slide</p>
              <p className="text-[10px] text-emerald-600 font-bold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1"></span>
                <span>Đang tư vấn trực tuyến</span>
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-gray-400 bg-white border border-gray-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
            Hỗ trợ 24/7
          </span>
        </div>

        {/* Scrollable messages container */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-slate-50/20">
          {messages.map((m) => {
            const isAsst = m.sender === "assistant";
            return (
              <div
                key={m.id}
                className={`flex items-start space-x-3 max-w-[85%] ${
                  isAsst ? "mr-auto" : "ml-auto flex-row-reverse space-x-reverse"
                }`}
              >
                {/* Icon avatar */}
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold shadow-xs ${
                    isAsst ? "bg-rose-500 text-white" : "bg-gray-800 text-white"
                  }`}
                >
                  {isAsst ? "MS" : <User className="w-4 h-4" />}
                </div>

                {/* Msg balloon */}
                <div className="space-y-1">
                  <div
                    className={`rounded-2xl px-4 py-3 leading-relaxed shadow-xs text-sm ${
                      isAsst
                        ? "bg-white border border-gray-150 text-gray-800 rounded-tl-xs"
                        : "bg-rose-500 text-white rounded-tr-xs"
                    }`}
                  >
                    {isAsst ? formatMessageText(m.text) : <p>{m.text}</p>}
                  </div>
                  <p className={`text-[9px] text-gray-400 font-bold px-2 ${isAsst ? "" : "text-right"}`}>
                    {m.timestamp}
                  </p>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start space-x-3 max-w-[80%] mr-auto animate-pulse">
              <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                AI
              </div>
              <div className="bg-white border border-gray-150 text-gray-500 rounded-2xl rounded-tl-xs px-4 py-3 text-xs font-bold italic flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                <span>Chuyên viên Maris Slide đang soạn câu trả lời sư phạm...</span>
              </div>
            </div>
          )}

          {errorText && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center space-x-2 text-xs text-red-600">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorText}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form
          id="chat-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputText);
          }}
          className="border-t border-gray-150 p-4 bg-white flex items-center space-x-3"
        >
          <input
            id="chat-input-field"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Đặt câu hỏi: Ví dụ soạn PowerPoint mầm non, soạn giáo án chuẩn SCORM,..."
            className="flex-1 bg-gray-50 border border-gray-200 h-11 px-4 py-2 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-rose-500 focus:bg-white transition-all"
            disabled={isLoading}
          />
          <button
            id="chat-send-btn"
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="bg-rose-500 hover:bg-rose-600 disabled:bg-gray-100 text-white disabled:text-gray-400 h-11 w-11 rounded-xl flex items-center justify-center shadow-md shadow-rose-200 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
