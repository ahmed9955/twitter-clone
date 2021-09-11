import React, { useState } from 'react'
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

const Form = () => {
    
  const onEmojiClick = (event, emojiObject) => {
    
    console.log(emojiObject.emoji)
  
  }

      return (
        <>
            <Picker  onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK}/>
        </>
      )
    }

export default Form