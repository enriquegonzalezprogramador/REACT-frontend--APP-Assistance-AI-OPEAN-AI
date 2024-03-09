import { OrthographyResponse } from "../../interfaces";


export const orthographyUseCase = async(prompt: string)  => {

    try {

        console.log('prompt', prompt)

        const resp = await fetch(`${ import.meta.env.VITE_GPT_API }/orthography-check`, {
        method:'POST',
        headers: {
            'Contet-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
        });

        console.log('resp', resp)

        if( !resp.ok ) throw new Error('No se pudo realizar la correcion')

        const data = await resp.json() as OrthographyResponse;

        return {
            ok: true,
            ...data
        }
        
    } catch (error) {
        return {
            ok: false,
            userScore: 0,
            errors: [],
            message: "No se pudo realizar la correcion"
        }
    }

}