import type { FileEntry } from '@fluxly/file-system/hooks';
import { cn } from '@fluxly/ui/utils';
import type { RowRendererProps } from 'react-arborist';

export const FileTreeRow = ({ attrs, children, isHighlighted }: RowRendererProps<FileEntry> & { isHighlighted: boolean }) => {
    return (
        <div
            {...attrs}
            className={cn(
                'outline-none h-6 cursor-pointer min-w-0 w-auto rounded',
                attrs['aria-selected'] ? [
                    'bg-red-500/90 dark:bg-red-500/90',
                    'text-primary dark:text-primary',
                ] : [
                    isHighlighted && 'bg-background-fluxly text-foreground-primary',
                ],
                isHighlighted ?
                    'text-foreground-primary bg-red-500/90 hover:bg-red-500' :
                    'text-foreground-fluxly/70 hover:bg-red-500/30 hover:text-foreground-primary'
            )}
        >
            {children}
        </div>
    );
};
