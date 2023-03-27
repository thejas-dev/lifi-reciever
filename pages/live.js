import {BiArrowBack} from 'react-icons/bi'



export default function live() {
	// body...



	return (

    
<div class="live-body" >
	<div 
	onClick={()=>window.location = '/'}
	className="absolute top-5 left-5 p-1 cursor-pointer hover:border-sky-500 transition-all duration-100 ease-in-out rounded-full border-[2px] border-white">
		<BiArrowBack className="h-7 w-7 text-white hover:text-orange-200 transition-all duration-100 ease-in-out"/>
	</div>	
    <div class="num mx-auto my-auto cursor-pointer">
        010101
        
    </div>
    
</div>

	)
}