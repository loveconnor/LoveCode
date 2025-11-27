'use client';

import { Routes } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Main() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to login page
        router.replace(Routes.LOGIN);
    }, [router]);

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-semibold mb-4">Redirecting to login...</h1>
            </div>
        </div>
    );
}
