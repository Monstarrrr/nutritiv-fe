export const scrollToElement = (element, behavior = "smooth") => {
  element && element.current.scrollIntoView({
    behavior,
    block: "center",
  });
}