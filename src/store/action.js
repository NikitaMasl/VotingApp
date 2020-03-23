import { NEW_VOING, REMOVE_VOTING, SELECT_OPTION, RE_VOTE, CHANGE_VOTING } from './constants';

export const addVoting = (id, description, options) => {
    return {
        type: NEW_VOING,
        id,
        description, 
        options
    }
}

export const removeVoting = (id) => {
    return {
        type: REMOVE_VOTING,
        id
    }
}

export const selectOption = (id, selectedOption) => {
    return {
        type: SELECT_OPTION,
        id,
        selectedOption
    }
}

export const reVote = (id) => {
    return {
        type: RE_VOTE,
        id
    }
}

export const changeVoting = (id, description, options) => {
    return {
        type: CHANGE_VOTING,
        id,
        description, 
        options
    }
}


