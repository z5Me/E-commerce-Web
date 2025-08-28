
const DefaultButton = ({ title, classNameButton, classNameText, onClick, disabled }: { title: string, classNameButton?: string, classNameText?: string, onClick?: () => void, disabled?: boolean }) => {
    return (
        <button
            onClick={onClick}
            className={`px-[54px] py-4 rounded-full flex justify-center ${classNameButton} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={disabled}
        >
            {!disabled
                ?
                <p className={`font-MJSatoshi font-medium lg:text-base text-sm ${classNameText}`}>
                    {title}
                </p>
                :
                <div className="loaderAddToCart" />
            }
        </button >
    )
}

export default DefaultButton