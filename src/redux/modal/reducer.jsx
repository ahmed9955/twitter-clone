import { types } from "./modal-types";

const INITIAL_STATE = {
    display: false,
    displayPrivacy: false,
    displayConfirm: false,
    displayVerification: false,
    displayResetPassword: false,
    displayReplayVisibility:false,
    twitterButtonActive: true,
    postDetails: {

        id:'', 
        content:'', 
        media: '' ,
        likes:'',
        profileName:'',
        avatar:'',
        comments:''
    
    },
    replayContent:{
        
        post_id: '',
        post_content: '',
        
    },
}


const modalReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case types.SET_MODAL_VISIBILITY:
            return {
                ...state,
                display: action.payload
            }

        case types.SET_PRIVACY_VISIBLITY:
            return {
                ...state,
                displayPrivacy: action.payload
            }
        case types.SET_CONFIRM_VISIBLITY:
            return {
                ...state,
                displayConfirm: action.payload
            }
        case types.SET_VERIFICATION_VISIBLITY:
            return {
                ...state,
                displayVerification: action.payload
            }
        case types.SET_TWITTER_BUTTON_ACTIVE: 
            return{
                ...state,
                twitterButtonActive: action.payload
            }
        case types.SET_RESET_PASSWORD_VISIBILITY: 
            return {
                ...state,
                displayResetPassword: action.payload
            }
        case types.SET_TWITTER_REPLAY_VISIBILITY: 
            return {
                ...state,
                displayReplayVisibility: action.payload
            }
        case types.SET_REPLAY_CONTENT:
            return {
                ...state,
                replayContent: action.payload
            }    
        case types.SET_POST_DETAILS:
            return {
                ...state,
                postDetails: action.payload
            }    

        default:
            return state;
    }
}

export default modalReducer