import { useEditorEngine } from '@/components/store/editor';
import type { FrameData } from '@/components/store/editor/frames';
import { getRelativeMousePositionToFrameView, adaptRectToCanvas } from '@/components/store/editor/overlay/utils';
import type { DomElement, ElementPosition, Frame } from '@fluxly/models';
import { EditorMode, InsertMode, MouseAction } from '@fluxly/models';
import { toast } from '@fluxly/ui/sonner';
import { cn } from '@fluxly/ui/utils';
import throttle from 'lodash/throttle';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo } from 'react';
import { RightClickMenu } from '../../right-click-menu';

export const GestureScreen = observer(({ frame, isResizing }: { frame: Frame, isResizing: boolean }) => {
    const editorEngine = useEditorEngine();

    const getFrameData: () => FrameData | null = useCallback(() => {
        return editorEngine.frames.get(frame.id);
    }, [editorEngine.frames, frame.id]);

    const getRelativeMousePosition = useCallback(
        (e: React.MouseEvent<HTMLDivElement>): ElementPosition => {
            const frameData = getFrameData();
            if (!frameData?.view) {
                return { x: 0, y: 0 };
            }
            return getRelativeMousePositionToFrameView(e, frameData.view);
        },
        [getFrameData],
    );

    const handleMouseEvent = useCallback(
        async (e: React.MouseEvent<HTMLDivElement>, action: MouseAction) => {
            try {
                const frameData = getFrameData();
                if (!frameData?.view?.getElementAtLoc) {
                    // Frame view not fully initialized yet
                    return;
                }
                const pos = getRelativeMousePosition(e);

                if (action === MouseAction.MOVE && editorEngine.state.insertMode) {
                    const feedback = await frameData.view.getInsertFeedbackRect(pos.x, pos.y);
                    if (feedback) {
                        const adjustedRect = adaptRectToCanvas(feedback.rect, frameData.view);
                        editorEngine.overlay.state.updateInsertFeedback(adjustedRect);

                        const targetEl = await frameData.view.getElementByDomId(
                            feedback.targetId,
                            false,
                        );
                        if (targetEl) {
                            editorEngine.elements.mouseover(targetEl);
                        }
                    } else {
                        editorEngine.overlay.state.updateInsertFeedback(null);
                        editorEngine.elements.clearHoveredElement();
                    }

                    if (e.altKey) {
                        if (editorEngine.state.insertMode !== InsertMode.INSERT_IMAGE) {
                            editorEngine.overlay.showMeasurement();
                        }
                    } else {
                        editorEngine.overlay.removeMeasurement();
                    }
                    return;
                }

                const shouldGetStyle = [MouseAction.MOUSE_DOWN, MouseAction.DOUBLE_CLICK].includes(
                    action,
                );
                const el: DomElement | null = await frameData.view.getElementAtLoc(
                    pos.x,
                    pos.y,
                    shouldGetStyle,
                );
                if (!el) {
                    editorEngine.elements.clearHoveredElement();
                    editorEngine.overlay.state.removeHoverRect();
                    return;
                }

                switch (action) {
                    case MouseAction.MOVE:
                        editorEngine.elements.mouseover(el);

                        if (e.altKey) {
                            if (editorEngine.state.insertMode !== InsertMode.INSERT_IMAGE) {
                                editorEngine.overlay.showMeasurement();
                            }
                        } else {
                            editorEngine.overlay.removeMeasurement();
                        }
                        break;
                    case MouseAction.MOUSE_DOWN:
                        if (el.tagName.toLocaleLowerCase() === 'body') {
                            editorEngine.frames.select([frame], e.shiftKey);
                            return;
                        }
                        // Ignore right-clicks
                        if (e.button == 2) {
                            break;
                        }
                        if (editorEngine.text.isEditing) {
                            await editorEngine.text.end();
                        }
                        if (e.shiftKey) {
                            editorEngine.elements.shiftClick(el);
                        } else {
                            editorEngine.elements.click([el]);
                        }
                        break;
                    case MouseAction.DOUBLE_CLICK:
                        if (el.oid) {
                            editorEngine.ide.openCodeBlock(el.oid);
                        } else {
                            toast.error('Cannot find element in code panel');
                            return;
                        }
                        break;
                }
            } catch (error) {
                console.error('Error handling mouse event:', error);
                return;
            }
        },
        [getRelativeMousePosition, editorEngine],
    );

    const throttledMouseMove = useMemo(() =>
        throttle(async (e: React.MouseEvent<HTMLDivElement>) => {
            // Skip hover events during drag selection
            if (editorEngine.state.isDragSelecting) {
                return;
            }
            if (
                editorEngine.state.editorMode === EditorMode.DESIGN ||
                editorEngine.state.editorMode === EditorMode.CODE ||
                ((editorEngine.state.insertMode === InsertMode.INSERT_DIV ||
                    editorEngine.state.insertMode === InsertMode.INSERT_TEXT ||
                    editorEngine.state.insertMode === InsertMode.INSERT_IMAGE) &&
                    !editorEngine.insert.isDrawing)
            ) {
                await handleMouseEvent(e, MouseAction.MOVE);
            } else if (editorEngine.insert.isDrawing) {
                editorEngine.insert.draw(e);
            }
        }, 16),
        [editorEngine.state.isDragSelecting, editorEngine.state.editorMode, editorEngine.insert.isDrawing, getRelativeMousePosition, handleMouseEvent],
    );

    const throttledDragOver = useMemo(() =>
        throttle(async (e: React.DragEvent<HTMLDivElement>) => {
            await handleMouseEvent(e, MouseAction.MOVE);
        }, 16),
        [handleMouseEvent]
    );

    useEffect(() => {
        return () => {
            throttledMouseMove.cancel();
            throttledDragOver.cancel();
        };
    }, [throttledMouseMove, throttledDragOver]);

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            editorEngine.frames.select([frame]);
        },
        [editorEngine.frames],
    );

    async function handleDoubleClick(e: React.MouseEvent<HTMLDivElement>) {
        if (editorEngine.state.editorMode === EditorMode.PREVIEW) {
            return;
        }
        await handleMouseEvent(e, MouseAction.DOUBLE_CLICK);
    }

    async function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
        if (editorEngine.state.editorMode === EditorMode.DESIGN || editorEngine.state.editorMode === EditorMode.CODE) {
            await handleMouseEvent(e, MouseAction.MOUSE_DOWN);
        } else if (
            editorEngine.state.insertMode === InsertMode.INSERT_DIV ||
            editorEngine.state.insertMode === InsertMode.INSERT_TEXT ||
            editorEngine.state.insertMode === InsertMode.INSERT_IMAGE
        ) {
            editorEngine.insert.start(e);
        }
    }

    async function handleMouseUp(e: React.MouseEvent<HTMLDivElement>) {
        const frameData = getFrameData();
        if (!frameData) {
            return;
        }

        await editorEngine.insert.end(e, frameData.view);
    }

    const isInsertMode = (value: string | null): value is InsertMode => {
        return (
            value === InsertMode.INSERT_DIV ||
            value === InsertMode.INSERT_TEXT ||
            value === InsertMode.INSERT_IMAGE
        );
    };

    const syncInsertModeFromDataTransfer = (e: React.DragEvent<HTMLDivElement>) => {
        const dragInsertMode =
            (e.dataTransfer.getData('fluxly/insert-mode') as InsertMode) ||
            (e.dataTransfer.getData('text/plain') as InsertMode);

        if (isInsertMode(dragInsertMode) && editorEngine.state.insertMode !== dragInsertMode) {
            editorEngine.state.insertMode = dragInsertMode;
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        syncInsertModeFromDataTransfer(e);
        e.dataTransfer.dropEffect = 'copy';
        e.persist();
        throttledDragOver(e);
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        syncInsertModeFromDataTransfer(e);
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        editorEngine.overlay.state.updateInsertFeedback(null);

        const insertMode = (e.dataTransfer.getData('fluxly/insert-mode') as InsertMode) || 
            (e.dataTransfer.getData('text/plain') as InsertMode) || 
            editorEngine.state.insertMode;
        if (insertMode) {
            const frameData = getFrameData();
            if (frameData?.view) {
                await editorEngine.insert.drop(e, frameData.view, insertMode);
            }
            return;
        }

        try {
            const propertiesData = e.dataTransfer.getData('application/json');
            if (!propertiesData) {
                throw new Error('No element properties in drag data');
            }

            const properties = JSON.parse(propertiesData);

            if (properties.type === 'image') {
                const frameData = editorEngine.frames.get(frame.id);
                if (!frameData) {
                    throw new Error('Frame data not found');
                }
                const dropPosition = getRelativeMousePosition(e);
                await editorEngine.insert.insertDroppedImage(frameData, dropPosition, properties, e.altKey);
            } else {
                const frameData = editorEngine.frames.get(frame.id);
                if (!frameData) {
                    throw new Error('Frame data not found');
                }
                const dropPosition = getRelativeMousePosition(e);
                await editorEngine.insert.insertDroppedElement(frameData, dropPosition, properties);
            }

            editorEngine.state.editorMode = EditorMode.DESIGN;
            editorEngine.state.insertMode = null;
        } catch (error) {
            console.error('drop operation failed:', error);
            toast.error('Failed to drop element', {
                description: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    };

    const gestureScreenClassName = useMemo(() => {
        return cn(
            'absolute inset-0 bg-transparent z-50 w-full h-full',
            editorEngine.state.editorMode === EditorMode.PREVIEW && !isResizing
                ? 'hidden'
                : 'block',
            editorEngine.state.insertMode === InsertMode.INSERT_DIV && 'cursor-crosshair',
            editorEngine.state.insertMode === InsertMode.INSERT_TEXT && 'cursor-text',
        );
    }, [editorEngine.state.editorMode, editorEngine.state.insertMode, isResizing]);

    const handleMouseOut = () => {
        editorEngine.elements.clearHoveredElement();
        editorEngine.overlay.state.removeHoverRect();
        editorEngine.overlay.state.updateInsertFeedback(null);
    };

    return (
        <RightClickMenu>
            <div
                className={gestureScreenClassName}
                onClick={handleClick}
                onMouseOut={handleMouseOut}
                onMouseLeave={handleMouseUp}
                onMouseMove={throttledMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onDoubleClick={handleDoubleClick}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleMouseOut}
                onDrop={handleDrop}
            ></div>
        </RightClickMenu>
    );
});
