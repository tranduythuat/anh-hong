// Kích hoạt ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Gọi các hiệu ứng có sẵn
document.addEventListener("DOMContentLoaded", () => {
  gsapFlipIn(".animate-flip");
  gsapFadeIn(".animate-fade");
  gsapFadeRight(".fade-right");
  gsapFadeLeft(".fade-left");
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
      trigger: ".box",
      start: "top 90%", // khi phần tử xuất hiện 80% trong viewport
    }
  });

  // Thêm các animation theo thứ tự
  tl.from(".red", { x: -100, opacity: 0 })        // box đỏ bay xuống
    .from(".blue", { x: -100, opacity: 0 }, "-=0.3")       // box xanh bay từ trái
    .from(".green", { x: -100, opacity: 0 }, "-=0.3");    // box xanh lá phóng to dần
});
