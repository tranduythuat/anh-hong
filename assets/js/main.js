// Kích hoạt ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Gọi các hiệu ứng có sẵn
document.addEventListener("DOMContentLoaded", () => {
    gsapFlipIn(".animate-flip");
  gsapFadeIn(".animate-fade");
});
