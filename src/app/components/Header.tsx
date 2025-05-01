import Image from "next/image"

export const Header = () =>{
    return(
        <header>
            <div className="bg-[#2b27a0] flex items-center justify-between p-3 px-6">
                <Image src={"/logo.png"} alt={"Logo da Dom Marcelo"} width={80} height={80}></Image>
            </div>
        </header>
    )
}