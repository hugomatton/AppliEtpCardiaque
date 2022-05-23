import AsyncStorage from "@react-native-async-storage/async-storage";

export async function competenceIsOver(competenceId){
    const keys = await AsyncStorage.getAllKeys()
    return keys.indexOf(competenceId) !== -1
}
