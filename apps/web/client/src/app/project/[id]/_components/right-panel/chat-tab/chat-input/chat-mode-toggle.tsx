import { ChatType } from '@fluxly/models';
import { Button } from '@fluxly/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@fluxly/ui/dropdown-menu';
import { Icons } from '@fluxly/ui/icons';
import { HoverOnlyTooltip } from '../../../editor-bar/hover-tooltip';
import { cn } from '@fluxly/ui/utils';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

interface ChatModeToggleProps {
    chatMode: ChatType;
    onChatModeChange: (mode: ChatType) => void;
    disabled?: boolean;
}

export const ChatModeToggle = observer(({ chatMode, onChatModeChange, disabled = false }: ChatModeToggleProps) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpenMenu = () => {
            setIsOpen(true);
        };

        window.addEventListener('open-chat-mode-menu', handleOpenMenu);
        return () => window.removeEventListener('open-chat-mode-menu', handleOpenMenu);
    }, []);

        const getCurrentModeIcon = () => {
            return chatMode === ChatType.EDIT ? Icons.Build : Icons.Ask;
        };

        const getCurrentModeLabel = () => {
            return chatMode === ChatType.EDIT ? 'Build' : 'Ask';
        };

        const Icon = getCurrentModeIcon();

        return (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <HoverOnlyTooltip
                        className='mb-1'
                        content={
                            <span>
                                Open mode menu
                            </span>
                        }
                        side="top"
                        hideArrow
                    >
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={disabled}
                            className={cn(
                                'h-8 px-2 text-foreground-fluxly group flex items-center gap-1.5',
                                disabled && 'opacity-50 cursor-not-allowed'
                            )}
                        >
                            <Icon
                                className={cn(
                                    'w-4 h-4',
                                    disabled
                                        ? 'text-foreground-tertiary'
                                        : chatMode === ChatType.ASK
                                            ? 'text-blue-200'
                                            : 'text-foreground-secondary group-hover:text-foreground'
                                )}
                            />
                            <span className={cn(
                                "text-xs font-medium",
                                chatMode === ChatType.ASK && "text-blue-200"
                            )}>
                                {getCurrentModeLabel()}
                            </span>
                        </Button>
                    </HoverOnlyTooltip>
                </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
                <DropdownMenuItem
                    onClick={() => onChatModeChange(ChatType.EDIT)}
                    className={cn(
                        'flex items-center gap-2 px-3 py-2',
                        chatMode === ChatType.EDIT && 'bg-background-fluxly'
                    )}
                >
                    <Icons.Build className="w-4 h-4" />
                    <span>Build</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onChatModeChange(ChatType.ASK)}
                    className={cn(
                        'flex items-center gap-2 px-3 py-2',
                        chatMode === ChatType.ASK && 'bg-background-fluxly'
                    )}
                >
                    <Icons.Ask className="w-4 h-4" />
                    <span>Ask</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}); 