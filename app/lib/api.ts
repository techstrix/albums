export   async function fetchData(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/albums`)
    if(!res.ok){
            throw new Error("Failed to fetch posts")

    }
    return res.json()

}


export  async function CreateAlbum(newAlbum:{title:string,artist:string,price:number}){

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/albums`,{
        method:"POST",
        headers:{
         "Content-Type": "application/json",
        },
        body:JSON.stringify(newAlbum)
    })
     if(!res.ok){
            throw new Error("Failed to fetch posts")

    }
    return res.json()

}