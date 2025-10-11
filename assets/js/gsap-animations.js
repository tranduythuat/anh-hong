// Không dùng export để hỗ trợ chạy bằng script thuần
function gsapFlipIn(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    gsap.to(el, {
      rotateY: 0,
      scale: 1,
      filter: "brightness(1)",
      opacity: 1,
      duration: 1.4,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });
}
function gsapFadeIn(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  });
}
