'use client';

import { useEditorEngine } from '@/components/store/editor';
import { EditorMode, type DomElement } from '@fluxly/models';
import { cn } from '@fluxly/ui/utils';
import { observer } from 'mobx-react-lite';
import { DropdownManagerProvider } from './hooks/use-dropdown-manager';
import { DivPanel } from './vertical/div-panel';
import { FramePanel } from './vertical/frame-panel';
import { TextPanel } from './vertical/text-panel';

enum TAG_CATEGORIES {
    TEXT = 'text',
    DIV = 'div',
    IMG = 'img',
    VIDEO = 'video',
}

const TAG_TYPES: Record<TAG_CATEGORIES, string[]> = {
    [TAG_CATEGORIES.TEXT]: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'span',
        'a',
        'strong',
        'b',
        'em',
        'i',
        'mark',
        'code',
        'small',
        'blockquote',
        'pre',
        'time',
        'sub',
        'sup',
        'del',
        'ins',
        'u',
        'abbr',
        'cite',
        'q',
    ],
    [TAG_CATEGORIES.DIV]: ['div'],
    // TODO: Add img and video tag support
    [TAG_CATEGORIES.IMG]: [],
    [TAG_CATEGORIES.VIDEO]: [],
} as const;

const getSelectedTag = (selected: DomElement[]): TAG_CATEGORIES => {
    if (selected.length === 0) {
        return TAG_CATEGORIES.DIV;
    }
    const tag = selected[0]?.tagName;
    if (!tag) {
        return TAG_CATEGORIES.DIV;
    }
    for (const [key, value] of Object.entries(TAG_TYPES)) {
        if (value.includes(tag.toLowerCase())) {
            return key as TAG_CATEGORIES;
        }
    }
    return TAG_CATEGORIES.DIV;
};

export const EditorBar = observer(({ availableWidth }: { availableWidth?: number }) => {
    const editorEngine = useEditorEngine();
    const selectedElement = editorEngine.elements.selected[0];
    const selectedTag = selectedElement ? getSelectedTag(editorEngine.elements.selected) : null;
    const selectedFrame = editorEngine.frames.selected?.[0];
    const windowSelected = selectedFrame && !selectedElement;

    const getPanel = () => {
        if (windowSelected) {
            return <FramePanel />;
        }
        if (selectedTag === TAG_CATEGORIES.TEXT) {
            return <TextPanel />;
        }
        return <DivPanel />;
    };

    if (!selectedElement && !selectedFrame) {
        return (
            <div className="flex items-center justify-center h-full text-foreground-secondary p-8 text-center">
                <p className="text-sm">Select an element or frame to view design options</p>
            </div>
        );
    }

    return (
        <DropdownManagerProvider>
            <div
                className={cn(
                    'flex flex-col w-full',
                    editorEngine.state.editorMode !== EditorMode.DESIGN && !windowSelected && 'hidden',
                )}
            >
                {getPanel()}
            </div>
        </DropdownManagerProvider>
    );
});
