'use client';

import { useEditorEngine } from '@/components/store/editor';
import { transKeys } from '@/i18n/keys';
import { Icons } from '@fluxly/ui/icons/index';
import { ResizablePanel } from '@fluxly/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@fluxly/ui/tabs';
import { observer } from 'mobx-react-lite';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { EditorBar } from '../editor-bar';
import { ChatTab } from './chat-tab';
import { ChatControls } from './chat-tab/controls';
import { ChatHistory } from './chat-tab/history';
import { ChatPanelDropdown } from './chat-tab/panel-dropdown';

export const RightPanel = observer(() => {
    const editorEngine = useEditorEngine();
    const t = useTranslations();
    const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(false);
    const currentConversation = editorEngine.chat.conversation.current;
    const editPanelWidth = 352;
    const [activeTab, setActiveTab] = useState('chat');

    useEffect(() => {
        if (editorEngine.elements.selected.length > 0) {
            setActiveTab('design');
        }
    }, [editorEngine.elements.selected.length]);

    return (
        <div
            className='flex h-full w-full transition-width duration-300 bg-background/95 group/panel border-[0.5px] backdrop-blur-xl shadow rounded-tl-xl'
        >
            <ResizablePanel
                side="right"
                defaultWidth={editPanelWidth}
                forceWidth={editPanelWidth}
                minWidth={240}
                maxWidth={500}
            >
                <Tabs value={activeTab} onValueChange={setActiveTab} className='flex flex-col h-full'>
                    <div className="flex flex-row p-1 w-full h-10 border-b border-border items-center">
                        <TabsList variant="underline" className="h-full">
                            <TabsTrigger value="design" className="h-8 px-3">
                                <Icons.PaintBucket className="h-4 w-4" />
                                Design
                            </TabsTrigger>
                            <TabsTrigger value="chat" className="h-8 px-3">
                                <Icons.Sparkles className="h-4 w-4" />
                                Chat
                            </TabsTrigger>
                        </TabsList>
                        {activeTab === 'chat' && (
                            <div className='ml-auto flex items-center gap-1'>
                                <ChatPanelDropdown
                                    isChatHistoryOpen={isChatHistoryOpen}
                                    setIsChatHistoryOpen={setIsChatHistoryOpen}
                                >
                                    <div className="flex items-center gap-1 bg-transparent p-1 px-2 text-xs text-foreground-secondary hover:text-foreground-primary cursor-pointer group">
                                        <Icons.ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-foreground-primary" />
                                    </div>
                                </ChatPanelDropdown>
                                <ChatControls />
                            </div>
                        )}
                    </div>

                    <TabsContent value="design" className='flex-1 overflow-y-auto p-4'>
                        <div className='flex flex-col gap-4'>
                            <EditorBar />
                        </div>
                    </TabsContent>

                    <TabsContent value="chat" className='flex-1 flex flex-col overflow-hidden'>
                        <ChatHistory isOpen={isChatHistoryOpen} onOpenChange={setIsChatHistoryOpen} />
                        <div className='flex-1 overflow-y-auto'>
                            {currentConversation && (
                                <ChatTab
                                    conversationId={currentConversation.id}
                                    projectId={editorEngine.projectId}
                                />
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </ResizablePanel >
        </div >
    );
});
