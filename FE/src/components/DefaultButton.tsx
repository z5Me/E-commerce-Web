
const DefaultButton = ({ title, classNameButton, classNameText }: { title: string, classNameButton?: string, classNameText?: string }) => {
    return (
        <button className={`px-[54px] py-4 rounded-full ${classNameButton}`}>
            <p className={`font-Satoshi font-medium lg:text-base text-sm ${classNameText}`}>
                {title}
            </p>
        </button >
    )
}

export default DefaultButton