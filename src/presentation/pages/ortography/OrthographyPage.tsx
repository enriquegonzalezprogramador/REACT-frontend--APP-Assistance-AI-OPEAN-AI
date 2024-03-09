import React, { useState } from 'react'
import { GptMessage, GptMessageResponse, TextMessageBox, TextMessageBoxFile, TextMessageBoxSelect, TypingLoader } from '../../components'
import { MyMessage } from '../../components'
import { orthographyUseCase } from '../../../core/use-cases/orthography.use-case';

interface Message {
  text: string;
  isGpt:boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  }
}

export const OrthographyPage = () => {

  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);


  const handlePost = async( text: string ) => {
  
      setIsLoading(true);
      setMessages( (prev) => [...prev, {text: text, isGpt: false}]);

      //TODO: UseCase

     const {ok, errors, message, userScore} = await  orthographyUseCase(text);

     console.log(message);

     if( !ok ) {
      
      setMessages( (prev) => [...prev, {text: 'No se pudo realizar la correccion', isGpt: false}]);
      
    } else {

      setMessages( (prev) => [...prev, {text: message , isGpt: true, 
        info: {
          errors,
          message,
          userScore
        }
      }]);
    }


      setIsLoading(false);


      //TODO: anadir el mesnaje del isGTP en True
  }


  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>

          {/* Bienvenida */}

          <GptMessage text='Hola, puedes escribir tu texto en espanol, y te ayudo con las correciones' />

          {
            messages.map( (message, index) => (
                  message.isGpt
                  ? (
                      <GptMessageResponse 
                      key={ index } 
                      { ...message.info!}
                      />
                    )
                    : (
                      <MyMessage key={ index }  text={ message.text }/>
                      )
              ))
          }

          {
            isLoading && (
              <div className='col-start-1 col-end-12 fade-in'>
              <TypingLoader className='fade-in'/>
           </div>
              )
          }
   
          
      

        </div>
      </div>

     { <TextMessageBox 
        onSendMessage={ handlePost }
        placeholder='Escribe aqui lo que deseas'
        disableCorrections={true}
        />}

     {/* <TextMessageBoxFile 
        onSendMessage={ handlePost }
        placeholder='Escribe aqui lo que deseas'
      />*/}

      {/*<TextMessageBoxSelect
      onSendMessage={ console.log }
        options={ [{id: '1', text: 'Hola '} , { id: '2', text: 'Mundo'} ] }
      />*/}

    </div>
  )
}
