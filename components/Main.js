import {FaFacebookF} from 'react-icons/fa';
import {BsInstagram,BsTwitter,BsGoogle} from 'react-icons/bs';
import {FiArrowUpRight} from 'react-icons/fi';
import {motion} from 'framer-motion';

export default function Main() {
	// body...

	return (
		<div className="min-h-screen scroll-smooth w-full md:pt-[140px] pt-[120px] mx-auto bg-[#ebebeb]">
			<div className="h-full max-w-6xl mx-auto">
				<div className="flex md:flex-row flex-col">
					<div className="md:w-[50%] w-full px-5 py-3 flex flex-col">
						<div className="flex w-full gap-1 items-center">
							<div className="h-1 w-10 bg-black"/>
							<h1 className="text-gray-900 text-md font-semibold ">
								LifiMania
							</h1>
						</div>
						<motion.div 
						initial={{
							opacity:0
						}}
						whileInView={{
							opacity:1
						}}
						transition={{
							duration:1
						}}
						className="w-full mt-5 ">
							<h1 className="md:text-6xl text-5xl font-semibold">
								LIFI INTER HOSPITAL DATA TRANSFER
							</h1>
							<h1 className="text-lg text-gray-600 mt-7 font-bold">
								Empowering seamless hospital <span className="text-gray-900 font-bold">data transfer</span> with the <span className="text-gray-900">unbeatable security</span> of LiFi technology and ESP32 web servers.
							</h1>
						</motion.div>
						<motion.div 
						initial={{
							opacity:0,
							y:60
						}}
						whileInView={{
							opacity:1,
							y:0
						}}
						transition={{
							duration:1
						}}
						className="mt-7 flex gap-5">
							<button className="bg-[#fafe28] px-4 py-3 text-black flex gap-2 items-center shadow-xl hover:scale-105
							cursor-pointer transition-all duration-100 ease-in font-bold">Concept<FiArrowUpRight className="h-5 w-5"/></button>
							<button className="px-4 py-3 text-black font-bold hover:scale-105 transition-all duration-100 ease-in">Watch Patients</button>
						</motion.div>
					</div>
					<div className="md:w-[50%] md:mt-0 mt-5 w-full px-5 py-3 relative z-0">
						<img className="h-full w-full shadow-xl shadow-black rounded-xl z-1" alt="" src="/Li-Fi-technology.jpg"/>
						<img className="absolute md:-right-10 right-2 bottom-0 w-[100px] z-1" src="/lifi2.png" alt=""/>
					</div>
				</div>
				<div className="flex md:flex-row flex-col mt-14">
					<div className="md:w-[50%] gap-5 w-full px-5 py-3 flex flex-row items-center">
						<motion.div 
						initial={{
							opacity:0
						}}
						whileInView={{
							opacity:1
						}}
						transition={{
							duration:1
						}}
						className="bg-[#1f1f1f] w-[50%] p-4 flex flex-col">
							<h1 className="text-2xl text-white font-bold">1,20,120</h1>
							<h1 className="text-gray-300 mt-2 font-semibold text-md">Total Patients Data</h1>
						</motion.div>
						<motion.div 
						initial={{
							opacity:0
						}}
						whileInView={{
							opacity:1
						}}
						transition={{
							duration:1
						}}
						className="bg-[#1f1f1f] w-[50%] p-4 flex flex-col">
							<h1 className="text-2xl text-white font-bold">1,20,120</h1>
							<h1 className="text-gray-300 mt-2 font-semibold text-md">Consulted Patients</h1>
						</motion.div>
					</div>
					<div className="md:w-[50%] gap-5 w-full px-5 py-3 flex flex-row items-center">
						<motion.div 
						initial={{
							opacity:0
						}}
						whileInView={{
							opacity:1
						}}
						transition={{
							duration:1
						}}
						className="w-full px-5 py-4 bg-[#fafe28] flex">
							<div className="w-[50%] flex flex-col">
								<h1 className="text-2xl text-black font-bold">$1,20,120</h1>
								<h1 className="text-gray-800 mt-2 font-semibold text-md">Targeted Revenue Generated</h1>
							</div>
							<div className="w-[50%] flex relative justify-end flex-col">
								<h1 className="text-md absolute right-2 top-0 cursor-pointer hover:text-gray-800 transition-all duration-100 ease-in
								text-black">Analyze</h1>
								<div className="w-full bg-[#c0c319] h-1 w-full mb-2">
									<div className="w-[60%] bg-[#00000d] h-1"/>
								</div>
							</div>
						</motion.div>
					</div>
				</div>	
				<div className="pt-14 w-full flex-col flex">
					<div className="w-full justify-center flex items-center gap-10">
						<div className="p-[8px] rounded-full hover:border-sky-900 transition-all duration-100 ease-in cursor-pointer border-[2px] border-black">
							<FaFacebookF className="h-6 w-6 hover:scale-110 cursor-pointer hover:text-sky-600 transition-all duration-100 ease-in text-black"/>
						</div>
						<div className="p-[8px] rounded-full hover:border-sky-900 transition-all duration-100 ease-in cursor-pointer border-[2px] border-black">
							<BsInstagram className="h-6 w-6 hover:scale-110 cursor-pointer hover:text-sky-600 transition-all duration-100 ease-in text-black"/>
						</div>
						<div className="p-[8px] rounded-full hover:border-sky-900 transition-all duration-100 ease-in cursor-pointer border-[2px] border-black">
							<BsTwitter className="h-6 w-6 hover:scale-110 cursor-pointer hover:text-sky-600 transition-all duration-100 ease-in text-black"/>
						</div>
						<div className="p-[8px] rounded-full hover:border-sky-900 transition-all duration-100 ease-in cursor-pointer border-[2px] border-black">
							<BsGoogle className="h-6 w-6 hover:scale-110 cursor-pointer hover:text-sky-600 transition-all duration-100 ease-in text-black"/>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full bg-gray-200 pb-5 flex justify-center items-center px-5 py-3">
				<h1 className="text-gray-800 mt-2 font-semibold">
					 © 2023 Copyright: XAI.AI
				</h1>
			</div>
		</div>


	)
}