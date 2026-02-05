"use client"
import { Button } from "@/components/ui/button";
import {fetchData,CreateAlbum} from "../lib/api";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import React,{useState} from "react"
import { Input } from "@/components/ui/input";

export default function Album() {
 const queryClient = useQueryClient()
 const [title,setTitle] = useState<string>("");
 const [artist,setArtist] = useState<string>("");
 const [price,setPrice] = useState<string>("");
  const {data,isLoading,error} = useQuery({
    queryKey:["album"],
    queryFn:fetchData
  })
  const mutation = useMutation({
    mutationFn:CreateAlbum,
    onSuccess:() => {
      queryClient.invalidateQueries({queryKey:["album"]})
      setTitle("")
      setArtist("")
      setPrice("")
      }
  })
   if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading posts</p>
  return (
    <React.Fragment>
      <div className="text-center">
    <h1 className="pt-1 font-bold text-2xl">Albums</h1>

    <form onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate({title,artist,price:parseInt(price)})
  }} className="flex flex-col gap-5 max-w-md mx-auto my-8">
     <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Album title"
          className="px-4 py-3 border border-gray-200 rounded-lg text-sm transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

         <Input
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Album artist"
          className="px-4 py-3 border border-gray-200 rounded-lg text-sm transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

         <Input
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Album price"
          className="px-4 py-3 border border-gray-200 rounded-lg text-sm transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&]:appearance-none"
        />

  <Button type="submit" disabled={mutation.isPending} className="mt-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold transition-all hover:shadow-lg shadow-md disabled:opacity-70 disabled:cursor-not-allowed"> {mutation.isPending ? "Creating..." : "Create Album"}</Button>
    </form>


    <ul>
      {data.map((album:any) => (
          <li key={album.id}>{album.title} by {album.artist} - ${album.price}</li>
      ))}
    </ul>
 </div>
    </React.Fragment>
    
  );
}
