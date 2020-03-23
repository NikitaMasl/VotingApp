import { NEW_VOING, REMOVE_VOTING, SELECT_OPTION, RE_VOTE, CHANGE_VOTING } from '../constants';
import { load } from 'redux-localstorage-simple';

let VOTINGS = load({ namespace:'voting-list' });
if(!VOTINGS || !VOTINGS.votings || !VOTINGS.votings.length){
    VOTINGS = {
        votings: [],
    }
}

export const votings = (state = VOTINGS.votings, { id, description, options, selectedOption, type, num }) => {
    switch (type){
        case NEW_VOING:
            return [ 
                ...state, {
                    id,
                    description,
                    options
                }
            ];
        case REMOVE_VOTING:
            return [...state].filter(voting => voting.id !== id) ;
        case SELECT_OPTION:
            return [...state].map(voting => {
                if(voting.id === id){
                    voting['selectedOption'] = selectedOption;
                }
                return voting
        });
        case RE_VOTE:
            return [...state].map(voting => {
                if(voting.id === id){
                    delete voting.selectedOption;
                }
                return voting
        });
        case CHANGE_VOTING:
            return [...state].map(voting => {
                if(voting.id === id){
                    voting.description = description;
                    options.forEach((option, index) => {
                        voting.options[index] = option;
                    });
                }
                return voting
        });
        default:
            return state;
    }
}