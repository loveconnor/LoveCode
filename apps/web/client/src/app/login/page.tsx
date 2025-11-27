'use client';

import { transKeys } from '@/i18n/keys';
import { LocalForageKeys, Routes } from '@/utils/constants';
import { SignInMethod } from '@fluxly/models/auth';
import { Icons } from '@fluxly/ui/icons';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LoginButton } from '../_components/login-button';

export default function LoginPage() {
    const t = useTranslations();
    const returnUrl = useSearchParams().get(LocalForageKeys.RETURN_URL);

    return (
        <div className="flex h-screen w-screen items-center justify-center relative">
            <div className="flex flex-col items-center w-full max-w-md p-8 space-y-8">
                <div className="flex items-center space-x-2">
                    <Link href={Routes.HOME} className="flex items-center gap-2 hover:opacity-80 transition-opacity font-medium">
                        <Icons.FluxlyLogo className="w-6 h-6" />
                        <span>Fluxly</span>
                    </Link>
                </div>
                <div className="space-y-8 w-full text-center">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-semibold leading-tight">
                            {t(transKeys.welcome.title)}
                        </h1>
                        <p className="text-muted-foreground text-base">
                            {t(transKeys.welcome.description)}
                        </p>
                    </div>
                    <div className="space-y-3 flex flex-col w-full">
                        <LoginButton
                            returnUrl={returnUrl}
                            method={SignInMethod.GITHUB}
                            icon={<Icons.GitHubLogo className="w-4 h-4 mr-2" />}
                            translationKey="github"
                            providerName="GitHub"
                        />
                        <LoginButton
                            returnUrl={returnUrl}
                            method={SignInMethod.GOOGLE}
                            icon={<Icons.GoogleLogo viewBox="0 0 24 24" className="w-4 h-4 mr-2" />}
                            translationKey="google"
                            providerName="Google"
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {t(transKeys.welcome.terms.agreement)}{' '}
                        <Link
                            href="https://fluxly.com/privacy-policy"
                            target="_blank"
                            className="hover:text-foreground underline transition-colors duration-200"
                        >
                            {t(transKeys.welcome.terms.privacy)}
                        </Link>
                        {' '}
                        {t(transKeys.welcome.terms.and)}{' '}
                        <Link
                            href="https://fluxly.com/terms-of-service"
                            target="_blank"
                            className="hover:text-foreground underline transition-colors duration-200"
                        >
                            {t(transKeys.welcome.terms.tos)}
                        </Link>
                    </p>
                </div>
            </div>
            <div className="absolute bottom-8 text-xs text-muted-foreground">
                <p>{t(transKeys.welcome.version, { version: '1.0.0' })}</p>
            </div>
        </div>
    );
}
