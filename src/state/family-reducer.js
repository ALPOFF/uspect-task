import { appAPI, familiesAPI } from "../api/api";

const SET_FAMILIES = 'families/SET_FAMILIES';
const SET_FAMILY_DETAILS = 'families/SET_FAMILY_DETAILS';
const TOGGLE_IS_FETCHING = 'families/TOGGLE_IS_FETCHING';

let initialState = {
    isFetching: false,
    families: [],
    familyDetails: [],
};

const familyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FAMILIES:
            return {
                ...state,
                families: action.families
            };
        case SET_FAMILY_DETAILS:
            return {
                ...state,
                familyDetails: action.familyDetails
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            };
        default:
            return state;
    }
};

export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
};

const setFamiliesData = (families) => {
    return {
        type: SET_FAMILIES,
        families
    }
};

export const getFamiliesData = (currentPage, pageSize) => async (dispatch) => {
    let response = await familiesAPI.getFamilies(currentPage, pageSize);
    if (response.length != 0) {
        dispatch(setFamiliesData(response))
        dispatch(toggleIsFetching(false))
    }
};

const setFamilyDetailsData = (familyDetails) => {
    return {
        type: SET_FAMILY_DETAILS,
        familyDetails
    }
};

export const getFamilyDetailsData = (familyId) => async (dispatch) => {

    let response = await familiesAPI.getFamilyById(familyId);
    if (response.length != 0) {
        if (response.currentLord != '') {
            let respCurrentLord = await appAPI.getNames([response.currentLord]);
            response.currentLord = respCurrentLord
        }
        if (response.overlord != '') {
            let respOverlord = await appAPI.getNames([response.overlord]);
            response.overlord = respOverlord
        }
        if (response.swornMembers != '') {
            let respSwordnMembers = await appAPI.getNames(response.swornMembers);
            response.swornMembers = respSwordnMembers
        }
        if (response.heir != '') {
            let respHeir = await appAPI.getNames([response.heir]);
            response.heir = respHeir
        }
        dispatch(setFamilyDetailsData(response))
        dispatch(toggleIsFetching(false))
    }
};

//Фильтрация

export const getFilteredFamiliesData = (familyName) => async (dispatch) => {
    let response = await familiesAPI.getFilteredFamilies(familyName);
    dispatch(setFamiliesData(response))
};

export default familyReducer;