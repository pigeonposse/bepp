export const fetchFunct = ( 
	...args: Parameters<typeof fetch> 
) => {

	return fetch( ...args )

}
export const imageUrlExist = async ( url: string ) => {
     
	const res = await fetchFunct( url )
	if( !res.ok ) return false
	const buff = await res.blob()
   
	return buff.type.startsWith( 'image/' )

}
