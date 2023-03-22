import React from "react";
import { Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';

export default function Inicial(){
    return (
        <SafeAreaView>
            <Text style = {styles.chamada}>Bem vindo ao</Text>
            <Text style = {styles.titulo}>Easy Food</Text>
            <TextInput style = {styles.input} placeholder="Digite seu e-mail" />
            <TextInput style = {styles.input} placeholder="Digite sua senha" />
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    chamada: {
        fontWeight:'500',
        fontSize: 24,
        marginTop: 150,
        marginLeft: 40,
        color: '#5B5B5B',
    },
    titulo: {
        fontWeight:'900',
        color: '#E7320E',
        fontSize: 40,
        marginLeft: 40,
    },
    input:{
        borderWidth:1,
        borderColor: '#5B5B5B',
        marginLeft: 40,
        marginTop: 50,
        borderRadius: 10,
        height: 40,
    },
});