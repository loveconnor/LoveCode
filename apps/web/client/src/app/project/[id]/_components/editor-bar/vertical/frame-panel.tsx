'use client';

import { useEditorEngine } from '@/components/store/editor';
import { observer } from 'mobx-react-lite';
import { DeviceSelector } from '../frame-selected/device-selector';
import { RotateGroup } from '../frame-selected/rotate-group';
import { ThemeGroup } from '../frame-selected/theme-group';
import { WindowActionsGroup } from '../frame-selected/window-actions-group';

export const FramePanel = observer(() => {
    const editorEngine = useEditorEngine();
    const frameData = editorEngine.frames.selected[0];

    if (!frameData) return null;

    return (
        <div className="flex flex-col gap-6 w-full [&_button]:min-w-0 [&_button]:w-full [&_button_input[type=number]]:!w-auto [&_button_input[type=number]]:!min-w-[3.5rem]">
            <div className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold text-foreground-primary uppercase tracking-wide px-1">Device</h3>
                <DeviceSelector />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold text-foreground-primary uppercase tracking-wide px-1">Orientation</h3>
                <div className="flex items-center justify-start">
                    <RotateGroup frameData={frameData} />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold text-foreground-primary uppercase tracking-wide px-1">Theme</h3>
                <div className="flex items-center justify-start">
                    <ThemeGroup frameData={frameData} />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold text-foreground-primary uppercase tracking-wide px-1">Actions</h3>
                <div className="flex items-center justify-start">
                    <WindowActionsGroup frameData={frameData} />
                </div>
            </div>
        </div>
    );
});
