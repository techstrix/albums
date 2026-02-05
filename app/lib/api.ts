export   async function fetchData(){
    const res = await fetch("http://localhost:8080/albums")
    if(!res.ok){
            throw new Error("Failed to fetch posts")

    }
    return res.json()

}


export  async function CreateAlbum(newAlbum:{title:string,artist:string,price:number}){

    const res = await fetch("https://yabbering-trudy-personalxorbi-408d7d3c.koyeb.app/albums",{
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