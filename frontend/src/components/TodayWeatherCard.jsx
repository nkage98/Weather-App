function TodayWeatherCard (){

    return(
        <div className="justify-center items-center bg-gray-100 h-72 w-3xl rounded-[20px] p-[3px] border-gray-400 [box-shadow:inset_0_4px_8px_rgba(0,0,0,0.15)]">
            <div className="p-2 h-70 items-center bg-white rounded-[18px] shadow-md grid grid-cols-2 ">
                <div className="font-semibold">
                    <p>30 graus asudhaushd
                    </p>
                </div>
                <div className="">
                    <p>detalhes</p>
                </div>
                
            </div>
            
        </div>

    )
}

export default TodayWeatherCard