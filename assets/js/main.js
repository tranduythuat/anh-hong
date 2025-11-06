// Kích hoạt ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Gọi các hiệu ứng có sẵn  
document.addEventListener("DOMContentLoaded", () => {
  gsapFlipIn(".animate-flip");
  gsapFadeIn(".animate-fade");
  gsapFadeRight(".fade-right");
  gsapFadeLeft(".fade-left");
  gsapFadeUp(".fade-up");
  gsapFadeDown(".fade-down");
  gsapRotateBottomLeft(".rotate-bl");
  gsapRotateBottomRight(".rotate-br");
  gsapFlipVerticalLeft(".flip-vertical-left");
  gsapRollInLeft(".roll-in-left");
  gsap_rotate_bl__float(".rotate-bl--float");

  // Tạo timeline
  const tl = gsap.timeline({
    repeatDelay: 0,  // delay giữa các lần lặp
    defaults: { duration: .8, ease: "power2.out" }, // giá trị mặc định
    scrollTrigger: {
      trigger: ".timeline-item",
      start: "top 80%", // khi phần tử xuất hiện 80% trong viewport
    }
  });

  // Thêm các animation theo thứ tự
  tl.from(".fist-animation", { x: -100, opacity: 0 })        // box đỏ bay xuống
    .from(".second-animation", { x: -100, opacity: 0 }, "-=0.5")       // box xanh bay từ trái
    .from(".third-animation", { x: -100, opacity: 0 }, "-=0.5")    // box xanh lá phóng to dần
    .from(".four-animation", { x: -100, opacity: 0 }, "-=0.5");    // box xanh lá phóng to dần

  const form = document.forms["rsvp-form"];
  const formEn = document.forms["rsvp-form-en"];
  if (form) {
    form.addEventListener("submit", (e) => handleFormSubmit(e, 'vi'));
  }

  if(formEn) {
    formEn.addEventListener("submit", (e) => handleFormSubmit(e, 'en'));
  }
});

async function handleFormSubmit(e, lang) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log("🚀 ~ handleFormSubmit ~ data:", data);

  const {
    name: name,
    confirm: confirm,
    guest_number: guest_number,
    dietary: dietary,
    dietary_note: dietary_note,
  } = data;
  console.log("🚀 ~ handleFormSubmit 2~ data:", data);

  // Thông báo khi bắt đầu gửi
  Swal.fire({
    title: lang === 'vi' ? 'Đang gửi ...': 'Sending ...',
    text: lang === 'vi'? "Vui lòng chờ trong giây lát": "Please wait a moment",
    icon: "info",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const url = lang === 'vi' 
    ? 'https://script.google.com/macros/s/AKfycbwpbayzLWQBaWAN2IbKLQsgtcEYoNJ1CH1CJT2NeM6qHJ6YhSFNBw6c9_mfEGnQXUO01Q/exec?sheet=vi'
    : 'https://script.google.com/macros/s/AKfycbwpbayzLWQBaWAN2IbKLQsgtcEYoNJ1CH1CJT2NeM6qHJ6YhSFNBw6c9_mfEGnQXUO01Q/exec?sheet=en';

  console.log('url', url)

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        name,
        confirm,
        guest_number,
        dietary,
        dietary_note
      }),
    });

    const result = await res.json().catch(() => ({}));
    console.log("Server response:", result);

    form.reset();

    // Thông báo thành công
    Swal.fire({
      title: lang === 'vi'? "Thành công!": "Success!",
      text: lang === 'vi'? "Cảm ơn bạn đã gửi phản hồi, thông tin đã được gửi đến dâu rể rồi nha": "Thank you for your feedback, the information has been sent to the bride and groom.",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#000",
    });
  } catch (error) {
    console.error("Error:", error);

    // Thông báo lỗi
    Swal.fire({
      title: "Lỗi!",
      text: "OPPS! Đã xảy ra lỗi: " + error.message,
      icon: "error",
      confirmButtonText: "Thử lại",
      confirmButtonColor: "#000",
    });
  }
}
