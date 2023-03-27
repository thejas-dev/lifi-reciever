import {useState,useEffect} from 'react';
import {FaFacebookF} from 'react-icons/fa';
import {BsInstagram,BsTwitter,BsGoogle} from 'react-icons/bs';
import {TiTick} from 'react-icons/ti';
import {HiOutlineChevronDown} from 'react-icons/hi';
import {motion} from 'framer-motion';
import {CgClose} from 'react-icons/cg'
import {socket} from '../service/socket';

export default function Watch() {
	// body...
	const [reveal,setReveal] = useState(false);
	const [currentData,setCurrentData] = useState({});
	const [resultIndex,setResultIndex] = useState([]);
	const [currentIndex,setCurrentIndex] = useState('');
	const [newPatient,setNewPatient] = useState(false);
	const [data,setData] = useState([]);
	const [recording,setRecording] = useState(true);
	var text="";

	const markAsConsulted = () => {
		var data2 = data
		data2[currentIndex].consulted = true;
		setCurrentData(data2);
		localStorage.setItem('lifi-reciever',JSON.stringify(data2));
		setReveal(false);
		setResultIndex([]);
		setCurrentIndex('')
		setCurrentData({});
	}

	useEffect(()=>{
		socket.on('data',(res)=>{
			if(res === '!' && !recording){
				setNewPatient(true);
			}else if(res === '#' && !recording){
				setNewPatient(false);
			}else if(newPatient){
				addTogetherNew(res);
			}else if(!newPatient){
				addTogetherExist(res);
			}
		})
		return ()=>{
			socket.off('data');
		}
	},[])

	const addTogetherExist = (res) => {
		setRecording(true);
		if(res === '#'){
			parseTheData(text);
		}else{
			text += res;
		}
	}

	const addTogetherNew = (res) => {
		setRecording(true);
		if(res === '!'){
			parseTheData(text);
		}else{
			text += res;
		}
	}

	const parseTheData = (textToParse) => {
		setRecording(false);
		if(newPatient){
			const ParsedArray = textToParse.split('@');
			const newData = {
				name:ParsedArray[0],
				sex:ParsedArray[1],
				id:ParsedArray[3],
				age:ParsedArray[2],
				problem:ParsedArray[4],
				consulted:false,
				results:[
					{
						center:ParsedArray[5],
						result:ParsedArray[6]
					}
				]
			}
			console.log(ParsedArray,newData);
			setData([...data,newData]);
			setTimeout(function() {
				localStorage.setItem('lifi-reciever',JSON.stringify(data));
			}, 1000);			
		}else{
			const ParsedArray = textToParse.split('@');
			for(var i = 0; i<data.length; i++){
				if(data[i].id === ParsedArray[0]){
					var data2 = data;
					var results = data2[i].results;
					const resultData = {
						center:ParsedArray[1],
						result:ParsedArray[2]
					}
					results.push(resultData)
					data2[i].results = results;
					setData(data2);
					console.log(ParsedArray,data2);
					setTimeout(function() {
						localStorage.setItem('lifi-reciever',JSON.stringify(data2));
					}, 1000);
				}
			}
		}
	}

	useEffect(()=>{
		if(localStorage.getItem('lifi-reciever')){
			var patdata = localStorage.getItem('lifi-reciever');
			patdata = JSON.parse(patdata)
			setData(patdata);
		}
	},[])



	return (
		<div className="min-h-screen relative scroll-smooth w-full md:pt-[80px] pt-[75px] mx-auto bg-[#ebebeb]">
			<div className={`fixed h-[90%] overflow-y-scroll scrollbar-none bg-black/20 flex items-center justify-center w-full z-30 
			${!reveal ? '-bottom-[100%]' : 'bottom-0'} transition-bottom duration-300 ease-in-out`}>
				<div className={`fixed bottom-5 ${recording ? "right-5" : "-right-[300px]"} transition-all duration-200 ease-in-out px-4 py-3  cursor-pointer
				backdrop-blur-xl bg-sky-400/30 rounded-xl border-[2px] border-gray-300 flex gap-5 items-center hover:scale-105 `}>
					<div className="w-7 h-7 rounded-full relative animate-spin bg-gradient-to-r from-purple-400 via-blue-500 to-red-400">
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-gray-200 rounded-full border-2 border-white"/>
					</div>
					<button className="text-lg font-semibold text-white">Updating...</button>
				</div>
				<div className="px-5 flex flex-col items-center justify-center py-4 rounded-xl bg-green-100 relative
				md:w-[60%] w-[95%] border-gray-300 border-[2px] shadow-xl">
					<h1 className="text-xl font-bold text-black">
						{currentData.name}'s Scan Reports
					</h1>
					<div className="h-[2px] mt-2 w-[150px] bg-blue-500"/>
					<h1 className="text-md text-gray-500 font-semibold">{currentData.age} {currentData.sex === 'Male' ? '(M)':'(F)'} </h1>
					<div className="mt-7 flex flex-col gap-2 w-full">
						{
							currentData?.results?.map((result,i)=>(
								<div className="flex flex-col border-b-[2px] border-gray-300/60 rounded-xl transition-all duration-300 
								ease-in-out hover:border-orange-500">
									<div 
									onClick={()=>{
										const arrow = document.getElementById(`arrow-${i}`);
										if(!resultIndex.includes(i)){
											setResultIndex([...resultIndex,i]);
											arrow.classList.add('rotate-180')
										}else{
											setResultIndex(current=>
												current.filter(resultIndex=>{
													return resultIndex != i
												}),
											)
											arrow.classList.remove('rotate-180')
										}
									}}
									className="flex justify-between items-center cursor-pointer px-4 py-2">
										<h1 className="text-xl text-black font-bold">
											{result.center}
										</h1>
										<HiOutlineChevronDown
										id={`arrow-${i}`}
										className={`h-7 transition-all 
										duration-300 ease-in-out w-7 text-gray-900`}/>	
									</div>
									{
										resultIndex.includes(i) &&
										<p className="px-4 pb-2 text-gray-700 font-semibold text-md">
											{result.result}
										</p> 
									}
								</div>
							))
						}
					</div>
					<div 
					onClick={()=>markAsConsulted()}
					className="mt-7 gap-2 flex ">
						{
							currentData.consulted ?
							<button className="text-white px-4 py-2 rounded-full font-semibold text-md bg-blue-500">Consulted</button>
							:
							<button className="text-white flex items-center px-4 py-2 rounded-full font-semibold text-md bg-green-500">Mark as Consulted <TiTick className="h-7 w-7 text-white"/></button>
						}
					</div>
				</div>			





				<div className="absolute bg-black/50 rounded-xl flex hover:scale-110 transition-all duration-100 ease-in 
				cursor-pointer items-center justify-center top-8 right-5 border-[2px] border-sky-500 hover:border-red-500">
					<CgClose 
					onClick={()=>{setReveal(false);setResultIndex([]);setCurrentIndex('');setCurrentData({});}}
					className="h-7 w-7 text-gray-100 hover:scale-110 transition-all duration-100 ease-in cursor-pointer"/>
				</div>	
			</div>
			<div className="w-full relative">
				<div className="absolute  w-full h-full z-1"/>
				<img src="/watchImage.jpg" alt="not found" className="w-full shadow-lg"/>
			</div>
			<div className="h-full max-w-6xl mx-auto mt-10">
				<div className="flex flex-col">
					<h1 className="mx-auto md:text-6xl text-xl text-black font-semibold">
						Live Patients Data
					</h1>
					<h1 className="text-center px-2 mt-4 mx-auto md:text-lg text-md text-gray-700 opacity-70 font-semibold">
						Updated automatically after recieving the data completely
					</h1>
					<div className="mt-5 grid lg:grid-cols-3 md:grid-cols-2  px-5 py-5 grid-cols-1 gap-4">
						{
							data.map((data,i)=>(
								<motion.div
								initial={{
									y:100,
									opacity:0
								}}
								whileInView={{
									y:0,
									opacity:1
								}}
								transition={{
									duration:1
								}}
								key={i}
								onClick={()=>{
									setReveal(true);
									setCurrentData(data);
									setCurrentIndex(i);
								}}
								className="px-4 py-5 group rounded-xl bg-[#ebfaef] shadow-xl border-[2px] 
								border-gray-300 hover:border-sky-500 transition-all duration-100 ease-in cursor-pointer "
								>
									<div className="flex gap-7">
										{
											data.sex === 'Male'?
											<img src="/patient-men.png" alt="" className="rounded-full h-[110px] w-[110px]"/>
											:
											<img src="/patient-women.png" alt="" className="rounded-full h-20 w-20"/>
										}
										<div className="flex flex-col pl-3 border-l-[1px] border-gray-800/20 w-full">
											<h1 className="text-gray-700 text-sm">
												Patient's Name & ID :-
											</h1>		
											<h1 className="text-gray-900 text-lg">
												{data.name} ({data.id})
											</h1>		
											<div className="flex w-full gap-14 mt-2">
												<div className="flex flex-col">
													<h1 className="text-gray-600 text-sm">
														Sex :-
													</h1>
													<h1 className="text-gray-900 text-lg">
														{data.sex}
													</h1>
												</div>
												<div className="flex flex-col">
													<h1 className="text-gray-600 text-sm">
														Age :-
													</h1>
													<h1 className="text-gray-900 text-lg">
														{data.age}
													</h1>
												</div>
											</div>
										</div>
									</div>
									<div className="mt-5 flex">
										<div className="flex flex-col gap-1 w-[50%]">
											<p className="text-sm text-gray-600 font-semibold">
												Treatment for
											</p>
											<h1 className="text-lg text-gray-900 font-bold">
												{data.problem}
											</h1>
										</div>
										<div className="flex w-[50%] py-3 items-center justify-center flex">
											<button className={`px-3 py-3 rounded-xl text-white tracking-[1px] ${data.consulted ? 'bg-green-500':'bg-blue-500'} font-semibold`}>
												{	
													data.consulted ? 
													'Consulted'
													:
													'Need to Consult'
												} 
											</button>
										</div>
									</div>
									<h1 className="mx-auto text-center flex justify-center items-center text-gray-500/70 font-semibold">
										{data.results.map((result,j)=>(
											<>{result.center}{data.results.length>1 && ','} </>
										))}
									</h1>
								</motion.div>

							))
						}
					</div>
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
			<div className="w-full bg-gray-200 pb-5 flex justify-center items-center px-5 py-3">
				<h1 className="text-gray-800 mt-2 font-semibold">
					 © 2023 Copyright: XAI.AI
				</h1>
			</div>
		</div>

	)
}


