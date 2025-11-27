import { EditorAttributes, INLINE_ONLY_CONTAINERS } from '@fluxly/constants';
import type { DomElement, LayerNode } from '@fluxly/models';
import type { ActionElement, ActionLocation } from '@fluxly/models/actions';
import { assertNever, getHtmlElement } from '../../../helpers';
import { getInstanceId, getOid, getOrAssignDomId } from '../../../helpers/ids';
import { buildLayerTree } from '../../dom';
import { cssManager } from '../../style';
import { getDeepElement, getDomElement } from '../helpers';

function findClosestIndex(container: HTMLElement, y: number): number {
    const children = Array.from(container.children);

    if (children.length === 0) {
        return 0;
    }

    let closestIndex = 0;

    let minDistance = Infinity;

    children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();

        const childMiddle = rect.top + rect.height / 2;

        const distance = Math.abs(y - childMiddle);

        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
        }
    });

    const closestRect = children[closestIndex]?.getBoundingClientRect();

    if (!closestRect) {
        return 0;
    }

    const closestMiddle = closestRect.top + closestRect.height / 2;

    return y > closestMiddle ? closestIndex + 1 : closestIndex;
}

function findClosestIndexX(container: HTMLElement, x: number): number {
    const children = Array.from(container.children);

    if (children.length === 0) {
        return 0;
    }

    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.left + rect.width / 2;
        const distance = Math.abs(x - childCenter);

        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
        }
    });

    const closestRect = children[closestIndex]?.getBoundingClientRect();
    if (!closestRect) {
        return 0;
    }

    const closestCenter = closestRect.left + closestRect.width / 2;
    return x > closestCenter ? closestIndex + 1 : closestIndex;
}

function findInsertTarget(x: number, y: number): {
    targetEl: HTMLElement;
    isRow: boolean;
    index: number;
} | null {
    let targetEl = findNearestBlockLevelContainer(x, y);
    if (!targetEl) {
        return null;
    }

    // Find the nearest ancestor (inclusive) that has an OID
    while (targetEl && !getInstanceId(targetEl) && !getOid(targetEl)) {
        targetEl = targetEl.parentElement as HTMLElement | null;
    }

    // Fall back to first element that has an OID (e.g. app root) so code gen can map location
    if (!targetEl || targetEl === document.body) {
        const firstFluxlyElement = document.querySelector<HTMLElement>(
            `[${EditorAttributes.DATA_ONLOOK_ID}]`,
        );
        if (firstFluxlyElement) {
            targetEl = firstFluxlyElement;
        } else {
            targetEl = document.body;
        }
    }

    const display = window.getComputedStyle(targetEl).display;
    const flexDirection = window.getComputedStyle(targetEl).flexDirection;
    const isRow =
        (display === 'flex' || display === 'inline-flex') &&
        (flexDirection === 'row' || flexDirection === 'row-reverse');

    const index = isRow ? findClosestIndexX(targetEl, x) : findClosestIndex(targetEl, y);

    return { targetEl, isRow, index };
}

export function getInsertFeedbackRect(
    x: number,
    y: number,
): { rect: DOMRect; targetId: string } | null {
    const target = findInsertTarget(x, y);
    if (!target) {
        return null;
    }

    const { targetEl, isRow, index } = target;
    const children = Array.from(targetEl.children);

    if (children.length === 0) {
        const rect = targetEl.getBoundingClientRect();
        const width = rect.width || 100;
        const height = rect.height || 100;
        return {
            rect: new DOMRect(rect.left, rect.top, isRow ? 2 : width, isRow ? height : 2),
            targetId: getOrAssignDomId(targetEl),
        };
    }

    if (index >= children.length) {
        const lastChild = children[children.length - 1];
        const rect = lastChild.getBoundingClientRect();
        return {
            rect: new DOMRect(
                isRow ? rect.right : rect.left,
                isRow ? rect.top : rect.bottom,
                isRow ? 2 : rect.width,
                isRow ? rect.height : 2,
            ),
            targetId: getOrAssignDomId(targetEl),
        };
    }

    const child = children[index];
    const rect = child.getBoundingClientRect();
    return {
        rect: new DOMRect(
            isRow ? rect.left : rect.left,
            isRow ? rect.top : rect.top,
            isRow ? 2 : rect.width,
            isRow ? rect.height : 2,
        ),
        targetId: getOrAssignDomId(targetEl),
    };
}

