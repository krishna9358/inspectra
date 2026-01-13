"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { connectRepository } from '../actions';
import { toast } from 'sonner';
import { queryKey } from '@/config/queryKey';


export const  useConnectRepository = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async({owner, repo, githubId}: {owner:string, repo:string, githubId:number}) => {
            return await connectRepository(owner, repo, githubId); 
            
        },
        onSuccess: () => {
            toast.success("Repository connected successfully"),
            queryClient.invalidateQueries({
                queryKey: [queryKey.CONNECT_REPOSITORIES]
            })

        },
        onError: (error) => {
            toast.error("Failed to connect repository");
            console.log("Failed to connect repository", error);
        }
    }) 
}

export default  useConnectRepository