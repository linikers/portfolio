import gsap from "gsap";

export function animateTerminal(el: HTMLElement) {
  const lines = [...el.querySelectorAll(".cmd")] as HTMLSpanElement[];
  lines.forEach(line => (line.style.opacity = "0"));

  gsap.to(lines, {
    opacity: 1,
    duration: 0.12,
    stagger: 0.22,
    ease: "power1.in"
  });

  gsap.to(el, {
    duration: 0.2,
    repeat: -1,
    yoyo: true,
    opacity: 0.96,
    ease: "none"
  });
}
