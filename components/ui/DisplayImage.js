import { Image, Dimensions } from "react-native"

function DisplayImage({ height, width, imageUrl }) {

    const deviceWidth = Dimensions.get('window').width

    return (
        <Image
            source={{
                uri: imageUrl
            }}
            style={{
                height: (height * Dimensions.get('window').width) / width,
                width: Dimensions.get('window').width,
            }}
        />
    )
}

export default DisplayImage

