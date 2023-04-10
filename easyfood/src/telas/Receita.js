import React, {Component} from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

export default function Receita( {route} ){

    const { response } = route.params;
    console.log(response);
    console.log(route.params);

    return (
        <SafeAreaView>
            <Text style = {styles.txt}>{response}</Text>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    txt:{
        marginLeft: 50,
        marginTop: 70,
        marginRight: 50,
        fontSize: 16,
        color: '#5B5B5B',
        fontSize:16,
    },
});

