export class TraceElement {
  private readonly element: HTMLElement;
  private constructor(element: HTMLElement) {
    this.element = element;
  }
  static create(element: HTMLElement): TraceElement {
    return new TraceElement(element);
  }

  pathElements(
    includeSelf: boolean = true,
    order: "asc" | "desc" = "desc"
  ): HTMLElement[] {
    let parent: HTMLElement | null;
    if (includeSelf) {
      parent = this.element;
    } else {
      parent = this.element.parentElement;
    }
    let result: HTMLElement[] = [];
    while (parent) {
      if (order === "asc") {
        result = result.concat(parent);
      } else {
        result = [parent].concat(result);
      }
      parent = parent.parentElement;
    }
    return result;
  }

  queryCustomFlag(): string | null {
    return "";
  }
}
