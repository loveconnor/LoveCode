import type { RectDimensions } from '@fluxly/models';
import { observer } from 'mobx-react-lite';

export const InsertFeedback = observer(({ rect }: { rect: RectDimensions }) => {
    return (
        <div
            className="absolute bg-blue-500 pointer-events-none z-50 transition-all duration-75 ease-out"
            style={{
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                boxShadow: '0 0 4px 1px rgba(59, 130, 246, 0.5)',
            }}
        />
    );
});
