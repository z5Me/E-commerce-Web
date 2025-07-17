
const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 bg-black/30 z-[9999] pointer-events-auto cursor-wait grid place-items-center">
            <div className="loaderSpinner" />
        </div>
    )
}

export default LoadingScreen