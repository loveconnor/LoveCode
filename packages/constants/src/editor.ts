import { Orientation, Theme } from './frame';

export const APP_NAME = 'Fluxly';
export const APP_SCHEMA = 'fluxly';
export const HOSTING_DOMAIN = 'fluxly.live';
export const MAX_NAME_LENGTH = 50;
export enum EditorAttributes {
    // DOM attributes
    ONLOOK_TOOLBAR = 'fluxly-toolbar',
    ONLOOK_RECT_ID = 'fluxly-rect',
    ONLOOK_STYLESHEET_ID = 'fluxly-stylesheet',
    ONLOOK_STUB_ID = 'fluxly-drag-stub',
    ONLOOK_MOVE_KEY_PREFIX = 'olk-',
    OVERLAY_CONTAINER_ID = 'overlay-container',
    CANVAS_CONTAINER_ID = 'canvas-container',
    STYLESHEET_ID = 'fluxly-default-stylesheet',

    // IDs
    DATA_ONLOOK_ID = 'data-oid',
    DATA_ONLOOK_INSTANCE_ID = 'data-oiid',
    DATA_ONLOOK_DOM_ID = 'data-odid',
    DATA_ONLOOK_COMPONENT_NAME = 'data-ocname',

    // Data attributes
    DATA_ONLOOK_IGNORE = 'data-fluxly-ignore',
    DATA_ONLOOK_INSERTED = 'data-fluxly-inserted',
    DATA_ONLOOK_DRAG_SAVED_STYLE = 'data-fluxly-drag-saved-style',
    DATA_ONLOOK_DRAGGING = 'data-fluxly-dragging',
    DATA_ONLOOK_DRAG_DIRECTION = 'data-fluxly-drag-direction',
    DATA_ONLOOK_DRAG_START_POSITION = 'data-fluxly-drag-start-position',
    DATA_ONLOOK_NEW_INDEX = 'data-fluxly-new-index',
    DATA_ONLOOK_EDITING_TEXT = 'data-fluxly-editing-text',
    DATA_ONLOOK_DYNAMIC_TYPE = 'data-fluxly-dynamic-type',
    DATA_ONLOOK_CORE_ELEMENT_TYPE = 'data-fluxly-core-element-type',
}

export const DefaultSettings = {
    SCALE: 0.7,
    PAN_POSITION: { x: 175, y: 100 },
    URL: 'http://localhost:3000/',
    ASPECT_RATIO_LOCKED: false,
    DEVICE: 'Custom:Custom',
    THEME: Theme.System,
    ORIENTATION: Orientation.Portrait,
    MIN_DIMENSIONS: { width: '280px', height: '360px' },
    COMMANDS: {
        run: 'bun run dev',
        build: 'bun run build',
        install: 'bun install',
    },
    IMAGE_FOLDER: 'public',
    IMAGE_DIMENSION: { width: '100px', height: '100px' },
    FONT_FOLDER: 'fonts',
    FONT_CONFIG: 'app/fonts.ts',
    TAILWIND_CONFIG: 'tailwind.config.ts',
    CHAT_SETTINGS: {
        showSuggestions: true,
        autoApplyCode: true,
        expandCodeBlocks: false,
        showMiniChat: false,
        maxImages: 5,
    },
    EDITOR_SETTINGS: {
        shouldWarnDelete: false,
        enableBunReplace: true,
        buildFlags: '--no-lint',
    },
};

export const DEFAULT_COLOR_NAME = 'DEFAULT';
