import { ReactLenis } from 'lenis/react';

function SmoothScrolling({
    children,
    isLenisEnabled,
}: {
    children: React.ReactNode;
    isLenisEnabled: boolean;
}) {
    return (
        <>
            {isLenisEnabled ? (
                <ReactLenis
                    root
                    options={{ lerp: 0.15 }}
                >
                    {children}
                </ReactLenis>
            ) : (
                children
            )}
        </>
    );
}

export default SmoothScrolling;