export function getInsertLocation(x: number, y: number): ActionLocation | null {
    const target = findInsertTarget(x, y);
    if (!target) {
        return null;
    }

    const { targetEl, index } = target;
    const targetOid = getInstanceId(targetEl) || getOid(targetEl);

    return {
        type: 'index',
        targetDomId: getOrAssignDomId(targetEl),
        targetOid: targetOid || null,
        index,
        originalIndex: index,
    };
}

function findNearestBlockLevelContainer(x: number, y: number): HTMLElement | null {
    let targetEl = getDeepElement(x, y) as HTMLElement | null;
    if (!targetEl) {
        return document.body;
    }

    let inlineOnly = true;
    while (targetEl && inlineOnly) {
        inlineOnly = INLINE_ONLY_CONTAINERS.has(targetEl.tagName.toLowerCase());
        if (inlineOnly) {
            targetEl = targetEl.parentElement;
        }
    }
    
    if (!targetEl || targetEl.tagName.toLowerCase() === 'html') {
        return document.body;
    }

    return targetEl;
}

export function insertElement(
    element: ActionElement,
    location: ActionLocation,
): { domEl: DomElement, newMap: Map<string, LayerNode> | null } | undefined {
    const targetEl = getHtmlElement(location.targetDomId);
    if (!targetEl) {
        console.warn(`Target element not found: ${location.targetDomId}`);
        return;
    }
    const newEl = createElement(element);

    switch (location.type) {
        case 'append':
            targetEl.appendChild(newEl);
            break;
        case 'prepend':
            targetEl.prepend(newEl);
            break;
        case 'index':
            if (location.index === undefined || location.index < 0) {
                console.warn(`Invalid index: ${location.index}`);
                return;
            }

            if (location.index >= targetEl.children.length) {
                targetEl.appendChild(newEl);
            } else {
                targetEl.insertBefore(newEl, targetEl.children.item(location.index));
            }
            break;
        default:
            console.warn(`Invalid position: ${location}`);
            assertNever(location);
    }


    const domEl = getDomElement(newEl, true)
    const newMap = buildLayerTree(newEl);
    return {
        domEl,
        newMap,
    };
}

export function createElement(element: ActionElement) {
    const newEl = document.createElement(element.tagName);
    newEl.setAttribute(EditorAttributes.DATA_ONLOOK_INSERTED, 'true');

    for (const [key, value] of Object.entries(element.attributes)) {
        newEl.setAttribute(key, value);
    }

    if (element.textContent !== null && element.textContent !== undefined) {
        newEl.textContent = element.textContent;
    }

    for (const [key, value] of Object.entries(element.styles)) {
        newEl.style.setProperty(cssManager.jsToCssProperty(key), value);
    }

    for (const child of element.children) {
        const childEl = createElement(child);
        newEl.appendChild(childEl);
    }
    return newEl;
}

export function removeElement(location: ActionLocation): { domEl: DomElement, newMap: Map<string, LayerNode> | null } | null {
    const targetEl = getHtmlElement(location.targetDomId);

    if (!targetEl) {
        console.warn(`Target element not found: ${location.targetDomId}`);
        return null;
    }

    let elementToRemove: HTMLElement | null = null;

    switch (location.type) {
        case 'append':
            elementToRemove = targetEl.lastElementChild as HTMLElement | null;
            break;
        case 'prepend':
            elementToRemove = targetEl.firstElementChild as HTMLElement | null;
            break;
        case 'index':
            if (location.index !== -1) {
                elementToRemove = targetEl.children.item(location.index) as HTMLElement | null;
            } else {
                console.warn(`Invalid index: ${location.index}`);
                return null;
            }
            break;
        default:
            console.warn(`Invalid position: ${location}`);
            assertNever(location);
    }

    if (elementToRemove) {
        const domEl = getDomElement(elementToRemove, true);
        elementToRemove.style.display = 'none';
        const newMap = targetEl.parentElement ? buildLayerTree(targetEl.parentElement) : null;
        return {
            domEl,
            newMap,
        };
    } else {
        console.warn(`No element found to remove at the specified location`);
        return null;
    }
}
