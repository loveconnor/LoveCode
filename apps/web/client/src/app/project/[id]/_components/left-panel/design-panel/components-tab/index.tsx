import { useEditorEngine } from '@/components/store/editor';
import { InsertMode } from '@fluxly/models';
import { Icons } from '@fluxly/ui/icons';
import { cn } from '@fluxly/ui/utils';
import { observer } from 'mobx-react-lite';

const COMPONENTS = [
    {
        label: 'Div',
        icon: <Icons.Square className="w-4 h-4" />,
        mode: InsertMode.INSERT_DIV,
    },
    {
        label: 'Text',
        icon: <Icons.Text className="w-4 h-4" />,
        mode: InsertMode.INSERT_TEXT,
    },
    {
        label: 'Image',
        icon: <Icons.Image className="w-4 h-4" />,
        mode: InsertMode.INSERT_IMAGE,
    },
];

export const ComponentsTab = observer(() => {
    const editorEngine = useEditorEngine();

    const handleDragStart = (e: React.DragEvent, mode: InsertMode) => {
        e.dataTransfer.setData('fluxly/insert-mode', mode);
        e.dataTransfer.setData('text/plain', mode);
        e.dataTransfer.effectAllowed = 'copy';
        editorEngine.state.insertMode = mode;
    };

    const handleDragEnd = () => {
        editorEngine.state.insertMode = null;
        editorEngine.overlay.state.updateInsertFeedback(null);
    };

    return (
        <div className="flex flex-col h-full w-full bg-background">
            <div className="p-4 border-b border-border">
                <h2 className="text-sm font-medium text-foreground">Components</h2>
                <p className="text-xs text-muted-foreground mt-1">
                    Drag and drop components onto the canvas
                </p>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-2 gap-2">
                    {COMPONENTS.map((component) => (
                        <div
                            key={component.label}
                            draggable
                            onDragStart={(e) => handleDragStart(e, component.mode)}
                            onDragEnd={handleDragEnd}
                            className={cn(
                                "flex flex-col items-center justify-center p-4 rounded-md border border-border bg-card hover:bg-accent hover:text-accent-foreground cursor-grab active:cursor-grabbing transition-colors",
                            )}
                        >
                            <div className="mb-2 text-muted-foreground">
                                {component.icon}
                            </div>
                            <span className="text-xs font-medium">{component.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});