// [
// 		{
// 			name:'Bobby',
// 			sex:'Male',
// 			id:500,
// 			age:'25',
// 			problem:'Fever',
// 			consulted:false,
// 			results:[
// 				{
// 					center:'Blood Test',
// 					result:'Haemoglobin +18 , BP +20 , Gonna Die === true'
// 				},
// 				{
// 					center:'Urine Test',
// 					result:'Slight Yellowish Ph is 10'
// 				},
// 				{
// 					center:'Skin Test',
// 					result:'No Skin Problems some pimples are present'
// 				}
// 			]

// 		},
// 		{
// 			name:'Bobby',
// 			sex:'Male',
// 			id:102,
// 			age:'25',
// 			problem:'Fever',
// 			consulted:false,
// 			results:[
// 				{
// 					center:'Blood Test',
// 					result:'Haemoglobin +18 , BP +20 , Gonna Die === true'
// 				},
// 				{
// 					center:'Urine Test',
// 					result:'Slight Yellowish Ph is 10'
// 				},
// 				{
// 					center:'Skin Test',
// 					result:'No Skin Problems some pimples are present'
// 				}
// 			]

// 		},
// 		{
// 			name:'Bobby',
// 			sex:'Male',
// 			age:'25',
// 			id:155,
// 			problem:'Fever',
// 			consulted:false,
// 			results:[
// 				{
// 					center:'Blood Test',
// 					result:'Haemoglobin +18 , BP +20 , Gonna Die === true'
// 				},
// 				{
// 					center:'Urine Test',
// 					result:'Slight Yellowish Ph is 10'
// 				},
// 				{
// 					center:'Skin Test',
// 					result:'No Skin Problems some pimples are present'
// 				}
// 			]

// 		}
// 	]