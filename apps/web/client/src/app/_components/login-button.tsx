import { transKeys } from '@/i18n/keys';
import { SignInMethod } from '@fluxly/models/auth';
import { Button } from '@fluxly/ui/button';
import { Icons } from '@fluxly/ui/icons';
import { cn } from '@fluxly/ui/utils';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useAuthContext } from '../auth/auth-context';

interface LoginButtonProps {
    className?: string;
    returnUrl?: string | null;
    method: SignInMethod.GITHUB | SignInMethod.GOOGLE;
    icon: React.ReactNode;
    translationKey: keyof typeof transKeys.welcome.login;
    providerName: string;
}

export const LoginButton = ({
    className,
    returnUrl,
    method,
    icon,
    translationKey,
    providerName,
}: LoginButtonProps) => {
    const t = useTranslations();
    const { lastSignInMethod, handleLogin, signingInMethod } = useAuthContext();
    const isLastSignInMethod = lastSignInMethod === method;
    const isSigningIn = signingInMethod === method;

    const handleLoginClick = async () => {
        try {
            await handleLogin(method, returnUrl ?? null);
        } catch (error) {
            console.error(`Error signing in with ${providerName}:`, error);
            toast.error(`Error signing in with ${providerName}`, {
                description: error instanceof Error ? error.message : 'Please try again.',
            });
        }
    };

    return (
        <div className={cn('flex flex-col items-center w-full', className)}>
            <Button
                variant="outline"
                className="w-full items-center justify-center text-active text-small bg-background-fluxly"
                onClick={handleLoginClick}
                disabled={!!signingInMethod}
            >
                {isSigningIn ? (
                    <Icons.LoadingSpinner className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                    icon
                )}
                {t(transKeys.welcome.login[translationKey])}
            </Button>
        </div>
    );
};


export const DevLoginButton = ({
    className,
    returnUrl,
}: {
    className?: string;
    returnUrl: string | null;
}) => {
    const t = useTranslations();
    const { handleDevLogin, signingInMethod } = useAuthContext();
    const isSigningIn = signingInMethod === SignInMethod.DEV;

    return (
        <Button
            variant="outline"
            className="w-full text-active text-small"
            onClick={() => handleDevLogin(returnUrl)}
            disabled={!!signingInMethod}
        >
            {isSigningIn ? (
                <Icons.LoadingSpinner className="w-4 h-4 mr-2 animate-spin" />
            ) : 'DEV MODE: Sign in as demo user'}
        </Button>
    )
}