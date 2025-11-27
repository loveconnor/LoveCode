'use client';

import { Routes } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthRedirect() {
    const router = useRouter();

    useEffect(() => {
        // Always redirect to projects dashboard after successful auth
        router.replace(Routes.PROJECTS);
    }, [router]);

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-semibold mb-4">Redirecting...</h1>
                <p className="text-foreground-secondary">Please wait while we redirect you back.</p>
            </div>
        </div>
    );
} 