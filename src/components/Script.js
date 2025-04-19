


export function formatDate(date){
    let formatDate = new Date(date).getFullYear()+ "/" 
            +(new Date(date).getMonth()+1).toString().padStart(2, '0')+ "/" 
            +new Date(date).getDate().toString().padStart(2, '0')
    return formatDate
  }
export function formatinputDate(date){
    let formatDate = new Date(date).getFullYear()+ "-" 
            +(new Date(date).getMonth()+1).toString().padStart(2, '0')+ "-" 
            +new Date(date).getDate().toString().padStart(2, '0')+" "
            +new Date(date).getHours().toString().padStart(2, '0')+ ":"
            +new Date(date).getMinutes().toString().padStart(2, '0')
    return formatDate
}



  