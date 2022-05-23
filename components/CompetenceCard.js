import {View, Pressable, Text, StyleSheet} from 'react-native'
import { GlobalStyles } from '../constants/styles'

function CompetenceCard({title, onPress, isOver}){
    return(
        <View style={styles.outerContainer}>
            <Pressable 
                style={({pressed})=> pressed && styles.pressed} 
                onPress={onPress}
            >
                <View style={styles.innerContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title} >{title}</Text>
                    </View>
                    <View 
                        style={[styles.infoContainer, {backgroundColor: isOver ? 'green' : 'orange'}]}
                    >
                        <Text 
                            style={styles.info}
                        >
                            {isOver ? 'Terminée' : 'à Lire'}
                        </Text>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}

export default CompetenceCard

const styles = StyleSheet.create({
    outerContainer:{
        marginBottom: 20,
        borderRadius: 8,
        backgroundColor: GlobalStyles.colors.secondary,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4

    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleContainer: {
        height: 100,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: GlobalStyles.colors.main,
        marginLeft: 32
    },
    infoContainer:{
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: '50%',
        marginRight: 20
    },
    info:{
        textTransform: 'uppercase',
        fontWeight: '700',
        color: GlobalStyles.colors.secondary,
        width: 80,
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.75
    },
   
})