
const Categories = () => {
    return (
        <>
            <section className='CATEGORY pt-[80px] flex justify-center'>
                <div className="w-full max-w-[1920px] defaultPadding">
                    <div className='bg-[#F0F0F0] lg:px-[64px] px-6 lg:pt-[76px] pt-10 lg:pb-[76px] pb-[27px] rounded-[40px] flex flex-col lg:gap-y-[64px] gap-y-7'>
                        <p className='uppercase lg:text-5xl text-3xl font-bold font-IntegralCF text-center'>BROWSE BY dress STYLE</p>
                        <div className="grid lg:grid-cols-6 grid-cols-1 lg:grid-rows-2 grid-rows-none lg:gap-5 gap-4 *:rounded-[20px]">
                            <div className='lg:col-span-2 col-span-4 w-full lg:min-h-[298px] min-h-[190px] lg:max-h-[298px] max-h-[190px] bg-white'></div>
                            <div className="w-full lg:min-h-[298px] min-h-[190px] lg:max-h-[298px] max-h-[190px] col-span-4 bg-white"></div>
                            <div className="col-span-4 w-full lg:min-h-[298px] min-h-[190px] lg:max-h-[298px] max-h-[190px] bg-white"></div>
                            <div className="w-full lg:min-h-[298px] min-h-[190px] lg:max-h-[298px] max-h-[190px] lg:col-span-2 col-span-4 bg-white"></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Categories