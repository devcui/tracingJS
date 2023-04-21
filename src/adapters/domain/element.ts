import {TElementPosition, TracePoint} from "../../trace";
import {HTMLProps, HTMLTag, win} from "../../utils";

export class TraceElement {
    private readonly origin: HTMLElement;
    cursor?: HTMLElement;

    private constructor(element: HTMLElement) {
        this.origin = element;
    }

    static create(element: HTMLElement): TraceElement {
        return new TraceElement(element);
    }


    get coordinate(): TElementPosition | undefined {
        if (!this.cursor) return undefined
        const {top, left} = this.cursor.getBoundingClientRect();
        const {scrollTop, scrollLeft} = this.cursor;
        const x = left + scrollLeft;
        const y = top + scrollTop;
        return {x, y};
    }

    get id(): string | null {
        const dataEventIdEl: HTMLElement | undefined = this.match([TracePoint.ID])
        if (dataEventIdEl) {
            return dataEventIdEl.getAttribute(TracePoint.ID)
        }
        const dataEventTitleEl: HTMLElement | undefined = this.match([TracePoint.Title]);
        if (dataEventTitleEl) {
            return dataEventTitleEl.getAttribute('title');
        }
        const dataEventContainerEl: HTMLElement | undefined = this.match([TracePoint.Container]);
        if (dataEventContainerEl) {
            if (
                dataEventContainerEl.hasAttribute(TracePoint.ID) ||
                dataEventContainerEl.hasAttribute(TracePoint.Title)
            ) {
                return (
                    dataEventContainerEl.getAttribute(TracePoint.ID) ||
                    dataEventContainerEl.getAttribute(TracePoint.Title)
                )
            }
            const containerName: string | null = dataEventContainerEl.getAttribute(TracePoint.Container)
            if (containerName) {
                return containerName;
            }
        }
        return this.pathElements()[0].tagName.toLowerCase()
    }

    get title(): string | undefined {
        if (!this.cursor) return undefined
        return this.extractEventTitle()
    }


    get xpath(): string | undefined {
        if (!this.cursor) return undefined
        return this.getElementXPath(this.cursor)
    }

    get dataset(): string | undefined {
        if (!this.cursor) return undefined
        return JSON.stringify(this.cursor.dataset)
    }

    private pathElements(includeSelf: boolean = true, order: "asc" | "desc" = "desc"): HTMLElement[] {
        let parent: HTMLElement | null;
        if (includeSelf) {
            parent = this.origin;
        } else {
            parent = this.origin.parentElement;
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

    match(attributes: TracePoint[]): HTMLElement | undefined {
        const elements: HTMLElement[] = this.pathElements();
        const target: HTMLElement | undefined = elements.find((element: HTMLElement) =>
            attributes.some((attr: TracePoint) => element.hasAttribute(attr))
        );
        if (target) {
            return target
        } else {
            return undefined
        }
    }


    private getTitle(el?: HTMLElement): string | null {
        let title: string | null = null;
        if (el) {
            if (el.hasAttribute(TracePoint.Title)) {
                title = el.getAttribute(TracePoint.Title);
            } else {
                title = el.title;
            }
        } else if (!el) {
            if (this.cursor) {
                if (this.cursor.hasAttribute(TracePoint.Title)) {
                    title = this.cursor.getAttribute(TracePoint.Title);
                } else {
                    title = this.cursor.title;
                }
            }
        }
        return title;
    }

    private getElementXPath(element: HTMLElement): string {
        if (element.nodeType === Node.DOCUMENT_NODE) {
            return '/';
        }
        if (element.hasAttribute('id')) {
            return `//*[@id="${element.getAttribute('id')}"]`;
        }
        const index: number = this.getElementIndex(element);
        const tagName: string = element.tagName.toLowerCase();
        const parent: HTMLElement = element.parentNode as HTMLElement;
        const parentXPath: string = this.getElementXPath(parent);
        return `${parentXPath}/${tagName}[${index}]`;
    }

    private getElementIndex(element: HTMLElement): number {
        const siblings: NodeListOf<ChildNode> | undefined = element.parentNode?.childNodes;
        let index: number = 1;
        if (!siblings) {
            return index;
        }
        for (let i: number = 0; i < siblings.length; i++) {
            const sibling: ChildNode = siblings[i];
            if (sibling === element) {
                return index;
            }
            if (
                sibling.nodeType === Node.ELEMENT_NODE &&
                (sibling as HTMLElement).tagName === element.tagName
            ) {
                index++;
            }
        }
        return index;
    }


    private extractEventTitle(): string | undefined {
        if (!this.cursor) return undefined
        const selfTitle: string | null = this.getTitle(this.cursor);
        if (selfTitle) return selfTitle;
        let container: HTMLElement | null = this.cursor.parentElement;
        while (container && container != win().document.body) {
            if (container.hasAttribute('data-event-container')) break;
            container = container.parentElement;
        }
        let superTitle: string | null = null
        if (container) {
            superTitle = this.getTitle(container);
        }
        if (superTitle) return superTitle;
        const {tagName} = this.cursor;
        return !this.cursor.hasChildNodes() || tagName.toLowerCase() === HTMLTag.Svg ? this.getLeafElementTitle() : this.getNotLeafElementTitle()
    }

    private getLeafElementTitle(): string | undefined {
        if (!this.cursor) return undefined
        const {tagName, textContent} = this.cursor;
        if (tagName.toLowerCase() === HTMLTag.Img) return this.cursor.getAttribute(HTMLProps.Alt) || undefined;
        if (tagName.toLowerCase() === HTMLTag.Svg) {
            const use: Element | undefined = Array.from(this.cursor.children).find(childElement => childElement.tagName.toLowerCase() === HTMLTag.Use);
            if (use) {
                return use.getAttribute(HTMLProps.XlinkHref) || undefined;
            }
        }
        return textContent ? textContent : undefined;
    }

    private getNotLeafElementTitle(): string | undefined {
        if (!this.cursor) return undefined;
        const {tagName, textContent} = this.cursor;
        if (tagName.toLowerCase() === HTMLTag.A) {
            const res: boolean = this.isSimpleElement(this.cursor.children);
            if (res) return textContent || undefined
            if (!res) return this.cursor.getAttribute(HTMLProps.Href) || undefined
        }
        if (tagName.toLowerCase() == HTMLTag.Button) {
            const name: string | null = this.cursor.getAttribute(HTMLProps.Name);
            const res: boolean = this.isSimpleElement(this.cursor.children);
            if (name) return name
            if (res) return textContent || undefined
            if (!res) return this.cursor.getAttribute(HTMLProps.Href) || undefined
        }
        const {length} = Array.from(this.cursor.children).filter((el: Element) => el.hasChildNodes());
        return length > 0 ? undefined : textContent || undefined;
    }

    private isSimpleElement(children: HTMLCollection): boolean {
        const elements: Element[] = Array.from(children);
        if (elements.length > 0) {
            const tags: HTMLTag[] = [HTMLTag.Em, HTMLTag.B, HTMLTag.Strong, HTMLTag.Span, HTMLTag.Img, HTMLTag.I, HTMLTag.Code];
            const els: Element[] = elements.filter((el) => tags.includes(<HTMLTag>el.tagName.toLowerCase()));
            return els.length === children.length;
        }
        return true;
    }
}
