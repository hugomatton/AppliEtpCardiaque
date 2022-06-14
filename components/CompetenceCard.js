import {View, Pressable, Text, Dimensions, StyleSheet} from 'react-native'
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

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    outerContainer:{
        marginBottom: 20,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: GlobalStyles.colors.secondary,
        shadowColor: 'black',
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
        flex: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: GlobalStyles.colors.main,
        marginLeft: 32
    },
    infoContainer:{
        paddingVertical: 10,
        paddingHorizontal: 10,
        overflow: 'hidden',
        borderRadius: 10,
        marginRight: 20,
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    info:{
        textTransform: 'uppercase',
        fontWeight: '700',
        color: GlobalStyles.colors.secondary,
        textAlign: 'center',
        fontSize: deviceWidth > 450 ? 22 : 16
    },
    pressed: {
        opacity: 0.75
    },
   
})