import React, {Component} from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

export default function BuscaNome(){

    return (
        <SafeAreaView>
            <Text style = {styles.txt}>Receita</Text>
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

