
const DefaultButton = ({ title, classNameButton, classNameText, onClick }: { title: string, classNameButton?: string, classNameText?: string, onClick?: () => void }) => {
    return (
        <button
            onClick={onClick}
            className={`px-[54px] py-4 rounded-full ${classNameButton}`}
        >
            <p className={`font-Satoshi font-medium lg:text-base text-sm ${classNameText}`}>
                {title}
            </p>
        </button >
    )
}

export default DefaultButton