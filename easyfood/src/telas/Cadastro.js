import React from 'react';

import { Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';

import Button from '../componentes/Button';
import ButtonTags from '../componentes/ButtonTags';

export default function Cadastro(){

    return (
        <SafeAreaView>
            <Text style = {styles.mensagem}>Já possui conta? <Text style = {styles.cadastrar}>Acessar!</Text></Text>
            <TextInput style = {styles.input} placeholder="Insira seu nome" />
            <TextInput style = {styles.input} placeholder="Insira seu e-mail" />
            <TextInput secureTextEntry={true} style = {styles.input} placeholder="Insira uma nova senha" />
            <TextInput secureTextEntry={true} style = {styles.input} placeholder="Confirme sua senha" />
            <Text style = {styles.chamada}>Possui alguma restrição ou dieta alimentar?</Text>
            <Button title="Entrar" />
            {/*<ButtonTags title="Vegano" />*/}
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    chamada: {
        fontWeight:'500',
        fontSize: 20,
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 20,
        color: '#5B5B5B',
        textAlign: 'center',
    },
    input:{
        borderWidth:1,
        borderColor: '#5B5B5B',
        marginLeft: 50,
        marginBottom: 20,
        marginRight: 50,
        fontSize: 16,
        paddingStart: 20,
        color: '#5B5B5B',
        borderRadius: 50,
        height: 50,
    },
    mensagem:{
        color: '#3E3E3E',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 75,
        marginLeft: 50,
        marginBottom: 20,
        marginRight: 50,
    },
    cadastrar:{
        color: '#E7320E',
        fontSize: 14,
        fontWeight: '500',
    },
    vegano:{
        maxWidth: 100,
    },
});