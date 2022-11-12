import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


export const useDefaultLocale = () => {
    const router = useRouter();
    

    useEffect(() => {
        if (router.locale === router.defaultLocale) {
            router.push(`/${router.locale}${router.asPath}`, undefined, {
                locale: false,
                shallow: true // Optionally add this if you don't want to rerun data fetching methods
            });
        }
    }, [router, router.asPath]);
};
