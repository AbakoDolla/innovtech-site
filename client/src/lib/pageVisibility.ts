export function revealPageSections(root: Pick<Document, "querySelectorAll"> = document) {
  root.querySelectorAll<HTMLElement>("main section, main article").forEach((element) => {
    element.classList.add("is-visible");
  });
}
