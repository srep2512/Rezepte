export const getRezepteforId = (state,RezeptId) =>{
    state.commit('setStatistik',RezeptId)
}

export const setActualRezept = (state, RezeptId) => {
    state.commit('setActualRezept',RezeptId)
}