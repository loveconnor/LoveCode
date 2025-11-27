import { Button } from '@fluxly/ui/button';
import { Icons } from '@fluxly/ui/icons';
import { Input } from '@fluxly/ui/input';
import { toast } from '@fluxly/ui/sonner';
import { getValidUrl } from '@fluxly/utility';
import Link from 'next/link';
import { useState } from 'react';

export const UrlSection = ({ url, isCopyable }: { url: string, isCopyable: boolean }) => {
    const [isCopied, setIsCopied] = useState(false);
    const validUrl = getValidUrl(url);

    const copyUrl = () => {
        if (!validUrl) return;
        navigator.clipboard.writeText(validUrl);
        toast.success('Copied to clipboard');
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    return (
        <div className="flex flex-row items-center justify-between gap-2">
            <Input className="bg-background-secondary w-full text-xs" value={url || ''} readOnly />
            {isCopyable ? (
                <Button onClick={copyUrl} variant="outline" size="icon" disabled={!validUrl}>
                    {isCopied ? <Icons.Check className="h-4 w-4" /> : <Icons.Copy className="h-4 w-4" />}
                </Button>
            ) : (
                <Link href={validUrl || '#'} target="_blank" className="text-sm">
                    <Button variant="outline" size="icon" disabled={!validUrl}>
                        <Icons.ExternalLink className="h-4 w-4" />
                    </Button>
                </Link>
            )}
        </div>
    );
};
