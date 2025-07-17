import React, { Suspense } from 'react';

const Player = React.lazy(() =>
    import('@lottiefiles/react-lottie-player').then((mod) => ({
        default: mod.Player,
    }))
);

const LazyLottiePlayer = (props: React.ComponentProps<typeof Player>) => {
    return (
        <Suspense fallback={<div>Đang tải animation...</div>}>
            <Player {...props} />
        </Suspense>
    );
};

export default LazyLottiePlayer;
