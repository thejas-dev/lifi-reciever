
import {FiArrowUpRight} from 'react-icons/fi';



export default function Header({page,setPage}) {
	// body...


	return(
		<div className="fixed z-50 w-full backdrop-blur-lg bg-[#ebebeb]/50 shadow-md">
			<div className="max-w-6xl px-4 md:py-5 py-4 flex items-center mx-auto justify-between">
				<div className="flex items-center gap-3">
					<img src="/favicon.ico" alt="hello" className="h-12 w-12 rounded-xl"/>
				</div>
				<div className="items-center md:gap-[80px] gap-5 w-full flex justify-center">
					<h1 
					onClick={()=>setPage('About')}
					className="text-gray-900 hover:text-sky-700 hover:scale-110 cursor-pointer ease-in
					transition-all duration-100 text-lg font-semibold">
						About
						{page === 'About' && <div className="bg-gray-800 h-[2px] w-full"/>}						
					</h1>
					<h1 
					onClick={()=>setPage('Home')}
					className="text-gray-900 hover:text-sky-700 hover:scale-110 cursor-pointer ease-in
					transition-all duration-100 text-lg font-semibold">
						Home
						{page === 'Home' && <div className="bg-gray-800 h-[2px] w-full"/>}
					</h1>
					<h1 
					onClick={()=>setPage('Watch')}
					className="text-gray-900 hover:text-sky-700 hover:scale-110 cursor-pointer ease-in
					transition-all duration-100 text-lg font-semibold">
						Watch
						{page === 'Watch' && <div className="bg-gray-800 h-[2px] w-full"/>}
					</h1>
				</div>
				<div className="flex items-center">
					<button 
					onClick={()=>window.location ='/live'}
					className="text-white bg-black md:px-5 px-3 hover:scale-110 hover:rounded-lg hover:shadow-lg flex gap-1 items-center
					transition-all duration-100 ease-in	py-2 font-semibold">Live<FiArrowUpRight className="h-5 w-5 text-white"/></button>
					
				</div>
			</div>
		</div>


	)
}