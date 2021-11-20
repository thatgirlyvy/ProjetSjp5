import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native'

export default function AddItem({ submitHandler }) {

    const [text, setText] = useState('');

    const changeHandler = (value) => {
        setText(value);
    }

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="New task"
                onChangeText={changeHandler}
                value={text}/>
            <Button
                onPress={() => submitHandler(text)}
                title="+"
                color='coral' />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: 150,
        marginBottom: 5,
        padding: 5,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    }
})